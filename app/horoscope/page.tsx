"use client";

import { useState } from "react";

const signs = [
  {
    name: "Aries",
    hindi: "Mesha",
    symbol: "♈",
    prediction:
      "A day to take initiative, but avoid rushing important decisions. Your confidence can help you move a stalled situation forward.",
    career:
      "A practical conversation with a senior or colleague can open a useful opportunity.",
  },
  {
    name: "Taurus",
    hindi: "Vrishabha",
    symbol: "♉",
    prediction:
      "Steady progress matters more than quick results today. Focus on what is already working instead of changing everything at once.",
    career:
      "Financial or professional matters benefit from patience and careful planning.",
  },
  {
    name: "Gemini",
    hindi: "Mithuna",
    symbol: "♊",
    prediction:
      "Your communication is your strongest asset today. The right conversation can clarify something that has been uncertain.",
    career:
      "Networking, meetings and written communication can bring useful professional movement.",
  },
  {
    name: "Cancer",
    hindi: "Karka",
    symbol: "♋",
    prediction:
      "Do not let temporary emotions decide a long-term matter. Give yourself enough space before responding.",
    career:
      "Keep your priorities clear and avoid taking responsibility for everyone else's work.",
  },
  {
    name: "Leo",
    hindi: "Simha",
    symbol: "♌",
    prediction:
      "Your presence gets noticed today. Use visibility wisely and let your work speak louder than your need for recognition.",
    career:
      "A leadership responsibility may come your way. Take ownership without becoming controlling.",
  },
  {
    name: "Virgo",
    hindi: "Kanya",
    symbol: "♍",
    prediction:
      "Small corrections can create a much bigger improvement. Today favours organisation and attention to detail.",
    career:
      "Review documents, plans and commitments before finalising anything important.",
  },
  {
    name: "Libra",
    hindi: "Tula",
    symbol: "♎",
    prediction:
      "Balance returns when you stop trying to please everyone. Make decisions based on what is actually sustainable for you.",
    career:
      "A professional partnership can improve through a direct and honest discussion.",
  },
  {
    name: "Scorpio",
    hindi: "Vrishchika",
    symbol: "♏",
    prediction:
      "Something beneath the surface deserves your attention. Trust observation, but do not jump to conclusions.",
    career:
      "Keep sensitive professional information private and focus on strategy rather than office politics.",
  },
  {
    name: "Sagittarius",
    hindi: "Dhanu",
    symbol: "♐",
    prediction:
      "A broader perspective helps you see possibilities that were easy to miss. Avoid limiting yourself because of one recent setback.",
    career:
      "Learning, travel, expansion or a new professional direction can become more relevant.",
  },
  {
    name: "Capricorn",
    hindi: "Makara",
    symbol: "♑",
    prediction:
      "Responsibility is high, but so is your ability to handle it. Take things one step at a time rather than carrying the entire future at once.",
    career:
      "Consistency can bring recognition. Keep building credibility through reliable work.",
  },
  {
    name: "Aquarius",
    hindi: "Kumbha",
    symbol: "♒",
    prediction:
      "A different approach may solve a problem that conventional methods have not. Give your original ideas some room.",
    career:
      "Technology, innovation and independent thinking can work strongly in your favour.",
  },
  {
    name: "Pisces",
    hindi: "Meena",
    symbol: "♓",
    prediction:
      "Your intuition is active, but practical facts still matter. Combine both before making an important choice.",
    career:
      "Do not underestimate your creative contribution. Someone may notice value that you have been taking for granted.",
  },
];

