import React, { useState, useEffect } from 'react';

import { T } from './content/T.js';
import SubsidyMenu from './NavbarSubsidyMenu.jsx';
const NAV_ITEMS = [
  { label: T("nav.001", "Home"), path: '/' },
  { label: T("nav.002", "About Us"), path: '/about' },
  { label: T("nav.003", "Services"), path: '/services' },
  { label: T("nav.004", "Projects"), path: '/projects' },
  { label: T("nav.010", "Subsidy"), path: '/subsidy' },
  { label: T("nav.005", "Leadership"), path: '/leadership' },
  { label: T("nav.006", "Blogs"), path: '/blogs' },
  { label: T("nav.007", "FAQ"), path: '/faq' },
  { label: T("nav.008", "Careers"), path: '/careers' },
  { label: T("nav.009", "Contact Us"), path: '/contact' },
];

export default function Navbar({ onQuoteClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleNavClick = (e, path) => {
    e.preventDefault();
    if (path === currentPath && path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setMobileOpen(false);
      return;
    }
    
    window.history.pushState(null, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    setCurrentPath(path);
    setMobileOpen(false);
    
    if (path === '/' || path === '/about') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a className="logo logoImg" href="/" aria-label="Green Energy home" onClick={(e) => handleNavClick(e, '/')}>
        <img src="/logo.png" alt={T("nav.010", "Green Energy")} width="858" height="719" />
      </a>

      <nav className={`desktop-nav ${mobileOpen ? 'mobile-open' : ''}`}>
        {NAV_ITEMS.map((item) => {
          const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path + '/')) || (currentPath === '/' && item.path === '/' && !window.location.hash);
          if (item.path === '/subsidy') return <SubsidyMenu key={item.label} label={item.label} active={isActive} onGo={(p) => handleNavClick({ preventDefault() {} }, p)} />;
          return (
            <a
              key={item.label}
              href={item.path}
              className={isActive ? 'on' : ''}
              onClick={(e) => handleNavClick(e, item.path)}
            >
              {item.label}
            </a>
          );
        })}
        {mobileOpen && (
          <button className="cta small mobile-cta" onClick={() => { setMobileOpen(false); onQuoteClick(); }}>
            {T("nav.011", "Get a Smart Quote")} <b>→</b>
          </button>
        )}
      </nav>

      <div className="nav-right">
        <button className="cta small desktop-cta" onClick={onQuoteClick}>
          {T("nav.012", "Get a Smart Quote")} <b>→</b>
        </button>
        <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2.5" fill="none">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>
    </header>
  );
}
