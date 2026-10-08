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

function calculateBhagyank(
  day: number,
  month: number,
  year: number
): number {
  return reduceNumber(day + month + year);
}

function calculateNameNumber(name: string): number {
  const cleanName = name
    .toUpperCase()
    .replace(/[^A-Z]/g, "");

  const total = cleanName
    .split("")
    .reduce(
      (sum, letter) => sum + (NAME_VALUES[letter] || 0),
      0
    );

  return reduceNumber(total);
}

/*
  Internal Mauksh Vedic Grid

  3 1 9
  6 7 5
  2 8 4

  Century digits are excluded.
  Zero is ignored.
  The grid is not displayed.
*/

function getVedicGrid(
  day: number,
  month: number,
  year: number
) {
  const digits =
    `${String(day).padStart(2, "0")}` +
    `${String(month).padStart(2, "0")}` +
    `${String(year).slice(-2)}`;

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

  for (const digit of digits) {
    const number = Number(digit);

    if (number >= 1 && number <= 9) {
      counts[number]++;
    }
  }

  return counts;
}

function parseDOB(value: string) {
  if (!value) return null;

  const match = value.match(
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
  );

  if (!match) return null;

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

function getResult(
  name: string,
  dob: string
): Result | null {
  const parsed = parseDOB(dob);

  if (!parsed || !name.trim()) {
    return null;
  }

  const { day, month, year } = parsed;

  const mulank = calculateMulank(day);
  const bhagyank = calculateBhagyank(
    day,
    month,
    year
  );
  const nameNumber = calculateNameNumber(name);

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

function CoreNumberCard({
  label,
  number,
  description,
}: {
  label: string;
  number: number;
  description: string;
}) {
  return (
    <div className="coreCard">
      <div className="coreTop">
        <span>{label}</span>
        <div className="miniSpark">✦</div>
      </div>

      <div className="coreNumber">
        {number}
      </div>

      <p>{description}</p>
    </div>
  );
}

export default function Home() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [result, setResult] =
    useState<Result | null>(null);
  const [error, setError] = useState("");

  const isValid = useMemo(() => {
    return (
      name.trim().length > 1 &&
      !!parseDOB(dob)
    );
  }, [name, dob]);

  function handleDOBChange(value: string) {
    if (!value) {
      setDob("");
      return;
    }

    const [year, month, day] =
      value.split("-");

    setDob(
      `${day}/${month}/${year}`
    );
  }

  function dobForInput() {
    if (!dob) return "";

    const parts = dob.split("/");

    if (parts.length !== 3) {
      return "";
    }

    const [day, month, year] = parts;

    return `${year}-${month.padStart(
      2,
      "0"
    )}-${day.padStart(2, "0")}`;
  }

  function calculate() {
    setError("");

    if (!name.trim()) {
      setError(
        "Please enter your full name."
      );
      return;
    }

    if (!parseDOB(dob)) {
      setError(
        "Please select your date of birth."
      );
      return;
    }

    const calculated = getResult(
      name,
      dob
    );

    if (!calculated) {
      setError(
        "Please check your details."
      );
      return;
    }

    setResult(calculated);

    setTimeout(() => {
      document
        .getElementById("results")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
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

      {/* ================= HERO ================= */}

      <section className="hero">

        <nav className="topNav">

          <div className="brand">

            <img
              src="/assets/mauksh-logo.jpg"
              alt="Mauksh"
              className="logo"
            />

            <div className="brandCopy">
              <strong>MAUKSH AI</strong>
              <span>NUMEROLOGY</span>
            </div>

          </div>

          <div className="freeBadge">
            FREE
          </div>

        </nav>

        <div className="heroContent">

          <div className="eyebrow">
            <span>✦</span>
            NUMEROLOGY, MADE PERSONAL
          </div>

          <h1>
            Your numbers.
            <br />
            <em>Your story.</em>
          </h1>

          <p className="heroDescription">
            Discover your Mulank, Bhagyank
            and Name Number using the Mauksh
            numerology system.
          </p>

          <div className="calculator">

            <div className="calculatorHeading">

              <div>
                <div className="microLabel">
                  START YOUR READING
                </div>

                <h2>
                  Enter your details
                </h2>
              </div>

              <div className="goldIcon">
                ✦
              </div>

            </div>

            <div className="inputGroup">

              <label htmlFor="name">
                FULL BIRTH NAME
              </label>

              <input
                id="name"
                type="text"
                value={name}
                placeholder="Your full name"
                onChange={(e) =>
                  setName(e.target.value)
                }
                autoComplete="name"
              />

            </div>

            <div className="inputGroup">

              <label htmlFor="dob">
                DATE OF BIRTH
              </label>

              <div className="dateBox">

                <input
                  id="dob"
                  type="date"
                  value={dobForInput()}
                  onChange={(e) =>
                    handleDOBChange(
                      e.target.value
                    )
                  }
                />

                <span className="calendarIcon">
                  ▣
                </span>

              </div>

              <small>
                Select your birth date
              </small>

            </div>

            {error && (
              <div className="errorBox">
                {error}
              </div>
            )}

            <button
              type="button"
              className="calculateButton"
              onClick={calculate}
              disabled={!isValid}
            >
              <span>
                Reveal My Numbers
              </span>

              <strong>→</strong>
            </button>

            <div className="secureLine">
              <span>✦</span>
              Instant calculation · No
              account required
            </div>

          </div>

        </div>

      </section>

      {/* ================= INTRO ================= */}

      <section className="introSection">

        <div className="sectionTag">
          THE MAUKSH METHOD
        </div>

        <h2>
          Three numbers.
          <br />
          <span>A deeper perspective.</span>
        </h2>

        <div className="introCards">

          <div>
            <span>01</span>
            <strong>Mulank</strong>
            <p>
              Your birth number and the
              energy you naturally carry.
            </p>
          </div>

          <div>
            <span>02</span>
            <strong>Bhagyank</strong>
            <p>
              Your destiny number derived
              from your complete birth date.
            </p>
          </div>

          <div>
            <span>03</span>
            <strong>Name Number</strong>
            <p>
              The numerical vibration
              associated with your name.
            </p>
          </div>

        </div>

      </section>

      {/* ================= RESULTS ================= */}

      {result && (

        <section
          id="results"
          className="resultsSection"
        >

          <div className="resultsHeader">

            <div>

              <div className="sectionTag gold">
                YOUR MAUKSH PROFILE
              </div>

              <h2>
                Hello,{" "}
                <span>
                  {name.trim()}
                </span>
              </h2>

              <p>
                Your core numerology profile
                is ready.
              </p>

            </div>

            <button
              type="button"
              className="newButton"
              onClick={reset}
            >
              <span>↻</span>
              New reading
            </button>

          </div>

          {/* CORE NUMBERS */}

          <div className="coreGrid">

            <CoreNumberCard
              label="MULANK"
              number={result.mulank}
              description="Birth number"
            />

            <CoreNumberCard
              label="BHAGYANK"
              number={result.bhagyank}
              description="Destiny number"
            />

            <CoreNumberCard
              label="NAME"
              number={result.nameNumber}
              description="Name vibration"
            />

          </div>

          {/* FAVOURABLE */}

          <div className="favourable">

            <div className="favourableHeader">

              <div>

                <div className="sectionTag light">
                  YOUR NUMEROLOGY
                </div>

                <h3>
                  Favourable energies
                </h3>

              </div>

              <div className="largeGoldIcon">
                ✦
              </div>

            </div>

            <div className="energyGrid">

              <div className="energyItem">
                <span>
                  NUMBERS
                </span>
                <strong>
                  {result.favourableNumber}
                </strong>
              </div>

              <div className="energyItem">
                <span>
                  DAYS
                </span>
                <strong>
                  {result.days}
                </strong>
              </div>

              <div className="energyItem">
                <span>
                  COLOURS
                </span>
                <strong>
                  {result.colour}
                </strong>
              </div>

              <div className="energyItem">
                <span>
                  ALPHABETS
                </span>
                <strong>
                  {result.alphabets}
                </strong>
              </div>

              <div className="energyItem">
                <span>
                  PLANET
                </span>
                <strong>
                  {result.planet}
                </strong>
              </div>

              <div className="energyItem">
                <span>
                  DIRECTION
                </span>
                <strong>
                  {result.direction}
                </strong>
              </div>

              <div className="energyItem">
                <span>
                  DEITY
                </span>
                <strong>
                  {result.deity}
                </strong>
              </div>

              <div className="energyItem">
                <span>
                  DATES
                </span>
                <strong>
                  {result.dates}
                </strong>
              </div>

            </div>

          </div>

          <div className="disclaimer">

            <span>✦</span>

            <p>
              Numerology is intended for
              reflection and guidance. It
              should not be treated as an
              absolute prediction.
            </p>

          </div>

        </section>

      )}

      {/* ================= FOOTER ================= */}

      <footer>

        <div className="footerBrand">

          <img
            src="/assets/mauksh-logo.jpg"
            alt="Mauksh"
          />

          <div>
            <strong>MAUKSH AI</strong>
            <span>
              Spirituality is Personal.
            </span>
          </div>

        </div>

        <span className="copyright">
          © {new Date().getFullYear()} Mauksh
        </span>

      </footer>

      <style jsx>{`

        .page {
          min-height: 100vh;
          background: #f7f3eb !important;
          color: #171512 !important;
          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        .page *,
        .page *::before,
        .page *::after {
          box-sizing: border-box;
        }

        /* ================= NAV ================= */

        .topNav {
          width: min(
            1160px,
            calc(100% - 40px)
          );
          margin: auto;
          padding: 22px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .logo {
          width: 43px;
          height: 43px;
          border-radius: 50%;
          object-fit: cover;
        }

        .brandCopy {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .brandCopy strong {
          font-size: 13px;
          letter-spacing: .13em;
          line-height: 1;
        }

        .brandCopy span {
          font-size: 8px;
          letter-spacing: .2em;
          color: #8d8373;
        }

        .freeBadge {
          border: 1px solid #d9cfbf;
          border-radius: 50px;
          padding: 8px 13px;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .16em;
          color: #765b25;
        }

        /* ================= HERO ================= */

        .hero {
          min-height: 100vh;
          padding-bottom: 90px;
          background:
            radial-gradient(
              circle at 50% 5%,
              rgba(222, 177, 73, .16),
              transparent 35%
            ),
            #f7f3eb;
        }

        .heroContent {
          width: min(
            760px,
            calc(100% - 40px)
          );
          margin: auto;
          padding-top: 75px;
          text-align: center;
        }

        .eyebrow,
        .sectionTag,
        .microLabel {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .22em;
          color: #9a711f;
        }

        .eyebrow span {
          margin-right: 7px;
        }

        h1 {
          margin: 22px 0 20px;
          font-size: clamp(
            48px,
            8vw,
            82px
          );
          line-height: .93;
          letter-spacing: -.065em;
          font-weight: 850;
        }

        h1 em {
          color: #bc8b2d;
          font-style: normal;
        }

        .heroDescription {
          max-width: 560px;
          margin: auto;
          color: #766e62;
          font-size: 15px;
          line-height: 1.7;
        }

        /* ================= CALCULATOR ================= */

        .calculator {
          max-width: 560px;
          margin: 42px auto 0;
          padding: 29px;
          text-align: left;
          border: 1px solid #e0d6c5;
          border-radius: 26px;
          background: rgba(
            255,
            253,
            248,
            .92
          );
          box-shadow:
            0 25px 70px
            rgba(
              54,
              42,
              21,
              .09
            );
        }

        .calculatorHeading {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 28px;
        }

        .calculatorHeading h2 {
          margin: 7px 0 0;
          font-size: 25px;
          letter-spacing: -.04em;
        }

        .goldIcon {
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #e3bb61;
          color: #171512;
        }

        .inputGroup {
          margin-bottom: 19px;
        }

        .inputGroup label {
          display: block;
          margin-bottom: 8px;
          color: #70685c;
          font-size: 9px;
          font-weight: 850;
          letter-spacing: .16em;
        }

        .inputGroup input {
          width: 100% !important;
          height: 56px !important;
          border: 1px solid #dcd1bf !important;
          border-radius: 13px !important;
          outline: none !important;
          background: #fffefa !important;
          color: #171512 !important;
          padding: 0 15px !important;
          font-size: 15px !important;
          box-shadow: none !important;
        }

        .inputGroup input:focus {
          border-color: #bd8b2c !important;
          box-shadow:
            0 0 0 3px
            rgba(
              189,
              139,
              44,
              .1
            ) !important;
        }

        .dateBox {
          position: relative;
        }

        .dateBox input {
          padding-right: 45px !important;
        }

        .calendarIcon {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #a17725;
          pointer-events: none;
        }

        .inputGroup small {
          display: block;
          margin-top: 7px;
          color: #9b9181;
          font-size: 10px;
        }

        .errorBox {
          padding: 12px;
          margin-bottom: 15px;
          border-radius: 10px;
          background: #fff0ec;
          color: #a64432;
          font-size: 12px;
        }

        .calculateButton {
          width: 100% !important;
          height: 58px !important;
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          padding: 0 18px !important;
          border: 0 !important;
          border-radius: 14px !important;
          background: #171512 !important;
          color: #fff !important;
          font-size: 14px !important;
          font-weight: 750 !important;
          cursor: pointer;
        }

        .calculateButton strong {
          font-size: 20px;
        }

        .calculateButton:disabled {
          opacity: .42;
          cursor: not-allowed;
        }

        .secureLine {
          display: flex;
          justify-content: center;
          gap: 7px;
          margin-top: 13px;
          color: #9a9081;
          font-size: 9px;
        }

        .secureLine span {
          color: #b78325;
        }

        /* ================= INTRO ================= */

        .introSection {
          padding: 105px 20px;
          background: #171512;
          color: #fff;
          text-align: center;
        }

        .introSection .sectionTag {
          color: #d3a84e;
        }

        .introSection h2 {
          margin: 17px 0 55px;
          font-size: clamp(
            36px,
            6vw,
            58px
          );
          line-height: .98;
          letter-spacing: -.055em;
        }

        .introSection h2 span {
          color: #d3a84e;
        }

        .introCards {
          width: min(
            1050px,
            100%
          );
          margin: auto;
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          border-top: 1px solid #3a3731;
          border-bottom: 1px solid #3a3731;
        }

        .introCards > div {
          padding: 32px;
          text-align: left;
          border-right: 1px solid #3a3731;
        }

        .introCards > div:last-child {
          border-right: 0;
        }

        .introCards span {
          display: block;
          color: #d3a84e;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .15em;
          margin-bottom: 32px;
        }

        .introCards strong {
          display: block;
          font-size: 20px;
          margin-bottom: 9px;
        }

        .introCards p {
          margin: 0;
          color: #9f988d;
          font-size: 12px;
          line-height: 1.7;
        }

        /* ================= RESULTS ================= */

        .resultsSection {
          width: min(
            1050px,
            calc(100% - 40px)
          );
          margin: auto;
          padding: 90px 0;
        }

        .resultsHeader {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 30px;
          margin-bottom: 28px;
        }

        .sectionTag.gold {
          color: #9d741f;
        }

        .resultsHeader h2 {
          margin: 13px 0 9px;
          font-size: clamp(
            38px,
            6vw,
            58px
          );
          line-height: .95;
          letter-spacing: -.06em;
        }

        .resultsHeader h2 span {
          color: #bc8b2d;
        }

        .resultsHeader p {
          margin: 0;
          color: #81786b;
          font-size: 13px;
        }

        .newButton {
          flex-shrink: 0;
          display: flex !important;
          align-items: center !important;
          gap: 8px;
          height: 43px !important;
          padding: 0 15px !important;
          border: 1px solid #cfc3b0 !important;
          border-radius: 50px !important;
          background: transparent !important;
          color: #494238 !important;
          font-size: 11px !important;
          font-weight: 650 !important;
          cursor: pointer;
          box-shadow: none !important;
        }

        .newButton span {
          color: #aa7c24;
          font-size: 15px;
        }

        /* ================= CORE NUMBERS ================= */

        .coreGrid {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 12px;
        }

        .coreCard {
          position: relative;
          min-height: 205px;
          padding: 24px;
          overflow: hidden;
          border: 1px solid #dfd5c4;
          border-radius: 20px;
          background: #fffdf8;
          box-shadow:
            0 10px 35px
            rgba(
              56,
              43,
              23,
              .045
            );
        }

        .coreCard::after {
          content: "";
          position: absolute;
          width: 100px;
          height: 100px;
          right: -35px;
          bottom: -45px;
          border-radius: 50%;
          background: #f1dfb5;
          opacity: .55;
        }

        .coreTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .coreTop > span {
          color: #997121;
          font-size: 9px;
          font-weight: 850;
          letter-spacing: .17em;
        }

        .miniSpark {
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #f0d99e;
          color: #7c5a18;
          font-size: 12px;
        }

        .coreNumber {
          margin-top: 30px;
          font-size: 67px;
          font-weight: 850;
          line-height: .8;
          letter-spacing: -.07em;
        }

        .coreCard p {
          margin: 14px 0 0;
          color: #837a6c;
          font-size: 11px;
        }

        /* ================= FAVOURABLE ================= */

        .favourable {
          margin-top: 13px;
          padding: 29px;
          border-radius: 22px;
          background: #171512;
          color: #fff;
        }

        .favourableHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
        }

        .sectionTag.light {
          color: #d4aa52;
        }

        .favourableHeader h3 {
          margin: 8px 0 0;
          font-size: 27px;
          letter-spacing: -.04em;
        }

        .largeGoldIcon {
          width: 52px;
          height: 52px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #e3bb61;
          color: #171512;
          font-size: 21px;
        }

        .energyGrid {
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          border: 1px solid #302e29;
          border-radius: 14px;
          overflow: hidden;
        }

        .energyItem {
          min-height: 112px;
          padding: 19px;
          background: #191816;
          border-right: 1px solid #302e29;
          border-bottom: 1px solid #302e29;
        }

        .energyItem:nth-child(4n) {
          border-right: 0;
        }

        .energyItem:nth-last-child(-n + 4) {
          border-bottom: 0;
        }

        .energyItem span {
          display: block;
          margin-bottom: 11px;
          color: #8f897f;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: .15em;
        }

        .energyItem strong {
          font-size: 13px;
          line-height: 1.45;
          font-weight: 650;
        }

        /* ================= DISCLAIMER ================= */

        .disclaimer {
          display: flex;
          gap: 10px;
          margin-top: 14px;
          padding: 15px 17px;
          border: 1px solid #dfd5c5;
          border-radius: 13px;
          color: #7f7668;
          font-size: 10px;
          line-height: 1.6;
        }

        .disclaimer span {
          color: #ad7e23;
        }

        .disclaimer p {
          margin: 0;
        }

        /* ================= FOOTER ================= */

        footer {
          width: min(
            1050px,
            calc(100% - 40px)
          );
          margin: auto;
          padding: 30px 0;
          border-top: 1px solid #ded5c7;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .footerBrand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footerBrand img {
          width: 35px;
          height: 35px;
          object-fit: cover;
          border-radius: 50%;
        }

        .footerBrand div {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .footerBrand strong {
          font-size: 11px;
          letter-spacing: .13em;
        }

        .footerBrand span,
        .copyright {
          color: #948a7b;
          font-size: 9px;
        }

        /* ================= MOBILE ================= */

        @media (max-width: 700px) {

          .topNav {
            width: calc(100% - 30px);
            padding: 17px 0;
          }

          .logo {
            width: 38px;
            height: 38px;
          }

          .brandCopy strong {
            font-size: 11px;
          }

          .hero {
            min-height: auto;
            padding-bottom: 65px;
          }

          .heroContent {
            width: calc(100% - 30px);
            padding-top: 48px;
          }

          .eyebrow {
            font-size: 8px;
          }

          h1 {
            margin-top: 18px;
            font-size: 47px;
          }

          .heroDescription {
            font-size: 13px;
            line-height: 1.65;
          }

          .calculator {
            margin-top: 30px;
            padding: 20px;
            border-radius: 21px;
          }

          .calculatorHeading {
            margin-bottom: 23px;
          }

          .calculatorHeading h2 {
            font-size: 21px;
          }

          .goldIcon {
            width: 37px;
            height: 37px;
          }

          .introSection {
            padding: 72px 18px;
          }

          .introSection h2 {
            margin-bottom: 35px;
            font-size: 38px;
          }

          .introCards {
            display: block;
          }

          .introCards > div {
            padding: 24px 0;
            border-right: 0;
            border-bottom: 1px solid #35322d;
          }

          .introCards > div:last-child {
            border-bottom: 0;
          }

          .introCards span {
            margin-bottom: 17px;
          }

          .resultsSection {
            width: calc(100% - 30px);
            padding: 62px 0;
          }

          .resultsHeader {
            display: block;
            margin-bottom: 22px;
          }

          .resultsHeader h2 {
            font-size: 40px;
            margin-top: 11px;
          }

          .resultsHeader p {
            font-size: 12px;
          }

          .newButton {
            margin-top: 18px;
          }

          /*
            Mobile core cards are intentionally compact.
            This fixes the large empty vertical areas
            visible in the previous screenshot.
          */

          .coreGrid {
            grid-template-columns:
              repeat(3, 1fr);
            gap: 7px;
          }

          .coreCard {
            min-height: 142px;
            padding: 14px 11px;
            border-radius: 15px;
          }

          .coreCard::after {
            width: 55px;
            height: 55px;
            right: -25px;
            bottom: -25px;
          }

          .coreTop > span {
            font-size: 7px;
            letter-spacing: .11em;
          }

          .miniSpark {
            width: 21px;
            height: 21px;
            font-size: 9px;
          }

          .coreNumber {
            margin-top: 22px;
            font-size: 46px;
          }

          .coreCard p {
            margin-top: 10px;
            font-size: 8px;
          }

          .favourable {
            margin-top: 10px;
            padding: 18px;
            border-radius: 18px;
          }

          .favourableHeader {
            margin-bottom: 19px;
          }

          .favourableHeader h3 {
            font-size: 22px;
          }

          .largeGoldIcon {
            width: 40px;
            height: 40px;
            font-size: 16px;
          }

          .energyGrid {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .energyItem {
            min-height: 91px;
            padding: 15px;
          }

          .energyItem:nth-child(4n) {
            border-right: 1px solid #302e29;
          }

          .energyItem:nth-child(2n) {
            border-right: 0;
          }

          .energyItem:nth-last-child(-n + 4) {
            border-bottom: 1px solid #302e29;
          }

          .energyItem:nth-last-child(-n + 2) {
            border-bottom: 0;
          }

          .energyItem strong {
            font-size: 12px;
          }

          .disclaimer {
            font-size: 9px;
          }

          footer {
            width: calc(100% - 30px);
            display: block;
            padding: 25px 0;
          }

          .copyright {
            display: block;
            margin-top: 14px;
          }
        }

        @media (max-width: 380px) {

          h1 {
            font-size: 42px;
          }

          .coreCard {
            padding: 12px 9px;
          }

          .coreNumber {
            font-size: 42px;
          }

          .coreTop > span {
            font-size: 6.5px;
          }

          .coreCard p {
            font-size: 7px;
          }
        }

      `}</style>

    </main>
  );
}