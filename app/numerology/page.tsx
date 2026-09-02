"use client";

import { useState } from "react";

export default function Page() {
  const [dob, setDob] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [report, setReport] = useState("");

  const [mulank, setMulank] = useState<number | null>(null);
  const [bhagyank, setBhagyank] = useState<number | null>(null);
  const [mahadasha, setMahadasha] = useState<number | null>(null);
  const [antardasha, setAntardasha] = useState<number | null>(null);
  const [pratyantarNum, setPratyantarNum] = useState<number | null>(null);

  // ============================================================
  // REDUCE NUMBER
  // ============================================================

  function reduce(n: number): number {
    while (n > 9) {
      n = n
        .toString()
        .split("")
        .reduce((a, b) => a + Number(b), 0);
    }

    return n;
  }

  // ============================================================
  // BUILD GRID
  // EXACT ORIGINAL COLOR PRIORITY
  // ============================================================

  function buildGrid(
    nums: number[],
    mulankValue: number | null,
    bhagyankValue: number | null,
    mahadashaValue: number | null,
    antardashaValue: number | null,
    pratyantarValue: number | null
  ) {
    const count: { [key: number]: number } = {
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

        // EXACT ORIGINAL PRIORITY
        if (n === mulankValue && !usedMul) {
          cls = "mulank";
          usedMul = true;
        } else if (n === bhagyankValue && !usedBhag) {
          cls = "bhagyank";
          usedBhag = true;
        } else if (n === mahadashaValue && !usedMaha) {
          cls = "mahadasha";
          usedMaha = true;
        } else if (n === antardashaValue && !usedAnt) {
          cls = "antardasha";
          usedAnt = true;
        } else if (n === pratyantarValue && !usedPraty) {
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

  // ============================================================
  // MAHADASHA
  // ============================================================

  function calculateMahadasha(
    year: number,
    birthYear: number,
    mulankValue: number
  ) {
    const seq = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const index = seq.indexOf(mulankValue);

    const age = year - birthYear;

    let passed = 0;

    for (let i = 0; i < 50; i++) {
      const num = seq[(index + i) % 9];

      if (age >= passed && age < passed + num) {
        return num;
      }

      passed += num;
    }

    return null;
  }

  // ============================================================
  // ANTARDASHA
  // ============================================================

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

  // ============================================================
  // GENERATE REPORT
  // ============================================================

  function generate() {
    if (!dob || !fromYear || !toYear) {
      return;
    }

    const date = new Date(dob);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const birthYear = date.getFullYear();

    const from = parseInt(fromYear);
    const to = parseInt(toYear);

    // ------------------------------------------------------------
    // MULANK
    // ------------------------------------------------------------

    const currentMulank = reduce(day);

    // ------------------------------------------------------------
    // BHAGYANK
    // ------------------------------------------------------------

    const currentBhagyank = reduce(
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

    // ------------------------------------------------------------
    // NATAL DIGITS
    // ------------------------------------------------------------

    const natalDigits: number[] = [];

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
      natalDigits.push(currentMulank);
    }

    natalDigits.push(currentBhagyank);

    // ------------------------------------------------------------
    // NATAL GRID
    //
    // IMPORTANT:
    // Only Mulank + Bhagyank are active here.
    // No Mahadasha / Antardasha / Pratyantar.
    // ------------------------------------------------------------

    let output = `<div class="title">Natal Grid</div>`;

    output += buildGrid(
      natalDigits,
      currentMulank,
      currentBhagyank,
      null,
      null,
      null
    );

    // ------------------------------------------------------------
    // YEAR GRIDS
    // ------------------------------------------------------------

    for (let y = from; y <= to; y++) {
      const currentMahadasha = calculateMahadasha(
        y,
        birthYear,
        currentMulank
      );

      const currentAntardasha = calculateAntardasha(
        day,
        month,
        y
      );

      const digits = [...natalDigits];

      // ONLY ADD MAHADASHA + ANTARDASHA
      digits.push(currentMahadasha as number);
      digits.push(currentAntardasha);

      output += `
        <div class="yearBlock" data-year="${y}">
          <div class="title">${y} - ${y + 1}</div>

          ${buildGrid(
            digits,
            currentMulank,
            currentBhagyank,
            currentMahadasha,
            currentAntardasha,
            null
          )}
        </div>
      `;
    }

    setMulank(currentMulank);
    setBhagyank(currentBhagyank);

    setReport(output);

    setMahadasha(null);
    setAntardasha(null);
    setPratyantarNum(null);
  }

  // ============================================================
  // OPEN YEAR
  // ============================================================

  function openYear(year: number) {
    if (!dob) return;

    const date = new Date(dob);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const birthYear = date.getFullYear();

    const currentMulank =
      mulank !== null ? mulank : reduce(day);

    const currentBhagyank =
      bhagyank !== null
        ? bhagyank
        : reduce(
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

    const currentMahadasha = calculateMahadasha(
      year,
      birthYear,
      currentMulank
    );

    const currentAntardasha = calculateAntardasha(
      day,
      month,
      year
    );

    const seq = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const index = seq.indexOf(currentAntardasha);

    let current = new Date(year, month - 1, day);

    let output = `
      <div
        class="backButton"
        id="backButton"
      >
        ⬅ Back to Year Grids
      </div>
    `;

    // ------------------------------------------------------------
    // PRATYANTAR PERIODS
    // ------------------------------------------------------------

    for (let i = 0; i < 9; i++) {
      const num = seq[(index + i) % 9];

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

      digits.push(currentMulank);
      digits.push(currentBhagyank);
      digits.push(currentMahadasha as number);
      digits.push(currentAntardasha);
      digits.push(num);

      const start = new Date(current);

      const days = num <= 4 ? num * 8 : num * 8 + 1;

      current.setDate(current.getDate() + days);

      const end = new Date(current);

      output += `
        <div class="title">
          ${start.toDateString()} - ${end.toDateString()}
        </div>

        ${buildGrid(
          digits,
          currentMulank,
          currentBhagyank,
          currentMahadasha,
          currentAntardasha,
          num
        )}
      `;
    }

    setMahadasha(currentMahadasha);
    setAntardasha(currentAntardasha);

    setReport(output);

    // ------------------------------------------------------------
    // BACK BUTTON
    // ------------------------------------------------------------

    setTimeout(() => {
      const backButton =
        document.getElementById("backButton");

      if (backButton) {
        backButton.onclick = () => {
          generate();
        };
      }
    }, 0);
  }

  // ============================================================
  // EVENT DELEGATION
  // ============================================================

  function handleReportClick(
    e: React.MouseEvent<HTMLDivElement>
  ) {
    const target = e.target as HTMLElement;

    const yearBlock =
      target.closest(".yearBlock") as HTMLElement | null;

    if (yearBlock) {
      const year = Number(
        yearBlock.getAttribute("data-year")
      );

      if (!isNaN(year)) {
        openYear(year);
      }
    }
  }

  // ============================================================
  // JSX
  // ============================================================

  return (
    <>
      <style>{`
        .title{
          background:#ff8c00;
          color:white;
          padding:10px;
          font-weight:bold;
          margin-top:25px;
          position:relative;
          overflow:hidden;
        }

        .title::after{
          content:"mauksh.com";
          position:absolute;
          right:10px;
          top:50%;
          transform:translateY(-50%);
          font-size:12px;
          color:rgba(255,255,255,0.5);
          font-weight:normal;
        }

        .container{
          max-width:100%;
          margin:auto;
          background:white;
          padding:20px;
          border-radius:8px;
        }

        label{
          display:block;
          margin-top:10px;
          font-weight:bold;
        }

        input{
          padding:10px;
          margin:5px;
          width:100%;
          font-size:16px;
          box-sizing:border-box;
        }

        input[type="date"]{
          display:block;
          width:100%;
          height:48px;
          padding:10px 12px;
          margin:5px 0;
          font-size:16px;
          font-family:inherit;
          color:#222;
          background:#fff;
          border:1px solid #ccc;
          border-radius:6px;
          box-sizing:border-box;
        }

        input[type="number"]{
          display:block;
          width:100%;
          height:48px;
          padding:10px 12px;
          margin:5px 0;
          font-size:16px;
          font-family:inherit;
          color:#222;
          background:#fff;
          border:1px solid #ccc;
          border-radius:6px;
          box-sizing:border-box;
        }

        button{
          padding:10px 20px;
          font-size:16px;
          cursor:pointer;
          margin-top:10px;
        }

        .legend{
          margin-top:10px;
          font-size:14px;
        }

        .mulank{
          color:red;
          font-weight:bold;
        }

        .bhagyank{
          color:green;
          font-weight:bold;
        }

        .mahadasha{
          color:#ff1493;
          font-weight:bold;
        }

        .antardasha{
          color:#00aaff;
          font-weight:bold;
        }

        .pratyantar{
          color:blue;
          font-weight:bold;
        }

        /* ===== ISOLATED GRID ===== */

        .mgrid{
          display:grid;
          grid-template-columns:repeat(3, 1fr);
          gap:2px;
          background:#999;
          width:100%;
        }

        .mgrid > div{
          min-width:0;
        }

        .mcell{
          background:white;
          height:60px;

          display:flex;
          align-items:center;
          justify-content:center;

          font-size:18px;
          font-weight:bold;

          min-width:0;
          overflow:hidden;
        }

        .mcell span{
          display:inline-block;
          white-space:nowrap;
          margin:0 2px;
        }

        .yearBlock{
          cursor:pointer;
          margin-top:15px;
        }

        .backButton{
          background:#444;
          color:white;
          padding:10px;
          margin-top:20px;
          cursor:pointer;
        }
      `}</style>

      <div className="container">
        <h2>Vedic Numerology Software</h2>

        <label>Date of Birth</label>

        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        <label>From Year</label>

        <input
          type="number"
          value={fromYear}
          onChange={(e) =>
            setFromYear(e.target.value)
          }
        />

        <label>To Year</label>

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
          <span className="mulank">Mulank</span>{" "}
          |{" "}
          <span className="bhagyank">Bhagyank</span>{" "}
          |{" "}
          <span className="mahadasha">Mahadasha</span>{" "}
          |{" "}
          <span className="antardasha">Antardasha</span>{" "}
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
      </div>

      <br />
      <br />

      <div className="container">
        Generate your Vedic Numerology Grid on Mauksh
        using advanced calculation methods based on
        your date of birth. This tool helps you
        understand your number pattern, strengths,
        missing numbers, and overall life tendencies
        through a structured numerology grid.

        <br />
        <br />

        The Vedic numerology grid reveals important
        insights about personality, behavior,
        decision-making style, and life direction. By
        analyzing number placement and combinations,
        you can identify opportunities for growth and
        areas that need balance.

        <br />
        <br />

        Designed for accuracy and ease of use, this
        software gives clear and practical guidance to
        help you align your actions with your natural
        strengths and improve different aspects of your
        life.
      </div>
    </>
  );
}