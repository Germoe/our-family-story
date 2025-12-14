import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { siteContent, getAssetUrl } from "./lib/content";
import WorldMapSection from "./components/WorldMapSection";
import useInViewAnimation from "./hooks/useInViewAnimation";

const CarouselControls = ({
  onPrev,
  onNext,
  canPrev,
  canNext,
  orientation = "horizontal",
}: {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  orientation?: "horizontal" | "vertical";
}) => {
  const isVertical = orientation === "vertical";
  const prevIcon = isVertical ? "↑" : "←";
  const nextIcon = isVertical ? "↓" : "→";

  return (
    <div className={`flex gap-3 ${isVertical ? "flex-col" : "flex-row"}`}>
      <button
        type="button"
        onClick={onPrev}
        disabled={!canPrev}
        className="pressable flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-white/80 text-terracotta-dark shadow-soft transition hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-40 focus-ring"
        aria-label="Previous slides"
      >
        {prevIcon}
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        className="pressable flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-white/80 text-terracotta-dark shadow-soft transition hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-40 focus-ring"
        aria-label="Next slides"
      >
        {nextIcon}
      </button>
    </div>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="text-center max-w-3xl mx-auto space-y-4">
    {subtitle ? (
      <p className="text-sm uppercase tracking-[0.3em] text-terracotta-dark/70">{subtitle}</p>
    ) : null}
    <h2 className="heading-section text-terracotta-dark">{title}</h2>
  </div>
);

const AboutCard = ({ person, index }: { person: (typeof siteContent.about.people)[number]; index: number }) => {
  const imageUrl = getAssetUrl(person.image);
  const animation = useInViewAnimation({ delay: `${index * 80}ms` });

  return (
    <article
      className={`bg-white/80 rounded-3xl border border-terracotta/10 shadow-soft overflow-hidden ${animation.className}`}
      ref={animation.ref}
      style={animation.style}
    >
      <div className="h-64 overflow-hidden">
        <img src={imageUrl} alt={person.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-8 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-terracotta/15 border border-terracotta/30 flex items-center justify-center text-terracotta-dark text-lg font-semibold">
            {person.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-terracotta-dark">{person.name}</h3>
            <p className="text-sm text-warm-gray">{person.title}</p>
          </div>
        </div>
        <p className="text-base leading-relaxed text-foreground/80">{person.bio}</p>
        <blockquote className="text-sm italic text-foreground/70 border-l-2 border-terracotta/40 pl-4">{person.quote}</blockquote>
      </div>
    </article>
  );
};

const HomeSpotlightCard = ({
  spotlight,
  index,
}: {
  spotlight: (typeof siteContent.home_life.spotlights)[number];
  index: number;
}) => {
  const imageUrl = getAssetUrl(spotlight.image);
  const animation = useInViewAnimation({ delay: `${index * 100}ms` });

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-border/60 bg-white/70 shadow-soft ${animation.className}`}
      ref={animation.ref}
      style={animation.style}
    >
      <div className="h-64 md:h-72 overflow-hidden">
        <img
          src={imageUrl}
          alt={spotlight.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-terracotta/70 via-terracotta/30 to-transparent" />
      <div className="absolute inset-0 flex items-end p-6">
        <div className="text-white space-y-1">
          <p className="text-sm uppercase tracking-[0.25em] text-white/80">Our place</p>
          <h3 className="text-2xl font-semibold drop-shadow">{spotlight.title}</h3>
          <p className="text-sm text-white/90 leading-relaxed max-w-xl drop-shadow">{spotlight.description}</p>
        </div>
      </div>
    </div>
  );
};

const getFeatureIconSymbol = (icon: string) => {
  const map: Record<string, string> = {
    home: "🏠",
    park: "🌳",
    school: "🎒",
    community: "🤝",
  };

  return map[icon] ?? "★";
};

const HomeFeatureCard = ({ feature, index }: { feature: (typeof siteContent.home_life.features)[number]; index: number }) => {
  const animation = useInViewAnimation({ delay: `${index * 70}ms` });

  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border border-border/60 bg-white/80 p-6 shadow-soft h-full text-center ${animation.className}`}
      ref={animation.ref}
      style={animation.style}
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/15 text-2xl">
        {getFeatureIconSymbol(feature.icon)}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-terracotta-dark">{feature.title}</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">{feature.description}</p>
      </div>
    </div>
  );
};

const ActivityCard = ({ activity, index }: { activity: (typeof siteContent.daily_glimpse.activities)[number]; index: number }) => {
  const imageUrl = getAssetUrl(activity.image);
  const animation = useInViewAnimation({ delay: `${index * 90}ms` });

  return (
    <article
      className={`group overflow-hidden rounded-3xl border border-border/60 bg-white/90 shadow-soft transition-transform duration-300 hover:-translate-y-1 ${animation.className}`}
      ref={animation.ref}
      style={animation.style}
    >
      <div className="flex flex-col md:flex-row md:items-stretch">
        <div className="md:w-1/2 h-48 md:h-auto overflow-hidden">
          <img
            src={imageUrl}
            alt={activity.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex-1 p-8 md:p-10 space-y-3 flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-terracotta-dark">{activity.title}</h3>
          <p className="text-base text-foreground/80 leading-relaxed">{activity.description}</p>
        </div>
      </div>
    </article>
  );
};

const GalleryCard = ({
  item,
  index,
  layout = "grid",
}: {
  item: (typeof siteContent.gallery.images)[number];
  index: number;
  layout?: "grid" | "carousel";
}) => {
  const imageUrl = getAssetUrl(item.image);
  const animation = useInViewAnimation({ threshold: 0.05, delay: `${index * 10}ms` });
  const isCarousel = layout === "carousel";
  const imageFitClass = "object-cover";
  const imageWrapperClass = isCarousel ? "aspect-square bg-terracotta/5" : "md:h-80";

  return (
    <figure
      className={`group rounded-2xl overflow-hidden border border-border/60 bg-white/60 shadow-soft ${isCarousel ? "h-full flex flex-col" : ""
        } ${animation.className}`}
      ref={animation.ref}
      style={animation.style}
    >
      <div className={`${imageWrapperClass} overflow-hidden flex items-center justify-center`}>
        <img
          src={imageUrl}
          alt={item.caption ? item.caption : imageUrl}
          className={`w-full h-full ${imageFitClass} transition-transform duration-300 group-hover:scale-105`}
        />
      </div>
      {item.caption ? (
        <figcaption className={`p-4 text-sm text-foreground/80 ${isCarousel ? "bg-white/85" : ""}`}>
          {item.caption}
        </figcaption>
      ) : null}
    </figure>
  );
};

const QuickAnswerCard = ({ item, index }: { item: (typeof siteContent.quick_answers.items)[number]; index: number }) => {
  const animation = useInViewAnimation({ delay: `${index * 60}ms` });

  return (
    <article
      className={`rounded-2xl border border-border/60 bg-white/85 p-6 shadow-soft h-full ${animation.className}`}
      ref={animation.ref}
      style={animation.style}
    >
      <p className="text-xs uppercase tracking-[0.25em] text-terracotta-dark/70">{item.question}</p>
      <div className="mt-4 space-y-4">
        {item.answers.map((entry) => (
          <div key={`${item.question}-${entry.person}`} className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-terracotta/10 text-terracotta-dark font-semibold flex items-center justify-center border border-terracotta/20">
              {entry.person.charAt(0)}
            </div>
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.18em] text-terracotta-dark/70">{entry.person}</p>
              <p className="text-base text-foreground/85 leading-relaxed">{entry.response}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

const VillageCard = ({ entry, index }: { entry: (typeof siteContent.our_village.entries)[number]; index: number }) => {
  const imageUrl = getAssetUrl(entry.image);
  const animation = useInViewAnimation({ delay: `${index * 90}ms` });

  return (
    <article
      className={`bg-white/80 rounded-3xl border border-terracotta/10 shadow-soft overflow-hidden h-full flex flex-col ${animation.className}`}
      ref={animation.ref}
      style={animation.style}
    >
      <div className="h-80 overflow-hidden">
        <img src={imageUrl} alt={entry.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-8 space-y-3 flex-1 flex flex-col">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-terracotta-dark">{entry.title}</h3>
          <p className="text-sm uppercase tracking-[0.2em] text-terracotta-dark/70">{entry.subtitle}</p>
        </div>
        <p className="text-base leading-relaxed text-foreground/80">{entry.body}</p>
      </div>
    </article>
  );
};

const OurVillageCarousel = ({ entries }: { entries: typeof siteContent.our_village.entries }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  const calculateSlidesPerView = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  useEffect(() => {
    const updateSlidesPerView = () => {
      setSlidesPerView(calculateSlidesPerView());
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  const goToSlide = (index: number) => {
    const maxIndex = Math.max(entries.length - slidesPerView, 0);
    const safeRange = maxIndex + 1;
    setActiveIndex(((index % safeRange) + safeRange) % safeRange);
  };

  const nextSlide = () => goToSlide(activeIndex + 1);
  const previousSlide = () => goToSlide(activeIndex - 1);

  useEffect(() => {
    goToSlide(activeIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slidesPerView, entries.length]);

  const slideWidth = 100 / slidesPerView;
  const slidePositions = Math.max(entries.length - slidesPerView + 1, 1);

  return (
    <div className="relative max-w-6xl mx-auto">
      <div className="overflow-hidden rounded-[28px]">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * slideWidth}%)` }}
          aria-live="polite"
        >
          {entries.map((entry, index) => (
            <div key={entry.title} className="flex-shrink-0 px-1" style={{ width: `${slideWidth}%` }}>
              <VillageCard entry={entry} index={index} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 md:justify-center md:gap-8">
        <button
          type="button"
          onClick={previousSlide}
          className="inline-flex items-center gap-2 rounded-full border border-terracotta/40 bg-white px-4 py-2 text-terracotta-dark shadow-soft transition hover:shadow-glow focus-ring pressable"
          aria-label="Previous person"
        >
          <span aria-hidden>←</span>
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: slidePositions }).map((_, index) => (
            <button
              key={`village-dot-${index}`}
              type="button"
              onClick={() => goToSlide(index)}
              className={`h-2.5 w-2.5 rounded-full transition ${activeIndex === index ? "bg-terracotta-dark scale-110" : "bg-border hover:bg-terracotta/50"
                }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-pressed={activeIndex === index}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={nextSlide}
          className="inline-flex items-center gap-2 rounded-full border border-terracotta/40 bg-white px-4 py-2 text-terracotta-dark shadow-soft transition hover:shadow-glow focus-ring pressable"
          aria-label="Next person"
        >
          <span className="hidden sm:inline">Next</span>
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
};

const TimelineCard = ({ event, index }: { event: (typeof siteContent.timeline.events)[number]; index: number }) => {
  const animation = useInViewAnimation({ delay: `${index * 70}ms` });

  return (
    <div className={`relative pl-12 md:pl-0 ml-6 md:ml-0 ${animation.className}`} ref={animation.ref} style={animation.style}>
      <div className="absolute -left-1 top-24 h-3 w-3 rounded-full bg-terracotta shadow-soft ring-[2px] ring-white md:hidden" />
      <div className="bg-white/80 border border-border/70 rounded-2xl shadow-soft p-6 md:p-7 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage/30 text-sage-dark text-sm font-semibold">
          <span className="h-2 w-2 rounded-full bg-terracotta-dark" />
          {event.timestamp}
        </div>
        <h3 className="text-xl font-semibold text-terracotta-dark">{event.title}</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">{event.description}</p>
      </div>
    </div>
  );
};

const VideoShortCard = ({ short, index }: { short: (typeof siteContent.shorts.videos)[number]; index: number }) => {
  const animation = useInViewAnimation({ delay: `${index * 40}ms` });

  return (
    <article
      className={`rounded-3xl border border-border/60 bg-white/80 shadow-soft overflow-hidden flex flex-col gap-6 ${animation.className}`}
      ref={animation.ref}
      style={animation.style}
    >
      <div className="relative aspect-[9/16] bg-black overflow-hidden">
        <iframe
          src={short.video_url}
          title={short.title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent h-20 pointer-events-none" />
      </div>
      <div className="px-5 pb-5 space-y-2">
        <h3 className="text-lg font-semibold text-terracotta-dark">{short.title}</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">{short.description}</p>
      </div>
    </article>
  );
};

const App = () => {
  const {
    brand,
    navigation,
    cta,
    hero,
    about,
    our_village,
    home_life,
    map,
    daily_glimpse,
    shorts,
    timeline,
    gallery,
    quick_answers,
    letter_to_birth_mother,
    contact,
  } = siteContent;

  const heroAnimation = useInViewAnimation({ threshold: 0.2, duration: "900ms" });
  const [villageEmblaRef, villageEmblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const [shortsEmblaRef, shortsEmblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const [galleryEmblaRef, galleryEmblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const [villageCanPrev, setVillageCanPrev] = useState(false);
  const [villageCanNext, setVillageCanNext] = useState(false);
  const [shortsCanPrev, setShortsCanPrev] = useState(false);
  const [shortsCanNext, setShortsCanNext] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [galleryCanPrev, setGalleryCanPrev] = useState(false);
  const [galleryCanNext, setGalleryCanNext] = useState(false);
  const [activeHomeTab, setActiveHomeTab] = useState<"home" | "neighborhood" | "highlights">("home");

  const homeTabs = [
    {
      key: "home" as const,
      label: "Home",
      spotlight: home_life.spotlights[0],
    },
    {
      key: "neighborhood" as const,
      label: "Neighborhood",
      spotlight: home_life.spotlights[1] ?? home_life.spotlights[0],
    },
    {
      key: "highlights" as const,
      label: "Highlights",
      spotlight: home_life.spotlights[1] ?? home_life.spotlights[0],
    },
  ];

  const activeHomeTabConfig = homeTabs.find((tab) => tab.key === activeHomeTab) ?? homeTabs[0];
  const activeSpotlight = activeHomeTabConfig.spotlight;

  const updateVillageButtons = useCallback(() => {
    if (!villageEmblaApi) return;
    setVillageCanPrev(villageEmblaApi.canScrollPrev());
    setVillageCanNext(villageEmblaApi.canScrollNext());
  }, [villageEmblaApi]);

  const updateShortsButtons = useCallback(() => {
    if (!shortsEmblaApi) return;
    setShortsCanPrev(shortsEmblaApi.canScrollPrev());
    setShortsCanNext(shortsEmblaApi.canScrollNext());
  }, [shortsEmblaApi]);

  const updateGalleryButtons = useCallback(() => {
    if (!galleryEmblaApi) return;
    setGalleryCanPrev(galleryEmblaApi.canScrollPrev());
    setGalleryCanNext(galleryEmblaApi.canScrollNext());
  }, [galleryEmblaApi]);

  const scrollVillagePrev = useCallback(() => villageEmblaApi?.scrollPrev(), [villageEmblaApi]);
  const scrollVillageNext = useCallback(() => villageEmblaApi?.scrollNext(), [villageEmblaApi]);
  const scrollShortsPrev = useCallback(() => shortsEmblaApi?.scrollPrev(), [shortsEmblaApi]);
  const scrollShortsNext = useCallback(() => shortsEmblaApi?.scrollNext(), [shortsEmblaApi]);
  const scrollGalleryPrev = useCallback(() => galleryEmblaApi?.scrollPrev(), [galleryEmblaApi]);
  const scrollGalleryNext = useCallback(() => galleryEmblaApi?.scrollNext(), [galleryEmblaApi]);

  useEffect(() => {
    if (!villageEmblaApi) return;
    updateVillageButtons();
    villageEmblaApi.on("select", updateVillageButtons);
    villageEmblaApi.on("reInit", updateVillageButtons);
    return () => {
      villageEmblaApi.off("select", updateVillageButtons);
      villageEmblaApi.off("reInit", updateVillageButtons);
    };
  }, [villageEmblaApi, updateVillageButtons]);

  useEffect(() => {
    if (!shortsEmblaApi) return;
    updateShortsButtons();
    shortsEmblaApi.on("select", updateShortsButtons);
    shortsEmblaApi.on("reInit", updateShortsButtons);
    return () => {
      shortsEmblaApi.off("select", updateShortsButtons);
      shortsEmblaApi.off("reInit", updateShortsButtons);
    };
  }, [shortsEmblaApi, updateShortsButtons]);

  useEffect(() => {
    if (!galleryEmblaApi) return;
    updateGalleryButtons();
    galleryEmblaApi.on("select", updateGalleryButtons);
    galleryEmblaApi.on("reInit", updateGalleryButtons);
    return () => {
      galleryEmblaApi.off("select", updateGalleryButtons);
      galleryEmblaApi.off("reInit", updateGalleryButtons);
    };
  }, [galleryEmblaApi, updateGalleryButtons]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-background to-background text-foreground">
      <header className="sticky top-0 z-10 backdrop-blur bg-background/75 border-b border-border/60">
        <div className="section-container py-5 flex items-center justify-between gap-4">
          <a
            href="#top"
            className="flex items-center gap-2 font-semibold text-terracotta-dark text-lg focus-ring pressable"
          >
            <span className="h-10 w-10 rounded-full bg-terracotta/15 border border-terracotta/30 flex items-center justify-center text-terracotta-dark font-serif text-xl">&#x2764;&#xFE0E;</span>
            {brand}
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-foreground/70">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-terracotta-dark transition-colors focus-ring pressable"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              className="hidden md:inline-flex px-4 py-2 rounded-full bg-terracotta text-primary-foreground text-sm font-semibold shadow-soft hover:shadow-glow transition-shadow focus-ring pressable"
              href={cta.href}
            >
              {cta.label}
            </a>
            <button
              type="button"
              className="md:hidden inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/90 px-4 py-2 text-sm font-semibold text-terracotta-dark shadow-soft focus-ring pressable"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <span aria-hidden>{isMenuOpen ? "Close" : "Menu"}</span>
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
        </div>
        {isMenuOpen ? (
          <div className="md:hidden border-t border-border/60 bg-white/95 shadow-soft" id="mobile-navigation">
            <div className="section-container py-4 flex flex-col gap-3 text-sm text-foreground/80">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="pressable rounded-lg px-4 py-3 hover:bg-terracotta/10 focus-ring"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                className="inline-flex justify-center px-4 py-3 rounded-full bg-terracotta text-primary-foreground text-sm font-semibold shadow-soft hover:shadow-glow transition-shadow focus-ring pressable"
                href={cta.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {cta.label}
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <main id="top" className="space-y-20 pb-20">
        <section
          className={`relative overflow-hidden ${heroAnimation.className}`}
          ref={heroAnimation.ref}
          style={heroAnimation.style}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -left-20 -top-20 h-64 w-64 bg-terracotta/10 rounded-full blur-3xl" />
            <div className="absolute right-10 top-20 h-72 w-72 bg-sage/20 rounded-full blur-3xl" />
          </div>
          <div className="section-container relative pt-16 pb-20 flex flex-col items-center text-center gap-6">
            <p className="text-sm uppercase tracking-[0.3em] text-terracotta-dark/80">{hero.eyebrow}</p>
            <h1 className="heading-display max-w-4xl text-terracotta-dark">{hero.headline}</h1>
            <p className="body-large max-w-3xl text-foreground/80">{hero.description}</p>
            <a
              href={hero.cta_href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-terracotta text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition focus-ring pressable"
            >
              {hero.cta_label}
            </a>
            <div className="w-full max-w-4xl">
              <div className="overflow-hidden rounded-3xl border border-terracotta/20 bg-white/70 shadow-soft">
                <div className="aspect-video">
                  <iframe
                    src={hero.video_url}
                    title={hero.video_title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4 text-sm text-foreground/80 bg-white/80 text-left">{hero.video_caption}</div>
              </div>
            </div>
            <div className="flex flex-col items-center pt-6 text-sm text-warm-gray">
              <span>{hero.scroll_hint}</span>
              <span aria-hidden className="text-2xl">↓</span>
            </div>
          </div>
        </section>

        <section id="about" className="section-container space-y-8">
          <SectionHeading title={about.title} subtitle="Who we are" />
          <p className="text-center max-w-3xl mx-auto body-large text-foreground/80">{about.intro}</p>
          <div className="grid md:grid-cols-2 gap-8">
            {about.people.map((person, index) => (
              <AboutCard key={person.name} person={person} index={index} />
            ))}
          </div>
          <div className="text-center pt-4">
            <a
              href={hero.cta_href}
              className="inline-flex items-center gap-2 text-terracotta-dark font-semibold hover:underline focus-ring pressable"
            >
              {hero.cta_label}
            </a>
          </div>
        </section>

        <section id="home-life" className="section-container space-y-6">
          <SectionHeading title={home_life.title} subtitle={home_life.subtitle} />
          <div className="mx-auto max-w-3xl text-center text-sm text-foreground/70">
            {home_life.description}
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap justify-center gap-3 rounded-full bg-white/60 p-2 shadow-soft border border-border/70">
              {homeTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveHomeTab(tab.key)}
                  className={`pressable min-w-[120px] rounded-full px-4 py-2 text-sm font-semibold transition focus-ring ${
                    activeHomeTab === tab.key
                      ? "bg-terracotta text-primary-foreground shadow-glow"
                      : "bg-transparent text-terracotta-dark hover:bg-terracotta/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-5 items-stretch">
              <div className="lg:col-span-3">
                <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-white/80 shadow-soft h-full">
                  <div className="aspect-[4/3] lg:aspect-[5/4] overflow-hidden">
                    <img
                      src={getAssetUrl(activeSpotlight.image)}
                      alt={activeSpotlight.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-terracotta/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/80">{home_life.subtitle}</p>
                    <h3 className="text-2xl font-semibold drop-shadow">{activeSpotlight.title}</h3>
                    <p className="text-sm leading-relaxed text-white/90 drop-shadow max-w-2xl">{activeSpotlight.description}</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 flex flex-col gap-4 rounded-3xl border border-border/70 bg-white/80 p-5 shadow-soft">
                <div className="space-y-2 text-left">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-terracotta-dark/70">Explore</p>
                  <h3 className="text-xl font-semibold text-terracotta-dark">{home_life.title}</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">{home_life.description}</p>
                  <p className="text-sm text-foreground/70 leading-relaxed">{activeHomeTabConfig.spotlight.description}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={hero.cta_href}
                    className="inline-flex items-center gap-2 rounded-full bg-terracotta px-4 py-2 text-primary-foreground text-sm font-semibold shadow-soft hover:shadow-glow transition focus-ring pressable"
                  >
                    {hero.cta_label}
                  </a>
                  <span className="inline-flex items-center rounded-full bg-terracotta/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
                    {activeHomeTabConfig.label}
                  </span>
                </div>

                {activeHomeTab === "highlights" ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-terracotta-dark">Neighborhood highlights</h4>
                      <span className="text-xs uppercase tracking-[0.2em] text-terracotta-dark/70">Swipe to see more</span>
                    </div>

                    <div className="-mx-4 flex gap-4 overflow-x-auto pb-2 md:hidden snap-x snap-mandatory">
                      {home_life.features.map((feature, index) => (
                        <div key={feature.title} className="snap-start px-1 min-w-[240px] max-w-[260px]">
                          <HomeFeatureCard feature={feature} index={index} />
                        </div>
                      ))}
                    </div>

                    <div className="hidden md:grid gap-4 md:grid-cols-2">
                      {home_life.features.map((feature, index) => (
                        <HomeFeatureCard key={feature.title} feature={feature} index={index} />
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section id="our-village" className="section-container space-y-8">
          <SectionHeading title={our_village.title} subtitle={our_village.subtitle} />
          <p className="text-center max-w-3xl mx-auto body-large text-foreground/80">{our_village.intro}</p>
          <div className="relative">
            <div className="overflow-hidden" ref={villageEmblaRef}>
              <div className="flex gap-6">
                {our_village.entries.map((entry, index) => (
                  <div
                    key={entry.title}
                    className="min-w-0 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_40%] xl:flex-[0_0_33.333%]"
                  >
                    <VillageCard entry={entry} index={index} />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <CarouselControls
                onPrev={scrollVillagePrev}
                onNext={scrollVillageNext}
                canPrev={villageCanPrev}
                canNext={villageCanNext}
              />
            </div>
          </div>
        </section>

        <WorldMapSection map={map} />

        <section id="timeline" className="section-container space-y-8">
          <SectionHeading title={timeline.title} subtitle="Our journey" />
          <p className="text-center max-w-3xl mx-auto body-large text-foreground/80">{timeline.description}</p>
          <div className="relative">
            <div className="pointer-events-none absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border/80 md:-translate-x-1/2" />
            <div className="space-y-10 md:space-y-14">
              {timeline.events.map((event, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <div key={event.title} className="relative md:grid md:grid-cols-2 md:items-start md:gap-12">
                    <div className={`${isLeft ? "md:pr-10" : "md:col-start-2 md:pl-10"}`}>
                      <TimelineCard event={event} index={index} />
                    </div>
                    <div
                      className={`${isLeft ? "hidden md:block" : "hidden md:block md:col-start-1"} md:pr-10 md:pl-10`}
                    />
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 md:top-24">
                      <div className="h-4 w-4 rounded-full bg-terracotta shadow-soft ring-2 ring-white" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="glimpse" className="section-container space-y-8">
          <SectionHeading title={daily_glimpse.title} subtitle="The rhythms we love" />
          <p className="text-center max-w-3xl mx-auto body-large text-foreground/80">{daily_glimpse.description}</p>
          <div className="space-y-6">
            {daily_glimpse.activities.map((activity, index) => (
              <ActivityCard key={activity.title} activity={activity} index={index} />
            ))}
          </div>
        </section>

        <section id="shorts" className="section-container space-y-8">
          <SectionHeading title={shorts.title} subtitle={shorts.subtitle} />
          <p className="text-center max-w-3xl mx-auto body-large text-foreground/80">{shorts.description}</p>
          <div className="relative">
            <div className="overflow-hidden" ref={shortsEmblaRef}>
              <div className="flex gap-6">
                {shorts.videos.map((short, index) => (
                  <div
                    key={short.title}
                    className="min-w-0 flex-[0_0_80%] sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_30%]"
                  >
                    <VideoShortCard short={short} index={index} />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <CarouselControls
                onPrev={scrollShortsPrev}
                onNext={scrollShortsNext}
                canPrev={shortsCanPrev}
                canNext={shortsCanNext}
              />
            </div>
          </div>
        </section>

        <section id="gallery" className="section-container space-y-8">
          <SectionHeading title={gallery.title} subtitle="Photos" />
          <div className="space-y-6">
            <div
              className="overflow-hidden rounded-[28px] border border-border/70 bg-white/70 shadow-soft"
              ref={galleryEmblaRef}
            >
              <div className="flex gap-6 p-4">
                {gallery.images.map((item, index) => (
                  <div
                    key={item.caption ?? item.image}
                    className="min-w-0 flex-[0_0_90%] sm:flex-[0_0_70%] md:flex-[0_0_55%] lg:flex-[0_0_45%]"
                  >
                    <GalleryCard item={item} index={index} layout="carousel" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <CarouselControls
                onPrev={scrollGalleryPrev}
                onNext={scrollGalleryNext}
                canPrev={galleryCanPrev}
                canNext={galleryCanNext}
              />
            </div>
          </div>
        </section>

        <section id="quick-answers" className="section-container space-y-8">
          <SectionHeading title={quick_answers.title} subtitle={quick_answers.subtitle} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {quick_answers.items.map((item, index) => (
              <QuickAnswerCard key={item.question} item={item} index={index} />
            ))}
          </div>
        </section>

        <section id="letter" className="section-container space-y-8">
          <SectionHeading title={letter_to_birth_mother.title} subtitle={letter_to_birth_mother.subtitle} />
          <div className="max-w-4xl mx-auto bg-white/80 border border-terracotta/15 shadow-soft rounded-3xl p-8 md:p-10 space-y-6 text-left">
            <p className="text-sm uppercase tracking-[0.3em] text-terracotta-dark/70">{letter_to_birth_mother.greeting}</p>
            <p className="body-large text-foreground/80">{letter_to_birth_mother.intro}</p>
            <div className="space-y-3 text-base leading-relaxed text-foreground/80">
              {letter_to_birth_mother.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="pt-2 space-y-1 text-foreground/80">
              <p className="italic">{letter_to_birth_mother.closing}</p>
              <p className="font-semibold text-terracotta-dark">{letter_to_birth_mother.signature}</p>
            </div>
          </div>
        </section>

        <section id="contact" className="section-container text-center space-y-6">
          <SectionHeading title={contact.title} subtitle="Stay in touch" />
          <p className="body-large max-w-3xl mx-auto text-foreground/80">{contact.message}</p>
          <a
            href={contact.button_href}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-terracotta text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition focus-ring pressable"
          >
            {contact.button_label}
          </a>
        </section>
      </main>
    </div>
  );
};

export default App;
