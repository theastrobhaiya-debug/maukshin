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
  10: "A powerful number of success and new beginnings.",
  11: "A difficult number associated with betrayal.",
  12: "Represents sacrifice and suffering.",
  13: "A number of transformation.",
  14: "Associated with instability.",
  15: "A magnetic number.",
  16: "A warning number.",
  17: "One of the most powerful numbers.",
  18: "Associated with conflicts.",
  19: "A highly fortunate number.",
  20: "A sensitive number.",
  21: "A number of success.",
  22: "An unlucky number.",
  23: "One of the luckiest numbers.",
  24: "A very favorable number.",
  25: "Success comes after struggle.",
  26: "A warning number.",
  27: "A strong number.",
  28: "Indicates opposition.",
  29: "A highly emotional number.",
  30: "A neutral number.",
  31: "A number of isolation.",
  32: "A very powerful number.",
  33: "Brings success through relationships.",
  34: "Success after struggle.",
  35: "Indicates financial instability.",
  36: "A strong number.",
  37: "A lucky number.",
  38: "Emotional imbalance.",
  39: "Neutral number.",
  40: "Isolation and delays.",
  41: "A number of success.",
  42: "Success through partnerships.",
  43: "A difficult number.",
  44: "Financial problems.",
  45: "A powerful number.",
  46: "Success comes through support.",
  47: "Emotional instability.",
  48: "Neutral number.",
  49: "Independent path.",
  50: "Confidence and communication.",
  51: "Victory over enemies.",
  52: "Struggles and delays.",
  53: "A positive number.",
  54: "Prosperity and wealth.",
  55: "Wrong decisions.",
  56: "Delayed success.",
  57: "A lucky number.",
  58: "Emotional imbalance.",
  59: "Problems and challenges.",
  60: "A lucky number.",
  61: "Initial struggles.",
  62: "Hard work leads to results.",
  63: "Lucky but overspending.",
  64: "Family issues.",
  65: "Material success.",
  66: "One of the luckiest numbers.",
  67: "Delayed success.",
  68: "A difficult number.",
  69: "A very positive number.",
  70: "Luxury and comfort.",
  71: "Success through planning.",
  72: "Struggles in early life.",
  73: "Prosperity.",
  74: "Success with patience.",
  75: "Unlucky number.",
  76: "A very strong number.",
  77: "Struggles in execution.",
  78: "Heavy obstacles.",
  79: "Success and growth.",
  80: "Spiritual number.",
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

  for (const c of name) {
    if (map[c]) {
      sum += map[c];
    }
  }

  return sum;
}

function getScore(nameNum: number, root: number) {
  const single = reduce(nameNum);
  const r = relation[root];

  if (r.f.includes(single)) return 100;
  if (r.e.includes(single)) return 20;

  return 60;
}

