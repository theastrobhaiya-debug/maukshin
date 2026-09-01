"use client";

import { useEffect, useMemo, useState } from "react";

type HoroscopeData = {
  date: string;
  [key: string]: string;
};

type Sign = {
  name: string;
  hindi: string;
  symbol: string;
  key: string;
  html: string;
};

const signsMeta = [
  {
    name: "Aries",
    hindi: "Mesha",
    symbol: "♈",
    key: "aries",
  },
  {
    name: "Taurus",
    hindi: "Vrishabha",
    symbol: "♉",
    key: "taurus",
  },
  {
    name: "Gemini",
    hindi: "Mithuna",
    symbol: "♊",
    key: "gemini",
  },
  {
    name: "Cancer",
    hindi: "Karka",
    symbol: "♋",
    key: "cancer",
  },
  {
    name: "Leo",
    hindi: "Simha",
    symbol: "♌",
    key: "leo",
  },
  {
    name: "Virgo",
    hindi: "Kanya",
    symbol: "♍",
    key: "virgo",
  },
  {
    name: "Libra",
    hindi: "Tula",
    symbol: "♎",
    key: "libra",
  },
  {
    name: "Scorpio",
    hindi: "Vrishchika",
    symbol: "♏",
    key: "scorpio",
  },
  {
    name: "Sagittarius",
    hindi: "Dhanu",
    symbol: "♐",
    key: "sagittarius",
  },
  {
    name: "Capricorn",
    hindi: "Makara",
    symbol: "♑",
    key: "capricorn",
  },
  {
    name: "Aquarius",
    hindi: "Kumbha",
    symbol: "♒",
    key: "aquarius",
  },
  {
    name: "Pisces",
    hindi: "Meena",
    symbol: "♓",
    key: "pisces",
  },
];

const HOROSCOPE_URL =
  "https://raw.githubusercontent.com/theastrobhaiya-debug/Mauksh-data/main/Horoscope.json";

