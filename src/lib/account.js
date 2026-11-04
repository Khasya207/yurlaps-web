import { supabase } from './supabase'

const AVATAR_BUCKET = 'avatars'

const messages = {
  en: {
    schema:
      'Account tables are not set up yet. Run supabase/schema.sql in the Supabase SQL Editor.',
    bucket:
      'The "avatars" storage bucket is missing. Run supabase/schema.sql in the Supabase SQL Editor.',
    generic: 'Something went wrong. Please try again.',
  },
  id: {
    schema:
      'Tabel akun belum tersedia. Jalankan supabase/schema.sql di Supabase SQL Editor.',
    bucket:
      'Storage bucket "avatars" belum ada. Jalankan supabase/schema.sql di Supabase SQL Editor.',
    generic: 'Terjadi kesalahan. Coba lagi.',
  },
}

export function getFriendlyError(error, language = 'en') {
  const text = messages[language] || messages.en
  const message = error?.message || ''
  if (error?.code === '42P01' || /relation .* does not exist|schema cache/i.test(message)) {
    return text.schema
  }
  if (/bucket not found/i.test(message)) return text.bucket
  return message || text.generic
}

function requireClient() {
  if (!supabase) throw new Error('Supabase is not configured.')
  return supabase
}

export async function fetchProfile(user) {
  const client = requireClient()
  const { data, error } = await client
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle()
  if (error) throw error
  if (data) return data

  const fallback = {
    id: user.id,
    full_name: user.user_metadata?.full_name || '',
    nickname: user.user_metadata?.nickname || '',
    tts_name: user.user_metadata?.tts_name || '',
    avatar_url: '',
  }
  const { data: created, error: insertError } = await client
    .from('profiles')
    .upsert(fallback, { onConflict: 'id' })
    .select()
    .single()
  if (insertError) throw insertError
  return created
}

export async function saveProfile(user, values) {
  const client = requireClient()
  const payload = {
    id: user.id,
    full_name: values.full_name || '',
    nickname: values.nickname || '',
    tts_name: values.tts_name || '',
    avatar_url: values.avatar_url || '',
  }
  const { data, error } = await client
    .from('profiles')
    .upsert(payload, { onConflict: 'id' })
    .select()
    .single()
  if (error) throw error
  await client.auth.updateUser({
    data: {
      full_name: payload.full_name,
      nickname: payload.nickname,
      tts_name: payload.tts_name,
    },
  })
  return data
}

export async function uploadAvatar(user, file) {
  const client = requireClient()
  const extension = (file.name.split('.').pop() || 'jpg')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') || 'jpg'
  const path = `${user.id}/avatar-${Date.now()}.${extension}`
  const { error } = await client.storage.from(AVATAR_BUCKET).upload(path, file, {
    cacheControl: '3600',
    contentType: file.type || 'image/jpeg',
    upsert: false,
  })
  if (error) throw error
  const { data } = client.storage.from(AVATAR_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export async function updateAvatar(user, avatarUrl) {
  const client = requireClient()
  const { data, error } = await client
    .from('profiles')
    .update({ avatar_url: avatarUrl })
    .eq('id', user.id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function fetchTransponders(userId) {
  const client = requireClient()
  const { data, error } = await client
    .from('transponders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function addTransponder(userId, values) {
  const client = requireClient()
  const { data, error } = await client
    .from('transponders')
    .insert({
      user_id: userId,
      transponder_id: values.transponder_id,
      rc_class: values.rc_class,
      rc_brand: values.rc_brand,
    })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteTransponder(id) {
  const client = requireClient()
  const { error } = await client.from('transponders').delete().eq('id', id)
  if (error) throw error
}
