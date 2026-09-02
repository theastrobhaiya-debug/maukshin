"use client";

import { useState } from "react";

export default function VedicNumerologySoftware() {
  const [dob, setDob] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [report, setReport] = useState("");
  const [view, setView] = useState<"main" | "year">("main");

  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const [mulank, setMulank] = useState<number | null>(null);
  const [bhagyank, setBhagyank] = useState<number | null>(null);
  const [mahadasha, setMahadasha] = useState<number | null>(null);
  const [antardasha, setAntardasha] = useState<number | null>(null);
  const [pratyantarNum, setPratyantarNum] = useState<number | null>(null);

  function reduce(n: number) {
    while (n > 9) {
      n = n
        .toString()
        .split("")
        .reduce((a, b) => a + Number(b), 0);
    }

    return n;
  }

  function buildGrid(nums: number[]) {
    const count: {
      [key: number]: number;
    } = {
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

    const order = [3, 1, 9, 6, 7, 5, 2, 8, 4];

    let html = '<div class="mgrid">';

    order.forEach((n) => {
      let cell = "";

      let usedMul = false;
      let usedBhag = false;
      let usedMaha = false;
      let usedAnt = false;
      let usedPraty = false;

      for (let i = 0; i < count[n]; i++) {
        let cls = "";

        if (n === mulank && !usedMul) {
          cls = "mulank";
          usedMul = true;
        } else if (n === bhagyank && !usedBhag) {
          cls = "bhagyank";
          usedBhag = true;
        } else if (n === mahadasha && !usedMaha) {
          cls = "mahadasha";
          usedMaha = true;
        } else if (n === antardasha && !usedAnt) {
          cls = "antardasha";
          usedAnt = true;
        } else if (n === pratyantarNum && !usedPraty) {
          cls = "pratyantar";
          usedPraty = true;
        }

        cell += `<span class="${cls}">${n}</span>`;
      }

      html += `<div class="mcell">${cell}</div>`;
    });

    html += "</div>";

    return html;
  }

  function calculateMahadasha(year: number, birthYear: number) {
    const seq = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const index = seq.indexOf(mulank as number);

    const age = year - birthYear;

    let passed = 0;

    for (let i = 0; i < 50; i++) {
      const num = seq[(index + i) % 9];

      if (age >= passed && age < passed + num) {
        return num;
      }

      passed += num;
    }

    return 1;
  }

  function calculateAntardasha(
    day: number,
    month: number,
    year: number
  ) {
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

  function generate() {
    if (!dob || !fromYear || !toYear) {
      alert("Please enter Date of Birth, From Year and To Year.");
      return;
    }

    const date = new Date(dob + "T00:00:00");

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const birthYear = date.getFullYear();

    const newMulank = reduce(day);

    const newBhagyank = reduce(
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

    setMulank(newMulank);
    setBhagyank(newBhagyank);

    let natalDigits: number[] = [];

    day
      .toString()
      .split("")
      .forEach((n) => natalDigits.push(Number(n)));

    month
      .toString()
      .split("")
      .forEach((n) => natalDigits.push(Number(n)));

    birthYear
      .toString()
      .slice(2)
      .split("")
      .forEach((n) => natalDigits.push(Number(n)));

    if (day > 9) {
      natalDigits.push(newMulank);
    }

    natalDigits.push(newBhagyank);

    let output = `<div class="title">Natal Grid</div>`;

    setMahadasha(null);
    setAntardasha(null);
    setPratyantarNum(null);

    output += buildGrid(natalDigits);

    const from = parseInt(fromYear);
    const to = parseInt(toYear);

    for (let y = from; y <= to; y++) {
      const maha = calculateMahadasha(y, birthYear);

      const antar = calculateAntardasha(
        day,
        month,
        y
      );

      let digits = [...natalDigits];

      digits.push(maha);
      digits.push(antar);

      output += `
        <div class="yearBlock" data-year="${y}">
          <div class="title">${y} - ${y + 1}</div>
          ${buildGrid(digits)}
        </div>
      `;
    }

    setReport(output);
    setView("main");
    setSelectedYear(null);
  }

  function openYear(year: number) {
    if (!dob) return;

    const date = new Date(dob + "T00:00:00");

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const birthYear = date.getFullYear();

    const maha = calculateMahadasha(
      year,
      birthYear
    );

    const antar = calculateAntardasha(
      day,
      month,
      year
    );

    setMahadasha(maha);
    setAntardasha(antar);

    setSelectedYear(year);

    const seq = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const index = seq.indexOf(antar);

    let current = new Date(
      year,
      month - 1,
      day
    );

    let output = `
      <div
        class="backButton"
        id="backButton"
      >
        ⬅ Back to Year Grids
      </div>
    `;

    for (let i = 0; i < 9; i++) {
      const num = seq[(index + i) % 9];

      setPratyantarNum(num);

      let digits: number[] = [];

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

      digits.push(mulank as number);
      digits.push(bhagyank as number);
      digits.push(maha);
      digits.push(antar);
      digits.push(num);

      const start = new Date(current);

      const days =
        num <= 4 ? num * 8 : num * 8 + 1;

      current.setDate(
        current.getDate() + days
      );

      const end = new Date(current);

      output += `
        <div class="title">
          ${start.toDateString()} - ${end.toDateString()}
        </div>

        ${buildGrid(digits)}
      `;
    }

    setReport(output);
    setView("year");
  }

  function handleReportClick(
    e: React.MouseEvent<HTMLDivElement>
  ) {
    const target = e.target as HTMLElement;

    const yearBlock =
      target.closest(".yearBlock");

    if (yearBlock) {
      const year = Number(
        yearBlock.getAttribute("data-year")
      );

      if (year) {
        openYear(year);
      }

      return;
    }

    if (
      target.id === "backButton" ||
      target.closest("#backButton")
    ) {
      generate();
    }
  }

  return (
    <>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        .numerology-page {
          width: 100%;
          background: white;
          color: black;
          min-height: 100vh;
        }

        .container {
          max-width: 100%;
          margin: auto;
          background: white;
          padding: 20px;
          border-radius: 8px;
        }

        .title {
          background: #ff8c00;
          color: white;
          padding: 10px;
          font-weight: bold;
          margin-top: 25px;
          position: relative;
          overflow: hidden;
        }

        .title::after {
          content: "mauksh.com";
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          font-weight: normal;
        }

        label {
          display: block;
          margin-top: 10px;
          font-weight: bold;
        }

        input {
          padding: 10px;
          margin: 5px;
          width: 100%;
          font-size: 16px;
          box-sizing: border-box;
        }

        button {
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
        }

        .legend {
          margin-top: 10px;
          font-size: 14px;
        }

        .mulank {
          color: red;
          font-weight: bold;
        }

        .bhagyank {
          color: green;
          font-weight: bold;
        }

        .mahadasha {
          color: #ff1493;
          font-weight: bold;
        }

        .antardasha {
          color: #00aaff;
          font-weight: bold;
        }

        .pratyantar {
          color: blue;
          font-weight: bold;
        }

        .mgrid {
          display: grid !important;
          grid-template-columns: repeat(3, 1fr) !important;
          gap: 2px !important;
          background: #999 !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        .mgrid > div {
          min-width: 0 !important;
        }

        .mcell {
          background: white !important;
          height: 60px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: 18px !important;
          font-weight: bold !important;
          min-width: 0 !important;
          overflow: hidden !important;
        }

        .mcell span {
          display: inline-block !important;
          white-space: nowrap !important;
          margin: 0 2px !important;
        }

        .yearBlock {
          cursor: pointer;
          margin-top: 15px;
        }

        .backButton {
          background: #444;
          color: white;
          padding: 10px;
          margin-top: 20px;
          cursor: pointer;
          border: none;
          display: block;
          width: 100%;
        }

        .numerology-description {
          margin-top: 25px;
          line-height: 1.6;
        }

        @media (max-width: 600px) {
          .container {
            padding: 20px;
          }

          .mcell {
            height: 60px !important;
            font-size: 18px !important;
          }
        }
      `}</style>

      <div className="numerology-page">

        <div className="container">

          <h2>
            Vedic Numerology Software
          </h2>

          <label>
            Date of Birth
          </label>

          <input
            type="date"
            value={dob}
            onChange={(e) =>
              setDob(e.target.value)
            }
          />

          <label>
            From Year
          </label>

          <input
            type="number"
            value={fromYear}
            onChange={(e) =>
              setFromYear(e.target.value)
            }
          />

          <label>
            To Year
          </label>

          <input
            type="number"
            value={toYear}
            onChange={(e) =>
              setToYear(e.target.value)
            }
          />

          <button onClick={generate}>
            Generate Report
          </button>

          <div className="legend">
            <span className="mulank">
              Mulank
            </span>{" "}
            |{" "}
            <span className="bhagyank">
              Bhagyank
            </span>{" "}
            |{" "}
            <span className="mahadasha">
              Mahadasha
            </span>{" "}
            |{" "}
            <span className="antardasha">
              Antardasha
            </span>{" "}
            |{" "}
            <span className="pratyantar">
              Pratyantar
            </span>
          </div>

          <div
            id="report"
            onClick={handleReportClick}
            dangerouslySetInnerHTML={{
              __html: report,
            }}
          />

          <div className="numerology-description">

            <p>
              Generate your Vedic Numerology Grid on
              Mauksh using advanced calculation
              methods based on your date of birth.
              This tool helps you understand your
              number pattern, strengths, missing
              numbers, and overall life tendencies
              through a structured numerology grid.
            </p>

            <p>
              The Vedic numerology grid reveals
              important insights about personality,
              behavior, decision-making style, and
              life direction. By analyzing number
              placement and combinations, you can
              identify opportunities for growth and
              areas that need balance.
            </p>

            <p>
              Designed for accuracy and ease of use,
              this software gives clear and practical
              guidance to help you align your actions
              with your natural strengths and improve
              different aspects of your life.
            </p>

          </div>

        </div>

      </div>
    </>
  );
}