"use client";

import { useState } from "react";

type GridNumber = {
  number: number;
  className: string;
};

const order = [3, 1, 9, 6, 7, 5, 2, 8, 4];

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

  return 1;
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

function getGridNumbers(
  nums: number[],
  mulank: number | null,
  bhagyank: number | null,
  mahadasha: number | null,
  antardasha: number | null,
  pratyantarNum: number | null
): GridNumber[][] {
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

  const used = {
    mulank: false,
    bhagyank: false,
    mahadasha: false,
    antardasha: false,
    pratyantar: false,
  };

  return order.map((n) => {
    const cell: GridNumber[] = [];

    for (let i = 0; i < count[n]; i++) {
      let className = "";

      if (n === mulank && !used.mulank) {
        className = "mulank";
        used.mulank = true;
      } else if (n === bhagyank && !used.bhagyank) {
        className = "bhagyank";
        used.bhagyank = true;
      } else if (n === mahadasha && !used.mahadasha) {
        className = "mahadasha";
        used.mahadasha = true;
      } else if (n === antardasha && !used.antardasha) {
        className = "antardasha";
        used.antardasha = true;
      } else if (n === pratyantarNum && !used.pratyantar) {
        className = "pratyantar";
        used.pratyantar = true;
      }

      cell.push({
        number: n,
        className,
      });
    }

    return cell;
  });
}

