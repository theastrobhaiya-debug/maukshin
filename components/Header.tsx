"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/assets/kaaldarpan-logo.png"
        />
        <link
          rel="apple-touch-icon"
          href="/assets/kaaldarpan-logo.png"
        />
      </head>

      <header className="site-header">

        <div className="header-inner">

          <Link
            href="/"
            className="brand"
            onClick={closeMenu}
          >
            <img
              src="/assets/kaaldarpan-logo.png"
              alt="KaalDarpan"
              className="brand-logo"
            />

            <div className="brand-text">

              <span className="brand-name">
                GrahGanit
              </span>

              <span className="brand-tagline">
                Vedic Astrology
              </span>

            </div>
          </Link>


          <nav
            className={`main-nav ${
              menuOpen ? "nav-open" : ""
            }`}
          >

            <Link
              href="/"
              onClick={closeMenu}
            >
              Home
            </Link>

            <Link
              href="/horoscope"
              onClick={closeMenu}
            >
              Horoscope
            </Link>

            <Link
              href="/name-checker"
              onClick={closeMenu}
            >
              Name Checker
            </Link>

            <Link
              href="/founder"
              onClick={closeMenu}
            >
              Founder
            </Link>

          </nav>


          <Link
            href="/horoscope"
            className="header-button"
          >
            Explore
            <span>→</span>
          </Link>


          <button
            type="button"
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open navigation"
            aria-expanded={menuOpen}
          >

            <span />
            <span />
            <span />

          </button>

        </div>

      </header>
    </>
  );
}