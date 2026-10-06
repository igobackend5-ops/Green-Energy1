import React from 'react';
import './brandsMarquee.css';

/* Brand list, names, order and logos are taken from igogroups.in/brands (igo-group-website repo, assets/images/brands). */
const BRANDS = [
  ["IGO Agritech Farms", '/brands/igo-agritech-farms.webp'],
  ["Farmers Factory", '/brands/farmers-factory.webp'],
  ["Valluvam", '/brands/valluvam.webp'],
  ["IGO Academy", '/brands/igo-academy.webp'],
  ["IGO Farm Loans", '/brands/igo-farm-loans.webp'],
  ["Farmgate Mandi", '/brands/farmgate-mandi.webp'],
  ["Palm Cafe", '/brands/palm-cafe.webp'],
  ["IGO Agri Mart", '/brands/igo-agri-mart.webp'],
  ["IGO Farmlands Estates", '/brands/igo-farmlands-estates.webp'],
  ["IGO Nursery", '/brands/igo-nursery.webp'],
  ["IGO Farm Factories", '/brands/igo-farm-factories.webp'],
  ["IGO Tech Farming Scientists", '/brands/igo-tech-farming-scientists.webp'],
  ["IGO Fintech", '/brands/igo-fintech.webp'],
  ["IGO Franchise (FICO)", '/brands/igo-franchise-fico.webp'],
  ["Tech Farming Expert", '/brands/tech-farming-expert.webp'],
  ["Tech Farming Wealth", '/brands/tech-farming-wealth.webp'],
  ["Protein Cuts", '/brands/protein-cuts.webp'],
  ["IGO Farm Automation", '/brands/igo-farm-automation.webp'],
  ["IGO Exports & Imports", '/brands/igo-exports-and-imports.webp'],
  ["India Green App", '/brands/india-green-app.webp'],
  ["IGO Crop Care", '/brands/igo-crop-care.webp'],
  ["IGO Mart", '/brands/igo-mart.webp'],
  ["IGO Organic Pharmacy", '/brands/igo-organic-pharmacy.webp'],
  ["IGO Green Energy", '/brands/igo-green-energy.webp'],
  ["IGO Natural Cosmetics", '/brands/igo-natural-cosmetics.webp'],
  ["India Green Organics", '/brands/india-green-organics.webp']
];

const Row = ({ hidden }) => (
  <ul className="bmSet" aria-hidden={hidden || undefined}>
    {BRANDS.map(([name, src]) => (
      <li className="bmCard" key={name}>
        <span className="bmLogo"><img src={src} alt={hidden ? '' : name} width="120" height="120" loading="lazy" draggable="false" /></span>
        <b>{name}</b>
      </li>
    ))}
  </ul>
);

export default function BrandsMarquee() {
  return (
    <section className="bm" id="our-brands" aria-labelledby="bmTitle">
      <div className="bmHead">
        <p className="bmEye"><span />OUR BRANDS<span /></p>
        <h2 id="bmTitle">The IGO Group <em>Family of Brands</em></h2>
      </div>
      <div className="bmView" role="group" aria-label={`${BRANDS.length} IGO brands`}>
        <div className="bmTrack">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
