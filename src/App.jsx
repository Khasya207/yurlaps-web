import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Mail,
  Menu,
  MessageCircle,
  X,
} from 'lucide-react'

const gallery = [
  { src: '/gallery-transponder-size.png', alt: 'YURLAPS Transponder size comparison' },
]

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [language, setLanguage] = useState('en')
  const [languageOpen, setLanguageOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [expandedProduct, setExpandedProduct] = useState(null)
  const [activeProduct, setActiveProduct] = useState(0)
  const [contactOpen, setContactOpen] = useState(false)
  const productScrollPosition = useRef(0)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1800)
    return () => window.clearTimeout(timer)
  }, [])

  useLayoutEffect(() => {
    if (!expandedProduct || !window.matchMedia('(max-width: 1023px)').matches) {
      return undefined
    }

    const scrollPosition = window.scrollY
    productScrollPosition.current = scrollPosition
    const bodyStyle = document.body.style
    const previousBodyPosition = bodyStyle.position
    const previousBodyTop = bodyStyle.top
    const previousBodyWidth = bodyStyle.width

    bodyStyle.position = 'fixed'
    bodyStyle.top = `-${scrollPosition}px`
    bodyStyle.width = '100%'

    return () => {
      bodyStyle.position = previousBodyPosition
      bodyStyle.top = previousBodyTop
      bodyStyle.width = previousBodyWidth
      window.scrollTo(0, productScrollPosition.current)
    }
  }, [expandedProduct])

  const copy = {
    en: {
      home: 'Home',
      product: 'Product',
      gallery: 'Gallery',
      contact: 'Contact',
      language: 'Language',
      headline: 'SMALL, LIGHT, AFFORDABLE, AND ACCURATE.',
      intro: 'A solution for your RC.',
      aboutText:
        'Precision lap timing and race management technology designed for radio-controlled racing. Track every lap, measure performance, and manage your race with confidence.',
      decoderName: 'YURLAPS DECODER',
      decoderTagline: 'Accurate Detection. Reliable Timing. Seamless Integration.',
      decoderDescription:
        'The YURLAPS Decoder is the core of the YURLAPS timing system. Designed to receive and process signals from YURLAPS transponders, it accurately identifies passing vehicles and delivers timing data to the race management software. With flexible deployment options, YURLAPS can operate through YURLAPS Host or a PC/Laptop.',
      decoderDetails: 'System integration',
      decoderDetailsValue: 'YURLAPS Host or PC/Laptop',
      hostName: 'YURLAPS HOST',
      hostDescription:
        'YURLAPS Host is a dedicated computing unit designed to replace a conventional computer in the YURLAPS timing system. Built for continuous operation, it provides a reliable and compact platform for running an online RC racing timing system 24 hours. With built-in Wi-Fi and web-based access, users can monitor and manage their races directly from a mobile phone, tablet, or laptop without installing dedicated software. Its Bluetooth connectivity supports external speakers for race announcements, while HDMI output allows race information to be displayed on a TV or monitor. The integrated 1.3-inch LCD provides essential system information.',
      hostDetails: 'Product details',
      hostDetailsValue: 'Coming soon',
      hostPrice: 'Coming soon',
      decoderPrice: 'IDR 2,500,000',
      decoderPoPrice: 'IDR 1,500,000',
      transponderPrice: 'IDR 450,000',
      transponderPoPrice: 'IDR 350,000',
      transponderName: 'YURLAPS TRANSPONDER',
      transponderDescription:
        'YURLAPS Transponder is a compact and lightweight active timing device designed for precision RC racing. Using magnetic coupling technology, it continuously transmits a unique 7-digit Personal ID, allowing the timing system to identify vehicles as they pass over the detection loop. Built for demanding racing environments, its waterproof construction and compact design make it easy to install in a wide range of RC vehicles.',
      transponderDetails: 'Product details',
      transponderSize: 'Size',
      transponderSizeValue: '17 Ã— 20 mm',
      transponderData: 'Driving records',
      transponderDataValue: 'Practice and race Â· Online coming soon',
      transponderStock: 'Coming soon',
      transponderStockNote: 'YURLAPS account integration',
      productName: 'YURLAPS DETECTION LOOP',
      productTagline: 'WIDE TRACK COVERAGE. RELIABLE DETECTION.',
      productDescription:
        'Designed to deliver reliable transponder detection across wide RC racing tracks. The YURLAPS Detection Loop supports track widths of up to 10 meters and comes with a 10-meter coaxial cable for convenient connection to the decoder.',
      stock: 'Included with decoder',
      stockNote: 'Built for RC racing tracks',
      details: 'Product details',
      span: 'Maximum track span',
      cable: 'Coaxial cable',
      connection: 'Connection',
      spanValue: '10M',
      cableValue: '10M',
      connectionValue: 'YURLAPS decoder',
      benefitTitle: 'Made for clean, reliable timing.',
      benefit1Title: 'Simple installation',
      benefit1Text: 'Embed it into the track, place it above the surface, or suspend it overhead.',
      benefit2Title: 'Wide detection',
      benefit2Text: 'A single loop spans up to 5M across the track to capture passing transponders.',
      benefit3Title: 'Ready to connect',
      benefit3Text: 'The 10M coaxial cable gives you room to position the loop and reach the decoder.',
      galleryTitle: 'See it in the real world.',
      galleryText: 'At our core, we are small, light, affordable, and accurate.',
      contactTitle: 'Bring accurate timing to your track.',
      contactText: 'Tell us about your setup, and we will help you get started with YURLAPS.',
      contactButton: 'Contact us',
      account: 'Account coming soon.',
      footer: 'Small, light, affordable, and accurate.',
      back: 'Back to top',
      splash: 'SMALL, LIGHT, AFFORDABLE, AND ACCURATE.',
    },
    id: {
      home: 'Beranda',
      product: 'Produk',
      gallery: 'Galeri',
      contact: 'Kontak',
      language: 'Bahasa',
      headline: 'KECIL, RINGAN, TERJANGKAU, DAN AKURAT.',
      intro: 'Solusi untuk RC-mu.',
      aboutText:
        'Teknologi pencatatan waktu lap dan manajemen balap yang presisi untuk balap radio-controlled. Pantau setiap lap, ukur performa, dan kelola balapan dengan percaya diri.',
      decoderName: 'YURLAPS DECODER',
      decoderTagline: 'Deteksi Akurat. Timing Andal. Integrasi Tanpa Batas.',
      decoderDescription:
        'YURLAPS Decoder adalah inti dari sistem timing YURLAPS. Dirancang untuk menerima dan memproses sinyal dari transponder YURLAPS, perangkat ini mengenali kendaraan yang melintas secara akurat dan mengirimkan data timing ke software manajemen balap. Dengan opsi penggunaan yang fleksibel, YURLAPS dapat beroperasi melalui YURLAPS Host atau PC/Laptop.',
      decoderDetails: 'Integrasi sistem',
      decoderDetailsValue: 'YURLAPS Host atau PC/Laptop',
      hostName: 'YURLAPS HOST',
      hostDescription:
        'YURLAPS Host adalah unit komputasi khusus yang dirancang untuk menggantikan komputer konvensional dalam sistem timing YURLAPS. Dibuat untuk operasi berkelanjutan, perangkat ini menyediakan platform yang andal dan ringkas untuk menjalankan sistem timing balap RC online selama 24 jam. Dengan Wi-Fi bawaan dan akses berbasis web, pengguna dapat memantau serta mengelola balapan langsung dari ponsel, tablet, atau laptop tanpa memasang software khusus. Konektivitas Bluetooth mendukung speaker eksternal untuk pengumuman balap, sementara output HDMI memungkinkan informasi balapan ditampilkan di TV atau monitor. LCD terintegrasi 1,3 inci menampilkan informasi sistem penting.',
      hostDetails: 'Detail produk',
      hostDetailsValue: 'Segera hadir',
      hostPrice: 'Segera hadir',
      decoderPrice: 'IDR 2.500.000',
      decoderPoPrice: 'IDR 1.500.000',
      transponderPrice: 'IDR 450.000',
      transponderPoPrice: 'IDR 350.000',
      transponderName: 'YURLAPS TRANSPONDER',
      transponderDescription:
        'YURLAPS Transponder adalah perangkat timing aktif yang ringkas dan ringan, dirancang untuk balap RC dengan presisi tinggi. Menggunakan teknologi magnetic coupling, perangkat ini terus mengirimkan Personal ID unik 7 digit sehingga sistem timing dapat mengenali kendaraan saat melewati detection loop. Dibuat untuk lingkungan balap yang menuntut, konstruksi tahan air dan desainnya yang ringkas membuatnya mudah dipasang pada berbagai jenis kendaraan RC.',
      transponderDetails: 'Detail produk',
      transponderSize: 'Ukuran',
      transponderSizeValue: '17 Ã— 20 mm',
      transponderData: 'Rekam data mengemudi',
      transponderDataValue: 'Practice dan race Â· Online segera hadir',
      transponderStock: 'Segera hadir',
      transponderStockNote: 'Integrasi akun YURLAPS',
      productName: 'YURLAPS DETECTION LOOP',
      productTagline: 'CAKUPAN LINTASAN LEBAR. DETEKSI ANDAL.',
      productDescription:
        'Dirancang untuk memberikan deteksi transponder yang andal di lintasan balap RC yang lebar. YURLAPS Detection Loop mendukung lebar lintasan hingga 10 meter dan dilengkapi kabel coaxial 10 meter untuk koneksi praktis ke decoder.',
      stock: 'Termasuk saat membeli decoder',
      stockNote: 'Dibuat untuk lintasan balap RC',
      details: 'Detail produk',
      span: 'Lebar lintasan maksimum',
      cable: 'Kabel coaxial',
      connection: 'Koneksi',
      spanValue: '10M',
      cableValue: '10M',
      connectionValue: 'Decoder YURLAPS',
      benefitTitle: 'Dibuat untuk timing yang bersih dan andal.',
      benefit1Title: 'Pemasangan sederhana',
      benefit1Text: 'Tanam di lintasan, letakkan di atas permukaan, atau gantung di atas lintasan.',
      benefit2Title: 'Deteksi lebar',
      benefit2Text: 'Satu loop menjangkau hingga 5M untuk menangkap transponder yang melintas.',
      benefit3Title: 'Siap terhubung',
      benefit3Text: 'Kabel coaxial 10M memberi ruang untuk menempatkan loop dan menjangkau decoder.',
      galleryTitle: 'Lihat dalam penggunaan nyata.',
      galleryText: 'Inti dari kami adalah kecil, ringan, terjangkau, dan akurat.',
      contactTitle: 'Hadirkan timing akurat ke lintasanmu.',
      contactText: 'Ceritakan setup-mu, dan kami akan membantu memulai dengan YURLAPS.',
      contactButton: 'Hubungi kami',
      account: 'Akun segera hadir.',
      footer: 'Kecil, ringan, terjangkau, dan akurat.',
      back: 'Kembali ke atas',
      splash: 'KECIL, RINGAN, TERJANGKAU, DAN AKURAT.',
    },
  }

  const text = copy[language]
  const activeProductKey = ['decoder', 'host', 'transponder', 'loop'][activeProduct]

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const openContact = () => {
    setMenuOpen(false)
    setContactOpen(true)
  }

  const toggleProduct = (product) => {
    setExpandedProduct((currentProduct) => (currentProduct === product ? null : product))
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fbfdff] text-ink">
      <div className={`fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-slate-950 transition-all duration-700 ${isLoading ? 'visible opacity-100' : 'pointer-events-none invisible opacity-0'}`}>
        <img src="/splash-background.png" alt="" className="absolute inset-0 h-full w-full object-cover [clip-path:inset(0_0_0_50%)]" />
        <img src="/splash-background-rally.png" alt="" className="absolute inset-0 h-full w-full object-cover [clip-path:inset(0_50%_0_0)]" />
        <div className="absolute inset-y-0 left-1/2 w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-[34px]" />
        <div className="absolute inset-0 bg-slate-950/60" />
        <div className="relative flex w-full max-w-sm flex-col items-center px-8">
          <img src="/yurlaps-logo-transparent.png" alt="YurLaps" className="relative w-72 animate-[splash-logo_1.2s_ease-out_both] object-contain sm:w-80" />
          <div className="mt-8 h-px w-32 overflow-hidden bg-white/35"><div className="h-full w-full origin-left animate-[splash-progress_1.65s_ease-in-out_both] bg-ocean" /></div>
          <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/85">{text.splash}</p>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-blue-100 bg-white shadow-[0_8px_24px_rgba(7,88,216,0.1)]">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="navbar-wave navbar-wave-one" />
          <div className="navbar-wave navbar-wave-two" />
        </div>
        <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-2 sm:px-8">
          <button onClick={() => scrollTo('home')} className="group flex items-center" aria-label="YurLaps home">
            <img src="/yurlaps-logo-transparent.png" alt="YurLaps" className="h-11 w-[7.2rem] object-contain transition-transform group-hover:-rotate-2" />
          </button>
          <div className="hidden items-center gap-1 md:flex">
            {[['home', text.home], ['products', text.product], ['gallery', text.gallery], ['contact', text.contact]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="rounded-full px-3.5 py-2 text-sm font-bold text-slate-600 transition hover:bg-blue-50 hover:text-ocean">{label}</button>
            ))}
            <div className="relative ml-1">
              <button onClick={() => setLanguageOpen(!languageOpen)} className="flex items-center gap-1 rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-600 hover:bg-blue-50 hover:text-ocean">{language.toUpperCase()} <ChevronDown size={13} className={languageOpen ? 'rotate-180' : ''} /></button>
              {languageOpen && <div className="absolute right-0 top-full mt-2 w-32 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-card">{[['en', 'English'], ['id', 'Indonesia']].map(([value, label]) => <button key={value} onClick={() => { setLanguage(value); setLanguageOpen(false) }} className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-semibold ${language === value ? 'bg-mist text-ocean' : 'text-slate-500 hover:bg-slate-50'}`}>{label}{language === value && <Check size={14} />}</button>)}</div>}
            </div>
          </div>
          <button onClick={openContact} className="hidden rounded-full bg-ocean px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1855db] md:block">{text.contactButton}</button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-full p-2 text-slate-700 hover:bg-blue-50 md:hidden" aria-label="Toggle menu">{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </nav>
        {menuOpen && <div className="relative z-10 border-t border-blue-100 bg-white/95 px-5 py-3 backdrop-blur-md md:hidden">{[['home', text.home], ['products', text.product], ['gallery', text.gallery], ['contact', text.contact]].map(([id, label]) => <button key={id} onClick={() => scrollTo(id)} className="block w-full rounded-xl px-3 py-3 text-left text-sm font-bold text-slate-600 hover:bg-blue-50">{label}</button>)}<div className="mt-2 flex gap-2 border-t border-blue-100 pt-3">{[['en', 'EN'], ['id', 'ID']].map(([value, label]) => <button key={value} onClick={() => setLanguage(value)} className={`rounded-full px-4 py-2 text-xs font-bold ${language === value ? 'bg-ocean text-white' : 'bg-blue-50 text-slate-500'}`}>{label}</button>)}</div></div>}
      </header>

      <main>
        <section id="home" className="pb-24 pt-20 lg:pb-32 lg:pt-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="mb-5 text-center text-base font-bold uppercase tracking-[0.24em] text-ocean sm:text-lg">{text.intro}</p>
          </div>
          <div className="relative isolate flex min-h-[19rem] w-full items-center justify-center overflow-hidden bg-ink px-5 py-10 sm:min-h-[23rem] sm:px-8 sm:py-12 lg:min-h-[27rem] lg:px-10 lg:py-14">
            <img src="/splash-background-rally.png" alt="" className="absolute inset-y-0 left-0 h-full w-1/2 object-cover object-center" />
            <img src="/splash-background.png" alt="" className="absolute inset-y-0 right-0 h-full w-1/2 object-cover object-center" />
            <div className="absolute inset-0 bg-slate-950/45" />
            <div className="absolute inset-y-0 left-1/2 w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-950/45 to-transparent blur-3xl" />
            <div className="mx-auto max-w-6xl px-0 sm:px-0">
              <h1 className="relative mx-auto w-full max-w-5xl text-center font-display text-5xl font-extrabold leading-[0.94] tracking-[-0.08em] text-white drop-shadow-lg sm:text-6xl lg:text-[6.5rem]">{text.headline}</h1>
            </div>
          </div>
          <div className="mx-auto mt-14 max-w-6xl px-5 sm:px-8">
            <div className="rounded-[2rem] border border-blue-100 bg-blue-50/70 px-7 py-10 sm:px-12 lg:px-16 lg:py-14">
              <p className="animate-[about-copy_1s_cubic-bezier(0.22,1,0.36,1)_both] mt-4 max-w-3xl font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.06em] text-ink sm:text-5xl">{text.aboutText}</p>
            </div>
          </div>
          <div id="products" className="mx-auto mt-14 max-w-6xl px-5 sm:px-8">
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white">
              <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <div className="product-wave product-wave-one" />
                <div className="product-wave product-wave-two" />
              </div>
              <button type="button" onClick={() => { setActiveProduct((activeProduct + 3) % 4); setExpandedProduct(null) }} className={`absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 text-ocean shadow-md transition hover:bg-blue-50 ${expandedProduct ? 'hidden lg:block' : ''}`} aria-label="Previous product"><ChevronLeft size={20} /></button>
              <button type="button" onClick={() => { setActiveProduct((activeProduct + 1) % 4); setExpandedProduct(null) }} className={`absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 text-ocean shadow-md transition hover:bg-blue-50 ${expandedProduct ? 'hidden lg:block' : ''}`} aria-label="Next product"><ChevronRight size={20} /></button>
              <div className="relative z-10 grid min-h-[30rem] items-center gap-8 px-12 py-10 sm:px-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                {activeProduct === 0 && <>
                  <button type="button" onClick={() => toggleProduct('decoder')} className={`group text-center transition-transform duration-300 ease-out will-change-transform lg:col-span-2 ${expandedProduct === 'decoder' ? 'w-full' : 'w-full max-w-xl lg:justify-self-center lg:w-[34rem]'}`} aria-expanded={expandedProduct === 'decoder'}>
                    <img src="/decoder-example.png" alt={`${text.decoderName} example`} className="h-[22rem] w-full object-contain transition duration-500 group-hover:scale-[1.02] sm:h-[28rem]" />
                    <h2 className="mt-5 font-display text-3xl font-extrabold leading-[0.98] tracking-[-0.07em] transition-colors group-hover:text-ocean sm:text-5xl">{text.decoderName}</h2>
                  </button>
                  {expandedProduct === 'decoder' && <><div className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-md lg:hidden" onClick={() => setExpandedProduct(null)} aria-hidden="true" /><div className="fixed left-1/2 top-1/2 z-50 max-h-[82vh] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-blue-100 bg-white p-6 pt-16 shadow-2xl animate-[product-modal-in_0.3s_ease-out_both] sm:w-[calc(100%-4rem)] sm:p-8 lg:static lg:col-span-2 lg:max-h-none lg:w-full lg:translate-x-0 lg:translate-y-0 lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:pt-0 lg:shadow-none"><button type="button" onClick={() => setExpandedProduct(null)} className="absolute right-4 top-4 rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-blue-50 hover:text-ocean lg:hidden" aria-label="Close product details"><X size={18} /></button><p className="text-lg font-semibold leading-8 text-ocean">{text.decoderTagline}</p><p className="mt-5 text-lg leading-8 text-slate-600">{text.decoderDescription}</p><div className="mt-7 border-y border-slate-200"><div className="flex items-center justify-between border-b border-slate-100 py-3 text-sm"><span className="text-slate-400">{text.decoderDetails}</span><strong className="max-w-[65%] text-right text-ink">{text.decoderDetailsValue}</strong></div><div className="flex items-center justify-between py-3 text-sm"><span className="text-slate-400">Price</span><strong className="text-right"><span className="mr-2 text-slate-400 line-through">{text.decoderPrice}</span><span className="text-emerald-600">PREORDER {text.decoderPoPrice}</span></strong></div></div></div></>}
                </>}
                {activeProduct === 1 && <>
                  <button type="button" onClick={() => toggleProduct('host')} className={`group text-center transition-transform duration-300 ease-out will-change-transform lg:col-span-2 ${expandedProduct === 'host' ? 'w-full' : 'w-full max-w-xl lg:justify-self-center lg:w-[34rem]'}`} aria-expanded={expandedProduct === 'host'}>
                    <img src="/yurlaps-host.png" alt={text.hostName} className="h-[22rem] w-full object-contain transition duration-500 group-hover:scale-[1.02] sm:h-[28rem]" />
                    <h2 className="mt-5 font-display text-3xl font-extrabold leading-[0.98] tracking-[-0.07em] transition-colors group-hover:text-ocean sm:text-5xl">{text.hostName}</h2>
                  </button>
                  {expandedProduct === 'host' && <><div className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-md lg:hidden" onClick={() => setExpandedProduct(null)} aria-hidden="true" /><div className="fixed left-1/2 top-1/2 z-50 max-h-[82vh] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-blue-100 bg-white p-6 pt-16 shadow-2xl animate-[product-modal-in_0.3s_ease-out_both] sm:w-[calc(100%-4rem)] sm:p-8 lg:static lg:col-span-2 lg:max-h-none lg:w-full lg:translate-x-0 lg:translate-y-0 lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:pt-0 lg:shadow-none"><button type="button" onClick={() => setExpandedProduct(null)} className="absolute right-4 top-4 rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-blue-50 hover:text-ocean lg:hidden" aria-label="Close product details"><X size={18} /></button><p className="text-lg leading-8 text-slate-600">{text.hostDescription}</p><div className="mt-7 border-y border-slate-200"><div className="flex items-center justify-between py-3 text-sm"><span className="text-slate-400">{text.hostDetails}</span><strong className="text-right text-ink">{text.hostDetailsValue}</strong></div><div className="flex items-center justify-between border-t border-slate-100 py-3 text-sm"><span className="text-slate-400">Price</span><strong className="text-right text-ink">{text.hostPrice}</strong></div></div></div></>}
                </>}
                {activeProduct === 2 && <>
                  <button type="button" onClick={() => toggleProduct('transponder')} className={`group text-center transition-transform duration-300 ease-out will-change-transform lg:col-span-2 ${expandedProduct === 'transponder' ? 'w-full' : 'w-full max-w-xl lg:justify-self-center lg:w-[34rem]'}`} aria-expanded={expandedProduct === 'transponder'}>
                    <img src="/yurlaps-transponder.png" alt={text.transponderName} className="h-[22rem] w-full object-contain transition duration-500 group-hover:scale-[1.02] sm:h-[28rem]" />
                    <h2 className="mt-5 font-display text-3xl font-extrabold leading-[0.98] tracking-[-0.07em] transition-colors group-hover:text-ocean sm:text-5xl">{text.transponderName}</h2>
                  </button>
                  {expandedProduct === 'transponder' && <><div className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-md lg:hidden" onClick={() => setExpandedProduct(null)} aria-hidden="true" /><div className="fixed left-1/2 top-1/2 z-50 max-h-[82vh] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-blue-100 bg-white p-6 pt-16 shadow-2xl animate-[product-modal-in_0.3s_ease-out_both] sm:w-[calc(100%-4rem)] sm:p-8 lg:static lg:col-span-2 lg:max-h-none lg:w-full lg:translate-x-0 lg:translate-y-0 lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:pt-0 lg:shadow-none"><button type="button" onClick={() => setExpandedProduct(null)} className="absolute right-4 top-4 rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-blue-50 hover:text-ocean lg:hidden" aria-label="Close product details"><X size={18} /></button><p className="text-lg leading-8 text-slate-600">{text.transponderDescription}</p><div className="mt-7 border-y border-slate-200"><p className="border-b border-slate-100 py-3 text-xs font-bold uppercase tracking-[0.18em] text-ocean">{text.transponderDetails}</p>{[[text.transponderSize, text.transponderSizeValue], [text.transponderData, text.transponderDataValue]].map(([label, value]) => <div key={label} className="flex items-center justify-between border-b border-slate-100 py-3 text-sm last:border-b-0"><span className="text-slate-400">{label}</span><strong className="max-w-[65%] text-right text-ink">{value}</strong></div>)}<div className="flex items-center justify-between border-t border-slate-100 py-3 text-sm"><span className="text-slate-400">Price</span><strong className="max-w-[65%] text-right"><span className="mr-2 text-slate-400 line-through">{text.transponderPrice}</span><span className="text-emerald-600">PREORDER {text.transponderPoPrice}</span></strong></div></div><div className="mt-8 flex items-center justify-between border-y border-slate-200 py-4 text-sm"><div><p className="font-semibold text-ink">{text.transponderStock}</p><p className="mt-1 text-slate-400">{text.transponderStockNote}</p></div><span className="h-2.5 w-2.5 rounded-full bg-blue-400" /></div></div></>}
                </>}
                {activeProduct === 3 && <>
                  <button type="button" onClick={() => toggleProduct('loop')} className={`group text-center transition-transform duration-300 ease-out will-change-transform lg:col-span-2 ${expandedProduct === 'loop' ? 'w-full' : 'w-full max-w-xl lg:justify-self-center lg:w-[34rem]'}`} aria-expanded={expandedProduct === 'loop'}>
                    <img src="/yurlaps-bridge.png" alt={text.productName} className="h-[22rem] w-full object-contain transition duration-500 group-hover:scale-[1.02] sm:h-[28rem]" />
                    <h2 className="mt-5 font-display text-3xl font-extrabold leading-[0.98] tracking-[-0.07em] transition-colors group-hover:text-ocean sm:text-5xl">{text.productName}</h2>
                  </button>
                  {expandedProduct === 'loop' && <><div className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-md lg:hidden" onClick={() => setExpandedProduct(null)} aria-hidden="true" /><div className="fixed left-1/2 top-1/2 z-50 max-h-[82vh] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-blue-100 bg-white p-6 pt-16 shadow-2xl animate-[product-modal-in_0.3s_ease-out_both] sm:w-[calc(100%-4rem)] sm:p-8 lg:static lg:col-span-2 lg:max-h-none lg:w-full lg:translate-x-0 lg:translate-y-0 lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:pt-0 lg:shadow-none"><button type="button" onClick={() => setExpandedProduct(null)} className="absolute right-4 top-4 rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-blue-50 hover:text-ocean lg:hidden" aria-label="Close product details"><X size={18} /></button><p className="text-lg font-semibold leading-8 text-ocean">{text.productTagline}</p><p className="mt-5 text-lg leading-8 text-slate-600">{text.productDescription}</p><div className="mt-7 border-y border-slate-200">{[[text.span, text.spanValue], [text.cable, text.cableValue], [text.connection, text.connectionValue]].map(([label, value]) => <div key={label} className="flex items-center justify-between border-b border-slate-100 py-3 text-sm last:border-b-0"><span className="text-slate-400">{label}</span><strong className="text-right text-ink">{value}</strong></div>)}</div><div className="mt-8 flex items-center justify-between border-y border-slate-200 py-4 text-sm"><div><p className="font-semibold text-ink">{text.stock}</p><p className="mt-1 text-slate-400">{text.stockNote}</p></div><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /></div></div></>}
                </>}
              </div>
              <div className={`relative z-10 justify-center gap-2 border-t border-slate-100 py-4 ${expandedProduct ? 'hidden lg:flex' : 'flex'}`}>{[0, 1, 2, 3].map((index) => <button key={index} type="button" onClick={() => { setActiveProduct(index); setExpandedProduct(null) }} className={`h-2.5 rounded-full transition-all ${activeProduct === index ? 'w-8 bg-ocean' : 'w-2.5 bg-slate-300'}`} aria-label={`Go to product ${index + 1}`} />)}</div>
            </div>
          </div>
        </section>

        <section id="gallery" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="max-w-2xl"><p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-ocean">{text.gallery}</p><h2 className="font-display text-4xl font-extrabold tracking-[-0.07em] sm:text-6xl">{text.galleryTitle}</h2><p className="mt-5 text-lg leading-8 text-slate-500">{text.galleryText}</p></div>
          <div className="mt-12"><img src={gallery[0].src} alt={gallery[0].alt} className="h-auto max-h-[42rem] w-full rounded-[2rem] object-contain" /></div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 lg:pb-28"><div className="rounded-[2rem] bg-ink px-7 py-14 text-white sm:px-12 lg:px-20"><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">{text.contact}</p><h2 className="mt-4 max-w-2xl font-display text-4xl font-extrabold leading-[1] tracking-[-0.07em] sm:text-6xl">{text.contactTitle}</h2><p className="mt-5 max-w-lg text-base leading-7 text-slate-300">{text.contactText}</p><button onClick={openContact} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-bold text-ink transition hover:bg-blue-100">{text.contactButton} <Mail size={16} /></button></div></section>

        <section id="account" className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
          <div className="flex flex-col justify-between gap-5 border-t border-slate-200 pt-8 sm:flex-row sm:items-center">
            <span className="text-sm font-semibold">{text.account}</span>
            <div className="flex flex-wrap gap-2">
              {[['home', text.home], ['products', text.product], ['gallery', text.gallery], ['contact', text.contact]].map(([id, label]) => (
                <button key={id} onClick={() => scrollTo(id)} className="rounded-full bg-blue-50 px-3.5 py-2 text-xs font-bold text-ocean transition hover:bg-blue-100">{label}</button>
              ))}
            </div>
          </div>
        </section>
      </main>

      {contactOpen && <div className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/45 px-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={text.contact}>
        <div className="relative w-full max-w-sm rounded-[2rem] bg-white p-7 shadow-2xl">
          <button onClick={() => setContactOpen(false)} className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-ink" aria-label="Close contact dialog"><X size={19} /></button>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean">{text.contact}</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.06em] text-ink">{text.contactTitle}</h2>
          <a href="https://wa.me/6285156462372" target="_blank" rel="noreferrer" className="mt-7 flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#1ebe5d]">
            <MessageCircle size={18} /> WhatsApp
          </a>
        </div>
      </div>}

      <footer className="mx-auto flex max-w-6xl items-center justify-between border-t border-slate-200 px-5 py-8 text-xs text-slate-400 sm:px-8"><span>Â© 2026 YurLaps. {text.footer}</span><button onClick={() => scrollTo('home')} className="flex items-center gap-2 font-semibold text-ink hover:text-ocean">{text.back} <ChevronDown size={14} className="rotate-180" /></button></footer>
    </div>
  )
}

export default App
