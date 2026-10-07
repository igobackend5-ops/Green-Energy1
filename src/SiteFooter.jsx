import React, { useState } from 'react';
import { useCms } from './admin/store.js';
import './siteFooter.css';

import { T } from './content/T.js';
import { submitEnquiry } from './admin/api.js';
import { HONEY } from './useEnquiry.js';
/* Edit link targets here. A `to` starting with "/" navigates inside the site;
   entries without a `to` are placeholders (no page exists yet). */
const QUICK = [
  { t: T("footer.001", "Home"), to: '/' }, { t: T("footer.002", "About Us"), to: '/about' }, { t: T("footer.003", "Our Solutions"), to: '/services' },
  { t: T("footer.004", "Projects"), to: '/projects' }, { t: T("footer.005", "Blog"), to: '/blogs' }
];
const SOLUTIONS = [
  { t: T("footer.006", "Solar Energy"), to: '/services/solar' }, { t: T("footer.007", "Wind Energy"), to: '/services/wind' },
  { t: T("footer.008", "Bio Gas"), to: '/services/biogas' }, { t: T("footer.009", "Water Treatment"), to: '/services/water' }
];
const SUPPORT = [
  { t: T("footer.010", "FAQ"), to: '/faq' }, { t: T("footer.011", "Careers"), to: '/careers' }, { t: T("footer.012", "Downloads") }, { t: T("footer.013", "Privacy Policy"), to: '/privacy-policy' }, { t: T("footer.014", "Terms & Conditions"), to: '/terms' }
];
const LEGAL = [{ t: T("footer.015", "Terms & Conditions"), to: '/terms' }, { t: T("footer.016", "Privacy Policy"), to: '/privacy-policy' }, { t: T("footer.017", "Sitemap"), to: '/sitemap' }];
const SOCIAL = [
  { id: 'fb', label: T("footer.018", "Facebook"), href: '' }, { id: 'in', label: T("footer.019", "LinkedIn"), href: '' },
  { id: 'ig', label: T("footer.020", "Instagram"), href: '' }, { id: 'yt', label: T("footer.021", "YouTube"), href: '' }
];

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
const SocialIcon = {
  fb: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.500 21v-8h2.700l.4-3.200h-3.100V7.800c0-.9.300-1.500 1.600-1.500h1.600V3.400c-.3 0-1.300-.1-2.400-.1-2.400 0-4 1.400-4 4.100v2.400H7.600V13h2.700v8z" /></svg>,
  in: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5.200 9.500h3V19h-3zM6.700 5a1.800 1.800 0 110 3.600 1.800 1.800 0 010-3.600zM10.500 9.500h2.900v1.300c.4-.8 1.400-1.500 2.900-1.500 3 0 3.600 2 3.600 4.500V19h-3v-4.600c0-1.100 0-2.500-1.500-2.500s-1.800 1.200-1.800 2.400V19h-3z" /></svg>,
  ig: <svg viewBox="0 0 24 24" aria-hidden="true" {...S} strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="4.500" /><circle cx="12" cy="12" r="3.600" /><circle cx="16.800" cy="7.200" r=".6" fill="currentColor" /></svg>,
  yt: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.600 7.600a2.500 2.500 0 00-1.800-1.800C18.200 5.400 12 5.400 12 5.400s-6.200 0-7.800.4A2.500 2.500 0 002.400 7.600C2 9.200 2 12 2 12s0 2.800.4 4.400a2.500 2.500 0 001.800 1.800c1.600.4 7.800.4 7.800.4s6.200 0 7.800-.4a2.500 2.500 0 001.800-1.800c.4-1.600.4-4.400.4-4.400s0-2.800-.4-4.400zM10 15V9l5.200 3z" /></svg>
};
const Phone = () => (<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.600 3.500l2.600-.6c.5-.1 1 .2 1.200.7l1 2.600c.2.500 0 1-.4 1.300L9.500 9c1 2 2.500 3.600 4.500 4.600l1.500-1.500c.3-.4.900-.5 1.300-.3l2.600 1c.5.2.8.700.7 1.200l-.6 2.600c-.1.600-.6 1-1.200 1C10.700 17.400 5.600 12.300 5.600 4.700c0-.6.400-1.100 1-1.200z" /></svg>);
const Mail = () => (<svg viewBox="0 0 24 24" aria-hidden="true" {...S}><rect x="3" y="5.500" width="18" height="13" rx="2.500" /><path d="M4 8l8 5.500L20 8" /></svg>);
const Pin = () => (<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.500a6.800 6.800 0 00-6.800 6.800c0 5 6.800 12.200 6.800 12.200s6.800-7.200 6.800-12.200A6.800 6.800 0 0012 2.500zm0 9.300a2.500 2.500 0 110-5 2.500 2.500 0 010 5z" /></svg>);
const Arrow = () => (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg>);
const Leaf = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <defs><linearGradient id="sfLeaf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#c6f77a" /><stop offset="1" stopColor="#3fae4a" /></linearGradient></defs>
    <path d="M56 6C32 6 10 18 8 42c0 6 2 11 5 14C34 54 56 38 56 6z" fill="url(#sfLeaf)" />
    <path d="M10 56C22 40 36 26 52 12" fill="none" stroke="#0a3b24" strokeWidth="2.200" strokeLinecap="round" />
  </svg>
);

export default function SiteFooter({ onNav }) {
  const ct = useCms('contact') || {}, st = useCms('settings') || {};
  const tel = (ct.phone || '').replace(/[^+\d]/g, '');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const link = (l) => (
    <li key={l.t}>
      <a href={l.to || '#'} onClick={(e) => { e.preventDefault(); if (l.to && onNav) onNav(l.to); }}>{l.t}</a>
    </li>
  );
  const submit = async (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) { setMsg('Please enter a valid email address.'); return; }
    try { await submitEnquiry({ type: 'newsletter', email: email.trim(), message: 'Footer newsletter sign-up', website: e.currentTarget.website.value }); setMsg('Thank you for subscribing!'); setEmail(''); }
    catch (x) { setMsg(x.message || 'Could not subscribe. Please try again.'); }
  };
  return (
    <div className="sf" role="contentinfo">
      <svg className="sfWave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="sfW1" x1="0" x2="1"><stop offset="0" stopColor="#2f8a3c" stopOpacity=".15" /><stop offset=".25" stopColor="#58c04a" stopOpacity=".85" /><stop offset=".6" stopColor="#0f5a34" stopOpacity=".5" /><stop offset="1" stopColor="#3aa24a" stopOpacity=".7" /></linearGradient>
        </defs>
        <path d="M0 0H1440V30C1280 5 1120 70 900 75 640 80 560 8 330 6 170 5 70 40 0 70Z" fill="url(#sfW1)" />
        <path d="M0 70C70 40 170 5 330 6 560 8 640 80 900 75 1120 70 1280 5 1440 30" fill="none" stroke="#9cf06a" strokeOpacity=".7" strokeWidth="2" />
        <path d="M0 95C200 60 420 20 700 50 980 80 1200 40 1440 55" fill="none" stroke="#9cf06a" strokeOpacity=".18" strokeWidth="1.500" />
      </svg>
      <div className="sfWrap">
        <div className="sfGrid">
          <div className="sfCol sfBrand">
            <a className="sfLogo" href="/" onClick={(e) => { e.preventDefault(); onNav && onNav('/'); }} aria-label="Green Energy home">
              <img className="sfLogoImg" src="/logo.png" alt={T("footer.022", "Green Energy")} width="858" height="719" />
            </a>
            <p className="sfAbout">{st.footerText}</p>
            <ul className="sfSocial">
              {SOCIAL.map((s) => ({ ...s, href: ct[{ fb: 'facebook', in: 'linkedin', ig: 'instagram', yt: 'youtube' }[s.id]] || s.href })).map((s) => (
                <li key={s.id}><a href={s.href || '#'} aria-label={s.label} target={s.href ? '_blank' : undefined} rel="noopener noreferrer" onClick={(e) => { if (!s.href) e.preventDefault(); }}>{SocialIcon[s.id]}</a></li>
              ))}
            </ul>
          </div>
          <nav className="sfCol" aria-label="Quick links"><h3>{T("footer.023", "Quick Links")}</h3><ul>{QUICK.map(link)}</ul></nav>
          <nav className="sfCol" aria-label="Our solutions"><h3>{T("footer.024", "Our Solutions")}</h3><ul>{SOLUTIONS.map(link)}</ul></nav>
          <nav className="sfCol" aria-label="Support"><h3>{T("footer.025", "Support")}</h3><ul>{SUPPORT.map(link)}</ul></nav>
          <div className="sfCol sfContact">
            <h3>{T("footer.026", "Contact Us")}</h3>
            <ul>
              <li><span className="sfCi"><Phone /></span>{ct.phone ? <a href={'tel:' + tel}>{ct.phone}</a> : null}</li>
              <li><span className="sfCi"><Mail /></span>{ct.email ? <a href={'mailto:' + ct.email}>{ct.email}</a> : null}</li>
              <li><span className="sfCi"><Pin /></span><span>{ct.address}</span></li>
            </ul>
          </div>
          <div className="sfCol sfNews">
            <h3>{T("footer.027", "Stay Updated")}</h3>
            <p>{T("footer.028", "Get the latest news, insights, and")}{' '}<br />{T("footer.029", "renewable energy updates.")}</p>
            <form onSubmit={submit} noValidate>
              <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setMsg(''); }} placeholder={T("footer.030", "Enter your email address")} aria-label="Email address" />
              <input {...HONEY} />
              <button type="submit" aria-label="Subscribe"><Arrow /></button>
            </form>
            <small className="sfMsg" role="status">{msg}</small>
          </div>
        </div>
      </div>
      <div className="sfScene" aria-hidden="true"><img src={T("footer.031", "/footer-landscape.jpg")} alt="" loading="lazy" /></div>
      <div className="sfBar">
        <div className="sfWrap sfBarIn">
          <span>{st.copyright}</span>
          <ul>{LEGAL.map((l, i) => (<li key={l.t}><a href={l.to || '#'} onClick={(e) => { e.preventDefault(); if (l.to && onNav) onNav(l.to); }}>{l.t}</a>{i < LEGAL.length - 1 && <em aria-hidden="true">|</em>}</li>))}</ul>
        </div>
      </div>
    </div>
  );
}
