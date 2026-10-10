import React from 'react';
import './goGreenCta.css';

import { T } from './content/T.js';
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
const ICONS = {
  shield: (<svg viewBox="0 0 48 48" {...S}><path d="M24 5l15 5v12c0 10-6.5 17.500-15 21C15.500 39.500 9 32 9 22V10z" /><path d="M16.500 24l5 5 10-11" /></svg>),
  gear: (<svg viewBox="0 0 48 48" {...S}><circle cx="24" cy="24" r="6.500" /><path d="M21 5h6l1 5 4 1.800 4.500-2.800 4.200 4.200-2.800 4.500L39 22l5 1v6l-5 1-1.800 4 2.800 4.500-4.200 4.200-4.500-2.800L28 38l-1 5h-6l-1-5-4-1.800-4.500 2.800-4.200-4.200 2.800-4.500L9 30l-5-1v-6l5-1 1.800-4-2.800-4.500 4.200-4.200 4.500 2.800L20 10z" transform="scale(.9) translate(2.700 2.700)" /></svg>),
  hand: (<svg viewBox="0 0 48 48" {...S}><path d="M4 28h7v14H4z" /><path d="M11 30l8-2h9c2 0 3 2 1 3l-6 2h-4M11 36l9 3 14-5c3-1 4-4 1-4l-6 1" /><path d="M32 22c0-7 4-11 10-11 0 7-3 11-10 11zM32 22V14" /><path d="M24 17c0-5-3-8-8-8 0 5 3 8 8 8z" /></svg>),
  chart: (<svg viewBox="0 0 48 48" {...S}><path d="M6 42h36" /><rect x="8" y="28" width="7" height="14" /><rect x="20" y="20" width="7" height="22" /><rect x="32" y="26" width="7" height="16" /><path d="M8 20l9-8 7 5 14-12M31 5h7v7" /></svg>)
};
const BENEFITS = [
  { id: 'guide', icon: 'shield', title: T("home.cta.001", "Expert Guidance") },
  { id: 'custom', icon: 'gear', title: T("home.cta.002", "Customized Solutions") },
  { id: 'support', icon: 'hand', title: T("home.cta.003", "End-to-End Support") },
  { id: 'save', icon: 'chart', title: T("home.cta.004", "Long-Term Savings") }
];
const Arrow = () => (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg>);

export default function GoGreenCta({ onQuote, onContact }) {
  return (
    <section className="gg" id="go-green" aria-labelledby="ggTitle">
      <div className="ggBg" aria-hidden="true"><img src={T("home.cta.005", "/solar-house.jpg")} alt="" loading="lazy" /></div>
      <div className="ggShade" aria-hidden="true" />
      <div className="ggIn">
        <div className="ggCopy">
          <p className="ggEye"><span />{T("home.cta.006", "READY TO GO GREEN?")}</p>
          <h2 id="ggTitle"><span>{T("home.cta.007", "Let’s Build a")}</span><span>{T("home.cta.008", "Sustainable Tomorrow")}</span><span className="ggLime">{T("home.cta.009", "Together")}</span></h2>
          <p className="ggLead">{T("home.cta.010", "Get expert consultation for your renewable energy needs")}{' '}<br />{T("home.cta.011", "and take the first step towards a cleaner, greener future.")}</p>
          <div className="ggBtns">
            <button type="button" className="ggBtn ggPri" onClick={onQuote}>{T("home.cta.012", "Get a Free Consultation")} <Arrow /></button>
            <button type="button" className="ggBtn ggSec" onClick={onContact}>{T("home.cta.013", "Contact Us")} <Arrow /></button>
          </div>
        </div>
        <ul className="ggBen">
          {BENEFITS.map((b) => (
            <li key={b.id}><span className="ggIc">{ICONS[b.icon]}</span><b>{b.title}</b></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
