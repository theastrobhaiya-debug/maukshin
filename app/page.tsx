"use client";

import { useState } from "react";

const API_BASE = "https://mauksh-kundali-engine.onrender.com";

type LocationData = {
  city: string;
  latitude: number | null;
  longitude: number | null;
};

function getToday() {
  const date = new Date();

  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
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

  /* --------------------------------
     FIND CITY
  -------------------------------- */

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

  /* --------------------------------
     DETECT LOCATION
  -------------------------------- */

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

  /* --------------------------------
     LOAD PANCHANG
  -------------------------------- */

  async function loadPanchang() {
    setError("");
    setPanchang(null);

    if (!date) {
      setError("Please select a date.");
      return;
    }

    if (!city || city === "Detecting...") {
      if (
        location.latitude === null ||
        location.longitude === null
      ) {
        setError("Please enter a city or use Detect.");
        return;
      }
    }

    setLoading(true);

    try {
      let selectedLocation = location;

      /*
       * If the user typed a city,
       * convert it to coordinates.
       */

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

      params.set(
        "latitude",
        String(selectedLocation.latitude)
      );

      params.set(
        "longitude",
        String(selectedLocation.longitude)
      );

      params.set("timezone", timezone);

      const url =
        `${API_BASE}/api/panchang?${params.toString()}`;

      console.log("Panchang request:", url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Panchang engine returned ${response.status}.`
        );
      }

      const result = await response.json();

      console.log("Panchang response:", result);

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

  /* --------------------------------
     CHOGHADIYA
  -------------------------------- */

  function Choghadiya({
    items,
  }: {
    items: any;
  }) {
    if (!Array.isArray(items) || items.length === 0) {
      return (
        <div className="empty">
          No data available.
        </div>
      );
    }

    return (
      <div className="choghadiya-list">
        {items.map((item: any, index: number) => (
          <div
            className="choghadiya-row"
            key={index}
          >
            <span>
              {display(item?.name)}
            </span>

            <strong>
              {display(item?.start)} –{" "}
              {display(item?.end)}
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

        {/* ============================
            HERO
        ============================ */}

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


        {/* ============================
            DATE & LOCATION
        ============================ */}

        <section className="controls-section">

          <h2>DATE & LOCATION</h2>

          <div className="controls">

            <div className="field">

              <label>DATE</label>

              <input
                type="date"
                value={date}
                onChange={(event) =>
                  setDate(event.target.value)
                }
              />

            </div>


            <div className="field">

              <label>LOCATION</label>

              <input
                type="text"
                value={city}
                placeholder="Enter city"
                onChange={(event) => {
                  setCity(event.target.value);

                  setLocation({
                    city: "",
                    latitude: null,
                    longitude: null,
                  });
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
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
              Detect
            </button>


            <button
              type="button"
              className="view-button"
              onClick={loadPanchang}
              disabled={loading}
            >
              {loading
                ? "Calculating..."
                : "View Panchang"}
            </button>

          </div>


          {location.city && (
            <div className="location-text">
              {location.city}
            </div>
          )}


          {error && (
            <div className="error">
              {error}
            </div>
          )}

        </section>


        {/* ============================
            PANCHANG RESULTS
        ============================ */}

        {panchang && (

          <section className="results">

            {/* DATE */}

            <div className="date-card">

              <div>

                <span>PANCHANG FOR</span>

                <strong>
                  {formatDate(date)}
                </strong>

              </div>

              <div className="date-location">
                {location.city}
              </div>

            </div>


            {/* PANCHANG */}

            <section className="section">

              <div className="section-heading">
                <h2>Panchang</h2>
              </div>


              <div className="panchang-grid">

                <div className="panchang-card">

                  <div className="icon">
                    ☀
                  </div>

                  <span>Vara</span>

                  <strong>
                    {display(
                      panchang?.vara?.name
                    )}
                  </strong>

                </div>


                <div className="panchang-card">

                  <div className="icon">
                    ☾
                  </div>

                  <span>Tithi</span>

                  <strong>
                    {display(
                      panchang?.tithi?.name
                    )}
                  </strong>

                  {panchang?.tithi?.ends && (
                    <small>
                      Ends {panchang.tithi.ends}
                    </small>
                  )}

                </div>


                <div className="panchang-card">

                  <div className="icon">
                    ✦
                  </div>

                  <span>Nakshatra</span>

                  <strong>
                    {display(
                      panchang?.nakshatra?.name
                    )}
                  </strong>

                  {panchang?.nakshatra?.ends && (
                    <small>
                      Ends {panchang.nakshatra.ends}
                    </small>
                  )}

                </div>


                <div className="panchang-card">

                  <div className="icon">
                    ✧
                  </div>

                  <span>Yoga</span>

                  <strong>
                    {display(
                      panchang?.yoga?.name
                    )}
                  </strong>

                  {panchang?.yoga?.ends && (
                    <small>
                      Ends {panchang.yoga.ends}
                    </small>
                  )}

                </div>


                <div className="panchang-card">

                  <div className="icon">
                    ◐
                  </div>

                  <span>Karana</span>

                  <strong>
                    {display(
                      panchang?.karana?.name
                    )}
                  </strong>

                  {panchang?.karana?.ends && (
                    <small>
                      Ends {panchang.karana.ends}
                    </small>
                  )}

                </div>

              </div>

            </section>


            {/* SUN & MOON */}

            <section className="section">

              <div className="section-heading">
                <h2>Sun & Moon</h2>
              </div>


              <div className="two-columns">

                <div className="info-card">

                  <h3>Sun</h3>

                  <div className="time-row">
                    <span>Sunrise</span>

                    <strong>
                      {display(
                        panchang?.sun?.rise
                      )}
                    </strong>
                  </div>

                  <div className="time-row">
                    <span>Sunset</span>

                    <strong>
                      {display(
                        panchang?.sun?.set
                      )}
                    </strong>
                  </div>

                </div>


                <div className="info-card">

                  <h3>Moon</h3>

                  <div className="time-row">
                    <span>Moonrise</span>

                    <strong>
                      {display(
                        panchang?.moon?.rise
                      )}
                    </strong>
                  </div>

                  <div className="time-row">
                    <span>Moonset</span>

                    <strong>
                      {display(
                        panchang?.moon?.set
                      )}
                    </strong>
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

              <div className="section-heading">
                <h2>Choghadiya</h2>
              </div>


              <div className="two-columns">

                <div className="large-card">

                  <h3>
                    Day Choghadiya
                  </h3>

                  <Choghadiya
                    items={
                      panchang?.choghadiya?.day
                    }
                  />

                </div>


                <div className="large-card">

                  <h3>
                    Night Choghadiya
                  </h3>

                  <Choghadiya
                    items={
                      panchang?.choghadiya?.night
                    }
                  />

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
                  value={
                    panchang?.vikramSamvat
                  }
                />

                <SimpleCard
                  label="Shaka Samvat"
                  value={
                    panchang?.shakaSamvat
                  }
                />

                <SimpleCard
                  label="Sun Rashi"
                  value={
                    panchang?.sun?.rashi?.name
                  }
                />

                <SimpleCard
                  label="Moon Rashi"
                  value={
                    panchang?.moon?.rashi?.name
                  }
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


      {/* ============================
          PAGE CSS
      ============================ */}

      <style jsx>{`

        .page {
          min-height: 100vh;
          background: #f7f3eb;
          color: #29251f;
          padding-bottom: 90px;
        }

        .hero {
          max-width: 1100px;
          margin: 0 auto;
          padding: 70px 28px 55px;
        }

        .eyebrow {
          color: #a87935;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 4px;
          margin-bottom: 32px;
        }

        .hero h1 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(64px, 9vw, 115px);
          line-height: .88;
          letter-spacing: -5px;
          font-weight: 600;
        }

        .hero p {
          margin: 36px 0 0;
          color: #756f64;
          font-size: 22px;
        }

        .controls-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 28px 55px;
        }

        .controls-section h2 {
          margin: 0 0 18px;
          font-size: 14px;
          letter-spacing: 2px;
          font-weight: 700;
        }

        .controls {
          display: grid;
          grid-template-columns: 220px 1fr 130px 190px;
          gap: 12px;
          align-items: end;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .field label {
          color: #756f64;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .field input {
          width: 100%;
          height: 54px;
          padding: 0 17px;
          border: 1px solid #dcd3c5;
          border-radius: 27px;
          background: #fffdf9;
          color: #29251f;
          font-size: 16px;
          outline: none;
        }

        .field input:focus {
          border-color: #a87935;
        }

        .detect-button,
        .view-button {
          height: 54px;
          border-radius: 27px;
          padding: 0 20px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
        }

        .detect-button {
          border: 1px solid #dcd3c5;
          background: #fffdf9;
          color: #29251f;
        }

        .view-button {
          border: 1px solid #29251f;
          background: #29251f;
          color: white;
        }

        .view-button:disabled {
          opacity: .6;
          cursor: wait;
        }

        .location-text {
          margin-top: 10px;
          color: #756f64;
          font-size: 13px;
        }

        .error {
          margin-top: 15px;
          padding: 14px 17px;
          border: 1px solid #e2c6bd;
          border-radius: 12px;
          background: #f8e9e4;
          color: #863c31;
          font-size: 14px;
        }

        .results {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 28px;
        }

        .date-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 25px 0;
          border-top: 1px solid #ddd4c6;
          border-bottom: 1px solid #ddd4c6;
        }

        .date-card span {
          display: block;
          margin-bottom: 7px;
          color: #756f64;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
        }

        .date-card strong {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 25px;
        }

        .date-location {
          color: #756f64;
          font-size: 14px;
        }

        .section {
          margin-top: 52px;
        }

        .section-heading {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 17px;
        }

        .section-heading::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #ddd4c6;
        }

        .section-heading h2 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 27px;
          font-weight: 600;
        }

        .panchang-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
        }

        .panchang-card {
          min-height: 160px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 20px 12px;
          border: 1px solid #ddd4c6;
          border-radius: 14px;
          background: #fffdf9;
        }

        .icon {
          margin-bottom: 13px;
          color: #a87935;
          font-family: Georgia, serif;
          font-size: 27px;
        }

        .panchang-card span {
          color: #756f64;
          font-size: 12px;
          margin-bottom: 8px;
        }

        .panchang-card strong {
          font-size: 16px;
          font-weight: 600;
        }

        .panchang-card small {
          margin-top: 7px;
          color: #756f64;
          font-size: 11px;
        }

        .two-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .info-card,
        .large-card {
          padding: 22px;
          border: 1px solid #ddd4c6;
          border-radius: 14px;
          background: #fffdf9;
        }

        .info-card h3,
        .large-card h3 {
          margin: 0 0 15px;
          font-family: Georgia, "Times New Roman", serif;
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
          border-bottom: 1px solid #e8e1d7;
        }

        .time-row:last-child,
        .choghadiya-row:last-child {
          border-bottom: 0;
        }

        .time-row span,
        .choghadiya-row span {
          font-size: 14px;
        }

        .time-row strong,
        .choghadiya-row strong {
          color: #7b4b2a;
          font-size: 14px;
          text-align: right;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .simple-card {
          padding: 20px;
          border: 1px solid #ddd4c6;
          border-radius: 14px;
          background: #fffdf9;
        }

        .simple-card span {
          display: block;
          margin-bottom: 8px;
          color: #756f64;
          font-size: 11px;
        }

        .simple-card strong {
          font-size: 16px;
          font-weight: 600;
        }

        .empty {
          color: #756f64;
          font-size: 13px;
          padding: 10px 0;
        }

        @media (max-width: 800px) {

          .hero {
            padding: 55px 22px 42px;
          }

          .hero h1 {
            font-size: 70px;
            letter-spacing: -3px;
          }

          .hero p {
            font-size: 18px;
          }

          .controls-section,
          .results {
            padding-left: 22px;
            padding-right: 22px;
          }

          .controls {
            grid-template-columns: 1fr;
          }

          .detect-button,
          .view-button {
            width: 100%;
          }

          .panchang-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .two-columns {
            grid-template-columns: 1fr;
          }

          .info-grid {
            grid-template-columns: 1fr 1fr;
          }

        }

        @media (max-width: 480px) {

          .hero {
            padding: 48px 20px 40px;
          }

          .eyebrow {
            font-size: 12px;
            letter-spacing: 3px;
          }

          .hero h1 {
            font-size: 64px;
            line-height: .9;
          }

          .hero p {
            margin-top: 28px;
            font-size: 18px;
          }

          .controls-section,
          .results {
            padding-left: 20px;
            padding-right: 20px;
          }

          .date-card {
            display: block;
          }

          .date-location {
            margin-top: 10px;
          }

          .panchang-grid {
            grid-template-columns: 1fr 1fr;
          }

          .panchang-card {
            min-height: 145px;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }

          .section-heading h2 {
            font-size: 23px;
          }

        }

      `}</style>
    </>
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