"use client";

import { useMemo, useState } from "react";

type Result = {
  mulank: number;
  bhagyank: number;
  nameNumber: number;
  favourableNumber: string;
  days: string;
  colour: string;
  alphabets: string;
  planet: string;
  direction: string;
  deity: string;
  dates: string;
};

const NUMBER_DATA: Record<
  number,
  {
    planet: string;
    colour: string;
    days: string;
    alphabets: string;
    direction: string;
    deity: string;
    dates: string;
  }
> = {
  1: {
    planet: "Sun",
    colour: "Gold, Orange",
    days: "Sunday",
    alphabets: "A, I, J, Q, Y",
    direction: "East",
    deity: "Surya",
    dates: "1, 10, 19, 28",
  },
  2: {
    planet: "Moon",
    colour: "White, Cream",
    days: "Monday",
    alphabets: "B, K, R",
    direction: "North-West",
    deity: "Chandra",
    dates: "2, 11, 20, 29",
  },
  3: {
    planet: "Jupiter",
    colour: "Yellow, Gold",
    days: "Thursday",
    alphabets: "C, G, L, S",
    direction: "North-East",
    deity: "Guru",
    dates: "3, 12, 21, 30",
  },
  4: {
    planet: "Rahu",
    colour: "Grey, Electric Blue",
    days: "Saturday",
    alphabets: "D, M, T",
    direction: "South-West",
    deity: "Ganesha",
    dates: "4, 13, 22, 31",
  },
  5: {
    planet: "Mercury",
    colour: "Green",
    days: "Wednesday",
    alphabets: "E, H, N, X",
    direction: "North",
    deity: "Vishnu",
    dates: "5, 14, 23",
  },
  6: {
    planet: "Venus",
    colour: "White, Pink",
    days: "Friday",
    alphabets: "U, V, W",
    direction: "South-East",
    deity: "Lakshmi",
    dates: "6, 15, 24",
  },
  7: {
    planet: "Ketu",
    colour: "White, Silver",
    days: "Monday",
    alphabets: "O, Z",
    direction: "South-West",
    deity: "Ganesha",
    dates: "7, 16, 25",
  },
  8: {
    planet: "Saturn",
    colour: "Black, Navy Blue",
    days: "Saturday",
    alphabets: "F, P",
    direction: "West",
    deity: "Shani",
    dates: "8, 17, 26",
  },
  9: {
    planet: "Mars",
    colour: "Red, Maroon",
    days: "Tuesday",
    alphabets: "—",
    direction: "South",
    deity: "Hanuman",
    dates: "9, 18, 27",
  },
};

function reduceNumber(value: number): number {
  let number = Math.abs(value);

  while (number > 9) {
    number = String(number)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }

  return number;
}

function calculateMulank(day: number): number {
  return reduceNumber(day);
}

function calculateBhagyank(day: number, month: number, year: number): number {
  const total = day + month + year;
  return reduceNumber(total);
}

/*
  Vedic / Chaldean style name-number mapping used by Mauksh.

  1: A I J Q Y
  2: B K R
  3: C G L S
  4: D M T
  5: E H N X
  6: U V W
  7: O Z
  8: F P
  9: No letters
*/
const NAME_VALUES: Record<string, number> = {
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

function calculateNameNumber(name: string): number {
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, "");

  const total = cleanName
    .split("")
    .reduce((sum, letter) => sum + (NAME_VALUES[letter] || 0), 0);

  return reduceNumber(total);
}

function getVedicGrid(
  day: number,
  month: number,
  year: number
): Record<number, number> {
  /*
    Internal Mauksh Vedic grid:

    3 1 9
    6 7 5
    2 8 4

    Century digits are excluded.
    Zero is ignored.

    The grid is calculated internally and intentionally
    not displayed to the visitor.
  */

  const dobDigits = `${String(day).padStart(2, "0")}${String(
    month
  ).padStart(2, "0")}${String(year).slice(-2)}`;

  const counts: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  };

  for (const digit of dobDigits) {
    const number = Number(digit);

    if (number >= 1 && number <= 9) {
      counts[number] += 1;
    }
  }

  return counts;
}

