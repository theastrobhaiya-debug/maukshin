"use client";

import { useState } from "react";

const map: Record<string, number> = {
  A: 1,
  I: 1,
  J: 1,
  Q: 1,
  Y: 1,
  B: 2,
  K: 2,
  R: 2,
  C: 3,
  G: 3,
  L: 3,
  S: 3,
  D: 4,
  M: 4,
  T: 4,
  E: 5,
  H: 5,
  N: 5,
  X: 5,
  U: 6,
  V: 6,
  W: 6,
  O: 7,
  Z: 7,
  F: 8,
  P: 8,
};

const meanings: Record<number, string> = {
  10: "A powerful number associated with success and new beginnings.",
  11: "A sensitive and challenging number associated with intuition and emotional lessons.",
  12: "Represents sacrifice, responsibility and learning through experience.",
  13: "A number of transformation, discipline and rebuilding.",
  14: "Associated with change, movement and instability.",
  15: "A magnetic number associated with attraction, influence and communication.",
  16: "A warning number associated with sudden changes and important lessons.",
  17: "A powerful number associated with achievement and recognition.",
  18: "Associated with conflicts, ambition and strong emotional experiences.",
  19: "A fortunate number associated with independence and achievement.",
  20: "A sensitive number associated with intuition and emotional awareness.",
  21: "A number associated with success, growth and social recognition.",
  22: "A challenging number associated with delays and unexpected obstacles.",
  23: "One of the luckiest numbers, associated with support and opportunities.",
  24: "A favorable number associated with comfort, relationships and material support.",
  25: "Success comes through experience, patience and struggle.",
  26: "A warning number associated with financial and relationship responsibilities.",
  27: "A strong number associated with knowledge, achievement and leadership.",
  28: "Indicates opposition, independence and lessons through partnerships.",
  29: "A highly emotional number associated with sensitivity and relationships.",
  30: "A neutral number associated with communication and creativity.",
  31: "A number associated with independence, individuality and isolation.",
  32: "A powerful number associated with communication, influence and success.",
  33: "Brings success through relationships, communication and cooperation.",
  34: "Success develops through patience, experience and consistent effort.",
  35: "Indicates financial fluctuations and the need for careful decisions.",
  36: "A strong number associated with ambition, responsibility and achievement.",
  37: "A lucky number associated with support, relationships and opportunities.",
  38: "Can indicate emotional imbalance and fluctuating circumstances.",
  39: "A relatively neutral number associated with creativity and communication.",
  40: "Associated with isolation, delays and the need for patience.",
  41: "A number of success associated with initiative and independent thinking.",
  42: "Success through partnerships, cooperation and relationships.",
  43: "A difficult number associated with obstacles and unexpected changes.",
  44: "Associated with financial pressure and the need for careful planning.",
  45: "A powerful number associated with determination and achievement.",
  46: "Success comes through support, cooperation and practical decisions.",
  47: "Can indicate emotional instability and changing circumstances.",
  48: "A neutral number associated with work, effort and gradual progress.",
  49: "Associated with independence, responsibility and a self-directed path.",
  50: "Associated with confidence, communication and adaptability.",
  51: "A number associated with victory, determination and overcoming opposition.",
  52: "Associated with struggles, delays and the need for persistence.",
  53: "A positive number associated with communication and opportunities.",
  54: "Associated with prosperity, material growth and achievement.",
  55: "Can indicate impulsive decisions and the need for greater stability.",
  56: "Associated with delayed success and lessons through relationships.",
  57: "A fortunate number associated with growth and support.",
  58: "Can indicate emotional imbalance and changing circumstances.",
  59: "Associated with challenges that require patience and discipline.",
  60: "A favorable number associated with relationships, comfort and support.",
  61: "Initial struggles followed by gradual development.",
  62: "Hard work, discipline and consistency lead to progress.",
  63: "A favorable number, though it can indicate a tendency toward overspending.",
  64: "Can indicate family responsibilities and relationship challenges.",
  65: "Associated with material progress, communication and success.",
  66: "One of the more favorable numbers for comfort, relationships and prosperity.",
  67: "Success develops gradually and may involve delays.",
  68: "A challenging number associated with responsibility and obstacles.",
  69: "A positive number associated with relationships, creativity and progress.",
  70: "Associated with comfort, luxury, reflection and spiritual development.",
  71: "Success through planning, patience and independent thinking.",
  72: "Struggles may occur early, followed by gradual development.",
  73: "Associated with prosperity, learning and personal development.",
  74: "Success comes through patience, discipline and consistent effort.",
  75: "A challenging number associated with delays and changing circumstances.",
  76: "A strong number associated with determination and achievement.",
  77: "Can indicate struggles in execution despite strong intentions.",
  78: "Associated with heavy obstacles and the need for persistence.",
  79: "Associated with success, growth and personal development.",
  80: "A number associated with reflection, spirituality and inner development.",
};

