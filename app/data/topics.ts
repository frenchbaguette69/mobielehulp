// data/topics.ts
export type TopicKey =
  | "accu-vervangen"
  | "sleepdienst"
  | "pechhulp"
  | "auto-vast-in-modder"
  | "auto-slepen";

export type TopicDef = {
  key: TopicKey;
  // basis van de slug (zonder -{plaats})
  baseSlug: string;
  // key in je dictionary root; bv dict.pechhulp, dict.sleepdienst, etc.
  dictKey: string; 
  // fallback naar pechhulp als dict-sectie ontbreekt
};

export const topics: TopicDef[] = [
  { key: "accu-vervangen",       baseSlug: "accu-vervangen",       dictKey: "accu" },
  { key: "sleepdienst",          baseSlug: "sleepdienst",          dictKey: "sleepdienst" },
  { key: "pechhulp",             baseSlug: "pechhulp",             dictKey: "pechhulp" },
  { key: "auto-vast-in-modder",  baseSlug: "auto-vast-in-modder",  dictKey: "modder" },
  { key: "auto-slepen",          baseSlug: "auto-slepen",          dictKey: "slepen" },
] as const;

// handige indexen
export const topicByBase: Record<string, TopicDef> = Object.fromEntries(
  topics.map(t => [t.baseSlug, t])
);
