"use client";

import { useState } from "react";
import Link from "next/link";

type Step =
  | "profile"
  | "profile-created"
  | "chat"
  | "plans";

type NumerologyProfile = {
  name: string;
  dob: string;
  mulank: number;
  bhagyank: number;
  nameNumber: number;
};

export default function NumerologyAIPage() {
  const [step, setStep] = useState<Step>("profile");

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  const [profile, setProfile] =
    useState<NumerologyProfile | null>(null);

  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(false);

  /*
   * TEMPORARY FRONTEND CALCULATION
   *
   * Replace this with your existing Mauksh numerology
   * calculation logic when connecting the real backend.
   */

  function reduceNumber(value: number): number {
    while (value > 9) {
      value = String(value)
        .split("")
        .reduce((sum, digit) => sum + Number(digit), 0);
    }

    return value;
  }

  function calculateMulank(date: string) {
    const day = Number(date.split("-")[2]);

    if (!day) return 0;

    return reduceNumber(day);
  }

  function calculateBhagyank(date: string) {
    const digits = date
      .replaceAll("-", "")
      .split("")
      .map(Number);

    const total = digits.reduce(
      (sum, digit) => sum + digit,
      0
    );

    return reduceNumber(total);
  }

  function calculateNameNumber(value: string) {
    /*
     * Temporary visual calculation.
     *
     * IMPORTANT:
     * Replace with your existing Mauksh name-number
     * calculation before production.
     */

    const letters = value
      .toUpperCase()
      .replace(/[^A-Z]/g, "");

    if (!letters) return 0;

    const total = letters
      .split("")
      .reduce(
        (sum, letter) =>
          sum + (letter.charCodeAt(0) - 64),
        0
      );

    return reduceNumber(total);
  }

  function createProfile() {
    if (!name.trim() || !dob) return;

    const newProfile: NumerologyProfile = {
      name: name.trim(),
      dob,
      mulank: calculateMulank(dob),
      bhagyank: calculateBhagyank(dob),
      nameNumber: calculateNameNumber(name),
    };

    setProfile(newProfile);

    setStep("profile-created");
  }

  function continueToAI() {
    setStep("chat");
  }

  async function askQuestion() {
    if (!question.trim()) return;

    setLoading(true);

    /*
     * TEMPORARY DEMO RESPONSE.
     *
     * Later this will call:
     *
     * POST /api/numerology-ai
     *
     * The backend will:
     * 1. Verify logged-in user
     * 2. Load their Supabase profile
     * 3. Check AI usage
     * 4. Send numerology profile + question to OpenAI
     * 5. Save conversation
     * 6. Increment usage
     */

    await new Promise((resolve) =>
      setTimeout(resolve, 1400)
    );

    setAnswer(
      `Based on your numerology profile, your Mulank is ${profile?.mulank} and your Bhagyank is ${profile?.bhagyank}. This combination suggests that you should approach important decisions with patience while staying open to new opportunities. Your personal numbers can be used as a framework for understanding your strengths, timing and patterns.`
    );

    setLoading(false);

    /*
     * For the first version we immediately consider
     * the free question consumed after the answer.
     */

    setTimeout(() => {
      setStep("plans");
    }, 2500);
  }

  return (
    <main className="page">

      {/* HEADER */}

      <header className="header">

        <Link href="/" className="logo">
          <span className="logo-mark">
            M
          </span>

          <span>
            MAUKSH
            <small>AI</small>
          </span>
        </Link>

        <div className="header-status">
          <span />
          Numerology AI
        </div>

      </header>


      {/* =========================
          PROFILE
      ========================= */}

      {step === "profile" && (

        <section className="center-section">

          <div className="eyebrow">
            STEP 01 · YOUR PROFILE
          </div>

          <h1>
            Let's discover
            <br />
            <em>your numbers.</em>
          </h1>

          <p className="intro">
            Enter your name and date of birth.
            We'll create your personal numerology profile
            before you ask Mauksh AI your first question.
          </p>


          <div className="form-card">

            <label>
              Full Name

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            </label>


            <label>
              Date of Birth

              <input
                type="date"
                value={dob}
                onChange={(e) =>
                  setDob(e.target.value)
                }
              />

            </label>


            <button
              onClick={createProfile}
              disabled={!name.trim() || !dob}
              className="primary-button"
            >
              Create My Profile
              <span>→</span>
            </button>


            <small className="form-note">
              Your profile will be saved to your Mauksh
              account.
            </small>

          </div>

        </section>

      )}


      {/* =========================
          PROFILE CREATED
      ========================= */}

      {step === "profile-created" && profile && (

        <section className="profile-section">

          <div className="eyebrow">
            YOUR NUMEROLOGY PROFILE
          </div>

          <h1>
            Welcome,
            <br />
            <em>{profile.name}.</em>
          </h1>

          <p className="intro">
            Your personal numerology profile is ready.
          </p>


          <div className="numbers-card">

            <div className="number">

              <small>
                MULANK
              </small>

              <strong>
                {profile.mulank}
              </strong>

              <span>
                Your core nature
              </span>

            </div>


            <div className="number active">

              <small>
                BHAGYANK
              </small>

              <strong>
                {profile.bhagyank}
              </strong>

              <span>
                Your life path
              </span>

            </div>


            <div className="number">

              <small>
                NAME NUMBER
              </small>

              <strong>
                {profile.nameNumber}
              </strong>

              <span>
                Your expression
              </span>

            </div>

          </div>


          <div className="grid-preview">

            <div className="grid-title">
              YOUR VEDIC NUMEROLOGY GRID
            </div>

            <div className="vedic-grid">

              {[3, 1, 9, 6, 7, 5, 2, 8, 4].map(
                (number) => (

                  <div
                    key={number}
                    className={
                      number === profile.mulank ||
                      number === profile.bhagyank
                        ? "grid-number highlighted"
                        : "grid-number"
                    }
                  >
                    {number}
                  </div>

                )
              )}

            </div>

          </div>


          <div className="free-question">

            <div className="free-icon">
              ✦
            </div>

            <div>

              <strong>
                Your first AI question is free
              </strong>

              <p>
                Ask Mauksh AI anything about your
                career, relationships, money or life.
              </p>

            </div>

          </div>


          <button
            onClick={continueToAI}
            className="primary-button"
          >
            Ask Mauksh AI
            <span>→</span>
          </button>

        </section>

      )}


      {/* =========================
          CHAT
      ========================= */}

      {step === "chat" && profile && (

        <section className="chat-section">

          <div className="chat-heading">

            <div>

              <div className="eyebrow">
                STEP 03 · ASK MAUKSH AI
              </div>

              <h1>
                What would you
                <br />
                like to <em>know?</em>
              </h1>

            </div>


            <div className="profile-mini">

              <div>
                {profile.name
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <span>
                {profile.mulank} · {profile.bhagyank}
              </span>

            </div>

          </div>


          <div className="chat-card">

            <div className="chat-top">

              <div className="ai-avatar">
                M
              </div>

              <div>

                <strong>
                  Mauksh AI
                </strong>

                <small>
                  Personal Numerology Companion
                </small>

              </div>

              <span className="online">
                ●
              </span>

            </div>


            <div className="chat-content">

              {answer ? (

                <>

                  <div className="user-bubble">
                    {question}
                  </div>


                  <div className="ai-answer">

                    <div className="answer-label">
                      MAUKSH AI
                    </div>

                    <p>
                      {answer}
                    </p>

                  </div>

                </>

              ) : (

                <div className="suggestions">

                  <span>
                    Try asking:
                  </span>

                  <button
                    onClick={() =>
                      setQuestion(
                        "Should I change my job this year?"
                      )
                    }
                  >
                    Should I change my job this year?
                  </button>

                  <button
                    onClick={() =>
                      setQuestion(
                        "What should I focus on in my career?"
                      )
                    }
                  >
                    What should I focus on in my career?
                  </button>

                  <button
                    onClick={() =>
                      setQuestion(
                        "What does my numerology say about relationships?"
                      )
                    }
                  >
                    What does my numerology say about relationships?
                  </button>

                </div>

              )}

            </div>


            {!answer && (

              <div className="input-area">

                <textarea
                  placeholder="Ask anything about your numbers..."
                  value={question}
                  onChange={(e) =>
                    setQuestion(e.target.value)
                  }
                  rows={3}
                />

                <button
                  onClick={askQuestion}
                  disabled={
                    !question.trim() ||
                    loading
                  }
                  className="send-button"
                >
                  {loading ? "..." : "↑"}
                </button>

              </div>

            )}

          </div>


          <div className="free-indicator">

            <span>
              1 free question
            </span>

            Your first answer is free.

          </div>

        </section>

      )}


      {/* =========================
          PLANS
      ========================= */}

      {step === "plans" && (

        <section className="plans-section">

          <div className="eyebrow">
            YOUR FREE QUESTION IS USED
          </div>

          <h1>
            Keep your
            <br />
            <em>conversation going.</em>
          </h1>

          <p className="intro">
            Your numerology profile is saved.
            Unlock Mauksh AI to continue asking
            personalized questions whenever you need guidance.
          </p>


          <div className="plan-card">

            <div className="plan-top">

              <div>

                <div className="plan-badge">
                  MAUKSH AI
                </div>

                <h2>
                  Personal Numerology AI
                </h2>

              </div>

              <div className="price">

                <strong>
                  ₹99
                </strong>

                <span>
                  / month
                </span>

              </div>

            </div>


            <div className="plan-divider" />


            <div className="benefits">

              <Benefit>
                Personalized AI guidance
              </Benefit>

              <Benefit>
                Your saved numerology profile
              </Benefit>

              <Benefit>
                Career, relationship & life questions
              </Benefit>

              <Benefit>
                Saved conversation history
              </Benefit>

              <Benefit>
                Your profile stays with you
              </Benefit>

            </div>


            <button
              className="subscribe-button"
              onClick={() => {
                /*
                 * NEXT STEP:
                 *
                 * Call your backend:
                 *
                 * POST /api/dodo/create-checkout
                 *
                 * Then redirect to Dodo checkout.
                 */
                alert(
                  "Dodo Payments will be connected here."
                );
              }}
            >
              Continue with Mauksh AI
              <span>→</span>
            </button>


            <div className="cancel-note">
              Cancel anytime · Secure payment
            </div>

          </div>


          <div className="saved-profile-note">

            <span>✓</span>

            <div>

              <strong>
                Your numerology profile is saved.
              </strong>

              <small>
                You won't need to enter your details again.
              </small>

            </div>

          </div>

        </section>

      )}


      <style jsx>{`

        * {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;
          background: #f8f5ef;
          color: #29251f;
        }

        .header {
          height: 70px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 0 28px;

          border-bottom: 1px solid #ded6c9;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 9px;

          color: #29251f;
          text-decoration: none;

          font-size: 13px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .logo-mark {
          width: 31px;
          height: 31px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: #29251f;
          color: #d4aa5d;

          font-family: Georgia, serif;
          font-size: 16px;
        }

        .logo small {
          margin-left: 4px;
          color: #a87935;
          font-size: 8px;
          letter-spacing: 1px;
        }

        .header-status {
          display: flex;
          align-items: center;
          gap: 7px;

          color: #81786d;

          font-size: 10px;
        }

        .header-status span {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #9a9f68;
        }

        .center-section,
        .profile-section,
        .plans-section {
          max-width: 760px;
          margin: auto;
          padding: 85px 25px 100px;
        }

        .eyebrow {
          margin-bottom: 18px;

          color: #a87935;

          font-size: 9px;
          font-weight: 700;

          letter-spacing: 2.3px;
        }

        h1 {
          margin: 0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: clamp(48px, 7vw, 75px);

          line-height: .97;

          font-weight: 500;

          letter-spacing: -3px;
        }

        em {
          color: #a87935;
          font-style: normal;
        }

        .intro {
          max-width: 590px;

          margin: 23px 0 38px;

          color: #756e64;

          font-size: 15px;
          line-height: 1.75;
        }

        .form-card {
          padding: 28px;

          border: 1px solid #ddd4c5;
          border-radius: 18px;

          background: #fffdf9;

          box-shadow:
            0 20px 60px rgba(60,45,25,.06);
        }

        label {
          display: block;

          margin-bottom: 20px;

          color: #5e564d;

          font-size: 11px;
          font-weight: 600;
        }

        input {
          display: block;

          width: 100%;

          height: 52px;

          margin-top: 8px;

          padding: 0 15px;

          border: 1px solid #ded5c8;
          border-radius: 9px;

          background: #fbf9f5;

          color: #29251f;

          font-size: 14px;

          outline: none;
        }

        input:focus {
          border-color: #b08a4b;
          box-shadow: 0 0 0 3px rgba(176,138,75,.08);
        }

        .primary-button {
          width: 100%;
          height: 54px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 0 17px 0 20px;

          border: 0;
          border-radius: 9px;

          background: #29251f;
          color: white;

          font-size: 12px;
          font-weight: 700;

          cursor: pointer;
        }

        .primary-button span {
          width: 35px;
          height: 35px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 7px;

          background: #a87935;

          font-size: 17px;
        }

        .primary-button:disabled {
          opacity: .4;
          cursor: not-allowed;
        }

        .form-note {
          display: block;

          margin-top: 13px;

          color: #91887c;

          text-align: center;

          font-size: 9px;
        }

        /* PROFILE */

        .profile-section {
          max-width: 800px;
        }

        .numbers-card {
          display: grid;
          grid-template-columns: repeat(3,1fr);

          gap: 9px;

          margin-top: 35px;
        }

        .number {
          padding: 22px 10px;

          border: 1px solid #ded6c9;
          border-radius: 13px;

          background: #fffdf9;

          text-align: center;
        }

        .number.active {
          border-color: #c8a76c;
          background: #f7f0e2;
        }

        .number small {
          display: block;

          color: #887f74;

          font-size: 8px;
          font-weight: 700;

          letter-spacing: 1.3px;
        }

        .number strong {
          display: block;

          margin: 9px 0 5px;

          color: #a87935;

          font-family: Georgia, serif;

          font-size: 42px;
          font-weight: 500;
        }

        .number span {
          color: #91887c;
          font-size: 9px;
        }

        .grid-preview {
          margin-top: 18px;

          padding: 22px;

          border-radius: 14px;

          background: #29251f;
          color: white;
        }

        .grid-title {
          color: #cda85f;

          font-size: 8px;
          font-weight: 700;

          letter-spacing: 1.5px;

          text-align: center;
        }

        .vedic-grid {
          width: 180px;

          display: grid;
          grid-template-columns: repeat(3,1fr);

          margin: 18px auto 0;
        }

        .grid-number {
          height: 55px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid #4a443b;

          color: #aaa197;

          font-family: Georgia, serif;
          font-size: 17px;
        }

        .grid-number.highlighted {
          background: #a87935;
          color: white;
        }

        .free-question {
          display: flex;
          align-items: center;

          gap: 14px;

          margin: 18px 0;

          padding: 16px;

          border: 1px solid #dfd4c2;
          border-radius: 12px;

          background: #fffdf9;
        }

        .free-icon {
          width: 40px;
          height: 40px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border-radius: 10px;

          background: #f0e3ca;
          color: #a87935;
        }

        .free-question strong {
          font-family: Georgia, serif;
          font-size: 14px;
          font-weight: 500;
        }

        .free-question p {
          margin: 4px 0 0;

          color: #81786d;

          font-size: 10px;
          line-height: 1.5;
        }

        /* CHAT */

        .chat-section {
          max-width: 900px;

          margin: auto;

          padding: 70px 25px 100px;
        }

        .chat-heading {
          display: flex;

          align-items: flex-end;
          justify-content: space-between;

          margin-bottom: 35px;
        }

        .profile-mini {
          display: flex;
          align-items: center;
          gap: 9px;

          padding: 7px 11px 7px 7px;

          border: 1px solid #ddd3c3;
          border-radius: 100px;

          background: #fffdf9;

          font-size: 10px;
        }

        .profile-mini div {
          width: 30px;
          height: 30px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: #29251f;
          color: #d3aa5d;

          font-family: Georgia, serif;
        }

        .profile-mini span {
          color: #756e64;
        }

        .chat-card {
          overflow: hidden;

          border-radius: 18px;

          background: #29251f;

          box-shadow:
            0 25px 70px rgba(45,35,22,.16);
        }

        .chat-top {
          display: flex;
          align-items: center;
          gap: 11px;

          padding: 17px 20px;

          border-bottom: 1px solid #474139;

          color: white;
        }

        .ai-avatar {
          width: 38px;
          height: 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 10px;

          background: #a87935;

          font-family: Georgia, serif;
        }

        .chat-top strong,
        .chat-top small {
          display: block;
        }

        .chat-top strong {
          font-size: 12px;
        }

        .chat-top small {
          margin-top: 3px;

          color: #928a81;

          font-size: 8px;
        }

        .online {
          margin-left: auto;

          color: #98a56d;

          font-size: 8px;
        }

        .chat-content {
          min-height: 300px;

          padding: 25px;
        }

        .suggestions > span {
          display: block;

          margin-bottom: 13px;

          color: #928a81;

          font-size: 9px;
        }

        .suggestions button {
          display: block;

          width: fit-content;

          margin-bottom: 8px;

          padding: 11px 14px;

          border: 1px solid #4b453d;
          border-radius: 9px;

          background: #332f29;

          color: #d4cec4;

          font-size: 10px;

          cursor: pointer;
        }

        .user-bubble {
          max-width: 70%;

          margin-left: auto;

          padding: 13px 15px;

          border-radius: 11px 11px 3px 11px;

          background: #a87935;

          color: white;

          font-size: 11px;
          line-height: 1.5;
        }

        .ai-answer {
          max-width: 80%;

          margin-top: 13px;

          padding: 16px;

          border-radius: 11px 11px 11px 3px;

          background: #fffdf9;

          color: #29251f;

          font-size: 12px;

          line-height: 1.7;
        }

        .answer-label {
          margin-bottom: 8px;

          color: #a87935;

          font-size: 8px;
          font-weight: 700;

          letter-spacing: 1.3px;
        }

        .ai-answer p {
          margin: 0;
        }

        .input-area {
          display: flex;
          align-items: flex-end;
          gap: 10px;

          margin: 0 17px 17px;

          padding: 10px;

          border: 1px solid #514b42;
          border-radius: 11px;

          background: #332f29;
        }

        textarea {
          flex: 1;

          min-height: 45px;

          padding: 8px;

          resize: none;

          border: 0;
          outline: none;

          background: transparent;

          color: white;

          font-size: 11px;
        }

        textarea::placeholder {
          color: #777067;
        }

        .send-button {
          width: 38px;
          height: 38px;

          border: 0;
          border-radius: 8px;

          background: #a87935;
          color: white;

          cursor: pointer;
        }

        .send-button:disabled {
          opacity: .4;
        }

        .free-indicator {
          margin-top: 14px;

          text-align: center;

          color: #938a80;

          font-size: 9px;
        }

        .free-indicator span {
          margin-right: 6px;

          padding: 4px 7px;

          border-radius: 100px;

          background: #eee4d2;

          color: #88672f;
        }

        /* PLANS */

        .plans-section {
          max-width: 780px;

          text-align: center;
        }

        .plans-section .intro {
          margin-left: auto;
          margin-right: auto;
        }

        .plan-card {
          padding: 28px;

          border: 1px solid #cdb88f;

          border-radius: 20px;

          background: #fffdf9;

          text-align: left;

          box-shadow:
            0 25px 70px rgba(55,40,20,.08);
        }

        .plan-top {
          display: flex;

          justify-content: space-between;
          align-items: flex-start;

          gap: 20px;
        }

        .plan-badge {
          color: #a87935;

          font-size: 8px;
          font-weight: 700;

          letter-spacing: 2px;
        }

        .plan-top h2 {
          margin: 8px 0 0;

          font-family: Georgia, serif;

          font-size: 25px;
          font-weight: 500;
        }

        .price {
          text-align: right;
          white-space: nowrap;
        }

        .price strong {
          font-family: Georgia, serif;

          font-size: 38px;
          font-weight: 500;

          color: #29251f;
        }

        .price span {
          color: #81786d;
          font-size: 10px;
        }

        .plan-divider {
          height: 1px;

          margin: 25px 0;

          background: #e3dace;
        }

        .benefits {
          display: grid;
          grid-template-columns: 1fr 1fr;

          gap: 14px;
        }

        .benefit {
          display: flex;
          gap: 8px;

          color: #5f574e;

          font-size: 11px;
          line-height: 1.5;
        }

        .benefit span {
          color: #a87935;
          font-weight: 700;
        }

        .subscribe-button {
          width: 100%;

          height: 55px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          margin-top: 28px;
          padding: 0 17px 0 20px;

          border: 0;
          border-radius: 9px;

          background: #29251f;
          color: white;

          font-size: 12px;
          font-weight: 700;

          cursor: pointer;
        }

        .subscribe-button span {
          width: 35px;
          height: 35px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 7px;

          background: #a87935;

          font-size: 17px;
        }

        .cancel-note {
          margin-top: 12px;

          color: #91887c;

          text-align: center;

          font-size: 9px;
        }

        .saved-profile-note {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 9px;

          margin-top: 20px;

          color: #756e64;

          font-size: 10px;
        }

        .saved-profile-note > span {
          width: 25px;
          height: 25px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: #e7ecd9;
          color: #71804e;
        }

        .saved-profile-note strong,
        .saved-profile-note small {
          display: block;
        }

        .saved-profile-note small {
          margin-top: 2px;
          color: #968d82;
        }

        @media (max-width: 650px) {

          .header {
            padding: 0 18px;
          }

          .header-status {
            display: none;
          }

          .center-section,
          .profile-section,
          .plans-section,
          .chat-section {
            padding-left: 18px;
            padding-right: 18px;
          }

          h1 {
            font-size: 52px;
            letter-spacing: -2px;
          }

          .numbers-card {
            grid-template-columns: 1fr;
          }

          .number {
            display: grid;
            grid-template-columns: 1fr 60px 1fr;
            align-items: center;
            text-align: left;
            padding: 13px 15px;
          }

          .number strong {
            margin: 0;
            text-align: center;
          }

          .number span {
            text-align: right;
          }

          .chat-heading {
            display: block;
          }

          .profile-mini {
            width: fit-content;
            margin-top: 18px;
          }

          .user-bubble,
          .ai-answer {
            max-width: 92%;
          }

          .plan-top {
            display: block;
          }

          .price {
            margin-top: 18px;
            text-align: left;
          }

          .benefits {
            grid-template-columns: 1fr;
          }

        }

      `}</style>

    </main>
  );
}


function Benefit({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="benefit">
      <span>✓</span>
      <div>{children}</div>
    </div>
  );
}