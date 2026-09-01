"use client";

import { useState } from "react";

const API_BASE =
  "https://mauksh-kundali-engine.onrender.com";

type Location = {
  city: string;
  latitude: number | null;
  longitude: number | null;
  timezone?: string;
};

const defaultLocation: Location = {
  city: "",
  latitude: null,
  longitude: null,
  timezone: "Asia/Kolkata",
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
}

function value(
  obj: any,
  path: string[]
): string {
  let current = obj;

  for (const key of path) {
    if (
      current === null ||
      current === undefined
    ) {
      return "—";
    }

    current = current[key];
  }

  return current !== undefined &&
    current !== null &&
    current !== ""
    ? String(current)
    : "—";
}

function endValue(
  obj: any,
  path: string[]
) {
  const result = value(obj, path);

  return result !== "—"
    ? `Ends ${result}`
    : "";
}

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
      {items.map(
        (item: any, index: number) => (
          <div
            className="choghadiya-row"
            key={index}
          >
            <span>
              {item?.name || "—"}
            </span>

            <strong>
              {item?.start || "—"} –{" "}
              {item?.end || "—"}
            </strong>
          </div>
        )
      )}
    </div>
  );
}

export default function Home() {
  const [date, setDate] = useState(
    new Date()
      .toLocaleDateString("en-CA")
  );

  const [city, setCity] =
    useState("");

  const [location, setLocation] =
    useState<Location>(
      defaultLocation
    );

  const [data, setData] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function findCity(
    cityName: string
  ): Promise<Location> {
    const url =
      "https://nominatim.openstreetmap.org/search" +
      "?format=json" +
      "&limit=1" +
      "&q=" +
      encodeURIComponent(cityName);

    const response =
      await fetch(url);

    if (!response.ok) {
      throw new Error(
        "Unable to find this city."
      );
    }

    const results =
      await response.json();

    if (!results.length) {
      throw new Error(
        "City not found. Please check the city name."
      );
    }

    const result = results[0];

    return {
      city:
        result.display_name
          .split(",")[0],
      latitude:
        parseFloat(result.lat),
      longitude:
        parseFloat(result.lon),
      timezone:
        "Asia/Kolkata",
    };
  }

  function detectLocation() {
    setError("");

    if (!navigator.geolocation) {
      setError(
        "Location detection is not supported by your browser."
      );
      return;
    }

    setCity(
      "Detecting location..."
    );

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        try {
          const response =
            await fetch(
              "https://nominatim.openstreetmap.org/reverse" +
                `?format=json&lat=${latitude}&lon=${longitude}`
            );

          const result =
            await response.json();

          const address =
            result.address || {};

          const detectedCity =
            address.city ||
            address.town ||
            address.village ||
            address.municipality ||
            "Current location";

          const detectedLocation: Location = {
            city: detectedCity,
            latitude,
            longitude,
            timezone:
              "Asia/Kolkata",
          };

          setLocation(
            detectedLocation
          );

          setCity(
            detectedCity
          );
        } catch {
          setLocation({
            city: "Current location",
            latitude,
            longitude,
            timezone:
              "Asia/Kolkata",
          });

          setCity(
            "Current location"
          );
        }
      },
      () => {
        setCity("");
        setError(
          "Unable to detect location. Please enter your city."
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
    setLoading(true);
    setData(null);

    try {
      let selected =
        location;

      if (
        city &&
        city !== "Detecting location..." &&
        city !== "Current location"
      ) {
        selected =
          await findCity(city);

        setLocation(selected);
      }

      if (
        selected.latitude === null ||
        selected.longitude === null
      ) {
        throw new Error(
          "Please enter a city or use Detect."
        );
      }

      const params =
        new URLSearchParams({
          date,
          latitude:
            String(
              selected.latitude
            ),
          longitude:
            String(
              selected.longitude
            ),
          timezone:
            selected.timezone ||
            "Asia/Kolkata",
        });

      const response =
        await fetch(
          `${API_BASE}/api/panchang?${params}`
        );

      if (!response.ok) {
        throw new Error(
          "Panchang engine returned an error."
        );
      }

      const result =
        await response.json();

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

  return (
    <main className="container">

      {/* HERO */}

      <section className="hero">
        <h1>
          Daily Panchang
        </h1>

        <p>
          Vedic Panchang calculated
          for your location
        </p>
      </section>


      {/* CONTROLS */}

      <section className="controls">

        <div className="field">
          <label>
            DATE
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(
                e.target.value
              )
            }
          />
        </div>


        <div className="field">

          <label>
            LOCATION
          </label>

          <div className="location-row">

            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) =>
                setCity(
                  e.target.value
                )
              }
              onKeyDown={(e) => {
                if (
                  e.key === "Enter"
                ) {
                  loadPanchang();
                }
              }}
            />

            <button
              type="button"
              className="detect"
              onClick={
                detectLocation
              }
            >
              Detect
            </button>

          </div>

          <div className="location-display">
            {location.city
              ? location.city
              : "Enter a city or detect your location."}
          </div>

        </div>


        <div className="button-wrap">

          <button
            type="button"
            onClick={
              loadPanchang
            }
          >
            View Panchang
          </button>

        </div>

      </section>


      {/* STATES */}

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


      {/* RESULTS */}

      {data && (

        <>

          {/* DATE */}

          <section className="date-card">

            <div className="date-label">
              PANCHANG FOR
            </div>

            <div className="date-value">
              {formatDate(date)}
            </div>

            <div className="date-location">
              {location.city}
            </div>

          </section>


          {/* PANCHANG */}

          <section className="section">

            <div className="section-heading">
              <h2>
                Panchang
              </h2>
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
                  {value(
                    data,
                    ["vara", "name"]
                  )}
                </div>
              </div>


              <div className="panchang-card">
                <div className="panchang-icon">
                  🌙
                </div>

                <div className="panchang-label">
                  Tithi
                </div>

                <div className="panchang-value">
                  {value(
                    data,
                    ["tithi", "name"]
                  )}
                </div>

                <div className="panchang-end">
                  {endValue(
                    data,
                    ["tithi", "ends"]
                  )}
                </div>
              </div>


              <div className="panchang-card">
                <div className="panchang-icon">
                  ⭐
                </div>

                <div className="panchang-label">
                  Nakshatra
                </div>

                <div className="panchang-value">
                  {value(
                    data,
                    [
                      "nakshatra",
                      "name",
                    ]
                  )}
                </div>

                <div className="panchang-end">
                  {endValue(
                    data,
                    [
                      "nakshatra",
                      "ends",
                    ]
                  )}
                </div>
              </div>


              <div className="panchang-card">
                <div className="panchang-icon">
                  ✨
                </div>

                <div className="panchang-label">
                  Yoga
                </div>

                <div className="panchang-value">
                  {value(
                    data,
                    ["yoga", "name"]
                  )}
                </div>

                <div className="panchang-end">
                  {endValue(
                    data,
                    ["yoga", "ends"]
                  )}
                </div>
              </div>


              <div className="panchang-card">
                <div className="panchang-icon">
                  ◐
                </div>

                <div className="panchang-label">
                  Karana
                </div>

                <div className="panchang-value">
                  {value(
                    data,
                    ["karana", "name"]
                  )}
                </div>

                <div className="panchang-end">
                  {endValue(
                    data,
                    [
                      "karana",
                      "ends",
                    ]
                  )}
                </div>
              </div>

            </div>

          </section>


          {/* SUN & MOON */}

          <section className="section">

            <div className="section-heading">
              <h2>
                Sun & Moon
              </h2>
            </div>

            <div className="grid">

              <div className="card">

                <div className="card-label">
                  Sun
                </div>

                <div className="time-list">

                  <div className="time-row">
                    <span>
                      Sunrise
                    </span>

                    <strong>
                      {value(
                        data,
                        [
                          "sun",
                          "rise",
                        ]
                      )}
                    </strong>
                  </div>

                  <div className="time-row">
                    <span>
                      Sunset
                    </span>

                    <strong>
                      {value(
                        data,
                        [
                          "sun",
                          "set",
                        ]
                      )}
                    </strong>
                  </div>

                </div>

              </div>


              <div className="card">

                <div className="card-label">
                  Moon
                </div>

                <div className="time-list">

                  <div className="time-row">
                    <span>
                      Moonrise
                    </span>

                    <strong>
                      {value(
                        data,
                        [
                          "moon",
                          "rise",
                        ]
                      )}
                    </strong>
                  </div>

                  <div className="time-row">
                    <span>
                      Moonset
                    </span>

                    <strong>
                      {value(
                        data,
                        [
                          "moon",
                          "set",
                        ]
                      )}
                    </strong>
                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* KAAL */}

          <section className="section">

            <div className="section-heading">
              <h2>
                Shubh & Ashubh Kaal
              </h2>
            </div>

            <div className="grid grid-three">

              {[
                ["Rahu Kaal", "rahuKaal"],
                ["Yamaganda", "yamaganda"],
                ["Gulika Kaal", "gulika"],
                ["Abhijit Muhurat", "abhijit"],
                ["Brahma Muhurat", "brahma"],
              ].map(
                ([label, key]) => (
                  <div
                    className="card"
                    key={key}
                  >
                    <div className="card-label">
                      {label}
                    </div>

                    <div className="card-value">
                      {data.timings?.[
                        key
                      ] || "—"}
                    </div>
                  </div>
                )
              )}

            </div>

          </section>


          {/* CHOGHADIYA */}

          <section className="section">

            <div className="section-heading">
              <h2>
                Choghadiya
              </h2>
            </div>

            <div className="choghadiya-grid">

              <div className="choghadiya-card">

                <h3>
                  Day Choghadiya
                </h3>

                <Choghadiya
                  items={
                    data.choghadiya
                      ?.day
                  }
                />

              </div>


              <div className="choghadiya-card">

                <h3>
                  Night Choghadiya
                </h3>

                <Choghadiya
                  items={
                    data.choghadiya
                      ?.night
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

            <div className="grid grid-three">

              {[
                ["Ayana", "ayana"],
                ["Ritu", "ritu"],
                ["Paksha", "paksha"],
                ["Masa", "masa"],
                [
                  "Vikram Samvat",
                  "vikramSamvat",
                ],
                [
                  "Shaka Samvat",
                  "shakaSamvat",
                ],
              ].map(
                ([label, key]) => (
                  <div
                    className="card"
                    key={key}
                  >
                    <div className="card-label">
                      {label}
                    </div>

                    <div className="card-value">
                      {data[key] ||
                        "—"}
                    </div>
                  </div>
                )
              )}


              <div className="card">

                <div className="card-label">
                  Sun Rashi
                </div>

                <div className="card-value">
                  {value(
                    data,
                    [
                      "sun",
                      "rashi",
                      "name",
                    ]
                  )}
                </div>

              </div>


              <div className="card">

                <div className="card-label">
                  Moon Rashi
                </div>

                <div className="card-value">
                  {value(
                    data,
                    [
                      "moon",
                      "rashi",
                      "name",
                    ]
                  )}
                </div>

              </div>


              <div className="card">

                <div className="card-label">
                  Moon Nakshatra Pada
                </div>

                <div className="card-value">

                  {data.moon
                    ?.nakshatra
                    ?.pada
                    ? `Pada ${data.moon.nakshatra.pada}`
                    : "—"}

                </div>

              </div>

            </div>

          </section>

        </>

      )}

    </main>
  );
}