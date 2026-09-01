"use client";

import { useState } from "react";

export default function Home() {
  const [date, setDate] = useState("2026-09-01");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");

  const formattedDate = new Date(date + "T00:00:00").toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  function detectLocation() {
    if (!navigator.geolocation) {
      alert("Location detection is not supported on this device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const data = await response.json();

          const detectedCity =
            data?.address?.city ||
            data?.address?.town ||
            data?.address?.village ||
            data?.address?.municipality ||
            "";

          setCity(detectedCity);
          setLocation(detectedCity);
        } catch {
          setLocation("Location detected");
        }
      },
      () => {
        alert("Unable to detect your location.");
      }
    );
  }

  function viewPanchang() {
    if (!city.trim()) {
      alert("Please enter your city.");
      return;
    }

    setLocation(city.trim());
  }

  return (
    <>
      <main className="panchang-page">

        {/* PAGE INTRO */}

        <section className="panchang-hero">
          <p className="eyebrow">
            DAILY VEDIC PANCHANG
          </p>

          <h1>
            Daily
            <br />
            Panchang
          </h1>

          <p className="date-line">
            {formattedDate}
          </p>
        </section>

        {/* DATE & LOCATION */}

        <section className="location-section">

          <h2>DATE &amp; LOCATION</h2>

          <div className="form">

            <div className="date-field">
              <label htmlFor="date">Date</label>

              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="city-field">
              <label htmlFor="city">Location</label>

              <div className="city-row">
                <input
                  id="city"
                  type="text"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />

                <button
                  type="button"
                  onClick={detectLocation}
                  className="secondary-button"
                >
                  Detect
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={viewPanchang}
              className="primary-button"
            >
              View Panchang
            </button>

          </div>

          {location && (
            <div className="selected-location">
              Panchang location: <strong>{location}</strong>
            </div>
          )}

        </section>

      </main>

      <style jsx>{`

        /* =========================
           PANCHANG PAGE ONLY
           ========================= */

        .panchang-page {
          min-height: calc(100vh - 118px);
          background: #f7f2e8;
        }

        .panchang-hero {
          max-width: 1200px;
          margin: 0 auto;
          padding: 70px 42px 55px;
        }

        .eyebrow {
          margin: 0 0 55px;
          color: #a47735;
          font-size: 17px;
          font-weight: 600;
          letter-spacing: 5px;
        }

        h1 {
          margin: 0;
          font-family: "Playfair Display", serif;
          font-size: clamp(76px, 11vw, 150px);
          line-height: 0.88;
          letter-spacing: -5px;
          font-weight: 600;
        }

        .date-line {
          margin: 50px 0 0;
          color: #766e64;
          font-size: 27px;
          line-height: 1.4;
        }

        .location-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 42px 100px;
        }

        .location-section h2 {
          margin: 0 0 28px;
          font-size: 19px;
          font-weight: 600;
          letter-spacing: 3px;
        }

        .form {
          max-width: 850px;
        }

        .date-field,
        .city-field {
          margin-bottom: 24px;
        }

        label {
          display: block;
          margin-bottom: 9px;
          color: #766e64;
          font-size: 14px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        input {
          width: 100%;
          height: 68px;
          padding: 0 22px;
          border: 1px solid #d8cebd;
          border-radius: 34px;
          background: #fcfaf5;
          color: #211d19;
          font-family: inherit;
          font-size: 20px;
          outline: none;
          transition: border-color 0.2s ease;
        }

        input:focus {
          border-color: #a47735;
        }

        input::placeholder {
          color: #a79f94;
        }

        /* Clean native date input */

        input[type="date"] {
          appearance: none;
          -webkit-appearance: none;
          min-height: 68px;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
          width: 20px;
          height: 20px;
          cursor: pointer;
          opacity: 0.65;
        }

        .city-row {
          display: grid;
          grid-template-columns: 1fr 150px;
          gap: 14px;
        }

        button {
          font-family: inherit;
          cursor: pointer;
        }

        .secondary-button {
          height: 68px;
          border: 1px solid #d8cebd;
          border-radius: 34px;
          background: #fcfaf5;
          color: #211d19;
          font-size: 18px;
          font-weight: 600;
        }

        .secondary-button:hover {
          background: #f0e9dc;
        }

        .primary-button {
          width: 100%;
          height: 70px;
          margin-top: 10px;
          border: 0;
          border-radius: 35px;
          background: #211d19;
          color: #f7f2e8;
          font-size: 19px;
          font-weight: 600;
          letter-spacing: 0.2px;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .primary-button:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .selected-location {
          margin-top: 28px;
          color: #766e64;
          font-size: 16px;
        }

        .selected-location strong {
          color: #211d19;
        }

        @media (max-width: 700px) {

          .panchang-page {
            min-height: calc(100vh - 105px);
          }

          .panchang-hero {
            padding: 58px 28px 45px;
          }

          .eyebrow {
            margin-bottom: 48px;
            font-size: 13px;
            letter-spacing: 3.5px;
          }

          h1 {
            font-size: clamp(68px, 20vw, 105px);
            line-height: 0.9;
            letter-spacing: -3px;
          }

          .date-line {
            margin-top: 35px;
            font-size: 21px;
          }

          .location-section {
            padding: 10px 28px 80px;
          }

          .location-section h2 {
            margin-bottom: 24px;
            font-size: 17px;
            letter-spacing: 2px;
          }

          .city-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          input,
          .secondary-button {
            height: 64px;
          }

          .primary-button {
            height: 66px;
          }
        }

      `}</style>
    </>
  );
}