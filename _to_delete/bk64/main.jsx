import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';
import HeroBanner from './HeroBanner.jsx';
import OurSolutions from './OurSolutions.jsx';
import FourElements from './FourElements.jsx';
import Industries from './Industries.jsx';
import ProjectJourney from './ProjectJourney.jsx';
import ClientTestimonials from './ClientTestimonials.jsx';
import PartnersCerts from './PartnersCerts.jsx';
import GoGreenCta from './GoGreenCta.jsx';
import SiteFooter from './SiteFooter.jsx';
import BrandsMarquee from './BrandsMarquee.jsx';
import SolarChoice, { openSolarChoice } from './pages/SolarChoice.jsx';
import HomeSolarPopup, { openHomeSolar } from './pages/HomeSolarPopup.jsx';
import AboutPage from './AboutPage.jsx';
import Navbar from './Navbar.jsx';
import AdminApp from './admin/AdminApp.jsx';
import { useCms, cms } from './admin/store.js';
import { useEnquiry, HONEY } from './useEnquiry.js';
import { PrivacyPage, TermsPage, SitemapPage, NotFoundPage, SolarCalculator } from './pages/extra.jsx';
import { BiogasCalculator, WaterGuide } from './pages/extra2.jsx';
import { SubsidyPage } from './pages/subsidy.jsx';
import { ProductsPage } from './pages/products.jsx';
import './pages/pages.css';
import { ServicesPage, SolarPage, WindPage, BiogasPage, WaterPage } from './pages/services.jsx';
import { LearnershipsPage, CareersPage } from './pages/careers.jsx';
import { LeadershipPage } from './pages/leadership.jsx';
import { ProjectsPage, BlogsPage, ContactPage, FaqPage, ChatWidget } from './pages/others.jsx';

import { T } from './content/T.js';
const services=[
 {key:'solar',icon:'☀',title:'Solar Energy',text:'Harness the sun to reduce electricity bills and gain energy independence.',tag:'01',tone:'solar'},
 {key:'wind',icon:'♨',title:'Wind Energy',text:'From turbine installation to complete EPC and O&M, we turn wind into reliable energy.',tag:'02',tone:'wind'},
 {key:'biogas',icon:'◌',title:'Biogas Solutions',text:'Transform organic waste into clean fuel and lasting value.',tag:'03',tone:'bio'},
 {key:'water',icon:'◉',title:'Water Treatment',text:'Safe, reusable and efficient water systems for a cleaner future.',tag:'04',tone:'water'}
];
const process=['Consultation','Site Assessment','Design & Proposal','Installation & Commissioning','Handover & O&M'];
function HeroSwitch(){const h=useCms('hero');
 if(!h||!h.imgDesktop)return <HeroBanner/>;
 const al=h.align||'left',ov=(Number(h.overlay)||0)/100;
 return <section className="cmsHero" style={{position:'relative',padding:0,minHeight:h.height&&h.height!=='auto'?h.height+'px':'60vh',display:'grid',alignItems:'center'}}>
  <picture><source media="(max-width:600px)" srcSet={h.imgMobile||h.imgDesktop}/><source media="(max-width:1024px)" srcSet={h.imgTablet||h.imgDesktop}/><img src={h.imgDesktop} alt="" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/></picture>
  <div style={{position:'absolute',inset:0,background:`rgba(0,0,0,${ov})`}}/>
  <div style={{position:'relative',padding:'120px 6vw 60px',textAlign:al,color:'#fff',maxWidth:900,marginLeft:al==='center'?'auto':0,marginRight:al==='right'?0:al==='center'?'auto':undefined,...(al==='right'?{marginLeft:'auto'}:{})}}>
   {h.subheading&&<p className="eyebrow">{h.subheading}</p>}<h1 style={{color:'#fff'}}>{h.heading}</h1><p>{h.description}</p>
   {h.ctaText&&<a className="cta" href={h.ctaLink||'#'} onClick={e=>{if((h.ctaLink||'').startsWith('/')){e.preventDefault();history.pushState(null,'',h.ctaLink);dispatchEvent(new PopStateEvent('popstate'))}}}>{h.ctaText}</a>}
  </div></section>}
