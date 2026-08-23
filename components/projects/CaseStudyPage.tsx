"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { useColors, useTheme } from "@/context/ThemeContext";
import type { CaseStudySlug } from "@/lib/case-study-routes";
import { CONTACT } from "@/lib/constants";
import { MoonIcon, SunIcon } from "@/components/icons/UIIcons";

interface CaseStudyPageProps {
  slug: CaseStudySlug;
}

type CaseStudyContent = {
  eyebrow: string;
  title: string;
  summary: string;
  projectType: string;
  role: string;
  team: string;
  industry: string;
  scope: string;
  image: string;
  imageDark: string;
  accent: string;
  metrics: Array<{ value: string; label: string }>;
  challenge: { title: string; body: string };
  approach: Array<{ number: string; title: string; body: string }>;
  operatingModel?: { title: string; steps: string[]; body: string };
  outcome: { title: string; body: string; points: string[] };
  supportingCases?: Array<{ eyebrow: string; title: string; body: string; highlights: string[]; stack: string[] }>;
  stack: string[];
  reflection: string;
};

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function CaseStudyPage({ slug }: CaseStudyPageProps) {
  const { dict, locale } = useLocale();
  const { isDark } = useColors();
  const { toggle } = useTheme();
  const study = dict.caseStudies[slug] as CaseStudyContent;
  const labels = dict.caseStudyPage;

  const details = [
    [labels.role, study.role],
    [labels.team, study.team],
    [labels.industry, study.industry],
    [labels.scope, study.scope],
  ];

  return (
    <main className="min-h-screen bg-white text-[#1a1a1a] dark:bg-[#0f0f0f] dark:text-[#e0e0e0]">
      <header className="sticky top-0 z-30 border-b border-black/8 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-[#0f0f0f]/90">
        <div className="mx-auto flex h-16 max-w-360 items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href={`/${locale}#projects`} className="-ml-2 inline-flex min-h-11 items-center gap-2 px-2 text-sm font-semibold transition-opacity hover:opacity-60">
            <span aria-hidden="true">←</span>
            {labels.allProjects}
          </Link>
          <div className="flex items-center gap-4 sm:gap-5">
            <span className="hidden text-xs font-semibold tracking-[0.16em] uppercase sm:inline" style={{ color: study.accent }}>
              Hugo / {labels.caseStudy}
            </span>
            <Link href={`/${locale === "en" ? "vn" : "en"}/projects/${slug}`} className="flex min-h-11 min-w-11 items-center justify-center text-xs font-bold tracking-[0.1em] uppercase transition-opacity hover:opacity-60">{locale === "en" ? "VN" : "EN"}</Link>
            <button onClick={toggle} className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10" aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}>
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-360 px-5 pt-12 pb-14 sm:px-8 sm:pt-18 lg:px-12 lg:pt-24">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:gap-16">
          <div>
            <p className="mb-5 text-xs font-bold tracking-[0.15em] uppercase" style={{ color: study.accent }}>{study.eyebrow}</p>
            <h1 className="max-w-4xl text-4xl leading-[1.06] font-bold tracking-[-0.045em] sm:text-5xl lg:text-7xl">{study.title}</h1>
            <p className="mt-7 max-w-3xl text-base leading-8 text-black/65 dark:text-white/65 sm:text-lg">{study.summary}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Let's talk about ${slug}`)}`} className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white dark:text-white transition-transform hover:-translate-y-0.5" style={{ backgroundColor: study.accent }}>
                {labels.talk} <ArrowIcon />
              </a>
              <a href="#outcome" className="inline-flex items-center rounded-full border border-black/15 px-5 py-3 text-sm font-semibold text-[#1a1a1a] transition-colors hover:bg-black/5 dark:border-white/20 dark:text-[#e0e0e0] dark:hover:bg-white/10">{labels.impact}</a>
            </div>
          </div>
          <div className="relative min-h-72 overflow-hidden rounded-[2rem] border border-black/8 dark:border-white/10" style={{ background: `linear-gradient(145deg, ${study.accent}22, transparent 58%)` }}>
            <Image src={isDark ? study.imageDark : study.image} alt={study.projectType} fill priority className="object-contain p-7 sm:p-10" sizes="(max-width: 1024px) 100vw, 40vw" />
          </div>
        </div>
      </section>

      <section className="border-y border-black/8 bg-[#f6f9f7] dark:border-white/10 dark:bg-[#141414]">
        <div className="mx-auto grid max-w-360 divide-y divide-black/8 px-5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:px-8 lg:grid-cols-4 lg:px-12 dark:divide-white/10">
          {details.map(([label, value]) => <div key={label} className="py-6 sm:px-6 sm:first:pl-0 lg:py-8"><p className="text-xs font-bold tracking-[0.12em] uppercase text-black/45 dark:text-white/45">{label}</p><p className="mt-2 text-sm leading-6 font-medium">{value}</p></div>)}
        </div>
      </section>

      <section className="mx-auto grid max-w-360 gap-8 px-5 py-18 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12 lg:py-28">
        <p className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: study.accent }}>{labels.challenge}</p>
        <div><h2 className="max-w-3xl text-3xl leading-tight font-bold tracking-[-0.035em] sm:text-4xl">{study.challenge.title}</h2><p className="mt-6 max-w-2xl text-base leading-8 text-black/65 dark:text-white/65">{study.challenge.body}</p></div>
      </section>

      <section className="bg-[#171717] text-white dark:bg-[#1b1b1b]">
        <div className="mx-auto max-w-360 px-5 py-18 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"><p className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: study.accent }}>{labels.approach}</p><h2 className="max-w-3xl text-3xl leading-tight font-bold tracking-[-0.035em] sm:text-4xl">{labels.approachHeading}</h2></div>
          <div className="mt-12 divide-y divide-white/15 border-t border-white/15">
            {study.approach.map((item) => <article key={item.number} className="grid gap-4 py-8 sm:grid-cols-[5rem_1fr] sm:gap-8"><p className="text-sm font-bold" style={{ color: study.accent }}>{item.number}</p><div><h3 className="text-xl font-semibold tracking-[-0.02em]">{item.title}</h3><p className="mt-3 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">{item.body}</p></div></article>)}
          </div>
        </div>
      </section>

      {study.operatingModel && <section className="mx-auto max-w-360 px-5 py-18 sm:px-8 lg:px-12 lg:py-28"><div className="rounded-[2rem] border border-black/8 p-7 sm:p-10 dark:border-white/10"><p className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: study.accent }}>{labels.model}</p><div className="mt-5 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]"><div><h2 className="text-2xl leading-tight font-bold tracking-[-0.03em] sm:text-3xl">{study.operatingModel.title}</h2><p className="mt-5 text-sm leading-7 text-black/65 dark:text-white/65">{study.operatingModel.body}</p></div><ol className="grid gap-3 sm:grid-cols-2">{study.operatingModel.steps.map((step, index) => <li key={step} className="flex items-center gap-3 border-t border-black/10 py-4 text-sm font-semibold dark:border-white/15"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs text-white" style={{ backgroundColor: study.accent }}>{index + 1}</span>{step}</li>)}</ol></div></div></section>}

      <section id="outcome" className="border-y border-black/8 bg-[#f6f9f7] dark:border-white/10 dark:bg-[#141414]"><div className="mx-auto max-w-360 px-5 py-18 sm:px-8 lg:px-12 lg:py-28"><p className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: study.accent }}>{labels.outcomes}</p><div className="mt-5 grid gap-12 lg:grid-cols-[0.85fr_1.15fr]"><div><h2 className="text-3xl leading-tight font-bold tracking-[-0.035em] sm:text-4xl">{study.outcome.title}</h2><p className="mt-6 max-w-xl text-base leading-8 text-black/65 dark:text-white/65">{study.outcome.body}</p></div><div className="grid gap-5 sm:grid-cols-3">{study.metrics.map((metric) => <div key={metric.label} className="border-t border-black/15 pt-5 dark:border-white/20"><p className="text-3xl font-bold tracking-[-0.05em] sm:text-4xl" style={{ color: study.accent }}>{metric.value}</p><p className="mt-2 text-sm leading-6 text-black/60 dark:text-white/60">{metric.label}</p></div>)}</div></div><ul className="mt-12 grid gap-4 border-t border-black/10 pt-8 sm:grid-cols-3 dark:border-white/15">{study.outcome.points.map((point) => <li key={point} className="text-sm leading-7 text-black/70 dark:text-white/70"><span className="mr-2 font-bold" style={{ color: study.accent }}>—</span>{point}</li>)}</ul></div></section>

      {study.supportingCases && <section className="mx-auto max-w-360 px-5 py-18 sm:px-8 lg:px-12 lg:py-28"><p className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: study.accent }}>{labels.supporting}</p><div className="mt-8 divide-y divide-black/10 border-y border-black/10 dark:divide-white/15 dark:border-white/15">{study.supportingCases.map((supportingCase, index) => <article key={supportingCase.title} className="grid gap-8 py-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16"><div><p className="text-xs font-bold tracking-[0.12em] uppercase" style={{ color: study.accent }}>{supportingCase.eyebrow}</p><h2 className="mt-3 text-2xl leading-tight font-bold tracking-[-0.03em] sm:text-3xl">{supportingCase.title}</h2><div className="mt-6 flex flex-wrap gap-2">{supportingCase.stack.map((item) => <span key={item} className="rounded-full border border-black/15 px-3 py-1.5 text-xs font-medium dark:border-white/20">{item}</span>)}</div></div><div><p className="text-base leading-8 text-black/65 dark:text-white/65">{supportingCase.body}</p><ul className="mt-6 grid gap-3"><li className="text-xs font-bold tracking-[0.12em] uppercase text-black/45 dark:text-white/45">0{index + 1}</li>{supportingCase.highlights.map((highlight) => <li key={highlight} className="border-t border-black/10 pt-3 text-sm leading-7 text-black/70 dark:border-white/15 dark:text-white/70"><span className="mr-2 font-bold" style={{ color: study.accent }}>—</span>{highlight}</li>)}</ul></div></article>)}</div></section>}

      <section className="mx-auto max-w-360 px-5 py-18 sm:px-8 lg:px-12 lg:py-28"><div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]"><div><p className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: study.accent }}>{labels.toolkit}</p><div className="mt-6 flex flex-wrap gap-2">{study.stack.map((item) => <span key={item} className="rounded-full border border-black/15 px-3 py-1.5 text-xs font-medium dark:border-white/20">{item}</span>)}</div></div><blockquote className="border-l-2 pl-6 text-2xl leading-relaxed font-medium tracking-[-0.025em] sm:text-3xl" style={{ borderColor: study.accent }}>“{study.reflection}”</blockquote></div></section>

      <footer className="bg-[#020073] text-white dark:bg-[#6b9fff] dark:text-[#0f0f0f]"><div className="mx-auto flex max-w-360 flex-col items-start justify-between gap-7 px-5 py-12 sm:flex-row sm:items-end sm:px-8 lg:px-12"><div><p className="text-xs font-bold tracking-[0.15em] uppercase opacity-65">{labels.next}</p><Link href={`/${locale}#projects`} className="mt-3 inline-flex text-2xl font-bold tracking-[-0.03em] transition-opacity hover:opacity-70">{labels.allProjects} <span className="ml-2">→</span></Link></div><a href={`mailto:${CONTACT.email}`} className="rounded-full border border-current px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-70">{labels.talk} <ArrowIcon /></a></div></footer>
    </main>
  );
}
