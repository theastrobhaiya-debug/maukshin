"use client";

import { useState } from "react";

export default function NumerologyPage() {
  const [dob, setDob] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const [mulank, setMulank] = useState<number>(0);
  const [bhagyank, setBhagyank] = useState<number>(0);

  function reduce(n: number) {
    while (n > 9) {
      n = n
        .toString()
        .split("")
        .reduce((a, b) => a + Number(b), 0);
    }

    return n;
  }

  function getDateParts(value: string) {
    const parts = value.split("-");

    return {
      year: Number(parts[0]),
      month: Number(parts[1]),
      day: Number(parts[2]),
    };
  }

  function calculateMahadasha(
    year: number,
    birthYear: number,
    currentMulank: number
  ) {
    const seq = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const index = seq.indexOf(currentMulank);

    const age = year - birthYear;

    let passed = 0;

    for (let i = 0; i < 50; i++) {
      const num = seq[(index + i) % 9];

      if (age >= passed && age < passed + num) {
        return num;
      }

      passed += num;
    }

    return 0;
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

    return reduce(
      dayDigits +
        month +
        yearDigits +
        weekday
    );
  }

  function buildGrid(
    nums: number[],
    currentMulank: number,
    currentBhagyank: number,
    currentMahadasha: number | null,
    currentAntardasha: number | null,
    currentPratyantar: number | null
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

    const order = [
      3, 1, 9,
      6, 7, 5,
      2, 8, 4,
    ];

    return (
      <div className="mgrid">
        {order.map((n) => {
          const numbers = [];

          let usedMul = false;
          let usedBhag = false;
          let usedMaha = false;
          let usedAnt = false;
          let usedPraty = false;

          for (let i = 0; i < count[n]; i++) {
            let cls = "";

            if (
              n === currentMulank &&
              !usedMul
            ) {
              cls = "mulank";
              usedMul = true;
            } else if (
              n === currentBhagyank &&
              !usedBhag
            ) {
              cls = "bhagyank";
              usedBhag = true;
            } else if (
              n === currentMahadasha &&
              !usedMaha
            ) {
              cls = "mahadasha";
              usedMaha = true;
            } else if (
              n === currentAntardasha &&
              !usedAnt
            ) {
              cls = "antardasha";
              usedAnt = true;
            } else if (
              n === currentPratyantar &&
              !usedPraty
            ) {
              cls = "pratyantar";
              usedPraty = true;
            }

            numbers.push(
              <span
                className={cls}
                key={`${n}-${i}`}
              >
                {n}
              </span>
            );
          }

          return (
            <div className="mcell" key={n}>
              {numbers}
            </div>
          );
        })}
      </div>
    );
  }

  function generate() {
    if (
      !dob ||
      !fromYear ||
      !toYear
    ) {
      return;
    }

    const from = parseInt(fromYear);
    const to = parseInt(toYear);

    const {
      day,
      month,
      year: birthYear,
    } = getDateParts(dob);

    const calculatedMulank = reduce(day);

    const calculatedBhagyank = reduce(
      day
        .toString()
        .split("")
        .reduce(
          (a, b) => a + Number(b),
          0
        ) +
        month +
        birthYear
          .toString()
          .split("")
          .reduce(
            (a, b) => a + Number(b),
            0
          )
    );

    setMulank(calculatedMulank);
    setBhagyank(calculatedBhagyank);
    setSelectedYear(null);
    setShowReport(true);

    // Prevent invalid year range
    if (from > to) {
      setShowReport(false);
    }
  }

  function getNatalDigits() {
    if (!dob) return [];

    const {
      day,
      month,
      year: birthYear,
    } = getDateParts(dob);

    const natalDigits: number[] = [];

    day
      .toString()
      .split("")
      .forEach((n) =>
        natalDigits.push(Number(n))
      );

    month
      .toString()
      .split("")
      .forEach((n) =>
        natalDigits.push(Number(n))
      );

    birthYear
      .toString()
      .slice(2)
      .split("")
      .forEach((n) =>
        natalDigits.push(Number(n))
      );

    if (day > 9) {
      natalDigits.push(mulank);
    }

    natalDigits.push(bhagyank);

    return natalDigits;
  }

  function openYear(year: number) {
    setSelectedYear(year);
  }

  function renderYearGrid(year: number) {
    const {
      day,
      month,
      year: birthYear,
    } = getDateParts(dob);

    const mahadasha =
      calculateMahadasha(
        year,
        birthYear,
        mulank
      );

    const antardasha =
      calculateAntardasha(
        day,
        month,
        year
      );

    const digits = [
      ...getNatalDigits(),
      mahadasha,
      antardasha,
    ];

    return (
      <div
        className="yearBlock"
        key={year}
        onClick={() =>
          openYear(year)
        }
      >
        <div className="title">
          {year} - {year + 1}
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

  function renderYearDetails() {
    if (
      selectedYear === null ||
      !dob
    ) {
      return null;
    }

    const {
      day,
      month,
      year: birthYear,
    } = getDateParts(dob);

    const mahadasha =
      calculateMahadasha(
        selectedYear,
        birthYear,
        mulank
      );

    const antardasha =
      calculateAntardasha(
        day,
        month,
        selectedYear
      );

    const seq = [
      1, 2, 3, 4, 5,
      6, 7, 8, 9,
    ];

    const index =
      seq.indexOf(antardasha);

    let current = new Date(
      selectedYear,
      month - 1,
      day
    );

    return (
      <>
        <div
          className="backButton"
          onClick={() =>
            setSelectedYear(null)
          }
        >
          ⬅ Back to Year Grids
        </div>

        {Array.from({
          length: 9,
        }).map((_, i) => {
          const num =
            seq[(index + i) % 9];

          const days =
            num <= 4
              ? num * 8
              : num * 8 + 1;

          const start =
            new Date(current);

          current.setDate(
            current.getDate() +
              days
          );

          const end =
            new Date(current);

          const digits = [
            ...getNatalDigits(),
            mahadasha,
            antardasha,
            num,
          ];

          return (
            <div key={i}>
              <div className="title">
                {start.toDateString()} -{" "}
                {end.toDateString()}
              </div>

              {buildGrid(
                digits,
                mulank,
                bhagyank,
                mahadasha,
                antardasha,
                num
              )}
            </div>
          );
        })}
      </>
    );
  }

  return (
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
            setFromYear(
              e.target.value
            )
          }
        />

        <label>
          To Year
        </label>

        <input
          type="number"
          value={toYear}
          onChange={(e) =>
            setToYear(
              e.target.value
            )
          }
        />

        <button
          onClick={generate}
        >
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

        <div id="report">

          {showReport &&
            selectedYear === null && (
              <>
                <div className="title">
                  Natal Grid
                </div>

                {buildGrid(
                  getNatalDigits(),
                  mulank,
                  bhagyank,
                  null,
                  null,
                  null
                )}

                {Array.from({
                  length:
                    parseInt(toYear) -
                    parseInt(fromYear) +
                    1,
                }).map((_, i) =>
                  renderYearGrid(
                    parseInt(fromYear) +
                      i
                  )
                )}
              </>
            )}

          {showReport &&
            selectedYear !== null &&
            renderYearDetails()}

        </div>

      </div>

      <br />
      <br />

      Generate your Vedic Numerology Grid on Mauksh using advanced calculation methods based on your date of birth. This tool helps you understand your number pattern, strengths, missing numbers, and overall life tendencies through a structured numerology grid.

      <br />
      <br />

      The Vedic numerology grid reveals important insights about personality, behavior, decision-making style, and life direction. By analyzing number placement and combinations, you can identify opportunities for growth and areas that need balance.

      <br />
      <br />

      Designed for accuracy and ease of use, this software gives clear and practical guidance to help you align your actions with your natural strengths and improve different aspects of your life.

      <style jsx>{`

        .numerology-page {
          width: 100%;
        }

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

        .mgrid{
          display:grid;
          grid-template-columns:
            repeat(3, 1fr);
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

    </div>
  );
}