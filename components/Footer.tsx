import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">

      <div className="footer-inner">

        <div className="footer-brand">

          <Link
            href="/"
            className="footer-logo"
          >

            <img
              src="/assets/kaaldarpan-logo.png"
              alt="KaalDarpan"
            />

            <span>
              KaalDarpan
            </span>

          </Link>


          <p>
            Ancient Vedic wisdom,
            <br />
            interpreted for modern life.
          </p>

        </div>


        <div className="footer-column">

          <h3>
            Explore
          </h3>

          <Link href="/">
            Home
          </Link>

          <Link href="/horoscope">
            Horoscope
          </Link>

          <Link href="/founder">
            Founder
          </Link>

        </div>


        <div className="footer-column">

          <h3>
            KaalDarpan
          </h3>

          <span>
            Vedic Astrology
          </span>

          <span>
            Planetary Insights
          </span>

          <span>
            Daily Guidance
          </span>

        </div>

      </div>


      <div className="footer-bottom">

        <span>
          © {new Date().getFullYear()} KaalDarpan
        </span>

        <span>
          Powered by Mauksh
        </span>

      </div>

    </footer>
  );
}