function stripHtml(value: string) {
  if (!value) return "";

  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function getFirstParagraph(html: string) {
  if (!html) return "";

  const match = html.match(/<p[^>]*>(.*?)<\/p>/is);

  if (!match) {
    return stripHtml(html);
  }

  return stripHtml(match[1]);
}

function getSection(html: string, label: string) {
  if (!html) return "";

  const regex = new RegExp(
    `<p[^>]*>\\s*${label}\\s*:?\\s*(.*?)<\\/p>`,
    "is"
  );

  const match = html.match(regex);

  if (match) {
    return stripHtml(match[1]);
  }

  const paragraphRegex = /<p[^>]*>(.*?)<\/p>/gis;

  const paragraphs = [...html.matchAll(paragraphRegex)];

  const found = paragraphs.find((item) =>
    stripHtml(item[1]).toLowerCase().startsWith(label.toLowerCase())
  );

  if (!found) return "";

  return stripHtml(found[1]).replace(
    new RegExp(`^${label}\\s*:?\\s*`, "i"),
    ""
  );
}

function getTruth(html: string) {
  if (!html) return "";

  const truthMatch = html.match(
    /<p[^>]*class=["']truth["'][^>]*>(.*?)<\/p>/is
  );

  if (truthMatch) {
    return stripHtml(truthMatch[1]);
  }

  const paragraphs = [...html.matchAll(/<p[^>]*>(.*?)<\/p>/gis)];

  const truth = paragraphs.find((item) =>
    stripHtml(item[1])
      .toLowerCase()
      .includes("mauksh truth")
  );

  if (!truth) return "";

  return stripHtml(truth[1])
    .replace(/mauksh truth\s*:?\s*/i, "")
    .trim();
}

function formatDate(dateString: string) {
  if (!dateString) return "";

  const date = new Date(`${dateString}T12:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function HoroscopePage() {
  const [data, setData] = useState<HoroscopeData | null>(null);
  const [selectedSign, setSelectedSign] = useState("aries");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHoroscope() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(HOROSCOPE_URL, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `Horoscope request failed: ${response.status}`
          );
        }

        const json = (await response.json()) as HoroscopeData;

        setData(json);
      } catch (err) {
        console.error("Horoscope loading error:", err);

        setError(
          "Unable to load today's horoscope. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    loadHoroscope();
  }, []);

  const signs: Sign[] = useMemo(() => {
    if (!data) return [];

    return signsMeta.map((sign) => ({
      ...sign,
      html: data[sign.key] || "",
    }));
  }, [data]);

  const selected = signs.find(
    (sign) => sign.key === selectedSign
  );

  function selectSign(key: string) {
    setSelectedSign(key);
  }

  function scrollToReading(key: string) {
    setSelectedSign(key);

    window.setTimeout(() => {
      const reading = document.querySelector(
        ".kd-reading"
      );

      if (reading) {
        reading.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 50);
  }

  if (loading) {
    return (
      <main className="kd-horoscope">
        <div className="kd-loading">
          <div className="kd-loader" />

          <p>Reading today's stars...</p>
        </div>

        <style jsx>{styles}</style>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="kd-horoscope">
        <div className="kd-error">
          <span className="kd-error-symbol">✦</span>

          <h1>Horoscope unavailable</h1>

          <p>
            {error ||
              "Today's horoscope could not be loaded."}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>

        <style jsx>{styles}</style>
      </main>
    );
  }

  return (
    <main className="kd-horoscope">

      {/* =================================
          HERO
      ================================= */}

      <section className="kd-hero">
        <div className="kd-hero-inner">

          <div className="kd-eyebrow">
            <span>KAALDARPAN</span>
            <i>•</i>
            <span>VEDIC HOROSCOPE</span>
          </div>

          <div className="kd-hero-grid">

            <div className="kd-hero-main">
              <p className="kd-overline">
                DAILY GUIDANCE
              </p>

              <h1>
                Your day,
                <br />
                written in the stars.
              </h1>
            </div>

            <div className="kd-hero-side">

              <div className="kd-date-mark">
                <span>HOROSCOPE FOR</span>

                <strong>
                  {formatDate(data.date)}
                </strong>
              </div>

              <p>
                Vedic guidance for the energies,
                opportunities and lessons shaping
                your day.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =================================
          ZODIAC
      ================================= */}

      <section className="kd-signs">

        <div className="kd-section-head">

          <div>
            <p className="kd-label">
              CHOOSE YOUR RASHI
            </p>

            <h2>
              Find your
              <br />
              daily guidance.
            </h2>
          </div>

          <p className="kd-section-copy">
            Select your zodiac sign to explore
            today's horoscope and planetary
            guidance.
          </p>

        </div>


        <div className="kd-zodiac-grid">

          {signs.map((sign, index) => (

            <button
              key={sign.key}
              type="button"
              className={`kd-zodiac-card ${
                selectedSign === sign.key
                  ? "active"
                  : ""
              }`}
              onClick={() => selectSign(sign.key)}
            >

              <span className="kd-zodiac-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="kd-symbol">
                {sign.symbol}
              </span>

              <span className="kd-sign-name">
                {sign.name}
              </span>

              <span className="kd-sign-hindi">
                {sign.hindi}
              </span>

            </button>

          ))}

        </div>

      </section>


      {/* =================================
          SELECTED READING
      ================================= */}

      {selected && (

        <section className="kd-reading">

          <div className="kd-reading-inner">

            <div className="kd-reading-heading">

              <div className="kd-reading-sign">

                <div className="kd-reading-symbol">
                  {selected.symbol}
                </div>

                <div>

                  <p className="kd-label">
                    TODAY'S HOROSCOPE
                  </p>

                  <h2>
                    {selected.name}
                  </h2>

                  <span>
                    {selected.hindi}
                  </span>

                </div>

              </div>

              <div className="kd-reading-index">
                {String(
                  signs.findIndex(
                    (sign) =>
                      sign.key === selected.key
                  ) + 1
                ).padStart(2, "0")}

                <small>/ 12</small>
              </div>

            </div>


            <div className="kd-reading-content">

              {/* INTRO */}

              <div className="kd-reading-intro">

                <span className="kd-intro-icon">
                  ✦
                </span>

                <p>
                  {getFirstParagraph(selected.html)}
                </p>

              </div>


              {/* TOPICS */}

              <div className="kd-topic-grid">

                <div className="kd-topic">

                  <span>01</span>

                  <div>
                    <h3>Career</h3>

                    <p>
                      {getSection(
                        selected.html,
                        "💼 Career"
                      ) ||
                        getSection(
                          selected.html,
                          "Career"
                        ) ||
                        "Career guidance is available in today's horoscope."
                      }
                    </p>
                  </div>

                </div>


                <div className="kd-topic">

                  <span>02</span>

                  <div>
                    <h3>Love</h3>

                    <p>
                      {getSection(
                        selected.html,
                        "❤️ Love"
                      ) ||
                        getSection(
                          selected.html,
                          "Love"
                        ) ||
                        "Love and relationship guidance is available in today's horoscope."
                      }
                    </p>
                  </div>

                </div>


                <div className="kd-topic">

                  <span>03</span>

                  <div>
                    <h3>Money</h3>

                    <p>
                      {getSection(
                        selected.html,
                        "💰 Money"
                      ) ||
                        getSection(
                          selected.html,
                          "Money"
                        ) ||
                        "Financial guidance is available in today's horoscope."
                      }
                    </p>
                  </div>

                </div>


                <div className="kd-topic">

                  <span>04</span>

                  <div>
                    <h3>Advice</h3>

                    <p>
                      {getSection(
                        selected.html,
                        "🧘 Advice"
                      ) ||
                        getSection(
                          selected.html,
                          "Advice"
                        ) ||
                        "Follow the practical guidance given in today's horoscope."
                      }
                    </p>
                  </div>

                </div>

              </div>


              {/* MAUKSH TRUTH */}

              {getTruth(selected.html) && (

                <div className="kd-truth">

                  <div className="kd-truth-symbol">
                    ⚡
                  </div>

                  <div>

                    <span>
                      MAUKSH TRUTH
                    </span>

                    <p>
                      {getTruth(selected.html)}
                    </p>

                  </div>

                </div>

              )}

            </div>

          </div>

        </section>

      )}


      {/* =================================
          ALL SIGNS
      ================================= */}

      <section className="kd-all">

        <div className="kd-all-head">

          <div>

            <p className="kd-label">
              12 RASHIS
            </p>

            <h2>
              Today's
              <br />
              complete sky.
            </h2>

          </div>

          <p>
            Explore every zodiac sign and
            discover the guidance written
            for today.
          </p>

        </div>


        <div className="kd-list">

          {signs.map((sign, index) => (

            <article
              key={sign.key}
              className={`kd-row ${
                selectedSign === sign.key
                  ? "selected"
                  : ""
              }`}
            >

              <div className="kd-row-number">
                {String(index + 1).padStart(2, "0")}
              </div>


              <button
                type="button"
                className="kd-row-sign"
                onClick={() =>
                  scrollToReading(sign.key)
                }
              >

                <span>
                  {sign.symbol}
                </span>

                <div>

                  <strong>
                    {sign.name}
                  </strong>

                  <small>
                    {sign.hindi}
                  </small>

                </div>

              </button>


              <p>
                {getFirstParagraph(sign.html)}
              </p>


              <button
                type="button"
                className="kd-read"
                onClick={() =>
                  scrollToReading(sign.key)
                }
              >
                Read
                <span>→</span>
              </button>

            </article>

          ))}

        </div>

      </section>


      {/* =================================
          FOOTER NOTE
      ================================= */}

      <section className="kd-footer-note">

        <div>
          <span>KAALDARPAN</span>

          <p>
            Vedic wisdom for the modern day.
          </p>
        </div>

        <span className="kd-footer-star">
          ✦
        </span>

      </section>


      <style jsx>{styles}</style>

    </main>
  );
}


const styles = `

/* =====================================
   KAALDARPAN HOROSCOPE
===================================== */

.kd-horoscope {
  --paper: #f5f0e7;
  --paper-light: #faf7f0;
  --ink: #171512;
  --muted: #756e63;
  --line: #d8d0c2;
  --gold: #a27a3e;
  --gold-light: #c6a56d;

  min-height: 100vh;

  background: var(--paper);
  color: var(--ink);

  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}


/* =====================================
   LOADING
===================================== */

.kd-loading {
  min-height: 70vh;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 20px;

  color: var(--muted);
}

.kd-loader {
  width: 34px;
  height: 34px;

  border: 2px solid var(--line);
  border-top-color: var(--gold);

  border-radius: 50%;

  animation:
    kd-spin .8s linear infinite;
}

@keyframes kd-spin {
  to {
    transform: rotate(360deg);
  }
}


/* =====================================
   ERROR
===================================== */

.kd-error {
  min-height: 70vh;

  padding: 40px;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  text-align: center;
}

.kd-error-symbol {
  color: var(--gold);
  font-size: 28px;
}

.kd-error h1 {
  margin: 16px 0 10px;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: 48px;
  font-weight: 500;
}

.kd-error p {
  margin: 0;

  color: var(--muted);
}

.kd-error button {
  margin-top: 25px;

  padding: 12px 24px;

  border: 1px solid var(--ink);

  background: var(--ink);
  color: var(--paper);

  cursor: pointer;
}


/* =====================================
   HERO
===================================== */

.kd-hero {
  border-bottom: 1px solid var(--line);
}

.kd-hero-inner {
  max-width: 1280px;

  margin: 0 auto;

  padding: 34px 42px 105px;
}

.kd-eyebrow {
  display: flex;
  align-items: center;

  gap: 12px;

  color: var(--gold);

  font-size: 11px;
  font-weight: 700;

  letter-spacing: 3px;
}

.kd-eyebrow i {
  color: var(--line);
  font-style: normal;
}

.kd-hero-grid {
  margin-top: 95px;

  display: grid;

  grid-template-columns:
    minmax(0, 1.5fr)
    minmax(260px, .65fr);

  gap: 80px;

  align-items: end;
}

.kd-overline,
.kd-label {
  margin: 0 0 16px;

  color: var(--gold);

  font-size: 11px;
  font-weight: 700;

  letter-spacing: 3px;
}

.kd-hero h1 {
  margin: 0;

  max-width: 900px;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size:
    clamp(64px, 9vw, 132px);

  line-height: .88;

  letter-spacing: -5px;

  font-weight: 500;
}

.kd-hero-side {
  padding-left: 35px;

  border-left: 1px solid var(--line);
}

.kd-date-mark {
  display: flex;
  flex-direction: column;

  gap: 8px;
}

.kd-date-mark span {
  color: var(--muted);

  font-size: 10px;
  letter-spacing: 2px;
}

.kd-date-mark strong {
  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: 25px;

  font-weight: 500;
}

.kd-hero-side > p {
  max-width: 360px;

  margin: 28px 0 0;

  color: var(--muted);

  font-size: 15px;
  line-height: 1.7;
}


/* =====================================
   ZODIAC
===================================== */

.kd-signs {
  max-width: 1280px;

  margin: 0 auto;

  padding:
    100px
    42px
    120px;
}

.kd-section-head {
  margin-bottom: 48px;

  display: flex;

  justify-content: space-between;

  gap: 60px;

  align-items: end;
}

.kd-section-head h2,
.kd-all-head h2 {
  margin: 0;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size:
    clamp(50px, 6vw, 78px);

  line-height: .92;

  letter-spacing: -2px;

  font-weight: 500;
}

.kd-section-copy {
  max-width: 340px;

  margin: 0;

  color: var(--muted);

  font-size: 15px;
  line-height: 1.7;
}

.kd-zodiac-grid {
  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 12px;
}

.kd-zodiac-card {
  min-height: 190px;

  padding: 25px;

  border: 1px solid var(--line);
  border-radius: 2px;

  background: var(--paper-light);
  color: var(--ink);

  text-align: left;

  display: flex;
  flex-direction: column;

  align-items: flex-start;
  justify-content: space-between;

  cursor: pointer;

  transition:
    transform .25s ease,
    background .25s ease,
    color .25s ease,
    border-color .25s ease;
}

.kd-zodiac-card:hover {
  transform: translateY(-4px);

  border-color: var(--gold);
}

.kd-zodiac-card.active {
  background: var(--ink);

  border-color: var(--ink);

  color: var(--paper);

  transform: translateY(-4px);
}

.kd-zodiac-number {
  color: var(--gold);

  font-size: 10px;

  letter-spacing: 2px;
}

.kd-symbol {
  font-size: 42px;
  line-height: 1;
}

.kd-sign-name {
  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: 27px;

  font-weight: 500;
}

.kd-sign-hindi {
  color: var(--muted);

  font-size: 12px;
}

.kd-zodiac-card.active
.kd-sign-hindi {
  color: #aaa399;
}


/* =====================================
   READING
===================================== */

.kd-reading {
  background: var(--ink);

  color: var(--paper);
}

.kd-reading-inner {
  max-width: 1280px;

  margin: 0 auto;

  padding:
    100px
    42px
    115px;
}

.kd-reading-heading {
  padding-bottom: 65px;

  display: flex;

  justify-content: space-between;

  align-items: flex-start;

  border-bottom:
    1px solid #3a3732;
}

.kd-reading-sign {
  display: flex;

  gap: 28px;

  align-items: center;
}

.kd-reading-symbol {
  width: 82px;
  height: 82px;

  flex-shrink: 0;

  border: 1px solid #4b463f;

  display: flex;

  align-items: center;
  justify-content: center;

  font-size: 42px;
}

.kd-reading-sign h2 {
  margin: 0;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size:
    clamp(55px, 7vw, 90px);

  line-height: .85;

  font-weight: 500;

  letter-spacing: -3px;
}

.kd-reading-sign > div > span {
  display: block;

  margin-top: 12px;

  color: #989187;

  font-size: 14px;
}

.kd-reading-heading
.kd-label {
  color: var(--gold-light);
}

.kd-reading-index {
  color: var(--gold-light);

  font-size: 22px;

  letter-spacing: 2px;
}

.kd-reading-index small {
  color: #6d675e;

  font-size: 11px;
}

.kd-reading-content {
  max-width: 1080px;

  margin:
    65px
    auto
    0;
}

.kd-reading-intro {
  padding-bottom: 65px;

  display: grid;

  grid-template-columns:
    60px
    minmax(0, 1fr);

  gap: 25px;

  border-bottom:
    1px solid #3a3732;
}

.kd-intro-icon {
  color: var(--gold-light);

  font-size: 25px;
}

.kd-reading-intro p {
  max-width: 900px;

  margin: 0;

  color: #ddd7cc;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size:
    clamp(22px, 2.2vw, 31px);

  line-height: 1.45;
}


/* =====================================
   TOPICS
===================================== */

.kd-topic-grid {
  display: grid;

  grid-template-columns: 1fr 1fr;

  border-bottom:
    1px solid #3a3732;
}

.kd-topic {
  min-width: 0;

  padding:
    48px
    45px
    48px
    0;

  display: grid;

  grid-template-columns:
    42px
    minmax(0, 1fr);

  gap: 22px;
}

.kd-topic:nth-child(2n) {
  padding-left: 45px;

  border-left:
    1px solid #3a3732;
}

.kd-topic:nth-child(n + 3) {
  border-top:
    1px solid #3a3732;
}

.kd-topic > span {
  color: var(--gold-light);

  font-size: 10px;

  letter-spacing: 1px;
}

.kd-topic h3 {
  margin: 0 0 15px;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: 27px;

  font-weight: 500;
}

.kd-topic p {
  margin: 0;

  color: #aaa39a;

  font-size: 15px;

  line-height: 1.75;
}


/* =====================================
   MAUKSH TRUTH
===================================== */

.kd-truth {
  margin-top: 65px;

  padding: 30px;

  display: grid;

  grid-template-columns:
    48px
    minmax(0, 1fr);

  gap: 20px;

  border: 1px solid #514a41;
}

.kd-truth-symbol {
  color: var(--gold-light);

  font-size: 25px;
}

.kd-truth span {
  color: var(--gold-light);

  font-size: 10px;

  font-weight: 700;

  letter-spacing: 3px;
}

.kd-truth p {
  margin: 12px 0 0;

  color: #ddd7cc;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: 20px;

  line-height: 1.5;
}


/* =====================================
   ALL SIGNS
===================================== */

.kd-all {
  max-width: 1280px;

  margin: 0 auto;

  padding:
    110px
    42px;
}

.kd-all-head {
  margin-bottom: 55px;

  display: flex;

  justify-content: space-between;

  align-items: end;

  gap: 60px;
}

.kd-all-head > p {
  max-width: 350px;

  margin: 0;

  color: var(--muted);

  font-size: 15px;

  line-height: 1.7;
}

.kd-list {
  border-top:
    1px solid var(--line);
}

.kd-row {
  display: grid;

  grid-template-columns:
    55px
    220px
    minmax(0, 1fr)
    70px;

  gap: 25px;

  align-items: center;

  padding: 28px 0;

  border-bottom:
    1px solid var(--line);

  transition:
    padding .2s ease,
    background .2s ease;
}

.kd-row.selected {
  padding-left: 12px;
  padding-right: 12px;

  background:
    rgba(162, 122, 62, .06);
}

.kd-row-number {
  color: var(--gold);

  font-size: 10px;

  letter-spacing: 2px;
}

.kd-row-sign {
  min-width: 0;

  padding: 0;

  border: 0;

  background: transparent;

  color: var(--ink);

  display: flex;

  align-items: center;

  gap: 15px;

  text-align: left;

  cursor: pointer;
}

.kd-row-sign > span {
  font-size: 28px;
}

.kd-row-sign div {
  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: 3px;
}

.kd-row-sign strong {
  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: 22px;

  font-weight: 500;
}

.kd-row-sign small {
  color: var(--muted);

  font-size: 11px;
}

.kd-row > p {
  min-width: 0;

  margin: 0;

  color: var(--muted);

  font-size: 14px;

  line-height: 1.6;
}

.kd-read {
  padding: 0;

  border: 0;

  background: transparent;

  color: var(--ink);

  font-size: 13px;

  font-weight: 600;

  cursor: pointer;

  display: flex;

  justify-content: flex-end;

  gap: 7px;
}

.kd-read span {
  transition:
    transform .2s ease;
}

.kd-read:hover span {
  transform:
    translateX(4px);
}


/* =====================================
   FOOTER NOTE
===================================== */

.kd-footer-note {
  max-width: 1280px;

  margin: 0 auto;

  padding:
    35px
    42px
    50px;

  border-top:
    1px solid var(--line);

  display: flex;

  justify-content: space-between;

  align-items: center;
}

.kd-footer-note > div > span {
  color: var(--gold);

  font-size: 10px;

  font-weight: 700;

  letter-spacing: 3px;
}

.kd-footer-note p {
  margin: 7px 0 0;

  color: var(--muted);

  font-size: 13px;
}

.kd-footer-star {
  color: var(--gold);

  font-size: 20px;
}


/* =====================================
   TABLET
===================================== */

@media (max-width: 950px) {

  .kd-hero-grid {
    grid-template-columns: 1fr;

    gap: 45px;
  }

  .kd-hero-side {
    max-width: 500px;
  }

  .kd-zodiac-grid {
    grid-template-columns:
      repeat(3, 1fr);
  }

  .kd-row {
    grid-template-columns:
      45px
      190px
      minmax(0, 1fr)
      60px;

    gap: 18px;
  }

}


/* =====================================
   MOBILE
===================================== */

@media (max-width: 650px) {

  .kd-hero-inner {
    padding:
      25px
      22px
      70px;
  }

  .kd-eyebrow {
    font-size: 8px;
    letter-spacing: 1.8px;
  }

  .kd-hero-grid {
    margin-top: 65px;
  }

  .kd-hero h1 {
    font-size:
      clamp(58px, 18vw, 90px);

    letter-spacing: -3px;
  }

  .kd-hero-side {
    max-width: none;

    padding:
      25px
      0
      0;

    border-left: 0;

    border-top:
      1px solid var(--line);
  }

  .kd-date-mark strong {
    font-size: 22px;
  }


  /* SIGNS */

  .kd-signs {
    padding:
      70px
      22px
      80px;
  }

  .kd-section-head,
  .kd-all-head {
    display: block;
  }

  .kd-section-head h2,
  .kd-all-head h2 {
    font-size: 50px;
  }

  .kd-section-copy,
  .kd-all-head > p {
    margin-top: 25px;
  }

  .kd-zodiac-grid {
    grid-template-columns:
      1fr 1fr;

    gap: 8px;
  }

  .kd-zodiac-card {
    min-height: 145px;

    padding: 18px;
  }

  .kd-symbol {
    font-size: 34px;
  }

  .kd-sign-name {
    font-size: 22px;
  }


  /* READING */

  .kd-reading-inner {
    padding:
      70px
      22px
      80px;
  }

  .kd-reading-heading {
    padding-bottom: 45px;
  }

  .kd-reading-sign {
    gap: 16px;
  }

  .kd-reading-symbol {
    width: 58px;
    height: 58px;

    font-size: 30px;
  }

  .kd-reading-sign h2 {
    font-size: 53px;

    letter-spacing: -2px;
  }

  .kd-reading-index {
    display: none;
  }

  .kd-reading-content {
    margin-top: 45px;
  }

  .kd-reading-intro {
    grid-template-columns: 1fr;

    gap: 12px;

    padding-bottom: 45px;
  }

  .kd-reading-intro p {
    font-size: 21px;
  }


  /* TOPICS */

  .kd-topic-grid {
    display: block;
  }

  .kd-topic,
  .kd-topic:nth-child(2n) {
    padding:
      32px
      0;

    border-left: 0;
  }

  .kd-topic + .kd-topic {
    border-top:
      1px solid #3a3732;
  }

  .kd-topic h3 {
    font-size: 25px;
  }

  .kd-topic p {
    font-size: 14px;
  }


  /* TRUTH */

  .kd-truth {
    margin-top: 40px;

    padding: 22px;
  }

  .kd-truth p {
    font-size: 18px;
  }


  /* ALL */

  .kd-all {
    padding:
      75px
      22px;
  }

  .kd-row {
    grid-template-columns:
      35px
      minmax(0, 1fr);

    gap: 12px;

    padding: 24px 0;
  }

  .kd-row > p {
    grid-column: 2;
  }

  .kd-read {
    grid-column: 2;

    justify-content: flex-start;
  }


  /* FOOTER */

  .kd-footer-note {
    padding:
      30px
      22px
      40px;
  }

}


/* =====================================
   SMALL PHONES
===================================== */

@media (max-width: 390px) {

  .kd-hero h1 {
    font-size: 55px;
  }

  .kd-zodiac-card {
    min-height: 138px;
    padding: 15px;
  }

  .kd-symbol {
    font-size: 30px;
  }

  .kd-sign-name {
    font-size: 20px;
  }

  .kd-reading-sign h2 {
    font-size: 46px;
  }

}
`;