"use client";

import { useEffect, useState } from "react";

const API_BASE =
  "https://mauksh-kundali-engine.onrender.com";

type LocationState = {
  city: string;
  latitude: number | null;
  longitude: number | null;
};

type PanchangData = {
  vara?: {
    name?: string;
  };
  tithi?: {
    name?: string;
    ends?: string;
  };
  nakshatra?: {
    name?: string;
    ends?: string;
  };
  yoga?: {
    name?: string;
    ends?: string;
  };
  karana?: {
    name?: string;
    ends?: string;
  };
  sun?: {
    rise?: string;
    set?: string;
    rashi?: {
      name?: string;
    };
  };
  moon?: {
    rise?: string;
    set?: string;
    rashi?: {
      name?: string;
    };
    nakshatra?: {
      pada?: number | string;
    };
  };
  timings?: {
    rahuKaal?: string;
    yamaganda?: string;
    gulika?: string;
    abhijit?: string;
    brahma?: string;
  };
  choghadiya?: {
    day?: ChoghadiyaItem[];
    night?: ChoghadiyaItem[];
  };
  ayana?: string;
  ritu?: string;
  paksha?: string;
  masa?: string;
  vikramSamvat?: string | number;
  shakaSamvat?: string | number;
};

type ChoghadiyaItem = {
  name?: string;
  start?: string;
  end?: string;
};