function parseDOB(value: string) {
  const match = value.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);

  if (!match) {
    return null;
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return {
    day,
    month,
    year,
  };
}

function getResult(name: string, dob: string): Result | null {
  const parsed = parseDOB(dob);

  if (!parsed || !name.trim()) {
    return null;
  }

  const { day, month, year } = parsed;

  const mulank = calculateMulank(day);
  const bhagyank = calculateBhagyank(day, month, year);
  const nameNumber = calculateNameNumber(name);

  // Calculate internally so the Vedic grid logic remains part of the engine.
  getVedicGrid(day, month, year);

  const data = NUMBER_DATA[mulank];

  return {
    mulank,
    bhagyank,
    nameNumber,
    favourableNumber: `${mulank}, ${bhagyank}, ${nameNumber}`,
    days: data.days,
    colour: data.colour,
    alphabets: data.alphabets,
    planet: data.planet,
    direction: data.direction,
    deity: data.deity,
    dates: data.dates,
  };
}

function NumberCard({
  label,
  number,
  description,
}: {
  label: string;
  number: number;
  description: string;
}) {
  return (
    <div className="numberCard">
      <div className="numberLabel">{label}</div>
      <div className="bigNumber">{number}</div>
      <div className="numberDescription">{description}</div>
    </div>
  );
}