export default function NameChecker() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<{
    fullNum: number;
    root: number;
    destiny: number;
    finalScore: number;
  } | null>(null);

  function calculateAll() {
    if (!name.trim() || !dob) {
      alert("Enter name & DOB");
      return;
    }

    const fullNum = getNumber(name);

    const [year, month, day] = dob.split("-").map(Number);

    const root = reduce(day);
    const destiny = reduce(day + month + year);

    const rootScore = getScore(fullNum, root);
    const destinyScore = getScore(fullNum, destiny);

    const finalScore = Math.round(
      (rootScore + destinyScore) / 2
    );

    setResult({
      fullNum,
      root,
      destiny,
      finalScore,
    });
  }

  return (
    <main className="page">
      <section className="hero">
        <div className="eyebrow">
          NUMEROLOGY NAME ANALYSIS
        </div>

        <h1>Check Your Name Energy</h1>

        <p>
          Understand the numerical energy and alignment of
          your name with your date of birth.
        </p>
      </section>

      <section className="checker-section">
        <div className="checker-card">
          <div className="field">
            <label htmlFor="nameInput">
              FULL NAME
            </label>

            <input
              id="nameInput"
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
            <label htmlFor="dobInput">
              DATE OF BIRTH
            </label>

            <div className="date-input-wrap">
              <input
                id="dobInput"
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
            onClick={calculateAll}
          >
            Reveal My Numbers
          </button>
        </div>

        {result && (
          <div className="result-box">

            <div className="result-item">
              <span>Full Name Number</span>
              <strong>{result.fullNum}</strong>
            </div>

            <p className="meaning">
              {meanings[result.fullNum] || "Neutral"}
            </p>

            <div className="result-grid">

              <div className="number-card">
                <span>Root Number</span>
                <strong>{result.root}</strong>
              </div>

              <div className="number-card">
                <span>Destiny Number</span>
                <strong>{result.destiny}</strong>
              </div>

            </div>

            <div className="alignment">
              <span>Alignment Score</span>

              <strong>
                {result.finalScore}%
              </strong>
            </div>

            {result.finalScore < 50 && (
              <p className="consult-text">
                🔮 Your name may need deeper numerological
                analysis for better alignment.
              </p>
            )}

          </div>
        )}

        <div className="description">
          <p>
            Check the power and impact of your name using
            numerology-based analysis. This tool helps you
            understand how your name influences your
            personality, communication style, and overall
            life path.
          </p>

          <p>
            By analyzing the numerical value of your name,
            it reveals strengths, hidden patterns, and areas
            that may affect success, relationships, and
            decision-making.
          </p>

          <p>
            Whether you are evaluating your current name or
            considering a change, the Name Checker provides
            clear and practical guidance to help you make
            more aligned choices.
          </p>

          <p className="disclaimer">
            ⚠️ This checker shows basic name and destiny
            alignment using numerology. It does not include
            full chart analysis.
          </p>
        </div>
      </section>

      <style jsx>{`

        .page {
          min-height: 100vh;
          background: #f8f5ef;
          color: #29251f;
          padding-bottom: 90px;
        }

        .hero {
          max-width: 900px;
          margin: 0 auto;
          padding: 65px 24px 40px;
          text-align: center;
        }

        .eyebrow {
          color: #a87935;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2.5px;
          margin-bottom: 17px;
        }

        .hero h1 {
          margin: 0;
          font-family:
            Georgia,
            "Times New Roman",
            serif;
          font-size: clamp(40px, 6vw, 64px);
          line-height: 1.05;
          font-weight: 600;
          letter-spacing: -2px;
        }

        .hero p {
          max-width: 620px;
          margin: 17px auto 0;
          color: #756f64;
          font-size: 16px;
          line-height: 1.6;
        }

        .checker-section {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .checker-card {
          padding: 22px;

          background: #fffdf9;

          border: 1px solid #dfd7ca;
          border-radius: 18px;

          box-shadow:
            0 8px 30px rgba(70, 50, 30, .055);
        }

        .field {
          margin-bottom: 17px;
        }

        .field label {
          display: block;

          margin-bottom: 8px;

          color: #756f64;

          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.3px;
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

        .field input::placeholder {
          color: #aaa196;
        }

        .field input:focus {
          border-color: #a87935;

          box-shadow:
            0 0 0 3px rgba(168, 121, 53, .08);
        }

        /* CLEAN DATE INPUT */

        .date-input-wrap {
          position: relative;
        }

        .field input[type="date"] {
          appearance: none;
          -webkit-appearance: none;

          padding-right: 42px;

          color: #29251f;

          cursor: pointer;
        }

        .field input[type="date"]::-webkit-calendar-picker-indicator {
          position: absolute;

          right: 14px;

          width: 17px;
          height: 17px;

          opacity: .55;

          cursor: pointer;
        }

        .field input[type="date"]::-webkit-datetime-edit {
          color: #29251f;
        }

        .field input[type="date"]::-webkit-datetime-edit-text {
          color: #8a8278;
        }

        .field input[type="date"]:focus {
          border-color: #a87935;

          box-shadow:
            0 0 0 3px rgba(168, 121, 53, .08);
        }

        button {
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

        button:hover {
          transform: translateY(-1px);
        }

        .result-box {
          margin-top: 24px;

          padding: 24px;

          background: #fffdf9;

          border: 1px solid #d9cdbb;
          border-radius: 16px;

          box-shadow:
            0 8px 22px rgba(70, 50, 30, .045);

          color: #111;
        }

        .result-item {
          display: flex;
          justify-content: space-between;
          align-items: center;

          gap: 20px;

          padding-bottom: 15px;

          border-bottom: 1px solid #ebe4da;
        }

        .result-item span,
        .number-card span,
        .alignment span {
          color: #625847;

          font-size: 11px;
          font-weight: 600;
          letter-spacing: .3px;
        }

        .result-item strong {
          font-size: 20px;
          font-weight: 700;
        }

        .meaning {
          margin: 15px 0 22px;

          color: #333;

          font-size: 14px;
          line-height: 1.6;
        }

        .result-grid {
          display: grid;

          grid-template-columns: 1fr 1fr;

          gap: 12px;
        }

        .number-card {
          padding: 18px;

          background: #f8f5ef;

          border: 1px solid #e2d8c8;
          border-radius: 12px;
        }

        .number-card strong {
          display: block;

          margin-top: 8px;

          color: #111;

          font-size: 24px;
          font-weight: 700;
        }

        .alignment {
          display: flex;
          justify-content: space-between;
          align-items: center;

          margin-top: 14px;

          padding: 19px;

          background: #fff8e7;

          border: 1px solid #e7d3a5;
          border-radius: 12px;
        }

        .alignment strong {
          color: #a87935;

          font-size: 27px;
        }

        .consult-text {
          margin: 18px 0 0;

          color: #a16207;

          font-size: 13px;
          font-weight: 600;
          line-height: 1.5;
        }

        .description {
          margin-top: 35px;

          color: #55504a;

          font-size: 14px;
          line-height: 1.7;
        }

        .description p {
          margin: 0 0 17px;
        }

        .disclaimer {
          padding: 13px 15px;

          background: #f4eee3;

          border: 1px solid #dfd4c2;
          border-radius: 11px;

          color: #6a6258;

          font-size: 12px;
          line-height: 1.6;
        }

        @media (max-width: 600px) {

          .hero {
            padding: 48px 18px 34px;
          }

          .hero h1 {
            font-size: 43px;
            letter-spacing: -1.5px;
          }

          .hero p {
            font-size: 14px;
          }

          .checker-section {
            padding: 0 18px;
          }

          .checker-card {
            padding: 17px;
            border-radius: 16px;
          }

          .result-box {
            padding: 19px;
          }

          .result-grid {
            grid-template-columns: 1fr;
          }

        }

      `}</style>
    </main>
  );
}