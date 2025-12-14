import YAML from "yaml";
import rawSiteContent from "@/content/site.yaml?raw";
import { z } from "zod";

const navigationSchema = z.object({
  label: z.string().min(1, "Navigation label is required"),
  href: z.string().min(1, "Navigation href is required"),
});

const personSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  bio: z.string().min(1, "Bio is required"),
  quote: z.string().min(1, "Quote is required"),
  image: z.string().min(1, "Image filename is required"),
});

const homeSpotlightSchema = z.object({
  title: z.string().min(1, "Spotlight title is required"),
  description: z.string().min(1, "Spotlight description is required"),
  image: z.string().min(1, "Spotlight image is required"),
  category: z.enum(["home", "neighborhood", "highlights"], {
    required_error: "Spotlight category is required",
    invalid_type_error: "Spotlight category must be one of home, neighborhood, or highlights",
  }),
});

const homeFeatureSchema = z.object({
  title: z.string().min(1, "Feature title is required"),
  description: z.string().min(1, "Feature description is required"),
  icon: z.string().min(1, "Feature icon is required"),
});

const activitySchema = z.object({
  title: z.string().min(1, "Activity title is required"),
  description: z.string().min(1, "Activity description is required"),
  image: z.string().min(1, "Activity image is required"),
});

const galleryImageSchema = z.object({
  // caption: z.string().min(1, "Image caption is required"),
  image: z.string().min(1, "Gallery image is required"),
});

const quickAnswerResponseSchema = z.object({
  person: z.string().min(1, "Quick answer person is required"),
  response: z.string().min(1, "Quick answer response is required"),
});

const quickAnswerSchema = z.object({
  question: z.string().min(1, "Quick answer question is required"),
  answers: z
    .array(quickAnswerResponseSchema)
    .min(1, "At least one quick answer response is required"),
});

const timelineEventSchema = z.object({
  title: z.string().min(1, "Timeline title is required"),
  description: z.string().min(1, "Timeline description is required"),
  timestamp: z.string().min(1, "Timeline timestamp is required"),
});

const videoShortSchema = z.object({
  title: z.string().min(1, "Video short title is required"),
  description: z.string().min(1, "Video short description is required"),
  video_url: z.string().url("Video short URL must be a valid URL"),
});

const letterSectionSchema = z.object({
  title: z.string().min(1, "Letter section title is required"),
  subtitle: z.string().optional(),
  greeting: z.string().min(1, "Letter greeting is required"),
  intro: z.string().min(1, "Letter intro is required"),
  body: z
    .array(z.string().min(1, "Letter paragraph is required"))
    .min(1, "At least one letter paragraph is required"),
  closing: z.string().min(1, "Letter closing is required"),
  signature: z.string().min(1, "Letter signature is required"),
});

const villageEntrySchema = z.object({
  title: z.string().min(1, "Village entry title is required"),
  subtitle: z.string().min(1, "Village entry subtitle is required"),
  body: z.string().min(1, "Village entry body is required"),
  image: z.string().min(1, "Village entry image is required"),
});

const mapMarkerSchema = z.object({
  title: z.string().min(1, "Marker title is required"),
  subtitle: z.string().min(1, "Marker subtitle is required"),
  description: z.string().min(1, "Marker description is required"),
  image: z.string().min(1, "Marker image is required"),
  x_percent: z
    .number({ invalid_type_error: "Marker x_percent must be a number" })
    .min(0, "x_percent must be at least 0")
    .max(100, "x_percent must be at most 100"),
  y_percent: z
    .number({ invalid_type_error: "Marker y_percent must be a number" })
    .min(0, "y_percent must be at least 0")
    .max(100, "y_percent must be at most 100"),
});

const siteSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  navigation: z
    .array(navigationSchema)
    .min(1, "At least one navigation item is required"),
  cta: z.object({
    label: z.string().min(1, "CTA label is required"),
    href: z.string().min(1, "CTA href is required"),
  }),
  hero: z.object({
    eyebrow: z.string().min(1, "Hero eyebrow is required"),
    headline: z.string().min(1, "Hero headline is required"),
    description: z.string().min(1, "Hero description is required"),
    cta_label: z.string().min(1, "Hero CTA label is required"),
    cta_href: z.string().min(1, "Hero CTA href is required"),
    scroll_hint: z.string().min(1, "Hero scroll hint is required"),
    video_url: z.string().url("Hero video URL must be a valid URL"),
    video_title: z.string().min(1, "Hero video title is required"),
    video_caption: z.string().min(1, "Hero video caption is required"),
  }),
  about: z.object({
    title: z.string().min(1, "About title is required"),
    intro: z.string().min(1, "About intro is required"),
    people: z.array(personSchema).min(1, "At least one person is required"),
  }),
  our_village: z.object({
    title: z.string().min(1, "Our village title is required"),
    subtitle: z.string().min(1, "Our village subtitle is required"),
    intro: z.string().min(1, "Our village intro is required"),
    entries: z
      .array(villageEntrySchema)
      .min(1, "At least one village entry is required"),
  }),
  home_life: z.object({
    title: z.string().min(1, "Home & life title is required"),
    subtitle: z.string().min(1, "Home & life subtitle is required"),
    description: z.string().min(1, "Home & life description is required"),
    spotlights: z
      .array(homeSpotlightSchema)
      .min(1, "At least one spotlight is required"),
    features: z
      .array(homeFeatureSchema)
      .min(1, "At least one feature is required"),
  }),
  map: z.object({
    heading: z.string().optional(),
    intro: z.string().optional(),
    markers: z
      .array(mapMarkerSchema)
      .min(1, "At least one map marker is required"),
  }),
  daily_glimpse: z.object({
    title: z.string().min(1, "Daily glimpse title is required"),
    description: z.string().min(1, "Daily glimpse description is required"),
    activities: z
      .array(activitySchema)
      .min(1, "At least one daily activity is required"),
  }),
  shorts: z.object({
    title: z.string().min(1, "Video shorts title is required"),
    subtitle: z.string().optional(),
    description: z.string().min(1, "Video shorts description is required"),
    videos: z.array(videoShortSchema).min(1, "At least one video short is required"),
  }),
  timeline: z.object({
    title: z.string().min(1, "Timeline title is required"),
    description: z.string().min(1, "Timeline description is required"),
    events: z
      .array(timelineEventSchema)
      .min(1, "At least one timeline event is required"),
  }),
  gallery: z.object({
    title: z.string().min(1, "Gallery title is required"),
    images: z
      .array(galleryImageSchema)
      .min(1, "At least one gallery image is required"),
  }),
  quick_answers: z.object({
    title: z.string().min(1, "Quick answers title is required"),
    subtitle: z.string().min(1, "Quick answers subtitle is required"),
    items: z
      .array(quickAnswerSchema)
      .min(1, "At least one quick answer is required"),
  }),
  letter_to_birth_mother: letterSectionSchema,
  contact: z.object({
    title: z.string().min(1, "Contact title is required"),
    message: z.string().min(1, "Contact message is required"),
    button_label: z.string().min(1, "Contact button label is required"),
    button_href: z.string().min(1, "Contact button href is required"),
  }),
});

export type NavigationItem = z.infer<typeof navigationSchema>;
export type Person = z.infer<typeof personSchema>;
export type HomeSpotlight = z.infer<typeof homeSpotlightSchema>;
export type HomeFeature = z.infer<typeof homeFeatureSchema>;
export type Activity = z.infer<typeof activitySchema>;
export type GalleryImage = z.infer<typeof galleryImageSchema>;
export type TimelineEvent = z.infer<typeof timelineEventSchema>;
export type VillageEntry = z.infer<typeof villageEntrySchema>;
export type MapMarker = z.infer<typeof mapMarkerSchema>;
export type QuickAnswer = z.infer<typeof quickAnswerSchema>;
export type VideoShort = z.infer<typeof videoShortSchema>;
export type LetterSection = z.infer<typeof letterSectionSchema>;
export type SiteContent = z.infer<typeof siteSchema>;

const parsed = YAML.parse(rawSiteContent);

const result = siteSchema.safeParse(parsed);

if (!result.success) {
  const issueList = result.error.issues
    .map((issue) => `- ${issue.path.join(".") || "root"}: ${issue.message}`)
    .join("\n");
  throw new Error(
    `Invalid site content. Please fix src/content/site.yaml:\n${issueList}`
  );
}

export const siteContent: SiteContent = result.data;

export const getAssetUrl = (filename: string) =>
  new URL(`../assets/${filename}`, import.meta.url).href;
