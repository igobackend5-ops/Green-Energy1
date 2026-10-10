import React from 'react';
import { T } from './content/T.js';
import EarthVisual from './EarthVisual.jsx';

export default function HeroBanner() {
  return (
    <section id="home" className="hero" style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      minHeight: '100vh', 
      padding: '120px 5vw 0', 
      background: '#fdfdfd', 
      overflow: 'hidden',
      position: 'relative'
    }}>
      
      <div className="heroCopy" style={{ width: '45%', zIndex: 3, position: 'relative' }}>
        <p className="eyebrow" style={{ color: '#217340', fontWeight: 'bold', letterSpacing: '2px', fontSize: '13px', marginBottom: '20px' }}>
          {T("home.hero.003", "CLEAN ENERGY. CLEANER TOMORROW.")}
        </p>
        <h1 style={{ fontSize: 'clamp(46px, 5vw, 76px)', margin: '0 0 24px', lineHeight: 1.05, letterSpacing: '-2px', color: '#111', fontWeight: 800, fontFamily: 'Manrope' }}>
          {T("home.hero.004", "Energy That")} <br/>
          <em style={{ color: '#217340', fontStyle: 'normal' }}>{T("home.hero.005", "Respects the Earth.")}</em><br/>
          {T("home.hero.006", "Solutions That")} <br/>
          <em style={{ color: '#217340', fontStyle: 'normal' }}>{T("home.hero.007", "Reward You.")}</em>
        </h1>
        <p className="lead" style={{ fontSize: '18px', color: '#444', marginBottom: '35px', maxWidth: '520px', lineHeight: 1.6 }}>
          {T("home.hero.008", "Integrated renewable energy and water treatment solutions for a cleaner, greener and more prosperous tomorrow.")}
        </p>
        <a className="cta" href="#solutions" onClick={(e) => { e.preventDefault(); document.getElementById('solutions')?.scrollIntoView({behavior: 'smooth'}) }} style={{ display: 'inline-flex', alignItems: 'center', background: '#448b3b', color: '#fff', padding: '16px 28px', borderRadius: '99px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 10px 25px rgba(68,139,59,0.3)' }}>
          {T("home.hero.009", "Explore Our Solutions")} <span style={{marginLeft: '10px'}}>→</span>
        </a>
        
        <div className="micro" style={{ display: 'flex', gap: '30px', marginTop: '60px', fontSize: '13px', color: '#555', fontWeight: 600, alignItems: 'center' }}>
          <span style={{display: 'flex', alignItems: 'center', gap: '10px'}}><i style={{fontSize:'24px', color:'#217340'}}>🌿</i> Clean Energy<br/>Solutions</span>
          <span style={{display: 'flex', alignItems: 'center', gap: '10px'}}><i style={{fontSize:'24px', color:'#217340'}}>🤝</i> Trusted<br/>Partnership</span>
          <span style={{display: 'flex', alignItems: 'center', gap: '10px'}}><i style={{fontSize:'24px', color:'#217340'}}>⚙️</i> End-to-End<br/>Support</span>
          <span style={{display: 'flex', alignItems: 'center', gap: '10px'}}><i style={{fontSize:'24px', color:'#217340'}}>📊</i> Real, Measurable<br/>Impact</span>
        </div>
      </div>

      <EarthVisual />
    </section>
  );
}
