import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Code2,
  Compass,
  Film,
  Gauge,
  Github,
  Heart,
  Leaf,
  Menu,
  Play,
  Search,
  Shuffle,
  Tv,
  X,
} from 'lucide-react'
import { carAssets, cars, movieAssets, movies, seasonAssets, seasons, series } from './data.js'

const githubRepo = 'https://github.com/Mahles63/VeriTech'
const githubProfile = 'https://github.com/Mahles63'

const sections = [
  { id: 'series', label: 'Series', icon: Tv, title: 'Stories that stay with you', count: series.length },
  { id: 'movies', label: 'Movies', icon: Film, title: 'The feature collection', count: movies.length },
  { id: 'cars', label: 'Cars', icon: Gauge, title: 'The open-road collection', count: cars.length },
  { id: 'seasons', label: 'Seasons', icon: Leaf, title: 'A year in photographs', count: seasons.length },
]

const collectionCopy = {
  movies: {
    kicker: 'The moving-image archive',
    title: <>One more scene.<br /><span className="text-funk">One more story.</span></>,
    description: 'Big-screen energy, unforgettable characters, and the next title for your watchlist. Pick a poster and step inside.',
    image: 'Venom.jpeg',
    asset: movieAssets,
    imageAlt: 'Venom emerging from deep blue shadows',
    stats: [`${movies.length} picks`, 'Movie nights'],
  },
  series: {
    kicker: 'Stories for the long way round',
    title: <>Stories worth<br /><span className="text-funk">staying up for.</span></>,
    description: 'From high-stakes crime sagas to offbeat family chaos, find a new world to get lost in.',
    image: 'Breaking bad.jpeg',
    asset: movieAssets,
    imageAlt: 'Breaking Bad characters in yellow protective suits',
    stats: [`${series.length} shows`, 'Binge-worthy'],
  },
  cars: {
    kicker: 'The open-road archive',
    title: <>Made for the<br /><span className="text-funk">long way.</span></>,
    description: 'A photo-led tour through the collection: sculpted AMG silhouettes, track details, and the moments that make a drive memorable.',
    image: 'Mercedes9.jpg',
    asset: carAssets,
    imageAlt: 'A dark Mercedes-AMG coupe against an open mountain landscape',
    stats: [`${cars.length} frames`, 'Performance design'],
  },
  seasons: {
    kicker: 'Notes from the changing year',
    title: <>Find your<br /><span className="text-funk">kind of quiet.</span></>,
    description: 'A changing canvas of open water, mountain snow, fall color, and the small details in between.',
    image: 'Seasons_digital_art.jpg',
    asset: seasonAssets,
    imageAlt: 'An illustrated landscape shifting through all four seasons',
    stats: [`${seasons.length} photographs`, 'Four seasons'],
  },
  saved: {
    kicker: 'Your personal shortlist',
    title: <>Keep the good<br /><span className="text-funk">ones close.</span></>,
    description: 'Your saved picks, gathered in one place. Add a favorite from any collection and it will be waiting here.',
    image: 'Venom.jpeg',
    asset: movieAssets,
    imageAlt: 'Venom emerging from deep blue shadows',
    stats: ['Saved by you', 'Stored on this device'],
  },
}

const datasets = { movies, series, cars, seasons }

function sectionFromPath(pathname) {
  const route = pathname.split('/').filter(Boolean).at(-1)
  if (route === 'my-list') return 'saved'
  if (route === 'discoveries' || !route) return 'movies'
  return sections.some((section) => section.id === route) ? route : 'movies'
}

function pathForSection(section) {
  return section === 'saved' ? '/my-list' : `/${section}`
}

function getImage(item) {
  const source = item.type === 'car' ? carAssets : item.type === 'season' ? seasonAssets : movieAssets
  return source[item.image] ?? ''
}

function Logo({ onHome }) {
  return (
    <button type="button" onClick={onHome} className="brand-lockup group flex items-center gap-3 text-left" aria-label="Discoveries home">
      <span className="brand-seal grid size-10 shrink-0 place-items-center" aria-hidden="true">
        <span>D</span><span className="brand-seal-dot" />
      </span>
      <span className="flex flex-col">
        <span className="brand-wordmark">Discoveries</span>
        <span className="brand-caption">A considered collection</span>
      </span>
    </button>
  )
}

