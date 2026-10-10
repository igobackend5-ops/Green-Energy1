import React, { useState } from 'react';
import './clientTestimonials.css';
import { useCms } from './admin/store.js';


const Star = () => (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2l2.9 6.2 6.8.8-5 4.7 1.3 6.7L12 17.2 6 20.6l1.3-6.7-5-4.7 6.8-.8z" /></svg>);
const Quote = () => (<svg viewBox="0 0 32 26" aria-hidden="true"><path d="M0 26V14.6C0 6.2 4.2 1.2 12 0l1.2 4.4C9 5.6 7 8 6.8 11.4H13V26H0zm19 0V14.6C19 6.2 23.2 1.2 31 0l1.2 4.4C28 5.6 26 8 25.8 11.4H32V26H19z" /></svg>);
const Chev = ({ dir }) => (<svg viewBox="0 0 24 24" aria-hidden="true" style={dir === 'l' ? { transform: 'scaleX(-1)' } : null}><path d="M9 5l7 7-7 7" /></svg>);

export default function ClientTestimonials() {
  const all = useCms('testimonials');
  const TESTIMONIALS = (Array.isArray(all) ? all : []).filter((t) => t.status === 'published' && t.text).map((t) => ({ ...t, id: t.id }));
  const n = TESTIMONIALS.length;
  const [start0, setStart] = useState(0);
  const start = n ? start0 % n : 0;
  const step = (d) => n && setStart((s) => (s + d + n) % n);
  const ordered = TESTIMONIALS.map((_, i) => TESTIMONIALS[(start + i) % n]);
  return (
    <section className="ct" id="client-testimonials" aria-labelledby="ctTitle">
      <div className="ctBg" aria-hidden="true">
        <div className="ctLand" />
        <div className="ctHouse"><img src="/solar-house.jpg" alt="" loading="lazy" /></div>
        <div className="ctVeil" />
        <svg className="ctWave" viewBox="0 0 1440 220" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ctG" x1="0" x2="1"><stop offset="0" stopColor="#0c4a2a" /><stop offset=".55" stopColor="#0d5a31" /><stop offset="1" stopColor="#0f6a38" /></linearGradient>
            <linearGradient id="ctL" x1="0" x2="1"><stop offset="0" stopColor="#7be27a" stopOpacity="0" /><stop offset=".5" stopColor="#4ed15a" /><stop offset="1" stopColor="#7be27a" /></linearGradient>
          </defs>
          <path d="M0 70 C150 130 330 205 620 214 C900 222 1140 150 1440 78 L1440 220 L0 220 Z" fill="url(#ctG)" />
          <path d="M0 70 C150 130 330 205 620 214 C900 222 1140 150 1440 78" fill="none" stroke="url(#ctL)" strokeWidth="3.5" />
          <path d="M120 120 C340 180 560 200 800 196 C1000 192 1200 150 1440 110" fill="none" stroke="#fff" strokeOpacity=".12" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="ctIn">
        <p className="ctEyebrow"><span />CLIENT TESTIMONIALS<span /></p>
        <h2 id="ctTitle"><span className="ctDark">Trusted by businesses</span><span className="ctGreen">and communities</span></h2>
        <p className="ctLead">Hear from our clients who have made the switch to cleaner,{" "}<br />smarter and more reliable energy with us.</p>
        <div className="ctStage">
          <button type="button" className="ctArrow ctPrev" aria-label="Previous testimonial" onClick={() => step(-1)}><Chev dir="l" /></button>
          <div className="ctRow" key={start} aria-live="polite">
            {ordered.map((t) => (
              <figure className="ctCard" key={t.id}>
                <div className="ctTop">
                  <span className="ctQ"><Quote /></span>
                  <span className="ctStars" role="img" aria-label="5 out of 5 stars"><Star /><Star /><Star /><Star /><Star /></span>
                </div>
                <blockquote>“{t.text}”</blockquote>
                {(t.name || t.company) && <figcaption style={{ marginTop: 10, fontSize: 14, fontWeight: 700, color: '#0d5a31' }}>{[t.name, t.designation, t.company].filter(Boolean).join(' · ')}</figcaption>}
                <i className="ctBar" aria-hidden="true" />
              </figure>
            ))}
          </div>
          <button type="button" className="ctArrow ctNext" aria-label="Next testimonial" onClick={() => step(1)}><Chev dir="r" /></button>
          <div className="ctDots" role="tablist" aria-label="Testimonials">
            {TESTIMONIALS.map((t, i) => (
              <button type="button" key={t.id} role="tab" aria-selected={i === start} aria-label={'Show testimonial ' + (i + 1)} className={i === start ? 'on' : ''} onClick={() => setStart(i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
