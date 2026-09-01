import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <div className="eyebrow">
              VEDIC ASTROLOGY · MODERN PERSPECTIVE
            </div>

            <h1>
              Your life has a
              <br />
              <span>cosmic pattern.</span>
            </h1>

            <p>
              KaalDarpan brings the depth of Vedic astrology into a
              simple, modern experience — helping you understand
              yourself, your timing and your journey.
            </p>

            <div className="hero-actions">
              <a href="/horoscope" className="btn btn-primary">
                Explore Horoscope →
              </a>

              <a href="#about" className="btn btn-secondary">
                Discover KaalDarpan
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />

            <div className="hero-sun">☼</div>

            <div className="planet planet-one">✦</div>
            <div className="planet planet-two">☽</div>
            <div className="planet planet-three">✧</div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="trust-strip">
          <div>
            <strong>Vedic</strong>
            <span>Astrology</span>
          </div>

          <div>
            <strong>Planetary</strong>
            <span>Insights</span>
          </div>

          <div>
            <strong>Personal</strong>
            <span>Interpretation</span>
          </div>

          <div>
            <strong>Modern</strong>
            <span>Experience</span>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="home-section">
          <div className="section-intro">
            <div className="eyebrow">WHY KAALDARPAN</div>

            <h2>
              Ancient wisdom.
              <br />
              <span>Clearer perspective.</span>
            </h2>

            <p>
              Astrology doesn't have to feel complicated. KaalDarpan
              makes traditional Vedic astrology easier to understand
              and more relevant to everyday life.
            </p>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <div className="feature-number">01</div>
              <div className="feature-icon">◈</div>

              <h3>Vedic Foundation</h3>

              <p>
                Built around the traditional planetary framework of
                Vedic astrology.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-number">02</div>
              <div className="feature-icon">◉</div>

              <h3>Personal Insights</h3>

              <p>
                Move beyond generic zodiac content and understand
                your individual astrological patterns.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-number">03</div>
              <div className="feature-icon">✦</div>

              <h3>Simple Experience</h3>

              <p>
                Complex astrological information presented clearly
                without unnecessary complication.
              </p>
            </article>
          </div>
        </section>

        {/* HOROSCOPE */}
        <section className="horoscope-cta">
          <div className="horoscope-copy">
            <div className="eyebrow">DAILY GUIDANCE</div>

            <h2>
              What do the planets
              <br />
              <span>have to say today?</span>
            </h2>

            <p>
              Explore your daily horoscope and understand the
              planetary themes influencing your day.
            </p>

            <a href="/horoscope" className="btn btn-primary">
              View Horoscope →
            </a>
          </div>

          <div className="moon-visual">
            <div className="moon">☾</div>
            <div className="moon-ring" />

            <span>✦</span>
            <span>✧</span>
            <span>·</span>
          </div>
        </section>

        {/* FOUNDER */}
        <section className="founder-preview">
          <div>
            <div className="eyebrow">THE STORY</div>

            <h2>
              Astrology,
              <br />
              <span>made human.</span>
            </h2>

            <p>
              KaalDarpan was created with a simple belief:
              astrology should help people understand themselves,
              not make them more confused.
            </p>

            <a href="/founder" className="btn btn-secondary">
              Meet the Founder →
            </a>
          </div>

          <div className="founder-quote">
            <div className="quote-mark">“</div>

            <blockquote>
              The purpose of astrology is not to decide your life
              for you. It is to give you a better perspective on it.
            </blockquote>

            <div className="quote-line" />

            <small>KAALDARPAN</small>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="final-cta">
          <div className="eyebrow">BEGIN YOUR JOURNEY</div>

          <h2>
            Look at your life
            <br />
            <span>from a different angle.</span>
          </h2>

          <p>
            Your birth chart is a map. Let KaalDarpan help you read it.
          </p>

          <a href="/horoscope" className="btn btn-primary">
            Explore Horoscope →
          </a>
        </section>
      </main>

      <Footer />
    </>
  );
}