import React, { useEffect, useRef } from 'react';
import './fourElements.css';

export const ELEMENTS_IMAGE = {
  src: '/solutions/four-elements.jpg', width: 1983, height: 793,
  alt: 'The Four Elements: Sun – Innovation, Wind – Agility, Earth – Responsibility, Water – Purity, around a glowing Earth. Guided by nature. Driven by purpose.'
};

export default function FourElements({ id = 'about', image = ELEMENTS_IMAGE }) {
  const root = useRef(null);
  useEffect(() => {
    const el = root.current; if (!el) return;
    if (!('IntersectionObserver' in window) || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { el.classList.add('in'); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section id={id} className="fElem" ref={root} aria-label="The Four Elements — our core values">
      <img className="fElemImg" src={image.src} width={image.width} height={image.height} alt={image.alt} decoding="async" draggable="false" />
    </section>
  );
}
