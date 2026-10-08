"use client";

import { useState } from "react";
import Link from "next/link";

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
   NUMEROLOGY HELPERS
   ========================================================= */

function reduceNumber(num: number): number {
  while (num > 9) {
    num = String(num)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }

  return num;
}

function getMulank(dob: string): number {
  const parts = dob.split("-");

  if (parts.length !== 3) return 0;

  const day = Number(parts[2]);

  if (!day) return 0;

  return reduceNumber(day);
}

function getBhagyank(dob: string): number {
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

function getNameNumber(name: string): number {
  const letters = name
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
    if (!name.trim() || !dob) return;

    const newProfile: Profile = {
      name: name.trim(),
      dob,
      mulank: getMulank(dob),
      bhagyank: getBhagyank(dob),
      nameNumber: getNameNumber(name),
    };

    setProfile(newProfile);

    setStep("numbers");
  }


  /* =======================================================
     ASK QUESTION
     ======================================================= */

  async function askQuestion() {
    if (!question.trim() || !profile) {
      return;
    }

    setLoading(true);

    /*
     * TEMPORARY DEMO RESPONSE.
     *
     * Later this will call:
     *
     * /api/numerology-ai
     *
     * and use:
     *
     * Supabase + OpenAI
     */

    await new Promise((resolve) =>
      setTimeout(resolve, 1400)
    );

    setAnswer(
      `Your Mulank ${profile.mulank} and Bhagyank ${profile.bhagyank} create an interesting combination. For the situation you're asking about, the important thing is to avoid making a rushed decision. Your numbers suggest that clarity comes when you combine intuition with a practical plan.`
    );

    setLoading(false);

    /*
     * Demo only.
     *
     * Once the real backend is connected,
     * the server will record that the free
     * question has been consumed.
     */

    setTimeout(() => {
      setStep("paywall");
    }, 2500);
  }


  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <main className="app">

      {/* Background atmosphere */}

      <div className="orb orbOne" />
      <div className="orb orbTwo" />
      <div className="orb orbThree" />


      {/* =================================================
          HEADER
          ================================================= */}

      <header className="header">

        <Link
          href="/"
          className="brand"
        >

          <img
            src="/assets/Mauksh-logo.jpg"
            alt="Mauksh"
            className="maukshLogo"
          />

        </Link>

      </header>


      {/* =================================================
          INTRO
          ================================================= */}

      {step === "intro" && (

        <section className="introPage">

          <div className="topBadge">

            <span>✦</span>

            PERSONAL NUMEROLOGY

          </div>


          <h1 className="heroTitle">

            Your numbers.
            <br />

            <span>Your patterns.</span>

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
            onClick={() => setStep("profile")}
          >

            Start free

            <span>→</span>

          </button>


          <div className="freePill">

            <span>✦</span>

            Your first AI question is free

          </div>


          {/* Floating AI preview */}

          <div className="floatingPreview">

            <div className="previewTop">

              <div className="miniAvatar">
                M
              </div>

              <div>

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

              <span>✦</span>

              Your numbers suggest it's
              a good time to...

            </div>

          </div>


          <div className="scrollHint">

            EXPLORE

            <span>↓</span>

          </div>

        </section>

      )}


      {/* =================================================
          PROFILE
          ================================================= */}

      {step === "profile" && (

        <section className="profilePage">

          <Progress active={1} />


          <div className="sectionBadge">

            01 · YOUR PROFILE

          </div>


          <h2 className="sectionTitle">

            Let's get to
            <br />

            <span>know you.</span>

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

              Reveal my numbers

              <span>→</span>

            </button>

          </div>


          <div className="privacyNote">

            <span>✦</span>

            Your information stays private.

          </div>

        </section>

      )}


      {/* =================================================
          NUMBERS
          ================================================= */}

      {step === "numbers" &&
        profile && (

          <section className="numbersPage">

            <Progress active={2} />


            <div className="sectionBadge">

              02 · YOUR NUMBERS

            </div>


            <div className="numbersHeader">

              <div>

                <h2 className="sectionTitle small">

                  Hey{" "}

                  {profile.name
                    .split(" ")[0]}

                  .

                  <br />

                  <span>
                    Here you are.
                  </span>

                </h2>

              </div>


              <div className="sparkle">

                ✦

              </div>

            </div>


            {/* NUMBER CARDS */}

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


            {/* VEDIC GRID */}

            <div className="gridCard">

              <div className="gridHeader">

                <div>

                  <span>
                    VEDIC GRID
                  </span>

                  <strong>
                    Your number map
                  </strong>

                </div>

                <span className="gridIcon">
                  ⊹
                </span>

              </div>


              <div className="vedicGrid">

                {[3, 1, 9, 6, 7, 5, 2, 8, 4].map(
                  (num) => (

                    <div
                      key={num}
                      className={
                        num === profile.mulank ||
                        num === profile.bhagyank
                          ? "gridCell selected"
                          : "gridCell"
                      }
                    >

                      {num}

                    </div>

                  )
                )}

              </div>

            </div>


            {/* ASK AI */}

            <div className="askCard">

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


              <button
                onClick={() =>
                  setStep("chat")
                }
              >

                →

              </button>

            </div>


            <div className="freeLabel">

              ✦ Your first AI question is free

            </div>

          </section>
        )}


      {/* =================================================
          CHAT
          ================================================= */}

      {step === "chat" &&
        profile && (

          <section className="chatPage">

            <Progress active={3} />


            <div className="chatHeader">

              <div>

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

              </div>


              <div className="chatProfile">

                <div>

                  {profile.name
                    .charAt(0)
                    .toUpperCase()}

                </div>

                <span>

                  {profile.mulank}
                  {" · "}
                  {profile.bhagyank}

                </span>

              </div>

            </div>


            {/* CHAT BOX */}

            <div className="chatBox">

              <div className="chatTop">

                <div className="chatAvatar">
                  M
                </div>


                <div>

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

                {!answer && (

                  <>

                    <div className="aiGreeting">

                      <span>✦</span>

                      Hey{" "}

                      {profile.name
                        .split(" ")[0]}

                      .

                      <br />

                      Ask me anything about your
                      career, relationships, money
                      or life.

                    </div>


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

                  </>

                )}


                {question && (

                  <div className="userMessage">

                    {question}

                  </div>

                )}


                {answer && (

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

            </div>


            <div className="questionCounter">

              <span>
                1
              </span>

              free question · no card required

            </div>

          </section>

        )}


      {/* =================================================
          PAYWALL
          ================================================= */}

      {step === "paywall" &&
        profile && (

          <section className="paywallPage">

            <div className="successIcon">

              ✓

            </div>


            <div className="sectionBadge">

              YOUR FREE QUESTION IS USED

            </div>


            <h2 className="sectionTitle">

              That was just
              <br />

              <span>
                the beginning.
              </span>

            </h2>


            <p className="sectionDescription">

              Your numerology profile is saved.
              Keep your personal numerology companion
              with you whenever you need another
              perspective.

            </p>


            {/* PLAN */}

            <div className="plan">

              <div className="planGlow" />


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

                  /*
                   * NEXT:
                   *
                   * Dodo checkout
                   */

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

              Your numerology profile is already saved.

            </div>

          </section>

        )}

    </main>
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

      {[1, 2, 3, 4].map(
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

const styles = `

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

.app {
  min-height: 100vh;

  position: relative;

  overflow: hidden;

  background:
    radial-gradient(
      circle at 85% 5%,
      rgba(215,170,84,.18),
      transparent 28%
    ),
    radial-gradient(
      circle at 5% 75%,
      rgba(234,216,177,.25),
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


/* =========================================================
   BACKGROUND
   ========================================================= */

.orb {
  position: fixed;

  border-radius: 50%;

  filter: blur(80px);

  pointer-events: none;

  opacity: .55;
}

.orbOne {
  width: 220px;
  height: 220px;

  top: 15%;
  right: -80px;

  background: rgba(205,160,75,.17);
}

.orbTwo {
  width: 180px;
  height: 180px;

  bottom: 5%;
  left: -70px;

  background: rgba(233,212,172,.22);
}

.orbThree {
  width: 120px;
  height: 120px;

  top: 48%;
  left: 45%;

  background: rgba(255,255,255,.7);
}


/* =========================================================
   HEADER
   ========================================================= */

.header {
  height: 76px;

  padding: 0 30px;

  display: flex;
  align-items: center;

  position: relative;

  z-index: 10;

  border-bottom:
    1px solid rgba(40,35,28,.07);

  background:
    rgba(247,245,239,.65);

  backdrop-filter: blur(18px);
}

.brand {
  display: flex;
  align-items: center;

  text-decoration: none;
}

.maukshLogo {
  width: 58px;
  height: 58px;

  object-fit: contain;

  display: block;

  border-radius: 50%;
}


/* =========================================================
   COMMON
   ========================================================= */

.introPage,
.profilePage,
.numbersPage,
.chatPage,
.paywallPage {
  width: min(100%, 860px);

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


/* =========================================================
   INTRO
   ========================================================= */

.introPage {
  min-height:
    calc(100vh - 76px);

  padding:
    110px 30px 100px;
}

.topBadge {
  display: inline-flex;

  align-items: center;

  gap: 8px;

  padding:
    8px 12px;

  border:
    1px solid rgba(167,126,55,.2);

  border-radius: 100px;

  background:
    rgba(255,250,239,.65);
}

.topBadge span {
  font-size: 12px;
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

  font-size: 12px;

  font-weight: 700;

  cursor: pointer;

  transition: .25s ease;
}

.heroButton span {
  width: 40px;
  height: 40px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #c99b4d;

  font-size: 18px;
}

.heroButton:hover {
  transform:
    translateY(-2px);
}

.freePill {
  margin-top: 13px;

  color: #898178;

  font-size: 9px;
}

.freePill span {
  color: #b18035;
}


/* =========================================================
   FLOATING PREVIEW
   ========================================================= */

.floatingPreview {
  position: absolute;

  right: 30px;
  top: 190px;

  width: 275px;

  padding: 16px;

  border:
    1px solid rgba(255,255,255,.7);

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

.miniAvatar,
.chatAvatar {
  width: 34px;
  height: 34px;

  display: flex;

  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 11px;

  background: #1d1a16;

  color: #d4a858;

  font-family:
    Georgia,
    serif;
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

.scrollHint {
  position: absolute;

  bottom: 30px;
  left: 30px;

  display: flex;

  align-items: center;

  gap: 9px;

  color: #aaa299;

  font-size: 7px;

  letter-spacing: 1.5px;
}

.scrollHint span {
  font-size: 12px;
}


/* =========================================================
   PROGRESS
   ========================================================= */

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


/* =========================================================
   PROFILE
   ========================================================= */

.profilePage {
  padding:
    75px 30px 100px;
}

.sectionDescription {
  max-width: 450px;

  margin:
    22px 0 40px;

  color: #80786e;

  font-size: 14px;

  line-height: 1.7;
}

.form {
  max-width: 600px;

  padding: 25px;

  border:
    1px solid rgba(45,38,28,.08);

  border-radius: 26px;

  background:
    rgba(255,255,255,.62);

  box-shadow:
    0 25px 80px
    rgba(45,35,20,.06);

  backdrop-filter:
    blur(20px);
}

.inputGroup {
  margin-bottom: 17px;
}

.inputGroup label {
  display: block;

  margin-bottom: 8px;

  color: #5d564e;

  font-size: 10px;

  font-weight: 650;
}

.inputGroup input {
  width: 100%;

  height: 54px;

  padding:
    0 16px;

  border:
    1px solid #e0d9ce;

  border-radius: 14px;

  outline: none;

  background:
    rgba(255,255,255,.72);

  color: #201d19;

  font-size: 13px;

  transition: .2s ease;
}

.inputGroup input:focus {
  border-color: #c19a57;

  box-shadow:
    0 0 0 4px
    rgba(193,154,87,.08);
}

.inputGroup input::placeholder {
  color: #b0aaa2;
}

.continueButton {
  width: 100%;

  height: 56px;

  margin-top: 5px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding:
    0 8px 0 19px;

  border: 0;

  border-radius: 14px;

  background: #1d1a16;

  color: white;

  font-size: 11px;

  font-weight: 700;

  cursor: pointer;
}

.continueButton span {
  width: 40px;
  height: 40px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 10px;

  background: #c99b4d;

  font-size: 18px;
}

.continueButton:disabled {
  opacity: .35;

  cursor: not-allowed;
}

.privacyNote {
  margin-top: 17px;

  color: #aaa299;

  font-size: 9px;
}

.privacyNote span {
  color: #a97a32;

  margin-right: 5px;
}


/* =========================================================
   NUMBERS
   ========================================================= */

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


/* =========================================================
   GRID
   ========================================================= */

.gridCard {
  margin-top: 10px;

  padding: 22px;

  border-radius: 23px;

  background:
    rgba(255,255,255,.62);

  border:
    1px solid
    rgba(50,42,32,.08);
}

.gridHeader {
  display: flex;

  justify-content:
    space-between;
}

.gridHeader span {
  display: block;

  color: #a7782f;

  font-size: 7px;

  font-weight: 750;

  letter-spacing: 1.6px;
}

.gridHeader strong {
  display: block;

  margin-top: 5px;

  font-size: 13px;
}

.gridIcon {
  color: #ae8038 !important;

  font-size: 20px !important;
}

.vedicGrid {
  width: 210px;

  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  margin:
    20px auto 0;
}

.gridCell {
  height: 55px;

  display: flex;

  align-items: center;
  justify-content: center;

  border:
    1px solid #e7e0d6;

  color: #888077;

  font-family:
    Georgia,
    serif;

  font-size: 15px;
}

.gridCell.selected {
  background: #ead7b2;

  color: #8d6324;

  font-weight: 700;
}


/* =========================================================
   ASK CARD
   ========================================================= */

.askCard {
  margin-top: 10px;

  padding: 15px;

  display: flex;

  align-items: center;

  gap: 13px;

  border-radius: 21px;

  background: #1d1a16;

  color: white;
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

  font-size: 18px;
}

.askText {
  flex: 1;
}

.askText strong {
  display: block;

  font-size: 11px;
}

.askText p {
  margin: 4px 0 0;

  color: #938b80;

  font-size: 8px;
}

.askCard button {
  width: 40px;
  height: 40px;

  border: 0;

  border-radius: 11px;

  background: #302c26;

  color: #d4a85a;

  font-size: 17px;

  cursor: pointer;
}

.freeLabel {
  margin-top: 13px;

  color: #a27b3c;

  text-align: center;

  font-size: 8px;
}


/* =========================================================
   CHAT
   ========================================================= */

.chatPage {
  padding:
    65px 30px 100px;
}

.chatHeader {
  display: flex;

  align-items: flex-end;

  justify-content:
    space-between;

  margin-bottom: 32px;
}

.chatTitle {
  margin:
    15px 0 0;

  font-size:
    clamp(45px, 7vw, 68px);

  line-height: .94;

  letter-spacing: -4px;
}

.chatProfile {
  display: flex;

  align-items: center;

  gap: 8px;

  padding:
    6px 11px 6px 6px;

  border:
    1px solid #e1dacf;

  border-radius: 100px;

  background:
    rgba(255,255,255,.6);

  font-size: 8px;

  color: #777067;
}

.chatProfile div {
  width: 28px;
  height: 28px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #1d1a16;

  color: #d1a75a;

  font-family:
    Georgia,
    serif;
}

.chatBox {
  overflow: hidden;

  border-radius: 25px;

  background: #1e1b17;

  box-shadow:
    0 30px 80px
    rgba(40,32,22,.15);
}

.chatTop {
  padding: 17px;

  display: flex;

  align-items: center;

  gap: 10px;

  border-bottom:
    1px solid #403b34;

  color: white;
}

.chatTop strong,
.chatTop span {
  display: block;
}

.chatTop strong {
  font-size: 10px;
}

.chatTop span {
  margin-top: 3px;

  color: #8f887f;

  font-size: 7px;
}

.chatStatus {
  margin-left: auto;

  color: #898077;

  font-size: 7px !important;
}

.chatStatus i {
  display: inline-block;

  width: 5px;
  height: 5px;

  margin-right: 4px;

  border-radius: 50%;

  background: #91a15f;
}

.chatMessages {
  min-height: 330px;

  padding: 22px;
}

.aiGreeting {
  max-width: 470px;

  padding: 15px;

  border-radius:
    14px 14px 14px 3px;

  background: #f5f0e7;

  color: #4d463e;

  font-size: 10px;

  line-height: 1.7;
}

.aiGreeting span {
  color: #ad7c31;

  margin-right: 5px;
}

.suggestions {
  margin-top: 17px;

  display: flex;

  flex-wrap: wrap;

  gap: 7px;
}

.suggestions button {
  padding:
    9px 11px;

  border:
    1px solid #4a443d;

  border-radius: 100px;

  background: #29251f;

  color: #a9a097;

  font-size: 8px;

  cursor: pointer;
}

.userMessage {
  max-width: 70%;

  margin:
    18px 0 0 auto;

  padding: 13px;

  border-radius:
    14px 14px 3px 14px;

  background: #b27f30;

  color: white;

  font-size: 10px;

  line-height: 1.5;
}

.aiMessage {
  max-width: 80%;

  margin-top: 10px;

  padding: 15px;

  border-radius:
    14px 14px 14px 3px;

  background: #f5f0e7;

  color: #4d463e;

  font-size: 10px;

  line-height: 1.7;
}

.aiLabel {
  margin-bottom: 7px;

  color: #aa7930;

  font-size: 7px;

  font-weight: 750;

  letter-spacing: 1.2px;
}

.aiMessage p {
  margin: 0;
}

.chatInput {
  margin:
    0 14px 14px;

  padding: 7px;

  display: flex;

  align-items: flex-end;

  border:
    1px solid #48423a;

  border-radius: 15px;

  background: #28241f;
}

.chatInput textarea {
  flex: 1;

  padding: 10px;

  resize: none;

  border: 0;

  outline: 0;

  background: transparent;

  color: white;

  font-size: 10px;
}

.chatInput textarea::placeholder {
  color: #716a62;
}

.chatInput button {
  width: 38px;
  height: 38px;

  border: 0;

  border-radius: 11px;

  background: #c69b52;

  color: #211d17;

  cursor: pointer;
}

.chatInput button:disabled {
  opacity: .35;
}

.loader {
  width: 13px;
  height: 13px;

  display: inline-block;

  border:
    2px solid
    rgba(0,0,0,.2);

  border-top-color:
    #211d17;

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

.questionCounter {
  margin-top: 13px;

  text-align: center;

  color: #a29a91;

  font-size: 8px;
}

.questionCounter span {
  padding:
    4px 7px;

  margin-right: 4px;

  border-radius: 100px;

  background: #eadfc9;

  color: #936c2e;
}


/* =========================================================
   PAYWALL
   ========================================================= */

.paywallPage {
  padding:
    75px 30px 100px;

  text-align: center;
}

.successIcon {
  width: 54px;
  height: 54px;

  margin:
    0 auto 22px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 18px;

  background: #e5ead8;

  color: #70814b;

  font-size: 19px;
}

.paywallPage .sectionDescription {
  margin-left: auto;

  margin-right: auto;
}

.plan {
  position: relative;

  max-width: 650px;

  margin:
    35px auto 0;

  padding: 27px;

  overflow: hidden;

  border:
    1px solid #c8a86c;

  border-radius: 28px;

  background: #fffdf9;

  text-align: left;

  box-shadow:
    0 30px 90px
    rgba(54,40,20,.1);
}

.planGlow {
  position: absolute;

  width: 170px;
  height: 170px;

  top: -90px;
  right: -40px;

  border-radius: 50%;

  background:
    rgba(207,163,85,.18);

  filter: blur(25px);
}

.planTop {
  position: relative;

  display: flex;

  justify-content:
    space-between;

  gap: 20px;
}

.planPill {
  display: inline-block;

  padding:
    6px 8px;

  border-radius: 100px;

  background: #eee1c5;

  color: #966c2d;

  font-size: 7px;

  font-weight: 800;

  letter-spacing: 1.3px;
}

.plan h3 {
  margin:
    12px 0 0;

  font-family:
    Georgia,
    serif;

  font-size: 27px;

  line-height: 1.05;

  font-weight: 500;
}

.planPrice {
  text-align: right;

  white-space: nowrap;
}

.planPrice strong {
  font-family:
    Georgia,
    serif;

  font-size: 39px;

  font-weight: 500;
}

.planPrice span {
  color: #81786f;

  font-size: 9px;
}

.planFeatures {
  margin-top: 25px;

  padding-top: 22px;

  border-top:
    1px solid #e7ded0;

  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 13px;
}

.feature {
  display: flex;

  align-items: center;

  gap: 8px;

  color: #625b52;

  font-size: 9px;
}

.feature span {
  width: 19px;
  height: 19px;

  display: flex;

  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 50%;

  background: #efe5d2;

  color: #98702f;

  font-size: 8px;
}

.subscribeButton {
  width: 100%;

  height: 56px;

  margin-top: 25px;

  padding:
    0 8px 0 19px;

  display: flex;

  align-items: center;

  justify-content:
    space-between;

  border: 0;

  border-radius: 14px;

  background: #1c1916;

  color: white;

  font-size: 11px;

  font-weight: 700;

  cursor: pointer;
}

.subscribeButton span {
  width: 40px;
  height: 40px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 10px;

  background: #c69b52;

  color: #211c16;

  font-size: 18px;
}

.secureText {
  margin:
    12px 0 0;

  text-align: center;

  color: #aaa197;

  font-size: 7px;
}

.savedProfile {
  margin-top: 18px;

  color: #8c847a;

  font-size: 8px;
}

.savedProfile span {
  margin-right: 5px;

  color: #7e9254;
}


/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 760px) {

  .header {
    height: 68px;

    padding:
      0 18px;
  }

  .maukshLogo {
    width: 48px;
    height: 48px;
  }

  .introPage,
  .profilePage,
  .numbersPage,
  .chatPage,
  .paywallPage {
    padding-left: 18px;
    padding-right: 18px;
  }

  .introPage {
    padding-top: 75px;
  }

  .heroTitle {
    font-size: 61px;

    letter-spacing: -5px;
  }

  .heroDescription {
    font-size: 14px;
  }

  .floatingPreview {
    position: relative;

    top: auto;
    right: auto;

    width: 240px;

    margin:
      55px auto 0;

    transform:
      rotate(2deg);
  }

  .scrollHint {
    display: none;
  }

  .sectionTitle {
    font-size: 57px;

    letter-spacing: -4px;
  }

  .numberCards {
    grid-template-columns: 1fr;
  }

  .numberCard {
    min-height: 135px;
  }

  .numberValue {
    margin-top: 10px;
  }

  .chatHeader {
    display: block;
  }

  .chatProfile {
    width: fit-content;

    margin-top: 18px;
  }

  .chatTitle {
    font-size: 50px;
  }

  .userMessage,
  .aiMessage {
    max-width: 90%;
  }

  .planTop {
    display: block;
  }

  .planPrice {
    margin-top: 18px;

    text-align: left;
  }

  .planFeatures {
    grid-template-columns: 1fr;
  }

}


@media (max-width: 400px) {

  .heroTitle {
    font-size: 53px;
  }

  .sectionTitle {
    font-size: 50px;
  }

  .chatTitle {
    font-size: 45px;
  }

}

`;


/* =========================================================
   INJECT STYLES
   ========================================================= */

if (
  typeof document !== "undefined" &&
  !document.getElementById(
    "mauksh-ai-styles"
  )
) {
  const style =
    document.createElement("style");

  style.id =
    "mauksh-ai-styles";

  style.innerHTML =
    styles;

  document.head.appendChild(style);
}