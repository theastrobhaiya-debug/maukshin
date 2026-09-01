"use client";

import { useEffect, useState } from "react";

const API_BASE =
  "https://mauksh-kundali-engine.onrender.com";

type LocationData = {
  city: string;
  latitude: number | null;
  longitude: number | null;
};

export default function Home() {
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");

  const [location, setLocation] = useState<LocationData>({
    city: "",
    latitude: null,
    longitude: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<any>(null);

  /* =========================
     TODAY
  ========================= */

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

  /* =========================
     DATE FORMAT
  ========================= */

  function formatDate(value: string) {
    if (!value) return "";

    const d = new Date(value + "T00:00:00");

    return d.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  /* =========================
     DETECT LOCATION
  ========================= */

  async function detectLocation() {
    setError("");

    if (!navigator.geolocation) {
      setError(
        "Location detection is not supported by your browser."
      );
      return;
    }

    document.getElementById("locationDisplay")!.textContent =
      "Detecting your location…";

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const url =
            "https://nominatim.openstreetmap.org/reverse" +
            "?format=json" +
            "&lat=" +
            latitude +
            "&lon=" +
            longitude;

          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(
              "Unable to detect your city."
            );
          }

          const result = await response.json();

          const address = result.address || {};

          const detectedCity =
            address.city ||
            address.town ||
            address.village ||
            address.municipality ||
            "Current location";

          setCity(detectedCity);

          setLocation({
            city: detectedCity,
            latitude,
            longitude,
          });

          document.getElementById(
            "locationDisplay"
          )!.textContent = detectedCity;
        } catch {
          document.getElementById(
            "locationDisplay"
          )!.textContent =
            "Location detected.";
        }
      },
      () => {
        document.getElementById(
          "locationDisplay"
        )!.textContent =
          "Unable to detect location. Enter your city.";
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }

  /* =========================
     FIND CITY
  ========================= */

  async function findCity(cityName: string) {
    const url =
      "https://nominatim.openstreetmap.org/search" +
      "?format=json" +
      "&limit=1" +
      "&q=" +
      encodeURIComponent(cityName);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        "Unable to find this city."
      );
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

  /* =========================
     LOAD PANCHANG
  ========================= */

  async function loadPanchang() {
    setError("");

    if (!date) {
      setError("Please select a date.");
      return;
    }

    if (
      !city.trim() &&
      location.latitude === null
    ) {
      setError(
        "Please enter a city or use Detect."
      );
      return;
    }

    setLoading(true);
    setData(null);

    try {
      let selectedLocation = location;

      if (city.trim()) {
        selectedLocation =
          await findCity(city.trim());

        setLocation(selectedLocation);
      }

      /*
       * IMPORTANT:
       * Use the browser timezone.
       * For India this will normally be
       * Asia/Calcutta / Asia/Kolkata.
       */

      const timezone =
        Intl.DateTimeFormat()
          .resolvedOptions()
          .timeZone || "Asia/Kolkata";

      const params =
        new URLSearchParams({
          date,
          latitude: String(
            selectedLocation.latitude
          ),
          longitude: String(
            selectedLocation.longitude
          ),
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

      console.log(
        "KAALDARPAN PANCHANG:",
        result
      );

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

  /* =========================
     SAFE VALUE
  ========================= */

  function value(input: any) {
    if (
      input === undefined ||
      input === null ||
      input === ""
    ) {
      return "—";
    }

    return String(input);
  }

  /* =========================
     CHOGHADIYA
  ========================= */

  function renderChoghadiya(
    items: any[]
  ) {
    if (
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return (
        <div className="noData">
          No data available.
        </div>
      );
    }

    return (
      <div className="choghadiyaList">
        {items.map((item, index) => (
          <div
            className="choghadiyaRow"
            key={index}
          >
            <div className="choghadiyaInfo">

              <div className="choghadiyaName">
                {value(item?.name)}
              </div>

              {item?.type && (
                <div className="choghadiyaType">
                  {item.type}
                </div>
              )}

            </div>

            <div className="choghadiyaTime">
              {value(item?.start)}
              <span> – </span>
              {value(item?.end)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* =========================
     DATA SHORTCUTS
  ========================= */

  const tithi =
    data?.tithi;

  const nakshatra =
    data?.nakshatra;

  const yoga =
    data?.yoga;

  const karana =
    data?.karana;

  const sun =
    data?.sun;

  const moon =
    data?.moon;

  const timings =
    data?.timings || {};

  return (
    <>
      <main className="page">

        {/* =================================
            PAGE HEADER
        ================================= */}

        <section className="pageHeader">

          <div className="eyebrow">
            DAILY VEDIC PANCHANG
          </div>

          <h1>
            Daily Panchang
          </h1>

          {date && (
            <div className="dateSubtitle">
              {formatDate(date)}
            </div>
          )}

        </section>


        {/* =================================
            INPUT
            DO NOT CHANGE
        ================================= */}

        <section className="controls">

          <div className="field">

            <label>
              DATE
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
            />

          </div>


          <div className="field">

            <label>
              LOCATION
            </label>

            <div className="locationRow">

              <input
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

              <button
                className="detect"
                type="button"
                onClick={detectLocation}
              >
                Detect
              </button>

            </div>

            <div
              id="locationDisplay"
              className="locationDisplay"
            >
              Enter a city or detect your location.
            </div>

          </div>


          <button
            type="button"
            onClick={loadPanchang}
          >
            View Panchang
          </button>

        </section>


        {/* =================================
            LOADING
        ================================= */}

        {loading && (
          <div className="loading">
            Calculating Panchang…
          </div>
        )}


        {/* =================================
            ERROR
        ================================= */}

        {error && (
          <div className="error">
            {error}
          </div>
        )}


        {/* =================================
            OUTPUT
        ================================= */}

        {data && (

          <div className="output">

            {/* =============================
                DATE
            ============================= */}

            <div className="dateCard">

              <div className="dateLabel">
                PANCHANG FOR
              </div>

              <div className="dateValue">
                {formatDate(date)}
              </div>

              <div className="dateLocation">
                {location.city}
              </div>

            </div>


            {/* =============================
                PANCHANG
            ============================= */}

            <section className="section">

              <div className="sectionHeading">
                <h2>
                  Panchang
                </h2>
              </div>


              <div className="panchangGrid">


                {/* VARA */}

                <div className="panchangCard">

                  <div className="panchangIcon">
                    ☀️
                  </div>

                  <div className="panchangLabel">
                    Vara
                  </div>

                  <div className="panchangValue">
                    {value(
                      data?.vara?.name
                    )}
                  </div>

                </div>


                {/* TITHI */}

                <div className="panchangCard">

                  <div className="panchangIcon">
                    ☾
                  </div>

                  <div className="panchangLabel">
                    Tithi
                  </div>

                  <div className="panchangValue">
                    {value(tithi?.name)}
                  </div>

                  {tithi?.ends && (
                    <div className="panchangEnd">
                      Ends
                      <strong>
                        {tithi.ends}
                      </strong>
                    </div>
                  )}

                </div>


                {/* NAKSHATRA */}

                <div className="panchangCard">

                  <div className="panchangIcon">
                    ✦
                  </div>

                  <div className="panchangLabel">
                    Nakshatra
                  </div>

                  <div className="panchangValue">
                    {value(
                      nakshatra?.name
                    )}
                  </div>

                  {nakshatra?.ends && (
                    <div className="panchangEnd">
                      Ends
                      <strong>
                        {nakshatra.ends}
                      </strong>
                    </div>
                  )}

                </div>


                {/* YOGA */}

                <div className="panchangCard">

                  <div className="panchangIcon">
                    ✧
                  </div>

                  <div className="panchangLabel">
                    Yoga
                  </div>

                  <div className="panchangValue">
                    {value(
                      yoga?.name
                    )}
                  </div>

                  {yoga?.ends && (
                    <div className="panchangEnd">
                      Ends
                      <strong>
                        {yoga.ends}
                      </strong>
                    </div>
                  )}

                </div>


                {/* KARANA */}

                <div className="panchangCard">

                  <div className="panchangIcon">
                    ◐
                  </div>

                  <div className="panchangLabel">
                    Karana
                  </div>

                  <div className="panchangValue">
                    {value(
                      karana?.name
                    )}
                  </div>

                  {karana?.ends && (
                    <div className="panchangEnd">
                      Ends
                      <strong>
                        {karana.ends}
                      </strong>
                    </div>
                  )}

                </div>

              </div>

            </section>


            {/* =============================
                SUN & MOON
            ============================= */}

            <section className="section">

              <div className="sectionHeading">
                <h2>
                  Sun & Moon
                </h2>
              </div>


              <div className="sunMoonGrid">


                {/* SUN */}

                <div className="outputCard">

                  <div className="outputCardTitle">
                    Sun
                  </div>

                  <div className="timeList">

                    <div className="timeRow">

                      <span>
                        Sunrise
                      </span>

                      <strong>
                        {value(
                          sun?.rise
                        )}
                      </strong>

                    </div>

                    <div className="timeRow">

                      <span>
                        Sunset
                      </span>

                      <strong>
                        {value(
                          sun?.set
                        )}
                      </strong>

                    </div>

                  </div>

                </div>


                {/* MOON */}

                <div className="outputCard">

                  <div className="outputCardTitle">
                    Moon
                  </div>

                  <div className="timeList">

                    <div className="timeRow">

                      <span>
                        Moonrise
                      </span>

                      <strong>
                        {value(
                          moon?.rise
                        )}
                      </strong>

                    </div>

                    <div className="timeRow">

                      <span>
                        Moonset
                      </span>

                      <strong>
                        {value(
                          moon?.set
                        )}
                      </strong>

                    </div>

                  </div>

                </div>

              </div>

            </section>


            {/* =============================
                SHUBH ASHUBH
            ============================= */}

            <section className="section">

              <div className="sectionHeading">
                <h2>
                  Shubh & Ashubh Kaal
                </h2>
              </div>


              <div className="timingGrid">


                <div className="timingCard">

                  <span>
                    Rahu Kaal
                  </span>

                  <strong>
                    {value(
                      timings.rahuKaal
                    )}
                  </strong>

                </div>


                <div className="timingCard">

                  <span>
                    Yamaganda
                  </span>

                  <strong>
                    {value(
                      timings.yamaganda
                    )}
                  </strong>

                </div>


                <div className="timingCard">

                  <span>
                    Gulika Kaal
                  </span>

                  <strong>
                    {value(
                      timings.gulika
                    )}
                  </strong>

                </div>


                <div className="timingCard">

                  <span>
                    Abhijit Muhurat
                  </span>

                  <strong>
                    {value(
                      timings.abhijit
                    )}
                  </strong>

                </div>


                <div className="timingCard">

                  <span>
                    Brahma Muhurat
                  </span>

                  <strong>
                    {value(
                      timings.brahma
                    )}
                  </strong>

                </div>

              </div>

            </section>


            {/* =============================
                CHOGHADIYA
            ============================= */}

            <section className="section">

              <div className="sectionHeading">
                <h2>
                  Choghadiya
                </h2>
              </div>


              <div className="choghadiyaGrid">


                <div className="outputCard">

                  <div className="outputCardTitle">
                    Day Choghadiya
                  </div>

                  {renderChoghadiya(
                    data?.choghadiya?.day
                  )}

                </div>


                <div className="outputCard">

                  <div className="outputCardTitle">
                    Night Choghadiya
                  </div>

                  {renderChoghadiya(
                    data?.choghadiya?.night
                  )}

                </div>

              </div>

            </section>


            {/* =============================
                ADDITIONAL PANCHANG
            ============================= */}

            <section className="section">

              <div className="sectionHeading">
                <h2>
                  Additional Panchang
                </h2>
              </div>


              <div className="additionalGrid">


                <div className="additionalCard">
                  <span>Ayana</span>
                  <strong>
                    {value(data?.ayana)}
                  </strong>
                </div>


                <div className="additionalCard">
                  <span>Ritu</span>
                  <strong>
                    {value(data?.ritu)}
                  </strong>
                </div>


                <div className="additionalCard">
                  <span>Paksha</span>
                  <strong>
                    {value(data?.paksha)}
                  </strong>
                </div>


                <div className="additionalCard">
                  <span>Masa</span>
                  <strong>
                    {value(data?.masa)}
                  </strong>
                </div>


                <div className="additionalCard">
                  <span>
                    Vikram Samvat
                  </span>
                  <strong>
                    {value(
                      data?.vikramSamvat
                    )}
                  </strong>
                </div>


                <div className="additionalCard">
                  <span>
                    Shaka Samvat
                  </span>
                  <strong>
                    {value(
                      data?.shakaSamvat
                    )}
                  </strong>
                </div>


                <div className="additionalCard">
                  <span>
                    Sun Rashi
                  </span>
                  <strong>
                    {value(
                      sun?.rashi?.name
                    )}
                  </strong>
                </div>


                <div className="additionalCard">
                  <span>
                    Moon Rashi
                  </span>
                  <strong>
                    {value(
                      moon?.rashi?.name
                    )}
                  </strong>
                </div>


                <div className="additionalCard">
                  <span>
                    Moon Nakshatra Pada
                  </span>
                  <strong>
                    {moon?.nakshatra?.pada
                      ? `Pada ${moon.nakshatra.pada}`
                      : "—"}
                  </strong>
                </div>

              </div>

            </section>

          </div>

        )}

      </main>


      {/* =================================
          PAGE CSS
      ================================= */}

      <style jsx>{`

        /* =========================
           PAGE
        ========================= */

        .page {
          max-width:1100px;
          margin:0 auto;
          padding:48px 24px 80px;
        }


        /* =========================
           HEADER
        ========================= */

        .pageHeader {
          margin-bottom:38px;
        }

        .eyebrow {
          color:#a87935;
          font-size:13px;
          font-weight:700;
          letter-spacing:3px;
          margin-bottom:22px;
        }

        .pageHeader h1 {
          margin:0;
          font-family:Georgia,serif;
          font-size:clamp(48px,7vw,82px);
          line-height:.95;
          font-weight:600;
          letter-spacing:-3px;
        }

        .dateSubtitle {
          margin-top:22px;
          color:#756f64;
          font-size:20px;
        }


        /* =========================
           INPUT CSS
           KEPT AS BEFORE
        ========================= */

        .controls {
          background:#fffdf9;
          border:1px solid #e6ded1;
          border-radius:16px;
          padding:18px;
          box-shadow:0 6px 24px rgba(65,45,25,.06);

          display:grid;
          grid-template-columns:1fr 1.4fr auto;
          gap:14px;

          margin-bottom:45px;
        }

        .field label {
          display:block;
          font-size:11px;
          font-weight:700;
          letter-spacing:.5px;
          color:#756f64;
          margin-bottom:7px;
        }

        .field input {
          width:100%;
          height:44px;
          border:1px solid #e6ded1;
          border-radius:10px;
          background:white;
          padding:0 12px;
          font-size:14px;
          color:#29251f;
          outline:none;
        }

        .field input:focus {
          border-color:#a87935;
        }

        .locationRow {
          display:flex;
          gap:8px;
        }

        .locationRow input {
          flex:1;
        }

        .controls button {
          height:44px;
          border:0;
          border-radius:10px;
          background:#7b4b2a;
          color:white;
          padding:0 20px;
          font-size:14px;
          font-weight:600;
          cursor:pointer;
        }

        .controls button:hover {
          opacity:.92;
        }

        .controls .detect {
          background:#f0e4d6;
          color:#7b4b2a;
          white-space:nowrap;
        }

        .locationDisplay {
          margin-top:7px;
          font-size:11px;
          color:#756f64;
        }


        /* =========================
           STATUS
        ========================= */

        .loading,
        .error {
          padding:16px 18px;
          border-radius:12px;
          margin-bottom:25px;
          text-align:center;
          font-size:14px;
        }

        .loading {
          background:#f0e4d6;
          color:#7b4b2a;
        }

        .error {
          background:#f5e3df;
          color:#87372d;
        }


        /* =========================
           OUTPUT DATE
        ========================= */

        .dateCard {
          background:#fffdf9;
          border:1px solid #e6ded1;
          border-radius:18px;
          padding:24px;
          margin-bottom:48px;
        }

        .dateLabel {
          font-size:11px;
          color:#756f64;
          font-weight:700;
          letter-spacing:1px;
        }

        .dateValue {
          margin-top:8px;
          font-family:Georgia,serif;
          font-size:27px;
          font-weight:600;
        }

        .dateLocation {
          margin-top:7px;
          color:#756f64;
          font-size:14px;
        }


        /* =========================
           SECTIONS
        ========================= */

        .section {
          margin-top:55px;
        }

        .sectionHeading {
          display:flex;
          align-items:center;
          gap:18px;
          margin-bottom:24px;
        }

        .sectionHeading h2 {
          margin:0;
          font-family:Georgia,serif;
          font-size:31px;
          line-height:1;
          font-weight:600;
          white-space:nowrap;
        }

        .sectionHeading::after {
          content:"";
          flex:1;
          height:1px;
          background:#ded5c7;
        }


        /* =========================
           PANCHANG
        ========================= */

        .panchangGrid {
          display:grid;
          grid-template-columns:repeat(5,1fr);
          gap:14px;
        }

        .panchangCard {
          background:#fffdf9;
          border:1px solid #e6ded1;
          border-radius:16px;
          padding:22px 18px;
          min-height:180px;

          display:flex;
          flex-direction:column;

          box-shadow:0 5px 18px rgba(65,45,25,.035);
        }

        .panchangIcon {
          font-size:23px;
          line-height:1;
          margin-bottom:21px;
        }

        .panchangLabel {
          color:#756f64;
          font-size:13px;
          margin-bottom:8px;
        }

        .panchangValue {
          font-size:20px;
          line-height:1.25;
          font-weight:700;
          color:#29251f;
        }

        .panchangEnd {
          display:flex;
          flex-direction:column;
          gap:3px;

          margin-top:14px;

          color:#756f64;
          font-size:12px;
          line-height:1.4;
        }

        .panchangEnd strong {
          color:#7b4b2a;
          font-size:13px;
          font-weight:600;
        }


        /* =========================
           SUN / MOON
        ========================= */

        .sunMoonGrid {
          display:grid;
          grid-template-columns:repeat(2,1fr);
          gap:16px;
        }

        .outputCard {
          background:#fffdf9;
          border:1px solid #e6ded1;
          border-radius:16px;
          padding:23px;
          box-shadow:0 5px 18px rgba(65,45,25,.035);
        }

        .outputCardTitle {
          font-family:Georgia,serif;
          font-size:23px;
          font-weight:600;
          margin-bottom:18px;
        }

        .timeList {
          display:flex;
          flex-direction:column;
        }

        .timeRow {
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:20px;

          padding:15px 0;

          border-bottom:1px solid #e6ded1;
        }

        .timeRow:last-child {
          border-bottom:0;
        }

        .timeRow span {
          font-size:15px;
          color:#756f64;
        }

        .timeRow strong {
          font-size:16px;
          color:#29251f;
          text-align:right;
          white-space:nowrap;
        }


        /* =========================
           SHUBH / ASHUBH
        ========================= */

        .timingGrid {
          display:grid;
          grid-template-columns:repeat(2,1fr);
          gap:12px;
        }

        .timingCard {
          background:#fffdf9;
          border:1px solid #e6ded1;
          border-radius:15px;
          padding:20px 22px;

          display:flex;
          flex-direction:column;
          gap:9px;
        }

        .timingCard span {
          color:#756f64;
          font-size:13px;
        }

        .timingCard strong {
          font-size:17px;
          line-height:1.4;
          color:#29251f;
        }


        /* =========================
           CHOGHADIYA
        ========================= */

        .choghadiyaGrid {
          display:grid;
          grid-template-columns:repeat(2,1fr);
          gap:16px;
        }

        .choghadiyaList {
          display:flex;
          flex-direction:column;
        }

        .choghadiyaRow {
          display:flex;
          justify-content:space-between;
          align-items:center;

          gap:20px;

          padding:14px 0;

          border-bottom:1px solid #e6ded1;
        }

        .choghadiyaRow:last-child {
          border-bottom:0;
        }

        .choghadiyaInfo {
          min-width:0;
        }

        .choghadiyaName {
          font-size:14px;
          font-weight:600;
        }

        .choghadiyaType {
          margin-top:3px;
          color:#756f64;
          font-size:11px;
        }

        .choghadiyaTime {
          color:#7b4b2a;
          font-size:12px;
          font-weight:600;
          text-align:right;
          white-space:nowrap;
        }

        .noData {
          color:#756f64;
          font-size:13px;
          padding:10px 0;
        }


        /* =========================
           ADDITIONAL
        ========================= */

        .additionalGrid {
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:13px;
        }

        .additionalCard {
          background:#fffdf9;
          border:1px solid #e6ded1;
          border-radius:15px;
          padding:20px;
        }

        .additionalCard span {
          display:block;
          color:#756f64;
          font-size:12px;
          margin-bottom:9px;
        }

        .additionalCard strong {
          display:block;
          font-size:16px;
          line-height:1.4;
          color:#29251f;
        }


        /* =========================
           TABLET
        ========================= */

        @media(max-width:900px) {

          .page {
            padding:40px 20px 70px;
          }

          .panchangGrid {
            grid-template-columns:repeat(2,1fr);
          }

          .additionalGrid {
            grid-template-columns:repeat(2,1fr);
          }

        }


        /* =========================
           MOBILE
        ========================= */

        @media(max-width:650px) {

          .page {
            padding:34px 16px 60px;
          }

          .pageHeader {
            margin-bottom:30px;
          }

          .eyebrow {
            font-size:11px;
            letter-spacing:2px;
            margin-bottom:18px;
          }

          .pageHeader h1 {
            font-size:52px;
            line-height:.92;
            letter-spacing:-2px;
          }

          .dateSubtitle {
            font-size:17px;
            margin-top:18px;
          }


          /*
             INPUT LAYOUT
             SAME VISUAL STYLE,
             STACKED FOR MOBILE
          */

          .controls {
            grid-template-columns:1fr;
            gap:14px;
            padding:16px;
          }

          .locationRow {
            display:flex;
          }

          .locationRow input {
            min-width:0;
          }


          /* OUTPUT */

          .dateCard {
            padding:20px;
            margin-bottom:38px;
          }

          .dateValue {
            font-size:23px;
          }

          .section {
            margin-top:44px;
          }

          .sectionHeading {
            gap:12px;
            margin-bottom:20px;
          }

          .sectionHeading h2 {
            font-size:26px;
          }


          .panchangGrid {
            grid-template-columns:1fr 1fr;
            gap:11px;
          }

          .panchangCard {
            min-height:160px;
            padding:18px 15px;
          }

          .panchangIcon {
            margin-bottom:17px;
          }

          .panchangValue {
            font-size:18px;
          }

          .panchangEnd {
            margin-top:11px;
          }


          .sunMoonGrid,
          .choghadiyaGrid {
            grid-template-columns:1fr;
          }


          .timingGrid {
            grid-template-columns:1fr;
          }


          .additionalGrid {
            grid-template-columns:1fr 1fr;
          }


          .outputCard {
            padding:20px;
          }

          .outputCardTitle {
            font-size:21px;
          }

          .timeRow {
            padding:13px 0;
          }

          .timeRow span {
            font-size:14px;
          }

          .timeRow strong {
            font-size:14px;
          }


          .choghadiyaRow {
            gap:12px;
          }

        }


        /* =========================
           SMALL PHONES
        ========================= */

        @media(max-width:420px) {

          .page {
            padding-left:14px;
            padding-right:14px;
          }

          .pageHeader h1 {
            font-size:46px;
          }

          .panchangCard {
            padding:17px 13px;
          }

          .panchangValue {
            font-size:17px;
          }

          .panchangEnd {
            font-size:11px;
          }

          .sectionHeading h2 {
            font-size:24px;
          }

          .additionalGrid {
            grid-template-columns:1fr;
          }

          .choghadiyaTime {
            font-size:11px;
          }

        }

      `}</style>
    </>
  );
}