function Header({ active, onNavigate, search, setSearch, savedCount }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [discoveryOpen, setDiscoveryOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen && !discoveryOpen) return undefined
    const closeMenus = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setDiscoveryOpen(false)
      }
    }
    window.addEventListener('keydown', closeMenus)
    return () => window.removeEventListener('keydown', closeMenus)
  }, [menuOpen, discoveryOpen])

  const chooseSection = (section) => {
    onNavigate(section)
    setMenuOpen(false)
    setDiscoveryOpen(false)
    setSearch('')
  }

  const surpriseMe = () => {
    const choices = sections.filter((section) => section.id !== active)
    const choice = choices[Math.floor(Math.random() * choices.length)]
    if (choice) chooseSection(choice.id)
  }

  return (
    <header className="site-header sticky top-0 z-40 border-b border-white/[0.07] bg-[#11100d]/90 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-3 sm:px-7 lg:px-10">
        <Logo onHome={() => chooseSection('movies')} />
        <nav aria-label="Discoveries navigation" className="hidden items-center gap-1 md:flex">
          <div className="relative">
            <button type="button" onClick={() => setDiscoveryOpen(!discoveryOpen)} aria-expanded={discoveryOpen} aria-controls="discovery-menu-desktop" className={`nav-tab inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-[13px] transition ${sections.some((section) => section.id === active) ? 'active bg-white/[0.08] text-white' : 'text-white/52 hover:bg-white/[0.045] hover:text-white'}`}>
              <Compass size={15} strokeWidth={1.8} /> Discoveries <ChevronRight size={13} className={`transition-transform ${discoveryOpen ? 'rotate-90' : ''}`} />
            </button>
            {discoveryOpen && (
              <>
                <button type="button" aria-label="Close Discoveries menu" onClick={() => setDiscoveryOpen(false)} className="fixed inset-0 z-10 cursor-default" />
                <div id="discovery-menu-desktop" className="absolute left-0 top-full z-20 mt-2 min-w-48 rounded-2xl border border-white/10 bg-[#1b1914] p-2 shadow-2xl shadow-black/50">
                  {sections.map(({ id, label, icon: Icon }) => (
                    <button key={id} type="button" onClick={() => chooseSection(id)} aria-current={active === id ? 'page' : undefined} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] transition ${active === id ? 'bg-funk/15 text-white' : 'text-white/65 hover:bg-white/[0.06] hover:text-white'}`}>
                      <Icon size={15} strokeWidth={1.8} /> {label}
                      {active === id && <span className="ml-auto size-1.5 rounded-full bg-funk" />}
                    </button>
                  ))}
                  <div className="my-1 border-t border-white/10" />
                  <button type="button" onClick={surpriseMe} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] text-white/60 transition hover:bg-white/[0.06] hover:text-white"><Shuffle size={15} /> Surprise me</button>
                </div>
              </>
            )}
          </div>
          <span className="mx-1 h-5 w-px bg-white/10" />
          <button type="button" onClick={() => chooseSection('saved')} aria-current={active === 'saved' ? 'page' : undefined} className={`nav-tab inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-[13px] transition ${active === 'saved' ? 'active bg-white/[0.08] text-white' : 'text-white/52 hover:bg-white/[0.045] hover:text-white'}`}>
            <Bookmark size={15} strokeWidth={1.8} /> My list{savedCount > 0 && <span className="min-w-4 rounded-full bg-funk px-1 text-center text-[10px] leading-4 text-white">{savedCount}</span>}
          </button>
        </nav>
        <div className="hidden w-full max-w-[230px] items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2.5 text-white/45 transition focus-within:border-funk/50 focus-within:bg-white/[0.06] sm:flex">
          <Search size={15} />
          <label htmlFor="global-search" className="sr-only">Search this collection</label>
          <input id="global-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search anything..." className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/35" />
          {search && <button type="button" onClick={() => setSearch('')} aria-label="Clear search"><X size={14} /></button>}
        </div>
        <a href={githubRepo} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs text-white/70 transition hover:border-funk/50 hover:text-white xl:flex"><Github size={15} /> GitHub <ArrowUpRight size={12} className="text-white/35" /></a>
        <button type="button" className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-white md:hidden" onClick={() => { setMenuOpen(!menuOpen); setDiscoveryOpen(false) }} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}>{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
      </div>
      {menuOpen && (
        <nav aria-label="Mobile Discoveries navigation" className="absolute inset-x-0 top-full border-b border-white/10 bg-[#171611]/[0.98] p-3 shadow-2xl backdrop-blur-2xl md:hidden">
          <button type="button" onClick={() => setDiscoveryOpen(!discoveryOpen)} aria-expanded={discoveryOpen} aria-controls="discovery-menu-mobile" className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm ${sections.some((section) => section.id === active) ? 'bg-white/[0.08] text-white' : 'text-white/60'}`}><Compass size={16} /> Discoveries <ChevronRight size={14} className={`ml-auto transition-transform ${discoveryOpen ? 'rotate-90' : ''}`} /></button>
          {discoveryOpen && <div id="discovery-menu-mobile" className="mb-2 ml-4 border-l border-white/10 pl-2">{sections.map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" onClick={() => chooseSection(id)} aria-current={active === id ? 'page' : undefined} className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm ${active === id ? 'text-white' : 'text-white/50 hover:text-white'}`}><Icon size={15} /> {label}{active === id && <span className="ml-auto size-1.5 rounded-full bg-funk" />}</button>
          ))}<button type="button" onClick={surpriseMe} className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm text-white/50 hover:text-white"><Shuffle size={15} /> Surprise me</button></div>}
          <button type="button" onClick={() => chooseSection('saved')} aria-current={active === 'saved' ? 'page' : undefined} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm ${active === 'saved' ? 'bg-white/[0.08] text-white' : 'text-white/60'}`}><Bookmark size={16} /> My list{savedCount > 0 && <span className="ml-auto text-funk">{savedCount}</span>}</button>
          <label className="mx-2 my-2 flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-white/50 sm:hidden"><Search size={15} /><span className="sr-only">Search this collection</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search anything..." className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35" /></label>
          <a href={githubRepo} target="_blank" rel="noreferrer" className="mt-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/60"><Github size={16} /> Project on GitHub <ArrowUpRight size={13} /></a>
        </nav>
      )}
    </header>
  )
}

function CollectionHero({ section, onExplore, savedCount, items }) {
  const collection = collectionCopy[section]
  const saved = section === 'saved'
  const [slideIndex, setSlideIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState(1)
  const swipeStartX = useRef(null)
  const slideCount = items.length
  const slide = slideCount ? items[slideIndex % slideCount] : null
  const image = collection.asset[collection.image] ?? ''

  useEffect(() => {
    setSlideIndex(0)
  }, [section, slideCount])

  function moveSlide(direction) {
    if (!slideCount) return
    setSlideDirection(direction)
    setSlideIndex((current) => (current + direction + slideCount) % slideCount)
  }

  function handleCarouselKeyDown(event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      moveSlide(-1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      moveSlide(1)
    }
  }

  function handlePointerUp(event) {
    if (swipeStartX.current === null) return
    const distance = event.clientX - swipeStartX.current
    swipeStartX.current = null
    if (Math.abs(distance) > 50) moveSlide(distance < 0 ? 1 : -1)
  }

  return (
    <section className={`collection-hero relative isolate overflow-hidden ${section === 'cars' || section === 'seasons' ? 'visual-hero' : ''}`}>
      <img src={image} alt={collection.imageAlt} className={`hero-art absolute inset-0 -z-20 h-full w-full ${section === 'cars' || section === 'seasons' ? 'object-cover' : 'object-cover object-[center_32%]'}`} fetchPriority="high" />
      <div className="hero-shade absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_74%_40%,transparent_0%,rgba(16,15,12,0.18)_48%,rgba(16,15,12,0.7)_100%)]" />
      <div className="pointer-events-none absolute -right-24 top-1/4 -z-10 size-[420px] rounded-full bg-funk/[0.09] blur-[110px]" />
      <div className="mx-auto grid min-h-[560px] max-w-[1440px] items-center gap-10 px-5 pb-16 pt-16 sm:min-h-[630px] sm:px-8 lg:min-h-[675px] lg:grid-cols-[1.1fr_.9fr] lg:px-10 lg:pb-14">
        <div className="max-w-2xl">
          <div className="hero-kicker mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.21em] text-white/70"><span className="hero-kicker-rule" aria-hidden="true" />{collection.kicker}</div>
          <h1 className="collection-title text-[3.5rem] font-extrabold leading-[0.94] tracking-[-0.075em] text-white drop-shadow-lg sm:text-7xl lg:text-[5.4rem]">{collection.title}</h1>
          <p className="mt-6 max-w-xl text-[14px] leading-7 text-white/65 sm:text-base sm:leading-8">{collection.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-[11px] text-white/65">
            <span className="inline-flex items-center gap-1.5"><span className="hero-stat-dot" aria-hidden="true" /> {collection.stats[0]}</span><span className="h-3.5 w-px bg-white/20" /><span>{collection.stats[1]}</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={() => onExplore(section)} className="group inline-flex items-center gap-2.5 rounded-xl bg-funk px-5 py-3.5 text-sm font-bold text-white shadow-[0_8px_32px_#b58b5a38] transition duration-200 hover:-translate-y-0.5 hover:bg-[#d0a36b] hover:shadow-[0_10px_40px_#b58b5a55]">
              {section === 'cars' || section === 'seasons' ? <><ArrowDown size={16} /> Explore the gallery</> : <><Play size={15} fill="currentColor" /> {section === 'saved' ? `Open my list (${savedCount})` : 'Explore collection'}</>} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
            {section !== 'saved' && <button type="button" onClick={() => onExplore('saved')} className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3.5 text-sm font-semibold text-white/90 backdrop-blur transition hover:border-white/30 hover:bg-white/10"><Bookmark size={15} /> My list <span className="text-white/45">· {savedCount}</span></button>}
          </div>
        </div>

        <section
          className="feature-teaser group relative min-w-0 overflow-hidden rounded-[1.5rem] border border-white/15 bg-black/25 text-left shadow-2xl shadow-black/30 backdrop-blur-sm"
          aria-label={`${sections.find((entry) => entry.id === section)?.label ?? 'Saved'} featured slides`}
          aria-roledescription="carousel"
          tabIndex={0}
          onKeyDown={handleCarouselKeyDown}
          onPointerDown={(event) => { swipeStartX.current = event.clientX }}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { swipeStartX.current = null }}
        >
          {slide ? (
            <>
              <img
                key={slide.id}
                src={getImage(slide)}
                alt={slide.imageNote}
                className={`featured-slide-image h-[270px] w-full object-cover sm:h-[320px] lg:h-[350px] ${slideDirection > 0 ? 'slide-in-from-right' : 'slide-in-from-left'} ${slide.type === 'movie' || slide.type === 'series' ? 'object-top' : ''}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100f0c] via-[#100f0c]/20 to-black/10" />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-black/45 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.17em] text-white/85 backdrop-blur-md"><span className="hero-stat-dot" aria-hidden="true" /> From the collection · {slide.type === 'car' ? 'Cars' : slide.type === 'season' ? 'Seasons' : slide.type === 'series' ? 'Series' : 'Movies'}</span>
              <button type="button" onClick={() => onExplore(section, slide)} className="absolute inset-x-0 bottom-16 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-funk focus-visible:outline-offset-[-5px]" aria-label={`Open details for ${slide.title}`}>
                <span className="block px-5 pb-2 pt-12">
                  <span className="mb-1 block text-[10px] uppercase tracking-[0.18em] text-white/55">{slide.genre ?? slide.season ?? slide.typeName ?? slide.make ?? 'A Discoveries pick'}</span>
                  <span className="block text-xl font-bold tracking-[-0.045em] text-white">{slide.title}</span>
                </span>
              </button>
              <div className="absolute inset-x-4 bottom-3 flex items-center justify-between gap-3">
                <span className="text-[10px] tabular-nums text-white/55" aria-live="polite">{slideIndex + 1} <span aria-hidden="true">/</span> {slideCount}</span>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => moveSlide(-1)} aria-label="Previous slide" className="grid size-9 place-items-center rounded-full border border-white/20 bg-black/35 text-white transition hover:border-funk hover:bg-funk focus-visible:outline focus-visible:outline-2 focus-visible:outline-funk"><ChevronLeft size={17} /></button>
                  <button type="button" onClick={() => moveSlide(1)} aria-label="Next slide" className="grid size-9 place-items-center rounded-full border border-white/20 bg-black/35 text-white transition hover:border-funk hover:bg-funk focus-visible:outline focus-visible:outline-2 focus-visible:outline-funk"><ChevronRight size={17} /></button>
                </div>
              </div>
            </>
          ) : (
            <div className="grid h-[270px] place-items-center px-8 text-center text-sm text-white/45 sm:h-[320px] lg:h-[350px]">Save a title or image to start your list.</div>
          )}
          <span className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-white/10" />
        </section>
      </div>
      <button type="button" onClick={() => onExplore(section)} className="absolute bottom-5 right-8 hidden items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35 transition hover:text-white/70 lg:flex">Scroll to explore <ArrowDown size={13} /></button>
    </section>
  )
}

