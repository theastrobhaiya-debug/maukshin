"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="mauksh-home">

        {/* HERO */}
        <section className="hero">

          <div className="hero-content">

            <div className="eyebrow">
              MAUKSH AI
            </div>

            <h1>
              Your Personal
              <br />
              <span>Numerology AI</span>
            </h1>

            <p className="hero-text">
              Understand your numbers. Ask questions about your life.
              Get personalized guidance based on your numerology profile.
            </p>

            <div className="hero-buttons">

              <Link
                href="/numerology-ai"
                className="primary-button"
              >
                Calculate My Numbers
                <span>→</span>
              </Link>

              <Link
                href="/numerology"
                className="secondary-button"
              >
                Explore Numerology
              </Link>

            </div>

            <div className="free-note">
              ✦ Start free · No credit card required
            </div>

          </div>

        </section>


        {/* AI INTRO */}
        <section className="ai-section">

          <div className="section-heading">

            <div className="eyebrow">
              A DIFFERENT WAY TO USE NUMEROLOGY
            </div>

            <h2>
              Your numbers.
              <br />
              Your questions.
              <br />
              <span>Your AI.</span>
            </h2>

            <p>
              Mauksh AI creates your personal numerology profile and
              uses it to answer questions specifically for you.
            </p>

          </div>


          <div className="feature-grid">

            <div className="feature-card">

              <div className="feature-number">
                01
              </div>

              <div className="feature-icon">
                3
              </div>

              <h3>
                Know Your Numbers
              </h3>

              <p>
                Discover your Mulank, Bhagyank, Name Number and
                Vedic numerology grid.
              </p>

            </div>


            <div className="feature-card featured">

              <div className="feature-number">
                02
              </div>

              <div className="feature-icon">
                ✦
              </div>

              <h3>
                Ask Mauksh AI
              </h3>

              <p>
                Ask questions about career, relationships, money,
                business, decisions and more.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-number">
                03
              </div>

              <div className="feature-icon">
                ♡
              </div>

              <h3>
                Your Profile Remembers
              </h3>

              <p>
                Your numerology profile stays saved so you don't
                have to enter your details every time.
              </p>

            </div>

          </div>

        </section>


        {/* EXAMPLE CHAT */}
        <section className="chat-section">

          <div className="chat-header">

            <div>
              <div className="eyebrow">
                ASK MAUKSH AI
              </div>

              <h2>
                Ask questions
                <br />
                that actually matter.
              </h2>
            </div>

            <div className="ai-mark">
              ✦
            </div>

          </div>


          <div className="chat-box">

            <div className="message user-message">
              Should I change my job this year?
            </div>

            <div className="message ai-message">

              <div className="ai-label">
                MAUKSH AI
              </div>

              Based on your numerology profile, your current
              numbers indicate a period where professional
              changes can be considered carefully.

              <br />
              <br />

              Rather than making a sudden move, focus on
              opportunities that offer better responsibility,
              stability and long-term growth.

            </div>

            <div className="chat-input">

              <span>
                Ask Mauksh AI anything...
              </span>

              <div className="send-button">
                →
              </div>

            </div>

          </div>

        </section>


        {/* HOW IT WORKS */}
        <section className="how-section">

          <div className="eyebrow">
            HOW IT WORKS
          </div>

          <h2>
            Start in
            <br />
            <span>three steps.</span>
          </h2>


          <div className="steps">

            <div className="step">

              <div className="step-number">
                1
              </div>

              <div>
                <h3>
                  Create your profile
                </h3>

                <p>
                  Enter your name and date of birth.
                </p>
              </div>

            </div>


            <div className="step">

              <div className="step-number">
                2
              </div>

              <div>
                <h3>
                  Discover your numbers
                </h3>

                <p>
                  Get your personalized Vedic numerology profile.
                </p>
              </div>

            </div>


            <div className="step">

              <div className="step-number">
                3
              </div>

              <div>
                <h3>
                  Ask Mauksh AI
                </h3>

                <p>
                  Ask your first question free and continue
                  with your personal AI companion.
                </p>
              </div>

            </div>

          </div>

        </section>


        {/* CTA */}
        <section className="cta-section">

          <div className="cta-card">

            <div className="eyebrow">
              MAUKSH AI
            </div>

            <h2>
              Ready to understand
              <br />
              your numbers?
            </h2>

            <p>
              Create your free numerology profile and ask
              Mauksh AI your first question.
            </p>

            <Link
              href="/numerology-ai"
              className="cta-button"
            >
              Start Free
              <span>→</span>
            </Link>

            <div className="cta-note">
              Your first AI question is free.
            </div>

          </div>

        </section>


        {/* EXISTING TOOLS */}
        <section className="tools-section">

          <div className="eyebrow">
            FREE MAUKSH TOOLS
          </div>

          <h2>
            Explore Numerology
          </h2>

          <div className="tools-grid">

            <Link
              href="/numerology"
              className="tool-card"
            >
              <span>03</span>

              <h3>
                Vedic Numerology
              </h3>

              <p>
                Generate your Vedic numerology grid and
                explore your number patterns.
              </p>

              <strong>
                Explore →
              </strong>
            </Link>


            <Link
              href="/numerologyreport"
              className="tool-card"
            >
              <span>09</span>

              <h3>
                Full Numerology Report
              </h3>

              <p>
                Generate a detailed numerology report based
                on your name and date of birth.
              </p>

              <strong>
                Generate →
              </strong>
            </Link>


            <Link
              href="/name-checker"
              className="tool-card"
            >
              <span>05</span>

              <h3>
                Name Checker
              </h3>

              <p>
                Check your name number and explore its
                numerological significance.
              </p>

              <strong>
                Check Name →
              </strong>
            </Link>

          </div>

        </section>

      </main>


      <style jsx>{`

        * {
          box-sizing: border-box;
        }


        .mauksh-home {
          min-height: 100vh;
          background: #f8f5ef;
          color: #29251f;
        }


        /* =========================
           HERO
        ========================= */

        .hero {
          min-height: 680px;

          display: flex;
          align-items: center;

          background:
            radial-gradient(
              circle at 75% 25%,
              rgba(194, 148, 71, .14),
              transparent 35%
            );

          border-bottom: 1px solid #ded6c9;
        }


        .hero-content {
          width: 100%;
          max-width: 1100px;

          margin: 0 auto;

          padding: 100px 28px 90px;
        }


        .eyebrow {
          color: #a87935;

          font-size: 11px;
          font-weight: 700;

          letter-spacing: 3px;

          margin-bottom: 20px;
        }


        .hero h1 {
          margin: 0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: clamp(48px, 7vw, 88px);

          line-height: .98;

          font-weight: 500;

          letter-spacing: -4px;
        }


        .hero h1 span,
        .section-heading h2 span,
        .how-section h2 span {
          color: #a87935;
        }


        .hero-text {
          max-width: 590px;

          margin: 30px 0 0;

          color: #71695e;

          font-size: 18px;

          line-height: 1.7;
        }


        .hero-buttons {
          display: flex;

          gap: 12px;

          margin-top: 36px;

          flex-wrap: wrap;
        }


        .primary-button,
        .secondary-button,
        .cta-button {
          display: inline-flex;

          align-items: center;
          justify-content: center;

          gap: 18px;

          min-height: 54px;

          padding: 0 24px;

          border-radius: 10px;

          text-decoration: none;

          font-size: 14px;
          font-weight: 600;

          transition:
            transform .2s ease,
            background .2s ease;
        }


        .primary-button {
          background: #29251f;
          color: white;
        }


        .primary-button:hover,
        .cta-button:hover {
          transform: translateY(-2px);
        }


        .primary-button span,
        .cta-button span {
          color: #d6ae63;
          font-size: 18px;
        }


        .secondary-button {
          border: 1px solid #cfc5b5;

          background: #fffdf9;

          color: #29251f;
        }


        .secondary-button:hover {
          background: #f0e9de;
        }


        .free-note {
          margin-top: 17px;

          color: #81786d;

          font-size: 12px;
        }


        /* =========================
           AI SECTION
        ========================= */

        .ai-section {
          max-width: 1100px;

          margin: 0 auto;

          padding: 110px 28px;
        }


        .section-heading {
          max-width: 650px;
        }


        .section-heading h2,
        .chat-header h2,
        .how-section h2,
        .tools-section h2 {
          margin: 0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-weight: 500;

          letter-spacing: -1.8px;
        }


        .section-heading h2 {
          font-size: clamp(38px, 5vw, 62px);

          line-height: 1.02;
        }


        .section-heading p {
          max-width: 600px;

          margin-top: 22px;

          color: #756e64;

          line-height: 1.7;

          font-size: 16px;
        }


        .feature-grid {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 14px;

          margin-top: 55px;
        }


        .feature-card {
          min-height: 300px;

          padding: 28px;

          background: #fffdf9;

          border: 1px solid #ded6c9;

          border-radius: 16px;

          position: relative;
        }


        .feature-card.featured {
          background: #29251f;

          color: white;

          border-color: #29251f;
        }


        .feature-number {
          color: #9b9285;

          font-size: 11px;

          letter-spacing: 1px;
        }


        .featured .feature-number {
          color: #bca878;
        }


        .feature-icon {
          width: 50px;
          height: 50px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-top: 45px;

          border-radius: 50%;

          background: #f1e7d5;

          color: #a87935;

          font-family: Georgia, serif;

          font-size: 23px;
        }


        .featured .feature-icon {
          background: #a87935;
          color: white;
        }


        .feature-card h3 {
          margin: 23px 0 10px;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 23px;

          font-weight: 500;
        }


        .feature-card p {
          margin: 0;

          color: #756e64;

          font-size: 14px;

          line-height: 1.7;
        }


        .featured p {
          color: #c5bfb5;
        }


        /* =========================
           CHAT
        ========================= */

        .chat-section {
          max-width: 1100px;

          margin: 0 auto;

          padding: 20px 28px 110px;
        }


        .chat-header {
          display: flex;

          align-items: flex-end;
          justify-content: space-between;

          gap: 30px;
        }


        .chat-header h2 {
          font-size: clamp(38px, 5vw, 60px);

          line-height: 1.02;
        }


        .ai-mark {
          width: 75px;
          height: 75px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border: 1px solid #d1b277;

          border-radius: 50%;

          color: #a87935;

          font-size: 28px;
        }


        .chat-box {
          max-width: 760px;

          margin: 50px auto 0;

          padding: 22px;

          background: #29251f;

          border-radius: 20px;

          box-shadow:
            0 20px 60px rgba(50, 40, 25, .13);
        }


        .message {
          max-width: 80%;

          padding: 16px 18px;

          border-radius: 14px;

          font-size: 14px;

          line-height: 1.65;
        }


        .user-message {
          margin-left: auto;

          background: #a87935;

          color: white;

          border-bottom-right-radius: 4px;
        }


        .ai-message {
          margin-top: 15px;

          background: #fffdf9;

          color: #29251f;

          border-bottom-left-radius: 4px;
        }


        .ai-label {
          margin-bottom: 8px;

          color: #a87935;

          font-size: 10px;

          font-weight: 700;

          letter-spacing: 1.5px;
        }


        .chat-input {
          display: flex;

          align-items: center;
          justify-content: space-between;

          gap: 15px;

          height: 54px;

          margin-top: 18px;

          padding: 0 8px 0 17px;

          background: #3a352e;

          border: 1px solid #514b42;

          border-radius: 12px;

          color: #a9a298;

          font-size: 13px;
        }


        .send-button {
          width: 40px;
          height: 40px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 9px;

          background: #a87935;

          color: white;

          font-size: 18px;
        }


        /* =========================
           HOW IT WORKS
        ========================= */

        .how-section {
          max-width: 1100px;

          margin: 0 auto;

          padding: 20px 28px 110px;
        }


        .how-section h2 {
          font-size: clamp(40px, 5vw, 62px);

          line-height: 1;
        }


        .steps {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 15px;

          margin-top: 55px;
        }


        .step {
          display: flex;

          gap: 18px;

          padding: 25px;

          background: #fffdf9;

          border-top: 1px solid #cdbb99;

          border-bottom: 1px solid #ded6c9;
        }


        .step-number {
          width: 38px;
          height: 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border-radius: 50%;

          background: #f0e6d3;

          color: #8e672e;

          font-weight: 600;
        }


        .step h3 {
          margin: 0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 19px;

          font-weight: 500;
        }


        .step p {
          margin: 7px 0 0;

          color: #756e64;

          font-size: 13px;

          line-height: 1.6;
        }


        /* =========================
           CTA
        ========================= */

        .cta-section {
          padding: 20px 20px 110px;
        }


        .cta-card {
          max-width: 1000px;

          margin: 0 auto;

          padding: 75px 30px;

          text-align: center;

          background:
            radial-gradient(
              circle at center,
              rgba(193, 147, 67, .18),
              transparent 60%
            ),
            #29251f;

          border-radius: 22px;

          color: white;
        }


        .cta-card .eyebrow {
          color: #d6ae63;
        }


        .cta-card h2 {
          margin: 0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: clamp(38px, 5vw, 62px);

          line-height: 1;

          font-weight: 500;

          letter-spacing: -2px;
        }


        .cta-card p {
          max-width: 550px;

          margin: 22px auto 30px;

          color: #c4beb4;

          font-size: 15px;

          line-height: 1.7;
        }


        .cta-button {
          background: #d0a552;

          color: #29251f;
        }


        .cta-note {
          margin-top: 14px;

          color: #918a81;

          font-size: 11px;
        }


        /* =========================
           TOOLS
        ========================= */

        .tools-section {
          max-width: 1100px;

          margin: 0 auto;

          padding: 0 28px 110px;
        }


        .tools-section h2 {
          font-size: 48px;

          line-height: 1;
        }


        .tools-grid {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 14px;

          margin-top: 40px;
        }


        .tool-card {
          display: block;

          padding: 28px;

          background: #fffdf9;

          border: 1px solid #ded6c9;

          border-radius: 15px;

          color: #29251f;

          text-decoration: none;

          transition:
            transform .2s ease,
            border-color .2s ease;
        }


        .tool-card:hover {
          transform: translateY(-3px);

          border-color: #b99a62;
        }


        .tool-card > span {
          color: #a87935;

          font-size: 11px;

          letter-spacing: 2px;
        }


        .tool-card h3 {
          margin: 35px 0 10px;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 23px;

          font-weight: 500;
        }


        .tool-card p {
          margin: 0;

          color: #756e64;

          font-size: 13px;

          line-height: 1.7;
        }


        .tool-card strong {
          display: inline-block;

          margin-top: 22px;

          color: #9b702d;

          font-size: 12px;
        }


        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 700px) {

          .hero {
            min-height: auto;
          }


          .hero-content {
            padding:
              70px 20px
              70px;
          }


          .hero h1 {
            font-size: 52px;

            letter-spacing: -2.5px;
          }


          .hero-text {
            font-size: 15px;
          }


          .hero-buttons {
            flex-direction: column;
          }


          .primary-button,
          .secondary-button {
            width: 100%;
          }


          .ai-section,
          .chat-section,
          .how-section,
          .tools-section {
            padding-left: 20px;
            padding-right: 20px;
          }


          .feature-grid,
          .steps,
          .tools-grid {
            grid-template-columns: 1fr;
          }


          .feature-card {
            min-height: 270px;
          }


          .chat-header {
            align-items: flex-start;
          }


          .ai-mark {
            width: 55px;
            height: 55px;

            font-size: 22px;
          }


          .message {
            max-width: 92%;
          }


          .cta-card {
            padding:
              60px 22px;
          }


          .cta-card h2 {
            font-size: 42px;
          }


          .tools-section h2 {
            font-size: 40px;
          }

        }


        @media (max-width: 380px) {

          .hero h1 {
            font-size: 45px;
          }


          .section-heading h2,
          .chat-header h2,
          .how-section h2 {
            font-size: 40px;
          }

        }

      `}</style>
    </>
  );
}