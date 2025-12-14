import { useEffect, useMemo, useRef, useState, type CSSProperties, type RefObject } from "react";

type UseInViewAnimationOptions = {
  /** Adjust when the animation triggers relative to the viewport. */
  rootMargin?: string;
  /** How much of the element must be visible to trigger. */
  threshold?: number | number[];
  /** If true, the animation runs only once and stays visible afterward. */
  once?: boolean;
  /** Base class applied before the element is in view. */
  baseClass?: string;
  /** Class applied when the element is in view. */
  activeClass?: string;
  /** Optional delay value (e.g. "150ms" or "0.2s"). */
  delay?: string;
  /** Optional duration value (e.g. "800ms" or "1s"). */
  duration?: string;
};

type UseInViewAnimationResult = {
  ref: RefObject<HTMLElement>;
  isInView: boolean;
  className: string;
  style?: CSSProperties;
};

const useInViewAnimation = (
  {
    rootMargin = "0px 0px -10% 0px",
    threshold = 0.3,
    once = true,
    baseClass = "inview-base",
    activeClass = "inview-active",
    delay,
    duration,
  }: UseInViewAnimationOptions = {},
): UseInViewAnimationResult => {
  const ref = useRef<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node || typeof IntersectionObserver === "undefined") {
      setIsIntersecting(true);
      setHasAnimated(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            setHasAnimated(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsIntersecting(false);
          }
        });
      },
      { rootMargin, threshold },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  const isInView = once ? hasAnimated || isIntersecting : isIntersecting;

  const className = `${baseClass} ${isInView ? activeClass : ""}`.trim();

  const style = useMemo(() => {
    const styleObject: CSSProperties = {};

    if (delay) {
      styleObject["--inview-delay" as keyof CSSProperties] = delay;
    }

    if (duration) {
      styleObject["--inview-duration" as keyof CSSProperties] = duration;
    }

    return styleObject;
  }, [delay, duration]);

  return { ref, isInView, className, style: Object.keys(style).length ? style : undefined };
};

export default useInViewAnimation;
