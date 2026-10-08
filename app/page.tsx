"use client";

import { useState } from "react";

type Step =
  | "intro"
  | "profile"
  | "numbers"
  | "chat"
  | "paywall";

type Profile = {
  name: string;
  dob: string;
  mulank: number;
  bhagyank: number;
  nameNumber: number;
};

/* =========================================================
   NUMEROLOGY
   ========================================================= */

function reduceNumber(value: number): number {
  while (value > 9) {
    value = String(value)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }

  return value;
}

function getMulank(dob: string): number {
  if (!dob) return 0;

  const parts = dob.split("-");

  if (parts.length !== 3) return 0;

  const day = Number(parts[2]);

  if (!day) return 0;

  return reduceNumber(day);
}

function getBhagyank(dob: string): number {
  if (!dob) return 0;

  const digits = dob
    .replaceAll("-", "")
    .split("")
    .map(Number);

  if (!digits.length) return 0;

  const total = digits.reduce(
    (sum, digit) => sum + digit,
    0
  );

  return reduceNumber(total);
}


/* =========================================================
   CHALDEAN / VEDIC NAME NUMBER
   ========================================================= */

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

function getNameNumber(name: string): number {
  const cleanName = name
    .toUpperCase()
    .replace(/[^A-Z]/g, "");

  if (!cleanName) return 0;

  const total = cleanName
    .split("")
    .reduce(
      (sum, letter) =>
        sum + (NAME_VALUES[letter] || 0),
      0
    );

  return reduceNumber(total);
}


/* =========================================================
   INTERNAL VEDIC GRID
   =========================================================

   3 1 9
   6 7 5
   2 8 4

   Century digits excluded.
   Zero ignored.

   IMPORTANT:
   This is calculated internally only.
   It is NEVER rendered in the UI.
   ========================================================= */

function getVedicGrid(dob: string): number[] {
  if (!dob) return [];

  const parts = dob.split("-");

  if (parts.length !== 3) return [];

  const day = parts[2];
  const month = parts[1];
  const year = parts[0];

  const yearWithoutCentury =
    year.length === 4
      ? year.substring(2)
      : year;

  return (
    day +
    month +
    yearWithoutCentury
  )
    .split("")
    .map(Number)
    .filter((digit) => digit !== 0);
}


/* =========================================================
   MAIN PAGE
   ========================================================= */

