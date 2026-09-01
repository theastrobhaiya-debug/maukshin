"use client";

export default function FounderPage() {
  return (
    <main className="founder-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="founder-hero">

        <div className="founder-hero-inner">

          <div className="founder-intro">

            <div className="eyebrow">
              FOUNDER • MAUKSH & KAALDARPAN
            </div>

            <h1>
              Shivam
              <br />
              Bansal
            </h1>

            <p className="founder-role">
              Founder of Mauksh & KaalDarpan
            </p>

            <p className="hero-description">
              Building products and experiences around Vedic
              astrology with a simple belief — technology should
              make ancient knowledge more accessible, not make it
              meaningless.
            </p>

          </div>


          <div className="founder-photo">

            <img
              src="/assets/Founder.JPG"
              alt="Shivam Bansal - Founder of Mauksh and KaalDarpan"
            />

          </div>

        </div>

      </section>


      {/* =========================
          INTRODUCTION
      ========================= */}

      <section className="section">

        <div className="section-line">

          <span>
            THE FOUNDER
          </span>

          <div />

        </div>


        <div className="intro-grid">

          <div className="intro-heading">

            <h2>
              Building with
              <br />
              purpose, not just
              <br />
              technology.
            </h2>

          </div>


          <div className="intro-content">

            <p className="lead">
              Shivam Bansal is an entrepreneur and the founder
              behind Mauksh and KaalDarpan.
            </p>

            <p>
              His work sits at the intersection of business,
              technology, digital experiences and Vedic astrology.
              The goal has never been to build another platform
              that simply produces information.
            </p>

            <p>
              It has been to build something people can actually
              find useful.
            </p>

            <p>
              That philosophy became the foundation for Mauksh
              and eventually led to the creation of KaalDarpan —
              a technology-driven approach to making Vedic
              astrology easier to access and understand.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          MAUKSH
      ========================= */}

      <section className="story-section">

        <div className="story-inner">

          <div className="story-number">
            01
          </div>

          <div className="story-content">

            <div className="story-label">
              MAUKSH
            </div>

            <h2>
              It started with
              <br />
              people.
            </h2>

            <p>
              Mauksh was built around a very simple idea:
              astrology should be approached with trust,
              responsibility and genuine human understanding.
            </p>

            <p>
              Instead of treating astrology as a collection of
              generic predictions, Mauksh focuses on the person
              behind the chart and the context behind the question.
            </p>

            <div className="quote">
              “Business is done for money,
              but providing value is more important.”
            </div>

          </div>

        </div>

      </section>


      {/* =========================
          KAALDARPAN
      ========================= */}

      <section className="section">

        <div className="section-line">

          <span>
            KAALDARPAN
          </span>

          <div />

        </div>


        <div className="intro-grid">

          <div className="intro-heading">

            <h2>
              Then came the
              <br />
              technology.
            </h2>

          </div>


          <div className="intro-content">

            <p className="lead">
              KaalDarpan is the next step in that journey.
            </p>

            <p>
              It is being built to bring the calculations,
              structure and accessibility of Vedic astrology
              into a modern digital experience.
            </p>

            <p>
              But technology is not meant to replace the
              understanding behind astrology.
            </p>

            <p>
              A birth chart contains far more than a collection
              of automatically generated sentences. Planetary
              strength, house lordship, dasha timing, nakshatras,
              yogas and the context of a person's life all matter.
            </p>

            <p>
              KaalDarpan is being built with that distinction
              in mind.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          PHILOSOPHY
      ========================= */}

      <section className="philosophy-section">

        <div className="philosophy-inner">

          <div className="eyebrow">
            THE PHILOSOPHY
          </div>

          <h2>
            Technology should
            <br />
            assist understanding.
          </h2>

          <p>
            Not replace it.
          </p>

        </div>

      </section>


      {/* =========================
          JOURNEY
      ========================= */}

      <section className="section journey-section">

        <div className="section-line">

          <span>
            THE JOURNEY
          </span>

          <div />

        </div>


        <div className="journey-grid">

          <div className="journey-card">

            <span className="journey-number">
              01
            </span>

            <h3>
              Entrepreneurship
            </h3>

            <p>
              Building businesses taught Shivam that products
              only matter when they create real value for the
              people using them.
            </p>

          </div>


          <div className="journey-card">

            <span className="journey-number">
              02
            </span>

            <h3>
              Mauksh
            </h3>

            <p>
              A venture built around personalised astrology,
              human interpretation and the importance of trust.
            </p>

          </div>


          <div className="journey-card">

            <span className="journey-number">
              03
            </span>

            <h3>
              KaalDarpan
            </h3>

            <p>
              A technology platform created to make Vedic
              astrology more accessible without stripping away
              its depth.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          CLOSING
      ========================= */}

      <section className="closing-section">

        <div className="closing-inner">

          <div className="eyebrow">
            WHY KAALDARPAN
          </div>

          <h2>
            Ancient knowledge.
            <br />
            Modern access.
          </h2>

          <p>
            KaalDarpan is Shivam Bansal's attempt to build a
            bridge between the depth of Vedic astrology and the
            simplicity people expect from modern technology.
          </p>

        </div>

      </section>


      <style jsx>{`

        /* =========================
           PAGE
        ========================= */

        .founder-page {
          min-height: 100vh;
          background: #f8f5ef;
          color: #29251f;
          padding-bottom: 90px;
        }


        /* =========================
           HERO
        ========================= */

        .founder-hero {
          max-width: 1080px;
          margin: 0 auto;
          padding: 70px 24px 85px;
        }

        .founder-hero-inner {
          display: grid;
          grid-template-columns: 1fr 430px;
          gap: 70px;
          align-items: center;
        }


        .eyebrow {
          margin-bottom: 20px;

          color: #a87935;

          font-size: 10px;
          font-weight: 700;

          letter-spacing: 2.5px;
        }


        .founder-intro h1 {
          margin: 0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: clamp(58px, 7vw, 82px);

          line-height: .95;

          font-weight: 600;

          letter-spacing: -3px;
        }


        .founder-role {
          margin: 20px 0 0;

          color: #60482f;

          font-size: 15px;

          font-weight: 600;
        }


        .hero-description {
          max-width: 530px;

          margin: 22px 0 0;

          color: #756f64;

          font-size: 16px;

          line-height: 1.8;
        }


        /* =========================
           PHOTO
        ========================= */

        .founder-photo {
          padding: 10px;

          background: #fffdf9;

          border: 1px solid #d9cdbb;

          box-shadow:
            0 18px 45px rgba(70, 50, 30, .08);
        }

        .founder-photo img {
          display: block;

          width: 100%;
          height: auto;

          max-height: 570px;

          object-fit: cover;
        }


        /* =========================
           SECTIONS
        ========================= */

        .section {
          max-width: 1080px;

          margin: 0 auto;

          padding: 30px 24px 85px;
        }


        .section-line {
          display: flex;

          align-items: center;

          gap: 15px;

          margin-bottom: 45px;
        }


        .section-line span {
          color: #6a5a42;

          font-size: 10px;

          font-weight: 700;

          letter-spacing: 1.5px;

          white-space: nowrap;
        }


        .section-line div {
          flex: 1;

          height: 1px;

          background: #c9b894;
        }


        /* =========================
           INTRO
        ========================= */

        .intro-grid {
          display: grid;

          grid-template-columns: 1fr 1fr;

          gap: 80px;
        }


        .intro-heading h2 {
          margin: 0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 40px;

          line-height: 1.18;

          font-weight: 600;

          letter-spacing: -1.2px;
        }


        .intro-content {
          max-width: 520px;
        }


        .intro-content p {
          margin: 0 0 22px;

          color: #4f4a43;

          font-size: 15px;

          line-height: 1.85;
        }


        .intro-content .lead {
          color: #29251f;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 22px;

          line-height: 1.45;
        }


        /* =========================
           STORY
        ========================= */

        .story-section {
          margin: 20px 0 80px;

          background: #29251f;

          color: #fff;
        }


        .story-inner {
          max-width: 1080px;

          margin: 0 auto;

          padding: 85px 24px;

          display: grid;

          grid-template-columns: 110px 1fr;

          gap: 55px;
        }


        .story-number {
          color: #a87935;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 18px;
        }


        .story-content {
          max-width: 700px;
        }


        .story-label {
          margin-bottom: 18px;

          color: #c9a76a;

          font-size: 10px;

          font-weight: 700;

          letter-spacing: 2px;
        }


        .story-content h2 {
          margin: 0 0 28px;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 52px;

          line-height: 1.05;

          font-weight: 500;

          letter-spacing: -1.5px;
        }


        .story-content p {
          max-width: 650px;

          margin: 0 0 20px;

          color: #d7d1c7;

          font-size: 15px;

          line-height: 1.8;
        }


        .quote {
          margin-top: 38px;

          padding-left: 20px;

          border-left: 2px solid #a87935;

          color: #fff;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 20px;

          line-height: 1.5;
        }


        /* =========================
           PHILOSOPHY
        ========================= */

        .philosophy-section {
          margin: 10px 0 80px;

          border-top: 1px solid #c9b894;

          border-bottom: 1px solid #c9b894;

          background: #fffdf9;
        }


        .philosophy-inner {
          max-width: 1080px;

          margin: 0 auto;

          padding: 90px 24px;
        }


        .philosophy-inner h2 {
          margin: 0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: clamp(45px, 6vw, 70px);

          line-height: 1.02;

          font-weight: 600;

          letter-spacing: -2px;
        }


        .philosophy-inner p {
          margin: 25px 0 0;

          color: #756f64;

          font-size: 18px;
        }


        /* =========================
           JOURNEY
        ========================= */

        .journey-grid {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 12px;
        }


        .journey-card {
          min-height: 260px;

          padding: 25px;

          background: #fffdf9;

          border: 1px solid #d9cdbb;

          border-radius: 14px;
        }


        .journey-number {
          display: block;

          margin-bottom: 45px;

          color: #a87935;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 18px;
        }


        .journey-card h3 {
          margin: 0 0 12px;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 23px;

          font-weight: 600;
        }


        .journey-card p {
          margin: 0;

          color: #625d55;

          font-size: 13px;

          line-height: 1.7;
        }


        /* =========================
           CLOSING
        ========================= */

        .closing-section {
          background: #29251f;

          color: #fff;

          margin-top: 20px;
        }


        .closing-inner {
          max-width: 1080px;

          margin: 0 auto;

          padding: 95px 24px;
        }


        .closing-inner .eyebrow {
          color: #c9a76a;
        }


        .closing-inner h2 {
          margin: 0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: clamp(48px, 6vw, 72px);

          line-height: 1.02;

          font-weight: 500;

          letter-spacing: -2px;
        }


        .closing-inner p {
          max-width: 600px;

          margin: 28px 0 0;

          color: #d7d1c7;

          font-size: 16px;

          line-height: 1.8;
        }


        /* =========================
           TABLET
        ========================= */

        @media (max-width: 850px) {

          .founder-hero-inner {
            grid-template-columns: 1fr 360px;

            gap: 40px;
          }

          .intro-grid {
            gap: 45px;
          }

          .journey-grid {
            grid-template-columns: 1fr;
          }

        }


        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 650px) {

          .founder-hero {
            padding: 48px 18px 60px;
          }

          .founder-hero-inner {
            grid-template-columns: 1fr;

            gap: 40px;
          }

          .founder-intro h1 {
            font-size: 58px;

            letter-spacing: -2px;
          }

          .hero-description {
            font-size: 14px;

            line-height: 1.75;
          }

          .section {
            padding-left: 18px;
            padding-right: 18px;
            padding-bottom: 60px;
          }

          .intro-grid {
            grid-template-columns: 1fr;

            gap: 30px;
          }

          .intro-heading h2 {
            font-size: 34px;
          }

          .story-inner {
            grid-template-columns: 1fr;

            gap: 20px;

            padding: 65px 18px;
          }

          .story-content h2 {
            font-size: 43px;
          }

          .philosophy-inner {
            padding: 70px 18px;
          }

          .philosophy-inner h2 {
            font-size: 45px;

            letter-spacing: -1.5px;
          }

          .closing-inner {
            padding: 70px 18px;
          }

          .closing-inner h2 {
            font-size: 47px;

            letter-spacing: -1.5px;
          }

        }


        @media (max-width: 380px) {

          .founder-intro h1 {
            font-size: 52px;
          }

          .story-content h2 {
            font-size: 39px;
          }

          .philosophy-inner h2 {
            font-size: 40px;
          }

          .closing-inner h2 {
            font-size: 42px;
          }

        }

      `}</style>

    </main>
  );
}