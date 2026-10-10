import React from 'react';
import { useReveal } from './common.jsx';
import { T } from '../content/T.js';
import './products.css';

/* Optional real product photos: add a file to /public/products and list it here, e.g. { 'solar-water-pumps': '/products/solar-water-pumps.jpg' }.
   Until then each product shows a clean branded illustration (no prices, specifications or claims are shown). */
/* Photos map to the exact filenames supplied in the services folder (unchanged). */
const PHOTOS = {
  'solar-sprayers': '/products/' + encodeURI('solar sprayers.png'),
  'solar-water-pumps': '/products/' + encodeURI('solar water pumps.jpg'),
  'solar-irrigation-pumps': '/products/' + encodeURI('solar irrigation pumps.jpg'),
  'solar-pump-controllers': '/products/' + encodeURI('solar pump controllers.jpg'),
  'solar-agriculture-fencing': '/products/' + encodeURI('solar agriculture fencing.jpg'),
  'solar-farm-monitoring-systems': '/products/' + encodeURI('solar farm monitoring.jpg'),
  'solar-cctv-cameras': '/products/' + encodeURI('solar cctv cameras.jpg'),
  'solar-cctv-poles': '/products/' + encodeURI('solar cctv poles.jpg'),
  'solar-camera-light-systems': '/products/' + encodeURI('solar camera+lights system.jpg'),
  'solar-security-lights': '/products/' + encodeURI('solar security lights.jpg'),
  'solar-electric-fence-systems': '/products/' + encodeURI('solar electric fence system.jpg'),
  'solar-street-lights': '/products/' + encodeURI('solar street light.jpg'),
  'solar-flood-lights': '/products/' + encodeURI('solar flood light.jpg'),
  'solar-garden-lights': '/products/' + encodeURI('solar garden lights.jpg'),
  'solar-home-lighting-systems': '/products/' + encodeURI('solar home lighting system.jpg'),
  'solar-wall-lights': '/products/' + encodeURI('solar wall lights.jpg'),
  'solar-high-mast-lights': '/products/' + encodeURI('solar high mast lights.jpg'),
  'solar-warning-lights': '/products/' + encodeURI('solar warning lights.jpg')
};

