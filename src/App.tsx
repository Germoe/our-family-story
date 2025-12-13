import { siteContent, getAssetUrl } from "./lib/content";

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="text-center max-w-3xl mx-auto space-y-4">
    {subtitle ? (
      <p className="text-sm uppercase tracking-[0.3em] text-terracotta-dark/70">{subtitle}</p>
    ) : null}
    <h2 className="heading-section text-terracotta-dark">{title}</h2>
  </div>
);

const AboutCard = ({ person }: { person: (typeof siteContent.about.people)[number] }) => {
  const imageUrl = getAssetUrl(person.image);

  return (
    <article className="bg-white/80 rounded-3xl border border-terracotta/10 shadow-soft overflow-hidden">
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

const HighlightCard = ({ highlight }: { highlight: (typeof siteContent.home_life.highlights)[number] }) => {
  const imageUrl = getAssetUrl(highlight.image);

  return (
    <div className="flex flex-col gap-4 bg-white/70 border border-border/60 rounded-2xl p-6 shadow-soft">
      <div className="relative h-40 rounded-xl overflow-hidden">
        <img src={imageUrl} alt={highlight.title} className="w-full h-full object-cover" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-terracotta-dark">{highlight.title}</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">{highlight.text}</p>
      </div>
    </div>
  );
};

const GalleryCard = ({ item }: { item: (typeof siteContent.gallery.images)[number] }) => {
  const imageUrl = getAssetUrl(item.image);
  return (
    <figure className="group rounded-2xl overflow-hidden border border-border/60 bg-white/60 shadow-soft">
      <div className="h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={item.caption}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <figcaption className="p-4 text-sm text-foreground/80">{item.caption}</figcaption>
    </figure>
  );
};

const App = () => {
  const { brand, navigation, cta, hero, about, home_life, gallery, contact } = siteContent;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-background to-background text-foreground">
      <header className="sticky top-0 z-10 backdrop-blur bg-background/75 border-b border-border/60">
        <div className="section-container py-5 flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-2 font-semibold text-terracotta-dark text-lg">
            <span className="h-10 w-10 rounded-full bg-terracotta/15 border border-terracotta/30 flex items-center justify-center text-terracotta-dark font-serif text-xl">❤</span>
            {brand}
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-foreground/70">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-terracotta-dark transition-colors">
                {item.label}
              </a>
            ))}
          </nav>
          <a
            className="px-4 py-2 rounded-full bg-terracotta text-primary-foreground text-sm font-semibold shadow-soft hover:shadow-glow transition-shadow"
            href={cta.href}
          >
            {cta.label}
          </a>
        </div>
      </header>

      <main id="top" className="space-y-24 pb-24">
        <section className="relative overflow-hidden">
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-terracotta text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition"
            >
              {hero.cta_label}
            </a>
            <div className="flex flex-col items-center pt-6 text-sm text-warm-gray">
              <span>{hero.scroll_hint}</span>
              <span aria-hidden className="text-2xl">↓</span>
            </div>
          </div>
        </section>

        <section id="about" className="section-container space-y-10">
          <SectionHeading title={about.title} subtitle="Who we are" />
          <p className="text-center max-w-3xl mx-auto body-large text-foreground/80">{about.intro}</p>
          <div className="grid md:grid-cols-2 gap-8">
            {about.people.map((person) => (
              <AboutCard key={person.name} person={person} />
            ))}
          </div>
          <div className="text-center pt-4">
            <a
              href={hero.cta_href}
              className="inline-flex items-center gap-2 text-terracotta-dark font-semibold hover:underline"
            >
              {hero.cta_label}
            </a>
          </div>
        </section>

        <section id="home-life" className="section-container space-y-10">
          <SectionHeading title={home_life.title} subtitle="Where we live" />
          <p className="text-center max-w-3xl mx-auto body-large text-foreground/80">{home_life.description}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {home_life.highlights.map((highlight) => (
              <HighlightCard key={highlight.title} highlight={highlight} />
            ))}
          </div>
        </section>

        <section id="gallery" className="section-container space-y-10">
          <SectionHeading title={gallery.title} subtitle="Photos" />
          <div className="grid md:grid-cols-3 gap-6">
            {gallery.images.map((item) => (
              <GalleryCard key={item.caption} item={item} />
            ))}
          </div>
        </section>

        <section id="contact" className="section-container text-center space-y-6">
          <SectionHeading title={contact.title} subtitle="Stay in touch" />
          <p className="body-large max-w-3xl mx-auto text-foreground/80">{contact.message}</p>
          <a
            href={contact.button_href}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-terracotta text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition"
          >
            {contact.button_label}
          </a>
        </section>
      </main>
    </div>
  );
};

export default App;
