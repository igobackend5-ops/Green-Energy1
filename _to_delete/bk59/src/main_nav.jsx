import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';
import HeroBanner from './HeroBanner.jsx';
import OurSolutions from './OurSolutions.jsx';
import FourElements from './FourElements.jsx';
import Industries from './Industries.jsx';
import ProjectJourney from './ProjectJourney.jsx';
import AboutPage from './AboutPage.jsx';
import Navbar from './Navbar.jsx';

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
 const [page,setPage]=useState(()=>isAbout()?'about':'home'); const [path,setPath]=useState(()=>location.pathname); const first=useRef(true);
 useEffect(()=>{const f=()=>{setPage(isAbout()?'about':'home');setPath(location.pathname)};addEventListener('popstate',f);return()=>removeEventListener('popstate',f)},[]);
 /* navbar paths that have no page of their own scroll to the matching home section */
 const SECTION={'/services':'solutions','/projects':'industries','/contact':'contact'};
 useEffect(()=>{ if(first.current){first.current=false;return}
  if(page==='about'){scrollTo(0,0);return}
  const id=SECTION[path]; requestAnimationFrame(()=>{ if(id)document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); else scrollTo({top:0,behavior:'smooth'}) }) },[page,path]);
 const nav=p=>{history.pushState(null,'',p);dispatchEvent(new PopStateEvent('popstate'))};
 const PATH={home:'/',about:'/about',solutions:'/services',contact:'/contact'};
 const go=id=>{ if(PATH[id]){nav(PATH[id]);return} document.getElementById(id)?.scrollIntoView({behavior:'smooth'}) };
 return <div className="app">
  <Navbar onQuoteClick={()=>setQuote(true)}/>
  <main>
  {page==='about'?<AboutPage onContact={()=>go('contact')} onQuote={()=>setQuote(true)}/>:<>
   <HeroBanner/>
   <OurSolutions onExplore={()=>go('contact')}/>
   <FourElements id="elements"/>
   <Industries onSelect={()=>go('contact')}/>
   <ProjectJourney/>
   <section className="story" id="story"><div className="storyImage"><div className="mountain"/><div className="sunset"/></div><div className="storyCopy"><p className="eyebrow">OUR STORY</p><h2>From a Bold Idea to a <em>Greener Future.</em></h2><p>Every great change begins with a bold idea. For the iGo Group of Companies, that idea was simple: what if clean energy and clean water could be powerful, practical, and within everyone's reach?</p><p>That vision became iGo Green Energy — a brand built on proven strength and driven by the belief that a sustainable future is something we can build today.</p><blockquote>“Progress means nothing if it costs the planet. Our goal is to power growth in a way that leaves the world better than we found it.”<small>— Dr. John Yesudas, Founder & CEO, iGo Group of Companies</small></blockquote></div></section>

   <section className="sustain" id="sustainability"><div><p className="eyebrow">OUR PROMISE</p><h2>Building a Cleaner,<br/><em>Greener Tomorrow.</em></h2><p>We accelerate India's transition to clean energy with engineering excellence, customer trust and long-term support.</p><div className="metrics"><span><b>4</b> Core Solutions</span><span><b>1</b> Trusted Partner</span><span><b>∞</b> Greener Future</span></div></div><div className="leafField"><span>☘</span><span>◌</span><span>✦</span><span>☀</span></div></section>
   <section className="contact" id="contact"><div><p className="eyebrow">READY TO BUILD A GREENER FUTURE?</p><h2>Let's turn clean energy into <em>real impact.</em></h2><p>Start with a smart quote or site survey. We'll help shape a solution around your site, goals and budget.</p></div><button className="cta" onClick={()=>setQuote(true)}>Start a Smart Quote <b>→</b></button></section>
  </>}
  </main>
  <footer><div className="logo"><span>iGo</span><small>GREEN ENERGY</small></div><p>Go Green. Go Smart. Go iGo.</p><div><button onClick={()=>go('solutions')}>Solutions</button><button onClick={()=>go('contact')}>Contact</button></div></footer>
  {quote&&<div className="modal" onClick={()=>setQuote(false)}><div className="modalCard" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setQuote(false)}>×</button><p className="eyebrow">SMART QUOTE</p><h2>Tell us what you're building.</h2><input placeholder="Your name"/><input placeholder="Phone / WhatsApp"/><select defaultValue=""><option value="" disabled>Select solution</option><option>Solar Energy</option><option>Wind Energy</option><option>Biogas Solutions</option><option>Water Treatment</option></select><textarea placeholder="Tell us about your requirement"/><button className="cta" onClick={()=>setQuote(false)}>Submit Enquiry →</button></div></div>}
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
