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

const highlightSchema = z.object({
  title: z.string().min(1, "Highlight title is required"),
  text: z.string().min(1, "Highlight text is required"),
  image: z.string().min(1, "Highlight image is required"),
});

const galleryImageSchema = z.object({
  caption: z.string().min(1, "Image caption is required"),
  image: z.string().min(1, "Gallery image is required"),
});

const siteSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  navigation: z.array(navigationSchema).min(1, "At least one navigation item is required"),
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
  }),
  about: z.object({
    title: z.string().min(1, "About title is required"),
    intro: z.string().min(1, "About intro is required"),
    people: z.array(personSchema).min(1, "At least one person is required"),
  }),
  home_life: z.object({
    title: z.string().min(1, "Home & life title is required"),
    description: z.string().min(1, "Home & life description is required"),
    highlights: z.array(highlightSchema).min(1, "At least one highlight is required"),
  }),
  gallery: z.object({
    title: z.string().min(1, "Gallery title is required"),
    images: z.array(galleryImageSchema).min(1, "At least one gallery image is required"),
  }),
  contact: z.object({
    title: z.string().min(1, "Contact title is required"),
    message: z.string().min(1, "Contact message is required"),
    button_label: z.string().min(1, "Contact button label is required"),
    button_href: z.string().min(1, "Contact button href is required"),
  }),
});

export type NavigationItem = z.infer<typeof navigationSchema>;
export type Person = z.infer<typeof personSchema>;
export type Highlight = z.infer<typeof highlightSchema>;
export type GalleryImage = z.infer<typeof galleryImageSchema>;
export type SiteContent = z.infer<typeof siteSchema>;

const parsed = YAML.parse(rawSiteContent);

const result = siteSchema.safeParse(parsed);

if (!result.success) {
  const issueList = result.error.issues
    .map((issue) => `- ${issue.path.join(".") || "root"}: ${issue.message}`)
    .join("\n");
  throw new Error(`Invalid site content. Please fix src/content/site.yaml:\n${issueList}`);
}

export const siteContent: SiteContent = result.data;

export const getAssetUrl = (filename: string) =>
  new URL(`../assets/${filename}`, import.meta.url).href;