function getToday() {
  const d = new Date();

  return `${d.getFullYear()}-${String(
    d.getMonth() + 1
  ).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatDate(date: string) {
  return new Date(
    `${date}T00:00:00`
  ).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function HomePage() {
  const [date, setDate] = useState(getToday());

  const [city, setCity] = useState("");

  const [location, setLocation] =
    useState<LocationState>({
      city: "",
      latitude: null,
      longitude: null,
    });

  const [data, setData] =
    useState<PanchangData | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function findCity(cityName: string) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
        cityName
      )}`
    );

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
      city:
        results[0].display_name.split(",")[0],
      latitude: parseFloat(results[0].lat),
      longitude: parseFloat(results[0].lon),
    };
  }

  async function detectLocation() {
    setError("");

    if (!navigator.geolocation) {
      setError(
        "Location detection is not supported by your browser."
      );
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude =
            position.coords.latitude;

          const longitude =
            position.coords.longitude;

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
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

          const detected = {
            city: detectedCity,
            latitude,
            longitude,
          };

          setLocation(detected);
          setCity(detectedCity);

          await loadPanchang(
            detected,
            date
          );
        } catch {
          setError(
            "Unable to detect your location."
          );
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
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

  async function loadPanchang(
    selectedLocation?: LocationState,
    selectedDate?: string
  ) {
    setError("");

    const finalDate =
      selectedDate || date;

    let finalLocation =
      selectedLocation || location;

    try {
      if (!finalDate) {
        throw new Error(
          "Please select a date."
        );
      }

      if (
        city &&
        (!selectedLocation ||
          city !== selectedLocation.city)
      ) {
        const found =
          await findCity(city);

        finalLocation = found;

        setLocation(found);
      }

      if (
        finalLocation.latitude === null ||
        finalLocation.longitude === null
      ) {
        throw new Error(
          "Please enter a city or use Detect."
        );
      }

      setLoading(true);

      const timezone =
        Intl.DateTimeFormat()
          .resolvedOptions()
          .timeZone ||
        "Asia/Kolkata";

      const params =
        new URLSearchParams({
          date: finalDate,
          latitude:
            String(finalLocation.latitude),
          longitude:
            String(finalLocation.longitude),
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

      const result =
        await response.json();

      setData(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load Panchang."
      );

      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const savedCity =
      localStorage.getItem(
        "kaaldarpan-city"
      );

    if (savedCity) {
      setCity(savedCity);
    }
  }, []);

  function handleCityChange(
    value: string
  ) {
    setCity(value);
    localStorage.setItem(
      "kaaldarpan-city",
      value
    );
  }

  return (
    <div className="panchang-page">

      {/* PAGE TITLE */}

      <section className="panchang-hero">

        <div className="panchang-eyebrow">
          DAILY VEDIC PANCHANG
        </div>

        <h1>Daily Panchang</h1>

        <p>
          {formatDate(date)}
        </p>

      </section>


      {/* CONTROLS */}

      <section className="panchang-location">

        <div className="location-label">
          DATE & LOCATION
        </div>

        <div className="location-row">

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="location-input"
          />

          <input
            type="text"
            value={city}
            onChange={(e) =>
              handleCityChange(
                e.target.value
              )
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                loadPanchang();
              }
            }}
            placeholder="Enter city"
            className="location-input"
          />

          <button
            className="location-button"
            type="button"
            onClick={detectLocation}
          >
            Detect
          </button>

          <button
            className="location-button"
            type="button"
            onClick={() =>
              loadPanchang()
            }
          >
            View Panchang
          </button>

        </div>

      </section>


      {/* STATUS */}

      {loading && (
        <div className="panchang-status">
          Calculating Panchang…
        </div>
      )}

      {error && (
        <div className="panchang-error">
          {error}
        </div>
      )}


      {data && (
        <>

          {/* DATE */}

          <section className="panchang-date-card">

            <div>
              <span>
                PANCHANG FOR
              </span>

              <strong>
                {formatDate(date)}
              </strong>
            </div>

            <div>
              <span>
                LOCATION
              </span>

              <strong>
                {location.city}
              </strong>
            </div>

          </section>


          {/* FIVE LIMBS */}

          <section className="panchang-section">

            <div className="section-heading">
              <span>
                FIVE LIMBS OF PANCHANG
              </span>

              <h2>Panchang</h2>
            </div>


            <div className="panchang-grid">

              <PanchangCard
                icon="☀"
                label="Vara"
                value={
                  data.vara?.name
                }
              />

              <PanchangCard
                icon="☾"
                label="Tithi"
                value={
                  data.tithi?.name
                }
                detail={
                  data.tithi?.ends
                    ? `Ends ${data.tithi.ends}`
                    : undefined
                }
              />

              <PanchangCard
                icon="✦"
                label="Nakshatra"
                value={
                  data.nakshatra?.name
                }
                detail={
                  data.nakshatra?.ends
                    ? `Ends ${data.nakshatra.ends}`
                    : undefined
                }
              />

              <PanchangCard
                icon="✧"
                label="Yoga"
                value={
                  data.yoga?.name
                }
                detail={
                  data.yoga?.ends
                    ? `Ends ${data.yoga.ends}`
                    : undefined
                }
              />

              <PanchangCard
                icon="◐"
                label="Karana"
                value={
                  data.karana?.name
                }
                detail={
                  data.karana?.ends
                    ? `Ends ${data.karana.ends}`
                    : undefined
                }
              />

            </div>

          </section>


          {/* SUN & MOON */}

          <section className="panchang-section">

            <div className="section-heading">
              <span>
                ASTRONOMICAL TIMINGS
              </span>

              <h2>Sun & Moon</h2>
            </div>


            <div className="timing-grid">

              <TimingCard
                icon="☀"
                label="Sunrise"
                value={
                  data.sun?.rise
                }
              />

              <TimingCard
                icon="☀"
                label="Sunset"
                value={
                  data.sun?.set
                }
              />

              <TimingCard
                icon="☾"
                label="Moonrise"
                value={
                  data.moon?.rise
                }
              />

              <TimingCard
                icon="☽"
                label="Moonset"
                value={
                  data.moon?.set
                }
              />

            </div>

          </section>


          {/* SHUBH ASHUBH */}

          <section className="panchang-section">

            <div className="section-heading">
              <span>
                DAILY TIMINGS
              </span>

              <h2>
                Shubh & Ashubh Kaal
              </h2>
            </div>


            <div className="muhurat-grid">

              <SimpleCard
                label="Rahu Kaal"
                value={
                  data.timings?.rahuKaal
                }
              />

              <SimpleCard
                label="Yamaganda"
                value={
                  data.timings?.yamaganda
                }
              />

              <SimpleCard
                label="Gulika Kaal"
                value={
                  data.timings?.gulika
                }
              />

              <SimpleCard
                label="Abhijit Muhurat"
                value={
                  data.timings?.abhijit
                }
              />

              <SimpleCard
                label="Brahma Muhurat"
                value={
                  data.timings?.brahma
                }
              />

            </div>

          </section>


          {/* CHOGHADIYA */}

          <section className="panchang-section">

            <div className="section-heading">
              <span>
                CHOGHADIYA
              </span>

              <h2>Day & Night</h2>
            </div>


            <div className="choghadiya-grid">

              <ChoghadiyaCard
                title="Day Choghadiya"
                items={
                  data.choghadiya?.day
                }
              />

              <ChoghadiyaCard
                title="Night Choghadiya"
                items={
                  data.choghadiya?.night
                }
              />

            </div>

          </section>


          {/* ADDITIONAL */}

          <section className="panchang-section">

            <div className="section-heading">
              <span>
                VEDIC CALENDAR
              </span>

              <h2>
                Additional Panchang
              </h2>
            </div>


            <div className="muhurat-grid">

              <SimpleCard
                label="Ayana"
                value={data.ayana}
              />

              <SimpleCard
                label="Ritu"
                value={data.ritu}
              />

              <SimpleCard
                label="Paksha"
                value={data.paksha}
              />

              <SimpleCard
                label="Masa"
                value={data.masa}
              />

              <SimpleCard
                label="Vikram Samvat"
                value={
                  data.vikramSamvat
                }
              />

              <SimpleCard
                label="Shaka Samvat"
                value={
                  data.shakaSamvat
                }
              />

              <SimpleCard
                label="Sun Rashi"
                value={
                  data.sun?.rashi?.name
                }
              />

              <SimpleCard
                label="Moon Rashi"
                value={
                  data.moon?.rashi?.name
                }
              />

              <SimpleCard
                label="Moon Nakshatra Pada"
                value={
                  data.moon?.nakshatra
                    ?.pada
                    ? `Pada ${data.moon.nakshatra.pada}`
                    : undefined
                }
              />

            </div>

          </section>

        </>
      )}

    </div>
  );
}


/* ========================================================
   SMALL COMPONENTS
======================================================== */

function PanchangCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: string;
  label: string;
  value?: string;
  detail?: string;
}) {
  return (
    <article className="panchang-card">

      <div className="panchang-card-icon">
        {icon}
      </div>

      <div className="card-label">
        {label}
      </div>

      <div className="card-value">
        {value || "—"}
      </div>

      {detail && (
        <div className="card-detail">
          {detail}
        </div>
      )}

    </article>
  );
}


function TimingCard({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value?: string;
}) {
  return (
    <article className="timing-card">

      <div className="timing-icon">
        {icon}
      </div>

      <div>
        <span>{label}</span>
        <strong>
          {value || "—"}
        </strong>
      </div>

    </article>
  );
}


function SimpleCard({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) {
  return (
    <article className="muhurat-card">

      <div className="muhurat-title">
        {label}
      </div>

      <div className="muhurat-time">
        {value || "—"}
      </div>

    </article>
  );
}


function ChoghadiyaCard({
  title,
  items,
}: {
  title: string;
  items?: ChoghadiyaItem[];
}) {
  return (
    <article className="choghadiya-card">

      <h3>{title}</h3>

      {!items?.length && (
        <div className="card-detail">
          No data available.
        </div>
      )}

      {items?.map(
        (item, index) => (
          <div
            className="choghadiya-row"
            key={`${item.name}-${index}`}
          >

            <span>
              {item.name || "—"}
            </span>

            <strong>
              {item.start || "—"}
              {" – "}
              {item.end || "—"}
            </strong>

          </div>
        )
      )}

    </article>
  );
}