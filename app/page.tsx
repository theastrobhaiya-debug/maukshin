"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

const API_BASE =
  "https://mauksh-kundali-engine.onrender.com";

type LocationData = {
  city: string;
  latitude: number | null;
  longitude: number | null;
};

function today() {
  const d = new Date();

  return (
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0")
  );
}

function formatDate(date: string) {
  const d = new Date(date + "T00:00:00");

  return d.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function value(v: any) {
  if (v !== undefined && v !== null && v !== "") {
    return v;
  }

  return "—";
}

export default function HomePage() {
  const [date, setDate] = useState(today());
  const [city, setCity] = useState("");

  const [location, setLocation] = useState<LocationData>({
    city: "",
    latitude: null,
    longitude: null,
  });

  const [locationMessage, setLocationMessage] = useState(
    "Enter a city or detect your location."
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setDate(today());
  }, []);

  async function detectLocation() {
    setError("");
    setLocationMessage("Detecting your location…");

    if (!navigator.geolocation) {
      setError(
        "Location detection is not supported by your browser."
      );
      return;
    }

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
            throw new Error("Unable to detect city.");
          }

          const result = await response.json();

          const address = result.address || {};

          const detectedCity =
            address.city ||
            address.town ||
            address.village ||
            address.municipality ||
            "Current location";

          setLocation({
            city: detectedCity,
            latitude,
            longitude,
          });

          setCity(detectedCity);

          setLocationMessage(detectedCity);
        } catch {
          setLocationMessage(
            "Location detected. You can view Panchang now."
          );

          setLocation({
            city: "Current location",
            latitude,
            longitude,
          });
        }
      },
      () => {
        setLocationMessage(
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
    const url =
      "https://nominatim.openstreetmap.org/search" +
      "?format=json" +
      "&limit=1" +
      "&q=" +
      encodeURIComponent(cityName);

    const response = await fetch(url);

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
        selectedLocation = await findCity(city.trim());

        setLocation(selectedLocation);
        setLocationMessage(
          selectedLocation.city
        );
      }

      const timezone =
        Intl.DateTimeFormat().resolvedOptions()
          .timeZone || "Asia/Kolkata";

      const params = new URLSearchParams({
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

  function renderChoghadiya(items: any[]) {
    if (
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return (
        <div className={styles.noData}>
          No data available.
        </div>
      );
    }

    return items.map((item, index) => (
      <div
        className={styles.choghadiyaRow}
        key={index}
      >
        <span className={styles.choghadiyaName}>
          {value(item.name)}
        </span>

        <span className={styles.choghadiyaTime}>
          {item.start || "—"} – {item.end || "—"}
        </span>
      </div>
    ));
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.eyebrow}>
          DAILY VEDIC PANCHANG
        </div>

        <h1>Daily Panchang</h1>

        <p>{formatDate(date)}</p>
      </section>

      {/* DATE & LOCATION */}

      <section className={styles.controlsSection}>
        <div className={styles.sectionLabel}>
          DATE & LOCATION
        </div>

        <div className={styles.controls}>
          <div className={styles.dateField}>
            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
              className={styles.dateInput}
            />
          </div>

          <div className={styles.locationField}>
            <input
              type="text"
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  loadPanchang();
                }
              }}
              placeholder="Enter city"
              className={styles.cityInput}
            />

            <button
              type="button"
              onClick={detectLocation}
              className={styles.detectButton}
            >
              Detect
            </button>
          </div>

          <button
            type="button"
            onClick={loadPanchang}
            className={styles.viewButton}
          >
            View Panchang
          </button>
        </div>

        <div className={styles.locationMessage}>
          {locationMessage}
        </div>
      </section>

      {/* LOADING */}

      {loading && (
        <div className={styles.loading}>
          Calculating Panchang…
        </div>
      )}

      {/* ERROR */}

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      {/* PANCHANG */}

      {data && !loading && (
        <div className={styles.content}>

          {/* DATE CARD */}

          <section className={styles.dateCard}>
            <div className={styles.cardLabel}>
              PANCHANG FOR
            </div>

            <div className={styles.dateValue}>
              {formatDate(date)}
            </div>

            <div className={styles.dateLocation}>
              {location.city}
            </div>
          </section>

          {/* PANCHANG */}

          <section className={styles.section}>
            <div className={styles.sectionHeading}>
              <h2>Panchang</h2>
            </div>

            <div className={styles.panchangGrid}>

              <div className={styles.panchangCard}>
                <div className={styles.panchangIcon}>
                  ☀️
                </div>

                <div className={styles.panchangLabel}>
                  Vara
                </div>

                <div className={styles.panchangValue}>
                  {value(data.vara?.name)}
                </div>
              </div>

              <div className={styles.panchangCard}>
                <div className={styles.panchangIcon}>
                  🌙
                </div>

                <div className={styles.panchangLabel}>
                  Tithi
                </div>

                <div className={styles.panchangValue}>
                  {value(data.tithi?.name)}
                </div>

                {data.tithi?.ends && (
                  <div className={styles.panchangEnd}>
                    Ends {data.tithi.ends}
                  </div>
                )}
              </div>

              <div className={styles.panchangCard}>
                <div className={styles.panchangIcon}>
                  ⭐
                </div>

                <div className={styles.panchangLabel}>
                  Nakshatra
                </div>

                <div className={styles.panchangValue}>
                  {value(data.nakshatra?.name)}
                </div>

                {data.nakshatra?.ends && (
                  <div className={styles.panchangEnd}>
                    Ends {data.nakshatra.ends}
                  </div>
                )}
              </div>

              <div className={styles.panchangCard}>
                <div className={styles.panchangIcon}>
                  ✨
                </div>

                <div className={styles.panchangLabel}>
                  Yoga
                </div>

                <div className={styles.panchangValue}>
                  {value(data.yoga?.name)}
                </div>

                {data.yoga?.ends && (
                  <div className={styles.panchangEnd}>
                    Ends {data.yoga.ends}
                  </div>
                )}
              </div>

              <div className={styles.panchangCard}>
                <div className={styles.panchangIcon}>
                  ◐
                </div>

                <div className={styles.panchangLabel}>
                  Karana
                </div>

                <div className={styles.panchangValue}>
                  {value(data.karana?.name)}
                </div>

                {data.karana?.ends && (
                  <div className={styles.panchangEnd}>
                    Ends {data.karana.ends}
                  </div>
                )}
              </div>

            </div>
          </section>

          {/* SUN & MOON */}

          <section className={styles.section}>
            <div className={styles.sectionHeading}>
              <h2>Sun & Moon</h2>
            </div>

            <div className={styles.twoColumnGrid}>

              <div className={styles.card}>
                <div className={styles.cardLabel}>
                  SUN
                </div>

                <div className={styles.timeList}>

                  <div className={styles.timeRow}>
                    <span>Sunrise</span>
                    <strong>
                      {value(data.sun?.rise)}
                    </strong>
                  </div>

                  <div className={styles.timeRow}>
                    <span>Sunset</span>
                    <strong>
                      {value(data.sun?.set)}
                    </strong>
                  </div>

                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardLabel}>
                  MOON
                </div>

                <div className={styles.timeList}>

                  <div className={styles.timeRow}>
                    <span>Moonrise</span>
                    <strong>
                      {value(data.moon?.rise)}
                    </strong>
                  </div>

                  <div className={styles.timeRow}>
                    <span>Moonset</span>
                    <strong>
                      {value(data.moon?.set)}
                    </strong>
                  </div>

                </div>
              </div>

            </div>
          </section>

          {/* SHUBH ASHUBH */}

          <section className={styles.section}>
            <div className={styles.sectionHeading}>
              <h2>Shubh & Ashubh Kaal</h2>
            </div>

            <div className={styles.threeColumnGrid}>

              <div className={styles.card}>
                <div className={styles.cardLabel}>
                  Rahu Kaal
                </div>
                <div className={styles.cardValue}>
                  {value(
                    data.timings?.rahuKaal
                  )}
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardLabel}>
                  Yamaganda
                </div>
                <div className={styles.cardValue}>
                  {value(
                    data.timings?.yamaganda
                  )}
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardLabel}>
                  Gulika Kaal
                </div>
                <div className={styles.cardValue}>
                  {value(
                    data.timings?.gulika
                  )}
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardLabel}>
                  Abhijit Muhurat
                </div>
                <div className={styles.cardValue}>
                  {value(
                    data.timings?.abhijit
                  )}
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardLabel}>
                  Brahma Muhurat
                </div>
                <div className={styles.cardValue}>
                  {value(
                    data.timings?.brahma
                  )}
                </div>
              </div>

            </div>
          </section>

          {/* CHOGHADIYA */}

          <section className={styles.section}>
            <div className={styles.sectionHeading}>
              <h2>Choghadiya</h2>
            </div>

            <div className={styles.twoColumnGrid}>

              <div className={styles.card}>
                <div className={styles.cardTitle}>
                  Day Choghadiya
                </div>

                {renderChoghadiya(
                  data.choghadiya?.day
                )}
              </div>

              <div className={styles.card}>
                <div className={styles.cardTitle}>
                  Night Choghadiya
                </div>

                {renderChoghadiya(
                  data.choghadiya?.night
                )}
              </div>

            </div>
          </section>

          {/* ADDITIONAL */}

          <section className={styles.section}>
            <div className={styles.sectionHeading}>
              <h2>Additional Panchang</h2>
            </div>

            <div className={styles.threeColumnGrid}>

              <div className={styles.card}>
                <div className={styles.cardLabel}>
                  Ayana
                </div>
                <div className={styles.cardValue}>
                  {value(data.ayana)}
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardLabel}>
                  Ritu
                </div>
                <div className={styles.cardValue}>
                  {value(data.ritu)}
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardLabel}>
                  Paksha
                </div>
                <div className={styles.cardValue}>
                  {value(data.paksha)}
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardLabel}>
                  Masa
                </div>
                <div className={styles.cardValue}>
                  {value(data.masa)}
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardLabel}>
                  Vikram Samvat
                </div>
                <div className={styles.cardValue}>
                  {value(data.vikramSamvat)}
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardLabel}>
                  Shaka Samvat
                </div>
                <div className={styles.cardValue}>
                  {value(data.shakaSamvat)}
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardLabel}>
                  Sun Rashi
                </div>
                <div className={styles.cardValue}>
                  {value(data.sun?.rashi?.name)}
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardLabel}>
                  Moon Rashi
                </div>
                <div className={styles.cardValue}>
                  {value(data.moon?.rashi?.name)}
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardLabel}>
                  Moon Nakshatra Pada
                </div>
                <div className={styles.cardValue}>
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
  );
}