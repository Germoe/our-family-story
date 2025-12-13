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

const ActivityCard = ({ activity }: { activity: (typeof siteContent.daily_glimpse.activities)[number] }) => {
  const imageUrl = getAssetUrl(activity.image);

  return (
    <article className="group overflow-hidden rounded-3xl border border-border/60 bg-white/90 shadow-soft transition-transform duration-300 hover:-translate-y-1">
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

const TimelineCard = ({ event }: { event: (typeof siteContent.timeline.events)[number] }) => (
  <div className="relative pl-12 md:pl-0 ml-6 md:ml-0">
    <div className="absolute left-0 top-7 h-3 w-3 rounded-full bg-terracotta shadow-soft ring-[6px] ring-white md:hidden" />
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

const App = () => {
  const { brand, navigation, cta, hero, about, home_life, daily_glimpse, timeline, gallery, contact } = siteContent;

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

      <main id="top" className="space-y-20 pb-20">
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

        <section id="about" className="section-container space-y-8">
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

        <section id="home-life" className="section-container space-y-8">
          <SectionHeading title={home_life.title} subtitle="Where we live" />
          <p className="text-center max-w-3xl mx-auto body-large text-foreground/80">{home_life.description}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {home_life.highlights.map((highlight) => (
              <HighlightCard key={highlight.title} highlight={highlight} />
            ))}
          </div>
        </section>

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
                      <TimelineCard event={event} />
                    </div>
                    <div
                      className={`${isLeft ? "hidden md:block" : "hidden md:block md:col-start-1"} md:pr-10 md:pl-10`}
                    />
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-7">
                      <div className="h-4 w-4 rounded-full bg-terracotta shadow-soft ring-8 ring-white" />
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
            {daily_glimpse.activities.map((activity) => (
              <ActivityCard key={activity.title} activity={activity} />
            ))}
          </div>
        </section>

        <section id="gallery" className="section-container space-y-8">
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
