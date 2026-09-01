"use client";

import { useEffect, useMemo, useState } from "react";

type HoroscopeData = {
  date: string;
  aries: string;
  taurus: string;
  gemini: string;
  cancer: string;
  leo: string;
  virgo: string;
  libra: string;
  scorpio: string;
  sagittarius: string;
  capricorn: string;
  aquarius: string;
  pisces: string;
};

type Zodiac = {
  key: keyof Omit<HoroscopeData, "date">;
  name: string;
  hindi: string;
  symbol: string;
};

const zodiacSigns: Zodiac[] = [
  { key: "aries", name: "Aries", hindi: "Mesha", symbol: "♈" },
  { key: "taurus", name: "Taurus", hindi: "Vrishabha", symbol: "♉" },
  { key: "gemini", name: "Gemini", hindi: "Mithuna", symbol: "♊" },
  { key: "cancer", name: "Cancer", hindi: "Karka", symbol: "♋" },
  { key: "leo", name: "Leo", hindi: "Simha", symbol: "♌" },
  { key: "virgo", name: "Virgo", hindi: "Kanya", symbol: "♍" },
  { key: "libra", name: "Libra", hindi: "Tula", symbol: "♎" },
  {
    key: "scorpio",
    name: "Scorpio",
    hindi: "Vrishchika",
    symbol: "♏",
  },
  {
    key: "sagittarius",
    name: "Sagittarius",
    hindi: "Dhanu",
    symbol: "♐",
  },
  {
    key: "capricorn",
    name: "Capricorn",
    hindi: "Makara",
    symbol: "♑",
  },
  {
    key: "aquarius",
    name: "Aquarius",
    hindi: "Kumbha",
    symbol: "♒",
  },
  { key: "pisces", name: "Pisces", hindi: "Meena", symbol: "♓" },
];

const HOROSCOPE_URL =
  "https://raw.githubusercontent.com/theastrobhaiya-debug/Mauksh-data/main/Horoscope.json";

