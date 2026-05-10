import { useState, useEffect, useCallback, useRef } from 'react'
import './App.css'

/* ── Data ── */
const galleryPhotos = [
  { id:1, src:'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', thumb:'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=70', alt:'Pasangan pengantin romantis', span:'tall' },
  { id:2, src:'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80', thumb:'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500&q=70', alt:'Momen ciuman pengantin', span:'normal' },
  { id:3, src:'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80', thumb:'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&q=70', alt:'Pernikahan outdoor', span:'wide' },
  { id:4, src:'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', thumb:'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&q=70', alt:'Detail gaun pengantin', span:'normal' },
  { id:5, src:'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80', thumb:'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=500&q=70', alt:'Resepsi pernikahan', span:'tall' },
  { id:6, src:'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80', thumb:'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=500&q=70', alt:'Pengantin berjalan bersama', span:'normal' },
  { id:7, src:'https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=800&q=80', thumb:'https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=500&q=70', alt:'Momen bahagia pengantin', span:'wide' },
  { id:8, src:'https://images.unsplash.com/photo-1529636444744-adffc9135a5e?w=800&q=80', thumb:'https://images.unsplash.com/photo-1529636444744-adffc9135a5e?w=500&q=70', alt:'Foto keluarga pernikahan', span:'normal' },
  { id:9, src:'https://images.unsplash.com/photo-1501901609772-df0848060b33?w=800&q=80', thumb:'https://images.unsplash.com/photo-1501901609772-df0848060b33?w=500&q=70', alt:'Dekorasi pernikahan elegan', span:'normal' },
]

const weddingVideos = [
  { id:1, youtubeId:'Kf5rKsgjFAY', title:'Wedding Highlight Film', couple:'Andi & Sari', date:'Jan 2024', category:'Diamond', featured:true },
  { id:2, youtubeId:'WpkGCi5m8GE', title:'Cinematic Wedding', couple:'Budi & Dewi', date:'Feb 2024', category:'Gold' },
  { id:3, youtubeId:'9bZkp7q19f0', title:'Wedding Teaser', couple:'Reza & Ayu', date:'Mar 2024', category:'Diamond' },
  { id:4, youtubeId:'dQw4w9WgXcQ', title:'Wedding Documentation', couple:'Hendra & Lia', date:'Apr 2024', category:'Silver' },
  { id:5, youtubeId:'JGwWNGJdvx8', title:'Romantic Highlight', couple:'Fajar & Nisa', date:'Mei 2024', category:'Gold' },
]

const companyVideos = [
  { id:1, youtubeId:'dQw4w9WgXcQ', title:'Company Profile Film', couple:'PT. Nusantara Prima', date:'2024', category:'Corporate', featured:true },
  { id:2, youtubeId:'JGwWNGJdvx8', title:'Product Launch Video', couple:'Brand Lokal Indonesia', date:'2024', category:'Commercial' },
  { id:3, youtubeId:'9bZkp7q19f0', title:'Event Documentation', couple:'Gala Dinner 2024', date:'2024', category:'Event' },
  { id:4, youtubeId:'WpkGCi5m8GE', title:'Annual Report Film', couple:'PT. Maju Bersama', date:'2023', category:'Corp' },
]

const weddingPackages = [
  { name:'Silver', price:'Rp 3.800.000', tag:'PKG_01', highlight:false,
    features:['1 Fotografer + 1 Videografer','Cetak foto beragam ukuran','Album eksklusif','File foto unlimited (flashdisk)','Video dokumentasi / klip 2–3 menit'] },
  { name:'Gold', price:'Rp 4.800.000', tag:'PKG_02', highlight:true, badge:'TERPOPULER',
    features:['2 Fotografer + 1 Videografer','Cetak foto lebih banyak','Termasuk ukuran 40×60 cm','File unlimited (flashdisk)','Video dokumentasi / klip'] },
  { name:'Diamond', price:'Rp 6.000.000', tag:'PKG_03', highlight:false,
    features:['2 Fotografer + 1 Videografer','Cetak terbanyak berbagai ukuran','Video dokumentasi lengkap','Teaser video eksklusif','File unlimited (flashdisk)'] },
]

const preweddingPackages = [
  { name:'Prewedding Gold', price:'Rp 1.800.000', tag:'PRE_01', highlight:false,
    features:['Sesi foto 3 jam','2 lokasi pemotretan','Maksimal 2 kostum','20 file foto teredit','Cetak foto 40×60 cm','Unlimited photo file'] },
  { name:'Prewedding Diamond', price:'Rp 2.800.000', tag:'PRE_02', highlight:true, badge:'BEST VALUE',
    features:['Sesi foto 3 jam','2 lokasi pemotretan','Maksimal 2 kostum','20 file foto teredit','Cetak foto 40×60 cm','Unlimited photo file','Makeup Artist GRATIS'] },
]

