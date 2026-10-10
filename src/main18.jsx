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
import AboutPage from './AboutPage.jsx';
import Navbar from './Navbar.jsx';
import './pages/pages.css';
import { ServicesPage, SolarPage, WindPage, BiogasPage, WaterPage } from './pages/services.jsx';
import { ProjectsPage, TestimonialsPage, BlogsPage, ContactPage, FaqPage, ChatWidget } from './pages/others.jsx';

const services=[
 {key:'solar',icon:'☀',title:'Solar Energy',text:'Harness the sun to reduce electricity bills and gain energy independence.',tag:'01',tone:'solar'},
 {key:'wind',icon:'♨',title:'Wind Energy',text:'From turbine installation to complete EPC and O&M, we turn wind into reliable energy.',tag:'02',tone:'wind'},
 {key:'biogas',icon:'◌',title:'Biogas Solutions',text:'Transform organic waste into clean fuel and lasting value.',tag:'03',tone:'bio'},
 {key:'water',icon:'◉',title:'Water Treatment',text:'Safe, reusable and efficient water systems for a cleaner future.',tag:'04',tone:'water'}
];
const process=['Consultation','Site Assessment','Design & Proposal','Installation & Commissioning','Handover & O&M'];
function App(){
 const [active,setActive]=useState(null),[quote,setQuote]=useState(false),[scrolled,setScrolled]=useState(false); const hero=useRef(null);
 useEffect(()=>{const f=()=>setScrolled(scrollY>30);addEventListener('scroll',f);return()=>removeEventListener('scroll',f)},[]);
 const isAbout=()=>location.pathname==='/about'||location.hash==='#about-us';
 const route=()=>{const p=location.pathname.replace(/\/+$/,'')||'/';return isAbout()?'/about':p};
 const [path,setPath]=useState(route); const first=useRef(true);
 useEffect(()=>{const f=()=>setPath(route());addEventListener('popstate',f);return()=>removeEventListener('popstate',f)},[]);
 const PAGES={'/about':'about','/services':'services','/services/solar':'solar','/services/wind':'wind','/services/biogas':'biogas','/services/water':'water','/projects':'projects','/testimonials':'testimonials','/blogs':'blogs','/contact':'contact','/faq':'faq'};
 const page=PAGES[path]||'home';
 useEffect(()=>{ if(first.current){first.current=false;return}
  requestAnimationFrame(()=>scrollTo({top:0,behavior:page==='home'?'smooth':'instant'})) },[path]);
 const nav=p=>{history.pushState(null,'',p);dispatchEvent(new PopStateEvent('popstate'))};
 const PATH={home:'/',about:'/about',solutions:'/services',contact:'/contact'};
 const go=id=>{ if(PATH[id]){nav(PATH[id]);return} document.getElementById(id)?.scrollIntoView({behavior:'smooth'}) };
 const Q=()=>setQuote(true);
 const PAGE={about:<AboutPage onContact={()=>go('contact')} onQuote={Q}/>,services:<ServicesPage onQuote={Q}/>,solar:<SolarPage onQuote={Q}/>,wind:<WindPage onQuote={Q}/>,biogas:<BiogasPage onQuote={Q}/>,water:<WaterPage onQuote={Q}/>,projects:<ProjectsPage onQuote={Q}/>,testimonials:<TestimonialsPage onQuote={Q}/>,blogs:<BlogsPage/>,contact:<ContactPage/>,faq:<FaqPage/>}[page];
 return <div className="app">
  <Navbar onQuoteClick={()=>setQuote(true)}/>
  <main>
  {PAGE||<>
   <HeroBanner/>
   <OurSolutions onExplore={k=>nav('/services/'+k)}/>
   <FourElements id="elements"/>
   <Industries onSelect={()=>go('contact')}/>
   <ProjectJourney/>
   <ClientTestimonials/>
   <PartnersCerts showCerts={false}/>
   <GoGreenCta onQuote={Q} onContact={()=>go('contact')}/>

  </>}
  </main>
  <footer><div className="logo"><span>IGO</span><small>GREEN ENERGY</small></div><p>Go Green. Go Smart. Go IGO.</p><div><button onClick={()=>go('solutions')}>Solutions</button><button onClick={()=>go('contact')}>Contact</button></div></footer>
  <ChatWidget/>
  {quote&&<div className="modal" onClick={()=>setQuote(false)}><div className="modalCard" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setQuote(false)}>×</button><p className="eyebrow">SMART QUOTE</p><h2>Tell us what you're building.</h2><input placeholder="Your name"/><input placeholder="Phone / WhatsApp"/><select defaultValue=""><option value="" disabled>Select solution</option><option>Solar Energy</option><option>Wind Energy</option><option>Biogas Solutions</option><option>Water Treatment</option></select><textarea placeholder="Tell us about your requirement"/><button className="cta" onClick={()=>setQuote(false)}>Submit Enquiry →</button></div></div>}
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
