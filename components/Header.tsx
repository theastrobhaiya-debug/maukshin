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
          href="/assets/mauksh-logo.jpg"
        />
        <link
          rel="apple-touch-icon"
          href="/assets/mauksh-logo.jpg"
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
              src="/assets/mauksh-logo.jpg"
              alt="Mauksh"
              className="brand-logo"
            />
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

          <a
            href="https://mauksh.com"
            className="header-button"
            onClick={closeMenu}
          >
            Shop
            <span>→</span>
          </a>

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