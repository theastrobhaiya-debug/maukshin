"use client";

import { useState } from "react";

type NumberData = {
  title: string;
  meaning: string;
  personality: string;
  strength: string;
  challenge: string;
  work: string;
  career: string;
  business: string;
  money: string;
  moneyAdvice: string;
  relationship: string;
  relationshipAdvice: string;
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
  name: string;
  dob: string;
  weekday: string;
  mulank: number;
  bhagyank: number;
  nameNumber: number;
  nameCompound: number;
  grid: Record<number, number>;
  present: number[];
  missing: number[];
  repeated: number[];
  personalYear: number;
};

const M: Record<number, NumberData> = {
  1: {
    title: "Sun · Leadership & Individuality",
    meaning:
      "Number 1 is traditionally associated with independence, initiative, individuality and leadership. People strongly connected with this number may prefer creating their own path rather than simply following established patterns.",
    personality:
      "You may naturally want to take the lead and make decisions independently. Recognition for your contribution can be important, and you may become frustrated when your initiative is unnecessarily restricted.",
    strength:
      "Initiative, courage, originality, independence and leadership.",
    challenge:
      "Impatience, ego clashes, stubbornness and difficulty accepting restrictions.",
    work:
      "You may perform well where you can take responsibility, make decisions and create something independently.",
    career:
      "Leadership, entrepreneurship, administration, management, sales, consulting and independent professional work.",
    business:
      "Independent ventures can appeal to this number. Success depends on consistency, planning and the ability to work with people rather than trying to control everything.",
    money:
      "A strong desire for independence can translate into a strong earning drive. Financial structure is important so ambition does not turn into impulsive decisions.",
    moneyAdvice:
      "Create clear saving, investment and spending rules before making major financial decisions.",
    relationship:
      "You may value respect, loyalty and independence in relationships. You may prefer a partner who respects your individuality.",
    relationshipAdvice:
      "Leadership is useful professionally, but relationships benefit from equal participation and listening.",
    health:
      "Traditional numerology associates this number with vitality and the importance of maintaining balance and routine.",
    planet: "Sun",
    days: "Sunday",
    colour: "Gold, orange",
    letters: "A, I, J, Q, Y",
    direction: "East",
    deity: "Surya",
    mantra: "Om Suryaya Namah",
    dates: "1st, 10th, 19th, 28th",
    remedies: [
      "Maintain a disciplined morning routine.",
      "Spend time in sunlight in a comfortable and appropriate way.",
      "Practice gratitude and humility while taking leadership.",
    ],
    year: "A year of initiative, independence and new beginnings.",
    yearFocus:
      "Start important projects, establish direction and take ownership while avoiding unnecessary impulsiveness.",
  },

  2: {
    title: "Moon · Sensitivity & Partnership",
    meaning:
      "Number 2 is traditionally associated with sensitivity, cooperation, diplomacy, intuition and partnership.",
    personality:
      "You may be observant of emotions and subtle changes around you. Cooperation can come naturally, although overthinking may sometimes slow decisions.",
    strength: "Empathy, diplomacy, intuition, cooperation and patience.",
    challenge:
      "Hesitation, emotional fluctuations, overthinking and dependence on approval.",
    work:
      "You may thrive where communication, collaboration and understanding people are important.",
    career:
      "Counselling, HR, design, hospitality, client relations, communication and partnership-based work.",
    business:
      "Partnerships can be important, provided roles, responsibilities and finances are clearly defined.",
    money:
      "Emotional considerations may sometimes influence financial decisions.",
    moneyAdvice:
      "Use objective budgets and rules rather than making important decisions only according to mood.",
    relationship:
      "Emotional security, trust and understanding may be particularly important.",
    relationshipAdvice:
      "Communicate feelings directly rather than expecting others to automatically understand them.",
    health:
      "Traditional numerology associates this number with the importance of emotional balance, adequate rest and routine.",
    planet: "Moon",
    days: "Monday",
    colour: "White, cream",
    letters: "B, K, R",
    direction: "North-West",
    deity: "Gauri / Chandra",
    mantra: "Om Chandraya Namah",
    dates: "2nd, 11th, 20th, 29th",
    remedies: [
      "Maintain a calm and regular daily routine.",
      "Spend time in peaceful surroundings.",
      "Practice emotional boundaries and mindful communication.",
    ],
    year:
      "A year connected with patience, relationships, cooperation and emotional awareness.",
    yearFocus:
      "Develop important partnerships and allow situations to mature instead of forcing immediate results.",
  },

  3: {
    title: "Jupiter · Expression & Knowledge",
    meaning:
      "Number 3 is traditionally associated with learning, communication, creativity, optimism and expression.",
    personality:
      "You may have a natural interest in learning and communicating ideas. Your enthusiasm can make you expressive and socially engaging.",
    strength: "Creativity, communication, learning, teaching and optimism.",
    challenge:
      "Scattered attention, inconsistency and difficulty finishing everything you begin.",
    work:
      "Your ability to explain, teach or communicate ideas can become a professional strength.",
    career:
      "Teaching, consulting, writing, marketing, media, finance, content and communication.",
    business:
      "Knowledge-based businesses and communication-led ventures can suit this vibration.",
    money:
      "Ideas and communication can become valuable assets when supported by execution.",
    moneyAdvice:
      "Create budgets and avoid allowing enthusiasm to replace financial discipline.",
    relationship:
      "Mental connection and appreciation may be important.",
    relationshipAdvice:
      "Clear communication is more useful than expecting people to interpret hints.",
    health:
      "Traditional numerology encourages moderation, routine and balance for this number.",
    planet: "Jupiter",
    days: "Thursday",
    colour: "Yellow",
    letters: "C, G, L, S",
    direction: "North-East",
    deity: "Brihaspati",
    mantra: "Om Brim Brihaspataye Namah",
    dates: "3rd, 12th, 21st, 30th",
    remedies: [
      "Dedicate regular time to learning.",
      "Respect teachers and mentors.",
      "Keep promises and complete unfinished tasks.",
    ],
    year:
      "A year of communication, creativity, learning and expansion.",
    yearFocus:
      "Create, communicate and make your knowledge visible while maintaining discipline.",
  },

  4: {
    title: "Rahu · Structure & Practicality",
    meaning:
      "Number 4 is traditionally associated with structure, systems, practicality, discipline and unconventional approaches.",
    personality:
      "You may prefer practical solutions and organised systems. You can be persistent when you believe something is worth building.",
    strength:
      "Organisation, persistence, practicality, systems thinking and problem solving.",
    challenge:
      "Rigidity, frustration with delays and excessive control.",
    work:
      "You may perform well where systems, operations and practical execution matter.",
    career:
      "Technology, operations, engineering, administration, systems, research and structured businesses.",
    business:
      "System-based businesses can be attractive. Processes and documentation become especially valuable.",
    money:
      "Long-term structure and disciplined financial habits can support stability.",
    moneyAdvice:
      "Avoid chasing quick opportunities without understanding the risk.",
    relationship:
      "Reliability and consistency may matter greatly to you.",
    relationshipAdvice:
      "Practical support is valuable, but emotional communication should not be neglected.",
    health:
      "Traditional numerology emphasises routine, moderation and maintaining consistent lifestyle habits.",
    planet: "Rahu",
    days: "Saturday",
    colour: "Grey, earthy tones",
    letters: "D, M, T",
    direction: "South-West",
    deity: "Durga",
    mantra: "Om Raam Rahave Namah",
    dates: "4th, 13th, 22nd, 31st",
    remedies: [
      "Keep your environment organised.",
      "Follow consistent routines.",
      "Complete important work instead of constantly changing direction.",
    ],
    year:
      "A year of structure, discipline, organisation and practical foundations.",
    yearFocus:
      "Build systems, strengthen foundations and complete unfinished responsibilities.",
  },

  5: {
    title: "Mercury · Freedom & Communication",
    meaning:
      "Number 5 is traditionally associated with communication, freedom, adaptability, curiosity and movement.",
    personality:
      "You may enjoy variety, conversation, new experiences and learning through direct experience.",
    strength:
      "Communication, networking, adaptability, curiosity and commercial ability.",
    challenge:
      "Restlessness, distraction, impatience and frequent changes.",
    work:
      "Dynamic environments where communication and adaptability are useful may suit you.",
    career:
      "Business, sales, marketing, media, travel, technology and communication.",
    business:
      "Trading, sales, marketing and communication-driven businesses can resonate with this number.",
    money:
      "You may have commercial instincts but should be careful about impulsive decisions.",
    moneyAdvice: "Use defined budgets and risk limits.",
    relationship:
      "Freedom and mental stimulation can be important.",
    relationshipAdvice:
      "Explain your need for space rather than allowing it to create misunderstandings.",
    health:
      "Traditional numerology encourages moderation and consistent routines despite a desire for variety.",
    planet: "Mercury",
    days: "Wednesday",
    colour: "Green",
    letters: "E, H, N, X",
    direction: "North",
    deity: "Vishnu",
    mantra: "Om Budhaya Namah",
    dates: "5th, 14th, 23rd",
    remedies: [
      "Keep learning new skills.",
      "Maintain a simple daily routine.",
      "Think before making impulsive commitments.",
    ],
    year:
      "A year of movement, change, communication and new experiences.",
    yearFocus:
      "Remain adaptable while avoiding unnecessary impulsive changes.",
  },

  6: {
    title: "Venus · Harmony & Responsibility",
    meaning:
      "Number 6 is traditionally associated with harmony, beauty, responsibility, relationships, comfort and creativity.",
    personality:
      "You may be warm, caring and attracted toward beauty and comfortable surroundings. People may naturally seek your support.",
    strength:
      "Charm, creativity, responsibility, loyalty and aesthetic sense.",
    challenge:
      "People pleasing, over-responsibility and attachment to comfort.",
    work:
      "Creating trust, beauty or comfort can become a professional advantage.",
    career:
      "Design, beauty, branding, luxury, hospitality, entertainment and client services.",
    business:
      "Businesses connected with beauty, lifestyle, hospitality, luxury or customer experience can resonate.",
    money:
      "You may naturally appreciate quality and comfort.",
    moneyAdvice:
      "Balance lifestyle spending with savings and long-term priorities.",
    relationship:
      "Affection, loyalty and emotional warmth may be important.",
    relationshipAdvice:
      "Healthy boundaries prevent caring for others from becoming emotional exhaustion.",
    health:
      "Traditional numerology encourages moderation, rest and balance between responsibilities and personal enjoyment.",
    planet: "Venus",
    days: "Friday",
    colour: "White, pastel shades",
    letters: "U, V, W",
    direction: "South-East",
    deity: "Lakshmi",
    mantra: "Om Shukraya Namah",
    dates: "6th, 15th, 24th",
    remedies: [
      "Maintain cleanliness and beauty in your surroundings.",
      "Practice gratitude in relationships.",
      "Balance giving with receiving.",
    ],
    year:
      "A year of responsibility, relationships, home, harmony and commitments.",
    yearFocus:
      "Strengthen important relationships while maintaining boundaries.",
  },

  7: {
    title: "Ketu · Reflection & Intuition",
    meaning:
      "Number 7 is traditionally associated with introspection, research, analysis, intuition and deeper understanding.",
    personality:
      "You may naturally question things and prefer understanding subjects deeply rather than accepting them immediately.",
    strength:
      "Analysis, research, observation, intuition and independent thinking.",
    challenge:
      "Overanalysis, withdrawal and difficulty expressing inner thoughts.",
    work:
      "Specialist knowledge and analytical ability can become important strengths.",
    career:
      "Research, technology, analysis, investigation, specialist fields and spiritual studies.",
    business:
      "Specialised or knowledge-intensive businesses can appeal to this number.",
    money:
      "You may prefer understanding an opportunity thoroughly before committing.",
    moneyAdvice:
      "Research carefully but avoid endless hesitation.",
    relationship:
      "You may need both closeness and personal space.",
    relationshipAdvice:
      "Communicate your need for solitude clearly.",
    health:
      "Traditional numerology encourages rest, mental balance and avoiding excessive overthinking.",
    planet: "Ketu",
    days: "Tuesday, Thursday",
    colour: "White, light shades",
    letters: "O, Z",
    direction: "North-East",
    deity: "Ganesha",
    mantra: "Om Ketave Namah",
    dates: "7th, 16th, 25th",
    remedies: [
      "Spend regular time in quiet reflection.",
      "Develop a consistent meditation or prayer practice.",
      "Balance research with practical action.",
    ],
    year:
      "A year of reflection, learning, research and inner development.",
    yearFocus:
      "Study, simplify and develop deeper understanding without becoming isolated.",
  },

  8: {
    title: "Saturn · Discipline & Achievement",
    meaning:
      "Number 8 is traditionally associated with responsibility, discipline, authority, persistence and material organisation.",
    personality:
      "You may be serious about responsibilities and prefer results that are built gradually. You may also develop strong endurance through experience.",
    strength:
      "Persistence, management, responsibility, discipline and long-term thinking.",
    challenge:
      "Carrying too much responsibility, frustration with delays and becoming overly serious.",
    work:
      "You may excel when given meaningful responsibility and enough time to build results.",
    career:
      "Management, finance, operations, administration, law, infrastructure and long-term business.",
    business:
      "Large systems, operations, management and businesses requiring patience can resonate strongly.",
    money:
      "Long-term financial planning, organisation and patience are important themes.",
    moneyAdvice:
      "Focus on sustainable financial structures rather than quick gains.",
    relationship:
      "You may demonstrate care through responsibility and practical support.",
    relationshipAdvice:
      "Remember to communicate emotions, not only responsibilities.",
    health:
      "Traditional numerology emphasises discipline, routine, rest and moderation. This is symbolic guidance and not medical advice.",
    planet: "Saturn",
    days: "Saturday",
    colour: "Black, navy, dark blue",
    letters: "F, P",
    direction: "West",
    deity: "Shani",
    mantra: "Om Sham Shanicharaya Namah",
    dates: "8th, 17th, 26th",
    remedies: [
      "Maintain disciplined routines.",
      "Offer service to people who need support.",
      "Use patience instead of reacting to delays.",
      "Traditional practice may include Saturday prayer or meditation dedicated to Shani.",
    ],
    year:
      "A year associated with responsibility, organisation, achievement and material priorities.",
    yearFocus:
      "Take responsibility, organise resources and work patiently toward measurable goals.",
  },

  9: {
    title: "Mars · Courage & Action",
    meaning:
      "Number 9 is traditionally associated with courage, energy, action, completion, passion and strong convictions.",
    personality:
      "You may have strong drive and may react quickly when something feels important. Purpose can motivate you strongly.",
    strength:
      "Courage, resilience, determination, passion and action.",
    challenge:
      "Impulsiveness, frustration, emotional intensity and unnecessary conflict.",
    work:
      "Action-oriented environments where courage and decisive execution matter may suit you.",
    career:
      "Leadership, entrepreneurship, engineering, sports, sales and action-oriented roles.",
    business:
      "Fast-moving ventures can appeal to this energy, but planning is important.",
    money:
      "Strong ambition can support earning, while impulsiveness should be controlled.",
    moneyAdvice:
      "Set clear financial limits before taking major risks.",
    relationship:
      "You may be passionate and protective.",
    relationshipAdvice:
      "Patience and softer communication can reduce unnecessary conflict.",
    health:
      "Traditional numerology encourages moderation, adequate rest and healthy management of stress and intensity.",
    planet: "Mars",
    days: "Tuesday",
    colour: "Red",
    letters: "B, M, D, T",
    direction: "South",
    deity: "Hanuman",
    mantra: "Om Angarakaya Namah",
    dates: "9th, 18th, 27th",
    remedies: [
      "Practice patience before reacting.",
      "Channel physical energy into constructive activity.",
      "Maintain discipline in daily routines.",
    ],
    year:
      "A year of completion, release, courage and preparation for a new cycle.",
    yearFocus:
      "Complete unfinished matters and create space for the next phase.",
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

function reduceNumber(num: number): number {
  while (num > 9) {
    num = String(num)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }

  return num;
}

function getNameNumber(name: string) {
  let total = 0;

  name
    .toUpperCase()
    .split("")
    .forEach((letter) => {
      if (CHALDEAN[letter]) {
        total += CHALDEAN[letter];
      }
    });

  return {
    compound: total,
    root: reduceNumber(total),
  };
}

function getGrid(
  dob: string,
  mulank: number,
  bhagyank: number
): Record<number, number> {
  const [yearString, monthString, dayString] = dob.split("-");

  const year = Number(yearString);
  const month = Number(monthString);
  const day = Number(dayString);

  const lastTwo = String(year).slice(-2);

  const digits =
    String(day).padStart(2, "0") +
    String(month).padStart(2, "0") +
    lastTwo +
    String(mulank) +
    String(bhagyank);

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

  digits.split("").forEach((digit) => {
    const number = Number(digit);

    if (number >= 1 && number <= 9) {
      grid[number]++;
    }
  });

  return grid;
}

function getPersonalYear(
  day: number,
  month: number,
  year: number
) {
  return reduceNumber(day + month + year);
}

function formatDate(dob: string) {
  const [year, month, day] = dob.split("-");

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getWeekday(dob: string) {
  const [year, month, day] = dob.split("-");

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  ).toLocaleDateString("en-IN", {
    weekday: "long",
  });
}

function SummaryCard({
  number,
  title,
  subtitle,
}: {
  number: number;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mauksh-nr-summary-card">
      <strong>{number}</strong>
      <span>{title}</span>
      <small>{subtitle}</small>
    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="mauksh-nr-info-card">
      <label>{label}</label>
      <strong>{value}</strong>
    </div>
  );
}

function SectionTop({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div className="mauksh-nr-section-top">
      {eyebrow && (
        <div className="mauksh-nr-eyebrow">
          {eyebrow}
        </div>
      )}

      <h3>{title}</h3>
    </div>
  );
}

function NumberSection({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mauksh-nr-section">
      <div className="mauksh-nr-section-top">
        <div className="mauksh-nr-big-number">
          {number}
        </div>

        <h3>{title}</h3>
      </div>

      <div className="mauksh-nr-section-body">
        {children}
      </div>
    </section>
  );
}

function AnalysisSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mauksh-nr-section">
      <SectionTop
        eyebrow={eyebrow}
        title={title}
      />

      <div className="mauksh-nr-section-body">
        {children}
      </div>
    </section>
  );
}

function SubGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mauksh-nr-subgrid">
      {children}
    </div>
  );
}

function SubCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="mauksh-nr-subcard">
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}

function NumberItem({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="mauksh-nr-number-item">
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}

export default function MaukshNumerologyReport() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [report, setReport] = useState<Report | null>(null);

  const generateReport = () => {
    if (!name.trim() || !dob) {
      alert(
        "Please enter your full birth name and date of birth."
      );
      return;
    }

    const [yearString, monthString, dayString] =
      dob.split("-");

    const year = Number(yearString);
    const month = Number(monthString);
    const day = Number(dayString);

    const mulank = reduceNumber(day);

    const bhagyank = reduceNumber(
      day + month + year
    );

    const nameData = getNameNumber(name);

    const grid = getGrid(
      dob,
      mulank,
      bhagyank
    );

    const numbers = Object.keys(grid).map(Number);

    const present = numbers.filter(
      (number) => grid[number] > 0
    );

    const missing = numbers.filter(
      (number) => grid[number] === 0
    );

    const repeated = numbers.filter(
      (number) => grid[number] >= 2
    );

    const currentYear =
      new Date().getFullYear();

    const personalYear =
      getPersonalYear(
        day,
        month,
        currentYear
      );

    setReport({
      name: name.trim(),
      dob,
      weekday: getWeekday(dob),
      mulank,
      bhagyank,
      nameNumber: nameData.root,
      nameCompound: nameData.compound,
      grid,
      present,
      missing,
      repeated,
      personalYear,
    });

    setTimeout(() => {
      document
        .getElementById("mauksh-nr-report")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  };

  const currentYear =
    new Date().getFullYear();

  return (
    <>
      <main className="mauksh-nr-page">
        <div className="mauksh-nr-wrap">

          {/* HERO */}

          <section className="mauksh-nr-hero">
            <div className="mauksh-nr-eyebrow">
              MAUKSH NUMEROLOGY
            </div>

            <h1>
              Your Complete Numerology Report
            </h1>

            <p>
              Enter your full birth name and date
              of birth to discover your core
              numbers, Vedic numerology grid,
              personality patterns, career
              tendencies, relationships,
              favourable numbers and more.
            </p>
          </section>

          {/* FORM */}

          <section className="mauksh-nr-form">
            <div
              className="mauksh-nr-eyebrow"
              style={{ textAlign: "center" }}
            >
              FREE PERSONALIZED REPORT
            </div>

            <h2>Enter Your Details</h2>

            <p className="mauksh-nr-form-sub">
              Use your full birth name for the
              Name Number.
            </p>

            <div className="mauksh-nr-field">
              <label>FULL BIRTH NAME</label>

              <input
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Example: Shivam Bansal"
              />
            </div>

            <div className="mauksh-nr-field">
              <label>DATE OF BIRTH</label>

              <input
                type="date"
                value={dob}
                onChange={(event) =>
                  setDob(event.target.value)
                }
              />
            </div>

            <button
              type="button"
              className="mauksh-nr-generate"
              onClick={generateReport}
            >
              Generate My Complete Report →
            </button>

            <div className="mauksh-nr-note">
              Your report is generated instantly
              on this page.
            </div>
          </section>

          {report && (
            <section
              id="mauksh-nr-report"
              className="mauksh-nr-report"
            >
              <ReportContent
                report={report}
                currentYear={currentYear}
              />
            </section>
          )}
        </div>
      </main>

      <style jsx>{`
        .mauksh-nr-page {
          background: #fffaf2;
          color: #24211d;
          padding: 45px 12px 100px;
          font-family: Arial, Helvetica, sans-serif;
          min-height: 100vh;
        }

        .mauksh-nr-wrap {
          max-width: 920px;
          margin: auto;
        }

        .mauksh-nr-hero {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 35px;
        }

        .mauksh-nr-eyebrow {
          color: #a87520;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .mauksh-nr-hero h1 {
          margin: 10px 0 12px;
          font-family: Georgia, serif;
          font-size: clamp(38px, 7vw, 62px);
          line-height: 1.03;
          font-weight: 500;
          letter-spacing: -2px;
        }

        .mauksh-nr-hero p {
          max-width: 620px;
          margin: auto;
          color: #766e63;
          font-size: 15px;
          line-height: 1.7;
        }

        .mauksh-nr-form {
          max-width: 580px;
          margin: auto;
          padding: 30px;
          background: #fff;
          border: 1px solid #e2d5c0;
          border-radius: 22px;
          box-shadow: 0 15px 50px rgba(75,55,20,.08);
        }

        .mauksh-nr-form h2 {
          margin: 8px 0 5px;
          text-align: center;
          font-family: Georgia, serif;
          font-size: 28px;
          font-weight: 500;
        }

        .mauksh-nr-form-sub {
          margin: 0 0 24px;
          text-align: center;
          color: #81796e;
          font-size: 13px;
        }

        .mauksh-nr-field {
          margin-bottom: 17px;
        }

        .mauksh-nr-field label {
          display: block;
          margin-bottom: 7px;
          color: #71695d;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.4px;
        }

        .mauksh-nr-field input {
          width: 100%;
          height: 52px;
          padding: 0 15px;
          border: 1px solid #d8ccba;
          border-radius: 11px;
          background: #fff;
          color: #29251f;
          font-size: 14px;
          box-sizing: border-box;
        }

        .mauksh-nr-field input:focus {
          outline: none;
          border-color: #b1843d;
          box-shadow: 0 0 0 3px rgba(177,132,61,.1);
        }

        .mauksh-nr-generate {
          width: 100%;
          height: 53px;
          border: 0;
          border-radius: 11px;
          background: #29251f;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: .2s ease;
        }

        .mauksh-nr-generate:hover {
          background: #a87520;
        }

        .mauksh-nr-note {
          margin-top: 10px;
          text-align: center;
          color: #999084;
          font-size: 10px;
        }

        .mauksh-nr-report {
          margin: 38px auto 0;
        }

        .mauksh-nr-report-header {
          padding: 32px;
          background: #fff;
          border: 1px solid #ded3c2;
          border-radius: 20px;
          box-shadow: 0 10px 35px rgba(70,50,20,.06);
        }

        .mauksh-nr-report-header h2 {
          margin: 9px 0 4px;
          font-family: Georgia, serif;
          font-size: 40px;
          font-weight: 500;
        }

        .mauksh-nr-report-header p {
          margin: 0;
          color: #81796e;
          font-size: 13px;
        }

        .mauksh-nr-summary {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 12px;
          margin: 14px 0;
        }

        .mauksh-nr-summary-card {
          background: #fff;
          border: 1px solid #ded3c2;
          border-radius: 15px;
          padding: 22px 15px;
          text-align: center;
          box-shadow: 0 7px 25px rgba(70,50,20,.05);
        }

        .mauksh-nr-summary-card strong {
          display: block;
          color: #a87520;
          font-size: 42px;
          line-height: 1;
          margin-bottom: 9px;
        }

        .mauksh-nr-summary-card span {
          color: #3d3831;
          font-size: 14px;
          font-weight: 600;
        }

        .mauksh-nr-summary-card small {
          display: block;
          margin-top: 4px;
          color: #958c80;
          font-size: 10px;
        }

        .mauksh-nr-info-grid {
          display: grid;
          grid-template-columns: repeat(2,1fr);
          gap: 12px;
          margin-bottom: 14px;
        }

        .mauksh-nr-info-card {
          padding: 19px;
          background: #fff;
          border: 1px solid #ded3c2;
          border-radius: 14px;
        }

        .mauksh-nr-info-card label {
          display: block;
          color: #777065;
          font-size: 11px;
          margin-bottom: 9px;
        }

        .mauksh-nr-info-card strong {
          display: block;
          color: #9c6818;
          font-size: 18px;
          line-height: 1.35;
        }

        .mauksh-nr-section {
          margin: 14px 0;
          background: #fff;
          border: 1px solid #ded3c2;
          border-radius: 18px;
          overflow: hidden;
        }

        .mauksh-nr-section-top {
          padding: 30px 20px 24px;
          background: linear-gradient(135deg,#fff0dc,#ffe1c2);
          text-align: center;
        }

        .mauksh-nr-big-number {
          width: 105px;
          height: 105px;
          margin: 0 auto 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #f5a900;
          color: #fff;
          font-size: 60px;
          font-weight: 700;
        }

        .mauksh-nr-section-top h3 {
          margin: 0;
          font-family: Georgia, serif;
          font-size: 28px;
          font-weight: 500;
        }

        .mauksh-nr-section-body {
          padding: 27px 25px;
        }

        .mauksh-nr-section-body p {
          margin: 0 0 16px;
          color: #504a42;
          font-size: 14px;
          line-height: 1.85;
        }

        .mauksh-nr-section-body p:last-child {
          margin-bottom: 0;
        }

        .mauksh-nr-subgrid {
          display: grid;
          grid-template-columns: repeat(2,1fr);
          gap: 12px;
          margin-top: 20px;
        }

        .mauksh-nr-subcard {
          padding: 18px;
          background: #fcf7ef;
          border-radius: 13px;
        }

        .mauksh-nr-subcard strong {
          display: block;
          margin-bottom: 7px;
          color: #9b6b20;
          font-size: 12px;
        }

        .mauksh-nr-subcard p {
          margin: 0;
          font-size: 13px;
          line-height: 1.65;
        }

        .mauksh-nr-grid {
          width: min(390px,100%);
          margin: 22px auto;
          display: grid;
          grid-template-columns: repeat(3,1fr);
          border: 2px solid #cbbda7;
        }

        .mauksh-nr-grid-cell {
          min-height: 112px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fffaf1;
          border: 1px solid #ddd1bf;
        }

        .mauksh-nr-grid-position {
          position: absolute;
          top: 9px;
          left: 11px;
          color: #b1843d;
          font-size: 11px;
          font-weight: 800;
        }

        .mauksh-nr-grid-digits {
          color: #24211d;
          font-size: 25px;
          font-weight: 700;
          letter-spacing: 5px;
        }

        .mauksh-nr-grid-empty {
          color: #cfc5b7;
          font-size: 22px;
        }

        .mauksh-nr-number-list {
          display: grid;
          gap: 10px;
          margin-top: 18px;
        }

        .mauksh-nr-number-item {
          padding: 18px;
          background: #fcf7ef;
          border-left: 3px solid #b1843d;
          border-radius: 10px;
        }

        .mauksh-nr-number-item strong {
          display: block;
          color: #94631a;
          margin-bottom: 6px;
          font-size: 14px;
        }

        .mauksh-nr-number-item p {
          margin: 0;
          font-size: 13px;
          line-height: 1.7;
        }

        .mauksh-nr-truth {
          margin: 14px 0;
          padding: 28px;
          background: #29251f;
          border-radius: 18px;
          color: #fff;
        }

        .mauksh-nr-truth h3 {
          margin: 8px 0;
          font-family: Georgia, serif;
          font-size: 25px;
          font-weight: 500;
        }

        .mauksh-nr-truth p {
          margin: 0;
          color: #d9d1c5;
          font-size: 13px;
          line-height: 1.75;
        }

        .mauksh-nr-footer {
          display: flex;
          justify-content: space-between;
          padding: 25px 5px;
          color: #938a7e;
          font-size: 11px;
        }

        .mauksh-nr-footer strong {
          color: #a87520;
        }

        @media(max-width:650px) {
          .mauksh-nr-page {
            padding: 35px 10px 70px;
          }

          .mauksh-nr-form {
            padding: 24px 18px;
          }

          .mauksh-nr-summary {
            grid-template-columns: 1fr;
          }

          .mauksh-nr-info-grid,
          .mauksh-nr-subgrid {
            grid-template-columns: 1fr;
          }

          .mauksh-nr-report-header {
            padding: 25px 19px;
          }

          .mauksh-nr-report-header h2 {
            font-size: 32px;
          }

          .mauksh-nr-section-body {
            padding: 23px 18px;
          }

          .mauksh-nr-grid-cell {
            min-height: 90px;
          }

          .mauksh-nr-grid-digits {
            font-size: 20px;
          }

          .mauksh-nr-footer {
            flex-direction: column;
            gap: 7px;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}

function ReportContent({
  report,
  currentYear,
}: {
  report: Report;
  currentYear: number;
}) {
  const R = M[report.mulank];
  const D = M[report.bhagyank];
  const N = M[report.nameNumber];
  const PY = M[report.personalYear];

  return (
    <>
      <div className="mauksh-nr-report-header">
        <div className="mauksh-nr-eyebrow">
          PERSONALIZED NUMEROLOGY REPORT
        </div>

        <h2>{report.name}</h2>

        <p>
          {formatDate(report.dob)}
          {" · Born on "}
          {report.weekday}
        </p>
      </div>

      <div className="mauksh-nr-summary">
        <SummaryCard
          number={report.mulank}
          title="Radical / Mulank"
          subtitle="Birth Number"
        />

        <SummaryCard
          number={report.bhagyank}
          title="Destiny / Bhagyank"
          subtitle="Life Number"
        />

        <SummaryCard
          number={report.nameNumber}
          title="Name Number"
          subtitle="Chaldean Vibration"
        />
      </div>

      <div className="mauksh-nr-info-grid">
        <InfoCard
          label="FAVOURABLE NUMBER"
          value={R.dates}
        />

        <InfoCard
          label="FAVOURABLE DAYS"
          value={R.days}
        />

        <InfoCard
          label="FAVOURABLE COLOUR"
          value={R.colour}
        />

        <InfoCard
          label="FAVOURABLE ALPHABETS"
          value={R.letters}
        />

        <InfoCard
          label="RULING PLANET"
          value={R.planet}
        />

        <InfoCard
          label="DIRECTION"
          value={R.direction}
        />

        <InfoCard
          label="DEITY / SPIRITUAL ASSOCIATION"
          value={R.deity}
        />

        <InfoCard
          label="FAVOURABLE DATES"
          value={R.dates}
        />
      </div>

      <NumberSection
        number={report.mulank}
        title="Radical Number"
      >
        <p>
          {report.name}, your Radical Number is{" "}
          {report.mulank}. {R.meaning}
        </p>

        <p>
          The Radical Number is calculated from
          the date of the month on which you were
          born. It is traditionally used to
          understand core personality tendencies,
          individual behaviour and the way you
          naturally respond to situations.
        </p>

        <SubGrid>
          <SubCard
            title="PERSONALITY"
            text={R.personality}
          />

          <SubCard
            title="STRENGTHS"
            text={R.strength}
          />

          <SubCard
            title="CHALLENGES"
            text={R.challenge}
          />

          <SubCard
            title="WORK STYLE"
            text={R.work}
          />
        </SubGrid>
      </NumberSection>

      <NumberSection
        number={report.bhagyank}
        title="Destiny Number"
      >
        <p>
          Your Destiny Number is{" "}
          {report.bhagyank}. It is calculated from
          the complete date of birth, including the
          century.
        </p>

        <p>
          {D.meaning} Your destiny vibration
          describes broader life themes and the
          direction in which your abilities may be
          expressed.
        </p>

        <SubGrid>
          <SubCard
            title="LIFE DIRECTION"
            text={D.year}
          />

          <SubCard
            title="CAREER EXPRESSION"
            text={D.career}
          />
        </SubGrid>
      </NumberSection>

      <NumberSection
        number={report.nameNumber}
        title="Name Number"
      >
        <p>
          {report.name}, your Chaldean Name Number
          is {report.nameNumber}. The compound
          value of your name is{" "}
          {report.nameCompound}.
        </p>

        <p>
          In Chaldean numerology, the Name Number
          is traditionally used to interpret the
          vibration associated with the letters of
          the full name.
        </p>

        <SubGrid>
          <SubCard
            title="NAME VIBRATION"
            text={N.meaning}
          />

          <SubCard
            title="EXPRESSION"
            text={N.personality}
          />
        </SubGrid>
      </NumberSection>

      {/* GRID */}

      <AnalysisSection
        eyebrow="MAUKSH VEDIC NUMEROLOGY"
        title="Your Numerology Grid"
      >
        <p>
          The Mauksh grid follows the Vedic
          arrangement:{" "}
          <strong>
            3 · 1 · 9 / 6 · 7 · 5 / 2 · 8 · 4
          </strong>
          . The century digits of the birth year
          are excluded. Radical and Destiny
          numbers are also included in the grid.
          Zero is ignored.
        </p>

        <div className="mauksh-nr-grid">
          {[3, 1, 9, 6, 7, 5, 2, 8, 4].map(
            (number) => (
              <div
                key={number}
                className="mauksh-nr-grid-cell"
              >
                <span className="mauksh-nr-grid-position">
                  {number}
                </span>

                {report.grid[number] > 0 ? (
                  <span className="mauksh-nr-grid-digits">
                    {String(number).repeat(
                      report.grid[number]
                    )}
                  </span>
                ) : (
                  <span className="mauksh-nr-grid-digits mauksh-nr-grid-empty">
                    —
                  </span>
                )}
              </div>
            )
          )}
        </div>

        <SubGrid>
          <SubCard
            title="PRESENT NUMBERS"
            text={
              report.present.length
                ? report.present.join(", ")
                : "None"
            }
          />

          <SubCard
            title="MISSING NUMBERS"
            text={
              report.missing.length
                ? report.missing.join(", ")
                : "None"
            }
          />
        </SubGrid>
      </AnalysisSection>

      {/* PRESENT NUMBERS */}

      <AnalysisSection
        eyebrow="NUMBER ANALYSIS"
        title="Numbers Present in Your Grid"
      >
        <p>
          Every number appearing in the birth-date
          grid is traditionally associated with a
          particular psychological or behavioural
          quality. Repetition can make that theme
          more prominent.
        </p>

        <div className="mauksh-nr-number-list">
          {report.present.map((number) => (
            <NumberItem
              key={number}
              title={`${number} · ${M[number].title}`}
              text={`${M[number].meaning}${
                report.grid[number] > 1
                  ? ` This number occurs ${report.grid[number]} times, making its theme more prominent.`
                  : ""
              }`}
            />
          ))}
        </div>
      </AnalysisSection>

      {/* MISSING */}

      <AnalysisSection
        eyebrow="DEVELOPMENT AREAS"
        title="Missing Numbers"
      >
        <p>
          Missing numbers are traditionally
          interpreted as qualities that may benefit
          from conscious development. They are not
          predictions of failure or deficiency.
        </p>

        <div className="mauksh-nr-number-list">
          {report.missing.length ? (
            report.missing.map((number) => (
              <NumberItem
                key={number}
                title={`Missing ${number} · ${M[number].title}`}
                text={`${M[number].meaning} Its absence in the birth-date grid is traditionally treated as an area where the associated quality may benefit from conscious development.`}
              />
            ))
          ) : (
            <NumberItem
              title="All nine numbers are represented"
              text="Every number from 1 to 9 appears in your birth-date grid. Traditionally this indicates broad numerical representation across the nine core qualities."
            />
          )}
        </div>
      </AnalysisSection>

      {/* REPEATED */}

      <AnalysisSection
        eyebrow="STRONG THEMES"
        title="Repeated Numbers"
      >
        <p>
          {report.repeated.length
            ? "The following numbers appear more than once. In traditional numerology, repetition is generally interpreted as increasing the prominence of that numerical quality."
            : "No number occurs more than once in the birth-date grid."}
        </p>

        {report.repeated.length > 0 && (
          <div className="mauksh-nr-number-list">
            {report.repeated.map((number) => (
              <NumberItem
                key={number}
                title={`${number} · Appears ${report.grid[number]} times`}
                text={`${M[number].meaning} The repeated presence of ${number} can make these qualities more noticeable in behaviour and life patterns.`}
              />
            ))}
          </div>
        )}
      </AnalysisSection>

      {/* CAREER */}

      <AnalysisSection
        eyebrow="PROFESSIONAL LIFE"
        title="Career"
      >
        <p>{R.career}</p>

        <p>
          Your professional expression can also be
          viewed through the combination of your
          Radical Number {report.mulank}, Destiny
          Number {report.bhagyank} and Name Number{" "}
          {report.nameNumber}. The strongest results
          generally come when your natural strengths
          are supported by practical skills,
          consistency and real-world experience.
        </p>
      </AnalysisSection>

      {/* BUSINESS */}

      <AnalysisSection
        eyebrow="ENTREPRENEURSHIP"
        title="Business"
      >
        <p>{R.business}</p>
      </AnalysisSection>

      {/* MONEY */}

      <AnalysisSection
        eyebrow="FINANCIAL LIFE"
        title="Money"
      >
        <p>{R.money}</p>
        <p>{R.moneyAdvice}</p>
      </AnalysisSection>

      {/* RELATIONSHIPS */}

      <AnalysisSection
        eyebrow="PERSONAL LIFE"
        title="Love & Relationships"
      >
        <p>{R.relationship}</p>
        <p>{R.relationshipAdvice}</p>
      </AnalysisSection>

      {/* HEALTH */}

      <AnalysisSection
        eyebrow="WELLNESS"
        title="Health & Lifestyle"
      >
        <p>{R.health}</p>

        <p>
          This section represents traditional
          numerological interpretations only. It
          is not a medical diagnosis, prediction
          or substitute for professional medical
          advice.
        </p>
      </AnalysisSection>

      {/* FAVOURABLE */}

      <AnalysisSection
        eyebrow="SUPPORTIVE SYMBOLISM"
        title="Favourable Details"
      >
        <p>
          These associations are traditional
          numerological correspondences and can be
          used as personal symbolism rather than
          guarantees.
        </p>

        <SubGrid>
          <SubCard
            title="NUMBERS"
            text={R.dates}
          />

          <SubCard
            title="DATES"
            text={R.dates}
          />

          <SubCard
            title="DAYS"
            text={R.days}
          />

          <SubCard
            title="COLOURS"
            text={R.colour}
          />

          <SubCard
            title="ALPHABETS"
            text={R.letters}
          />

          <SubCard
            title="DIRECTION"
            text={R.direction}
          />
        </SubGrid>
      </AnalysisSection>

      {/* DEITY */}

      <AnalysisSection
        eyebrow="SPIRITUAL ASSOCIATION"
        title="Deity & Mantra"
      >
        <p>
          <strong>Associated Deity:</strong>{" "}
          {R.deity}
        </p>

        <p>
          <strong>Traditional Mantra:</strong>{" "}
          {R.mantra}
        </p>
      </AnalysisSection>

      {/* REMEDIES */}

      <AnalysisSection
        eyebrow="TRADITIONAL PRACTICES"
        title="Traditional Remedies"
      >
        <p>
          The following are traditional spiritual
          practices associated with the person's
          primary number. They should be treated as
          personal spiritual practices and not
          guaranteed solutions.
        </p>

        <div className="mauksh-nr-number-list">
          {R.remedies.map((remedy, index) => (
            <NumberItem
              key={index}
              title={`Practice ${index + 1}`}
              text={remedy}
            />
          ))}
        </div>
      </AnalysisSection>

      {/* PERSONAL YEAR */}

      <NumberSection
        number={report.personalYear}
        title="Current Personal Year"
      >
        <p>
          Your Personal Year for {currentYear} is{" "}
          {report.personalYear}. {PY.year}
        </p>

        <p>{PY.yearFocus}</p>
      </NumberSection>

      {/* TRUTH */}

      <div className="mauksh-nr-truth">
        <div className="mauksh-nr-eyebrow">
          MAUKSH TRUTH
        </div>

        <h3>
          Your numbers describe tendencies, not a
          fixed destiny.
        </h3>

        <p>
          Numerology can be used as a framework for
          reflection, self-awareness and personal
          exploration. Your choices, circumstances,
          habits and actions remain important parts
          of your life. This report should not be
          interpreted as a guarantee of future events
          or outcomes.
        </p>
      </div>

      <footer className="mauksh-nr-footer">
        <strong>MAUKSH</strong>

        <span>
          Spirituality is Personal
        </span>
      </footer>
    </>
  );
}