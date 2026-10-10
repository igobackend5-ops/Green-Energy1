import React from 'react';

/* Solar project catalogue (names supplied by the client). Photos are existing site assets;
   projects without a suitable photo use a clean branded illustration instead of a mismatched image. */
const S = { fill: 'none', stroke: '#fff', strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' };
const F = { fill: 'rgba(255,255,255,.28)', stroke: '#fff', strokeWidth: 2.4, strokeLinejoin: 'round' };
const Pn = ({ x = 0, y = 0, s = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`}><path d="M0 14 8 0h26l-8 14z" {...F} /><path d="M4 7h24M13 0l-4 14M23 0l-4 14" {...S} strokeWidth="1.2" /></g>;
const Tower = ({ x, y }) => <g transform={`translate(${x} ${y})`} {...S}><path d="M10 0 2 40h16zM4 14h12M6 26h8M0 8h20" /></g>;
const Batt = ({ x, y }) => <g transform={`translate(${x} ${y})`}><rect width="26" height="40" rx="4" {...F} /><path d="M8 -4h10M9 14l8 0M13 10v8M9 28h8" {...S} strokeWidth="2" /></g>;
export const ART = {
  ongrid: <><Pn x="10" y="10" s="1.1" /><path d="M20 52l-8 22h42M18 74V58" {...S} /><Tower x="84" y="18" /><path d="M54 40h24M72 34l6 6-6 6" {...S} /></>,
  offgrid: <><Pn x="14" y="12" s="1.2" /><path d="M32 30l12 14" {...S} /><Batt x="62" y="30" /><path d="M10 78h100" {...S} /><path d="M92 42h10M97 37v10" {...S} /></>,
  hybrid: <><Pn x="6" y="8" s="1" /><Batt x="44" y="34" /><Tower x="92" y="14" /><path d="M24 30l10 10M72 52h18" {...S} /></>,
  drip: <><Pn x="12" y="6" s=".95" /><path d="M10 44h100" {...S} /><path d="M26 44v6M50 44v6M74 44v6M98 44v6" {...S} /><path d="M26 56q-3 5 0 7q3-2 0-7zM50 56q-3 5 0 7q3-2 0-7zM74 56q-3 5 0 7q3-2 0-7zM98 56q-3 5 0 7q3-2 0-7z" {...S} strokeWidth="2" /><path d="M12 82h96M26 82c0-8 4-12 4-12s4 4 4 12M62 82c0-8 4-12 4-12s4 4 4 12M92 82c0-8 4-12 4-12s4 4 4 12" {...S} /></>,
  cold: <><path d="M10 78V38l50-22 50 22v40z" {...F} /><path d="M60 34v36M45 42l30 20M75 42L45 62" {...S} strokeWidth="2" /><Pn x="70" y="2" s=".7" /></>,
};
export const SOLAR_GROUPS = [
  { id: 'rooftop', sub: 'Efficient and space-saving solar solutions for residential, commercial and industrial rooftops.', title: 'Rooftop Solar Solutions', icon: 'home', items: [
    ['Residential Rooftop Solar', 'Clean and cost-effective solar solutions for homes.', { img: '/solutions/ind-residential.jpg' }],
    ['Commercial Rooftop Solar', 'Reliable solar systems for businesses and offices.', { img: '/solutions/ind-commercial.jpg' }],
    ['Industrial Rooftop Solar', 'High-performance solar solutions for large-scale industries.', { img: '/solutions/ind-industrial.jpg' }] ] },
  { id: 'plant', sub: 'Large-scale solar power generation for maximum efficiency and long-term energy security.', title: 'Solar Power Plant Solutions', icon: 'plant', items: [
    ['Ground-Mounted Solar Power Plant', 'Large-scale solar plants for maximum energy generation.', { img: '/solutions/solar.jpg' }],
    ['On-Grid Solar System', 'Efficient and seamless grid-connected solar solutions.', { img: '/projects/' + encodeURI('on grid solar system.jpg'), fit: true }],
    ['Off-Grid Solar System', 'Reliable power, even in remote locations.', { img: '/projects/' + encodeURI('off grid solar system.jpg'), fit: true }],
    ['Hybrid Solar System', 'Combining solar with storage for continuous power.', { img: '/projects/' + encodeURI('hybrid solar system.jpg'), fit: true }] ] },
  { id: 'agri', sub: 'Sustainable solar solutions to support modern and efficient farming.', title: 'Agricultural Solar Solutions', icon: 'leaf', items: [
    ['Solar Water Pump', 'Efficient pumping solutions for agriculture and irrigation.', { img: '/products/' + encodeURI('solar water pumps.jpg') }],
    ['Solar Irrigation System', 'Sustainable irrigation for better crop yield.', { img: '/products/' + encodeURI('solar irrigation pumps.jpg') }],
    ['Solar Pump + Drip Irrigation', 'Smart water management for higher efficiency.', { img: '/projects/' + encodeURI('solar pump + drip irrigation system.jpg'), fit: true }],
    ['Solar Farm Power System', 'Clean energy for large-scale agricultural operations.', { img: '/products/' + encodeURI('solar farm monitoring.jpg') }] ] },
  { id: 'farm', sub: 'Advanced solar solutions for farm security and storage needs.', title: 'Solar-Powered Agricultural & Farm Solutions', icon: 'shield', items: [
    ['Solar Fencing', 'Secure your land with solar-powered fencing.', { img: '/products/' + encodeURI('solar agriculture fencing.jpg') }],
    ['Solar Cold Storage', 'Preserve freshness with solar-powered cold storage.', { img: '/projects/' + encodeURI('solar powered cold storage system.jpg'), fit: true }] ] },
];
