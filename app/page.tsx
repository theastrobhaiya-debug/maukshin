export default function HomePage() {
  return (
    <>

      {/* HERO */}

      <section className="hero">

        <div className="hero-content">

          <div className="eyebrow">
            VEDIC ASTROLOGY · PLANETARY WISDOM
          </div>

          <h1>
            Read the
            <br />
            <span>rhythm of life.</span>
          </h1>

          <p>
            KaalDarpan brings the timeless principles
            of Vedic astrology into a clear, modern
            experience — helping you understand
            planetary movements and their influence
            on your journey.
          </p>


          <div className="hero-actions">

            <a
              href="/horoscope"
              className="btn btn-primary"
            >
              Explore Horoscope
              <span>→</span>
            </a>

            <a
              href="/founder"
              className="btn btn-secondary"
            >
              About KaalDarpan
            </a>

          </div>

        </div>


        <div className="hero-visual">

          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />

          <div className="hero-sun">
            ☀
          </div>

          <div className="planet planet-one">
            ☽
          </div>

          <div className="planet planet-two">
            ✦
          </div>

          <div className="planet planet-three">
            ◐
          </div>

        </div>

      </section>


      {/* TRUST STRIP */}

      <section className="trust-strip">

        <div>
          <strong>Vedic</strong>
          <span>Tradition</span>
        </div>

        <div>
          <strong>Planetary</strong>
          <span>Calculations</span>
        </div>

        <div>
          <strong>Simple</strong>
          <span>Interpretation</span>
        </div>

        <div>
          <strong>Modern</strong>
          <span>Experience</span>
        </div>

      </section>


      {/* INTRODUCTION */}

      <section className="home-section">

        <div className="section-intro">

          <div className="eyebrow">
            THE KAALDARPAN APPROACH
          </div>

          <h2>
            Astrology,
            <br />
            <span>without the noise.</span>
          </h2>

          <p>
            Astrology can be deeply complex.
            KaalDarpan is designed to make that
            complexity easier to understand without
            losing the depth of the Vedic tradition.
          </p>

        </div>


        <div className="feature-grid">

          <article className="feature-card">

            <span className="feature-number">
              01
            </span>

            <div className="feature-icon">
              ☉
            </div>

            <h3>
              Planetary Wisdom
            </h3>

            <p>
              Understand the movements of the
              planets and the themes they activate
              in your life.
            </p>

          </article>


          <article className="feature-card">

            <span className="feature-number">
              02
            </span>

            <div className="feature-icon">
              ☽
            </div>

            <h3>
              Vedic Perspective
            </h3>

            <p>
              Rooted in the principles and
              calculations of traditional
              Jyotish.
            </p>

          </article>


          <article className="feature-card">

            <span className="feature-number">
              03
            </span>

            <div className="feature-icon">
              ✦
            </div>

            <h3>
              Modern Guidance
            </h3>

            <p>
              Ancient concepts presented in a
              language that makes sense in
              everyday life.
            </p>

          </article>

        </div>

      </section>


      {/* HOROSCOPE */}

      <section className="horoscope-cta">

        <div className="horoscope-copy">

          <div className="eyebrow">
            DAILY GUIDANCE
          </div>

          <h2>
            Know what the
            <br />
            <span>stars are saying.</span>
          </h2>

          <p>
            Explore your daily horoscope through
            the lens of Vedic astrology and
            planetary movements.
          </p>

          <a
            href="/horoscope"
            className="btn btn-primary"
          >
            View Horoscope
            <span>→</span>
          </a>

        </div>


        <div className="moon-visual">

          <div className="moon-ring" />

          <div className="moon">
            ☾
          </div>

          <span>✦</span>
          <span>✧</span>
          <span>⋆</span>

        </div>

      </section>


      {/* FOUNDER */}

      <section className="founder-preview">

        <div>

          <div className="eyebrow">
            THE PERSON BEHIND KAALDARPAN
          </div>

          <h2>
            Built with
            <br />
            <span>curiosity.</span>
          </h2>

          <p>
            KaalDarpan was created with a simple
            belief — astrology should encourage
            curiosity and awareness, not blind
            belief.
          </p>

          <a
            href="/founder"
            className="btn btn-secondary"
          >
            Meet the Founder
            <span>→</span>
          </a>

        </div>


        <div className="founder-quote">

          <div className="quote-mark">
            “
          </div>

          <blockquote>
            Astrology should help you
            understand yourself better,
            not decide your life for you.
          </blockquote>

          <div className="quote-line" />

          <small>
            KAALDARPAN
          </small>

        </div>

      </section>


      {/* FINAL CTA */}

      <section className="final-cta">

        <div className="eyebrow">
          BEGIN YOUR JOURNEY
        </div>

        <h2>
          Look at the
          <br />
          <span>bigger picture.</span>
        </h2>

        <p>
          Explore Vedic astrology through
          KaalDarpan.
        </p>

        <a
          href="/horoscope"
          className="btn btn-primary"
        >
          Explore Horoscope
          <span>→</span>
        </a>

      </section>

    </>
  );
}