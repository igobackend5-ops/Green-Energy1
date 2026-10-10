import React from 'react';

import { T } from './content/T.js';
/* Home hero: the static banner artwork (Earth with solar, wind, biogas and water
   facilities, floating info cards and rings). The previous rotating 3D Earth
   overlay and its layers have been removed. */
export default function HeroBanner() {
  return (
    <section id="home" className="hero">
      <div className="heroStage">
        <img
          className="heroLayer"
          src={T("home.hero.001", "/hero/hero-static.jpg")}
          alt={T("home.hero.002", "IGO Green Energy - solar, wind, biogas and water treatment around a renewable Earth")}
          fetchpriority="high"
        />
      </div>
    </section>
  );
}