export default function NumerologyAIPage() {
  const [step, setStep] =
    useState<Step>("intro");

  const [name, setName] =
    useState("");

  const [dob, setDob] =
    useState("");

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  /* =======================================================
     CREATE PROFILE
     ======================================================= */

  function createProfile() {
    if (!name.trim() || !dob) {
      return;
    }

    const cleanName =
      name.trim().replace(/\s+/g, " ");

    const newProfile: Profile = {
      name: cleanName,

      dob,

      mulank:
        getMulank(dob),

      bhagyank:
        getBhagyank(dob),

      nameNumber:
        getNameNumber(cleanName),
    };


    /*
     * Calculate Vedic grid internally.
     * It is deliberately not displayed.
     */

    getVedicGrid(dob);

    setProfile(newProfile);

    setStep("numbers");
  }


  /* =======================================================
     REAL MAUKSH AI
     ======================================================= */

  async function askQuestion() {
    if (!question.trim() || !profile) {
      return;
    }

    setLoading(true);
    setAnswer("");

    try {

      const response = await fetch(
        "/api/numerology-ai",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name: profile.name,

            dob: profile.dob,

            mulank:
              profile.mulank,

            bhagyank:
              profile.bhagyank,

            nameNumber:
              profile.nameNumber,

            question:
              question.trim(),
          }),
        }
      );


      const data =
        await response.json();


      if (!response.ok) {
        throw new Error(
          data.error ||
          "Unable to generate answer"
        );
      }


      setAnswer(
        data.answer
      );


    } catch (error) {

      console.error(
        "Mauksh AI request failed:",
        error
      );


      setAnswer(
        "I couldn't generate your reading right now. Please try again."
      );


    } finally {

      setLoading(false);

    }
  }


  /* =======================================================
     INTRO
     ======================================================= */

  if (step === "intro") {
    return (
      <>
        <PageStyles />

        <main className="app">

          <Background />

          <section className="introPage">

            <div className="topBadge">

              <span>
                ✦
              </span>

              PERSONAL NUMEROLOGY

            </div>


            <h1 className="heroTitle">

              Your numbers.

              <br />

              <span>
                Your patterns.
              </span>

              <br />

              Your move.

            </h1>


            <p className="heroDescription">

              Meet your personal numerology companion.
              Understand your numbers and get personalized
              guidance for the questions that matter to you.

            </p>


            <button
              className="heroButton"
              onClick={() =>
                setStep("profile")
              }
            >

              <span className="heroButtonText">
                Start free
              </span>

              <span className="heroArrow">
                →
              </span>

            </button>


            <div className="freePill">

              <span>
                ✦
              </span>

              Your first AI question is free

            </div>


            <div className="floatingPreview">

              <div className="previewTop">

                <div className="miniAvatar">

                  <img
                    src="/assets/mauksh-logo.jpg"
                    alt="Mauksh"
                    className="maukshLogo"
                  />

                </div>


                <div className="previewIdentity">

                  <strong>
                    Mauksh AI
                  </strong>

                  <small>
                    Personal numerology companion
                  </small>

                </div>


                <span className="previewOnline">
                  ●
                </span>

              </div>


              <div className="previewMessage">

                What should I focus on
                in my career right now?

              </div>


              <div className="previewAI">

                <span>
                  ✦
                </span>

                Your numbers suggest it's
                a good time to...

              </div>

            </div>

          </section>

        </main>
      </>
    );
  }


  /* =======================================================
     PROFILE
     ======================================================= */

  if (step === "profile") {
    return (
      <>
        <PageStyles />

        <main className="app">

          <Background />

          <section className="profilePage">

            <Progress active={1} />


            <div className="sectionBadge">
              01 · YOUR PROFILE
            </div>


            <h2 className="sectionTitle">

              Let's get to

              <br />

              <span>
                know you.
              </span>

            </h2>


            <p className="sectionDescription">

              Just two things.
              We'll handle everything else.

            </p>


            <div className="form">

              <div className="inputGroup">

                <label>
                  YOUR NAME
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="e.g. Shivam Bansal"
                  autoComplete="name"
                />

              </div>


              <div className="inputGroup">

                <label>
                  DATE OF BIRTH
                </label>

                <input
                  type="date"
                  value={dob}
                  onChange={(e) =>
                    setDob(e.target.value)
                  }
                />

              </div>


              <button
                className="continueButton"
                disabled={
                  !name.trim() ||
                  !dob
                }
                onClick={createProfile}
              >

                <span>
                  Reveal my numbers
                </span>

                <strong>
                  →
                </strong>

              </button>

            </div>


            <div className="privacyNote">

              <span>
                ✦
              </span>

              Your information stays private.

            </div>

          </section>

        </main>
      </>
    );
  }


  /* =======================================================
     NUMBERS
     ======================================================= */

  if (
    step === "numbers" &&
    profile
  ) {
    return (
      <>
        <PageStyles />

        <main className="app">

          <Background />

          <section className="numbersPage">

            <Progress active={2} />


            <div className="sectionBadge">
              02 · YOUR NUMBERS
            </div>


            <div className="numbersHeader">

              <h2 className="sectionTitle small">

                Hey{" "}

                {profile.name
                  .split(" ")[0]}.

                <br />

                <span>
                  Here you are.
                </span>

              </h2>


              <div className="sparkle">
                ✦
              </div>

            </div>


            <div className="numberCards">

              <NumberCard
                label="MULANK"
                value={profile.mulank}
                description="Your core energy"
              />


              <NumberCard
                label="BHAGYANK"
                value={profile.bhagyank}
                description="Your life path"
                featured
              />


              <NumberCard
                label="NAME NUMBER"
                value={profile.nameNumber}
                description="Your expression"
              />

            </div>


            {/* VEDIC GRID INTENTIONALLY NOT SHOWN */}


            <button
              className="askCard"
              onClick={() =>
                setStep("chat")
              }
            >

              <div className="askIcon">
                ✦
              </div>


              <div className="askText">

                <strong>
                  Your numbers are ready.
                </strong>

                <p>
                  Now ask Mauksh AI anything.
                </p>

              </div>


              <span className="askArrow">
                →
              </span>

            </button>


            <div className="freeLabel">

              ✦ Your first AI question is free

            </div>

          </section>

        </main>
      </>
    );
  }


  /* =======================================================
     CHAT
     ======================================================= */

  if (
    step === "chat" &&
    profile
  ) {
    return (
      <>
        <PageStyles />

        <main className="app">

          <Background />

          <section className="chatPage">

            <Progress active={3} />


            <div className="sectionBadge">
              03 · ASK ANYTHING
            </div>


            <h2 className="chatTitle">

              Your numbers.

              <br />

              <span>
                Your questions.
              </span>

            </h2>


            <div className="chatBox">

              <div className="chatTop">

                <div className="chatAvatar">

                  <img
                    src="/assets/mauksh-logo.jpg"
                    alt="Mauksh"
                    className="maukshLogo"
                  />

                </div>


                <div className="chatIdentity">

                  <strong>
                    Mauksh AI
                  </strong>

                  <span>
                    Personal numerology companion
                  </span>

                </div>


                <div className="chatStatus">

                  <i />

                  Online

                </div>

              </div>


              <div className="chatMessages">

                <div className="aiGreeting">

                  <span>
                    ✦
                  </span>

                  Hey{" "}

                  {profile.name
                    .split(" ")[0]}.

                  <br />

                  Ask me anything about your
                  career, relationships, money
                  or life.

                </div>


                {!question && (
                  <div className="suggestions">

                    <button
                      onClick={() =>
                        setQuestion(
                          "Should I change my career this year?"
                        )
                      }
                    >
                      Should I change my career?
                    </button>


                    <button
                      onClick={() =>
                        setQuestion(
                          "What should I focus on financially?"
                        )
                      }
                    >
                      What about money?
                    </button>


                    <button
                      onClick={() =>
                        setQuestion(
                          "What does my numerology say about love?"
                        )
                      }
                    >
                      What about my love life?
                    </button>

                  </div>
                )}


                {question && (
                  <div className="userMessage">

                    {question}

                  </div>
                )}


                {loading && (
                  <div className="aiMessage">

                    <div className="aiLabel">
                      ✦ MAUKSH AI
                    </div>

                    <p>
                      Reading your numbers...
                    </p>

                  </div>
                )}


                {answer && !loading && (
                  <div className="aiMessage">

                    <div className="aiLabel">
                      ✦ MAUKSH AI
                    </div>

                    <p>
                      {answer}
                    </p>

                  </div>
                )}

              </div>


              {!answer && (
                <div className="chatInput">

                  <textarea
                    value={question}
                    onChange={(e) =>
                      setQuestion(
                        e.target.value
                      )
                    }
                    placeholder="Ask something..."
                    rows={2}
                  />


                  <button
                    disabled={
                      !question.trim() ||
                      loading
                    }
                    onClick={askQuestion}
                  >

                    {loading ? (
                      <span className="loader" />
                    ) : (
                      "↑"
                    )}

                  </button>

                </div>
              )}


              {/* PAYMENT NEVER APPEARS AUTOMATICALLY */}

              {answer && !loading && (
                <div className="answerActions">

                  <button
                    className="continueToPlan"
                    onClick={() =>
                      setStep("paywall")
                    }
                  >

                    Continue with Mauksh AI

                    <span>
                      →
                    </span>

                  </button>


                  <p>
                    Your free preview is complete.
                  </p>

                </div>
              )}

            </div>


            {!answer && (
              <div className="questionCounter">

                <strong>
                  1
                </strong>

                free question · no card required

              </div>
            )}

          </section>

        </main>
      </>
    );
  }


  /* =======================================================
     PAYWALL
     ======================================================= */

  if (
    step === "paywall" &&
    profile
  ) {
    return (
      <>
        <PageStyles />

        <main className="app">

          <Background />

          <section className="paywallPage">

            <div className="successIcon">
              ✓
            </div>


            <div className="sectionBadge">
              YOUR FREE PREVIEW
            </div>


            <h2 className="sectionTitle">

              That was just

              <br />

              <span>
                the beginning.
              </span>

            </h2>


            <p className="sectionDescription">

              Your numerology profile is ready.
              Keep Mauksh AI with you for personalized
              guidance whenever you need another
              perspective.

            </p>


            <div className="plan">

              <div className="planTop">

                <div>

                  <div className="planPill">
                    MAUKSH AI
                  </div>


                  <h3>

                    Your personal
                    <br />

                    numerology companion

                  </h3>

                </div>


                <div className="planPrice">

                  <strong>
                    ₹99
                  </strong>

                  <span>
                    / month
                  </span>

                </div>

              </div>


              <div className="planFeatures">

                <Feature>
                  Personalized AI guidance
                </Feature>

                <Feature>
                  Your numbers always remembered
                </Feature>

                <Feature>
                  Career, love, money & life
                </Feature>

                <Feature>
                  Saved conversations
                </Feature>

                <Feature>
                  Cancel anytime
                </Feature>

              </div>


              <button
                className="subscribeButton"
                onClick={() => {
                  alert(
                    "Dodo Payments checkout will be connected here."
                  );
                }}
              >

                Unlock Mauksh AI

                <span>
                  →
                </span>

              </button>


              <p className="secureText">
                Secure payment · Cancel anytime
              </p>

            </div>


            <div className="savedProfile">

              <span>
                ✓
              </span>

              Your numerology profile is ready.

            </div>

          </section>

        </main>
      </>
    );
  }


  return null;
}


