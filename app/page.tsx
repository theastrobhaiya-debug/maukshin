"use client";

import { useState } from "react";

const API_BASE = "https://mauksh-kundali-engine.onrender.com";

type LocationData = {
  city: string;
  latitude: number | null;
  longitude: number | null;
};

function getToday() {
  const d = new Date();

  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function display(value: any) {
  if (value === undefined || value === null || value === "") {
    return "—";
  }

  return String(value);
}

export default function Home() {
  const [date, setDate] = useState(getToday());

  const [city, setCity] = useState("");

  const [location, setLocation] = useState<LocationData>({
    city: "",
    latitude: null,
    longitude: null,
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [panchang, setPanchang] = useState<any>(null);

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
      throw new Error("City not found. Please check the city name.");
    }

    return {
      city: results[0].display_name.split(",")[0],
      latitude: Number(results[0].lat),
      longitude: Number(results[0].lon),
    };
  }

  function detectLocation() {
    setError("");

    if (!navigator.geolocation) {
      setError("Location detection is not supported by your browser.");
      return;
    }

    setCity("Detecting...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          if (!response.ok) {
            throw new Error("Unable to identify your location.");
          }

          const result = await response.json();

          const address = result.address || {};

          const detectedCity =
            address.city ||
            address.town ||
            address.village ||
            address.municipality ||
            "Current location";

          const newLocation = {
            city: detectedCity,
            latitude,
            longitude,
          };

          setLocation(newLocation);
          setCity(detectedCity);
        } catch {
          setCity("");
          setError("Location detected, but the city could not be identified.");
        }
      },
      () => {
        setCity("");
        setError(
          "Unable to detect your location. Please enter your city manually."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }

  async function loadPanchang() {
    setError("");
    setPanchang(null);

    if (!date) {
      setError("Please select a date.");
      return;
    }

    if (!city || city === "Detecting...") {
      if (location.latitude === null || location.longitude === null) {
        setError("Please enter a city or use Detect.");
        return;
      }
    }

    setLoading(true);

    try {
      let selectedLocation = location;

      if (city && city !== "Detecting...") {
        selectedLocation = await findCity(city);
        setLocation(selectedLocation);
      }

      if (
        selectedLocation.latitude === null ||
        selectedLocation.longitude === null
      ) {
        throw new Error("Please enter a valid city.");
      }

      const timezone =
        Intl.DateTimeFormat().resolvedOptions().timeZone ||
        "Asia/Kolkata";

      const params = new URLSearchParams();

      params.set("date", date);
      params.set("latitude", String(selectedLocation.latitude));
      params.set("longitude", String(selectedLocation.longitude));
      params.set("timezone", timezone);

      const response = await fetch(
        `${API_BASE}/api/panchang?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(
          `Panchang engine returned ${response.status}.`
        );
      }

      const result = await response.json();

      setPanchang(result);
    } catch (err: any) {
      console.error("Panchang error:", err);

      setError(
        err?.message ||
          "Unable to load Panchang. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function Choghadiya({ items }: { items: any }) {
    if (!Array.isArray(items) || items.length === 0) {
      return <div className="empty">No data available.</div>;
    }

    return (
      <div>
        {items.map((item: any, index: number) => (
          <div className="choghadiya-row" key={index}>
            <span>{display(item?.name)}</span>

            <strong>
              {display(item?.start)} – {display(item?.end)}
            </strong>
          </div>
        ))}
      </div>
    );
  }

  const timings = panchang?.timings || {};

  return (
    <>
      <main className="page">

        {/* HERO */}

        <section className="hero">
          <div className="eyebrow">DAILY VEDIC PANCHANG</div>

          <h1>Daily Panchang</h1>

          <p>
            Accurate Vedic Panchang for your date and location
          </p>
        </section>


        {/* SEARCH */}

        <section className="search-section">

          <div className="search-card">

            <div className="field">

              <label htmlFor="date">
                DATE
              </label>

              <div className="date-input-wrap">

                <span className="calendar-icon">
                  ◷
                </span>

                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setPanchang(null);
                    setError("");
                  }}
                />

              </div>

            </div>


            <div className="field location-field">

              <label htmlFor="city">
                LOCATION
              </label>

              <input
                id="city"
                type="text"
                value={city}
                placeholder="Enter city"
                onChange={(e) => {
                  setCity(e.target.value);

                  setLocation({
                    city: "",
                    latitude: null,
                    longitude: null,
                  });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    loadPanchang();
                  }
                }}
              />

            </div>


            <button
              type="button"
              className="detect-button"
              onClick={detectLocation}
            >
              Use my location
            </button>


            <button
              type="button"
              className="view-button"
              onClick={loadPanchang}
              disabled={loading}
            >
              {loading ? "Calculating..." : "View Panchang"}
            </button>

          </div>


          {location.city && (
            <div className="location-confirmed">
              <span>●</span>
              {location.city}
            </div>
          )}


          {error && (
            <div className="error">
              {error}
            </div>
          )}

        </section>


        {/* RESULTS */}

        {panchang && (

          <section className="results">

            <div className="date-summary">

              <div>

                <span className="summary-label">
                  PANCHANG FOR
                </span>

                <h2>
                  {formatDate(date)}
                </h2>

              </div>

              <div className="summary-location">
                {location.city}
              </div>

            </div>


            {/* PANCHANG */}

            <section className="section">

              <div className="section-title">
                <h2>Panchang</h2>
                <div />
              </div>


              <div className="panchang-grid">

                <PanchangCard
                  icon="☀"
                  label="Vara"
                  value={panchang?.vara?.name}
                />

                <PanchangCard
                  icon="☾"
                  label="Tithi"
                  value={panchang?.tithi?.name}
                  end={panchang?.tithi?.ends}
                />

                <PanchangCard
                  icon="✦"
                  label="Nakshatra"
                  value={panchang?.nakshatra?.name}
                  end={panchang?.nakshatra?.ends}
                />

                <PanchangCard
                  icon="✧"
                  label="Yoga"
                  value={panchang?.yoga?.name}
                  end={panchang?.yoga?.ends}
                />

                <PanchangCard
                  icon="◐"
                  label="Karana"
                  value={panchang?.karana?.name}
                  end={panchang?.karana?.ends}
                />

              </div>

            </section>


            {/* SUN MOON */}

            <section className="section">

              <div className="section-title">
                <h2>Sun & Moon</h2>
                <div />
              </div>


              <div className="two-columns">

                <InfoCard title="Sun">
                  <TimeRow
                    label="Sunrise"
                    value={panchang?.sun?.rise}
                  />

                  <TimeRow
                    label="Sunset"
                    value={panchang?.sun?.set}
                  />
                </InfoCard>


                <InfoCard title="Moon">
                  <TimeRow
                    label="Moonrise"
                    value={panchang?.moon?.rise}
                  />

                  <TimeRow
                    label="Moonset"
                    value={panchang?.moon?.set}
                  />
                </InfoCard>

              </div>

            </section>


            {/* SHUBH ASHUBH */}

            <section className="section">

              <div className="section-title">
                <h2>Shubh & Ashubh Kaal</h2>
                <div />
              </div>


              <div className="info-grid">

                <SimpleCard
                  label="Rahu Kaal"
                  value={timings.rahuKaal}
                />

                <SimpleCard
                  label="Yamaganda"
                  value={timings.yamaganda}
                />

                <SimpleCard
                  label="Gulika Kaal"
                  value={timings.gulika}
                />

                <SimpleCard
                  label="Abhijit Muhurat"
                  value={timings.abhijit}
                />

                <SimpleCard
                  label="Brahma Muhurat"
                  value={timings.brahma}
                />

              </div>

            </section>


            {/* CHOGHADIYA */}

            <section className="section">

              <div className="section-title">
                <h2>Choghadiya</h2>
                <div />
              </div>


              <div className="two-columns">

                <div className="large-card">

                  <h3>Day Choghadiya</h3>

                  <Choghadiya
                    items={panchang?.choghadiya?.day}
                  />

                </div>


                <div className="large-card">

                  <h3>Night Choghadiya</h3>

                  <Choghadiya
                    items={panchang?.choghadiya?.night}
                  />

                </div>

              </div>

            </section>


            {/* ADDITIONAL */}

            <section className="section">

              <div className="section-title">
                <h2>Additional Panchang</h2>
                <div />
              </div>


              <div className="info-grid">

                <SimpleCard
                  label="Ayana"
                  value={panchang?.ayana}
                />

                <SimpleCard
                  label="Ritu"
                  value={panchang?.ritu}
                />

                <SimpleCard
                  label="Paksha"
                  value={panchang?.paksha}
                />

                <SimpleCard
                  label="Masa"
                  value={panchang?.masa}
                />

                <SimpleCard
                  label="Vikram Samvat"
                  value={panchang?.vikramSamvat}
                />

                <SimpleCard
                  label="Shaka Samvat"
                  value={panchang?.shakaSamvat}
                />

                <SimpleCard
                  label="Sun Rashi"
                  value={panchang?.sun?.rashi?.name}
                />

                <SimpleCard
                  label="Moon Rashi"
                  value={panchang?.moon?.rashi?.name}
                />

                <SimpleCard
                  label="Moon Nakshatra Pada"
                  value={
                    panchang?.moon?.nakshatra?.pada
                      ? `Pada ${panchang.moon.nakshatra.pada}`
                      : "—"
                  }
                />

              </div>

            </section>

          </section>
        )}

      </main>


      <style jsx>{`

        /* =========================
           PAGE
        ========================= */

        .page {
          min-height: 100vh;
          background: #f8f5ef;
          color: #29251f;
          padding-bottom: 90px;
        }


        /* =========================
           HERO
        ========================= */

        .hero {
          max-width: 1080px;
          margin: 0 auto;
          padding: 65px 24px 45px;
        }

        .eyebrow {
          color: #a87935;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2.5px;
          margin-bottom: 17px;
        }

        .hero h1 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(42px, 6vw, 70px);
          line-height: 1;
          font-weight: 600;
          letter-spacing: -2px;
        }

        .hero p {
          margin: 16px 0 0;
          color: #756f64;
          font-size: 16px;
        }


        /* =========================
           SEARCH
           UNCHANGED
        ========================= */

        .search-section {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 24px 40px;
        }

        .search-card {
          display: grid;
          grid-template-columns: 210px 1fr 145px 175px;
          gap: 12px;
          align-items: end;

          padding: 18px;

          background: #fffdf9;
          border: 1px solid #dfd7ca;
          border-radius: 18px;

          box-shadow:
            0 8px 30px rgba(70, 50, 30, .055);
        }

        .field {
          min-width: 0;
        }

        .field label {
          display: block;
          margin-bottom: 8px;

          color: #756f64;

          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.3px;
        }


        /* DATE */

        .date-input-wrap {
          position: relative;
        }

        .date-input-wrap input {
          appearance: none;
          -webkit-appearance: none;

          width: 100%;
          height: 50px;

          padding: 0 42px 0 42px;

          border: 1px solid #d8d0c3;
          border-radius: 12px;

          background: #fff;

          color: #29251f;

          font-family:
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          font-size: 14px;

          outline: none;
          cursor: pointer;
        }

        .date-input-wrap input:hover {
          border-color: #c5b9a8;
        }

        .date-input-wrap input:focus {
          border-color: #a87935;
          box-shadow: 0 0 0 3px rgba(168, 121, 53, .08);
        }

        .date-input-wrap input::-webkit-calendar-picker-indicator {
          position: absolute;
          right: 13px;

          width: 17px;
          height: 17px;

          opacity: .55;

          cursor: pointer;
        }

        .calendar-icon {
          position: absolute;
          left: 15px;
          top: 50%;

          transform: translateY(-50%);

          color: #a87935;
          font-size: 17px;

          pointer-events: none;
          z-index: 1;
        }


        /* LOCATION */

        .location-field input {
          width: 100%;
          height: 50px;

          padding: 0 15px;

          border: 1px solid #d8d0c3;
          border-radius: 12px;

          background: #fff;

          color: #29251f;

          font-size: 14px;

          outline: none;
        }

        .location-field input:focus {
          border-color: #a87935;
          box-shadow: 0 0 0 3px rgba(168, 121, 53, .08);
        }

        .location-field input::placeholder {
          color: #aaa196;
        }


        /* BUTTONS */

        .detect-button,
        .view-button {
          height: 50px;

          border-radius: 12px;

          font-size: 13px;
          font-weight: 600;

          cursor: pointer;

          transition:
            transform .15s ease,
            opacity .15s ease;
        }

        .detect-button {
          border: 1px solid #d8d0c3;

          background: #f7f3eb;

          color: #60482f;
        }

        .detect-button:hover {
          background: #f0e9de;
        }

        .view-button {
          border: 1px solid #29251f;

          background: #29251f;

          color: #fff;
        }

        .view-button:hover {
          transform: translateY(-1px);
        }

        .view-button:disabled {
          opacity: .6;
          cursor: wait;
        }


        /* LOCATION STATUS */

        .location-confirmed {
          display: flex;
          align-items: center;
          gap: 7px;

          margin-top: 11px;

          color: #756f64;

          font-size: 12px;
        }

        .location-confirmed span {
          color: #a87935;
          font-size: 9px;
        }


        /* ERROR */

        .error {
          margin-top: 13px;

          padding: 13px 15px;

          border: 1px solid #e3c9c0;
          border-radius: 11px;

          background: #f9eae6;

          color: #863c31;

          font-size: 13px;
        }


        /* =====================================================
           KAALDARPAN OUTPUT
           ONLY TEXT COLORS CHANGED
        ===================================================== */

        .results {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 24px 70px;

          color: #171717;
        }


        /* =========================
           DATE SUMMARY
        ========================= */

        .date-summary {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;

          padding: 28px 24px;

          background:
            radial-gradient(
              circle at 85% 20%,
              rgba(173, 126, 48, .13),
              transparent 32%
            ),
            #171512;

          border: 1px solid #5d4a2c;
          border-radius: 18px;

          box-shadow:
            0 15px 45px rgba(20, 15, 8, .16);
        }

        .summary-label {
          display: block;

          margin-bottom: 8px;

          color: #6b6256;

          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.8px;
        }

        .date-summary h2 {
          margin: 0;

          color: #171717;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 26px;
          font-weight: 600;

          letter-spacing: -.3px;
        }

        .summary-location {
          color: #6b6256;
          font-size: 13px;
        }


        /* =========================
           SECTIONS
        ========================= */

        .section {
          margin-top: 48px;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 15px;

          margin-bottom: 17px;
        }

        .section-title h2 {
          margin: 0;

          color: #171717;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 25px;
          font-weight: 600;

          letter-spacing: -.2px;
        }

        .section-title div {
          flex: 1;

          height: 1px;

          background:
            linear-gradient(
              to right,
              #67502d,
              rgba(103, 80, 45, .12)
            );
        }


        /* =========================
           PANCHANG CARDS
        ========================= */

        .panchang-grid {
          display: grid;

          grid-template-columns:
            repeat(5, 1fr);

          gap: 11px;
        }

        .panchang-card {
          min-height: 158px;

          display: flex;
          flex-direction: column;

          align-items: center;
          justify-content: center;

          position: relative;
          overflow: hidden;

          padding: 19px 10px;

          text-align: center;

          background:
            radial-gradient(
              circle at 50% -20%,
              rgba(183, 139, 65, .13),
              transparent 55%
            ),
            linear-gradient(
              145deg,
              #211d17,
              #151310
            );

          border: 1px solid #5b482a;
          border-radius: 15px;

          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.025),
            0 12px 30px rgba(10, 8, 5, .13);

          transition:
            transform .18s ease,
            border-color .18s ease,
            box-shadow .18s ease;
        }

        .panchang-card::after {
          content: "";

          position: absolute;

          width: 70px;
          height: 1px;

          bottom: 13px;

          background:
            linear-gradient(
              to right,
              transparent,
              #a87935,
              transparent
            );

          opacity: .55;
        }

        .panchang-card:hover {
          transform: translateY(-3px);

          border-color: #9a7135;

          box-shadow:
            0 17px 35px rgba(10, 8, 5, .2),
            inset 0 1px 0 rgba(205, 165, 91, .05);
        }

        .panchang-icon {
          margin-bottom: 11px;

          color: #c29a56;

          font-family: Georgia, serif;

          font-size: 25px;

          text-shadow:
            0 0 15px rgba(194, 154, 86, .16);
        }

        .panchang-card .label {
          margin-bottom: 8px;

          color: #6b6256;

          font-size: 10px;
          font-weight: 600;

          letter-spacing: 1.1px;
          text-transform: uppercase;
        }

        .panchang-card strong {
          max-width: 100%;

          color: #171717;

          font-size: 15px;
          font-weight: 600;

          line-height: 1.35;
        }

        .panchang-card small {
          margin-top: 7px;

          color: #756e65;

          font-size: 10px;
        }


        /* =========================
           SUN / MOON + LARGE CARDS
        ========================= */

        .two-columns {
          display: grid;

          grid-template-columns:
            1fr 1fr;

          gap: 12px;
        }

        .info-card,
        .large-card {
          padding: 21px;

          background:
            linear-gradient(
              145deg,
              #211d17,
              #161411
            );

          border: 1px solid #5b482a;
          border-radius: 15px;

          box-shadow:
            0 12px 30px rgba(10, 8, 5, .11);
        }

        .info-card h3,
        .large-card h3 {
          margin: 0 0 13px;

          color: #171717;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 20px;
          font-weight: 600;
        }

        .time-row,
        .choghadiya-row {
          display: flex;
          justify-content: space-between;
          align-items: center;

          gap: 20px;

          padding: 13px 0;

          border-bottom: 1px solid #332c21;
        }

        .time-row:last-child,
        .choghadiya-row:last-child {
          border-bottom: 0;
        }

        .time-row span,
        .choghadiya-row span {
          color: #403c37;
          font-size: 13px;
        }

        .time-row strong,
        .choghadiya-row strong {
          color: #171717;

          font-size: 13px;
          font-weight: 600;

          text-align: right;
        }


        /* =========================
           INFO GRID
        ========================= */

        .info-grid {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 10px;
        }

        .simple-card {
          position: relative;

          padding: 18px 19px;

          background:
            linear-gradient(
              145deg,
              #211d17,
              #171512
            );

          border: 1px solid #4d3c24;
          border-radius: 13px;

          box-shadow:
            0 8px 22px rgba(10, 8, 5, .08);
        }

        .simple-card::before {
          content: "";

          position: absolute;

          left: 0;
          top: 14px;
          bottom: 14px;

          width: 2px;

          background: #9b7338;

          opacity: .65;
        }

        .simple-card span {
          display: block;

          margin-bottom: 8px;

          color: #6b6256;

          font-size: 10px;
          font-weight: 600;

          letter-spacing: .7px;
          text-transform: uppercase;
        }

        .simple-card strong {
          color: #171717;

          font-size: 15px;
          font-weight: 600;

          line-height: 1.4;
        }


        /* =========================
           CHOGHADIYA
        ========================= */

        .large-card {
          background:
            radial-gradient(
              circle at 90% 0%,
              rgba(168, 121, 53, .09),
              transparent 38%
            ),
            linear-gradient(
              145deg,
              #211d17,
              #151310
            );
        }

        .large-card h3 {
          padding-bottom: 12px;

          border-bottom: 1px solid #514027;
        }

        .choghadiya-row {
          min-height: 43px;
        }

        .choghadiya-row span {
          color: #403c37;
        }

        .choghadiya-row strong {
          color: #171717;
        }


        /* =========================
           EMPTY
        ========================= */

        .empty {
          padding: 8px 0;

          color: #756e65;

          font-size: 12px;
        }


        /* =========================
           TABLET
        ========================= */

        @media (max-width: 850px) {

          .search-card {
            grid-template-columns:
              1fr 1fr;
          }

          .panchang-grid {
            grid-template-columns:
              repeat(3, 1fr);
          }

          .info-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

        }


        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 600px) {

          .hero {
            padding: 48px 18px 34px;
          }

          .hero h1 {
            font-size: 44px;
            letter-spacing: -1.5px;
          }

          .hero p {
            font-size: 14px;
            line-height: 1.5;
          }

          .search-section,
          .results {
            padding-left: 18px;
            padding-right: 18px;
          }

          .search-card {
            grid-template-columns: 1fr;

            padding: 16px;

            border-radius: 16px;
          }

          .field input,
          .date-input-wrap input,
          .detect-button,
          .view-button {
            height: 50px;
          }

          .panchang-grid {
            grid-template-columns:
              1fr 1fr;
          }

          .panchang-card {
            min-height: 145px;
          }

          .two-columns {
            grid-template-columns: 1fr;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }

          .date-summary {
            display: block;

            padding: 22px 19px;
          }

          .date-summary h2 {
            font-size: 22px;
            line-height: 1.3;
          }

          .summary-location {
            margin-top: 9px;
          }

          .section {
            margin-top: 40px;
          }

          .section-title h2 {
            font-size: 22px;
          }

          .section-title {
            gap: 11px;
          }

          .info-card,
          .large-card {
            padding: 18px;
          }

        }


        @media (max-width: 380px) {

          .hero h1 {
            font-size: 40px;
          }

          .panchang-card {
            padding-left: 7px;
            padding-right: 7px;
          }

          .panchang-card strong {
            font-size: 14px;
          }

        }

      `}</style>
    </>
  );
}


/* =====================================
   PANCHANG CARD
===================================== */

function PanchangCard({
  icon,
  label,
  value,
  end,
}: {
  icon: string;
  label: string;
  value: any;
  end?: any;
}) {
  return (
    <div className="panchang-card">

      <div className="panchang-icon">
        {icon}
      </div>

      <div className="label">
        {label}
      </div>

      <strong>
        {display(value)}
      </strong>

      {end && (
        <small>
          Ends {end}
        </small>
      )}

    </div>
  );
}


/* =====================================
   INFO CARD
===================================== */

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="info-card">

      <h3>{title}</h3>

      {children}

    </div>
  );
}


/* =====================================
   TIME ROW
===================================== */

function TimeRow({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  return (
    <div className="time-row">

      <span>{label}</span>

      <strong>
        {display(value)}
      </strong>

    </div>
  );
}


/* =====================================
   SIMPLE CARD
===================================== */

function SimpleCard({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  return (
    <div className="simple-card">

      <span>{label}</span>

      <strong>
        {display(value)}
      </strong>

    </div>
  );
}