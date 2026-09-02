"use client";

import { useState } from "react";

type GridNumber = {
  number: number;
  className: string;
};

const GRID_ORDER = [3, 1, 9, 6, 7, 5, 2, 8, 4];

function reduce(n: number): number {
  while (n > 9) {
    n = n
      .toString()
      .split("")
      .reduce((a, b) => a + Number(b), 0);
  }

  return n;
}

function calculateMahadasha(
  year: number,
  birthYear: number,
  mulank: number
): number {
  const seq = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const index = seq.indexOf(mulank);

  const age = year - birthYear;

  let passed = 0;

  for (let i = 0; i < 50; i++) {
    const num = seq[(index + i) % 9];

    if (age >= passed && age < passed + num) {
      return num;
    }

    passed += num;
  }

  return seq[(index + 49) % 9];
}

function calculateAntardasha(
  day: number,
  month: number,
  year: number
): number {
  const dayDigits = day
    .toString()
    .split("")
    .reduce((a, b) => a + Number(b), 0);

  const yearDigits = year
    .toString()
    .slice(2)
    .split("")
    .reduce((a, b) => a + Number(b), 0);

  const birthday = new Date(year, month - 1, day);

  const weekdayMap = [1, 2, 9, 5, 3, 6, 8];

  const weekday = weekdayMap[birthday.getDay()];

  return reduce(dayDigits + month + yearDigits + weekday);
}

function getLocalDateParts(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);

  return {
    day,
    month,
    year,
  };
}