/* =========================================================
   BACKGROUND
   ========================================================= */

function Background() {
  return (
    <>
      <div className="orb orbOne" />
      <div className="orb orbTwo" />
      <div className="orb orbThree" />
    </>
  );
}


/* =========================================================
   PROGRESS
   ========================================================= */

function Progress({
  active,
}: {
  active: number;
}) {
  return (
    <div className="progress">

      {[1, 2, 3].map(
        (number) => (
          <span
            key={number}
            className={
              number <= active
                ? "active"
                : ""
            }
          />
        )
      )}

    </div>
  );
}


/* =========================================================
   NUMBER CARD
   ========================================================= */

function NumberCard({
  label,
  value,
  description,
  featured = false,
}: {
  label: string;
  value: number;
  description: string;
  featured?: boolean;
}) {
  return (
    <div
      className={
        featured
          ? "numberCard featured"
          : "numberCard"
      }
    >

      <div className="numberLabel">
        {label}
      </div>


      <div className="numberValue">
        {value}
      </div>


      <div className="numberDescription">
        {description}
      </div>


      {featured && (
        <div className="featuredBadge">
          MAIN
        </div>
      )}

    </div>
  );
}


/* =========================================================
   FEATURE
   ========================================================= */

function Feature({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="feature">

      <span>
        ✓
      </span>

      {children}

    </div>
  );
}


