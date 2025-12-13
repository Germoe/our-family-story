import { useMemo, useState } from "react";
import { getAssetUrl, type SiteContent } from "@/lib/content";

const getPopoverAlignment = (xPercent: number) => {
  if (xPercent > 75) return "right";
  if (xPercent < 25) return "left";
  return "center";
};

const WorldMapSection = ({ map }: { map: SiteContent["map"] }) => {
  const [activeTitle, setActiveTitle] = useState(map.markers[0]?.title ?? "");
  const mapIllustration = useMemo(() => getAssetUrl("world-map.svg"), []);

  const activeMarker = map.markers.find((marker) => marker.title === activeTitle) ?? map.markers[0];

  return (
    <section id="map" className="section-container space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-terracotta-dark/70">Our world</p>
        <h2 className="heading-section text-terracotta-dark">{map.heading ?? "Places we love"}</h2>
      </div>
      {map.intro ? (
        <p className="text-center max-w-3xl mx-auto body-large text-foreground/80">{map.intro}</p>
      ) : null}

      {activeMarker ? (
        <div className="md:hidden rounded-2xl border border-border/70 bg-white/90 p-5 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 overflow-hidden rounded-xl border border-border/70">
              <img src={getAssetUrl(activeMarker.image)} alt={activeMarker.title} className="h-full w-full object-cover" />
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.2em] text-terracotta-dark/70">{activeMarker.subtitle}</p>
              <h3 className="text-lg font-semibold text-terracotta-dark">{activeMarker.title}</h3>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-foreground/80">{activeMarker.description}</p>
        </div>
      ) : null}

      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-white/80 shadow-soft">
        <div className="relative p-4 md:p-6">
          <div className="relative aspect-[4/5] md:aspect-[16/9] overflow-hidden rounded-2xl bg-sage/10">
            <div className="absolute inset-0">
              <img
                src={mapIllustration}
                alt="Stylized world map"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="absolute inset-0">
              {map.markers.map((marker) => {
                const isActive = marker.title === activeMarker?.title;
                const alignment = getPopoverAlignment(marker.x_percent);

                return (
                  <div
                    key={marker.title}
                    style={{ left: `${marker.x_percent}%`, top: `${marker.y_percent}%` }}
                    className="absolute"
                  >
                    <button
                      type="button"
                      className={`group relative flex h-10 w-10 md:h-12 md:w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-terracotta/50 bg-white/80 text-terracotta-dark shadow-soft transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                        isActive ? "scale-105 shadow-glow" : "hover:scale-105"
                      }`}
                      aria-label={`${marker.title} marker`}
                      aria-pressed={isActive}
                      onMouseEnter={() => setActiveTitle(marker.title)}
                      onFocus={() => setActiveTitle(marker.title)}
                      onClick={() => setActiveTitle(marker.title)}
                    >
                      <span className="text-xl">❤</span>
                      <span className="sr-only">{marker.subtitle}</span>
                    </button>

                    {isActive ? (
                      <div
                        className={`absolute mt-3 w-64 max-w-xs rounded-2xl border border-border/70 bg-white/95 p-4 text-left shadow-soft backdrop-blur transition ${
                          alignment === "center"
                            ? "left-1/2 -translate-x-1/2"
                            : alignment === "left"
                            ? "left-0"
                            : "right-0"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-14 w-14 overflow-hidden rounded-xl border border-border/70">
                            <img
                              src={getAssetUrl(marker.image)}
                              alt={marker.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs uppercase tracking-[0.2em] text-terracotta-dark/70">{marker.subtitle}</p>
                            <h3 className="text-lg font-semibold text-terracotta-dark">{marker.title}</h3>
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-foreground/80">{marker.description}</p>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default WorldMapSection;
