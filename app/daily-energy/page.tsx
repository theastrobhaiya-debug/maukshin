"use client";

import { useState } from "react";

export default function DailyEnergyPage() {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<{
    percent: number;
    tag: string;
    truth: string;
    energyScore: number;
  } | null>(null);

  const calculateEnergy = () => {
    if (!dob) {
      alert("Please enter your date of birth.");
      return;
    }

    const date = new Date(`${dob}T00:00:00`);
    const day = date.getDate();

    // MULANK CALCULATION
    let mulank = day;

    while (mulank > 9) {
      mulank = mulank
        .toString()
        .split("")
        .reduce((a, b) => a + parseInt(b), 0);
    }

    // TODAY ENERGY
    const today = new Date();

    let todayNum =
      today.getDate() +
      (today.getMonth() + 1) +
      today.getFullYear();

    while (todayNum > 9) {
      todayNum = todayNum
        .toString()
        .split("")
        .reduce((a, b) => a + parseInt(b), 0);
    }

    // FINAL ENERGY SCORE
    let energyScore = mulank + todayNum;

    while (energyScore > 9) {
      energyScore = energyScore
        .toString()
        .split("")
        .reduce((a, b) => a + parseInt(b), 0);
    }

    // CONVERT TO %
    const percent = Math.round((energyScore / 9) * 100);

    // TAG LOGIC
    let tag = "";

    if (percent <= 33) {
      tag = "Low Energy Day";
    } else if (percent <= 66) {
      tag = "Balanced Energy";
    } else {
      tag = "High Power Day";
    }

    // MAUKSH TRUTH
    const truths: Record<number, string> = {
      1: "Today calls for leadership. Take initiative and trust your decisions.",
      2: "Slow down and avoid overthinking. Let things unfold naturally.",
      3: "Your creative energy is strong today. Express yourself and use it.",
      4: "Discipline is your power today. Stay organised and focus on what matters.",
      5: "Change is part of today's energy. Stay flexible instead of resisting it.",
      6: "Relationships and emotional connections deserve your attention today.",
      7: "A day for reflection, intuition and inner work. Give yourself some quiet time.",
      8: "Money, responsibility and karmic lessons may become more prominent today.",
      9: "Release what no longer serves you and create space for something new."
    };

    setResult({
      percent,
      tag,
      truth: truths[energyScore],
      energyScore
    });
  };

  return (
    <main className="energy-page">
      <section className="energy-container">

        <div className="energy-header">
          <div className="icon">✦</div>

          <p className="eyebrow">MAUKSH NUMEROLOGY</p>

          <h1>Daily Energy Check</h1>

          <p className="subtitle">
            Discover what today's energy has in store for you.
          </p>
        </div>

        <div className="input-section">

          <label htmlFor="dob">
            Date of Birth
          </label>

          <input
            id="dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          <button onClick={calculateEnergy}>
            Check My Energy
            <span>→</span>
          </button>

        </div>

        {result && (
          <div className="result-card">

            <div className="result-label">
              YOUR DAILY ENERGY
            </div>

            <div className="energy-score">
              {result.percent}%
            </div>

            <div className="progress-wrapper">
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${result.percent}%` }}
                />
              </div>

              <div className="progress-labels">
                <span>Low</span>
                <span>Balanced</span>
                <span>High</span>
              </div>
            </div>

            <div className="tag">
              {result.tag}
            </div>

            <div className="truth-card">
              <div className="truth-icon">✦</div>

              <div>
                <div className="truth-title">
                  Today's Insight
                </div>

                <p>
                  {result.truth}
                </p>
              </div>
            </div>

            <div className="product-card">

              <div className="product-icon">
                ✨
              </div>

              <div className="product-content">
                <strong>
                  Want to support your energy?
                </strong>

                <p>
                  Explore Mauksh Healing Tools designed
                  to help you work with your energy.
                </p>

                <a href="/collections/all">
                  Explore Healing Tools →
                </a>
              </div>

            </div>

          </div>
        )}

      </section>

      <section className="information-section">

        <div className="info-inner">

          <p className="info-eyebrow">
            UNDERSTAND YOUR DAY
          </p>

          <h2>
            What is the Daily Energy Check?
          </h2>

          <p>
            Your daily energy can influence the way you approach
            work, relationships, decisions and personal growth.
            The Mauksh Daily Energy Check uses numerology to give
            you a simple view of the overall energy surrounding
            your day.
          </p>

          <p>
            Based on your date of birth and the energy of the
            current day, the tool creates a simple energy score
            and provides practical guidance for how you can
            work with that energy.
          </p>

          <div className="info-grid">

            <div className="info-box">
              <span>01</span>
              <h3>Understand</h3>
              <p>
                Get a quick perspective on the energy of your day.
              </p>
            </div>

            <div className="info-box">
              <span>02</span>
              <h3>Align</h3>
              <p>
                Understand whether the day supports action,
                planning, communication or reflection.
              </p>
            </div>

            <div className="info-box">
              <span>03</span>
              <h3>Act Smarter</h3>
              <p>
                Use the insight as a simple guide for navigating
                your day with greater awareness.
              </p>
            </div>

          </div>

          <p className="closing-text">
            Check your energy each day and stay aware,
            balanced and aligned with the changing rhythms
            around you.
          </p>

        </div>

      </section>

      <style jsx>{`

        * {
          box-sizing: border-box;
        }

        .energy-page {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at top,
              rgba(255, 215, 120, 0.25),
              transparent 35%
            ),
            #fffdf8;
          color: #29251e;
          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
          padding-bottom: 80px;
        }

        .energy-container {
          width: min(680px, calc(100% - 32px));
          margin: 0 auto;
          padding: 60px 0 20px;
        }

        .energy-header {
          text-align: center;
          margin-bottom: 36px;
        }

        .icon {
          width: 46px;
          height: 46px;
          margin: 0 auto 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            #f6c453,
            #e7a927
          );
          color: white;
          font-size: 21px;
          box-shadow:
            0 8px 25px rgba(210, 158, 40, 0.25);
        }

        .eyebrow,
        .info-eyebrow {
          margin: 0 0 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #a47720;
        }

        h1 {
          margin: 0;
          font-size: clamp(32px, 7vw, 48px);
          line-height: 1.05;
          letter-spacing: -1.5px;
          font-weight: 750;
        }

        .subtitle {
          margin: 14px auto 0;
          max-width: 460px;
          font-size: 15px;
          line-height: 1.6;
          color: #777066;
        }

        .input-section {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid #eadfca;
          border-radius: 24px;
          padding: 25px;
          box-shadow:
            0 15px 45px rgba(70, 54, 20, 0.07);
        }

        label {
          display: block;
          margin-bottom: 9px;
          font-size: 13px;
          font-weight: 650;
          color: #4b453b;
        }

        input {
          width: 100%;
          height: 52px;
          padding: 0 15px;
          border: 1px solid #ddd2bd;
          border-radius: 13px;
          background: #fff;
          color: #302c25;
          font-size: 15px;
          font-family: inherit;
          outline: none;
          transition: 0.2s ease;
          appearance: auto;
        }

        input:focus {
          border-color: #d5a62e;
          box-shadow:
            0 0 0 3px rgba(213, 166, 46, 0.12);
        }

        button {
          width: 100%;
          height: 52px;
          margin-top: 13px;
          border: none;
          border-radius: 13px;
          background:
            linear-gradient(
              135deg,
              #eab83f,
              #c99118
            );
          color: white;
          font-size: 15px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          box-shadow:
            0 9px 22px rgba(180, 130, 25, 0.2);
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        button:hover {
          transform: translateY(-1px);
          box-shadow:
            0 12px 28px rgba(180, 130, 25, 0.27);
        }

        button span {
          margin-left: 8px;
          font-size: 17px;
        }

        .result-card {
          margin-top: 20px;
          padding: 30px;
          border-radius: 24px;
          background: #fff;
          border: 1px solid #eadfca;
          box-shadow:
            0 15px 45px rgba(70, 54, 20, 0.08);
          animation: fadeIn 0.45s ease;
        }

        .result-label {
          text-align: center;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 2px;
          color: #a47720;
        }

        .energy-score {
          text-align: center;
          margin-top: 5px;
          font-size: 54px;
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: -2px;
          color: #a87513;
        }

        .progress-wrapper {
          margin-top: 18px;
        }

        .progress-track {
          width: 100%;
          height: 10px;
          border-radius: 20px;
          background: #f0e6ce;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 20px;
          background:
            linear-gradient(
              90deg,
              #e8bd50,
              #a96e0d
            );
          transition: width 0.7s ease;
        }

        .progress-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 7px;
          font-size: 10px;
          color: #9a9184;
        }

        .tag {
          width: fit-content;
          margin: 19px auto 0;
          padding: 7px 14px;
          border-radius: 50px;
          background: #fff5d8;
          color: #966811;
          font-size: 12px;
          font-weight: 700;
        }

        .truth-card {
          display: flex;
          gap: 13px;
          margin-top: 22px;
          padding: 18px;
          border-radius: 16px;
          background: #fff9eb;
          border: 1px solid #f1e3bf;
        }

        .truth-icon {
          flex-shrink: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #f3c34f;
          color: white;
          font-size: 13px;
        }

        .truth-title {
          margin-bottom: 4px;
          font-size: 12px;
          font-weight: 750;
          color: #8c6418;
          text-transform: uppercase;
          letter-spacing: 0.7px;
        }

        .truth-card p {
          margin: 0;
          font-size: 14px;
          line-height: 1.55;
          color: #625a4d;
        }

        .product-card {
          display: flex;
          gap: 15px;
          margin-top: 14px;
          padding: 18px;
          border-radius: 16px;
          background: #fdf8ed;
          border: 1px solid #eee0c1;
        }

        .product-icon {
          flex-shrink: 0;
          font-size: 24px;
        }

        .product-content strong {
          display: block;
          font-size: 14px;
          color: #403a30;
        }

        .product-content p {
          margin: 5px 0 9px;
          font-size: 12px;
          line-height: 1.5;
          color: #777064;
        }

        .product-content a {
          color: #a36f12;
          font-size: 12px;
          font-weight: 750;
          text-decoration: none;
        }

        .product-content a:hover {
          text-decoration: underline;
        }

        .information-section {
          margin-top: 55px;
          border-top: 1px solid #eee5d5;
          padding-top: 55px;
        }

        .info-inner {
          width: min(900px, calc(100% - 32px));
          margin: 0 auto;
          text-align: center;
        }

        .info-inner h2 {
          margin: 0 auto 17px;
          font-size: clamp(25px, 5vw, 34px);
          letter-spacing: -0.7px;
        }

        .info-inner > p:not(.info-eyebrow):not(.closing-text) {
          max-width: 680px;
          margin: 0 auto 14px;
          color: #71695d;
          font-size: 14px;
          line-height: 1.75;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 35px;
          text-align: left;
        }

        .info-box {
          padding: 21px;
          border-radius: 17px;
          background: white;
          border: 1px solid #ebe2d1;
        }

        .info-box span {
          font-size: 10px;
          font-weight: 750;
          color: #b18425;
          letter-spacing: 1px;
        }

        .info-box h3 {
          margin: 10px 0 6px;
          font-size: 16px;
        }

        .info-box p {
          margin: 0;
          font-size: 12px;
          line-height: 1.6;
          color: #777064;
        }

        .closing-text {
          margin: 30px auto 0;
          max-width: 600px;
          font-size: 13px;
          line-height: 1.7;
          color: #8b806e;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 650px) {

          .energy-container {
            padding-top: 38px;
          }

          .input-section,
          .result-card {
            padding: 21px;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }

          .product-card {
            align-items: flex-start;
          }

        }

      `}</style>
    </main>
  );
}