const relation: Record<
  number,
  {
    f: number[];
    n: number[];
    e: number[];
  }
> = {
  1: { f: [1, 2, 4, 7], n: [5, 6, 8], e: [3, 9] },
  2: { f: [1, 2, 7, 9], n: [3, 4, 5, 6], e: [8] },
  3: { f: [3, 6, 9], n: [2, 4, 5, 7, 8], e: [1] },
  4: { f: [1, 2, 4, 7, 8], n: [5, 6], e: [3, 9] },
  5: { f: [5, 6, 3, 9], n: [1, 2, 4, 7, 8], e: [] },
  6: { f: [3, 6, 9], n: [1, 2, 4, 5, 7, 8], e: [] },
  7: { f: [2, 3, 6], n: [1, 4, 5, 7, 8], e: [9] },
  8: { f: [8, 3, 6, 4], n: [2, 5, 7], e: [9, 1] },
  9: { f: [3, 6, 9], n: [1, 2, 5, 8], e: [4, 7] },
};

function reduce(num: number) {
  while (num > 9) {
    num = num
      .toString()
      .split("")
      .reduce((a, b) => a + parseInt(b), 0);
  }

  return num;
}

function getNumber(name: string) {
  let sum = 0;

  name = name.toUpperCase();

  for (const character of name) {
    if (map[character]) {
      sum += map[character];
    }
  }

  return sum;
}

