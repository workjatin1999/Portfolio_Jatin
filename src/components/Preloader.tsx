import {useEffect, useRef, useState} from 'react';

interface PreloaderProps {
  onFadeStart: () => void;
  onComplete: () => void;
}

const MAX_WAIT_MS = 5000;

export default function Preloader({onFadeStart, onComplete}: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const onFadeStartRef = useRef(onFadeStart);
  const onCompleteRef = useRef(onComplete);
  onFadeStartRef.current = onFadeStart;
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let rafId = 0;
    let fadeTimerId = 0;
    let isCancelled = false;
    let hasTriggeredFinish = false;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let domLoaded = document.readyState === 'complete';
    let fontsLoaded = false;
    let imagesTotal = 0;
    let imagesSettled = 0;
    let targetProgress = 12;
    let currentProgress = 0;

    const trackedImages = new Set<HTMLImageElement>();
    const imageCleanupFns: Array<() => void> = [];

    const recomputeTarget = () => {
      const domScore = domLoaded ? 30 : 12;
      const fontsScore = fontsLoaded ? 25 : 0;
      const imageRatio = imagesTotal === 0 ? 1 : imagesSettled / imagesTotal;
      const imagesScore = Math.round(imageRatio * 45);

      const nextTarget = Math.min(100, domScore + fontsScore + imagesScore);
      targetProgress = Math.max(targetProgress, nextTarget);
    };

    const scanImages = () => {
      const imgs = Array.from(document.querySelectorAll('img'));
      for (const img of imgs) {
        if (trackedImages.has(img)) continue;
        trackedImages.add(img);
        imagesTotal += 1;

        if (img.complete) {
          imagesSettled += 1;
        } else {
          const handleSettle = () => {
            imagesSettled += 1;
            recomputeTarget();
          };
          img.addEventListener('load', handleSettle, {once: true});
          img.addEventListener('error', handleSettle, {once: true});
          imageCleanupFns.push(() => {
            img.removeEventListener('load', handleSettle);
            img.removeEventListener('error', handleSettle);
          });
        }
      }
      recomputeTarget();
    };

    // Initial scan after commit
    scanImages();

    const handleWindowLoad = () => {
      domLoaded = true;
      scanImages();
      recomputeTarget();
    };

    if (!domLoaded) {
      window.addEventListener('load', handleWindowLoad, {once: true});
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready
        .then(() => {
          if (isCancelled) return;
          fontsLoaded = true;
          recomputeTarget();
        })
        .catch(() => {
          if (isCancelled) return;
          fontsLoaded = true;
          recomputeTarget();
        });
    } else {
      fontsLoaded = true;
    }

    // Safety guard so a stalled external request never traps the visitor
    const safetyTimeoutId = window.setTimeout(() => {
      if (isCancelled) return;
      domLoaded = true;
      fontsLoaded = true;
      imagesSettled = imagesTotal;
      targetProgress = 100;
    }, MAX_WAIT_MS);

    const beginExit = () => {
      if (hasTriggeredFinish || isCancelled) return;
      hasTriggeredFinish = true;
      document.body.style.overflow = previousOverflow;
      setIsFadingOut(true);
      onFadeStartRef.current();

      const exitDuration = prefersReducedMotion ? 50 : 420;
      fadeTimerId = window.setTimeout(() => {
        if (!isCancelled) {
          onCompleteRef.current();
        }
      }, exitDuration);
    };

    const tick = () => {
      if (isCancelled) return;

      if (prefersReducedMotion && targetProgress >= 100) {
        setProgress(100);
        beginExit();
        return;
      }

      const diff = targetProgress - currentProgress;
      if (diff > 0.05) {
        const step = targetProgress >= 100 ? Math.max(diff * 0.24, 2.2) : Math.max(diff * 0.16, 0.45);
        currentProgress = Math.min(targetProgress, currentProgress + step);
        setProgress(currentProgress);
      } else if (targetProgress >= 100 && currentProgress < 100) {
        currentProgress = 100;
        setProgress(100);
      }

      if (currentProgress >= 99.9 && targetProgress >= 100) {
        setProgress(100);
        beginExit();
        return;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    recomputeTarget();
    rafId = window.requestAnimationFrame(tick);

    return () => {
      isCancelled = true;
      document.body.style.overflow = previousOverflow;
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(fadeTimerId);
      window.clearTimeout(safetyTimeoutId);
      window.removeEventListener('load', handleWindowLoad);
      for (const cleanup of imageCleanupFns) {
        cleanup();
      }
    };
  }, []);

  const displayPercent = Math.min(100, Math.max(0, Math.round(progress)));
  const ringRadius = 35;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (progress / 100) * ringCircumference;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy={!isFadingOut}
      aria-label={`Loading portfolio, ${displayPercent}%`}
      className={`print:hidden fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#F8F9FC] px-6 text-[#15172B] transition-opacity duration-400 ease-out motion-reduce:transition-none ${
        isFadingOut ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      {/* Subtle ambient depth matching portfolio theme */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-0 h-[360px] w-[360px] rounded-full bg-[#6C3BFF]/[0.07] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-0 h-[320px] w-[320px] rounded-full bg-[#2878FF]/[0.06] blur-3xl"
      />

      <div
        className={`relative flex w-full max-w-xs flex-col items-center text-center transition-transform duration-400 ease-out motion-reduce:transition-none ${
          isFadingOut ? 'scale-[0.98]' : 'scale-100'
        }`}
      >
        {/* Center Emblem with Smooth Circular Progress Ring */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          <svg
            aria-hidden="true"
            viewBox="0 0 80 80"
            className="absolute inset-0 h-full w-full -rotate-90"
          >
            <defs>
              <linearGradient id="preloaderRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6C3BFF" />
                <stop offset="100%" stopColor="#2878FF" />
              </linearGradient>
            </defs>
            <circle
              cx="40"
              cy="40"
              r={ringRadius}
              fill="none"
              stroke="rgba(21, 23, 43, 0.08)"
              strokeWidth="2.5"
            />
            <circle
              cx="40"
              cy="40"
              r={ringRadius}
              fill="none"
              stroke="url(#preloaderRingGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={ringCircumference}
              strokeDashoffset={ringOffset}
            />
          </svg>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl brand-gradient-bg shadow-lg shadow-[#6C3BFF]/20">
            <svg
              aria-hidden="true"
              viewBox="0 0 64 64"
              fill="none"
              className="h-8 w-8"
            >
              <path
                d="M38 15v22.5c0 6.1-4 10.5-10.2 10.5-4.3 0-7.7-2-9.5-5.3l5.3-3.1c.9 1.6 2.2 2.4 4 2.4 2.6 0 4.1-1.6 4.1-4.7V15H38Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>
        </div>

        {/* Portfolio Name */}
        <p className="mt-5 font-display text-2xl font-bold tracking-[0.14em] text-[#15172B] sm:text-[26px]">
          JATIN
        </p>
        <p className="mt-1 text-xs font-medium tracking-wide text-[#5B6080]">
          Jatin Kumar &middot; Digital Marketing Portfolio
        </p>

        {/* Smooth Progress Bar + Counter */}
        <div className="mt-7 w-full max-w-[240px] sm:max-w-[260px]">
          <div
            role="progressbar"
            aria-valuenow={displayPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Portfolio loading progress"
            className="h-1.5 w-full overflow-hidden rounded-full bg-[#15172B]/10"
          >
            <div
              className="h-full rounded-full brand-gradient-bg"
              style={{width: `${progress}%`}}
            />
          </div>

          <div className="mt-2.5 flex items-center justify-between text-xs">
            <span className="font-medium text-[#5B6080]">Loading...</span>
            <span className="font-mono font-semibold text-[#15172B] tabular-nums">
              {displayPercent}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