/* ── Aperture Iris SVG ── */
function ApertureIris({ size = 240, opacity = 0.28, spinning = true }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 100 100"
      style={{ opacity, animation: spinning ? 'spin-cw 35s linear infinite' : 'none', display:'block' }}
    >
      <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(172,186,196,0.4)" strokeWidth="0.4" />
      <circle cx="50" cy="50" r="43" fill="none" stroke="rgba(172,186,196,0.2)" strokeWidth="0.3" strokeDasharray="2 4" />
      {[0,30,60,90,120,150].map(angle => (
        <ellipse key={angle} cx="50" cy="50" rx="34" ry="9"
          fill="none" stroke="rgba(172,186,196,0.55)" strokeWidth="0.7"
          transform={`rotate(${angle} 50 50)`} />
      ))}
      {Array.from({length:36}).map((_,i) => {
        const rad = (i * 10) * Math.PI / 180
        const r1 = i % 3 === 0 ? 46 : 44
        return <line key={i}
          x1={50 + Math.cos(rad)*r1} y1={50 + Math.sin(rad)*r1}
          x2={50 + Math.cos(rad)*48} y2={50 + Math.sin(rad)*48}
          stroke="rgba(172,186,196,0.45)" strokeWidth="0.4" />
      })}
      <circle cx="50" cy="50" r="14" fill="none" stroke="rgba(48,54,79,0.5)" strokeWidth="0.8" />
      <circle cx="50" cy="50" r="4"  fill="rgba(48,54,79,0.6)" />
      <circle cx="50" cy="50" r="7"  fill="none" stroke="rgba(172,186,196,0.45)" strokeWidth="0.5" strokeDasharray="1 2" />
    </svg>
  )
}

/* ── Camera SVG ── */
function CameraSVG({ size = 280, opacity = 0.3 }) {
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 200 150" fill="none" style={{ opacity, display:'block' }}>
      <rect x="18" y="45" width="164" height="95" rx="10" stroke="rgba(48,54,79,0.5)" strokeWidth="1.5" />
      <rect x="65" y="30" width="70" height="22" rx="5" stroke="rgba(48,54,79,0.35)" strokeWidth="1.2" />
      <circle cx="148" cy="30" r="8" stroke="rgba(48,54,79,0.4)" strokeWidth="1.2" />
      <circle cx="148" cy="30" r="4" fill="rgba(48,54,79,0.2)" />
      <circle cx="90" cy="93" r="40" stroke="rgba(48,54,79,0.45)" strokeWidth="1.5" />
      <circle cx="90" cy="93" r="33" stroke="rgba(48,54,79,0.2)" strokeWidth="1" strokeDasharray="3 3"
        style={{ animation:'spin-ccw 20s linear infinite', transformOrigin:'90px 93px' }} />
      <circle cx="90" cy="93" r="25" stroke="rgba(48,54,79,0.3)" strokeWidth="1" />
      {[0,30,60,90,120,150].map(a => (
        <ellipse key={a} cx="90" cy="93" rx="20" ry="6"
          fill="none" stroke="rgba(172,186,196,0.5)" strokeWidth="0.8"
          transform={`rotate(${a} 90 93)`}
          style={{ animation:`spin-cw 18s linear infinite`, transformOrigin:'90px 93px' }} />
      ))}
      <circle cx="90" cy="93" r="4" fill="rgba(48,54,79,0.7)" />
      <rect x="130" y="52" width="28" height="20" rx="3" stroke="rgba(48,54,79,0.3)" strokeWidth="1" />
      <rect x="82" y="23" width="36" height="8" rx="2" stroke="rgba(48,54,79,0.2)" strokeWidth="1" />
      <polyline points="18,45 18,55" stroke="rgba(172,186,196,0.9)" strokeWidth="2" />
      <polyline points="18,45 28,45" stroke="rgba(172,186,196,0.9)" strokeWidth="2" />
      <polyline points="182,45 182,55" stroke="rgba(172,186,196,0.9)" strokeWidth="2" />
      <polyline points="182,45 172,45" stroke="rgba(172,186,196,0.9)" strokeWidth="2" />
      <polyline points="18,140 18,130" stroke="rgba(172,186,196,0.9)" strokeWidth="2" />
      <polyline points="18,140 28,140" stroke="rgba(172,186,196,0.9)" strokeWidth="2" />
      <polyline points="182,140 182,130" stroke="rgba(172,186,196,0.9)" strokeWidth="2" />
      <polyline points="182,140 172,140" stroke="rgba(172,186,196,0.9)" strokeWidth="2" />
      {Array.from({length:24}).map((_,i) => {
        const rad = (i * 15) * Math.PI / 180
        const r1 = i % 3 === 0 ? 37 : 35
        return <line key={i}
          x1={90 + Math.cos(rad)*r1} y1={93 + Math.sin(rad)*r1}
          x2={90 + Math.cos(rad)*40} y2={93 + Math.sin(rad)*40}
          stroke="rgba(48,54,79,0.3)" strokeWidth="0.6" />
      })}
    </svg>
  )
}

/* ── Wedding Rings SVG ── */
function WeddingRings({ width = 96 }) {
  const h = width * 0.56
  return (
    <svg width={width} height={h} viewBox="0 0 96 54" fill="none">
      <circle cx="36" cy="27" r="21" stroke="rgba(172,186,196,0.2)" strokeWidth="6" />
      <circle cx="60" cy="27" r="21" stroke="rgba(48,54,79,0.15)" strokeWidth="6" />
      <circle cx="36" cy="27" r="21" stroke="rgba(172,186,196,0.8)" strokeWidth="1.8" />
      <circle cx="60" cy="27" r="21" stroke="rgba(48,54,79,0.55)" strokeWidth="1.8" />
      <circle cx="36" cy="7"  r="1.5" fill="rgba(172,186,196,0.95)" />
      <circle cx="60" cy="7"  r="1.5" fill="rgba(48,54,79,0.8)" />
    </svg>
  )
}