function buildGrid(
  nums: number[],
  mulank: number,
  bhagyank: number,
  mahadasha: number | null,
  antardasha: number | null,
  pratyantar: number | null
) {
  const count: Record<number, number> = {
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

  nums.forEach((n) => {
    if (n >= 1 && n <= 9) {
      count[n]++;
    }
  });

  return (
    <div className="mgrid">
      {GRID_ORDER.map((n) => {
        const cells: GridNumber[] = [];

        let usedMul = false;
        let usedBhag = false;
        let usedMaha = false;
        let usedAnt = false;
        let usedPraty = false;

        for (let i = 0; i < count[n]; i++) {
          let className = "";

          if (n === mulank && !usedMul) {
            className = "mulank";
            usedMul = true;
          } else if (n === bhagyank && !usedBhag) {
            className = "bhagyank";
            usedBhag = true;
          } else if (n === mahadasha && !usedMaha) {
            className = "mahadasha";
            usedMaha = true;
          } else if (n === antardasha && !usedAnt) {
            className = "antardasha";
            usedAnt = true;
          } else if (n === pratyantar && !usedPraty) {
            className = "pratyantar";
            usedPraty = true;
          }

          cells.push({
            number: n,
            className,
          });
        }

        return (
          <div className="mcell" key={n}>
            {cells.map((item, index) => (
              <span className={item.className} key={`${n}-${index}`}>
                {item.number}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default function NumerologyPage() {
  const [dob, setDob] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");

  const [report, setReport] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const [mulank, setMulank] = useState<number | null>(null);
  const [bhagyank, setBhagyank] = useState<number | null>(null);

  function generate() {
    if (!dob || !fromYear || !toYear) {
      alert("Please enter Date of Birth, From Year and To Year.");
      return;
    }

    const from = parseInt(fromYear);
    const to = parseInt(toYear);

    if (Number.isNaN(from) || Number.isNaN(to)) {
      alert("Please enter valid years.");
      return;
    }

    if (from > to) {
      alert("From Year cannot be greater than To Year.");
      return;
    }

    const { day, month, year: birthYear } = getLocalDateParts(dob);

    const calculatedMulank = reduce(day);

    const calculatedBhagyank = reduce(
      day
        .toString()
        .split("")
        .reduce((a, b) => a + Number(b), 0) +
        month +
        birthYear
          .toString()
          .split("")
          .reduce((a, b) => a + Number(b), 0)
    );

    setMulank(calculatedMulank);
    setBhagyank(calculatedBhagyank);

    setSelectedYear(null);
    setReport(true);
  }

  function openYear(year: number) {
    setSelectedYear(year);
  }

  function backToYears() {
    setSelectedYear(null);
  }

  const natalDigits =
    dob && mulank !== null && bhagyank !== null
      ? (() => {
          const { day, month, year } = getLocalDateParts(dob);

          const digits: number[] = [];

          day
            .toString()
            .split("")
            .forEach((n) => digits.push(Number(n)));

          month
            .toString()
            .split("")
            .forEach((n) => digits.push(Number(n)));

          year
            .toString()
            .slice(2)
            .split("")
            .forEach((n) => digits.push(Number(n)));

          if (day > 9) {
            digits.push(mulank);
          }

          digits.push(bhagyank);

          return digits;
        })()
      : [];

  function renderYearGrid(year: number) {
    if (!dob || mulank === null || bhagyank === null) {
      return null;
    }

    const { day, month, year: birthYear } = getLocalDateParts(dob);

    const mahadasha = calculateMahadasha(year, birthYear, mulank);

    const antardasha = calculateAntardasha(day, month, year);

    const digits = [...natalDigits];

    digits.push(mahadasha);
    digits.push(antardasha);

    return (
      <div
        className="yearBlock"
        onClick={() => openYear(year)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            openYear(year);
          }
        }}
      >
        <div className="title">
          <span>{year} - {year + 1}</span>
          <span className="watermark">mauksh.com</span>
        </div>

        {buildGrid(
          digits,
          mulank,
          bhagyank,
          mahadasha,
          antardasha,
          null
        )}
      </div>
    );
  }

  function renderDetailedYear() {
    if (
      selectedYear === null ||
      !dob ||
      mulank === null ||
      bhagyank === null
    ) {
      return null;
    }

    const { day, month, year: birthYear } = getLocalDateParts(dob);

    const mahadasha = calculateMahadasha(
      selectedYear,
      birthYear,
      mulank
    );

    const antardasha = calculateAntardasha(
      day,
      month,
      selectedYear
    );

    const seq = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const index = seq.indexOf(antardasha);

    let current = new Date(
      selectedYear,
      month - 1,
      day
    );

    const periods = [];

    for (let i = 0; i < 9; i++) {
      const num = seq[(index + i) % 9];

      const days = num <= 4 ? num * 8 : num * 8 + 1;

      const start = new Date(current);

      current.setDate(current.getDate() + days);

      const end = new Date(current);

      const digits: number[] = [];

      day
        .toString()
        .split("")
        .forEach((n) => digits.push(Number(n)));

      month
        .toString()
        .split("")
        .forEach((n) => digits.push(Number(n)));

      birthYear
        .toString()
        .slice(2)
        .split("")
        .forEach((n) => digits.push(Number(n)));

      digits.push(mulank);
      digits.push(bhagyank);
      digits.push(mahadasha);
      digits.push(antardasha);
      digits.push(num);

      periods.push({
        num,
        start,
        end,
        digits,
      });
    }

    return (
      <div className="details">
        <button
          className="backButton"
          onClick={backToYears}
        >
          ← Back to Year Grids
        </button>

        {periods.map((period, index) => (
          <div className="period" key={index}>
            <div className="title">
              <span>
                {period.start.toDateString()} -{" "}
                {period.end.toDateString()}
              </span>

              <span className="watermark">
                mauksh.com
              </span>
            </div>

            {buildGrid(
              period.digits,
              mulank,
              bhagyank,
              mahadasha,
              antardasha,
              period.num
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <main className="page">
      <div className="container">
        <div className="heading">
          <h1>Vedic Numerology Software</h1>

          <p>
            Generate your Vedic Numerology Grid using your
            date of birth.
          </p>
        </div>

        <div className="form">
          <label htmlFor="dob">
            Date of Birth
          </label>

          <input
            id="dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          <label htmlFor="fromYear">
            From Year
          </label>

          <input
            id="fromYear"
            type="number"
            value={fromYear}
            onChange={(e) =>
              setFromYear(e.target.value)
            }
            placeholder="2026"
          />

          <label htmlFor="toYear">
            To Year
          </label>

          <input
            id="toYear"
            type="number"
            value={toYear}
            onChange={(e) =>
              setToYear(e.target.value)
            }
            placeholder="2030"
          />

          <button
            className="generateButton"
            onClick={generate}
          >
            Generate Report
          </button>
        </div>

        {report && (
          <>
            <div className="legend">
              <span className="mulank">
                Mulank
              </span>

              <span>|</span>

              <span className="bhagyank">
                Bhagyank
              </span>

              <span>|</span>

              <span className="mahadasha">
                Mahadasha
              </span>

              <span>|</span>

              <span className="antardasha">
                Antardasha
              </span>

              <span>|</span>

              <span className="pratyantar">
                Pratyantar
              </span>
            </div>

            <div id="report">
              {selectedYear === null ? (
                <>
                  <div className="title">
                    <span>Natal Grid</span>
                    <span className="watermark">
                      mauksh.com
                    </span>
                  </div>

                  {buildGrid(
                    natalDigits,
                    mulank!,
                    bhagyank!,
                    null,
                    null,
                    null
                  )}

                  {Array.from(
                    {
                      length:
                        parseInt(toYear) -
                        parseInt(fromYear) +
                        1,
                    },
                    (_, i) =>
                      parseInt(fromYear) + i
                  ).map((year) =>
                    renderYearGrid(year)
                  )}
                </>
              ) : (
                renderDetailedYear()
              )}
            </div>
          </>
        )}

        <section className="description">
          <p>
            Generate your Vedic Numerology Grid on Mauksh
            using advanced calculation methods based on
            your date of birth. This tool helps you
            understand your number pattern, strengths,
            missing numbers, and overall life tendencies
            through a structured numerology grid.
          </p>

          <p>
            The Vedic numerology grid reveals important
            insights about personality, behavior,
            decision-making style, and life direction. By
            analyzing number placement and combinations,
            you can identify opportunities for growth and
            areas that need balance.
          </p>

          <p>
            Designed for accuracy and ease of use, this
            software gives clear and practical guidance to
            help you align your actions with your natural
            strengths and improve different aspects of
            your life.
          </p>
        </section>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .page {
          width: 100%;
          min-height: 100vh;
          background: #f7f7f7;
          padding: 30px 15px 60px;
          color: #111;
        }

        .container {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          background: #fff;
          padding: 25px;
          border-radius: 10px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        }

        .heading {
          margin-bottom: 25px;
        }

        h1 {
          margin: 0 0 8px;
          font-size: 30px;
          line-height: 1.2;
        }

        .heading p {
          margin: 0;
          color: #666;
          font-size: 15px;
        }

        .form {
          width: 100%;
        }

        label {
          display: block;
          margin-top: 14px;
          margin-bottom: 6px;
          font-weight: 700;
          font-size: 15px;
        }

        input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 16px;
          background: #fff;
          color: #111;
        }

        input:focus {
          outline: none;
          border-color: #ff8c00;
          box-shadow: 0 0 0 2px
            rgba(255, 140, 0, 0.12);
        }

        button {
          font-family: inherit;
        }

        .generateButton {
          width: 100%;
          margin-top: 18px;
          padding: 13px 20px;
          border: none;
          border-radius: 6px;
          background: #ff8c00;
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }

        .generateButton:hover {
          opacity: 0.92;
        }

        .legend {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          align-items: center;
          margin: 25px 0 15px;
          font-size: 14px;
          line-height: 1.6;
        }

        .mulank {
          color: red;
          font-weight: 700;
        }

        .bhagyank {
          color: green;
          font-weight: 700;
        }

        .mahadasha {
          color: #ff1493;
          font-weight: 700;
        }

        .antardasha {
          color: #00aaff;
          font-weight: 700;
        }

        .pratyantar {
          color: blue;
          font-weight: 700;
        }

        .title {
          width: 100%;
          min-height: 44px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 10px 12px;
          margin-top: 25px;
          background: #ff8c00;
          color: #fff;
          font-weight: 700;
          position: relative;
          overflow: hidden;
        }

        .watermark {
          flex-shrink: 0;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.5);
        }

        .mgrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          background: #999;
          width: 100%;
          margin-top: 0;
        }

        .mcell {
          min-width: 0;
          height: 65px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2px;
          padding: 4px;
          background: #fff;
          font-size: 18px;
          font-weight: 700;
          overflow: hidden;
        }

        .mcell span {
          display: inline-block;
          white-space: nowrap;
          margin: 0 2px;
        }

        .yearBlock {
          cursor: pointer;
          margin-top: 20px;
          transition: transform 0.15s ease;
        }

        .yearBlock:hover {
          transform: translateY(-1px);
        }

        .yearBlock:focus {
          outline: 2px solid #ff8c00;
          outline-offset: 3px;
        }

        .backButton {
          width: 100%;
          padding: 12px;
          margin: 20px 0 5px;
          border: none;
          border-radius: 6px;
          background: #444;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
        }

        .period {
          margin-top: 10px;
        }

        .description {
          margin-top: 40px;
          padding-top: 25px;
          border-top: 1px solid #e5e5e5;
          color: #444;
          font-size: 15px;
          line-height: 1.7;
        }

        .description p {
          margin: 0 0 18px;
        }

        @media (max-width: 600px) {
          .page {
            padding: 15px 8px 40px;
          }

          .container {
            padding: 16px;
            border-radius: 7px;
          }

          h1 {
            font-size: 24px;
          }

          .title {
            font-size: 14px;
            min-height: 42px;
          }

          .mcell {
            height: 58px;
            font-size: 17px;
          }

          .legend {
            font-size: 13px;
          }

          .description {
            font-size: 14px;
          }
        }
      `}</style>
    </main>
  );
}