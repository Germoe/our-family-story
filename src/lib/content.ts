import YAML from "yaml";
import rawSiteContent from "@/content/site.yaml?raw";

export type NavigationItem = {
  label: string;
  href: string;
};

export type Person = {
  name: string;
  title: string;
  bio: string;
  quote: string;
  image: string;
};

export type Highlight = {
  title: string;
  text: string;
  image: string;
};

export type GalleryImage = {
  caption: string;
  image: string;
};

export type SiteContent = {
  brand: string;
  navigation: NavigationItem[];
  cta: { label: string; href: string };
  hero: {
    eyebrow: string;
    headline: string;
    description: string;
    cta_label: string;
    cta_href: string;
    scroll_hint: string;
  };
  about: {
    title: string;
    intro: string;
    people: Person[];
  };
  home_life: {
    title: string;
    description: string;
    highlights: Highlight[];
  };
  gallery: {
    title: string;
    images: GalleryImage[];
  };
  contact: {
    title: string;
    message: string;
    button_label: string;
    button_href: string;
  };
};

const parsed = YAML.parse(rawSiteContent) as SiteContent;

export const siteContent: SiteContent = parsed;

export const getAssetUrl = (filename: string) =>
  new URL(`../assets/${filename}`, import.meta.url).href;
