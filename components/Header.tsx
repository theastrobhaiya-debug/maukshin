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

          {/* Logo */}
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

          {/* Shop - Always Centered */}
          <a
            href="https://mauksh.com"
            className="shop-link"
            onClick={closeMenu}
            aria-label="Shop Mauksh products"
          >
            <svg
              className="shop-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 8h12l1 13H5L6 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>

            <span>Shop</span>
          </a>

          {/* Menu */}
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

        {/* Navigation */}
        <nav
          className={`main-nav ${
            menuOpen ? "nav-open" : ""
          }`}
        >
          <Link href="/" onClick={closeMenu}>
            Home
          </Link>

          <Link href="/horoscope" onClick={closeMenu}>
            Horoscope
          </Link>

          <Link href="/name-checker" onClick={closeMenu}>
            Name Checker
          </Link>

          <Link href="/founder" onClick={closeMenu}>
            Founder
          </Link>
        </nav>

      </header>
    </>
  );
}