export default function VedicNumerologySoftware() {
  const [dob, setDob] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");

  const [mulank, setMulank] = useState<number | null>(null);
  const [bhagyank, setBhagyank] = useState<number | null>(null);
  const [mahadasha, setMahadasha] = useState<number | null>(null);
  const [antardasha, setAntardasha] = useState<number | null>(null);
  const [pratyantarNum, setPratyantarNum] = useState<number | null>(null);

  const [natalDigits, setNatalDigits] = useState<number[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const generate = () => {
    if (!dob || !fromYear || !toYear) {
      return;
    }

    const date = new Date(dob);

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

    if (day > 9) {
      digits.push(newMulank);
    }

    digits.push(newBhagyank);

    const start = parseInt(fromYear);
    const end = parseInt(toYear);

    const yearList: number[] = [];

    for (let y = start; y <= end; y++) {
      yearList.push(y);
    }

    setMulank(newMulank);
    setBhagyank(newBhagyank);
    setMahadasha(null);
    setAntardasha(null);
    setPratyantarNum(null);
    setNatalDigits(digits);
    setYears(yearList);
    setSelectedYear(null);
  };

  const openYear = (year: number) => {
    if (!dob) {
      return;
    }

    const date = new Date(dob);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const birthYear = date.getFullYear();

    const newMahadasha = calculateMahadasha(
      year,
      birthYear,
      mulank as number
    );

    const newAntardasha = calculateAntardasha(day, month, year);

    setMahadasha(newMahadasha);
    setAntardasha(newAntardasha);
    setSelectedYear(year);
  };

  const renderGrid = (
    numbers: number[],
    currentMahadasha: number | null,
    currentAntardasha: number | null,
    currentPratyantar: number | null
  ) => {
    const grid = getGridNumbers(
      numbers,
      mulank,
      bhagyank,
      currentMahadasha,
      currentAntardasha,
      currentPratyantar
    );

    return (
      <div className="mgrid">
        {grid.map((cell, index) => (
          <div className="mcell" key={index}>
            {cell.map((item, itemIndex) => (
              <span
                className={item.className}
                key={`${item.number}-${itemIndex}`}
              >
                {item.number}
              </span>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderYearGrids = () => {
    return (
      <>
        {years.map((year) => {
          const yearMahadasha = calculateMahadasha(
            year,
            new Date(dob).getFullYear(),
            mulank as number
          );

          const yearAntardasha = calculateAntardasha(
            new Date(dob).getDate(),
            new Date(dob).getMonth() + 1,
            year
          );

          const digits = [...natalDigits];

          digits.push(yearMahadasha);
          digits.push(yearAntardasha);

          return (
            <div
              className="yearBlock"
              key={year}
              onClick={() => openYear(year)}
            >
              <div className="title">{year} - {year + 1}</div>

              {renderGrid(
                digits,
                yearMahadasha,
                yearAntardasha,
                null
              )}
            </div>
          );
        })}
      </>
    );
  };

  const renderSelectedYear = () => {
    if (selectedYear === null || !dob) {
      return null;
    }

    const date = new Date(dob);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const birthYear = date.getFullYear();

    const currentMahadasha = calculateMahadasha(
      selectedYear,
      birthYear,
      mulank as number
    );

    const currentAntardasha = calculateAntardasha(
      day,
      month,
      selectedYear
    );

    const seq = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const index = seq.indexOf(currentAntardasha);

    let current = new Date(selectedYear, month - 1, day);

    const periods = [];

    for (let i = 0; i < 9; i++) {
      const num = seq[(index + i) % 9];

      const start = new Date(current);

      const days = num <= 4 ? num * 8 : num * 8 + 1;

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

      digits.push(mulank as number);
      digits.push(bhagyank as number);
      digits.push(currentMahadasha);
      digits.push(currentAntardasha);
      digits.push(num);

      periods.push({
        num,
        start,
        end,
        digits,
      });
    }

    return (
      <div>
        <button
          className="backButton"
          onClick={() => {
            setSelectedYear(null);
            setMahadasha(null);
            setAntardasha(null);
            setPratyantarNum(null);
          }}
        >
          ⬅ Back to Year Grids
        </button>

        {periods.map((period, index) => (
          <div key={index}>
            <div className="title">
              {period.start.toDateString()} -{" "}
              {period.end.toDateString()}
            </div>

            {renderGrid(
              period.digits,
              currentMahadasha,
              currentAntardasha,
              period.num
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <style jsx>{`
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

        .container {
          max-width: 100%;
          margin: auto;
          background: white;
          padding: 20px;
          border-radius: 8px;
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
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          background: #999;
          width: 100%;
        }

        .mgrid > div {
          min-width: 0;
        }

        .mcell {
          background: white;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: bold;
          min-width: 0;
          overflow: hidden;
        }

        .mcell span {
          display: inline-block;
          white-space: nowrap;
          margin: 0 2px;
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
        }

        @media (max-width: 600px) {
          .container {
            padding: 20px;
          }

          .mcell {
            height: 60px;
            font-size: 18px;
          }
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
          onChange={(e) => setFromYear(e.target.value)}
        />

        <label>To Year</label>

        <input
          type="number"
          value={toYear}
          onChange={(e) => setToYear(e.target.value)}
        />

        <button onClick={generate}>
          Generate Report
        </button>

        <div className="legend">
          <span className="mulank">Mulank</span> |{" "}
          <span className="bhagyank">Bhagyank</span> |{" "}
          <span className="mahadasha">Mahadasha</span> |{" "}
          <span className="antardasha">Antardasha</span> |{" "}
          <span className="pratyantar">Pratyantar</span>
        </div>

        <div id="report">
          {natalDigits.length > 0 && selectedYear === null && (
            <>
              <div className="title">
                Natal Grid
              </div>

              {renderGrid(
                natalDigits,
                null,
                null,
                null
              )}

              {renderYearGrids()}
            </>
          )}

          {selectedYear !== null && renderSelectedYear()}
        </div>
      </div>

      <br />
      <br />

      <p>
        Generate your Vedic Numerology Grid on Mauksh using
        advanced calculation methods based on your date of birth.
        This tool helps you understand your number pattern,
        strengths, missing numbers, and overall life tendencies
        through a structured numerology grid.
      </p>

      <p>
        The Vedic numerology grid reveals important insights about
        personality, behavior, decision-making style, and life
        direction. By analyzing number placement and combinations,
        you can identify opportunities for growth and areas that
        need balance.
      </p>

      <p>
        Designed for accuracy and ease of use, this software gives
        clear and practical guidance to help you align your actions
        with your natural strengths and improve different aspects
        of your life.
      </p>
    </>
  );
}