/* =========================================================
   STYLES
   ========================================================= */

function PageStyles() {
  return (
    <style jsx global>{`

      * {
        box-sizing: border-box;
      }

      html,
      body {
        margin: 0;
        padding: 0;
      }

      body {
        background: #f7f5ef;
      }

      button,
      input,
      textarea {
        font: inherit;
      }

      button {
        -webkit-tap-highlight-color: transparent;
      }


      /* =====================================================
         APP
         ===================================================== */

      .app {
        min-height: 100vh;
        overflow: hidden;
        position: relative;

        background:
          radial-gradient(
            circle at 85% 5%,
            rgba(215,170,84,.16),
            transparent 28%
          ),
          radial-gradient(
            circle at 5% 75%,
            rgba(234,216,177,.2),
            transparent 30%
          ),
          #f7f5ef;

        color: #191714;

        font-family:
          Inter,
          -apple-system,
          BlinkMacSystemFont,
          "Segoe UI",
          sans-serif;
      }


      /* =====================================================
         BACKGROUND
         ===================================================== */

      .orb {
        position: fixed;
        border-radius: 50%;
        filter: blur(80px);
        pointer-events: none;
      }

      .orbOne {
        width: 220px;
        height: 220px;
        top: 15%;
        right: -80px;
        background: rgba(205,160,75,.12);
      }

      .orbTwo {
        width: 180px;
        height: 180px;
        bottom: 5%;
        left: -70px;
        background: rgba(233,212,172,.15);
      }

      .orbThree {
        width: 120px;
        height: 120px;
        top: 48%;
        left: 45%;
        background: rgba(255,255,255,.55);
      }


      /* =====================================================
         COMMON
         ===================================================== */

      .introPage,
      .profilePage,
      .numbersPage,
      .chatPage,
      .paywallPage {
        width: min(100%, 860px);
        min-height: 100vh;
        margin: auto;

        position: relative;
        z-index: 2;
      }

      .sectionBadge,
      .topBadge {
        color: #a97830;

        font-size: 9px;
        font-weight: 750;

        letter-spacing: 2px;
      }

      .sectionTitle {
        margin: 18px 0 0;

        font-size:
          clamp(50px, 8vw, 82px);

        line-height: .94;
        letter-spacing: -5px;

        font-weight: 650;
      }

      .sectionTitle span,
      .heroTitle span,
      .chatTitle span {
        color: #a97830;
      }


      /* =====================================================
         INTRO
         ===================================================== */

      .introPage {
        padding:
          95px 30px 100px;
      }

      .topBadge {
        display: inline-flex;
        align-items: center;
        gap: 8px;

        padding:
          9px 13px;

        border:
          1px solid
          rgba(167,126,55,.18);

        border-radius: 100px;

        background:
          rgba(255,250,239,.65);
      }

      .heroTitle {
        margin: 28px 0 0;

        max-width: 800px;

        font-size:
          clamp(58px, 10vw, 105px);

        line-height: .88;
        letter-spacing: -7px;

        font-weight: 700;
      }

      .heroDescription {
        max-width: 510px;

        margin:
          30px 0 25px;

        color: #777067;

        font-size: 15px;
        line-height: 1.65;
      }

      .heroButton {
        height: 56px;

        padding:
          0 8px 0 21px;

        display: flex;
        align-items: center;

        gap: 28px;

        border: 0;
        border-radius: 100px;

        background: #1c1916;
        color: white;

        cursor: pointer;

        transition:
          transform .25s ease;
      }

      .heroButton:hover {
        transform:
          translateY(-2px);
      }

      .heroButtonText {
        font-size: 12px;
        font-weight: 700;
      }

      .heroArrow {
        width: 40px;
        height: 40px;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 50%;

        background: #c99b4d;

        font-size: 18px;
      }

      .freePill {
        margin-top: 13px;

        color: #898178;

        font-size: 9px;
      }

      .freePill span {
        color: #b18035;
      }


      /* =====================================================
         LOGO
         ===================================================== */

      .maukshLogo {
        width: 100%;
        height: 100%;

        display: block;

        object-fit: contain;
      }


      /* =====================================================
         AI PREVIEW
         ===================================================== */

      .floatingPreview {
        position: absolute;

        right: 30px;
        top: 190px;

        width: 275px;

        padding: 16px;

        border:
          1px solid
          rgba(255,255,255,.7);

        border-radius: 22px;

        background:
          rgba(255,255,255,.55);

        box-shadow:
          0 30px 80px
          rgba(50,40,25,.10);

        backdrop-filter:
          blur(25px);

        transform:
          rotate(3deg);
      }

      .previewTop {
        display: flex;
        align-items: center;
        gap: 9px;
      }

      .miniAvatar {
        width: 42px;
        height: 42px;

        flex-shrink: 0;

        overflow: hidden;

        border-radius: 12px;

        background: white;

        border:
          1px solid
          rgba(40,35,28,.08);
      }

      .previewIdentity {
        min-width: 0;
      }

      .previewTop strong,
      .previewTop small {
        display: block;
      }

      .previewTop strong {
        font-size: 10px;
      }

      .previewTop small {
        margin-top: 2px;

        color: #8b847a;

        font-size: 7px;
      }

      .previewOnline {
        margin-left: auto;

        color: #82935c;

        font-size: 7px;
      }

      .previewMessage {
        margin-top: 20px;

        padding: 12px;

        border-radius:
          12px 12px 3px 12px;

        background: #1e1b17;
        color: white;

        font-size: 9px;
        line-height: 1.5;
      }

      .previewAI {
        margin-top: 8px;

        padding: 12px;

        border-radius:
          12px 12px 12px 3px;

        background: #f4ecdd;
        color: #62594f;

        font-size: 9px;
        line-height: 1.5;
      }

      .previewAI span {
        margin-right: 5px;

        color: #b17d2e;
      }


      /* =====================================================
         PROGRESS
         ===================================================== */

      .progress {
        display: flex;
        gap: 5px;

        margin-bottom: 48px;
      }

      .progress span {
        width: 35px;
        height: 3px;

        border-radius: 10px;

        background: #dfd9ce;
      }

      .progress span.active {
        background: #ae8038;
      }


      /* =====================================================
         PROFILE
         ===================================================== */

      .profilePage {
        padding:
          75px 30px 100px;
      }

      .sectionDescription {
        max-width: 450px;

        margin:
          22px 0 0;

        color: #80786e;

        font-size: 14px;
        line-height: 1.7;
      }

      .form {
        max-width: 620px;

        margin-top: 38px;
      }

      .inputGroup {
        margin-bottom: 24px;
      }

      .inputGroup label {
        display: block;

        margin:
          0 0
          9px
          2px;

        color: #625b53;

        font-size: 9px;
        font-weight: 700;

        letter-spacing: 1.4px;

        text-transform: uppercase;
      }

      .inputGroup input {
        width: 100%;
        height: 60px;

        padding:
          0 18px;

        border:
          1px solid
          #ddd6cb;

        border-radius: 16px;

        outline: none;

        background:
          rgba(255,255,255,.72);

        color: #1d1a17;

        font-size: 14px;
        font-weight: 500;

        appearance: none;

        transition:
          border-color .2s ease,
          box-shadow .2s ease,
          background .2s ease;
      }

      .inputGroup input:hover {
        border-color: #cfc5b7;

        background:
          rgba(255,255,255,.9);
      }

      .inputGroup input:focus {
        border-color: #b8883d;

        background: #fff;

        box-shadow:
          0 0 0 4px
          rgba(184,136,61,.08);
      }

      .inputGroup input::placeholder {
        color: #aaa39b;

        font-weight: 400;
      }

      .inputGroup input[type="date"] {
        color: #1d1a17;
      }


      /* =====================================================
         PROFILE BUTTON
         ===================================================== */

      .continueButton {
        width: 100%;
        height: 58px;

        margin-top: 8px;

        padding:
          0 7px 0 20px;

        display: flex;
        align-items: center;
        justify-content: space-between;

        border: 0;
        border-radius: 17px;

        background: #1d1a17;
        color: white;

        cursor: pointer;
      }

      .continueButton span {
        font-size: 12px;
        font-weight: 700;
      }

      .continueButton strong {
        width: 44px;
        height: 44px;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 13px;

        background: #c89a4d;

        font-size: 20px;
      }

      .continueButton:disabled {
        background: #b9b6b2;

        cursor: not-allowed;
      }

      .continueButton:disabled strong {
        background: #ead9b8;
      }

      .privacyNote {
        margin-top: 15px;

        color: #989087;

        font-size: 9px;
      }

      .privacyNote span {
        margin-right: 5px;

        color: #ae7c32;
      }


      /* =====================================================
         NUMBERS
         ===================================================== */

      .numbersPage {
        padding:
          70px 30px 100px;
      }

      .numbersHeader {
        display: flex;

        align-items: flex-start;

        justify-content:
          space-between;
      }

      .sectionTitle.small {
        font-size:
          clamp(47px, 7vw, 70px);
      }

      .sparkle {
        width: 48px;
        height: 48px;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 15px;

        background: #eadabd;
        color: #a7782f;

        font-size: 22px;
      }

      .numberCards {
        display: grid;

        grid-template-columns:
          repeat(3, 1fr);

        gap: 10px;

        margin-top: 35px;
      }

      .numberCard {
        position: relative;

        min-height: 175px;

        padding: 20px;

        border:
          1px solid
          rgba(50,42,32,.08);

        border-radius: 23px;

        background:
          rgba(255,255,255,.62);

        overflow: hidden;
      }

      .numberCard.featured {
        background: #1e1b17;

        color: white;
      }

      .numberLabel {
        font-size: 8px;
        font-weight: 750;

        letter-spacing: 1.6px;

        color: #8c8379;
      }

      .featured .numberLabel {
        color: #a99d8c;
      }

      .numberValue {
        margin-top: 18px;

        font-family:
          Georgia,
          serif;

        font-size: 64px;
        line-height: 1;

        color: #b27f30;
      }

      .featured .numberValue {
        color: #d6ad62;
      }

      .numberDescription {
        margin-top: 13px;

        color: #8c8379;

        font-size: 9px;
      }

      .featured .numberDescription {
        color: #8f877c;
      }

      .featuredBadge {
        position: absolute;

        top: 18px;
        right: 17px;

        padding:
          5px 7px;

        border-radius: 100px;

        background: #c39a53;
        color: #211d17;

        font-size: 6px;
        font-weight: 800;

        letter-spacing: 1px;
      }


      /* =====================================================
         ASK CARD
         ===================================================== */

      .askCard {
        width: 100%;

        margin-top: 10px;

        padding: 15px;

        display: flex;
        align-items: center;

        gap: 13px;

        border: 0;
        border-radius: 21px;

        background: #1d1a16;
        color: white;

        cursor: pointer;

        text-align: left;
      }

      .askIcon {
        width: 43px;
        height: 43px;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 13px;

        background: #c69b52;
        color: #211c16;
      }

      .askText {
        flex: 1;
      }

      .askText strong {
        display: block;

        font-size: 11px;
      }

      .askText p {
        margin:
          4px 0 0;

        color: #938b80;

        font-size: 8px;
      }

      .askArrow {
        width: 40px;
        height: 40px;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 11px;

        background: #29251f;

        font-size: 20px;
      }

      .freeLabel {
        margin-top: 14px;

        text-align: center;

        color: #a47a38;

        font-size: 9px;
      }


      /* =====================================================
         CHAT
         ===================================================== */

      .chatPage {
        padding:
          70px 30px 100px;
      }

      .chatTitle {
        margin:
          18px 0 30px;

        font-size:
          clamp(48px, 8vw, 75px);

        line-height: .94;

        letter-spacing: -4px;
      }

      .chatBox {
        overflow: hidden;

        border:
          1px solid
          rgba(40,35,28,.08);

        border-radius: 25px;

        background:
          rgba(255,255,255,.72);

        box-shadow:
          0 25px 70px
          rgba(30,25,20,.06);
      }

      .chatTop {
        padding: 16px;

        display: flex;
        align-items: center;

        gap: 11px;

        border-bottom:
          1px solid
          rgba(40,35,28,.07);
      }

      .chatAvatar {
        width: 42px;
        height: 42px;

        flex-shrink: 0;

        overflow: hidden;

        border-radius: 12px;

        background: white;
      }

      .chatIdentity {
        flex: 1;
      }

      .chatIdentity strong,
      .chatIdentity span {
        display: block;
      }

      .chatIdentity strong {
        font-size: 11px;
      }

      .chatIdentity span {
        margin-top: 3px;

        color: #999087;

        font-size: 8px;
      }

      .chatStatus {
        color: #8b847c;

        font-size: 8px;
      }

      .chatStatus i {
        width: 6px;
        height: 6px;

        display: inline-block;

        margin-right: 4px;

        border-radius: 50%;

        background: #82935c;
      }

      .chatMessages {
        min-height: 320px;

        padding: 20px;
      }

      .aiGreeting {
        max-width: 430px;

        color: #625b52;

        font-size: 13px;
        line-height: 1.7;
      }

      .aiGreeting span {
        color: #b07d30;
      }

      .suggestions {
        display: flex;
        flex-wrap: wrap;

        gap: 7px;

        margin-top: 20px;
      }

      .suggestions button {
        padding:
          9px 12px;

        border:
          1px solid
          #ded7cb;

        border-radius: 100px;

        background: #f9f6f0;
        color: #625b52;

        font-size: 8px;

        cursor: pointer;
      }

      .userMessage {
        max-width: 80%;

        margin:
          20px 0
          12px
          auto;

        padding:
          12px 15px;

        border-radius:
          16px 16px 4px 16px;

        background: #1d1a17;
        color: white;

        font-size: 11px;
        line-height: 1.5;
      }

      .aiMessage {
        max-width: 90%;

        padding: 15px;

        border-radius:
          16px 16px 16px 4px;

        background: #f2e9d9;
        color: #554d44;

        font-size: 11px;
        line-height: 1.75;

        white-space: pre-wrap;
      }

      .aiLabel {
        margin-bottom: 7px;

        color: #a97830;

        font-size: 7px;
        font-weight: 800;

        letter-spacing: 1.4px;
      }

      .aiMessage p {
        margin: 0;
      }


      /* =====================================================
         CHAT INPUT
         ===================================================== */

      .chatInput {
        padding: 12px;

        display: flex;

        gap: 8px;

        border-top:
          1px solid
          rgba(40,35,28,.07);
      }

      .chatInput textarea {
        flex: 1;

        resize: none;

        padding: 12px;

        border:
          1px solid
          #ddd6cb;

        border-radius: 14px;

        outline: none;

        background: #fff;
        color: #222;

        font-size: 11px;
      }

      .chatInput textarea:focus {
        border-color:
          #b8883d;
      }

      .chatInput button {
        width: 45px;
        height: 45px;

        align-self: flex-end;

        border: 0;

        border-radius: 13px;

        background: #1d1a17;
        color: white;

        cursor: pointer;
      }

      .chatInput button:disabled {
        opacity: .35;

        cursor: not-allowed;
      }

      .loader {
        width: 14px;
        height: 14px;

        display: inline-block;

        border:
          2px solid
          rgba(255,255,255,.35);

        border-top-color: white;

        border-radius: 50%;

        animation:
          spin .7s linear infinite;
      }

      @keyframes spin {

        to {
          transform:
            rotate(360deg);
        }

      }


      /* =====================================================
         ANSWER ACTION
         ===================================================== */

      .answerActions {
        padding:
          0 14px
          18px;
      }

      .continueToPlan {
        width: 100%;
        height: 53px;

        padding:
          0 7px 0 18px;

        display: flex;
        align-items: center;
        justify-content: space-between;

        border: 0;

        border-radius: 14px;

        background: #1d1a17;
        color: white;

        font-size: 10px;
        font-weight: 700;

        cursor: pointer;
      }

      .continueToPlan span {
        width: 39px;
        height: 39px;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 11px;

        background: #c89a4d;

        color: #1d1a17;

        font-size: 18px;
      }

      .answerActions p {
        margin:
          10px 0 0;

        text-align: center;

        color: #9c948b;

        font-size: 8px;
      }

      .questionCounter {
        margin-top: 14px;

        text-align: center;

        color: #969087;

        font-size: 9px;
      }

      .questionCounter strong {
        color: #a97830;
      }


      /* =====================================================
         PAYWALL
         ===================================================== */

      .paywallPage {
        padding:
          70px 30px 100px;
      }

      .successIcon {
        width: 48px;
        height: 48px;

        display: flex;
        align-items: center;
        justify-content: center;

        margin-bottom: 28px;

        border-radius: 50%;

        background: #1d1a17;
        color: #d1a35b;

        font-size: 18px;
      }

      .plan {
        max-width: 600px;

        margin-top: 35px;

        padding: 24px;

        border-radius: 27px;

        background: #1d1a17;
        color: white;

        box-shadow:
          0 30px 80px
          rgba(25,22,18,.15);
      }

      .planTop {
        display: flex;

        justify-content:
          space-between;

        gap: 20px;
      }

      .planPill {
        display: inline-block;

        padding:
          6px 9px;

        border-radius: 100px;

        background: #c89a4d;
        color: #1d1a17;

        font-size: 7px;
        font-weight: 800;

        letter-spacing: 1px;
      }

      .plan h3 {
        margin:
          15px 0 0;

        font-size: 22px;
        line-height: 1.05;

        letter-spacing: -.7px;
      }

      .planPrice {
        text-align: right;
      }

      .planPrice strong {
        display: block;

        color: #d3a75d;

        font-family:
          Georgia,
          serif;

        font-size: 38px;
      }

      .planPrice span {
        color: #938b80;

        font-size: 8px;
      }

      .planFeatures {
        margin-top: 28px;

        display: grid;

        grid-template-columns:
          repeat(2, 1fr);

        gap: 11px;
      }

      .feature {
        color: #c0b9af;

        font-size: 9px;
      }

      .feature span {
        margin-right: 6px;

        color: #c89a4d;
      }

      .subscribeButton {
        width: 100%;
        height: 55px;

        margin-top: 28px;

        padding:
          0 8px 0 17px;

        display: flex;
        align-items: center;
        justify-content: space-between;

        border: 0;
        border-radius: 15px;

        background: #c89a4d;
        color: #1d1a17;

        font-size: 11px;
        font-weight: 800;

        cursor: pointer;
      }

      .subscribeButton span {
        width: 40px;
        height: 40px;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 11px;

        background: #1d1a17;
        color: white;

        font-size: 18px;
      }

      .secureText {
        margin:
          12px 0 0;

        text-align: center;

        color: #797269;

        font-size: 8px;
      }

      .savedProfile {
        margin-top: 18px;

        color: #91897f;

        font-size: 9px;
      }

      .savedProfile span {
        margin-right: 5px;

        color: #8c9b63;
      }


      /* =====================================================
         MOBILE
         ===================================================== */

      @media (max-width: 700px) {

        .introPage,
        .profilePage,
        .numbersPage,
        .chatPage,
        .paywallPage {
          width: 100%;
        }

        .introPage {
          padding:
            75px
            30px
            80px;
        }

        .heroTitle {
          font-size: 58px;

          letter-spacing: -4px;
        }

        .heroDescription {
          font-size: 14px;
        }

        .floatingPreview {
          position: relative;

          top: auto;
          right: auto;

          width: 82%;

          margin:
            90px auto
            0;

          transform:
            rotate(2deg);
        }

        .profilePage,
        .numbersPage,
        .chatPage,
        .paywallPage {
          padding:
            55px
            30px
            80px;
        }

        .sectionTitle {
          font-size: 52px;

          letter-spacing: -4px;
        }

        .numberCards {
          grid-template-columns: 1fr;
        }

        .numberCard {
          min-height: 150px;
        }

        .numberValue {
          font-size: 58px;
        }

        .planTop {
          align-items: flex-start;
        }

        .planFeatures {
          grid-template-columns: 1fr;
        }

      }


      @media (max-width: 390px) {

        .introPage,
        .profilePage,
        .numbersPage,
        .chatPage,
        .paywallPage {
          padding-left: 22px;
          padding-right: 22px;
        }

        .heroTitle {
          font-size: 50px;
        }

        .sectionTitle {
          font-size: 47px;
        }

      }

    `}</style>
  );
}