function CollectionCard({ item, saved, onSave, onOpen }) {
  const visual = item.type === 'car' || item.type === 'season'
  const image = getImage(item)
  const meta = item.genre ?? item.make ?? item.season

  return (
    <article className={`collection-card group relative min-w-0 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#171611] transition duration-300 hover:-translate-y-1 hover:border-funk/40 hover:shadow-[0_18px_55px_#0008,0_0_30px_#b58b5a18] ${visual ? 'visual-card' : ''}`}>
      <div className={`card-image relative block w-full overflow-hidden bg-[#17171d] text-left ${visual ? 'aspect-[1.48]' : 'aspect-[.73]'}`}>
        <button type="button" onClick={() => onOpen(item)} aria-label={`View ${item.title} details`} className="absolute inset-0 z-0 block h-full w-full text-left">
        <img src={image} alt={item.imageNote} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.055] group-hover:saturate-[1.12]" />
        <span className={`card-gradient absolute inset-0 bg-gradient-to-t ${item.accent ?? 'from-funk/35'} via-black/5 to-black/10`} />
        <span className="absolute inset-0 bg-gradient-to-t from-[#100f0c] via-transparent to-transparent opacity-85" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-black/40 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.13em] text-white/80 backdrop-blur-md">{visual ? (item.season ?? item.typeName ?? item.make) : item.type === 'series' ? 'Series' : 'Feature'}</span>
        <span className="card-reveal absolute inset-x-0 bottom-0 translate-y-2 px-4 pb-5 pt-16 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <span className="block text-[10px] leading-[1.65] text-white/80">{item.detail}</span>
          <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.13em] text-white">Open field notes <ArrowUpRight size={12} /></span>
        </span>
        <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.04]" />
        </button>
        <button type="button" aria-label={saved ? `Remove ${item.title} from My list` : `Save ${item.title} to My list`} aria-pressed={saved} onClick={() => onSave(item.id)} className={`heart-button absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-full border backdrop-blur-md transition ${saved ? 'border-funk/50 bg-funk/90 text-white' : 'border-white/20 bg-black/40 text-white/80 hover:border-funk hover:bg-funk/80'}`}><Heart size={14} className={saved ? 'fill-current' : ''} /></button>
      </div>
      <div className="px-3.5 pb-4 pt-3 sm:px-4">
        <div className="flex items-start justify-between gap-2">
          <button type="button" onClick={() => onOpen(item)} className="min-w-0 text-left">
            <h3 className="truncate text-[13px] font-semibold tracking-[-0.02em] text-white/90 transition group-hover:text-white">{item.title}</h3>
            <p className="mt-1.5 truncate text-[10px] text-white/40">{item.year ?? meta}</p>
          </button>
          <button type="button" onClick={() => onOpen(item)} aria-label={`More about ${item.title}`} className="grid size-7 shrink-0 place-items-center rounded-lg text-white/35 transition hover:bg-white/10 hover:text-white"><ChevronRight size={15} /></button>
        </div>
      </div>
    </article>
  )
}

