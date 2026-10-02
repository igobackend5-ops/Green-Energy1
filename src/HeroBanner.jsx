import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { RECT } from './earthConfig.js';

const HeroEarth = lazy(() => import('./HeroEarth.jsx'));

// Banner size (px) after the baked-in nav strip was cropped off.
const W = 1672, H = 841;
const pct = (v, total) => `${(v / total) * 100}%`;

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch (e) { return false; }
}

export default function HeroBanner() {
  const ref = useRef(null);
  const [enabled, setEnabled] = useState(false); // load the 3D chunk
  const [ready, setReady] = useState(false);     // first 3D frame drawn
  const [visible, setVisible] = useState(true);
  const [failed, setFailed] = useState(false);
  const [opts, setOpts] = useState({ light: false, reduced: false });

  useEffect(() => {
    if (!hasWebGL()) { setFailed(true); return; }
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const small = window.matchMedia?.('(max-width: 700px)').matches ?? false;
    const weak = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
    setOpts({ light: small || weak, reduced });
    const start = () => setEnabled(true);
    const id = 'requestIdleCallback' in window ? window.requestIdleCallback(start, { timeout: 1500 }) : setTimeout(start, 400);
    return () => ('cancelIdleCallback' in window ? window.cancelIdleCallback(id) : clearTimeout(id));
  }, []);

  // pause rendering when off-screen or tab hidden
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let inView = true;
    const apply = () => setVisible(inView && !document.hidden);
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; apply(); }, { threshold: 0 });
    io.observe(el);
    document.addEventListener('visibilitychange', apply);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', apply); };
  }, []);

  // subtle scroll parallax (kept inside the hero: clamped)
  useEffect(() => {
    const el = ref.current; if (!el || opts.reduced) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const h = el.offsetHeight || 1;
      const p = Math.min(1, Math.max(0, window.scrollY / h));
      el.style.setProperty('--p', p.toFixed(3));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener('scroll', on, { passive: true });
    tick();
    return () => { window.removeEventListener('scroll', on); if (raf) cancelAnimationFrame(raf); };
  }, [opts.reduced]);

  const onReady = useCallback(() => setReady(true), []);
  const show3d = enabled && !failed;

  return (
    <section id="home" className="hero" ref={ref}>
      <div className="heroStage">
        {/* original banner: shown until (or unless) the 3D Earth is ready */}
        <img className="heroLayer" src="/hero/hero-static.jpg" alt="iGo Green Energy - solar, wind, biogas and water treatment around a renewable Earth" />
        {show3d && (
          <>
            <img className={`heroLayer heroPlate${ready ? ' on' : ''}`} src="/hero/hero-plate.jpg" alt="" aria-hidden="true" />
            <div
              className={`earthWrap${ready ? ' on' : ''}`}
              style={{
                left: pct(RECT.x0, W), top: pct(RECT.y0, H),
                width: pct(RECT.x1 - RECT.x0, W), height: pct(RECT.y1 - RECT.y0, H)
              }}
            >
              <Suspense fallback={null}>
                <ErrorCatch onError={() => setFailed(true)}>
                  <HeroEarth light={opts.light} reduced={opts.reduced} active={visible} onReady={onReady} />
                </ErrorCatch>
              </Suspense>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

class ErrorCatch extends React.Component {
  state = { bad: false };
  static getDerivedStateFromError() { return { bad: true }; }
  componentDidCatch() { this.props.onError && this.props.onError(); }
  render() { return this.state.bad ? null : this.props.children; }
}