export default function HoroscopePage() {
  const [selectedSign, setSelectedSign] = useState<string | null>(null);

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="horoscope-page">

      {/* HERO */}

      <section className="horoscope-hero">
        <p className="eyebrow">VEDIC ASTROLOGY · DAILY GUIDANCE</p>

        <h1>
          Daily
          <br />
          Horoscope
        </h1>

        <p className="hero-date">{formattedDate}</p>

        <p className="hero-description">
          Planetary guidance for your day, interpreted through
          the principles of Vedic astrology.
        </p>
      </section>

      {/* ZODIAC */}

      <section className="zodiac-section">

        <div className="section-heading">
          <p className="section-label">TODAY'S SIGNS</p>

          <h2>
            Choose your
            <br />
            zodiac sign.
          </h2>
        </div>

        <div className="zodiac-grid">
          {signs.map((sign) => (
            <button
              key={sign.name}
              type="button"
              className={`zodiac-card ${
                selectedSign === sign.name ? "active" : ""
              }`}
              onClick={() => setSelectedSign(sign.name)}
            >
              <span className="zodiac-symbol">
                {sign.symbol}
              </span>

              <span className="zodiac-name">
                {sign.name}
              </span>

              <span className="zodiac-hindi">
                {sign.hindi}
              </span>
            </button>
          ))}
        </div>

      </section>

      {/* SELECTED HOROSCOPE */}

      {selectedSign && (
        <section className="prediction-section">

          {signs
            .filter((sign) => sign.name === selectedSign)
            .map((sign) => (
              <article
                key={sign.name}
                className="prediction-card"
              >
                <div className="prediction-top">

                  <div>
                    <p className="prediction-label">
                      DAILY HOROSCOPE
                    </p>

                    <h2>
                      {sign.symbol} {sign.name}
                    </h2>

                    <p className="prediction-hindi">
                      {sign.hindi}
                    </p>
                  </div>

                </div>

                <div className="prediction-body">

                  <p className="prediction-text">
                    {sign.prediction}
                  </p>

                  <div className="career-box">
                    <p>CAREER</p>

                    <span>
                      {sign.career}
                    </span>
                  </div>

                </div>
              </article>
            ))}

        </section>
      )}

      {/* ALL HOROSCOPES */}

      <section className="all-signs-section">

        <div className="section-heading">
          <p className="section-label">12 ZODIAC SIGNS</p>

          <h2>
            Today's
            <br />
            guidance.
          </h2>
        </div>

        <div className="horoscope-list">

          {signs.map((sign, index) => (
            <article
              className="horoscope-row"
              key={sign.name}
            >
              <div className="row-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="row-sign">
                <span className="row-symbol">
                  {sign.symbol}
                </span>

                <div>
                  <h3>{sign.name}</h3>
                  <span>{sign.hindi}</span>
                </div>
              </div>

              <p>{sign.prediction}</p>

              <button
                type="button"
                onClick={() => {
                  setSelectedSign(sign.name);
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                Read →
              </button>
            </article>
          ))}

        </div>

      </section>

      <style jsx>{`

        /* =====================================
           HOROSCOPE PAGE ONLY
           ===================================== */

        .horoscope-page {
          background: #f7f2e8;
          color: #211d19;
          min-height: 100vh;
        }

        .horoscope-hero {
          max-width: 1200px;
          margin: 0 auto;
          padding: 75px 42px 95px;
        }

        .eyebrow {
          margin: 0 0 55px;
          color: #a47735;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 4px;
        }

        .horoscope-hero h1 {
          margin: 0;
          font-family: "Playfair Display", serif;
          font-size: clamp(78px, 11vw, 150px);
          line-height: .87;
          letter-spacing: -5px;
          font-weight: 600;
        }

        .hero-date {
          margin: 48px 0 0;
          color: #766e64;
          font-size: 25px;
        }

        .hero-description {
          max-width: 650px;
          margin: 30px 0 0;
          color: #766e64;
          font-size: 19px;
          line-height: 1.65;
        }

        /* ZODIAC */

        .zodiac-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 42px 110px;
        }

        .section-heading {
          margin-bottom: 45px;
        }

        .section-label {
          margin: 0 0 18px;
          color: #a47735;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 3px;
        }

        .section-heading h2 {
          margin: 0;
          font-family: "Playfair Display", serif;
          font-size: clamp(48px, 6vw, 78px);
          line-height: .95;
          letter-spacing: -2px;
          font-weight: 600;
        }

        .zodiac-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .zodiac-card {
          min-height: 190px;
          padding: 30px 25px;
          border: 1px solid #d8cebd;
          border-radius: 4px;
          background: #fcfaf5;
          color: #211d19;
          text-align: left;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          cursor: pointer;
          transition: all .2s ease;
        }

        .zodiac-card:hover,
        .zodiac-card.active {
          background: #211d19;
          color: #f7f2e8;
          transform: translateY(-3px);
        }

        .zodiac-symbol {
          font-size: 42px;
          line-height: 1;
        }

        .zodiac-name {
          font-family: "Playfair Display", serif;
          font-size: 28px;
          font-weight: 600;
        }

        .zodiac-hindi {
          color: #8d857a;
          font-size: 14px;
        }

        .zodiac-card:hover .zodiac-hindi,
        .zodiac-card.active .zodiac-hindi {
          color: #bdb3a6;
        }

        /* SELECTED */

        .prediction-section {
          background: #211d19;
          color: #f7f2e8;
          padding: 90px 42px;
        }

        .prediction-card {
          max-width: 1100px;
          margin: 0 auto;
        }

        .prediction-label {
          margin: 0 0 18px;
          color: #b9955b;
          font-size: 14px;
          letter-spacing: 3px;
          font-weight: 600;
        }

        .prediction-top h2 {
          margin: 0;
          font-family: "Playfair Display", serif;
          font-size: clamp(55px, 7vw, 90px);
          line-height: 1;
          font-weight: 600;
        }

        .prediction-hindi {
          margin: 15px 0 0;
          color: #a9a095;
          font-size: 18px;
        }

        .prediction-body {
          max-width: 780px;
          margin-top: 55px;
        }

        .prediction-text {
          margin: 0;
          font-size: 25px;
          line-height: 1.6;
        }

        .career-box {
          margin-top: 45px;
          padding-top: 28px;
          border-top: 1px solid #4a443e;
        }

        .career-box p {
          margin: 0 0 12px;
          color: #b9955b;
          font-size: 13px;
          letter-spacing: 3px;
          font-weight: 600;
        }

        .career-box span {
          color: #c4bbb0;
          font-size: 18px;
          line-height: 1.6;
        }

        /* ALL SIGNS */

        .all-signs-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 100px 42px;
        }

        .horoscope-list {
          border-top: 1px solid #d8cebd;
        }

        .horoscope-row {
          display: grid;
          grid-template-columns: 55px 240px 1fr 90px;
          gap: 25px;
          align-items: center;
          padding: 30px 0;
          border-bottom: 1px solid #d8cebd;
        }

        .row-number {
          color: #a47735;
          font-size: 13px;
          letter-spacing: 1px;
        }

        .row-sign {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .row-symbol {
          font-size: 30px;
        }

        .row-sign h3 {
          margin: 0;
          font-family: "Playfair Display", serif;
          font-size: 25px;
          font-weight: 600;
        }

        .row-sign span {
          color: #8d857a;
          font-size: 13px;
        }

        .horoscope-row > p {
          margin: 0;
          color: #766e64;
          font-size: 16px;
          line-height: 1.55;
        }

        .horoscope-row button {
          border: 0;
          background: transparent;
          color: #211d19;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          text-align: right;
        }

        /* MOBILE */

        @media (max-width: 800px) {

          .horoscope-hero {
            padding: 58px 28px 70px;
          }

          .eyebrow {
            margin-bottom: 45px;
            font-size: 12px;
            letter-spacing: 2.5px;
          }

          .horoscope-hero h1 {
            font-size: clamp(70px, 20vw, 105px);
            letter-spacing: -3px;
          }

          .hero-date {
            margin-top: 35px;
            font-size: 20px;
          }

          .hero-description {
            font-size: 17px;
          }

          .zodiac-section {
            padding: 0 28px 80px;
          }

          .zodiac-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }

          .zodiac-card {
            min-height: 155px;
            padding: 22px 18px;
          }

          .zodiac-symbol {
            font-size: 34px;
          }

          .zodiac-name {
            font-size: 23px;
          }

          .prediction-section {
            padding: 70px 28px;
          }

          .prediction-text {
            font-size: 20px;
          }

          .all-signs-section {
            padding: 75px 28px;
          }

          .horoscope-row {
            grid-template-columns: 40px 1fr;
            gap: 15px;
          }

          .horoscope-row > p {
            grid-column: 2;
          }

          .horoscope-row button {
            grid-column: 2;
            text-align: left;
          }

        }

        @media (max-width: 430px) {

          .zodiac-grid {
            grid-template-columns: 1fr 1fr;
          }

          .zodiac-card {
            min-height: 145px;
          }

        }

      `}</style>
    </main>
  );
}