export default function HoroscopePage() {
  const [data, setData] = useState<HoroscopeData | null>(null);
  const [selected, setSelected] = useState<
    Zodiac["key"]
  >("aries");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchHoroscope() {
      try {
        setLoading(true);

        const response = await fetch(HOROSCOPE_URL, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load horoscope");
        }

        const json = (await response.json()) as HoroscopeData;

        setData(json);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchHoroscope();
  }, []);

  const currentSign = useMemo(
    () =>
      zodiacSigns.find(
        (sign) => sign.key === selected
      ),
    [selected]
  );

  const horoscope =
    data?.[selected] ?? "";

  return (
    <main className="kd-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="kd-hero">

        <div className="kd-hero-glow" />

        <div className="kd-hero-inner">

          <div className="kd-brand-row">

            <div className="kd-brand">
              Mauksh
            </div>

            <div className="kd-brand-line" />

            <div className="kd-brand-caption">
              VEDIC ASTROLOGY
            </div>

          </div>


          <div className="kd-hero-content">

            <div className="kd-hero-copy">

              <span className="kd-small-label">
                DAILY HOROSCOPE
              </span>

              <h1>
                Written in the
                <br />
                <em>stars.</em>
              </h1>

              <p>
                Your daily Vedic astrology
                guidance, interpreted through
                the planetary energies of the day.
              </p>

            </div>


            <div className="kd-hero-symbol">

              <div className="kd-orbit orbit-one" />
              <div className="kd-orbit orbit-two" />

              <span>✦</span>

            </div>

          </div>


          <div className="kd-hero-bottom">

            <span>
              {data?.date || "Loading date..."}
            </span>

            <span className="kd-scroll">
              SELECT YOUR RASHI ↓
            </span>

          </div>

        </div>

      </section>


      {/* =========================================
          SELECTOR
      ========================================= */}

      <section className="kd-selector-section">

        <div className="kd-selector-inner">

          <div className="kd-selector-heading">

            <span className="kd-number">
              01
            </span>

            <div>
              <span className="kd-section-label">
                YOUR ZODIAC
              </span>

              <h2>
                Choose your
                <br />
                <em>Rashi.</em>
              </h2>
            </div>

          </div>


          <div className="kd-select-wrap">

            <span className="kd-select-symbol">
              {currentSign?.symbol}
            </span>

            <select
              value={selected}
              onChange={(event) =>
                setSelected(
                  event.target.value as Zodiac["key"]
                )
              }
            >
              {zodiacSigns.map((sign) => (
                <option
                  key={sign.key}
                  value={sign.key}
                >
                  {sign.symbol} {sign.name} —{" "}
                  {sign.hindi}
                </option>
              ))}
            </select>

            <span className="kd-select-arrow">
              ↓
            </span>

          </div>

        </div>

      </section>


      {/* =========================================
          HOROSCOPE CONTENT
      ========================================= */}

      <section className="kd-reading-section">

        <div className="kd-reading-inner">

          {loading && (

            <div className="kd-state">
              <div className="kd-spinner" />
              <p>
                Reading the stars...
              </p>
            </div>

          )}


          {error && !loading && (

            <div className="kd-state">

              <span className="kd-state-icon">
                ✦
              </span>

              <h2>
                Horoscope unavailable
              </h2>

              <p>
                We couldn't load today's
                horoscope. Please refresh the page.
              </p>

            </div>

          )}


          {!loading &&
            !error &&
            data &&
            currentSign && (

              <article className="kd-reading">

                {/* READING HEADER */}

                <div className="kd-reading-header">

                  <div className="kd-reading-meta">

                    <span>
                      DAILY READING
                    </span>

                    <span>
                      {data.date}
                    </span>

                  </div>


                  <div className="kd-sign-display">

                    <div className="kd-sign-icon">
                      {currentSign.symbol}
                    </div>

                    <div>

                      <h2>
                        {currentSign.name}
                      </h2>

                      <p>
                        {currentSign.hindi}
                      </p>

                    </div>

                  </div>


                  <div className="kd-reading-mark">
                    ✦
                  </div>

                </div>


                {/* ORIGINAL MAUKSH CONTENT */}

                <div
                  className="kd-mauksh-content"
                  dangerouslySetInnerHTML={{
                    __html: horoscope,
                  }}
                />

              </article>

            )}

        </div>

      </section>


      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="kd-footer">

        <div className="kd-footer-inner">

          <div>

            <div className="kd-footer-brand">
              Mauksh
            </div>

            <p>
              Ancient wisdom.
              <br />
              Modern perspective.
            </p>

          </div>

          <div className="kd-footer-symbol">
            ✦
          </div>

        </div>

      </footer>


      <style jsx>{`

        /* =====================================
           ROOT
        ===================================== */

        .kd-page {
          min-height: 100vh;

          background:
            #f3eee4;

          color:
            #171512;

          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }


        /* =====================================
           HERO
        ===================================== */

        .kd-hero {
          position: relative;

          overflow: hidden;

          background:
            #181613;

          color:
            #f4eee3;
        }

        .kd-hero-glow {
          position: absolute;

          width: 650px;
          height: 650px;

          top: -350px;
          right: -120px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(184, 144, 76, .16),
              transparent 68%
            );

          pointer-events: none;
        }

        .kd-hero-inner {
          position: relative;

          max-width: 1240px;

          margin: 0 auto;

          padding:
            30px 40px
            45px;
        }

        .kd-brand-row {
          display: flex;

          align-items: center;

          gap: 16px;
        }

        .kd-brand {
          color:
            #c3a166;

          font-size: 12px;

          font-weight: 700;

          letter-spacing: 4px;
        }

        .kd-brand-line {
          width: 50px;

          height: 1px;

          background:
            #4c463d;
        }

        .kd-brand-caption {
          color:
            #837d73;

          font-size: 9px;

          letter-spacing: 2px;
        }


        .kd-hero-content {
          min-height: 560px;

          display: grid;

          grid-template-columns:
            1fr 400px;

          align-items: center;

          gap: 80px;
        }

        .kd-small-label {
          display: block;

          margin-bottom: 22px;

          color:
            #b28b4e;

          font-size: 11px;

          font-weight: 700;

          letter-spacing: 3px;
        }

        .kd-hero-copy h1 {
          margin: 0;

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-size:
            clamp(70px, 9vw, 125px);

          line-height: .86;

          letter-spacing: -5px;

          font-weight: 500;
        }

        .kd-hero-copy h1 em {
          color:
            #c5a66e;

          font-style: italic;
        }

        .kd-hero-copy p {
          max-width: 470px;

          margin: 35px 0 0;

          color:
            #a6a096;

          font-size: 16px;

          line-height: 1.75;
        }


        /* ORBIT */

        .kd-hero-symbol {
          position: relative;

          width: 330px;
          height: 330px;

          margin: auto;

          display: flex;

          align-items: center;
          justify-content: center;

          color:
            #c5a66e;

          font-size: 45px;
        }

        .kd-orbit {
          position: absolute;

          border: 1px solid
            rgba(197,166,110,.28);

          border-radius: 50%;
        }

        .orbit-one {
          width: 250px;
          height: 250px;

          transform:
            rotate(-28deg)
            scaleX(.7);
        }

        .orbit-two {
          width: 330px;
          height: 330px;

          transform:
            rotate(42deg)
            scaleX(.55);
        }

        .kd-hero-symbol span {
          position: relative;

          z-index: 2;
        }


        .kd-hero-bottom {
          padding-top: 25px;

          border-top:
            1px solid #35312d;

          display: flex;

          justify-content: space-between;

          color:
            #8d877e;

          font-size: 11px;

          letter-spacing: 2px;
        }

        .kd-scroll {
          color:
            #b28b4e;
        }


        /* =====================================
           SELECTOR
        ===================================== */

        .kd-selector-section {
          background:
            #eee8dd;

          border-bottom:
            1px solid #d7cec0;
        }

        .kd-selector-inner {
          max-width: 1240px;

          margin: 0 auto;

          padding:
            90px 40px;

          display: grid;

          grid-template-columns:
            1fr 1fr;

          gap: 80px;

          align-items: center;
        }

        .kd-selector-heading {
          display: flex;

          gap: 25px;
        }

        .kd-number {
          color:
            #a27a3e;

          font-size: 11px;

          letter-spacing: 2px;
        }

        .kd-section-label {
          display: block;

          margin-bottom: 15px;

          color:
            #a27a3e;

          font-size: 10px;

          font-weight: 700;

          letter-spacing: 3px;
        }

        .kd-selector-heading h2 {
          margin: 0;

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-size:
            clamp(50px, 6vw, 75px);

          line-height: .92;

          letter-spacing: -3px;

          font-weight: 500;
        }

        .kd-selector-heading h2 em {
          color:
            #a27a3e;

          font-style: italic;
        }


        .kd-select-wrap {
          position: relative;

          display: flex;

          align-items: center;
        }

        .kd-select-symbol {
          position: absolute;

          left: 25px;

          z-index: 2;

          color:
            #a27a3e;

          font-size: 30px;

          pointer-events: none;
        }

        .kd-select-wrap select {
          width: 100%;

          height: 82px;

          padding:
            0 60px
            0 75px;

          border:
            1px solid #cfc5b6;

          border-radius: 0;

          outline: none;

          appearance: none;

          background:
            #f8f4ec;

          color:
            #211d19;

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-size: 23px;

          cursor: pointer;
        }

        .kd-select-wrap select:focus {
          border-color:
            #a27a3e;
        }

        .kd-select-arrow {
          position: absolute;

          right: 27px;

          color:
            #a27a3e;

          font-size: 20px;

          pointer-events: none;
        }


        /* =====================================
           READING
        ===================================== */

        .kd-reading-section {
          background:
            #f3eee4;
        }

        .kd-reading-inner {
          max-width: 1080px;

          margin: 0 auto;

          padding:
            100px 40px
            120px;
        }


        .kd-reading-header {
          padding-bottom: 45px;

          border-bottom:
            1px solid #d5ccbd;

          display: flex;

          align-items: flex-end;

          justify-content: space-between;

          gap: 30px;
        }

        .kd-reading-meta {
          display: flex;

          flex-direction: column;

          gap: 9px;

          color:
            #9b9388;

          font-size: 9px;

          letter-spacing: 2px;
        }

        .kd-reading-meta span:first-child {
          color:
            #a27a3e;

          font-weight: 700;
        }

        .kd-sign-display {
          display: flex;

          align-items: center;

          gap: 20px;
        }

        .kd-sign-icon {
          width: 70px;
          height: 70px;

          display: flex;

          align-items: center;
          justify-content: center;

          border:
            1px solid #cfc5b6;

          color:
            #a27a3e;

          font-size: 38px;
        }

        .kd-sign-display h2 {
          margin: 0;

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-size: 48px;

          line-height: 1;

          font-weight: 500;
        }

        .kd-sign-display p {
          margin: 7px 0 0;

          color:
            #8b847a;

          font-size: 12px;
        }

        .kd-reading-mark {
          color:
            #a27a3e;

          font-size: 20px;
        }


        /* =====================================
           MAUKSH CONTENT
        ===================================== */

        .kd-mauksh-content {
          padding-top: 55px;
        }

        .kd-mauksh-content :global(h3) {
          margin:
            0 0 40px;

          color:
            #171512;

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-size:
            clamp(30px, 5vw, 45px);

          font-weight: 500;

          line-height: 1.1;
        }

        .kd-mauksh-content :global(p) {
          margin:
            0 0 30px;

          color:
            #4f4941;

          font-size: 17px;

          line-height: 1.9;
        }

        .kd-mauksh-content :global(p::first-letter) {
          color:
            #a27a3e;
        }

        .kd-mauksh-content :global(p.truth) {
          position: relative;

          margin-top: 55px;

          padding:
            32px 35px;

          border:
            1px solid #cfc2ae;

          background:
            #ece5d8;

          color:
            #29241e;

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-size: 20px;

          line-height: 1.65;
        }


        /* =====================================
           LOADING
        ===================================== */

        .kd-state {
          min-height: 450px;

          display: flex;

          flex-direction: column;

          align-items: center;
          justify-content: center;

          text-align: center;
        }

        .kd-spinner {
          width: 34px;
          height: 34px;

          border:
            2px solid #d5ccbd;

          border-top-color:
            #a27a3e;

          border-radius: 50%;

          animation:
            kd-spin .8s linear infinite;
        }

        @keyframes kd-spin {
          to {
            transform: rotate(360deg);
          }
        }

        .kd-state p {
          margin-top: 18px;

          color:
            #827b71;

          font-size: 14px;
        }

        .kd-state-icon {
          color:
            #a27a3e;

          font-size: 28px;
        }

        .kd-state h2 {
          margin:
            15px 0 0;

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-size: 40px;

          font-weight: 500;
        }


        /* =====================================
           FOOTER
        ===================================== */

        .kd-footer {
          background:
            #181613;

          color:
            #eee7dc;
        }

        .kd-footer-inner {
          max-width: 1240px;

          margin: 0 auto;

          padding:
            45px 40px;

          display: flex;

          align-items: center;

          justify-content: space-between;
        }

        .kd-footer-brand {
          color:
            #c3a166;

          font-size: 11px;

          font-weight: 700;

          letter-spacing: 4px;
        }

        .kd-footer p {
          margin: 10px 0 0;

          color:
            #777169;

          font-size: 12px;

          line-height: 1.6;
        }

        .kd-footer-symbol {
          color:
            #a27a3e;

          font-size: 25px;
        }


        /* =====================================
           MOBILE
        ===================================== */

        @media (max-width: 800px) {

          .kd-hero-inner {
            padding:
              25px 22px
              30px;
          }

          .kd-brand {
            font-size: 10px;
            letter-spacing: 3px;
          }

          .kd-brand-caption {
            display: none;
          }

          .kd-hero-content {
            min-height: auto;

            grid-template-columns: 1fr;

            gap: 50px;

            padding:
              85px 0
              65px;
          }

          .kd-hero-copy h1 {
            font-size:
              clamp(58px, 17vw, 88px);

            letter-spacing: -3px;
          }

          .kd-hero-copy p {
            margin-top: 28px;

            font-size: 15px;
          }

          .kd-hero-symbol {
            width: 210px;
            height: 210px;

            font-size: 35px;
          }

          .orbit-one {
            width: 165px;
            height: 165px;
          }

          .orbit-two {
            width: 210px;
            height: 210px;
          }

          .kd-hero-bottom {
            font-size: 9px;

            letter-spacing: 1.5px;
          }

          .kd-scroll {
            display: none;
          }


          /* SELECTOR */

          .kd-selector-inner {
            display: block;

            padding:
              65px 22px
              70px;
          }

          .kd-selector-heading {
            margin-bottom: 35px;
          }

          .kd-selector-heading h2 {
            font-size: 52px;
          }

          .kd-select-wrap select {
            height: 68px;

            padding-left: 65px;

            font-size: 20px;
          }


          /* READING */

          .kd-reading-inner {
            padding:
              65px 22px
              80px;
          }

          .kd-reading-header {
            align-items: flex-start;

            flex-direction: column;

            gap: 25px;
          }

          .kd-reading-meta {
            order: 2;
          }

          .kd-sign-display {
            order: 1;
          }

          .kd-reading-mark {
            display: none;
          }

          .kd-sign-icon {
            width: 58px;
            height: 58px;

            font-size: 30px;
          }

          .kd-sign-display h2 {
            font-size: 38px;
          }

          .kd-mauksh-content {
            padding-top: 40px;
          }

          .kd-mauksh-content :global(h3) {
            font-size: 31px;

            margin-bottom: 30px;
          }

          .kd-mauksh-content :global(p) {
            font-size: 16px;

            line-height: 1.8;

            margin-bottom: 25px;
          }

          .kd-mauksh-content :global(p.truth) {
            padding:
              23px;

            font-size: 18px;
          }


          /* FOOTER */

          .kd-footer-inner {
            padding:
              35px 22px;
          }

        }

      `}</style>

    </main>
  );
}