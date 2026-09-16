"use client";

import React, { useMemo, useState } from "react";

type NumberData = {
  title: string;
  meaning: string;
  personality: string;
  strengths: string[];
  challenges: string[];
  work: string;
  career: string;
  business: string;
  money: string;
  relationships: string;
  health: string;
  planet: string;
  days: string;
  colour: string;
  letters: string;
  direction: string;
  deity: string;
  mantra: string;
  dates: string;
  remedies: string[];
  year: string;
  yearFocus: string;
};

type Report = {
  dob: string;
  day: number;
  month: number;
  year: number;
  weekday: string;
  mulank: number;
  bhagyank: number;
  nameNumber: number;
  personalYear: number;
  grid: Record<number, number>;
};

const NUMBERS: Record<number, NumberData> = {
  1: {
    title: "The Leader",
    meaning: "Independence, leadership, originality and self-expression.",
    personality:
      "You naturally prefer to lead rather than follow. You value independence and want the freedom to make your own decisions.",
    strengths: ["Leadership", "Confidence", "Originality", "Initiative"],
    challenges: ["Ego", "Impatience", "Stubbornness", "Over-control"],
    work: "You perform best when you have autonomy and responsibility.",
    career: "Leadership, entrepreneurship, administration, management, government and independent professions.",
    business: "Favourable for starting and leading your own venture.",
    money: "Money tends to improve when you take initiative and build something independently.",
    relationships:
      "You value respect and independence. Avoid becoming overly controlling.",
    health:
      "Maintain balance between ambition and rest. Avoid excessive stress and overwork.",
    planet: "Sun",
    days: "Sunday",
    colour: "Gold, Orange, Red",
    letters: "A, I, J, Q, Y",
    direction: "East",
    deity: "Surya / Lord Rama",
    mantra: "Om Suryaya Namah",
    dates: "1, 10, 19, 28",
    remedies: [
      "Offer water to the Sun in the morning.",
      "Maintain a disciplined daily routine.",
      "Respect authority while maintaining individuality.",
    ],
    year: "New beginnings and leadership",
    yearFocus: "Start, initiate and take responsibility.",
  },

  2: {
    title: "The Diplomat",
    meaning: "Sensitivity, cooperation, intuition and emotional intelligence.",
    personality:
      "You are sensitive to people and surroundings. You naturally understand emotions and prefer harmony over conflict.",
    strengths: ["Intuition", "Diplomacy", "Empathy", "Cooperation"],
    challenges: ["Overthinking", "Sensitivity", "Indecision", "Mood fluctuations"],
    work: "You work well in collaborative environments and roles involving people.",
    career: "Counselling, psychology, hospitality, public relations, design, partnership-based work.",
    business: "Partnerships can work well when communication and trust are strong.",
    money: "Financial stability improves through patience, planning and collaboration.",
    relationships:
      "You seek emotional security and understanding. Clear communication is important.",
    health:
      "Emotional balance and proper sleep are particularly important.",
    planet: "Moon",
    days: "Monday",
    colour: "White, Cream, Silver",
    letters: "B, K, R",
    direction: "North-West",
    deity: "Shiva",
    mantra: "Om Som Somaya Namah",
    dates: "2, 11, 20, 29",
    remedies: [
      "Spend time near water or in calm surroundings.",
      "Maintain a consistent sleep routine.",
      "Avoid making major decisions during emotional highs.",
    ],
    year: "Partnership and patience",
    yearFocus: "Cooperate, observe and build relationships.",
  },

  3: {
    title: "The Communicator",
    meaning: "Expression, knowledge, creativity and expansion.",
    personality:
      "You are naturally expressive, optimistic and curious. Communication can become one of your strongest assets.",
    strengths: ["Communication", "Creativity", "Learning", "Optimism"],
    challenges: ["Scattered focus", "Excess talking", "Overconfidence", "Lack of consistency"],
    work: "You need variety, learning and opportunities to express ideas.",
    career: "Teaching, writing, media, marketing, consulting, content creation and communication.",
    business: "Creative and communication-driven businesses can suit you.",
    money: "Money improves when creativity is combined with discipline.",
    relationships:
      "You enjoy intellectual connection and positive communication.",
    health:
      "Avoid irregular routines and excessive mental stimulation.",
    planet: "Jupiter",
    days: "Thursday",
    colour: "Yellow, Gold",
    letters: "C, G, L, S",
    direction: "North-East",
    deity: "Ganesha",
    mantra: "Om Gurave Namah",
    dates: "3, 12, 21, 30",
    remedies: [
      "Keep learning throughout life.",
      "Respect teachers and mentors.",
      "Turn ideas into structured action.",
    ],
    year: "Growth and expression",
    yearFocus: "Learn, communicate and expand.",
  },

  4: {
    title: "The Builder",
    meaning: "Structure, discipline, practicality and unconventional thinking.",
    personality:
      "You tend to think differently and often prefer practical results over appearances.",
    strengths: ["Discipline", "Practicality", "Persistence", "Planning"],
    challenges: ["Rigidity", "Frustration", "Isolation", "Overwork"],
    work: "You excel where systems, processes and persistence are required.",
    career: "Technology, engineering, operations, research, construction and systems-based professions.",
    business: "Businesses requiring systems and operational discipline can suit you.",
    money: "Long-term wealth creation is generally more important than quick gains.",
    relationships:
      "You may take relationships seriously but should communicate emotions openly.",
    health:
      "Routine, movement and adequate rest are important.",
    planet: "Rahu",
    days: "Saturday",
    colour: "Blue, Grey",
    letters: "D, M, T",
    direction: "South-West",
    deity: "Ganesha",
    mantra: "Om Rahave Namah",
    dates: "4, 13, 22, 31",
    remedies: [
      "Maintain strong routines.",
      "Avoid unnecessary arguments.",
      "Focus on practical and ethical action.",
    ],
    year: "Structure and transformation",
    yearFocus: "Build systems and strengthen foundations.",
  },

  5: {
    title: "The Explorer",
    meaning: "Freedom, communication, adaptability and adventure.",
    personality:
      "You value freedom and variety. You learn quickly and usually adapt well to changing situations.",
    strengths: ["Adaptability", "Communication", "Curiosity", "Networking"],
    challenges: ["Restlessness", "Impulsiveness", "Inconsistency", "Risk-taking"],
    work: "You perform well where communication, travel or variety are involved.",
    career: "Sales, marketing, media, trading, travel, communication and entrepreneurship.",
    business: "Dynamic businesses and sales-driven ventures can be suitable.",
    money: "Income may come through multiple channels, but budgeting is important.",
    relationships:
      "You need space and mental stimulation. Avoid feeling trapped.",
    health:
      "Regular routines can help counter restlessness and irregular habits.",
    planet: "Mercury",
    days: "Wednesday",
    colour: "Green",
    letters: "E, H, N, X",
    direction: "North",
    deity: "Vishnu",
    mantra: "Om Budhaya Namah",
    dates: "5, 14, 23",
    remedies: [
      "Keep finances organised.",
      "Avoid impulsive commitments.",
      "Use communication as your strength.",
    ],
    year: "Freedom and change",
    yearFocus: "Explore, communicate and adapt.",
  },

  6: {
    title: "The Nurturer",
    meaning: "Love, beauty, responsibility, comfort and harmony.",
    personality:
      "You appreciate beauty, relationships and a comfortable environment. You often feel responsible for people you care about.",
    strengths: ["Compassion", "Creativity", "Responsibility", "Charm"],
    challenges: ["Attachment", "Over-giving", "Possessiveness", "Perfectionism"],
    work: "You perform well when creativity and people skills are combined.",
    career: "Beauty, luxury, fashion, design, hospitality, arts, counselling and relationship-based businesses.",
    business: "Lifestyle, beauty, luxury and service-oriented businesses can work well.",
    money: "Comfort and lifestyle can motivate financial growth, but spending discipline matters.",
    relationships:
      "Relationships are usually a major priority. Healthy boundaries are important.",
    health:
      "Balance emotional responsibility with personal self-care.",
    planet: "Venus",
    days: "Friday",
    colour: "White, Pink, Light Blue",
    letters: "U, V, W",
    direction: "South-East",
    deity: "Lakshmi",
    mantra: "Om Shukraya Namah",
    dates: "6, 15, 24",
    remedies: [
      "Keep your surroundings clean and beautiful.",
      "Practise healthy boundaries.",
      "Support others without neglecting yourself.",
    ],
    year: "Love and responsibility",
    yearFocus: "Create harmony and strengthen relationships.",
  },

  7: {
    title: "The Seeker",
    meaning: "Spirituality, analysis, research, intuition and inner wisdom.",
    personality:
      "You naturally question things deeply and may prefer understanding the reason behind something rather than accepting it immediately.",
    strengths: ["Analysis", "Intuition", "Research", "Depth"],
    challenges: ["Isolation", "Overthinking", "Scepticism", "Emotional distance"],
    work: "You need intellectual depth and independence.",
    career: "Research, technology, spirituality, psychology, investigation, analytics and specialised fields.",
    business: "Niche expertise and knowledge-based businesses can suit you.",
    money: "Financial growth tends to improve through specialised knowledge rather than shortcuts.",
    relationships:
      "You need emotional and intellectual space. Honest communication is essential.",
    health:
      "Mental relaxation and time away from excessive stimulation are useful.",
    planet: "Ketu",
    days: "Monday, Sunday",
    colour: "White, Grey",
    letters: "O, Z",
    direction: "South",
    deity: "Ganesha",
    mantra: "Om Ketave Namah",
    dates: "7, 16, 25",
    remedies: [
      "Spend regular time in quiet reflection.",
      "Avoid excessive isolation.",
      "Use research and intuition together.",
    ],
    year: "Inner growth and knowledge",
    yearFocus: "Study, analyse and understand.",
  },

  8: {
    title: "The Strategist",
    meaning: "Power, responsibility, discipline, karma and material achievement.",
    personality:
      "You are often serious about results and may develop strong resilience through life experiences.",
    strengths: ["Discipline", "Strategy", "Persistence", "Management"],
    challenges: ["Pressure", "Delays", "Pessimism", "Over-responsibility"],
    work: "You can handle responsibility, management and long-term projects.",
    career: "Finance, law, management, administration, business, real estate and large organisations.",
    business: "Long-term businesses requiring patience and systems can suit you.",
    money: "Financial lessons often revolve around discipline, responsibility and long-term planning.",
    relationships:
      "You value loyalty but should avoid allowing work pressure to dominate relationships.",
    health:
      "Rest and stress management are important because you may carry excessive responsibility.",
    planet: "Saturn",
    days: "Saturday",
    colour: "Dark Blue, Black, Grey",
    letters: "F, P",
    direction: "West",
    deity: "Shani Dev",
    mantra: "Om Sham Shanicharaya Namah",
    dates: "8, 17, 26",
    remedies: [
      "Maintain discipline without becoming overly rigid.",
      "Respect time and commitments.",
      "Help people who genuinely need support.",
    ],
    year: "Discipline and achievement",
    yearFocus: "Work patiently and strengthen foundations.",
  },

  9: {
    title: "The Humanitarian",
    meaning: "Courage, compassion, action, completion and universal thinking.",
    personality:
      "You can be passionate, courageous and emotionally driven by a desire to create meaningful impact.",
    strengths: ["Courage", "Compassion", "Action", "Leadership"],
    challenges: ["Anger", "Impatience", "Emotional intensity", "Overcommitment"],
    work: "You need purpose and action rather than repetitive work.",
    career: "Leadership, defence, sports, medicine, social work, entrepreneurship and action-oriented professions.",
    business: "Businesses requiring courage, initiative and strong execution can suit you.",
    money: "Financial growth improves when energy is directed into focused action.",
    relationships:
      "You love deeply but should manage emotional intensity and reactions.",
    health:
      "Physical activity and emotional regulation are important.",
    planet: "Mars",
    days: "Tuesday",
    colour: "Red, Coral",
    letters: "None",
    direction: "South",
    deity: "Hanuman",
    mantra: "Om Angarakaya Namah",
    dates: "9, 18, 27",
    remedies: [
      "Channel energy through exercise and purposeful action.",
      "Practise patience before reacting.",
      "Support causes that genuinely matter to you.",
    ],
    year: "Completion and action",
    yearFocus: "Finish old cycles and prepare for a new beginning.",
  },
};

