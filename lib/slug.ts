// lib/slug.ts
export const slugTemplates = [
  "{topic}-{plaats}",
  "{topic}-in-{plaats}",
  "{plaats}-{topic}",
  "{topic}-vandaag-in-{plaats}",
  "{topic}-service-{plaats}",
  "{topic}-spoed-{plaats}",
] as const;

export function normalize(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}+/gu, "")
    .replace(/&/g, "en")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// simpele stabiele hash
export function simpleHash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function buildFromTemplate(tpl: string, topicBase: string, plaats: string) {
  return tpl
    .replace("{topic}", normalize(topicBase))
    .replace("{plaats}", normalize(plaats));
}

export function canonicalSlug(topicBase: string, plaats: string) {
  const h = simpleHash(`${normalize(topicBase)}::${normalize(plaats)}`);
  const tpl = slugTemplates[h % slugTemplates.length];
  return buildFromTemplate(tpl, topicBase, plaats);
}

export function allAcceptedSlugs(topicBase: string, plaats: string) {
  return slugTemplates.map((tpl) => buildFromTemplate(tpl, topicBase, plaats));
}
