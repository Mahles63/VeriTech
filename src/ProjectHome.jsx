import React from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  CheckSquare,
  Clapperboard,
  Github,
  Leaf,
  Sparkles,
} from 'lucide-react'
import { carAssets, movieAssets, seasonAssets } from './data.js'

const projects = [
  {
    number: '01',
    name: 'Yearly Seasons',
    category: 'Seasonal photography',
    description: 'A small visual guide to the changing seasons, with dedicated pages for the landscapes and details of the year.',
    image: seasonAssets['Seasons_digital_art.jpg'],
    imageAlt: 'An illustrated landscape shifting through all four seasons',
    icon: Leaf,
    href: '/Task 1/Weather Page/Yearly Seasons.html',
    accent: 'from-emerald-950/10 to-emerald-950/75',
  },
  {
    number: '02',
    name: 'Classic Cars',
    category: 'Automotive',
    description: 'A car-launch concept featuring a simple introduction, a photo gallery, and supporting pages about the collection.',
    image: carAssets['Mercedes1.jpeg'],
    imageAlt: 'A performance car from the automotive collection',
    icon: Sparkles,
    href: '/Task 2/Classic Cars.html',
    accent: 'from-black/5 to-black/75',
  },
  {
    number: '03',
    name: 'The To Do App',
    category: 'JavaScript interaction',
    description: 'A lightweight task-list exercise built around adding items and interacting with a simple checklist.',
    icon: CheckSquare,
    href: '/Task 3/index.html',
    accent: 'from-[#293b72]/10 to-[#141d39]/90',
  },
  {
    number: '04',
    name: 'MovieFunk',
    category: 'Movie landing page',
    description: 'A cinematic movie concept with a featured title, supporting artwork, and a dedicated Venom page.',
    image: movieAssets['Venom.jpeg'],
    imageAlt: 'Venom against a deep blue-black backdrop',
    icon: Clapperboard,
    href: '/Task 4/Index.html',
    accent: 'from-black/5 to-black/80',
  },
]

function ProjectCard({ project }) {
  const Icon = project.icon

  return (
    <a
      href={project.href}
      aria-label={`Open ${project.name} project`}
      className="group flex min-w-0 flex-col overflow-hidden rounded-[1.35rem] border border-[#24231f]/[0.09] bg-white shadow-[0_8px_30px_#24231f08] transition duration-300 hover:-translate-y-1 hover:border-[#ad754b]/35 hover:shadow-[0_22px_55px_#24231f14] focus-visible:outline-[#ad754b]"
    >
      <div className="relative aspect-[1.75] overflow-hidden bg-[#e7e3da]">
        {project.image ? (
          <img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="grid h-full place-items-center bg-[radial-gradient(ellipse_at_68%_25%,#647bb1_0%,#293b72_42%,#141d39_100%)]">
            <CheckSquare size={66} strokeWidth={1} className="text-white/75 transition duration-500 group-hover:scale-105 group-hover:text-white" />
          </div>
        )}
        <div className={`absolute inset-0 bg-gradient-to-t ${project.accent}`} />
        <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/25 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-white backdrop-blur-md">
          TASK {project.number}
        </span>
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/85">
          <Icon size={13} strokeWidth={1.8} />
          {project.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-[-0.045em] text-[#211f1a] sm:text-[22px]">{project.name}</h2>
          <span className="grid size-9 shrink-0 place-items-center rounded-full border border-[#24231f]/10 text-[#5e584e] transition group-hover:border-[#ad754b]/40 group-hover:bg-[#ad754b] group-hover:text-white">
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
        <p className="mt-2.5 flex-1 text-[13px] leading-6 text-[#625e56]">{project.description}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#986944]">
          View project <ArrowUpRight size={13} />
        </span>
      </div>
    </a>
  )
}

export default function ProjectHome() {
  return (
    <div className="project-home min-h-screen bg-[#f6f4ef] text-[#211f1a]">
      <header className="border-b border-[#24231f]/[0.08] bg-[#f6f4ef]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="VeriTech projects home">
            <span className="grid size-10 place-items-center rounded-[13px] bg-[#211f1a] font-serif text-lg italic text-[#e2bd91]">V</span>
            <span>
              <span className="block text-[13px] font-semibold tracking-[-0.025em]">VeriTech</span>
              <span className="mt-0.5 block text-[9px] uppercase tracking-[0.15em] text-[#777168]">Selected work</span>
            </span>
          </a>
          <nav aria-label="Main navigation" className="flex items-center gap-2">
            <a href="#projects" className="rounded-full px-3 py-2 text-xs font-medium text-[#514c44] transition hover:bg-black/[0.05] hover:text-black sm:px-4">Projects</a>
            <a href="/moviefunk" className="rounded-full px-3 py-2 text-xs font-medium text-[#514c44] transition hover:bg-black/[0.05] hover:text-black sm:px-4">MovieFunk</a>
            <a href="https://github.com/Mahles63/VeriTech" target="_blank" rel="noreferrer" aria-label="VeriTech on GitHub" className="grid size-9 place-items-center rounded-full border border-[#24231f]/10 text-[#514c44] transition hover:border-[#ad754b]/50 hover:text-[#986944]">
              <Github size={16} />
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-[1240px] gap-8 px-5 pb-12 pt-16 sm:px-8 sm:pb-16 sm:pt-24 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#986944]">
              <span className="h-px w-7 bg-[#ad754b]" />
              Web projects · 2026
            </p>
            <h1 className="font-serif text-[clamp(3.2rem,8vw,6.6rem)] font-medium leading-[0.94] tracking-[-0.075em] text-[#211f1a]">
              Four tasks.<br />
              <span className="italic text-[#986944]">Four little worlds.</span>
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#625e56] sm:text-base sm:leading-8">
              A home for the projects built along the way. Pick a task to open its own page and explore it on its own terms.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start rounded-2xl border border-[#24231f]/[0.08] bg-white/70 px-4 py-3 lg:self-end">
            <span className="grid size-9 place-items-center rounded-xl bg-[#ad754b]/10 text-[#986944]"><Sparkles size={16} /></span>
            <span>
              <span className="block text-xs font-semibold text-[#302d27]">A growing collection</span>
              <span className="mt-1 block text-[10px] text-[#777168]">Independent projects, one place</span>
            </span>
          </div>
        </section>

        <section id="projects" aria-labelledby="projects-heading" className="mx-auto max-w-[1240px] scroll-mt-8 px-5 pb-20 sm:px-8 sm:pb-24">
          <div className="mb-6 flex items-end justify-between gap-4 border-b border-[#24231f]/10 pb-4">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.19em] text-[#986944]">The collection</p>
              <h2 id="projects-heading" className="mt-1.5 text-xl font-semibold tracking-[-0.04em] sm:text-2xl">Browse all projects</h2>
            </div>
            <span className="pb-1 text-[10px] tabular-nums text-[#777168]">01 — 04</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
            {projects.map((project) => <ProjectCard key={project.number} project={project} />)}
          </div>
        </section>
      </main>

      <footer className="border-t border-[#24231f]/[0.08]">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-5 py-6 text-[10px] text-[#777168] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© 2026 VeriTech · Made by Mahlatse Lesley Seema</span>
          <a href="/moviefunk" className="inline-flex items-center gap-1.5 transition hover:text-[#986944]">Explore MovieFunk <ArrowUpRight size={12} /></a>
        </div>
      </footer>
    </div>
  )
}