const CHALDEAN: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 8,
  G: 3,
  H: 5,
  I: 1,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 7,
  P: 8,
  Q: 1,
  R: 2,
  S: 3,
  T: 4,
  U: 6,
  V: 6,
  W: 6,
  X: 5,
  Y: 1,
  Z: 7,
};

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function reduceNumber(value: number): number {
  let n = Math.abs(value);

  while (n > 9) {
    n = String(n)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }

  return n;
}

function getNameNumber(name: string): number {
  const total = name
    .toUpperCase()
    .split("")
    .filter((char) => CHALDEAN[char])
    .reduce((sum, char) => sum + CHALDEAN[char], 0);

  return reduceNumber(total);
}

function getGrid(
  dob: string,
  mulank: number,
  bhagyank: number
): Record<number, number> {
  const [yearString, monthString, dayString] = dob.split("-");

  /*
   * Vedic Numerology Grid
   *
   * 3 1 9
   * 6 7 5
   * 2 8 4
   *
   * Century digits are excluded.
   * Radical and Destiny numbers are intentionally
   * added to the grid as requested.
   */

  const digits = [
    ...dayString.split(""),
    ...monthString.split(""),
    ...yearString.slice(-2).split(""),
    String(mulank),
    String(bhagyank),
  ].filter((digit) => /^[1-9]$/.test(digit));

  const grid: Record<number, number> = {
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

  digits.forEach((digit) => {
    const number = Number(digit);

    if (number >= 1 && number <= 9) {
      grid[number] += 1;
    }
  });

  return grid;
}

function calculateReport(name: string, dob: string): Report {
  const [year, month, day] = dob.split("-").map(Number);

  const mulank = reduceNumber(day);

  // Full DOB including century for Destiny / Bhagyank.
  const bhagyank = reduceNumber(year + month + day);

  const nameNumber = getNameNumber(name);

  const currentYear = new Date().getFullYear();
  const personalYear = reduceNumber(day + month + currentYear);

  const date = new Date(year, month - 1, day);
  const weekday = WEEKDAYS[date.getDay()];

  const grid = getGrid(dob, mulank, bhagyank);

  return {
    dob,
    day,
    month,
    year,
    weekday,
    mulank,
    bhagyank,
    nameNumber,
    personalYear,
    grid,
  };
}

function formatDate(dateString: string): string {
  if (!dateString) return "";

  const [year, month, day] = dateString.split("-");

  return `${day}/${month}/${year}`;
}

function SectionTitle({
  number,
  title,
  subtitle,
}: {
  number?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mauksh-section-heading">
      {number && <div className="mauksh-section-number">{number}</div>}

      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
}

function NumberHero({
  number,
  label,
}: {
  number: number;
  label: string;
}) {
  return (
    <div className="mauksh-number-hero">
      <div className="mauksh-big-number">{number}</div>

      <div>
        <span className="mauksh-number-label">{label}</span>
        <h3>{NUMBERS[number].title}</h3>
        <p>{NUMBERS[number].meaning}</p>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mauksh-info-card">
      <h3>{title}</h3>
      <div className="mauksh-card-content">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mauksh-list">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

function NumberPill({
  number,
  count,
}: {
  number: number;
  count?: number;
}) {
  return (
    <div className="mauksh-number-pill">
      <span>{number}</span>
      {count !== undefined && <small>×{count}</small>}
    </div>
  );
}

export default function NumerologyPage() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState("");

  const today = new Date();
  const maxDate = today.toISOString().split("T")[0];

  const calculate = () => {
    setError("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!dob) {
      setError("Please select your date of birth.");
      return;
    }

    const date = new Date(`${dob}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
      setError("Please enter a valid date of birth.");
      return;
    }

    const calculated = calculateReport(name, dob);
    setReport(calculated);

    setTimeout(() => {
      document
        .getElementById("mauksh-report")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const primaryNumber = report?.mulank || 1;
  const destinyNumber = report?.bhagyank || 1;
  const nameNumber = report?.nameNumber || 1;
  const personalYearNumber = report?.personalYear || 1;

  const primaryData = NUMBERS[primaryNumber];
  const destinyData = NUMBERS[destinyNumber];
  const nameData = NUMBERS[nameNumber];
  const personalYearData = NUMBERS[personalYearNumber];

  const presentNumbers = useMemo(() => {
    if (!report) return [];

    return Object.entries(report.grid)
      .filter(([, count]) => count > 0)
      .map(([number, count]) => ({
        number: Number(number),
        count,
      }));
  }, [report]);

  const missingNumbers = useMemo(() => {
    if (!report) return [];

    return Object.entries(report.grid)
      .filter(([, count]) => count === 0)
      .map(([number]) => Number(number));
  }, [report]);

  const repeatedNumbers = useMemo(() => {
    if (!report) return [];

    return Object.entries(report.grid)
      .filter(([, count]) => count > 1)
      .map(([number, count]) => ({
        number: Number(number),
        count,
      }));
  }, [report]);

  return (
    <main className="mauksh-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .mauksh-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(218, 176, 83, 0.12), transparent 28%),
            linear-gradient(180deg, #fffdf8 0%, #fffaf0 100%);
          color: #29251f;
          padding: 35px 15px 100px;
          font-family:
            Arial,
            Helvetica,
            sans-serif;
        }

        .mauksh-container {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
        }

        .mauksh-form-card {
          max-width: 760px;
          margin: 0 auto 45px;
          background: rgba(255, 255, 255, 0.94);
          border: 1px solid #eadbb8;
          border-radius: 24px;
          padding: 42px;
          box-shadow: 0 18px 55px rgba(92, 69, 26, 0.10);
        }

        
        .mauksh-form-title {
          margin: 0;
          text-align: center;
          font-family: Georgia, "Times New Roman", serif;
          color: #7f5a18;
          font-size: clamp(30px, 5vw, 46px);
          line-height: 1.1;
        }

        .mauksh-form-subtitle {
          max-width: 600px;
          margin: 14px auto 30px;
          text-align: center;
          color: #766d5d;
          font-size: 15px;
          line-height: 1.7;
        }

        .mauksh-field {
          margin-bottom: 20px;
        }

        .mauksh-field label {
          display: block;
          margin-bottom: 8px;
          color: #4a402f;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: .03em;
        }

        .mauksh-input {
          width: 100%;
          min-height: 54px;
          padding: 15px 16px;
          border: 1px solid #d8c49a;
          border-radius: 11px;
          background: #fffdf8;
          color: #29251f;
          font-size: 15px;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
          transition: border .2s ease, box-shadow .2s ease;
        }

        .mauksh-input::placeholder {
          color: #aaa18f;
        }

        .mauksh-input:focus {
          border-color: #b98625;
          box-shadow: 0 0 0 4px rgba(199, 154, 59, .12);
        }

        input[type="date"].mauksh-input {
          color-scheme: light;
        }

        input[type="date"].mauksh-input::-webkit-calendar-picker-indicator {
          opacity: .55;
          cursor: pointer;
        }

        .mauksh-button {
          width: 100%;
          min-height: 56px;
          border: 0;
          border-radius: 12px;
          background: linear-gradient(135deg, #c99a37, #a97820);
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: .02em;
          cursor: pointer;
          box-shadow: 0 10px 24px rgba(145, 102, 25, .20);
          transition: transform .2s ease, box-shadow .2s ease;
        }

        .mauksh-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 13px 28px rgba(145, 102, 25, .26);
        }

        .mauksh-error {
          margin: 0 0 18px;
          padding: 12px 14px;
          border-radius: 10px;
          background: #fff1ed;
          border: 1px solid #e7b6aa;
          color: #9b3d2b;
          font-size: 13px;
        }

        .mauksh-note {
          margin-top: 16px;
          text-align: center;
          color: #918777;
          font-size: 12px;
        }

        .mauksh-report {
          overflow: hidden;
          background: #fffdf8;
          border: 1px solid #eadbb8;
          border-radius: 26px;
          box-shadow: 0 20px 70px rgba(76, 56, 18, .12);
        }

        .mauksh-report-header {
          position: relative;
          padding: 55px 35px;
          text-align: center;
          background:
            radial-gradient(circle at 20% 20%, rgba(255,255,255,.7), transparent 24%),
            linear-gradient(135deg, #fff8e7 0%, #f4dda0 100%);
          border-bottom: 1px solid #dfc98e;
        }

        .mauksh-report-brand {
          color: #956c1c;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .20em;
          text-transform: uppercase;
        }

        .mauksh-report-header h1 {
          margin: 13px 0 8px;
          font-family: Georgia, "Times New Roman", serif;
          color: #6f4e12;
          font-size: clamp(32px, 6vw, 52px);
          line-height: 1.05;
        }

        .mauksh-report-header p {
          margin: 0;
          color: #76613a;
          font-size: 15px;
        }

        .mauksh-report-header .mauksh-user-name {
          margin-top: 20px;
          font-family: Georgia, "Times New Roman", serif;
          color: #2c271e;
          font-size: 23px;
          font-weight: 700;
        }

        .mauksh-section {
          padding: 38px;
          border-bottom: 1px solid #eee3ce;
        }

        .mauksh-section:last-child {
          border-bottom: 0;
        }

        .mauksh-section-heading {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 24px;
        }

        .mauksh-section-number {
          min-width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f4e4b8;
          color: #916819;
          font-weight: 700;
          font-size: 13px;
        }

        .mauksh-section-heading h2 {
          margin: 0;
          color: #765314;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 27px;
          line-height: 1.2;
        }

        .mauksh-section-heading p {
          margin: 6px 0 0;
          color: #877c6a;
          font-size: 13px;
        }

        .mauksh-summary-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 13px;
        }

        .mauksh-summary-card {
          padding: 22px 16px;
          text-align: center;
          background: #fff;
          border: 1px solid #e7dac0;
          border-radius: 15px;
        }

        .mauksh-summary-card span {
          display: block;
          color: #948671;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: .08em;
          margin-bottom: 9px;
        }

        .mauksh-summary-card strong {
          display: block;
          color: #9a701f;
          font-family: Georgia, serif;
          font-size: 32px;
        }

        .mauksh-summary-card small {
          display: block;
          margin-top: 5px;
          color: #625a4d;
          font-size: 12px;
        }

        .mauksh-number-hero {
          display: flex;
          align-items: center;
          gap: 25px;
          padding: 28px;
          background: linear-gradient(135deg, #fffaf0, #fff);
          border: 1px solid #eadbb8;
          border-radius: 18px;
          margin-bottom: 20px;
        }

        .mauksh-big-number {
          flex: 0 0 105px;
          width: 105px;
          height: 105px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(145deg, #e7c46f, #a97820);
          color: white;
          font-family: Georgia, serif;
          font-size: 54px;
          font-weight: 700;
          box-shadow: 0 10px 25px rgba(145,102,25,.18);
        }

        .mauksh-number-label {
          display: block;
          margin-bottom: 5px;
          color: #aa812b;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: .1em;
          font-weight: 700;
        }

        .mauksh-number-hero h3 {
          margin: 0 0 7px;
          color: #352e23;
          font-family: Georgia, serif;
          font-size: 25px;
        }

        .mauksh-number-hero p {
          margin: 0;
          color: #746b5b;
          line-height: 1.65;
          font-size: 14px;
        }

        .mauksh-grid-layout {
          display: grid;
          grid-template-columns: minmax(250px, 380px) 1fr;
          gap: 35px;
          align-items: center;
        }

        .mauksh-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          width: 100%;
          max-width: 380px;
          margin: 0 auto;
          border: 2px solid #c79a3b;
          border-radius: 3px;
          overflow: hidden;
        }

        .mauksh-grid-cell {
          min-height: 95px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #fffaf0;
          border: 1px solid #dfc98e;
        }

        .mauksh-grid-cell strong {
          color: #8c641a;
          font-family: Georgia, serif;
          font-size: 28px;
        }

        .mauksh-grid-cell span {
          min-height: 18px;
          color: #9d907b;
          font-size: 11px;
          margin-top: 4px;
        }

        .mauksh-grid-cell.empty strong {
          color: #d6cdbb;
        }

        .mauksh-grid-info h3 {
          margin: 0 0 10px;
          color: #765314;
          font-family: Georgia, serif;
          font-size: 22px;
        }

        .mauksh-grid-info p {
          color: #746b5b;
          line-height: 1.7;
          font-size: 14px;
        }

        .mauksh-number-row {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
        }

        .mauksh-number-pill {
          min-width: 58px;
          padding: 9px 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          border-radius: 9px;
          background: #fff7e5;
          border: 1px solid #ead5a5;
          color: #896319;
          font-weight: 700;
        }

        .mauksh-number-pill small {
          color: #9c8a67;
          font-size: 10px;
        }

        .mauksh-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .mauksh-info-card {
          padding: 23px;
          background: #fff;
          border: 1px solid #e8ddc8;
          border-radius: 15px;
        }

        .mauksh-info-card h3 {
          margin: 0 0 12px;
          color: #8d661d;
          font-family: Georgia, serif;
          font-size: 18px;
        }

        .mauksh-card-content {
          color: #5f574a;
          font-size: 14px;
          line-height: 1.75;
        }

        .mauksh-list {
          margin: 0;
          padding-left: 19px;
        }

        .mauksh-list li {
          margin-bottom: 6px;
        }

        .mauksh-detail-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .mauksh-detail {
          padding: 18px;
          border-radius: 13px;
          background: #fff;
          border: 1px solid #eadfca;
        }

        .mauksh-detail span {
          display: block;
          margin-bottom: 6px;
          color: #998b74;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: .08em;
        }

        .mauksh-detail strong {
          color: #453b2d;
          font-size: 14px;
        }

        .mauksh-truth {
          position: relative;
          padding: 30px;
          background: linear-gradient(135deg, #fff9e9, #fffdf8);
          border: 1px solid #dec78c;
          border-radius: 18px;
        }

        .mauksh-truth-label {
          color: #a6781f;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: .15em;
          font-weight: 700;
        }

        .mauksh-truth h3 {
          margin: 10px 0;
          color: #60450f;
          font-family: Georgia, serif;
          font-size: 24px;
        }

        .mauksh-truth p {
          margin: 0;
          color: #665d4f;
          line-height: 1.75;
          font-size: 14px;
        }

        .mauksh-footer {
          padding: 35px;
          text-align: center;
          background: #332b20;
          color: #eee4d1;
        }

        .mauksh-footer strong {
          display: block;
          margin-bottom: 8px;
          color: #e4bf67;
          font-family: Georgia, serif;
          font-size: 21px;
        }

        .mauksh-footer span {
          color: #c7bda9;
          font-size: 12px;
        }

        .mauksh-empty {
          padding: 25px;
          text-align: center;
          color: #8c8170;
          background: #fff;
          border: 1px dashed #dbcba9;
          border-radius: 14px;
        }

        @media (max-width: 800px) {
          .mauksh-form-card {
            padding: 28px 20px;
          }

          .mauksh-section {
            padding: 28px 20px;
          }

          .mauksh-summary-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .mauksh-grid-layout {
            grid-template-columns: 1fr;
          }

          .mauksh-cards-grid {
            grid-template-columns: 1fr;
          }

          .mauksh-detail-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 520px) {
          .mauksh-page {
            padding: 20px 10px 60px;
          }

          .mauksh-report {
            border-radius: 18px;
          }

          .mauksh-report-header {
            padding: 42px 20px;
          }

          .mauksh-summary-grid {
            grid-template-columns: 1fr 1fr;
          }

          .mauksh-number-hero {
            padding: 20px;
            gap: 16px;
          }

          .mauksh-big-number {
            flex-basis: 75px;
            width: 75px;
            height: 75px;
            font-size: 40px;
          }

          .mauksh-number-hero h3 {
            font-size: 20px;
          }

          .mauksh-detail-grid {
            grid-template-columns: 1fr;
          }

          .mauksh-grid-cell {
            min-height: 78px;
          }
        }
      `}</style>

      <div className="mauksh-container">
        {!report && (
          <section className="mauksh-form-card">
        

            <h1 className="mauksh-form-title">
              Numerology Report
            </h1>

            <p className="mauksh-form-subtitle">
              Discover your Radical Number, Destiny Number, Name Number,
              Vedic Numerology Grid and your current Personal Year.
            </p>

            {error && <div className="mauksh-error">{error}</div>}

            <div className="mauksh-field">
              <label htmlFor="name">FULL NAME</label>

              <input
                id="name"
                type="text"
                className="mauksh-input"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>

            <div className="mauksh-field">
              <label htmlFor="dob">DATE OF BIRTH</label>

              <input
                id="dob"
                type="date"
                className="mauksh-input"
                value={dob}
                max={maxDate}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="mauksh-button"
              onClick={calculate}
            >
              Generate My Numerology Report
            </button>

            <p className="mauksh-note">
              Based on Vedic Numerology principles • For guidance and
              self-reflection
            </p>
          </section>
        )}

        {report && (
          <article id="mauksh-report" className="mauksh-report">
            {/* HEADER */}

            <header className="mauksh-report-header">
              <div className="mauksh-brand-mark">M</div>

              <div className="mauksh-report-brand">
                MAUKSH
              </div>

              <h1>Numerology Report</h1>

              <p>Spirituality is Personal</p>

              <div className="mauksh-user-name">
                {name.trim()}
              </div>

              <p style={{ marginTop: 8 }}>
                Date of Birth: {formatDate(report.dob)}
              </p>
            </header>

            {/* SUMMARY */}

            <section className="mauksh-section">
              <SectionTitle
                number="01"
                title="Your Numerology Snapshot"
                subtitle="Your core numbers at a glance"
              />

              <div className="mauksh-summary-grid">
                <div className="mauksh-summary-card">
                  <span>Radical Number</span>
                  <strong>{report.mulank}</strong>
                  <small>{primaryData.title}</small>
                </div>

                <div className="mauksh-summary-card">
                  <span>Destiny Number</span>
                  <strong>{report.bhagyank}</strong>
                  <small>{destinyData.title}</small>
                </div>

                <div className="mauksh-summary-card">
                  <span>Name Number</span>
                  <strong>{report.nameNumber}</strong>
                  <small>{nameData.title}</small>
                </div>

                <div className="mauksh-summary-card">
                  <span>Personal Year</span>
                  <strong>{report.personalYear}</strong>
                  <small>{personalYearData.title}</small>
                </div>
              </div>
            </section>

            {/* BASIC DETAILS */}

            <section className="mauksh-section">
              <SectionTitle
                number="02"
                title="Birth Details"
                subtitle="The foundation of your numerology calculation"
              />

              <div className="mauksh-detail-grid">
                <div className="mauksh-detail">
                  <span>Name</span>
                  <strong>{name.trim()}</strong>
                </div>

                <div className="mauksh-detail">
                  <span>Date of Birth</span>
                  <strong>{formatDate(report.dob)}</strong>
                </div>

                <div className="mauksh-detail">
                  <span>Day</span>
                  <strong>{report.day}</strong>
                </div>

                <div className="mauksh-detail">
                  <span>Month</span>
                  <strong>{report.month}</strong>
                </div>

                <div className="mauksh-detail">
                  <span>Year</span>
                  <strong>{report.year}</strong>
                </div>

                <div className="mauksh-detail">
                  <span>Weekday</span>
                  <strong>{report.weekday}</strong>
                </div>
              </div>
            </section>

            {/* RADICAL */}

            <section className="mauksh-section">
              <SectionTitle
                number="03"
                title="Radical Number"
                subtitle="Your natural personality and instinctive expression"
              />

              <NumberHero
                number={report.mulank}
                label="Radical Number"
              />

              <div className="mauksh-cards-grid">
                <InfoCard title="Personality">
                  {primaryData.personality}
                </InfoCard>

                <InfoCard title="Strengths">
                  <BulletList items={primaryData.strengths} />
                </InfoCard>

                <InfoCard title="Challenges">
                  <BulletList items={primaryData.challenges} />
                </InfoCard>

                <InfoCard title="Work Style">
                  {primaryData.work}
                </InfoCard>
              </div>
            </section>

            {/* DESTINY */}

            <section className="mauksh-section">
              <SectionTitle
                number="04"
                title="Destiny Number"
                subtitle="The broader direction and life themes represented by your birth date"
              />

              <NumberHero
                number={report.bhagyank}
                label="Destiny Number"
              />

              <div className="mauksh-cards-grid">
                <InfoCard title="Career">
                  {destinyData.career}
                </InfoCard>

                <InfoCard title="Business">
                  {destinyData.business}
                </InfoCard>

                <InfoCard title="Money">
                  {destinyData.money}
                </InfoCard>

                <InfoCard title="Relationships">
                  {destinyData.relationships}
                </InfoCard>
              </div>
            </section>

            {/* NAME NUMBER */}

            <section className="mauksh-section">
              <SectionTitle
                number="05"
                title="Name Number"
                subtitle="The vibration represented by your current name"
              />

              <NumberHero
                number={report.nameNumber}
                label="Chaldean Name Number"
              />

              <div className="mauksh-cards-grid">
                <InfoCard title="Name Energy">
                  {nameData.meaning}
                </InfoCard>

                <InfoCard title="Expression">
                  {nameData.personality}
                </InfoCard>

                <InfoCard title="Career Influence">
                  {nameData.career}
                </InfoCard>

                <InfoCard title="Financial Influence">
                  {nameData.money}
                </InfoCard>
              </div>
            </section>

            {/* GRID */}

            <section className="mauksh-section">
              <SectionTitle
                number="06"
                title="Vedic Numerology Grid"
                subtitle="Your birth-date number distribution"
              />

              <div className="mauksh-grid-layout">
                <div className="mauksh-grid">
                  {[3, 1, 9, 6, 7, 5, 2, 8, 4].map((number) => (
                    <div
                      key={number}
                      className={`mauksh-grid-cell ${
                        report.grid[number] === 0 ? "empty" : ""
                      }`}
                    >
                      <strong>{number}</strong>

                      <span>
                        {report.grid[number] > 0
                          ? `${report.grid[number]} occurrence${
                              report.grid[number] > 1 ? "s" : ""
                            }`
                          : "Absent"}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mauksh-grid-info">
                  <h3>Your Numerology Grid</h3>

                  <p>
                    The grid follows the Vedic Numerology arrangement:
                  </p>

                  <p>
                    <strong>3 1 9</strong>
                    <br />
                    <strong>6 7 5</strong>
                    <br />
                    <strong>2 8 4</strong>
                  </p>

                  <p>
                    The calculation uses the day, month and last two
                    digits of the birth year. The Radical Number and
                    Destiny Number are also included in the grid.
                  </p>
                </div>
              </div>
            </section>

            {/* PRESENT */}

            <section className="mauksh-section">
              <SectionTitle
                number="07"
                title="Numbers Present"
                subtitle="Numbers appearing in your personal grid"
              />

              {presentNumbers.length > 0 ? (
                <div className="mauksh-number-row">
                  {presentNumbers.map(({ number, count }) => (
                    <NumberPill
                      key={number}
                      number={number}
                      count={count}
                    />
                  ))}
                </div>
              ) : (
                <div className="mauksh-empty">
                  No numbers available.
                </div>
              )}
            </section>

            {/* MISSING */}

            <section className="mauksh-section">
              <SectionTitle
                number="08"
                title="Missing Numbers"
                subtitle="Numbers that do not naturally appear in the grid"
              />

              {missingNumbers.length > 0 ? (
                <>
                  <div className="mauksh-number-row">
                    {missingNumbers.map((number) => (
                      <NumberPill
                        key={number}
                        number={number}
                      />
                    ))}
                  </div>

                  <p
                    style={{
                      marginTop: 18,
                      color: "#756b5b",
                      fontSize: 13,
                      lineHeight: 1.7,
                    }}
                  >
                    A missing number is traditionally interpreted as an
                    area that may require conscious development. It does
                    not mean that the qualities of that number are
                    completely absent from your life.
                  </p>
                </>
              ) : (
                <div className="mauksh-empty">
                  All numbers are represented in your grid.
                </div>
              )}
            </section>

            {/* REPEATED */}

            <section className="mauksh-section">
              <SectionTitle
                number="09"
                title="Repeated Numbers"
                subtitle="Numbers appearing multiple times in your grid"
              />

              {repeatedNumbers.length > 0 ? (
                <div className="mauksh-number-row">
                  {repeatedNumbers.map(({ number, count }) => (
                    <NumberPill
                      key={number}
                      number={number}
                      count={count}
                    />
                  ))}
                </div>
              ) : (
                <div className="mauksh-empty">
                  No repeated numbers found.
                </div>
              )}
            </section>

            {/* CAREER */}

            <section className="mauksh-section">
              <SectionTitle
                number="10"
                title="Career & Professional Life"
                subtitle="Numerological themes connected with work"
              />

              <div className="mauksh-cards-grid">
                <InfoCard title="Primary Career Direction">
                  {primaryData.career}
                </InfoCard>

                <InfoCard title="Work Environment">
                  {primaryData.work}
                </InfoCard>

                <InfoCard title="Destiny Influence">
                  {destinyData.career}
                </InfoCard>

                <InfoCard title="Name Influence">
                  {nameData.career}
                </InfoCard>
              </div>
            </section>

            {/* BUSINESS */}

            <section className="mauksh-section">
              <SectionTitle
                number="11"
                title="Business & Entrepreneurship"
                subtitle="Business themes suggested by your numbers"
              />

              <div className="mauksh-cards-grid">
                <InfoCard title="Business Style">
                  {primaryData.business}
                </InfoCard>

                <InfoCard title="Destiny Influence">
                  {destinyData.business}
                </InfoCard>

                <InfoCard title="Money Pattern">
                  {primaryData.money}
                </InfoCard>

                <InfoCard title="Name Number">
                  {nameData.business}
                </InfoCard>
              </div>
            </section>

            {/* MONEY */}

            <section className="mauksh-section">
              <SectionTitle
                number="12"
                title="Money & Financial Energy"
                subtitle="Traditional numerological interpretation"
              />

              <div className="mauksh-cards-grid">
                <InfoCard title="Radical Number">
                  {primaryData.money}
                </InfoCard>

                <InfoCard title="Destiny Number">
                  {destinyData.money}
                </InfoCard>

                <InfoCard title="Name Number">
                  {nameData.money}
                </InfoCard>

                <InfoCard title="Financial Focus">
                  Build financial habits that match your natural strengths
                  while avoiding impulsive or emotionally driven decisions.
                </InfoCard>
              </div>
            </section>

            {/* LOVE */}

            <section className="mauksh-section">
              <SectionTitle
                number="13"
                title="Love & Relationships"
                subtitle="Your relationship tendencies through numerology"
              />

              <div className="mauksh-cards-grid">
                <InfoCard title="Radical Number">
                  {primaryData.relationships}
                </InfoCard>

                <InfoCard title="Destiny Number">
                  {destinyData.relationships}
                </InfoCard>

                <InfoCard title="Name Number">
                  {nameData.relationships}
                </InfoCard>

                <InfoCard title="Relationship Reminder">
                  Numerology describes tendencies rather than fixed
                  outcomes. Communication, compatibility and personal
                  choices remain important.
                </InfoCard>
              </div>
            </section>

            {/* HEALTH */}

            <section className="mauksh-section">
              <SectionTitle
                number="14"
                title="Health & Lifestyle"
                subtitle="Traditional numerological lifestyle observations"
              />

              <div className="mauksh-cards-grid">
                <InfoCard title="Radical Number">
                  {primaryData.health}
                </InfoCard>

                <InfoCard title="Destiny Number">
                  {destinyData.health}
                </InfoCard>

                <InfoCard title="Lifestyle Focus">
                  {nameData.health}
                </InfoCard>

                <InfoCard title="Important Note">
                  These observations are traditional numerology
                  interpretations and are not medical advice or a
                  diagnosis.
                </InfoCard>
              </div>
            </section>

            {/* FAVOURABLE */}

            <section className="mauksh-section">
              <SectionTitle
                number="15"
                title="Favourable Details"
                subtitle="Traditional associations connected with your numbers"
              />

              <div className="mauksh-detail-grid">
                <div className="mauksh-detail">
                  <span>Planet</span>
                  <strong>{primaryData.planet}</strong>
                </div>

                <div className="mauksh-detail">
                  <span>Favourable Days</span>
                  <strong>{primaryData.days}</strong>
                </div>

                <div className="mauksh-detail">
                  <span>Colours</span>
                  <strong>{primaryData.colour}</strong>
                </div>

                <div className="mauksh-detail">
                  <span>Letters</span>
                  <strong>{primaryData.letters}</strong>
                </div>

                <div className="mauksh-detail">
                  <span>Direction</span>
                  <strong>{primaryData.direction}</strong>
                </div>

                <div className="mauksh-detail">
                  <span>Favourable Dates</span>
                  <strong>{primaryData.dates}</strong>
                </div>
              </div>
            </section>

            {/* DEITY */}

            <section className="mauksh-section">
              <SectionTitle
                number="16"
                title="Deity & Mantra"
                subtitle="Traditional spiritual associations"
              />

              <div className="mauksh-cards-grid">
                <InfoCard title="Associated Deity">
                  {primaryData.deity}
                </InfoCard>

                <InfoCard title="Traditional Mantra">
                  {primaryData.mantra}
                </InfoCard>
              </div>
            </section>

            {/* REMEDIES */}

            <section className="mauksh-section">
              <SectionTitle
                number="17"
                title="Traditional Remedies"
                subtitle="Simple practices traditionally associated with your number"
              />

              <div className="mauksh-info-card">
                <BulletList items={primaryData.remedies} />
              </div>
            </section>

            {/* PERSONAL YEAR */}

            <section className="mauksh-section">
              <SectionTitle
                number="18"
                title={`Personal Year ${new Date().getFullYear()}`}
                subtitle="Your current annual numerological theme"
              />

              <NumberHero
                number={report.personalYear}
                label="Personal Year"
              />

              <div className="mauksh-cards-grid">
                <InfoCard title="Theme">
                  {personalYearData.year}
                </InfoCard>

                <InfoCard title="Focus">
                  {personalYearData.yearFocus}
                </InfoCard>

                <InfoCard title="Guidance">
                  Use this year as a framework for reflection and planning
                  rather than treating it as a fixed prediction.
                </InfoCard>

                <InfoCard title="Your Number">
                  Personal Year {report.personalYear} is calculated from
                  your birth day, birth month and the current calendar
                  year.
                </InfoCard>
              </div>
            </section>

            {/* TRUTH */}

            <section className="mauksh-section">
              <div className="mauksh-truth">
                <div className="mauksh-truth-label">
                  Mauksh Truth
                </div>

                <h3>Numerology is a guide, not a guarantee.</h3>

                <p>
                  Your numbers can provide a framework for understanding
                  personality patterns, strengths and areas for conscious
                  development. They do not remove free will or guarantee
                  specific events. Use this report as a tool for
                  reflection, awareness and better decision-making.
                </p>
              </div>
            </section>

            {/* FOOTER */}

            <footer className="mauksh-footer">
              <strong>MAUKSH</strong>

              <span>
                Spirituality is Personal • Honest Products • No False
                Promises
              </span>
            </footer>
          </article>
        )}
      </div>
    </main>
  );
}