function DetailDialog({ item, items, saved, onSave, onClose, onNavigate }) {
  const swipeStartX = useRef(null)
  const itemIndex = item ? items.findIndex((entry) => entry.id === item.id) : -1
  const canNavigate = items.length > 1 && itemIndex >= 0

  function moveItem(direction) {
    if (!canNavigate) return
    const nextIndex = (itemIndex + direction + items.length) % items.length
    onNavigate(items[nextIndex])
  }

  useEffect(() => {
    if (!item) return undefined
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault()
        moveItem(event.key === 'ArrowLeft' ? -1 : 1)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [item, items, onClose, onNavigate])

  if (!item) return null
  const image = getImage(item)
  const meta = item.type === 'car' ? item.make : item.season ?? item.genre

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-lg" role="presentation" onClick={onClose}>
      <section role="dialog" aria-modal="true" aria-labelledby="detail-title" className="detail-dialog relative grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#191813] shadow-2xl shadow-black/70 sm:grid-cols-[.87fr_1.13fr]" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={onClose} aria-label="Close details" className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-xl border border-white/15 bg-black/40 text-white backdrop-blur-md transition hover:bg-funk"><X size={17} /></button>
        <div
          className={`relative min-h-52 overflow-hidden bg-[#181820] sm:min-h-[500px] ${item.type === 'car' || item.type === 'season' ? 'sm:min-h-full' : ''}`}
          style={{ touchAction: 'pan-y' }}
          onPointerDown={(event) => {
            swipeStartX.current = event.pointerType === 'mouse' ? null : event.clientX
          }}
          onPointerUp={(event) => {
            if (swipeStartX.current === null) return
            const distance = event.clientX - swipeStartX.current
            swipeStartX.current = null
            if (Math.abs(distance) > 50) moveItem(distance < 0 ? 1 : -1)
          }}
          onPointerCancel={() => { swipeStartX.current = null }}
        >
          <img src={image} alt={item.imageNote} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#191813] via-transparent to-black/10 sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-[#191813]" />
          {canNavigate && (
            <>
              <button type="button" onClick={() => moveItem(-1)} aria-label="Previous image" className="absolute left-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/50 text-white shadow-lg backdrop-blur-md transition hover:border-funk hover:bg-funk focus-visible:outline focus-visible:outline-2 focus-visible:outline-funk"><ChevronLeft size={21} /></button>
              <button type="button" onClick={() => moveItem(1)} aria-label="Next image" className="absolute right-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/50 text-white shadow-lg backdrop-blur-md transition hover:border-funk hover:bg-funk focus-visible:outline focus-visible:outline-2 focus-visible:outline-funk"><ChevronRight size={21} /></button>
              <span className="absolute bottom-4 right-4 rounded-lg border border-white/15 bg-black/45 px-3 py-2 text-[10px] tabular-nums text-white/85 backdrop-blur-md" aria-live="polite">{itemIndex + 1} / {items.length}</span>
            </>
          )}
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-[9px] uppercase tracking-[0.15em] text-white/80 backdrop-blur-md">Image notes</span>
        </div>
        <div className="overflow-y-auto p-6 sm:p-9 lg:p-11">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.19em] text-funk"><Clapperboard size={14} /> {item.type === 'car' ? 'Garage / design notes' : item.type === 'season' ? 'Seasonal field notes' : item.type === 'series' ? 'Series / guide' : 'Movie / guide'}</div>
          <h2 id="detail-title" className="text-3xl font-bold leading-[1.05] tracking-[-0.06em] text-white sm:text-4xl">{item.title}</h2>
          <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/45"><span>{item.year ?? meta}</span>{item.year && meta && <><span className="text-white/20">·</span><span>{meta}</span></>}{item.type === 'car' && <><span className="text-white/20">·</span><span>{item.typeName ?? 'Automotive photography'}</span></>}</p>
          <p className="mt-6 text-sm leading-7 text-white/70">{item.detail}</p>
          <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4">
            <div className="mb-2 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">About this image</div>
            <p className="text-xs leading-6 text-white/65">{item.imageNote}</p>
          </div>
          {item.type === 'car' && <p className="mt-4 flex items-start gap-2 text-[10px] leading-5 text-white/35"><Gauge size={13} className="mt-0.5 shrink-0 text-funk/70" /> Model year and trim are intentionally not stated where the supplied photograph does not verify them.</p>}
          {item.type !== 'car' && <p className="mt-4 flex items-start gap-2 text-[10px] leading-5 text-white/35"><Film size={13} className="mt-0.5 shrink-0 text-funk/70" /> Discoveries is a collection, not a streaming service. This title is not shown here.</p>}
          <div className="mt-7 flex flex-wrap gap-2.5">
            <button type="button" onClick={() => onSave(item.id)} className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-bold transition ${saved ? 'bg-white/[0.09] text-white' : 'bg-funk text-white hover:bg-[#d0a36b]'}`}><Heart size={14} className={saved ? 'fill-current text-funk' : ''} />{saved ? 'Saved to my list' : 'Save for later'}</button>
            <button type="button" onClick={onClose} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-xs font-semibold text-white/70 transition hover:border-white/25 hover:text-white">Keep exploring <ArrowRight size={13} /></button>
          </div>
        </div>
      </section>
    </div>
  )
}

function CollectionPage({ section, search, savedIds, onSave, onOpen, onNavigate }) {
  const collection = collectionCopy[section]
  const savedPage = section === 'saved'
  const items = savedPage
    ? Object.values(datasets).flat().filter((item) => savedIds.includes(item.id))
    : datasets[section].map((item) => ({ ...item, type: section === 'cars' ? 'car' : section === 'seasons' ? 'season' : section === 'series' ? 'series' : 'movie' }))
  const query = search.trim().toLocaleLowerCase()
  const filtered = items.filter((item) => !query || `${item.title} ${item.genre ?? ''} ${item.make ?? ''} ${item.season ?? ''} ${item.detail} ${item.imageNote}`.toLocaleLowerCase().includes(query))
  const heroSection = savedPage ? 'saved' : section
  const heroButton = (target, item) => {
    if (item) onOpen(item, filtered)
    else if (target === 'saved' && !savedPage) onNavigate('saved')
    else document.getElementById('collection-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <CollectionHero section={heroSection} onExplore={heroButton} savedCount={savedIds.length} items={filtered} />
      <main id="collection-grid" className="collection-main mx-auto max-w-[1440px] scroll-mt-28 px-4 pb-16 pt-8 sm:px-7 sm:pt-10 lg:px-10">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-1.5 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-funk/90"><span className="size-1.5 rounded-full bg-funk" /> {savedPage ? 'Your saved collection' : collection.kicker}</p>
            <h2 className="collection-heading text-2xl font-bold tracking-[-0.055em] text-white sm:text-3xl">{savedPage ? 'My list' : sections.find((entry) => entry.id === section)?.title}</h2>
            <p className="mt-2 text-xs text-white/40">{filtered.length} {savedPage ? 'saved picks' : `${sections.find((entry) => entry.id === section)?.label.toLowerCase()} in the collection`}</p>
          </div>
          <div className="flex items-center gap-2 self-start rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[10px] text-white/40 sm:self-auto">Select an entry to read its notes</div>
        </div>
        {filtered.length > 0 ? (
          <div className={`collection-grid grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ${section === 'cars' || section === 'seasons' ? 'visual-grid' : ''}`}>
            {filtered.map((item) => <CollectionCard key={item.id} item={item} saved={savedIds.includes(item.id)} onSave={onSave} onOpen={(selected) => onOpen(selected, filtered)} />)}
          </div>
        ) : (
          <div className="empty-state rounded-3xl border border-dashed border-white/15 px-5 py-16 text-center">
            <span className="mx-auto mb-4 grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.035] text-funk"><Search size={18} /></span>
            <h3 className="text-base font-semibold text-white">{savedPage ? 'Your list is ready for a favorite.' : 'Nothing came back from that search.'}</h3>
            <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-white/40">{savedPage ? 'Save a movie, series, car, or seasonal photograph to keep it close.' : 'Try another title, keyword, season, or image detail.'}</p>
          </div>
        )}
        <section className="mt-12 grid gap-3 rounded-2xl border border-white/[0.08] bg-[linear-gradient(105deg,#17131a,#11131a_60%,#161119)] p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
          <div className="flex items-start gap-3.5"><span className="archive-index-mark grid size-9 shrink-0 place-items-center rounded-xl border border-funk/20 bg-funk/10 text-funk" aria-hidden="true">D.</span><div><h3 className="text-sm font-semibold text-white">A little context goes a long way.</h3><p className="mt-1 text-xs leading-5 text-white/45">Open an entry for image notes, a closer look, and a way to save it.</p></div></div>
          <a href={githubRepo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 justify-self-start rounded-lg border border-white/10 px-3 py-2 text-[10px] font-semibold text-white/65 transition hover:border-funk/40 hover:text-white sm:justify-self-auto"><Code2 size={13} /> Source & credits <ArrowUpRight size={11} /></a>
        </section>
      </main>
    </>
  )
}

function Footer({ active, onNavigate }) {
  return (
    <footer className="border-t border-white/[0.07] bg-[#0d0c09]">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-9 sm:px-8 md:grid-cols-[1fr_auto] md:items-center lg:px-10">
        <div>
          <Logo onHome={() => onNavigate('movies')} />
          <p className="mt-3 max-w-md text-[11px] leading-5 text-white/35">A personal index of screen stories, beautiful machines, and the changing world outside.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {sections.map(({ id, label }) => <button key={id} type="button" onClick={() => onNavigate(id)} aria-current={active === id ? 'page' : undefined} className="rounded-lg px-3 py-2 text-[10px] text-white/45 transition hover:bg-white/[0.06] hover:text-white">{label}</button>)}
        </div>
      </div>
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-4 text-[10px] text-white/30 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <span>© 2026 Discoveries · Made by Mahlatse Lesley Seema</span>
          <div className="flex flex-wrap gap-x-4 gap-y-2"><a href={githubProfile} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition hover:text-white"><Github size={12} /> Owner · Mahles63</a><a href={githubRepo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition hover:text-white">Project source <ArrowUpRight size={11} /></a><span>Artwork belongs to its respective owners.</span></div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [active, setActive] = useState(() => sectionFromPath(window.location.pathname))
  const [search, setSearch] = useState('')
  const [savedIds, setSavedIds] = useState(() => JSON.parse(localStorage.getItem('moviefunk-list') ?? '[]'))
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  useEffect(() => {
    const handlePopState = () => {
      setActive(sectionFromPath(window.location.pathname))
      setSearch('')
      setSelectedItem(null)
      setSelectedItems([])
      setShowMobileSearch(false)
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  function navigateToSection(section) {
    const nextPath = pathForSection(section)
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath)
    }
    setActive(section)
    setSearch('')
    setSelectedItem(null)
    setSelectedItems([])
    setShowMobileSearch(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function toggleSaved(id) {
    const next = savedIds.includes(id) ? savedIds.filter((savedId) => savedId !== id) : [...savedIds, id]
    localStorage.setItem('moviefunk-list', JSON.stringify(next))
    setSavedIds(next)
  }

  function openDetails(item, items) {
    setSelectedItem(item)
    setSelectedItems(items)
  }

  return (
    <div className="site-shell min-h-screen text-white">
      <Header active={active} onNavigate={navigateToSection} search={search} setSearch={setSearch} savedCount={savedIds.length} />
      <div className="mobile-search-dock fixed bottom-4 left-4 right-4 z-30 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#191813]/90 p-2 shadow-2xl backdrop-blur-xl sm:hidden">
        <button type="button" onClick={() => setShowMobileSearch(!showMobileSearch)} aria-expanded={showMobileSearch} aria-label={showMobileSearch ? 'Close search' : 'Open search'} className="grid size-10 shrink-0 place-items-center rounded-xl bg-funk text-white"><Search size={17} /></button>
        {showMobileSearch ? <input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search this collection..." className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-white/35" /> : <span className="min-w-0 flex-1 truncate px-2 text-xs text-white/55">{search ? `Searching “${search}”` : `Browse ${active === 'saved' ? 'My list' : active}`}</span>}
        {search && <button type="button" onClick={() => setSearch('')} aria-label="Clear search" className="grid size-9 place-items-center text-white/50"><X size={15} /></button>}
        <button type="button" onClick={() => navigateToSection(active === 'saved' ? 'movies' : 'saved')} aria-label={active === 'saved' ? 'Browse movies' : 'Open saved list'} className="relative grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 text-white/70"><Bookmark size={16} />{savedIds.length > 0 && <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-funk text-[9px] text-white">{savedIds.length}</span>}</button>
      </div>

      <CollectionPage section={active} search={search} savedIds={savedIds} onSave={toggleSaved} onOpen={openDetails} onNavigate={navigateToSection} />
      <Footer active={active} onNavigate={navigateToSection} />
      <DetailDialog item={selectedItem} items={selectedItems} saved={selectedItem ? savedIds.includes(selectedItem.id) : false} onSave={toggleSaved} onClose={() => setSelectedItem(null)} onNavigate={setSelectedItem} />
    </div>
  )
}