/* ── Animate In ── */
const TRANSFORMS = {
  bottom: ['translateY(44px)', 'translateY(0)'],
  top:    ['translateY(-44px)', 'translateY(0)'],
  left:   ['translateX(-50px)', 'translateX(0)'],
  right:  ['translateX(50px)',  'translateX(0)'],
  scale:  ['scale(0.9)',        'scale(1)'],
}

function AnimateIn({ children, delay = 0, className = '', from = 'bottom' }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const [from0, to0] = TRANSFORMS[from] ?? TRANSFORMS.bottom
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? to0 : from0,
      transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
    }}>{children}</div>
  )
}

/* ── Section Label ── */
function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-3 mb-5">
      <div className="w-8 h-px" style={{ background:'rgba(48,54,79,0.4)' }} />
      <span style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:4, color:'rgba(48,54,79,0.65)', textTransform:'uppercase' }}>
        {children}
      </span>
      <div className="w-8 h-px" style={{ background:'rgba(48,54,79,0.4)' }} />
    </div>
  )
}

/* ── Film Strip ── */
function FilmStrip() {
  const holes = Array.from({ length: 44 })
  return (
    <div className="film-strip py-2 opacity-60">
      <div className="film-strip-track">
        {[...holes, ...holes].map((_, i) => <div key={i} className="film-hole" />)}
      </div>
    </div>
  )
}

/* ── Lightbox ── */
function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  const photo = photos[index]
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [onClose, onPrev, onNext])

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background:'rgba(10,10,10,0.97)' }} onClick={onClose}>
      <button onClick={onClose} className="absolute top-5 right-6 text-white/50 hover:text-white text-4xl font-light leading-none transition-colors z-10 cursor-pointer bg-transparent border-none">×</button>
      <div className="absolute top-6 left-1/2 -translate-x-1/2" style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:3, color:'rgba(255,255,255,0.4)' }}>
        {String(index+1).padStart(3,'0')} / {String(photos.length).padStart(3,'0')}
      </div>
      <button onClick={(e)=>{ e.stopPropagation(); onPrev() }} className="absolute left-4 md:left-8 text-white/40 hover:text-white text-5xl font-thin leading-none transition-colors cursor-pointer bg-transparent border-none select-none">‹</button>
      <div className="relative" onClick={e=>e.stopPropagation()}>
        <div className="cyber-corners" style={{ inset:-8 }}>
          <div className="cyber-corner cyber-corner-tl cyber-corner-bright" />
          <div className="cyber-corner cyber-corner-tr cyber-corner-bright" />
          <div className="cyber-corner cyber-corner-bl cyber-corner-bright" />
          <div className="cyber-corner cyber-corner-br cyber-corner-bright" />
        </div>
        <img src={photo.src} alt={photo.alt} className="max-h-[85vh] max-w-[90vw] object-contain" />
      </div>
      <button onClick={(e)=>{ e.stopPropagation(); onNext() }} className="absolute right-4 md:right-8 text-white/40 hover:text-white text-5xl font-thin leading-none transition-colors cursor-pointer bg-transparent border-none select-none">›</button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2" style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'rgba(255,255,255,0.35)', letterSpacing:2 }}>
        {photo.alt}
      </div>
    </div>
  )
}

