import React from 'react';
import { T } from './content/T.js';

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
          <span style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#217340" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
            Clean Energy<br/>Solutions
          </span>
          <span style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#217340" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Trusted<br/>Partnership
          </span>
          <span style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#217340" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            End-to-End<br/>Support
          </span>
          <span style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#217340" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
            Real, Measurable<br/>Impact
          </span>
        </div>
      </div>

      <div className="heroImageContainer" style={{
        width: '55%',
        height: '100vh',
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}>
        <img 
          src="/hero/hero-static.jpg" 
          alt="Renewable Energy Earth" 
          className="heroImage" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'right center'
          }} 
        />
        
        {/* Floating overlays are baked into the image */}
      </div>
    </section>
  );
}
