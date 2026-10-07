import React from 'react';
import { T } from '../content/T.js';
import './windHero.css';

const Ic = {
  wind: <><circle cx="12" cy="10.2" r="1.4" /><path d="M12 8.8V2.5M10.8 11l-5.5 3.2M13.2 11l5.5 3.2M12 11.6V22" /></>,
  leaf: <><path d="M5 20c0-8 5-14 15-15 0 9-5 15-13 15" /><path d="M5 20c2-5 5-8 9-10" /></>,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
};
const FEATS = [['wind', T("windhero.005", "Clean Energy")], ['leaf', T("windhero.006", "Low Emissions")], ['bolt', T("windhero.007", "Sustainable Future")]];

export function WindHero() {
  const more = (e) => { const s = e.currentTarget.closest('.windHero'); const n = s && s.nextElementSibling; n && n.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  return (
    <section className="windHero" aria-label={T("windhero.001", "WIND ENERGY")}>
      <div className="whImg" role="img" aria-label={T("windhero.008", "Wind turbines on green hills at sunset")} />
      <span className="whLeaf l1" aria-hidden="true" /><span className="whLeaf l2" aria-hidden="true" />
      <svg className="whWave" viewBox="0 0 600 220" preserveAspectRatio="none" aria-hidden="true"><path d="M0 120C120 120 180 200 600 210" /><path d="M0 70C140 80 200 180 600 200" /></svg>
      <div className="whIn">
        <p className="whEye"><span>{T("windhero.001", "WIND ENERGY")}</span><i /></p>
        <h1>{T("windhero.002", "Harnessing the Power of")} <em>{T("windhero.003", "Wind for a Greener Tomorrow")}</em></h1>
        <p className="whText">{T("windhero.004", "Clean, renewable and abundant — wind energy helps us build a sustainable future with lower carbon emissions and a healthier planet.")}</p>
        <div className="whRow">
          <button className="whBtn" onClick={more}>{T("windhero.009", "Explore Wind Energy")} <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
          <ul className="whFeats">{FEATS.map(([i, l]) => <li key={i}><span><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{Ic[i]}</svg></span>{l}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