function getScore(nameNum: number, root: number) {
  const single = reduce(nameNum);
  const r = relation[root];

  if (!r) return 60;

  if (r.f.includes(single)) return 100;
  if (r.e.includes(single)) return 20;

  return 60;
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NameCheckerPage() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<any>(null);

  function calculate() {
    if (!name.trim() || !dob) {
      setResult({
        error: "Please enter your full name and date of birth.",
      });

      return;
    }

    const fullNum = getNumber(name.trim());

    if (fullNum === 0) {
      setResult({
        error: "Please enter a valid name.",
      });

      return;
    }

    const [year, month, day] = dob.split("-").map(Number);

    const root = reduce(day);
    const destiny = reduce(day + month + year);

    const rootScore = getScore(fullNum, root);
    const destinyScore = getScore(fullNum, destiny);

    const finalScore = Math.round(
      (rootScore + destinyScore) / 2
    );

    setResult({
      name: name.trim(),
      dob,
      fullNum,
      root,
      destiny,
      rootScore,
      destinyScore,
      finalScore,
      meaning:
        meanings[fullNum] ||
        meanings[reduce(fullNum)] ||
        "This number carries a neutral numerological influence.",
    });
  }

  return (
    <main className="checker-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="hero">

        <div className="eyebrow">
          KAALDARPAN • NUMEROLOGY
        </div>

        <h1>
          Name
          <br />
          Checker
        </h1>

        <p>
          Discover the numerological energy of your name
          and its alignment with your date of birth.
        </p>

      </section>


      {/* =========================
          CHECKER
      ========================= */}

      <section className="checker-section">

        <div className="checker-card">

          <div className="card-heading">

            <span>
              NAME ANALYSIS
            </span>

            <h2>
              Check Your Name Energy
            </h2>

            <p>
              Your name carries a numerical vibration.
              Combine it with your date of birth to explore
              your basic numerological alignment.
            </p>

          </div>


          <div className="fields">

            <div className="field">

              <label htmlFor="name">
                FULL NAME
              </label>

              <input
                id="name"
                type="text"
                value={name}
                placeholder="Enter your full name"
                onChange={(e) => {
                  setName(e.target.value);
                  setResult(null);
                }}
              />

            </div>


            <div className="field">

              <label htmlFor="dob">
                DATE OF BIRTH
              </label>

              <input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                  setResult(null);
                }}
              />

            </div>

          </div>


          <button
            type="button"
            className="calculate-button"
            onClick={calculate}
          >
            Reveal My Numbers
          </button>


          <p className="disclaimer">
            This checker provides a basic numerology-based
            name and destiny alignment. It does not replace
            a complete birth chart or detailed numerological
            analysis.
          </p>

        </div>

      </section>


      {/* =========================
          RESULT
      ========================= */}

      {result && !result.error && (

        <section className="results">

          <div className="result-header">

            <div>

              <span>
                NUMEROLOGY RESULT
              </span>

              <h2>
                {result.name}
              </h2>

              <p>
                Date of birth: {formatDate(result.dob)}
              </p>

            </div>

            <div className="score">

              <small>
                ALIGNMENT
              </small>

              <strong>
                {result.finalScore}%
              </strong>

            </div>

          </div>


          {/* NUMBER CARDS */}

          <div className="number-grid">

            <div className="number-card">

              <span>
                FULL NAME NUMBER
              </span>

              <strong>
                {result.fullNum}
              </strong>

              <p>
                {result.meaning}
              </p>

            </div>


            <div className="number-card">

              <span>
                ROOT NUMBER
              </span>

              <strong>
                {result.root}
              </strong>

              <p>
                Based on your birth day.
              </p>

            </div>


            <div className="number-card">

              <span>
                DESTINY NUMBER
              </span>

              <strong>
                {result.destiny}
              </strong>

              <p>
                Based on your complete date of birth.
              </p>

            </div>

          </div>


          {/* ALIGNMENT */}

          <div className="alignment-card">

            <div className="alignment-title">

              <span>
                NAME ALIGNMENT
              </span>

              <h3>
                How your numbers relate
              </h3>

            </div>


            <div className="alignment-rows">

              <div className="alignment-row">

                <span>
                  Name ↔ Root Number
                </span>

                <strong>
                  {result.rootScore}%
                </strong>

              </div>


              <div className="alignment-row">

                <span>
                  Name ↔ Destiny Number
                </span>

                <strong>
                  {result.destinyScore}%
                </strong>

              </div>


              <div className="alignment-row total">

                <span>
                  Overall Alignment
                </span>

                <strong>
                  {result.finalScore}%
                </strong>

              </div>

            </div>

          </div>


          {/* INTERPRETATION */}

          <div className="interpretation">

            <div className="section-label">
              BASIC INTERPRETATION
            </div>

            <h3>
              Your name carries the number {result.fullNum}
            </h3>

            <p>
              In numerology, the numerical value of a name
              is interpreted alongside other important numbers.
              Your Root Number represents the basic energy
              connected with your birth day, while the Destiny
              Number is derived from your complete date of birth.
            </p>

            <p>
              The alignment score shown above is a basic
              numerical comparison and should be viewed as
              an introductory indication rather than a complete
              personal analysis.
            </p>

          </div>

        </section>

      )}


      {result?.error && (

        <div className="error">
          {result.error}
        </div>

      )}


      {/* =========================
          INFORMATION
      ========================= */}

      <section className="information">

        <div className="section-line">

          <span>
            ABOUT NAME NUMEROLOGY
          </span>

          <div />

        </div>


        <div className="info-grid">

          <div>

            <h3>
              Your Name
            </h3>

            <p>
              In numerology, letters are assigned numerical
              values. These values are combined to calculate
              the numerical vibration associated with a name.
            </p>

          </div>


          <div>

            <h3>
              Your Root Number
            </h3>

            <p>
              The Root Number is derived from the day of birth
              and is traditionally associated with fundamental
              tendencies and personal expression.
            </p>

          </div>


          <div>

            <h3>
              Your Destiny Number
            </h3>

            <p>
              The Destiny Number is calculated from the complete
              date of birth and is traditionally used to explore
              broader life patterns.
            </p>

          </div>

        </div>

      </section>


      <style jsx>{`

        /* =========================
           PAGE
        ========================= */

        .checker-page {
          min-height: 100vh;

          background: #f8f5ef;

          color: #29251f;

          padding-bottom: 90px;
        }


        /* =========================
           HERO
        ========================= */

        .hero {
          max-width: 1080px;

          margin: 0 auto;

          padding: 65px 24px 50px;
        }

        .eyebrow {
          margin-bottom: 18px;

          color: #a87935;

          font-size: 10px;

          font-weight: 700;

          letter-spacing: 2.5px;
        }

        .hero h1 {
          margin: 0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: clamp(50px, 7vw, 76px);

          line-height: .96;

          font-weight: 600;

          letter-spacing: -2.5px;
        }

        .hero p {
          max-width: 570px;

          margin: 20px 0 0;

          color: #756f64;

          font-size: 16px;

          line-height: 1.75;
        }


        /* =========================
           CHECKER
        ========================= */

        .checker-section {
          max-width: 1080px;

          margin: 0 auto;

          padding: 0 24px 60px;
        }

        .checker-card {
          padding: 38px;

          background: #fffdf9;

          border: 1px solid #d9cdbb;

          border-radius: 18px;

          box-shadow:
            0 12px 35px rgba(70, 50, 30, .055);
        }

        .card-heading {
          max-width: 620px;

          margin-bottom: 30px;
        }

        .card-heading > span {
          color: #a87935;

          font-size: 10px;

          font-weight: 700;

          letter-spacing: 1.8px;
        }

        .card-heading h2 {
          margin: 9px 0 10px;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 30px;

          font-weight: 600;
        }

        .card-heading p {
          margin: 0;

          color: #756f64;

          font-size: 14px;

          line-height: 1.7;
        }


        /* =========================
           FIELDS
        ========================= */

        .fields {
          display: grid;

          grid-template-columns: 1fr 1fr;

          gap: 14px;

          margin-bottom: 18px;
        }

        .field label {
          display: block;

          margin-bottom: 8px;

          color: #625847;

          font-size: 10px;

          font-weight: 700;

          letter-spacing: 1.2px;
        }

        .field input {
          box-sizing: border-box;

          width: 100%;

          height: 52px;

          padding: 0 15px;

          border: 1px solid #d8d0c3;

          border-radius: 12px;

          background: #fff;

          color: #29251f;

          font-family:
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          font-size: 14px;

          outline: none;
        }

        .field input:focus {
          border-color: #a87935;

          box-shadow:
            0 0 0 3px rgba(168, 121, 53, .08);
        }

        .field input::placeholder {
          color: #aaa196;
        }


        /* =========================
           BUTTON
        ========================= */

        .calculate-button {
          width: 100%;

          height: 52px;

          border: 1px solid #29251f;

          border-radius: 12px;

          background: #29251f;

          color: #fff;

          font-size: 13px;

          font-weight: 600;

          cursor: pointer;

          transition:
            transform .15s ease,
            opacity .15s ease;
        }

        .calculate-button:hover {
          transform: translateY(-1px);
        }


        .disclaimer {
          max-width: 700px;

          margin: 18px auto 0;

          color: #81796e;

          font-size: 11px;

          line-height: 1.6;

          text-align: center;
        }


        /* =========================
           RESULTS
        ========================= */

        .results {
          max-width: 1080px;

          margin: 0 auto;

          padding: 0 24px 70px;

          color: #111;
        }

        .result-header {
          display: flex;

          align-items: flex-end;

          justify-content: space-between;

          gap: 25px;

          padding: 28px 24px;

          background: #fffdf9;

          border-top: 1px solid #c9b894;

          border-bottom: 1px solid #c9b894;
        }

        .result-header > div:first-child > span {
          color: #6a5a42;

          font-size: 10px;

          font-weight: 700;

          letter-spacing: 1.4px;
        }

        .result-header h2 {
          margin: 8px 0 4px;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 28px;

          font-weight: 600;
        }

        .result-header p {
          margin: 0;

          color: #66605a;

          font-size: 12px;
        }


        /* =========================
           SCORE
        ========================= */

        .score {
          min-width: 100px;

          text-align: right;
        }

        .score small {
          display: block;

          margin-bottom: 4px;

          color: #6a5a42;

          font-size: 9px;

          font-weight: 700;

          letter-spacing: 1.2px;
        }

        .score strong {
          color: #a87935;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 36px;

          font-weight: 600;
        }


        /* =========================
           NUMBER GRID
        ========================= */

        .number-grid {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 12px;

          margin-top: 18px;
        }

        .number-card {
          min-height: 190px;

          padding: 23px;

          background: #fffdf9;

          border: 1px solid #d9cdbb;

          border-radius: 14px;
        }

        .number-card span {
          display: block;

          margin-bottom: 17px;

          color: #6a5a42;

          font-size: 9px;

          font-weight: 700;

          letter-spacing: 1.2px;
        }

        .number-card strong {
          display: block;

          color: #111;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 42px;

          line-height: 1;

          font-weight: 600;
        }

        .number-card p {
          margin: 17px 0 0;

          color: #625d55;

          font-size: 12px;

          line-height: 1.65;
        }


        /* =========================
           ALIGNMENT
        ========================= */

        .alignment-card {
          margin-top: 12px;

          padding: 25px;

          background: #fffdf9;

          border: 1px solid #d9cdbb;

          border-radius: 14px;
        }

        .alignment-title span {
          color: #a87935;

          font-size: 9px;

          font-weight: 700;

          letter-spacing: 1.3px;
        }

        .alignment-title h3 {
          margin: 7px 0 20px;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 21px;

          font-weight: 600;
        }

        .alignment-row {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 20px;

          padding: 14px 0;

          border-bottom: 1px solid #ebe4da;
        }

        .alignment-row:last-child {
          border-bottom: 0;
        }

        .alignment-row span {
          color: #4c4842;

          font-size: 13px;
        }

        .alignment-row strong {
          color: #111;

          font-size: 14px;
        }

        .alignment-row.total {
          margin-top: 4px;

          padding-top: 18px;
        }

        .alignment-row.total span {
          font-weight: 600;
        }

        .alignment-row.total strong {
          color: #a87935;

          font-size: 18px;
        }


        /* =========================
           INTERPRETATION
        ========================= */

        .interpretation {
          margin-top: 12px;

          padding: 28px 25px;

          background: #f1eadf;

          border: 1px solid #ded1bf;

          border-radius: 14px;
        }

        .section-label {
          margin-bottom: 9px;

          color: #a87935;

          font-size: 9px;

          font-weight: 700;

          letter-spacing: 1.4px;
        }

        .interpretation h3 {
          margin: 0 0 15px;

          color: #111;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 23px;

          font-weight: 600;
        }

        .interpretation p {
          max-width: 800px;

          margin: 0 0 15px;

          color: #514c45;

          font-size: 13px;

          line-height: 1.8;
        }

        .interpretation p:last-child {
          margin-bottom: 0;
        }


        /* =========================
           ERROR
        ========================= */

        .error {
          max-width: 1032px;

          margin: 0 auto 60px;

          padding: 14px 16px;

          border: 1px solid #e3c9c0;

          border-radius: 11px;

          background: #f9eae6;

          color: #863c31;

          font-size: 13px;
        }


        /* =========================
           INFORMATION
        ========================= */

        .information {
          max-width: 1080px;

          margin: 0 auto;

          padding: 10px 24px 70px;
        }

        .section-line {
          display: flex;

          align-items: center;

          gap: 15px;

          margin-bottom: 30px;
        }

        .section-line span {
          color: #6a5a42;

          font-size: 10px;

          font-weight: 700;

          letter-spacing: 1.4px;

          white-space: nowrap;
        }

        .section-line div {
          flex: 1;

          height: 1px;

          background: #c9b894;
        }

        .info-grid {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 35px;
        }

        .info-grid h3 {
          margin: 0 0 10px;

          color: #111;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 20px;

          font-weight: 600;
        }

        .info-grid p {
          margin: 0;

          color: #625d55;

          font-size: 13px;

          line-height: 1.75;
        }


        /* =========================
           TABLET
        ========================= */

        @media (max-width: 800px) {

          .number-grid {
            grid-template-columns:
              1fr 1fr;
          }

          .info-grid {
            grid-template-columns:
              1fr 1fr;
          }

        }


        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 600px) {

          .hero {
            padding: 48px 18px 38px;
          }

          .hero h1 {
            font-size: 52px;

            letter-spacing: -2px;
          }

          .hero p {
            font-size: 14px;
          }

          .checker-section,
          .results,
          .information {
            padding-left: 18px;
            padding-right: 18px;
          }

          .checker-card {
            padding: 22px 18px;

            border-radius: 16px;
          }

          .card-heading h2 {
            font-size: 26px;
          }

          .fields {
            grid-template-columns: 1fr;

            gap: 14px;
          }

          .result-header {
            display: block;

            padding: 23px 18px;
          }

          .score {
            margin-top: 18px;

            text-align: left;
          }

          .number-grid {
            grid-template-columns: 1fr;
          }

          .number-card {
            min-height: auto;
          }

          .info-grid {
            grid-template-columns: 1fr;

            gap: 28px;
          }

          .section-line {
            margin-bottom: 25px;
          }

        }


        @media (max-width: 380px) {

          .hero h1 {
            font-size: 46px;
          }

          .number-card strong {
            font-size: 38px;
          }

        }

      `}</style>

    </main>
  );
}