import React from 'react';
import './brandsMarquee.css';

import { T } from './content/T.js';
/* Brand list, names, order and logos are taken from igogroups.in/brands (igo-group-website repo, assets/images/brands). */
const BRANDS = [
  [T("home.brands.001", "IGO Agritech Farms"), T("home.brands.002", "/brands/igo-agritech-farms.webp")],
  [T("home.brands.003", "Farmers Factory"), T("home.brands.004", "/brands/farmers-factory.webp")],
  [T("home.brands.005", "Valluvam"), T("home.brands.006", "/brands/valluvam.webp")],
  [T("home.brands.007", "IGO Academy"), T("home.brands.008", "/brands/igo-academy.webp")],
  [T("home.brands.009", "IGO Farm Loans"), T("home.brands.010", "/brands/igo-farm-loans.webp")],
  [T("home.brands.011", "Farmgate Mandi"), T("home.brands.012", "/brands/farmgate-mandi.webp")],
  [T("home.brands.013", "Palm Cafe"), T("home.brands.014", "/brands/palm-cafe.webp")],
  [T("home.brands.015", "IGO Agri Mart"), T("home.brands.016", "/brands/igo-agri-mart.webp")],
  [T("home.brands.017", "IGO Farmlands Estates"), T("home.brands.018", "/brands/igo-farmlands-estates.webp")],
  [T("home.brands.019", "IGO Nursery"), T("home.brands.020", "/brands/igo-nursery.webp")],
  [T("home.brands.021", "IGO Farm Factories"), T("home.brands.022", "/brands/igo-farm-factories.webp")],
  [T("home.brands.023", "IGO Tech Farming Scientists"), T("home.brands.024", "/brands/igo-tech-farming-scientists.webp")],
  [T("home.brands.025", "IGO Fintech"), T("home.brands.026", "/brands/igo-fintech.webp")],
  [T("home.brands.027", "IGO Franchise (FICO)"), T("home.brands.028", "/brands/igo-franchise-fico.webp")],
  [T("home.brands.029", "Tech Farming Expert"), T("home.brands.030", "/brands/tech-farming-expert.webp")],
  [T("home.brands.031", "Tech Farming Wealth"), T("home.brands.032", "/brands/tech-farming-wealth.webp")],
  [T("home.brands.033", "Protein Cuts"), T("home.brands.034", "/brands/protein-cuts.webp")],
  [T("home.brands.035", "IGO Farm Automation"), T("home.brands.036", "/brands/igo-farm-automation.webp")],
  [T("home.brands.037", "IGO Exports & Imports"), T("home.brands.038", "/brands/igo-exports-and-imports.webp")],
  [T("home.brands.039", "India Green App"), T("home.brands.040", "/brands/india-green-app.webp")],
  [T("home.brands.041", "IGO Crop Care"), T("home.brands.042", "/brands/igo-crop-care.webp")],
  [T("home.brands.043", "IGO Mart"), T("home.brands.044", "/brands/igo-mart.webp")],
  [T("home.brands.045", "IGO Organic Pharmacy"), T("home.brands.046", "/brands/igo-organic-pharmacy.webp")],
  [T("home.brands.047", "IGO Green Energy"), T("home.brands.048", "/brands/igo-green-energy.webp")],
  [T("home.brands.049", "IGO Natural Cosmetics"), T("home.brands.050", "/brands/igo-natural-cosmetics.webp")],
  [T("home.brands.051", "India Green Organics"), T("home.brands.052", "/brands/india-green-organics.webp")]
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
        <p className="bmEye"><span />{T("home.brands.053", "OUR BRANDS")}<span /></p>
        <h2 id="bmTitle">{T("home.brands.054", "The IGO Group")} <em>{T("home.brands.055", "Family of Brands")}</em></h2>
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
