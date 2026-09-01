import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <nav className="nav">
        <Link href="/" className="brand">
          <img
            src="/assets/kaaldarpan-logo.png"
            alt="Kaaldarpan"
          />

          <span className="brand-name">
            Kaaldarpan
          </span>
        </Link>

        <div className="menu">
          <Link href="/">
            Panchang
          </Link>

          <Link href="/horoscope">
            Horoscope
          </Link>

          <Link href="/founder">
            Founder
          </Link>
        </div>
      </nav>
    </header>
  );
}