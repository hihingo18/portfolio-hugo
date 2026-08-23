export const caseStudySlugs = ["centerbase", "toshiba", "aspire"] as const;

export type CaseStudySlug = (typeof caseStudySlugs)[number];

export function isCaseStudySlug(slug: string): slug is CaseStudySlug {
  return caseStudySlugs.includes(slug as CaseStudySlug);
}