function App(){
 const [active,setActive]=useState(null),[quote,setQuote]=useState(false),[scrolled,setScrolled]=useState(false); const hero=useRef(null);
 useEffect(()=>{const f=()=>setScrolled(scrollY>30);addEventListener('scroll',f);return()=>removeEventListener('scroll',f)},[]);
 const isAbout=()=>location.pathname==='/about'||location.hash==='#about-us';
 const route=()=>{const p=location.pathname.replace(/\/+$/,'')||'/';return isAbout()?'/about':p};
 const [path,setPath]=useState(route); const first=useRef(true);
 useEffect(()=>{const f=()=>setPath(route());addEventListener('popstate',f);return()=>removeEventListener('popstate',f)},[]);
 const PAGES={'/about':'about','/services':'services','/services/solar':'solar','/services/wind':'wind','/services/biogas':'biogas','/services/water':'water','/projects':'projects','/blogs':'blogs','/learnerships':'learnerships','/careers':'careers','/leadership':'leadership','/contact':'contact','/faq':'faq','/privacy-policy':'privacy','/terms':'terms','/sitemap':'sitemap','/subsidy':'subsidy','/products':'products'};
 const page=PAGES[path]||(path==='/'||path==='/index.html'||path.startsWith('/admin')?'home':'notfound');
 useEffect(()=>{ if(first.current){first.current=false;return}
  requestAnimationFrame(()=>scrollTo({top:0,behavior:page==='home'?'smooth':'instant'})) },[path]);
 const TITLES={about:T('seo.about','About Us'),services:T('seo.services','Our Services'),solar:T('seo.solar','Solar Energy'),wind:T('seo.wind','Wind Energy'),biogas:T('seo.biogas','Biogas & Bioenergy'),water:T('seo.water','Water Treatment'),projects:T('seo.projects','Projects'),blogs:T('seo.blogs','Blogs'),learnerships:T('seo.learnerships','Learnerships'),careers:T('seo.careers','Careers'),leadership:T('seo.leadership','Leadership'),contact:T('seo.contact','Contact Us'),faq:T('seo.faq','FAQ'),privacy:T('seo.privacy','Privacy Policy'),terms:T('seo.terms','Terms & Conditions'),subsidy:T('seo.subsidy','Subsidy'),products:T('seo.products','Products'),sitemap:T('seo.sitemap','Sitemap'),notfound:T('seo.notfound','Page not found')};
 useEffect(()=>{ if(first.current)return; if(TITLES[page])document.title=TITLES[page]+T('seo.suffix',' | IGO Green Energy'); else {const t=cms.get('settings'); document.title=(t&&t.seoTitle)||'IGO Green Energy — Clean Energy. Cleaner Tomorrow.'} },[path]);
 const nav=p=>{history.pushState(null,'',p);dispatchEvent(new PopStateEvent('popstate'))};
 const PATH={home:'/',about:'/about',solutions:'/services',contact:'/contact'};
 const go=id=>{ if(PATH[id]){nav(PATH[id]);return} document.getElementById(id)?.scrollIntoView({behavior:'smooth'}) };
 const Q=()=>setQuote(true);
 const PAGE={about:<AboutPage onContact={()=>go('contact')} onQuote={Q}/>,services:<ServicesPage onQuote={Q}/>,solar:<><SolarPage onQuote={Q} noHero={!!history.state?.solarHome}/><SolarCalculator/></>,wind:<WindPage onQuote={Q}/>,biogas:<><BiogasPage onQuote={Q}/><BiogasCalculator/></>,water:<><WaterPage onQuote={Q}/><WaterGuide/></>,projects:<ProjectsPage onQuote={Q}/>,blogs:<BlogsPage/>,learnerships:<LearnershipsPage/>,careers:<CareersPage/>,leadership:<LeadershipPage/>,contact:<ContactPage/>,faq:<FaqPage/>,privacy:<PrivacyPage/>,terms:<TermsPage/>,sitemap:<SitemapPage/>,subsidy:<SubsidyPage onQuote={Q}/>,products:<ProductsPage onQuote={Q}/>,notfound:<NotFoundPage/>}[page];
 const hs=useCms('homeSections');
 const HOME={hero:<HeroSwitch/>,solutions:<OurSolutions onExplore={k=>k==='solar'?openHomeSolar():nav('/services/'+k)}/>,elements:<FourElements id="elements"/>,industries:<Industries onSelect={()=>go('contact')}/>,process:<ProjectJourney/>,testimonials:<ClientTestimonials/>,partners:<PartnersCerts showCerts={false}/>,cta:<><GoGreenCta onQuote={Q} onContact={()=>go('contact')}/><BrandsMarquee/></>,footer:<SiteFooter onNav={nav}/>};
 const homeOrder=(Array.isArray(hs)?[...hs].sort((a,b)=>(a.order??0)-(b.order??0)).filter(x=>x.enabled!==false&&x.status!=='draft').map(x=>x.key):Object.keys(HOME));
 return <div className="app">
  <Navbar onQuoteClick={()=>setQuote(true)}/>
  <main>
  {PAGE||<>
   {homeOrder.map(k=>HOME[k]&&<React.Fragment key={k}>{HOME[k]}</React.Fragment>)}

  </>}
  </main>
  {PAGE&&<SiteFooter onNav={nav}/>}
  <SolarChoice onQuote={Q}/>
  <HomeSolarPopup/>
  <ChatWidget/>
  {quote&&<QuoteModal onClose={()=>setQuote(false)}/>}
 </div>
}
function QuoteModal({onClose}){
 const [st,send]=useEnquiry();
 useEffect(()=>{const k=e=>{if(e.key==='Escape')onClose()};addEventListener('keydown',k);const b=document.body,h=document.documentElement,pb=b.style.overflow,ph=h.style.overflow;b.style.overflow='hidden';h.style.overflow='hidden';return()=>{removeEventListener('keydown',k);b.style.overflow=pb;h.style.overflow=ph}},[onClose]);
 const submit=e=>{e.preventDefault();const f=new FormData(e.currentTarget);send({type:'quote',name:f.get('name'),phone:f.get('phone'),email:f.get('email'),subject:f.get('solution'),message:f.get('message'),website:f.get('website'),extra:{Solution:f.get('solution')}})};
 return <div className="modal" onClick={onClose}><form className="modalCard" role="dialog" aria-modal="true" onClick={e=>e.stopPropagation()} onSubmit={submit}><button type="button" className="close" aria-label="Close" onClick={onClose}>×</button><div className="mBody">
  {st.ok?<><p className="eyebrow">{T("app.001", "THANK YOU")}</p><h2>{T("app.002", "We have received your enquiry.")}</h2><p>{T("app.003", "Our team will contact you shortly.")}</p><button type="button" className="cta" onClick={onClose}>{T("app.004", "Close")}</button></>:<>
  <p className="eyebrow">{T("app.005", "SMART QUOTE")}</p><h2>{T("app.006", "Tell us what you're building.")}</h2>
  <input name="name" required placeholder={T("app.007", "Your name")} aria-label="Your name"/><input name="phone" required type="tel" placeholder={T("app.008", "Phone / WhatsApp")} aria-label="Phone"/><input name="email" type="email" placeholder={T("app.009", "Email (optional)")} aria-label="Email"/>
  <select name="solution" required defaultValue=""><option value="" disabled>{T("app.010", "Select solution")}</option><option>{T("app.011", "Solar Energy")}</option><option>{T("app.012", "Wind Energy")}</option><option>{T("app.013", "Biogas Solutions")}</option><option>{T("app.014", "Water Treatment")}</option></select>
  <textarea name="message" placeholder={T("app.015", "Tell us about your requirement")}/><input {...HONEY}/>
  {st.err&&<p className="formErr" role="alert">{st.err}</p>}
  <button className="cta" disabled={st.busy}>{st.busy?'Sending…':'Submit Enquiry →'}</button></>}
 </div></form></div>}
function SiteMeta(){const st=useCms('settings');useEffect(()=>{if(!st)return;if(st.seoTitle)document.title=st.seoTitle;if(st.seoDesc){let m=document.querySelector('meta[name=description]');if(!m){m=document.createElement('meta');m.name='description';document.head.appendChild(m)}m.content=st.seoDesc}if(st.favicon){let l=document.querySelector('link[rel~=icon]');if(!l){l=document.createElement('link');l.rel='icon';document.head.appendChild(l)}l.href=st.favicon}},[st]);return null}
function Root(){const [p,setP]=useState(location.pathname);useEffect(()=>{const f=()=>setP(location.pathname);addEventListener('popstate',f);return()=>removeEventListener('popstate',f)},[]);return p.startsWith('/admin')?<AdminApp/>:<><SiteMeta/><App/></>}
createRoot(document.getElementById('root')).render(<Root/>);
