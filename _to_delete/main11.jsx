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
import AboutPage from './AboutPage.jsx';
import Navbar from './Navbar.jsx';
import AdminApp from './admin/AdminApp.jsx';
import { useCms } from './admin/store.js';
import './pages/pages.css';
import { ServicesPage, SolarPage, WindPage, BiogasPage, WaterPage } from './pages/services.jsx';
import { LearnershipsPage, CareersPage } from './pages/careers.jsx';
import { LeadershipPage } from './pages/leadership.jsx';
import { ProjectsPage, BlogsPage, ContactPage, FaqPage, ChatWidget } from './pages/others.jsx';

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
 const PAGES={'/about':'about','/services':'services','/services/solar':'solar','/services/wind':'wind','/services/biogas':'biogas','/services/water':'water','/projects':'projects','/blogs':'blogs','/learnerships':'learnerships','/careers':'careers','/leadership':'leadership','/contact':'contact','/faq':'faq'};
 const page=PAGES[path]||'home';
 useEffect(()=>{ if(first.current){first.current=false;return}
  requestAnimationFrame(()=>scrollTo({top:0,behavior:page==='home'?'smooth':'instant'})) },[path]);
 const nav=p=>{history.pushState(null,'',p);dispatchEvent(new PopStateEvent('popstate'))};
 const PATH={home:'/',about:'/about',solutions:'/services',contact:'/contact'};
 const go=id=>{ if(PATH[id]){nav(PATH[id]);return} document.getElementById(id)?.scrollIntoView({behavior:'smooth'}) };
 const Q=()=>setQuote(true);
 const PAGE={about:<AboutPage onContact={()=>go('contact')} onQuote={Q}/>,services:<ServicesPage onQuote={Q}/>,solar:<SolarPage onQuote={Q}/>,wind:<WindPage onQuote={Q}/>,biogas:<BiogasPage onQuote={Q}/>,water:<WaterPage onQuote={Q}/>,projects:<ProjectsPage onQuote={Q}/>,blogs:<BlogsPage/>,learnerships:<LearnershipsPage/>,careers:<CareersPage/>,leadership:<LeadershipPage/>,contact:<ContactPage/>,faq:<FaqPage/>}[page];
 const hs=useCms('homeSections');
 const HOME={hero:<HeroSwitch/>,solutions:<OurSolutions onExplore={k=>nav('/services/'+k)}/>,elements:<FourElements id="elements"/>,industries:<Industries onSelect={()=>go('contact')}/>,process:<ProjectJourney/>,testimonials:<ClientTestimonials/>,partners:<PartnersCerts showCerts={false}/>,cta:<><GoGreenCta onQuote={Q} onContact={()=>go('contact')}/><BrandsMarquee/></>,footer:<SiteFooter onNav={nav}/>};
 const homeOrder=(Array.isArray(hs)?[...hs].sort((a,b)=>(a.order??0)-(b.order??0)).filter(x=>x.enabled!==false&&x.status!=='draft').map(x=>x.key):Object.keys(HOME));
 return <div className="app">
  <Navbar onQuoteClick={()=>setQuote(true)}/>
  <main>
  {PAGE||<>
   {homeOrder.map(k=>HOME[k]&&<React.Fragment key={k}>{HOME[k]}</React.Fragment>)}

  </>}
  </main>
  {PAGE&&<SiteFooter onNav={nav}/>}
  <ChatWidget/>
  {quote&&<div className="modal" onClick={()=>setQuote(false)}><div className="modalCard" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setQuote(false)}>×</button><p className="eyebrow">SMART QUOTE</p><h2>Tell us what you're building.</h2><input placeholder="Your name"/><input placeholder="Phone / WhatsApp"/><select defaultValue=""><option value="" disabled>Select solution</option><option>Solar Energy</option><option>Wind Energy</option><option>Biogas Solutions</option><option>Water Treatment</option></select><textarea placeholder="Tell us about your requirement"/><button className="cta" onClick={()=>setQuote(false)}>Submit Enquiry →</button></div></div>}
 </div>
}
function SiteMeta(){const st=useCms('settings');useEffect(()=>{if(!st)return;if(st.seoTitle)document.title=st.seoTitle;if(st.seoDesc){let m=document.querySelector('meta[name=description]');if(!m){m=document.createElement('meta');m.name='description';document.head.appendChild(m)}m.content=st.seoDesc}if(st.favicon){let l=document.querySelector('link[rel~=icon]');if(!l){l=document.createElement('link');l.rel='icon';document.head.appendChild(l)}l.href=st.favicon}},[st]);return null}
function Root(){const [p,setP]=useState(location.pathname);useEffect(()=>{const f=()=>setP(location.pathname);addEventListener('popstate',f);return()=>removeEventListener('popstate',f)},[]);return p.startsWith('/admin')?<AdminApp/>:<><SiteMeta/><App/></>}
createRoot(document.getElementById('root')).render(<Root/>);
