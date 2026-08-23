import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyPage from "@/components/projects/CaseStudyPage";
import { caseStudySlugs, isCaseStudySlug } from "@/lib/case-study-routes";
import { getDictionary, isValidLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((locale) => caseStudySlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale) || !isCaseStudySlug(slug)) return {};
  const study = (await getDictionary(locale)).caseStudies[slug];
  const projectName = slug === "centerbase" ? "Centerbase" : slug === "toshiba" ? "Toshiba Customer Portal" : "Aspire Lifestyle";
  return { title: `${projectName} Case Study — Hugo`, description: study.metaDescription };
}

export default async function ProjectCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isCaseStudySlug(slug)) notFound();
  return <CaseStudyPage slug={slug} />;
}