/* ── Video Card ── */
function VideoCard({ video, onClick, large }) {
  return (
    <div onClick={() => onClick(video)} className="group relative overflow-hidden cursor-pointer cyber-card neon-box-hover hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-video">
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
          alt={`${video.couple} - ${video.title}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ filter:'brightness(0.6) saturate(0.7)' }}
          loading="lazy"
          onError={(e) => { e.target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg` }}
        />
        <div className="absolute inset-0" style={{ background:'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ border:'1.5px solid rgba(172,186,196,0.6)', transition:'all 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow='0 0 25px rgba(172,186,196,0.5)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow='0 0 0 0 transparent'}>
            <svg className="w-5 h-5 fill-white ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <span className="absolute top-3 left-3 text-[9px] font-bold tracking-[2px] uppercase px-2.5 py-1"
          style={{ fontFamily:'var(--font-mono)', background:'#30364F', color:'#F0F0DB' }}>
          {video.category}
        </span>
      </div>
      <div className="p-5">
        <p className="text-[10px] tracking-widest mb-1.5" style={{ fontFamily:'var(--font-mono)', color:'rgba(48,54,79,0.55)' }}>{video.date}</p>
        <h3 className={`font-serif text-gray-900 font-light leading-snug mb-1 ${large ? 'text-2xl' : 'text-lg'}`}>{video.title}</h3>
        <p className="text-sm" style={{ fontFamily:'var(--font-mono)', color:'rgba(48,54,79,0.5)' }}>{video.couple}</p>
      </div>
    </div>
  )
}

/* ── Video Modal ── */
function VideoModal({ video, onClose }) {
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-4" style={{ background:'rgba(10,10,10,0.97)' }} onClick={onClose}>
      <button onClick={onClose} className="absolute top-5 right-6 text-white/50 hover:text-white text-4xl font-light leading-none transition-colors z-10 cursor-pointer bg-transparent border-none">×</button>
      <div className="w-full max-w-4xl" onClick={e=>e.stopPropagation()}>
        <div className="relative w-full overflow-hidden" style={{ paddingTop:'56.25%', border:'1px solid rgba(172,186,196,0.3)', boxShadow:'0 0 60px rgba(0,0,0,0.5)' }}>
          <iframe className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={`${video.couple} - ${video.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen />
        </div>
        <div className="mt-4 text-center">
          <h3 className="font-serif text-white text-xl font-light">{video.couple}</h3>
          <p style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'rgba(255,255,255,0.4)', letterSpacing:2 }} className="mt-1">{video.title} · {video.date}</p>
        </div>
      </div>
    </div>
  )
}

/* ── Package Card ── */
function PackageCard({ pkg }) {
  return (
    <div className={`relative p-8 text-left cyber-card neon-box-hover transition-all duration-300 hover:-translate-y-1 ${pkg.highlight ? 'neon-box' : ''}`}
      style={pkg.highlight ? { borderColor:'rgba(172,186,196,0.55)' } : {}}>
      {pkg.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-bold tracking-[3px] uppercase px-4 py-1 whitespace-nowrap"
          style={{ fontFamily:'var(--font-mono)', background:'#30364F', color:'#F0F0DB' }}>
          {pkg.badge}
        </span>
      )}
      <div className="cyber-corners">
        <div className={`cyber-corner cyber-corner-tl ${pkg.highlight ? 'cyber-corner-bright' : ''}`} />
        <div className={`cyber-corner cyber-corner-tr ${pkg.highlight ? 'cyber-corner-bright' : ''}`} />
        <div className={`cyber-corner cyber-corner-bl ${pkg.highlight ? 'cyber-corner-bright' : ''}`} />
        <div className={`cyber-corner cyber-corner-br ${pkg.highlight ? 'cyber-corner-bright' : ''}`} />
      </div>
      {pkg.highlight && <div className="holo-shimmer" />}

      <p className="text-[9px] tracking-[4px] mb-2" style={{ fontFamily:'var(--font-mono)', color:'rgba(48,54,79,0.45)' }}>{pkg.tag}</p>
      <h3 className="font-serif text-3xl font-light text-gray-900 mb-2">{pkg.name}</h3>
      <div className={`font-serif text-xl mb-6 pb-5 ${pkg.highlight ? 'neon-glow' : ''}`}
        style={{ color:'#30364F', borderBottom:'1px solid rgba(48,54,79,0.12)' }}>
        {pkg.price}
      </div>
      <ul className="flex flex-col gap-2.5 mb-8">
        {pkg.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-relaxed" style={{ fontFamily:'var(--font-mono)' }}>
            <span style={{ color:'#ACBAC4' }} className="shrink-0">&gt;</span>
            <span style={{ color:'rgba(48,54,79,0.6)' }}>{f}</span>
          </li>
        ))}
      </ul>
      <a href="https://wa.me/6289908573023" target="_blank" rel="noopener noreferrer"
        className="block text-center py-3 px-6 text-xs font-bold tracking-[3px] uppercase no-underline transition-all duration-300 hover:-translate-y-0.5"
        style={{
          fontFamily:'var(--font-mono)',
          ...(pkg.highlight
            ? { background:'#30364F', color:'#F0F0DB', boxShadow:'0 0 20px rgba(48,54,79,0.2)' }
            : { border:'1px solid rgba(48,54,79,0.3)', color:'#30364F' }),
        }}>
        PESAN SEKARANG
      </a>
    </div>
  )
}

/* ── App ── */
export default function App() {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [activeVideo, setActiveVideo] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const heroBgRef = useRef(null)
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevPhoto = useCallback(() => setLightboxIndex(i => (i - 1 + galleryPhotos.length) % galleryPhotos.length), [])
  const nextPhoto = useCallback(() => setLightboxIndex(i => (i + 1) % galleryPhotos.length), [])

  useEffect(() => {
    let rafId = null
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const sy = window.scrollY
        setScrollY(sy)
        if (heroBgRef.current) {
          heroBgRef.current.style.transform = `translateY(${sy * 0.35}px)`
        }
        rafId = null
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const smoothScrollTo = useCallback((id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const navLinks = [['Tentang','#about'],['Foto','#gallery'],['Video','#video'],['Event','#event'],['Paket','#packages']]

  return (
    <div className="min-h-screen page-expose">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background:'rgba(240,240,219,0.95)', backdropFilter:'blur(16px)', borderBottom:'1px solid rgba(48,54,79,0.1)' }}>
        <div className="max-w-6xl mx-auto px-8 h-[66px] flex items-center justify-between">
          <div className="flex items-center gap-3 font-serif text-2xl font-semibold tracking-widest">
            <img src="/icon.png" alt="Mono Gram" className="h-9 w-auto" />
            <span style={{ color:'#30364F' }}>Monogram</span>
          </div>

          {/* Desktop menu */}
          <ul className="hidden lg:flex items-center gap-7 list-none">
            {navLinks.map(([label,href]) => (
              <li key={href}>
                <a href={href} className="no-underline transition-colors"
                  style={{ fontFamily:'var(--font-serif)', fontSize:13, letterSpacing:2, color:'rgba(48,54,79,0.55)' }}
                  onMouseEnter={e => e.currentTarget.style.color='#30364F'}
                  onMouseLeave={e => e.currentTarget.style.color='rgba(48,54,79,0.55)'}
                  onClick={e => { e.preventDefault(); smoothScrollTo(href) }}>
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className="no-underline transition-all hover:-translate-y-0.5"
                style={{ fontFamily:'var(--font-serif)', fontSize:13, letterSpacing:2, background:'#30364F', color:'#F0F0DB', padding:'10px 20px', fontWeight:400 }}
                onClick={e => { e.preventDefault(); smoothScrollTo('#contact') }}>
                Hubungi
              </a>
            </li>
          </ul>

          {/* Hamburger button */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 bg-transparent border-none cursor-pointer"
            onClick={() => setMobileMenuOpen(o => !o)}
            aria-label="Toggle menu">
            <span className="block w-6 h-px transition-all duration-300"
              style={{ background:'#30364F', transform: mobileMenuOpen ? 'translateY(4px) rotate(45deg)' : 'none' }} />
            <span className="block w-6 h-px transition-all duration-300"
              style={{ background:'#30364F', opacity: mobileMenuOpen ? 0 : 1 }} />
            <span className="block w-6 h-px transition-all duration-300"
              style={{ background:'#30364F', transform: mobileMenuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>

        {/* Mobile drawer */}
        <div className="lg:hidden overflow-hidden transition-all duration-300"
          style={{ maxHeight: mobileMenuOpen ? '400px' : '0', borderTop: mobileMenuOpen ? '1px solid rgba(48,54,79,0.08)' : 'none' }}>
          <ul className="flex flex-col list-none px-8 py-4 gap-1" style={{ background:'rgba(240,240,219,0.98)' }}>
            {navLinks.map(([label,href]) => (
              <li key={href}>
                <a href={href}
                  className="block no-underline py-3 transition-colors"
                  style={{ fontFamily:'var(--font-serif)', fontSize:16, letterSpacing:1, color:'rgba(48,54,79,0.65)', borderBottom:'1px solid rgba(48,54,79,0.07)' }}
                  onClick={e => { e.preventDefault(); setMobileMenuOpen(false); setTimeout(() => smoothScrollTo(href), 150) }}>
                  {label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a href="#contact"
                className="block no-underline text-center py-3 transition-all"
                style={{ fontFamily:'var(--font-serif)', fontSize:15, background:'#30364F', color:'#F0F0DB', letterSpacing:2 }}
                onClick={e => { e.preventDefault(); setMobileMenuOpen(false); setTimeout(() => smoothScrollTo('#contact'), 150) }}>
                Hubungi
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background:'#30364F' }}>

        {/* Wedding photo background — parallax */}
        <div ref={heroBgRef} className="absolute pointer-events-none" style={{
          inset: '-15% 0',
          backgroundImage: 'url(https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center 30%',
          filter: 'brightness(0.35) saturate(0.4)',
          willChange: 'transform',
        }} />

        {/* Gradient vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(48,54,79,0.2) 0%, rgba(48,54,79,0.7) 70%)' }} />

        {/* Accent glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:'radial-gradient(ellipse at 50% 50%, rgba(172,186,196,0.06) 0%, transparent 60%)' }} />

        {/* Camera decoration */}
        <div className="absolute pointer-events-none hidden lg:block"
          style={{ right:'5%', top:'50%', transform:'translateY(-50%)', opacity:0.25 }}>
          <CameraSVG size={300} opacity={1} />
        </div>

        {/* Aperture iris accent */}
        <div className="absolute pointer-events-none hidden lg:block"
          style={{ left:'4%', bottom:'12%' }}>
          <ApertureIris size={120} opacity={0.18} spinning={false} />
        </div>

        {/* Main content */}
        <div className="relative z-10 text-center max-w-3xl px-6">
          <div className="relative inline-block w-full">
            <div className="focus-corners hidden md:block">
              <div className="focus-corner-c tl" />
              <div className="focus-corner-c tr" />
              <div className="focus-corner-c bl" />
              <div className="focus-corner-c br" />
            </div>

            <div className="flex justify-center mb-3 pt-4">
              <WeddingRings width={80} />
            </div>

            <p className="mb-2" style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:5, color:'rgba(172,186,196,0.95)' }}>
              ✦ WEDDING &amp; FOTOGRAFER PROFESIONAL ✦
            </p>

            <h1 className="font-serif font-light text-white leading-[1.05] mb-6 px-4"
              style={{ fontSize:'clamp(52px,8vw,88px)', letterSpacing:'-1px' }}>
              Abadikan Momen<br />
              <em className="not-italic neon-glow" style={{ color:'#ACBAC4' }}>Terindah</em>{' '}Anda
            </h1>

            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px flex-1 max-w-[60px]" style={{ background:'rgba(240,240,219,0.2)' }} />
              <span style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:4, color:'rgba(240,240,219,0.5)' }}>
                FOTO · VIDEO · CETAK
              </span>
              <div className="h-px flex-1 max-w-[60px]" style={{ background:'rgba(240,240,219,0.2)' }} />
            </div>

            <p className="text-sm max-w-lg mx-auto mb-12 pb-4 leading-relaxed"
              style={{ fontFamily:'var(--font-mono)', color:'rgba(240,240,219,0.45)' }}>
              Fotografer &amp; videografer pernikahan terpercaya sejak 2010
            </p>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#packages" className="no-underline transition-all duration-300 hover:-translate-y-0.5"
              style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:3, fontWeight:700, background:'#ACBAC4', color:'#30364F', padding:'16px 36px' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow='0 0 30px rgba(172,186,196,0.5)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow='none'}>
              LIHAT PAKET
            </a>
            <a href="#contact" className="no-underline transition-all duration-300 hover:-translate-y-0.5"
              style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:3, color:'#F0F0DB', padding:'16px 36px', border:'1px solid rgba(240,240,219,0.35)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(240,240,219,0.7)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(240,240,219,0.35)' }}>
              KONSULTASI GRATIS
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ background:'#E1D9BC', borderTop:'1px solid rgba(48,54,79,0.1)', borderBottom:'1px solid rgba(48,54,79,0.1)' }} className="py-8">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ borderLeft:'1px solid rgba(48,54,79,0.1)' }}>
            {[
              { num:'14+', label:'TAHUN PENGALAMAN' },
              { num:'500+', label:'KLIEN BAHAGIA' },
              { num:'3', label:'PAKET WEDDING' },
              { num:'2', label:'PAKET PREWEDDING' },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center gap-2 py-6 px-4"
                style={{ borderRight:'1px solid rgba(48,54,79,0.1)' }}>
                <span className="font-serif font-light neon-glow" style={{ fontSize:48, color:'#30364F', lineHeight:1 }}>{s.num}</span>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:2, color:'rgba(48,54,79,0.5)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="relative py-28 px-6 overflow-hidden" style={{ background:'#F0F0DB' }}>
        <div className="absolute pointer-events-none hidden md:block"
          style={{ right:'-4%', top:'50%', transform:'translateY(-50%)', opacity:0.06 }}>
          <ApertureIris size={500} opacity={1} />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <AnimateIn>
            <div className="flex justify-center mb-4">
              <WeddingRings width={64} />
            </div>
            <SectionLabel>TENTANG KAMI</SectionLabel>
            <h2 className="font-serif font-light text-gray-900 leading-snug mb-4" style={{ fontSize:'clamp(36px,5vw,56px)' }}>
              Fotografer &amp; Videografer<br /><span className="neon-glow" style={{ color:'#ACBAC4' }}>Wedding</span> Profesional
            </h2>
            <p className="max-w-2xl mx-auto mb-16 leading-relaxed"
              style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'rgba(48,54,79,0.55)', lineHeight:1.8 }}>
              Monogram — studio foto &amp; video pernikahan profesional sejak 2010. Kami mengabadikan setiap momen cinta dengan seni visual terdepan dan peralatan terkini.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {[
              { icon:'📷', title:'FOTOGRAFI', desc:'Tim fotografer berpengalaman dengan peralatan terbaik', from:'left' },
              { icon:'🎬', title:'VIDEOGRAFI', desc:'Video sinematik berkualitas tinggi yang menyentuh hati', from:'bottom' },
              { icon:'🖨️', title:'CETAK PREMIUM', desc:'Hasil cetak eksklusif dengan material terbaik', from:'right' },
            ].map((p, i) => (
              <AnimateIn key={p.title} delay={i * 0.13} from={p.from}>
                <div className="relative p-8 cyber-card neon-box-hover overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                  <div className="cyber-corners">
                    <div className="cyber-corner cyber-corner-tl" />
                    <div className="cyber-corner cyber-corner-tr" />
                    <div className="cyber-corner cyber-corner-bl" />
                    <div className="cyber-corner cyber-corner-br" />
                  </div>
                  <div className="holo-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="text-4xl mb-4">{p.icon}</div>
                  <h4 className="font-bold mb-2 tracking-widest" style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'#30364F' }}>{p.title}</h4>
                  <p style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'rgba(48,54,79,0.55)', lineHeight:1.7 }}>{p.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hasil Foto ── */}
      <section id="gallery" className="py-0" style={{ background:'#F0F0DB' }}>
        <FilmStrip />
        <div className="py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <AnimateIn>
              <div className="flex justify-center mb-5">
                <ApertureIris size={72} opacity={0.65} spinning={false} />
              </div>
              <SectionLabel>HASIL FOTO · WEDDING GALLERY</SectionLabel>
              <h2 className="font-serif font-light text-gray-900 leading-snug mb-4" style={{ fontSize:'clamp(36px,5vw,56px)' }}>
                Momen Pernikahan yang<br />Telah Kami Abadikan
              </h2>
              <p className="max-w-lg mx-auto mb-14" style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'rgba(48,54,79,0.5)', lineHeight:1.8 }}>
                Setiap frame — sebuah cerita cinta yang abadi
              </p>
            </AnimateIn>

            <div className="gallery-grid">
              {galleryPhotos.map((photo, i) => (
                <div key={photo.id} onClick={() => setLightboxIndex(i)}
                  className={`gallery-item group relative overflow-hidden cursor-zoom-in
                    ${photo.span==='tall' ? 'gallery-tall' : ''}
                    ${photo.span==='wide' ? 'gallery-wide' : ''}`}>
                  <img src={photo.thumb} alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{ filter:'brightness(0.9) saturate(0.9)' }}
                    loading="lazy" />
                  <span className="absolute top-2 right-2 z-10 pointer-events-none"
                    style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'rgba(255,255,255,0.7)', letterSpacing:2 }}>
                    #{String(i+1).padStart(3,'0')}
                  </span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5"
                    style={{ background:'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }}>
                    <p className="text-white text-sm font-medium tracking-wide translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{photo.alt}</p>
                    <div className="flex items-center gap-1.5 mt-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:3, color:'rgba(172,186,196,0.95)' }}>LIHAT FOTO →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a href="https://instagram.com/BETHAdigital" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-14 no-underline transition-all duration-300 hover:-translate-y-0.5"
              style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:3, color:'#30364F', border:'1px solid rgba(48,54,79,0.35)', padding:'14px 32px' }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(48,54,79,0.7)'; e.currentTarget.style.boxShadow='0 0 20px rgba(48,54,79,0.08)' }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(48,54,79,0.35)'; e.currentTarget.style.boxShadow='none' }}>
              📸 INSTAGRAM GALLERY →
            </a>
          </div>
        </div>
        <FilmStrip />
      </section>

      {/* ── Video Wedding ── */}
      <section id="video" className="py-28 px-6" style={{ background:'#E1D9BC' }}>
        <div className="max-w-6xl mx-auto text-center">
          <AnimateIn>
            <div className="flex justify-center mb-5">
              <WeddingRings width={70} />
            </div>
            <SectionLabel>VIDEO WEDDING</SectionLabel>
            <h2 className="font-serif font-light text-gray-900 leading-snug mb-4" style={{ fontSize:'clamp(36px,5vw,56px)' }}>
              Cerita Cinta dalam<br /><span className="neon-glow" style={{ color:'#ACBAC4' }}>Sinema</span>
            </h2>
            <p className="max-w-lg mx-auto mb-14" style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'rgba(48,54,79,0.5)', lineHeight:1.8 }}>
              Setiap momen pernikahan — direkam menjadi film pendek yang abadi
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <div className="lg:row-span-2"><VideoCard video={weddingVideos[0]} onClick={setActiveVideo} large /></div>
            {weddingVideos.slice(1,3).map(v => <VideoCard key={v.id} video={v} onClick={setActiveVideo} />)}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {weddingVideos.slice(3).map(v => <VideoCard key={v.id} video={v} onClick={setActiveVideo} />)}
          </div>
          <a href="https://www.youtube.com/@BETHAdigital" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-14 no-underline transition-all duration-300 hover:-translate-y-0.5"
            style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:2, color:'#F0F0DB', fontWeight:700, background:'#30364F', padding:'14px 32px' }}
            onMouseEnter={e=>e.currentTarget.style.boxShadow='0 0 25px rgba(48,54,79,0.4)'}
            onMouseLeave={e=>e.currentTarget.style.boxShadow='none'}>
            <svg className="w-5 h-5 shrink-0" style={{ fill:'#F0F0DB' }} viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>
            YOUTUBE — WEDDING CHANNEL
          </a>
        </div>
      </section>

      {/* ── Video Company ── */}
      <section id="event" className="py-28 px-6" style={{ background:'#F0F0DB' }}>
        <div className="max-w-6xl mx-auto text-center">
          <AnimateIn>
            <SectionLabel>VIDEO COMPANY</SectionLabel>
            <h2 className="font-serif font-light text-gray-900 leading-snug mb-4" style={{ fontSize:'clamp(36px,5vw,56px)' }}>
              Profil &amp; Dokumentasi<br /><span className="neon-glow" style={{ color:'#ACBAC4' }}>Korporat</span> Anda
            </h2>
            <p className="max-w-lg mx-auto mb-14" style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'rgba(48,54,79,0.5)', lineHeight:1.8 }}>
              Company profile — commercial — event documentation
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <div className="lg:row-span-2"><VideoCard video={companyVideos[0]} onClick={setActiveVideo} large /></div>
            {companyVideos.slice(1,3).map(v => <VideoCard key={v.id} video={v} onClick={setActiveVideo} />)}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {companyVideos.slice(3).map(v => <VideoCard key={v.id} video={v} onClick={setActiveVideo} />)}
          </div>
          <a href="https://www.youtube.com/@BETHAdigital" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-14 no-underline transition-all duration-300 hover:-translate-y-0.5"
            style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:2, color:'#F0F0DB', fontWeight:700, background:'#30364F', padding:'14px 32px' }}
            onMouseEnter={e=>e.currentTarget.style.boxShadow='0 0 25px rgba(48,54,79,0.4)'}
            onMouseLeave={e=>e.currentTarget.style.boxShadow='none'}>
            <svg className="w-5 h-5 shrink-0" style={{ fill:'#F0F0DB' }} viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>
            YOUTUBE — COMPANY CHANNEL
          </a>
        </div>
      </section>

      {/* Modals */}
      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}
      {lightboxIndex !== null && <Lightbox photos={galleryPhotos} index={lightboxIndex} onClose={closeLightbox} onPrev={prevPhoto} onNext={nextPhoto} />}

      {/* ── Paket Wedding ── */}
      <section id="packages" className="py-28 px-6" style={{ background:'#E1D9BC' }}>
        <div className="max-w-6xl mx-auto text-center">
          <AnimateIn>
            <div className="flex justify-center mb-5">
              <ApertureIris size={68} opacity={0.55} spinning={false} />
            </div>
            <SectionLabel>PAKET WEDDING</SectionLabel>
            <h2 className="font-serif font-light text-gray-900 leading-snug mb-4" style={{ fontSize:'clamp(36px,5vw,56px)' }}>
              Pilih Paket yang<br />Sesuai Impian Anda
            </h2>
            <p className="max-w-lg mx-auto mb-16" style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'rgba(48,54,79,0.5)', lineHeight:1.8 }}>
              Setiap paket dirancang untuk mengabadikan hari spesial Anda
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {weddingPackages.map((pkg, i) => (
              <AnimateIn key={pkg.name} delay={i * 0.1} from={['left','scale','right'][i]}>
                <PackageCard pkg={pkg} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Paket Prewedding ── */}
      <section id="prewedding" className="py-28 px-6" style={{ background:'#F0F0DB' }}>
        <div className="max-w-6xl mx-auto text-center">
          <AnimateIn>
            <div className="flex justify-center mb-5">
              <WeddingRings width={64} />
            </div>
            <SectionLabel>PAKET PREWEDDING</SectionLabel>
            <h2 className="font-serif font-light text-gray-900 leading-snug mb-4" style={{ fontSize:'clamp(36px,5vw,56px)' }}>
              Rayakan Cinta Sebelum<br />Hari Pernikahan
            </h2>
            <p className="max-w-lg mx-auto mb-16" style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'rgba(48,54,79,0.5)', lineHeight:1.8 }}>
              Sesi foto prewedding romantis untuk mengabadikan kisah cinta
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto items-start">
            {preweddingPackages.map((pkg, i) => (
              <AnimateIn key={pkg.name} delay={i * 0.12} from={i === 0 ? 'left' : 'right'}>
                <PackageCard pkg={pkg} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="relative py-28 px-6 overflow-hidden" style={{ background:'#E1D9BC' }}>
        <div className="relative max-w-4xl mx-auto text-center">
          <AnimateIn>
            <SectionLabel>HUBUNGI KAMI</SectionLabel>
            <h2 className="font-serif font-light text-gray-900 leading-snug mb-4" style={{ fontSize:'clamp(36px,5vw,56px)' }}>
              Siap Mengabadikan<br /><span className="neon-glow" style={{ color:'#ACBAC4' }}>Momen</span> Anda?
            </h2>
            <p className="max-w-lg mx-auto mb-14" style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'rgba(48,54,79,0.5)', lineHeight:1.8 }}>
              Konsultasikan kebutuhan dokumentasi pernikahan Anda
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12 text-left">
            {[
              { icon:'💬', label:'WHATSAPP', value:'0899 0857 323', href:'https://wa.me/6289908573023' },
              { icon:'📧', label:'EMAIL', value:'bethadigital@gmail.com', href:'mailto:bethadigital@gmail.com' },
              { icon:'📸', label:'INSTAGRAM', value:'@bethadigital', href:'https://instagram.com/BETHAdigital' },
              { icon:'📘', label:'FACEBOOK', value:'bethadigitalpictures', href:'https://facebook.com/BETHAdigitalpictures' },
            ].map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 py-5 px-6 no-underline cyber-card neon-box-hover transition-all duration-300 hover:-translate-y-1">
                <span className="text-3xl shrink-0">{c.icon}</span>
                <div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:3, color:'rgba(48,54,79,0.55)' }} className="mb-1">{c.label}</div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'rgba(48,54,79,0.8)' }}>{c.value}</div>
                </div>
              </a>
            ))}
          </div>

          <a href="https://wa.me/6289908573023" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 no-underline transition-all duration-300 hover:-translate-y-0.5"
            style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:3, fontWeight:700, background:'#30364F', color:'#F0F0DB', padding:'18px 44px' }}
            onMouseEnter={e=>e.currentTarget.style.boxShadow='0 0 40px rgba(48,54,79,0.35)'}
            onMouseLeave={e=>e.currentTarget.style.boxShadow='none'}>
            CHAT WHATSAPP →
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 px-6 text-center" style={{ background:'#30364F', borderTop:'1px solid rgba(240,240,219,0.08)' }}>
        <div className="flex justify-center mb-3">
          <img src="/icon.png" alt="Monogram" className="h-14 w-auto opacity-80" />
        </div>
        <div className="font-serif text-3xl font-semibold tracking-widest mb-3">
          <span style={{ color:'#F0F0DB' }}>Monogram</span>
        </div>
        <p style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:2, color:'rgba(240,240,219,0.35)' }} className="mb-2">
          Studio Foto &amp; Video Pernikahan Profesional · Sejak 2010
        </p>
        <p style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'rgba(240,240,219,0.18)' }}>
          © {new Date().getFullYear()} Monogram. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  )
}
