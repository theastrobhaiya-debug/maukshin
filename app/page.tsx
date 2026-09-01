"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();

    setDate(
      today.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  return (
    <div className="panchang-page">

      {/* PAGE HEADER */}
      <section className="panchang-hero">

        <div className="panchang-eyebrow">
          KAALDARPAN · VEDIC ASTROLOGY
        </div>

        <h1>Daily Panchang</h1>

        <p>
          Today's Vedic Panchang
        </p>

        <div className="panchang-date">
          {date || "Loading date..."}
        </div>

      </section>


      {/* LOCATION */}
      <section className="panchang-location">

        <div className="location-label">
          YOUR LOCATION
        </div>

        <div className="location-row">

          <input
            type="text"
            placeholder="Enter city"
            className="location-input"
          />

          <button className="location-button">
            Detect
          </button>

        </div>

      </section>


      {/* MAIN PANCHANG */}
      <section className="panchang-content">

        {/* TITHI */}
        <article className="panchang-card featured">

          <div className="card-label">
            TITHI
          </div>

          <div className="card-value">
            Shukla Panchami
          </div>

          <div className="card-detail">
            Until 06:42 PM
          </div>

        </article>


        {/* NAKSHATRA */}
        <article className="panchang-card">

          <div className="card-label">
            NAKSHATRA
          </div>

          <div className="card-value">
            Uttara Phalguni
          </div>

          <div className="card-detail">
            Until 08:15 PM
          </div>

        </article>


        {/* YOGA */}
        <article className="panchang-card">

          <div className="card-label">
            YOGA
          </div>

          <div className="card-value">
            Saubhagya
          </div>

          <div className="card-detail">
            Until 04:31 PM
          </div>

        </article>


        {/* KARANA */}
        <article className="panchang-card">

          <div className="card-label">
            KARANA
          </div>

          <div className="card-value">
            Taitila
          </div>

          <div className="card-detail">
            Until 06:42 PM
          </div>

        </article>

      </section>


      {/* SUN & MOON */}
      <section className="astronomical-section">

        <div className="section-heading">
          <span>ASTRONOMICAL TIMINGS</span>
          <h2>Sun & Moon</h2>
        </div>


        <div className="timing-grid">

          <div className="timing-card">

            <div className="timing-icon">
              ☀
            </div>

            <div>
              <span>Sunrise</span>
              <strong>06:12 AM</strong>
            </div>

          </div>


          <div className="timing-card">

            <div className="timing-icon">
              ☀
            </div>

            <div>
              <span>Sunset</span>
              <strong>06:43 PM</strong>
            </div>

          </div>


          <div className="timing-card">

            <div className="timing-icon">
              ☾
            </div>

            <div>
              <span>Moonrise</span>
              <strong>10:21 AM</strong>
            </div>

          </div>


          <div className="timing-card">

            <div className="timing-icon">
              ☽
            </div>

            <div>
              <span>Moonset</span>
              <strong>10:42 PM</strong>
            </div>

          </div>

        </div>

      </section>


      {/* MUHURAT */}
      <section className="muhurat-section">

        <div className="section-heading">
          <span>AUSPICIOUS & INAUSPICIOUS</span>
          <h2>Today's Timings</h2>
        </div>


        <div className="muhurat-grid">

          <div className="muhurat-card good">

            <div className="muhurat-title">
              Abhijit Muhurat
            </div>

            <div className="muhurat-time">
              11:58 AM – 12:48 PM
            </div>

            <div className="muhurat-status">
              Auspicious
            </div>

          </div>


          <div className="muhurat-card">

            <div className="muhurat-title">
              Rahu Kalam
            </div>

            <div className="muhurat-time">
              03:15 PM – 04:47 PM
            </div>

            <div className="muhurat-status">
              Avoid important work
            </div>

          </div>


          <div className="muhurat-card">

            <div className="muhurat-title">
              Yamaganda
            </div>

            <div className="muhurat-time">
              09:15 AM – 10:47 AM
            </div>

            <div className="muhurat-status">
              Avoid important work
            </div>

          </div>


          <div className="muhurat-card">

            <div className="muhurat-title">
              Gulika Kalam
            </div>

            <div className="muhurat-time">
              12:19 PM – 01:51 PM
            </div>

            <div className="muhurat-status">
              Traditionally avoided
            </div>

          </div>

        </div>

      </section>


      {/* DAY SUMMARY */}
      <section className="panchang-summary">

        <div className="summary-inner">

          <div className="summary-symbol">
            ✦
          </div>

          <div>

            <div className="summary-label">
              TODAY IN VEDIC CALENDAR
            </div>

            <h2>
              A day to move with awareness.
            </h2>

            <p>
              Panchang reflects the five key limbs of
              the Vedic calendar — Tithi, Nakshatra,
              Yoga, Karana and Vara.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}