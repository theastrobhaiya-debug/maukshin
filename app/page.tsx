"use client";

import { useEffect, useState } from "react";

const API_BASE =
  "https://mauksh-kundali-engine.onrender.com";

type LocationState = {
  city: string;
  latitude: number | null;
  longitude: number | null;
};

export default function Home() {
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [locationDisplay, setLocationDisplay] = useState(
    "Enter a city or detect your location."
  );

  const [selectedLocation, setSelectedLocation] =
    useState<LocationState>({
      city: "",
      latitude: null,
      longitude: null,
    });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const d = new Date();

    const today =
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0");

    setDate(today);
  }, []);

  async function detectLocation() {
    setError("");

    if (!navigator.geolocation) {
      setError(
        "Location detection is not supported by your browser."
      );
      return;
    }

    setLocationDisplay("Detecting your location…");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const result = await response.json();

          const address = result.address || {};

          const detectedCity =
            address.city ||
            address.town ||
            address.village ||
            address.municipality ||
            "Current location";

          setCity(detectedCity);

          setSelectedLocation({
            city: detectedCity,
            latitude,
            longitude,
          });

          setLocationDisplay(detectedCity);
        } catch {
          setSelectedLocation({
            city: "Current location",
            latitude,
            longitude,
          });

          setLocationDisplay("Location detected.");
        }
      },
      () => {
        setLocationDisplay(
          "Unable to detect location. Enter your city."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }

  async function findCity(cityName: string) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
        cityName
      )}`
    );

    if (!response.ok) {
      throw new Error("Unable to find this city.");
    }

    const results = await response.json();

    if (!results.length) {
      throw new Error(
        "City not found. Please check the city name."
      );
    }

    return {
      city: results[0].display_name.split(",")[0],
      latitude: parseFloat(results[0].lat),
      longitude: parseFloat(results[0].lon),
    };
  }

  async function loadPanchang() {
    setError("");

    if (!date) {
      setError("Please select a date.");
      return;
    }

    if (
      !city.trim() &&
      selectedLocation.latitude === null
    ) {
      setError("Please enter a city or use Detect.");
      return;
    }

    setLoading(true);
    setData(null);

    try {
      let location = selectedLocation;

      if (city.trim()) {
        location = await findCity(city.trim());

        setSelectedLocation(location);
        setCity(location.city);
        setLocationDisplay(location.city);
      }

      const timezone =
        Intl.DateTimeFormat().resolvedOptions().timeZone ||
        "Asia/Kolkata";

      const params = new URLSearchParams({
        date,
        latitude: String(location.latitude),
        longitude: String(location.longitude),
        timezone,
      });

      const response = await fetch(
        `${API_BASE}/api/panchang?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(
          "Panchang engine returned an error."
        );
      }

      const result = await response.json();

      setData(result);
    } catch (err: any) {
      console.error(err);

      setError(
        err?.message ||
          "Unable to load Panchang."
      );
    } finally {
      setLoading(false);
    }
  }

  function formatDate(value: string) {
    if (!value) return "";

    const d = new Date(`${value}T00:00:00`);

    return d.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function value(
    item: any,
    key: string
  ) {
    return item?.[key] || "—";
  }

  function renderChoghadiya(items: any[]) {
    if (!Array.isArray(items) || items.length === 0) {
      return (
        <div className="empty-output">
          No data available.
        </div>
      );
    }

    return (
      <div className="choghadiya-list">
        {items.map((item, index) => (
          <div
            className="choghadiya-row"
            key={index}
          >
            <div className="choghadiya-name">
              {item?.name || "—"}
            </div>

            <div className="choghadiya-time">
              {item?.start || "—"}
              <span className="time-dash">
                {" "}
                –{" "}
              </span>
              {item?.end || "—"}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <main className="panchang-page">

        {/* HERO */}

        <section className="hero">
          <div className="eyebrow">
            DAILY VEDIC PANCHANG
          </div>

          <h1>
            Daily
            <br />
            Panchang
          </h1>

          <p>
            {formatDate(date)}
          </p>
        </section>

        {/* INPUT
            DO NOT CHANGE THIS CSS BLOCK */}

        <section className="controls">

          <div className="field">
            <label>DATE</label>

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
            />
          </div>

          <div className="field">
            <label>LOCATION</label>

            <div className="location-row">
              <input
                type="text"
                value={city}
                placeholder="Enter city name"
                onChange={(e) =>
                  setCity(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    loadPanchang();
                  }
                }}
              />

              <button
                type="button"
                className="detect"
                onClick={detectLocation}
              >
                Detect
              </button>
            </div>

            <div className="location-display">
              {locationDisplay}
            </div>
          </div>

          <button
            type="button"
            onClick={loadPanchang}
          >
            View Panchang
          </button>

        </section>

        {/* STATUS */}

        {loading && (
          <div className="loading">
            Calculating Panchang…
          </div>
        )}

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {/* OUTPUT */}

        {data && !loading && (
          <div className="output">

            {/* DATE */}

            <div className="date-card">
              <div className="date-label">
                PANCHANG FOR
              </div>

              <div className="date-value">
                {formatDate(date)}
              </div>

              <div className="date-location">
                {selectedLocation.city}
              </div>
            </div>

            {/* PANCHANG */}

            <section className="section">

              <div className="section-heading">
                <h2>Panchang</h2>
              </div>

              <div className="panchang-grid">

                <div className="panchang-card">
                  <div className="panchang-icon">
                    ☀️
                  </div>

                  <div className="panchang-label">
                    Vara
                  </div>

                  <div className="panchang-value">
                    {value(data.vara, "name")}
                  </div>
                </div>

                <div className="panchang-card">
                  <div className="panchang-icon">
                    ☾
                  </div>

                  <div className="panchang-label">
                    Tithi
                  </div>

                  <div className="panchang-value">
                    {value(data.tithi, "name")}
                  </div>

                  {data.tithi?.ends && (
                    <div className="panchang-end">
                      Ends {data.tithi.ends}
                    </div>
                  )}
                </div>

                <div className="panchang-card">
                  <div className="panchang-icon">
                    ✦
                  </div>

                  <div className="panchang-label">
                    Nakshatra
                  </div>

                  <div className="panchang-value">
                    {value(
                      data.nakshatra,
                      "name"
                    )}
                  </div>

                  {data.nakshatra?.ends && (
                    <div className="panchang-end">
                      Ends {data.nakshatra.ends}
                    </div>
                  )}
                </div>

                <div className="panchang-card">
                  <div className="panchang-icon">
                    ✧
                  </div>

                  <div className="panchang-label">
                    Yoga
                  </div>

                  <div className="panchang-value">
                    {value(data.yoga, "name")}
                  </div>

                  {data.yoga?.ends && (
                    <div className="panchang-end">
                      Ends {data.yoga.ends}
                    </div>
                  )}
                </div>

                <div className="panchang-card">
                  <div className="panchang-icon">
                    ◐
                  </div>

                  <div className="panchang-label">
                    Karana
                  </div>

                  <div className="panchang-value">
                    {value(data.karana, "name")}
                  </div>

                  {data.karana?.ends && (
                    <div className="panchang-end">
                      Ends {data.karana.ends}
                    </div>
                  )}
                </div>

              </div>
            </section>

            {/* SUN & MOON */}

            <section className="section">

              <div className="section-heading">
                <h2>Sun & Moon</h2>
              </div>

              <div className="grid">

                <div className="card">
                  <div className="card-title">
                    Sun
                  </div>

                  <div className="time-list">

                    <div className="time-row">
                      <span>
                        Sunrise
                      </span>

                      <strong>
                        {data.sun?.rise || "—"}
                      </strong>
                    </div>

                    <div className="time-row">
                      <span>
                        Sunset
                      </span>

                      <strong>
                        {data.sun?.set || "—"}
                      </strong>
                    </div>

                  </div>
                </div>

                <div className="card">
                  <div className="card-title">
                    Moon
                  </div>

                  <div className="time-list">

                    <div className="time-row">
                      <span>
                        Moonrise
                      </span>

                      <strong>
                        {data.moon?.rise || "—"}
                      </strong>
                    </div>

                    <div className="time-row">
                      <span>
                        Moonset
                      </span>

                      <strong>
                        {data.moon?.set || "—"}
                      </strong>
                    </div>

                  </div>
                </div>

              </div>
            </section>

            {/* SHUBH ASHUBH */}

            <section className="section">

              <div className="section-heading">
                <h2>
                  Shubh & Ashubh Kaal
                </h2>
              </div>

              <div className="grid grid-three">

                <div className="card">
                  <div className="card-label">
                    Rahu Kaal
                  </div>
                  <div className="card-value">
                    {data.timings?.rahuKaal || "—"}
                  </div>
                </div>

                <div className="card">
                  <div className="card-label">
                    Yamaganda
                  </div>
                  <div className="card-value">
                    {data.timings?.yamaganda || "—"}
                  </div>
                </div>

                <div className="card">
                  <div className="card-label">
                    Gulika Kaal
                  </div>
                  <div className="card-value">
                    {data.timings?.gulika || "—"}
                  </div>
                </div>

                <div className="card">
                  <div className="card-label">
                    Abhijit Muhurat
                  </div>
                  <div className="card-value">
                    {data.timings?.abhijit || "—"}
                  </div>
                </div>

                <div className="card">
                  <div className="card-label">
                    Brahma Muhurat
                  </div>
                  <div className="card-value">
                    {data.timings?.brahma || "—"}
                  </div>
                </div>

              </div>
            </section>

            {/* CHOGHADIYA */}

            <section className="section">

              <div className="section-heading">
                <h2>Choghadiya</h2>
              </div>

              <div className="choghadiya-grid">

                <div className="choghadiya-card">

                  <div className="choghadiya-title">
                    Day Choghadiya
                  </div>

                  {renderChoghadiya(
                    data.choghadiya?.day
                  )}

                </div>

                <div className="choghadiya-card">

                  <div className="choghadiya-title">
                    Night Choghadiya
                  </div>

                  {renderChoghadiya(
                    data.choghadiya?.night
                  )}

                </div>

              </div>

            </section>

            {/* ADDITIONAL */}

            <section className="section">

              <div className="section-heading">
                <h2>
                  Additional Panchang
                </h2>
              </div>

              <div className="grid grid-three">

                <div className="card">
                  <div className="card-label">
                    Ayana
                  </div>
                  <div className="card-value">
                    {data.ayana || "—"}
                  </div>
                </div>

                <div className="card">
                  <div className="card-label">
                    Ritu
                  </div>
                  <div className="card-value">
                    {data.ritu || "—"}
                  </div>
                </div>

                <div className="card">
                  <div className="card-label">
                    Paksha
                  </div>
                  <div className="card-value">
                    {data.paksha || "—"}
                  </div>
                </div>

                <div className="card">
                  <div className="card-label">
                    Masa
                  </div>
                  <div className="card-value">
                    {data.masa || "—"}
                  </div>
                </div>

                <div className="card">
                  <div className="card-label">
                    Vikram Samvat
                  </div>
                  <div className="card-value">
                    {data.vikramSamvat || "—"}
                  </div>
                </div>

                <div className="card">
                  <div className="card-label">
                    Shaka Samvat
                  </div>
                  <div className="card-value">
                    {data.shakaSamvat || "—"}
                  </div>
                </div>

                <div className="card">
                  <div className="card-label">
                    Sun Rashi
                  </div>
                  <div className="card-value">
                    {data.sun?.rashi?.name || "—"}
                  </div>
                </div>

                <div className="card">
                  <div className="card-label">
                    Moon Rashi
                  </div>
                  <div className="card-value">
                    {data.moon?.rashi?.name || "—"}
                  </div>
                </div>

                <div className="card">
                  <div className="card-label">
                    Moon Nakshatra Pada
                  </div>
                  <div className="card-value">
                    {data.moon?.nakshatra?.pada
                      ? `Pada ${data.moon.nakshatra.pada}`
                      : "—"}
                  </div>
                </div>

              </div>
            </section>

          </div>
        )}

      </main>

      {/* PAGE CSS — INPUT STYLING PRESERVED */}

      <style jsx>{`

        /* ======================================
           PAGE BASE
           ====================================== */

        .panchang-page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 42px 20px 80px;
        }

        .hero {
          margin-bottom: 34px;
        }

        .eyebrow {
          color: #a87935;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 3px;
          margin-bottom: 26px;
        }

        .hero h1 {
          margin: 0;
          font-family: Georgia, serif;
          font-size: clamp(58px, 8vw, 92px);
          line-height: .88;
          letter-spacing: -4px;
          font-weight: 600;
        }

        .hero p {
          margin: 28px 0 0;
          color: #756f64;
          font-size: 21px;
        }

        /* ======================================
           INPUT — DO NOT CHANGE
           ====================================== */

        .controls {
          background: #fffdf9;
          border: 1px solid #e6ded1;
          border-radius: 16px;
          padding: 18px;

          display: grid;
          grid-template-columns: 1fr 1.4fr auto;
          gap: 14px;

          margin-bottom: 30px;
        }

        .field label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .5px;
          color: #756f64;
          margin-bottom: 7px;
        }

        input {
          width: 100%;
          height: 44px;
          border: 1px solid #e6ded1;
          border-radius: 10px;
          background: white;
          padding: 0 12px;
          font-size: 14px;
          color: #29251f;
          outline: none;
        }

        input:focus {
          border-color: #a87935;
        }

        .location-row {
          display: flex;
          gap: 8px;
        }

        .location-row input {
          flex: 1;
        }

        button {
          height: 44px;
          border: 0;
          border-radius: 10px;
          background: #7b4b2a;
          color: white;
          padding: 0 20px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        button:hover {
          opacity: .92;
        }

        .detect {
          background: #f0e4d6;
          color: #7b4b2a;
          white-space: nowrap;
        }

        .location-display {
          margin-top: 7px;
          font-size: 11px;
          color: #756f64;
        }

        /* ======================================
           STATUS
           ====================================== */

        .loading,
        .error {
          padding: 15px 18px;
          border-radius: 12px;
          margin-bottom: 22px;
          text-align: center;
          font-size: 14px;
        }

        .loading {
          background: #f0e4d6;
          color: #7b4b2a;
        }

        .error {
          background: #f5e3df;
          color: #87372d;
        }

        /* ======================================
           OUTPUT
           ====================================== */

        .output {
          animation: fadeIn .35s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .date-card {
          background: #fffdf9;
          border: 1px solid #e6ded1;
          border-radius: 18px;
          padding: 22px 24px;
          margin-bottom: 34px;
        }

        .date-label,
        .card-label,
        .panchang-label {
          color: #756f64;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }

        .date-value {
          margin-top: 8px;
          font-family: Georgia, serif;
          font-size: 27px;
          font-weight: 600;
        }

        .date-location {
          margin-top: 5px;
          color: #756f64;
          font-size: 13px;
        }

        /* ======================================
           SECTIONS
           ====================================== */

        .section {
          margin-top: 42px;
        }

        .section-heading {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 20px;
        }

        .section-heading h2 {
          margin: 0;
          font-family: Georgia, serif;
          font-size: 32px;
          font-weight: 600;
          letter-spacing: -.8px;
          white-space: nowrap;
        }

        .section-heading::after {
          content: "";
          height: 1px;
          flex: 1;
          background: #e6ded1;
        }

        /* ======================================
           PANCHANG CARDS
           ====================================== */

        .panchang-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
        }

        .panchang-card {
          background: #fffdf9;
          border: 1px solid #e6ded1;
          border-radius: 16px;
          padding: 20px 14px;
          min-height: 150px;
        }

        .panchang-icon {
          font-size: 22px;
          margin-bottom: 15px;
        }

        .panchang-label {
          margin-bottom: 7px;
        }

        .panchang-value {
          font-size: 17px;
          font-weight: 700;
          line-height: 1.25;
        }

        .panchang-end {
          margin-top: 8px;
          color: #756f64;
          font-size: 11px;
          line-height: 1.35;
        }

        /* ======================================
           GENERAL CARDS
           ====================================== */

        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        .grid-three {
          grid-template-columns: repeat(3, 1fr);
        }

        .card {
          background: #fffdf9;
          border: 1px solid #e6ded1;
          border-radius: 16px;
          padding: 20px;
        }

        .card-title {
          font-family: Georgia, serif;
          font-size: 23px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .card-value {
          font-size: 17px;
          font-weight: 700;
          line-height: 1.45;
        }

        /* ======================================
           SUN / MOON
           ====================================== */

        .time-list {
          display: flex;
          flex-direction: column;
        }

        .time-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 13px 0;
          border-bottom: 1px solid #e6ded1;
          font-size: 14px;
        }

        .time-row:last-child {
          border-bottom: 0;
        }

        .time-row strong {
          color: #7b4b2a;
          font-size: 14px;
          text-align: right;
        }

        /* ======================================
           CHOGHADIYA
           ====================================== */

        .choghadiya-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .choghadiya-card {
          background: #fffdf9;
          border: 1px solid #e6ded1;
          border-radius: 18px;
          padding: 22px;
          overflow: hidden;
        }

        .choghadiya-title {
          font-family: Georgia, serif;
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .choghadiya-list {
          width: 100%;
        }

        .choghadiya-row {
          display: grid;
          grid-template-columns: minmax(80px, .65fr) minmax(180px, 1.35fr);
          align-items: center;
          gap: 15px;
          padding: 13px 0;
          border-bottom: 1px solid #e6ded1;
        }

        .choghadiya-row:last-child {
          border-bottom: 0;
        }

        .choghadiya-name {
          font-size: 14px;
          font-weight: 600;
        }

        .choghadiya-time {
          color: #7b4b2a;
          font-size: 13px;
          font-weight: 600;
          text-align: right;
          white-space: nowrap;
        }

        .time-dash {
          color: #756f64;
        }

        .empty-output {
          color: #756f64;
          font-size: 13px;
          padding: 12px 0;
        }

        /* ======================================
           MOBILE
           ====================================== */

        @media (max-width: 800px) {

          .panchang-page {
            padding: 34px 20px 70px;
          }

          .hero h1 {
            font-size: 64px;
            letter-spacing: -3px;
          }

          .hero p {
            font-size: 18px;
          }

          .controls {
            grid-template-columns: 1fr;
          }

          .panchang-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .grid,
          .grid-three {
            grid-template-columns: 1fr;
          }

          .choghadiya-grid {
            grid-template-columns: 1fr;
          }

          .section-heading h2 {
            font-size: 28px;
          }
        }

        @media (max-width: 520px) {

          .panchang-page {
            padding-left: 18px;
            padding-right: 18px;
          }

          .hero h1 {
            font-size: 56px;
          }

          .panchang-grid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .panchang-card {
            min-height: 145px;
            padding: 17px 13px;
          }

          .panchang-value {
            font-size: 16px;
          }

          .choghadiya-card {
            padding: 18px;
          }

          .choghadiya-row {
            grid-template-columns: 1fr;
            gap: 4px;
            padding: 12px 0;
          }

          .choghadiya-time {
            text-align: left;
            white-space: normal;
          }

          .section-heading h2 {
            font-size: 25px;
          }
        }

      `}</style>
    </>
  );
}