const S = { fill: 'none', stroke: '#fff', strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' };
const F = { fill: 'rgba(255,255,255,.28)', stroke: '#fff', strokeWidth: 2.4, strokeLinejoin: 'round' };
const Pn = ({ x = 0, y = 0, s = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`}><path d="M0 14 8 0h26l-8 14z" {...F} /><path d="M4 7h24M13 0l-4 14M23 0l-4 14" {...S} strokeWidth="1.2" /></g>;
const Drops = ({ x, y }) => <g {...S} strokeWidth="2"><path d={`M${x} ${y}q-3 5 0 7q3-2 0-7z`} /><path d={`M${x + 9} ${y + 6}q-3 5 0 7q3-2 0-7z`} /></g>;
const ART = {
  pump: <><Pn x="12" y="8" /><rect x="18" y="44" width="34" height="22" rx="5" {...F} /><circle cx="35" cy="55" r="6" {...S} /><path d="M52 52h22v-18M74 34h12M30 66v6M42 66v6M86 34v14" {...S} /><Drops x="84" y="52" /><path d="M8 78h104" {...S} /></>,
  irrig: <><path d="M8 66h104M8 78h104" {...S} /><path d="M20 66c0-8 4-12 4-12s4 4 4 12M50 66c0-8 4-12 4-12s4 4 4 12M80 66c0-8 4-12 4-12s4 4 4 12" {...S} /><path d="M10 38h100" {...S} /><path d="M28 38v-8M60 38v-8M92 38v-8" {...S} /><Drops x="24" y="42" /><Drops x="56" y="42" /><Drops x="88" y="42" /></>,
  ctrl: <><rect x="26" y="14" width="68" height="56" rx="8" {...F} /><rect x="34" y="22" width="34" height="18" rx="3" {...S} /><path d="M38 31h10l3-5 5 9 3-4h5" {...S} strokeWidth="1.8" /><circle cx="80" cy="30" r="7" {...S} /><path d="M80 26v4" {...S} /><path d="M36 52h14M36 60h22M72 54h14M72 60h14" {...S} /><path d="M60 70v10M44 70v10M76 70v10" {...S} /></>,
  spray: <><path d="M26 28h30l4 44a4 4 0 0 1-4 4H30a4 4 0 0 1-4-4z" {...F} /><path d="M34 20h14v8H34zM60 44h16l14-14" {...S} /><path d="M90 30l6-8M96 32h10M94 38l8 4M104 24l4-4M106 30l6-2M104 40l6 4" {...S} strokeWidth="2" /><path d="M8 80h104" {...S} /></>,
  fence: <><path d="M20 76V30M60 76V30M100 76V30" {...S} /><path d="M20 38h80M20 50h80M20 62h80" {...S} strokeWidth="1.8" /><Pn x="38" y="4" s=".9" /><path d="M8 78h104" {...S} /></>,
  monitor: <><path d="M60 76V34M44 76h32" {...S} /><circle cx="60" cy="30" r="8" {...F} /><path d="M46 20a20 20 0 0 1 28 0M38 12a32 32 0 0 1 44 0" {...S} /><Pn x="74" y="44" s=".8" /><path d="M10 78h100M16 70c0-6 3-9 3-9s3 3 3 9M30 70c0-6 3-9 3-9s3 3 3 9" {...S} strokeWidth="2" /></>,
  cctv: <><rect x="20" y="26" width="58" height="26" rx="7" {...F} /><circle cx="78" cy="39" r="9" {...F} /><circle cx="78" cy="39" r="3.5" fill="#fff" /><path d="M20 38H8M34 52v10l-12 8M30 26v-8" {...S} /><Pn x="64" y="62" s=".7" /></>,
  cpole: <><path d="M44 80V22" {...S} strokeWidth="3.2" /><path d="M30 80h28" {...S} /><rect x="36" y="12" width="34" height="14" rx="4" {...F} /><circle cx="72" cy="19" r="5" {...F} /><Pn x="64" y="40" s=".8" /><path d="M44 50h18" {...S} /></>,
  camlight: <><path d="M50 80V20" {...S} strokeWidth="3" /><path d="M36 80h28" {...S} /><rect x="26" y="10" width="32" height="14" rx="4" {...F} /><circle cx="60" cy="17" r="4" fill="#fff" /><path d="M50 40h20" {...S} /><rect x="64" y="34" width="22" height="12" rx="4" {...F} /><path d="M72 50l-6 12M78 50v14M85 50l6 12" {...S} strokeWidth="2" /></>,
  seclight: <><rect x="8" y="8" width="14" height="70" rx="2" {...S} /><path d="M22 28h22l10 8H34z" {...F} /><path d="M40 42l-6 16M48 44v18M56 42l8 16M64 38l14 12" {...S} strokeWidth="2" /><Pn x="64" y="8" s=".7" /></>,
  efence: <><path d="M18 78V32M60 78V32M102 78V32" {...S} /><path d="M18 40l21 8-21 8 21 8M60 40l21 8-21 8 21 8" {...S} strokeWidth="1.8" /><path d="M66 12l-8 14h10l-6 14" {...S} /><path d="M8 80h104" {...S} /></>,
  street: <><path d="M36 80V24c0-10 8-14 22-14h22" {...S} strokeWidth="3" /><path d="M24 80h26" {...S} /><path d="M72 10h18l-6 10H78z" {...F} /><path d="M80 26l-4 12M86 26v14M92 24l6 12" {...S} strokeWidth="2" /><Pn x="10" y="36" s=".7" /></>,
  flood: <><rect x="22" y="22" width="44" height="30" rx="5" {...F} transform="rotate(-8 44 37)" /><path d="M32 30l26-5M33 38l26-5M34 46l26-5" {...S} strokeWidth="1.6" transform="rotate(-8 44 37)" /><path d="M44 54v14M30 70h28" {...S} /><path d="M72 24l24-8M74 36l28-2M72 48l24 8" {...S} strokeWidth="2" /></>,
  garden: <><path d="M50 80V48" {...S} strokeWidth="3" /><path d="M36 48c0-10 6-18 14-18s14 8 14 18z" {...F} /><path d="M28 24l-6-6M50 20V10M72 24l6-6" {...S} /><path d="M16 80h80M22 80c0-9 5-14 5-14s5 5 5 14M70 80c0-9 5-14 5-14s5 5 5 14" {...S} strokeWidth="2" /></>,
  home: <><path d="M12 44 50 14l38 30M20 40v36h60V40" {...S} /><circle cx="50" cy="52" r="9" {...F} /><path d="M46 62h8M47 66h6" {...S} /><path d="M50 36v4M38 44l3 3M62 44l-3 3" {...S} strokeWidth="2" /><Pn x="78" y="16" s=".8" /></>,
  wall: <><rect x="10" y="10" width="14" height="66" rx="2" {...S} /><rect x="24" y="30" width="22" height="18" rx="4" {...F} /><path d="M46 32l32-10M46 39h38M46 46l32 10" {...S} strokeWidth="2" /><Pn x="64" y="62" s=".6" /></>,
  mast: <><path d="M60 80V14" {...S} strokeWidth="3" /><path d="M48 80h24M60 80l-10-30M60 80l10-30" {...S} strokeWidth="1.6" /><rect x="34" y="8" width="52" height="10" rx="3" {...F} /><path d="M40 8v10M52 8v10M64 8v10M76 8v10" {...S} strokeWidth="1.6" /><path d="M36 22l-6 12M52 22l-2 14M68 22l2 14M84 22l6 12" {...S} strokeWidth="2" /></>,
  warn: <><path d="M60 80V52M46 80h28" {...S} /><path d="M44 52h32v-8a16 16 0 0 0-32 0z" {...F} /><path d="M60 22v-8M36 28l-6-6M84 28l6-6M26 40h-8M94 40h8" {...S} /><Pn x="74" y="56" s=".6" /></>
};
const CATS = [
  { id: 'agri', cls: 'a', title: 'Solar Agriculture Products', blurb: 'Solar-powered equipment for water, irrigation and farm operations.', items: [
    ['Solar Water Pumps', 'pump', 'Solar-powered pumping for drawing and moving water without grid electricity.'],
    ['Solar Irrigation Pumps', 'irrig', 'Pumping systems that support field irrigation using clean solar energy.'],
    ['Solar Pump Controllers', 'ctrl', 'Controllers that manage and protect solar pump operation.'],
    ['Solar Sprayers', 'spray', 'Solar-assisted sprayers for crop care and field application.'],
    ['Solar Agriculture Fencing', 'fence', 'Solar-powered fencing to help protect crops and farm boundaries.'],
    ['Solar Farm Monitoring Systems', 'monitor', 'Solar-powered monitoring to keep an eye on farm conditions remotely.'] ] },
  { id: 'sec', cls: 'b', title: 'Solar Security Products', blurb: 'Solar-powered surveillance, lighting and perimeter protection.', items: [
    ['Solar CCTV Cameras', 'cctv', 'Surveillance cameras powered by solar energy for sites without easy grid access.'],
    ['Solar CCTV Poles', 'cpole', 'Pole-mounted solar solutions for positioning CCTV cameras where needed.'],
    ['Solar Camera + Light Systems', 'camlight', 'Combined camera and lighting units powered by the sun.'],
    ['Solar Security Lights', 'seclight', 'Solar lights that help keep premises, entrances and pathways visible.'],
    ['Solar Electric Fence Systems', 'efence', 'Solar-powered electric fence systems for perimeter protection.'] ] },
  { id: 'light', cls: 'c', title: 'Solar Lighting Products', blurb: 'Reliable solar lighting for roads, homes, gardens and industrial sites.', items: [
    ['Solar Street Lights', 'street', 'Solar-powered street lighting for roads, lanes and public areas.'],
    ['Solar Flood Lights', 'flood', 'Wide-area solar lighting for open spaces, yards and buildings.'],
    ['Solar Garden Lights', 'garden', 'Decorative and functional solar lights for gardens and pathways.'],
    ['Solar Home Lighting Systems', 'home', 'Solar lighting for homes, supporting everyday use with clean energy.'],
    ['Solar Wall Lights', 'wall', 'Wall-mounted solar lights for entrances, compounds and boundaries.'],
    ['Solar High-Mast Lights', 'mast', 'Tall-mast solar lighting for large areas such as yards and campuses.'],
    ['Solar Warning Lights', 'warn', 'Solar warning and indicator lights for roads, sites and hazards.'] ] }
];
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export function ProductsPage({ onQuote }) {
  const ref = useReveal();
  let n = 0;
  return (
    <div ref={ref} className="pg prxPage">
      <section className="prxBanner">
        <img src="/products-hero.jpg" width="1672" height="941" alt="Clean energy for a brighter tomorrow: IGO Green Energy solar solutions for homes, businesses and industries" decoding="async" fetchpriority="high" />
        <h1 className="prxSr">{T('products.002', 'Solar')} {T('products.003', 'Products')}</h1>
      </section>
      <section className="prxChipBar">
        <div className="prxW"><div className="prxChips">{CATS.map((c) => <button key={c.id} type="button" onClick={() => jump('prx-' + c.id)}>{c.title.replace('Solar ', '').replace(' Products', '')}</button>)}</div></div>
      </section>
      {CATS.map((c) => (
        <section key={c.id} id={'prx-' + c.id} className={'prxCat ' + c.cls}>
          <div className="prxW">
            <header className="prxHead"><h2>{c.title}</h2><p>{c.blurb}</p></header>
            <div className="prxGrid">
              {c.items.map(([name, art, desc]) => {
                const photo = PHOTOS[slug(name)];
                return (
                  <article className="prxCard rv" style={{ '--d': (n++ % 3) * 80 + 'ms' }} key={name}>
                    <div className="prxImg">
                      {photo ? <img src={photo} alt={name} loading="lazy" /> : <svg viewBox="0 0 120 90" role="img" aria-label={name}>{ART[art]}</svg>}
                    </div>
                    <div className="prxBody">
                      <h3>{name}</h3>
                      <p>{desc}</p>
                      <button type="button" className="prxBtn" onClick={onQuote}>Enquire Now <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