export default function Home() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const isValid = useMemo(() => {
    return name.trim().length > 1 && !!parseDOB(dob);
  }, [name, dob]);

  function calculate() {
    setError("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!parseDOB(dob)) {
      setError("Please enter your date of birth in DD/MM/YYYY format.");
      return;
    }

    const calculated = getResult(name, dob);

    if (!calculated) {
      setError("Please check your details and try again.");
      return;
    }

    setResult(calculated);

    setTimeout(() => {
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function reset() {
    setResult(null);
    setError("");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <main className="page">
      <section className="hero">
        <nav className="nav">
          <div className="brand">
            <img
              src="/assets/mauksh-logo.jpg"
              alt="Mauksh"
              className="maukshLogo"
            />

            <div className="brandText">
              <strong>MAUKSH AI</strong>
              <span>Numerology</span>
            </div>
          </div>

          <div className="navBadge">FREE</div>
        </nav>

        <div className="heroContent">
          <div className="eyebrow">
            <span>✦</span> YOUR NUMBERS. YOUR PATTERN.
          </div>

          <h1>
            Discover what your
            <br />
            <span>numbers say</span> about you.
          </h1>

          <p className="heroText">
            Enter your name and date of birth to calculate your core
            numerology numbers using the Mauksh numerology system.
          </p>

          <div className="calculatorCard">
            <div className="cardHeader">
              <div>
                <span className="smallEyebrow">PERSONAL CALCULATION</span>
                <h2>Enter your details</h2>
              </div>

              <div className="spark">✦</div>
            </div>

            <div className="field">
              <label htmlFor="name">FULL NAME</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full birth name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>

            <div className="field">
              <label htmlFor="dob">DATE OF BIRTH</label>
              <input
                id="dob"
                type="text"
                inputMode="numeric"
                placeholder="DD/MM/YYYY"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                maxLength={10}
              />
              <span className="fieldHint">
                Example: 08/10/1995
              </span>
            </div>

            {error && <div className="error">{error}</div>}

            <button
              className="calculateButton"
              onClick={calculate}
              disabled={!isValid}
            >
              <span>Calculate My Numbers</span>
              <span className="arrow">→</span>
            </button>

            <p className="privacy">
              Your calculation is performed instantly on this page.
            </p>
          </div>
        </div>
      </section>

      <section className="howSection">
        <div className="sectionEyebrow">HOW IT WORKS</div>

        <h2>
          Three numbers can reveal
          <br />
          <span>your core pattern.</span>
        </h2>

        <div className="steps">
          <div className="step">
            <div className="stepNumber">01</div>
            <h3>Enter your details</h3>
            <p>Your full birth name and date of birth.</p>
          </div>

          <div className="step">
            <div className="stepNumber">02</div>
            <h3>Calculate your numbers</h3>
            <p>Mauksh calculates your core numerology profile.</p>
          </div>

          <div className="step">
            <div className="stepNumber">03</div>
            <h3>Understand yourself</h3>
            <p>Explore your numbers and favourable energies.</p>
          </div>
        </div>
      </section>

      {result && (
        <section id="results" className="resultsSection">
          <div className="resultsTop">
            <div>
              <div className="sectionEyebrow">YOUR MAUKSH PROFILE</div>

              <h2>
                Hello, <span>{name.trim()}</span>
              </h2>

              <p>
                Here are your core numerology numbers based on your
                birth details.
              </p>
            </div>

            <button className="newCalculation" onClick={reset}>
              New calculation
            </button>
          </div>

          <div className="numbersGrid">
            <NumberCard
              label="MULANK"
              number={result.mulank}
              description="Your birth number"
            />

            <NumberCard
              label="BHAGYANK"
              number={result.bhagyank}
              description="Your destiny number"
            />

            <NumberCard
              label="NAME NUMBER"
              number={result.nameNumber}
              description="Your name vibration"
            />
          </div>

          <div className="profileDetails">
            <div className="detailHeader">
              <div>
                <div className="sectionEyebrow">YOUR NUMEROLOGY</div>
                <h3>Favourable energies</h3>
              </div>

              <div className="goldCircle">✦</div>
            </div>

            <div className="detailsGrid">
              <div className="detail">
                <span>FAVOURABLE NUMBERS</span>
                <strong>{result.favourableNumber}</strong>
              </div>

              <div className="detail">
                <span>FAVOURABLE DAYS</span>
                <strong>{result.days}</strong>
              </div>

              <div className="detail">
                <span>FAVOURABLE COLOURS</span>
                <strong>{result.colour}</strong>
              </div>

              <div className="detail">
                <span>FAVOURABLE ALPHABETS</span>
                <strong>{result.alphabets}</strong>
              </div>

              <div className="detail">
                <span>PLANET</span>
                <strong>{result.planet}</strong>
              </div>

              <div className="detail">
                <span>DIRECTION</span>
                <strong>{result.direction}</strong>
              </div>

              <div className="detail">
                <span>DEITY</span>
                <strong>{result.deity}</strong>
              </div>

              <div className="detail">
                <span>FAVOURABLE DATES</span>
                <strong>{result.dates}</strong>
              </div>
            </div>
          </div>

          <div className="resultNote">
            <span>✦</span>
            <p>
              Numerology is a system of interpretation and self-reflection.
              Use these numbers as guidance rather than absolute predictions.
            </p>
          </div>
        </section>
      )}

      <footer>
        <div className="footerBrand">
          <img
            src="/assets/mauksh-logo.jpg"
            alt="Mauksh"
            className="footerLogo"
          />

          <div>
            <strong>MAUKSH AI</strong>
            <span>Spirituality is Personal.</span>
          </div>
        </div>

        <p>© {new Date().getFullYear()} Mauksh. All rights reserved.</p>
      </footer>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;
          background: #f7f2e9;
          color: #171512;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        .hero {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 80% 20%,
              rgba(211, 166, 66, 0.14),
              transparent 30%
            ),
            #f7f2e9;
          padding: 0 20px 80px;
        }

        .nav {
          max-width: 1180px;
          margin: 0 auto;
          padding: 22px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .maukshLogo {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
        }

        .brandText {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }

        .brandText strong {
          font-size: 14px;
          letter-spacing: 0.12em;
        }

        .brandText span {
          margin-top: 5px;
          font-size: 10px;
          color: #857b6b;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .navBadge {
          border: 1px solid #d7cdbb;
          padding: 8px 13px;
          border-radius: 100px;
          font-size: 10px;
          letter-spacing: 0.15em;
          font-weight: 700;
        }

        .heroContent {
          max-width: 760px;
          margin: 0 auto;
          padding-top: 70px;
          text-align: center;
        }

        .eyebrow,
        .sectionEyebrow,
        .smallEyebrow {
          font-size: 10px;
          letter-spacing: 0.2em;
          font-weight: 800;
          color: #a17618;
        }

        .eyebrow span {
          margin-right: 7px;
        }

        h1 {
          font-size: clamp(42px, 8vw, 78px);
          line-height: 0.98;
          letter-spacing: -0.055em;
          margin: 22px 0;
          font-weight: 800;
        }

        h1 span,
        .resultsTop h2 span {
          color: #bd8a24;
        }

        .heroText {
          max-width: 580px;
          margin: 0 auto;
          color: #71695c;
          font-size: 16px;
          line-height: 1.7;
        }

        .calculatorCard {
          max-width: 570px;
          margin: 45px auto 0;
          padding: 28px;
          background: rgba(255, 253, 248, 0.9);
          border: 1px solid #e4dbcc;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(60, 45, 20, 0.08);
          text-align: left;
        }

        .cardHeader {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 30px;
        }

        .cardHeader h2 {
          margin: 8px 0 0;
          font-size: 25px;
          letter-spacing: -0.03em;
        }

        .spark,
        .goldCircle {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #e6bd63;
          color: #171512;
          font-size: 18px;
        }

        .field {
          margin-bottom: 20px;
        }

        .field label {
          display: block;
          margin-bottom: 8px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: #736a5b;
        }

        .field input {
          width: 100%;
          height: 55px;
          border: 1px solid #dcd2c1;
          border-radius: 13px;
          background: #fffefa;
          padding: 0 16px;
          font-size: 15px;
          outline: none;
          color: #171512;
          transition: 0.2s ease;
        }

        .field input:focus {
          border-color: #c3912c;
          box-shadow: 0 0 0 3px rgba(195, 145, 44, 0.1);
        }

        .fieldHint {
          display: block;
          margin-top: 7px;
          font-size: 11px;
          color: #9a9080;
        }

        .calculateButton {
          width: 100%;
          height: 58px;
          border: 0;
          border-radius: 14px;
          background: #171512;
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 19px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .calculateButton:hover:not(:disabled) {
          transform: translateY(-2px);
          background: #28251f;
        }

        .calculateButton:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .arrow {
          font-size: 21px;
        }

        .privacy {
          text-align: center;
          margin: 14px 0 0;
          color: #968d7e;
          font-size: 10px;
        }

        .error {
          padding: 12px 14px;
          margin-bottom: 16px;
          border-radius: 10px;
          background: #fff0ed;
          color: #a43e2c;
          font-size: 12px;
        }

        .howSection {
          background: #171512;
          color: white;
          padding: 100px 20px;
          text-align: center;
        }

        .howSection .sectionEyebrow {
          color: #d7ad52;
        }

        .howSection h2 {
          margin: 18px 0 55px;
          font-size: clamp(34px, 6vw, 55px);
          line-height: 1;
          letter-spacing: -0.05em;
        }

        .howSection h2 span {
          color: #d7ad52;
        }

        .steps {
          max-width: 1050px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: #3a3731;
        }

        .step {
          padding: 35px 25px;
          background: #171512;
          text-align: left;
        }

        .stepNumber {
          color: #d7ad52;
          font-size: 11px;
          letter-spacing: 0.15em;
          font-weight: 800;
          margin-bottom: 35px;
        }

        .step h3 {
          font-size: 18px;
          margin: 0 0 10px;
        }

        .step p {
          margin: 0;
          color: #aaa399;
          font-size: 13px;
          line-height: 1.6;
        }

        .resultsSection {
          max-width: 1050px;
          margin: 0 auto;
          padding: 100px 20px;
        }

        .resultsTop {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 30px;
          margin-bottom: 35px;
        }

        .resultsTop h2 {
          font-size: clamp(34px, 6vw, 55px);
          line-height: 1;
          letter-spacing: -0.05em;
          margin: 16px 0;
        }

        .resultsTop p {
          margin: 0;
          color: #756d60;
          font-size: 14px;
        }

        .newCalculation {
          white-space: nowrap;
          background: transparent;
          border: 1px solid #cfc4b2;
          border-radius: 100px;
          padding: 12px 17px;
          cursor: pointer;
          font-size: 12px;
        }

        .numbersGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .numberCard {
          background: #fffdf8;
          border: 1px solid #e1d8ca;
          border-radius: 20px;
          padding: 28px;
          min-height: 210px;
        }

        .numberLabel {
          color: #9b7221;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.16em;
        }

        .bigNumber {
          margin: 25px 0 12px;
          font-size: 70px;
          line-height: 0.8;
          font-weight: 800;
          letter-spacing: -0.06em;
        }

        .numberDescription {
          color: #827a6d;
          font-size: 12px;
        }

        .profileDetails {
          margin-top: 14px;
          padding: 30px;
          border-radius: 20px;
          background: #171512;
          color: white;
        }

        .detailHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .detailHeader .sectionEyebrow {
          color: #d4a94c;
        }

        .detailHeader h3 {
          margin: 8px 0 0;
          font-size: 25px;
        }

        .detailsGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: #38352f;
        }

        .detail {
          min-height: 120px;
          padding: 20px;
          background: #171512;
        }

        .detail span {
          display: block;
          color: #938c80;
          font-size: 9px;
          letter-spacing: 0.13em;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .detail strong {
          font-size: 14px;
          line-height: 1.5;
          font-weight: 600;
        }

        .resultNote {
          display: flex;
          gap: 12px;
          margin-top: 18px;
          padding: 18px;
          border: 1px solid #e0d7c8;
          border-radius: 15px;
          color: #756d60;
          font-size: 11px;
          line-height: 1.6;
        }

        .resultNote span {
          color: #b78320;
        }

        .resultNote p {
          margin: 0;
        }

        footer {
          padding: 35px 20px;
          border-top: 1px solid #ded5c7;
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1050px;
          margin: 0 auto;
          gap: 20px;
        }

        .footerBrand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footerLogo {
          width: 36px;
          height: 36px;
          object-fit: cover;
          border-radius: 50%;
        }

        .footerBrand div {
          display: flex;
          flex-direction: column;
        }

        .footerBrand strong {
          font-size: 12px;
          letter-spacing: 0.12em;
        }

        .footerBrand span {
          font-size: 10px;
          color: #8b8274;
          margin-top: 4px;
        }

        footer p {
          margin: 0;
          color: #968d7f;
          font-size: 10px;
        }

        @media (max-width: 700px) {
          .hero {
            padding-bottom: 60px;
          }

          .heroContent {
            padding-top: 45px;
          }

          h1 {
            font-size: 45px;
          }

          .calculatorCard {
            padding: 21px;
            border-radius: 19px;
          }

          .steps {
            grid-template-columns: 1fr;
          }

          .step {
            padding: 28px 22px;
          }

          .resultsSection {
            padding: 70px 18px;
          }

          .resultsTop {
            display: block;
          }

          .newCalculation {
            margin-top: 20px;
          }

          .numbersGrid {
            grid-template-columns: 1fr;
          }

          .numberCard {
            min-height: 180px;
          }

          .detailsGrid {
            grid-template-columns: repeat(2, 1fr);
          }

          .profileDetails {
            padding: 20px;
          }

          footer {
            display: block;
          }

          footer p {
            margin-top: 15px;
          }
        }

        @media (max-width: 420px) {
          .nav {
            padding-top: 16px;
          }

          .maukshLogo {
            width: 38px;
            height: 38px;
          }

          .brandText strong {
            font-size: 12px;
          }

          .detailsGrid {
            grid-template-columns: 1fr;
          }

          .detail {
            min-height: auto;
          }
        }
      `}
      </style>
    </main>
  );
}