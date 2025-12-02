// src/App.jsx
import { useEffect, useRef, useState } from "react";
import logo from "./assets/logo.svg";

import tapSound from "./assets/audio/ui-tap.mp3";
import "./App.css";
import { SCREEN_PRICING, BATTERY_PRICING } from "./pricing";

// Brand / model list for dropdown
const PHONE_DATA = [
  {
    brand: "Apple",
    models: [
      "iPhone 8",
      "iPhone 8 Plus",
      "iPhone X",
      "iPhone XR",
      "iPhone XS",
      "iPhone XS Max",
      "iPhone 11",
      "iPhone 11 Pro",
      "iPhone 11 Pro Max",
      "iPhone 12",
      "iPhone 12 Pro",
      "iPhone 12 Pro Max",
      "iPhone 13",
      "iPhone 13 Pro",
      "iPhone 13 Pro Max",
      "iPhone 14",
      "iPhone 14 Plus",
      "iPhone 14 Pro",
      "iPhone 14 Pro Max",
      "iPhone 15",
      "iPhone 15 Plus",
      "iPhone 15 Pro",
      "iPhone 15 Pro Max",
      "iPhone 16",
      "iPhone 16 Plus",
      "iPhone 16 Pro",
      "iPhone 16 Pro Max",
    ],
  },
  {
    brand: "Samsung",
    models: ["Galaxy S21", "Galaxy S22", "Galaxy S23", "Galaxy A54"],
  },
  {
    brand: "Google",
    models: ["Pixel 6", "Pixel 7", "Pixel 8"],
  },
];

const ISSUES = ["Screen Replacement", "Battery Replacement", "Not sure / Other"];
const PAYMENT_METHODS = ["Zelle", "Cash"];

// Only 2 screen qualities now
const QUALITY_OPTIONS = [
  {
    key: "aftermarket",
    label: "Aftermarket",
    short: "Budget-friendly",
    description: "Good quality replacement screen – best value for money.",
  },
  {
    key: "premium",
    label: "Premium",
    short: "Closest to original",
    description: "Best color & brightness. Closest to factory screen.",
  },
];

// Animated repair timeline steps
const TIMELINE_STEPS = [
  {
    id: 1,
    label: "You book",
    title: "Send us your phone & issue",
    desc: "You choose your phone, issue, and a time that works for you. No payment upfront.",
    icon: "📲",
  },
  {
    id: 2,
    label: "We confirm",
    title: "We text you to lock in the slot",
    desc: "We double-check parts availability and confirm your appointment by text.",
    icon: "✅",
  },
  {
    id: 3,
    label: "Tech on the way",
    title: "Your technician drives to you",
    desc: "On the day, your tech heads to your home or office – no driving or waiting rooms for you.",
    icon: "🚗",
  },
  {
    id: 4,
    label: "We repair on-site",
    title: "Fix done, you test, then you pay",
    desc: "Most repairs are done in under an hour. You pay only after you're happy with the result.",
    icon: "🔧",
  },
];

function App() {
  const [step, setStep] = useState(1);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [issue, setIssue] = useState("");
  const [screenQuality, setScreenQuality] = useState("aftermarket");

  const [otherBrandText, setOtherBrandText] = useState("");
  const [otherModelText, setOtherModelText] = useState("");

  const [customer, setCustomer] = useState({
    FirstName: "",
    LastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    date: "",
    time: "",
    paymentMethod: "Zelle",
  });

  const [submitted, setSubmitted] = useState(false);

  // smooth scroll to booking + audio tap
  const bookingRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(tapSound);
  }, []);

  const playTap = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const handleHeroBook = () => {
    playTap();
    setSubmitted(false);
    setStep(1);
    if (bookingRef.current) {
      bookingRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const isOtherBrand = selectedBrand === "__otherBrand";
  const isOtherModel = selectedModel === "__other";

  const modelsForBrand = !isOtherBrand
    ? PHONE_DATA.find((p) => p.brand === selectedBrand)?.models || []
    : [];

  // ---------- pricing helpers (screens + battery) ----------

  const hasKnownDevice =
    !isOtherBrand &&
    !isOtherModel &&
    selectedBrand &&
    selectedModel &&
    ((SCREEN_PRICING[selectedBrand] &&
      SCREEN_PRICING[selectedBrand][selectedModel]) ||
      (BATTERY_PRICING[selectedBrand] &&
        BATTERY_PRICING[selectedBrand][selectedModel]));

  let rawPrice = null;

  if (hasKnownDevice) {
    if (issue === "Screen Replacement") {
      const screenPricing = SCREEN_PRICING[selectedBrand]?.[selectedModel];
      if (screenPricing) {
        rawPrice = screenPricing[screenQuality] ?? null;
      }
    } else if (issue === "Battery Replacement") {
      const batteryPricing = BATTERY_PRICING[selectedBrand]?.[selectedModel];
      if (batteryPricing != null) {
        rawPrice = batteryPricing;
      }
    }
  }

  const priceForSelection = rawPrice;

  // ---------- step handlers ----------

  function handleNextFromStep1() {
    playTap();

    if (!selectedBrand) {
      alert("Please select a brand.");
      return;
    }

    if (isOtherBrand) {
      if (!otherBrandText.trim() || !otherModelText.trim()) {
        alert("Please type your phone brand and model.");
        return;
      }
      setStep(2);
      return;
    }

    if (!selectedModel) {
      alert("Please select a model.");
      return;
    }

    if (isOtherModel && !otherModelText.trim()) {
      alert("Please type your phone model.");
      return;
    }

    setStep(2);
  }

  function handleNextFromStep2() {
    playTap();
    if (!issue) {
      alert("Please select an issue.");
      return;
    }
    setStep(3);
  }

  function handleCustomerChange(e) {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  }

  // ---------- submit & send to Google Sheets ----------

  async function handleSubmit(e) {
    e.preventDefault();
    playTap();
    console.log("✅ handleSubmit fired");

    if (
      !selectedBrand ||
      (!isOtherBrand && !selectedModel) ||
      !issue ||
      !customer.FirstName ||
       !customer.LastName ||
      !customer.phone ||
      !customer.address ||
      !customer.city ||
      !customer.zip ||
      !customer.date ||
      !customer.time
    ) {
      alert("Please fill in all required fields (marked with *).");
      return;
    }

    const effectiveBrand = isOtherBrand
      ? otherBrandText.trim() || "Other brand"
      : selectedBrand;

    const effectiveModel =
      isOtherBrand || isOtherModel
        ? otherModelText.trim() || "Other model"
        : selectedModel;

    const effectiveScreenQuality =
      issue === "Screen Replacement" ? screenQuality : "";

    // use same computed price for both screen & battery when known
    let estPrice = "";
    if (
      priceForSelection != null &&
      (issue === "Screen Replacement" || issue === "Battery Replacement")
    ) {
      estPrice = priceForSelection;
    }

    const payload = {
      Brand: effectiveBrand,
      Model: effectiveModel,
      CustomBrand: isOtherBrand ? otherBrandText.trim() || "" : "",
      CustomModel:
        isOtherBrand || isOtherModel ? otherModelText.trim() || "" : "",
      Issue: issue,
      ScreenQuality: effectiveScreenQuality,
      EstPrice: estPrice,
      FirstName: customer.FirstName,
       LastName: customer.LastName,
      Phone: customer.phone,
      Email: customer.email,
      Address: customer.address,
      City: customer.city,
      ZIP: customer.zip,
      Date: customer.date,
      Time: customer.time,
      PaymentMethod: customer.paymentMethod,
    };

    console.log("📦 Booking payload:", payload);

    const WEB_APP_URL =
      "https://script.google.com/macros/s/AKfycbxawpysf2R4wR5IxFZNpgcSSxnCA6VNe_PBL9kMBqIWcrP3cwpem6J2NzBn5pTsFzwrHw/exec";

    try {
      await fetch(WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("✅ Sent to Google Sheets");
    } catch (err) {
      console.error("❌ Error sending to Google Sheets:", err);
      alert(
        "We submitted your booking on the site, but had an issue logging it to our sheet."
      );
    }

    setSubmitted(true);
    setStep(4);
    alert("Booking submitted! Check your Google Sheet for a new row.");
  }

  const displayBrand = isOtherBrand
    ? otherBrandText || "Custom brand"
    : selectedBrand;
  const displayModel =
    isOtherBrand || isOtherModel
      ? otherModelText || "Custom model"
      : selectedModel;

  // ---------- JSX ----------

  return (
    <div className="app">
      <div className="shell">
        {/* LEFT – HERO */}
        <header className="header">
          <div className="header-inner">
            <div className="logo-row">
             <img src={logo} alt="ATDOORFIX logo" className="logo-image" />

            
            </div>

            <h1>
              We fix your <span>phone</span>
              <br />
              right at your doorstep.
            </h1>

            <p>Same-day screen &amp; battery repair at your home or office.</p>
     <p className="service-area">
  <span className="pin">📍</span>
  <span className="label">Now serving:</span>
  <span className="city">Daytona Beach</span> · 
  <span className="city">Ormond Beach</span> · 
  <span className="city">DeLand</span> · 
  <span className="city">Deltona</span> · 
  <span className="city">New Smyrna</span> · 
  <span className="city">Port Orange (FL)</span>
</p>



            <div className="hero-tags">
              <span className="hero-tag">🚗 Mobile technician</span>
              <span className="hero-tag">⚡ Same-day slots</span>
              <span className="hero-tag">💳 Zelle or Cash</span>
            </div>

            <div className="hero-btn-row">
              <button className="btn primary" onClick={handleHeroBook}>
                Book a repair
              </button>
              <span className="hero-note">No upfront payment required.</span>
            </div>
          </div>
        </header>

        {/* RIGHT – FORM CARD */}
        <main className="card" ref={bookingRef}>
          {/* Stepper */}
          <div className="steps">
            <span className={step >= 1 ? "step active" : "step"}>
              <span className="step-dot">1</span>
              <span className="step-label">Device</span>
            </span>
            <span className={step >= 2 ? "step active" : "step"}>
              <span className="step-dot">2</span>
              <span className="step-label">Issue &amp; screen</span>
            </span>
            <span className={step >= 3 ? "step active" : "step"}>
              <span className="step-dot">3</span>
              <span className="step-label">Details</span>
            </span>
            <span className={step >= 4 ? "step active" : "step"}>
              <span className="step-dot">4</span>
              <span className="step-label">Confirm</span>
            </span>
          </div>

          {/* STEP 1 – Device */}
          {step === 1 && (
            <section>
              <h2>Select your phone</h2>
              <p>Tell us what you’re using so we bring the right parts.</p>

              {/* BRAND */}
              <div className="field">
                <label>Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => {
                    setSelectedBrand(e.target.value);
                    setSelectedModel("");
                    setOtherBrandText("");
                    setOtherModelText("");
                  }}
                >
                  <option value="">Choose brand</option>
                  {PHONE_DATA.map((p) => (
                    <option key={p.brand} value={p.brand}>
                      {p.brand}
                    </option>
                  ))}
                  <option value="__otherBrand">Other brand (not listed)</option>
                </select>
              </div>

              {/* MODEL */}
              <div className="field">
                <label>Model</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={!selectedBrand || isOtherBrand}
                >
                  <option value="">
                    {selectedBrand
                      ? isOtherBrand
                        ? "Model handled below"
                        : "Choose model"
                      : "Select brand first"}
                  </option>
                  {modelsForBrand.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                  {!isOtherBrand && selectedBrand && (
                    <option value="__other">Other (not listed)</option>
                  )}
                </select>
              </div>

              {/* FIELDS WHEN OTHER BRAND */}
              {isOtherBrand && (
                <>
                  <div className="field">
                    <label>Phone brand *</label>
                    <input
                      type="text"
                      value={otherBrandText}
                      onChange={(e) => setOtherBrandText(e.target.value)}
                      placeholder="Example: Huawei, OnePlus, Xiaomi, Motorola..."
                    />
                  </div>

                  <div className="field">
                    <label>Phone model *</label>
                    <input
                      type="text"
                      value={otherModelText}
                      onChange={(e) => setOtherModelText(e.target.value)}
                      placeholder="Example: P40 Pro, OnePlus 11R, Redmi Note 13..."
                    />
                  </div>

                  <div className="field">
                    <label>Preferred screen quality</label>
                    <select
                      value={screenQuality}
                      onChange={(e) => setScreenQuality(e.target.value)}
                    >
                      {QUALITY_OPTIONS.map((q) => (
                        <option key={q.key} value={q.key}>
                          {q.label} – {q.short}
                        </option>
                      ))}
                    </select>
                    <p
                      style={{
                        fontSize: "0.78rem",
                        marginTop: "4px",
                        color: "#9ca3af",
                      }}
                    >
                      We&apos;ll check availability for your exact phone and text
                      you back with price before confirming.
                    </p>
                  </div>
                </>
              )}

              {/* FIELDS WHEN BRAND NORMAL BUT MODEL = OTHER */}
              {!isOtherBrand && isOtherModel && (
                <>
                  <div className="field">
                    <label>Phone model *</label>
                    <input
                      type="text"
                      value={otherModelText}
                      onChange={(e) => setOtherModelText(e.target.value)}
                      placeholder="Type your exact model (e.g. iPhone SE 2022)"
                    />
                  </div>

                  <div className="field">
                    <label>Preferred screen quality</label>
                    <select
                      value={screenQuality}
                      onChange={(e) => setScreenQuality(e.target.value)}
                    >
                      {QUALITY_OPTIONS.map((q) => (
                        <option key={q.key} value={q.key}>
                          {q.label} – {q.short}
                        </option>
                      ))}
                    </select>
                    <p
                      style={{
                        fontSize: "0.78rem",
                        marginTop: "4px",
                        color: "#9ca3af",
                      }}
                    >
                      We&apos;ll confirm availability for this exact model and
                      send you the final price before confirming.
                    </p>
                  </div>
                </>
              )}

              <div className="buttons">
                <button className="btn primary" onClick={handleNextFromStep1}>
                  Next: Choose issue
                </button>
              </div>
            </section>
          )}

          {/* STEP 2 – Issue + Screen/Battery info */}
          {step === 2 && (
            <section>
              <h2>Issue &amp; screen</h2>
              <p>
                Tell us what’s wrong. If it’s a screen repair we’ll show you the
                screen options.
              </p>

              {/* ISSUE */}
              <div className="field">
                <label>Problem</label>
                <select
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                >
                  <option value="">Choose issue</option>
                  {ISSUES.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>

              {/* Screen quality only for Screen Replacement */}
              {issue === "Screen Replacement" && (
                <div className="field">
                  <label>Screen quality preference</label>
                  <div className="quality-box">
                    {QUALITY_OPTIONS.map((q) => {
                      const perQualityPrice =
                        hasKnownDevice &&
                        SCREEN_PRICING[selectedBrand]?.[selectedModel]?.[q.key];

                      return (
                        <label key={q.key}>
                          <input
                            type="radio"
                            name="screenQuality"
                            value={q.key}
                            checked={screenQuality === q.key}
                            onChange={(e) => setScreenQuality(e.target.value)}
                          />
                          <span>
                            <strong>
                              {q.label} – {q.short}
                            </strong>
                            <br />
                            <span style={{ fontSize: "0.8rem" }}>
                              {q.description}{" "}
                              {perQualityPrice != null && (
                                <>
                                  ·{" "}
                                  <span style={{ color: "#a5b4fc" }}>
                                    Est. ${perQualityPrice.toFixed(2)}
                                  </span>
                                </>
                              )}
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  {(isOtherBrand || isOtherModel) && (
                    <p
                      style={{
                        fontSize: "0.78rem",
                        marginTop: "6px",
                        color: "#9ca3af",
                      }}
                    >
                      Because your phone is custom or not on our list,{" "}
                      <strong>
                        we&apos;ll check parts availability and text you your
                        price
                      </strong>{" "}
                      for this screen quality before confirming the job.
                    </p>
                  )}
                </div>
              )}

              {/* Battery price hint */}
              {issue === "Battery Replacement" && (
                <div className="info-box">
                  {priceForSelection != null ? (
                    <p>
                      Estimated total for{" "}
                      <strong>battery replacement</strong> on your{" "}
                      <strong>
                        {displayBrand} {displayModel}
                      </strong>
                      :{" "}
                      <strong>${priceForSelection.toFixed(2)}</strong> (parts +
                      labor).
                    </p>
                  ) : (
                    <p>
                      Once we check the exact battery for your model,{" "}
                      <strong>we&apos;ll text you the final price</strong>{" "}
                      before confirming anything.
                    </p>
                  )}
                </div>
              )}

              <div className="buttons">
                <button
                  className="btn secondary"
                  onClick={() => {
                    playTap();
                    setStep(1);
                  }}
                >
                  Back
                </button>
                <button className="btn primary" onClick={handleNextFromStep2}>
                  Next: Your details
                </button>
              </div>
            </section>
          )}

          {/* STEP 3 – Customer details */}
          {step === 3 && (
            <section>
              <h2>Your details &amp; appointment</h2>
              <p>We’ll come to you at your chosen time.</p>

              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label>First name *</label>
                  <input
                    type="text"
                    name="FirstName"
                    value={customer.FirstName}
                    onChange={handleCustomerChange}
                    placeholder="John"
                  />
                </div>

                  <div className="field">
                  <label>Last name *</label>
                  <input
                    type="text"
                    name="LastName"
                    value={customer.LastName}
                    onChange={handleCustomerChange}
                    placeholder=" Doe"
                  />
                </div>
                

                <div className="field">
                  <label>Phone number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={customer.phone}
                    onChange={handleCustomerChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="field">
                  <label>Email (optional)</label>
                  <input
                    type="email"
                    name="email"
                    value={customer.email}
                    onChange={handleCustomerChange}
                    placeholder="you@example.com"
                  />
                </div>

                <div className="field">
                  <label>Street address *</label>
                  <input
                    type="text"
                    name="address"
                    value={customer.address}
                    onChange={handleCustomerChange}
                    placeholder="123 Main St, Apt 4B"
                  />
                </div>

                <div className="field-row">
                  <div className="field">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={customer.city}
                      onChange={handleCustomerChange}
                      placeholder="Your city"
                    />
                  </div>
                  <div className="field">
                    <label>ZIP code *</label>
                    <input
                      type="text"
                      name="zip"
                      value={customer.zip}
                      onChange={handleCustomerChange}
                      placeholder="XXXXX"
                    />
                  </div>
                </div>

                <div className="field-row">
                  <div className="field">
                    <label>Preferred date *</label>
                    <input
                      type="date"
                      name="date"
                      value={customer.date}
                      onChange={handleCustomerChange}
                    />
                  </div>
                  <div className="field">
                    <label>Preferred time *</label>
                    <input
                      type="time"
                      name="time"
                      value={customer.time}
                      onChange={handleCustomerChange}
                    />
                  </div>
                </div>

                <div className="field">
                  <label>Payment method</label>
                  <select
                    name="paymentMethod"
                    value={customer.paymentMethod}
                    onChange={handleCustomerChange}
                  >
                    {PAYMENT_METHODS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="buttons">
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={() => {
                      playTap();
                      setStep(2);
                    }}
                  >
                    Back
                  </button>
                  <button type="submit" className="btn primary">
                    Submit booking
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* STEP 4 – Confirmation */}
          {step === 4 && submitted && (
            <section>
              <h2>Thank you! 🎉</h2>
              <p>
                We received your request for{" "}
                <strong>
                  {displayBrand} {displayModel} –{" "}
                  {issue || "Issue to be diagnosed"}
                </strong>
                .
              </p>

              <p>
                Appointment:{" "}
                <strong>
                  {customer.date} at {customer.time}
                </strong>
              </p>
              <p>
                Address:{" "}
                <strong>
                  {customer.address}, {customer.city} {customer.zip}
                </strong>
              </p>
              <p>
                Payment method: <strong>{customer.paymentMethod}</strong>
              </p>

              {/* Screen price summary */}
              {issue === "Screen Replacement" && (
                <>
                  <p>
                    Screen quality chosen:{" "}
                    <strong>
                      {
                        QUALITY_OPTIONS.find((q) => q.key === screenQuality)
                          ?.label
                      }
                    </strong>
                  </p>

                  {priceForSelection != null ? (
                    <p>
                      Estimated total for your screen replacement:{" "}
                      <strong>${priceForSelection.toFixed(2)}</strong> (parts +
                      labor).
                    </p>
                  ) : (
                    <p>
                      Because your phone is custom or not on our list,{" "}
                      <strong>
                        we&apos;ll text you back with price &amp; parts
                        availability
                      </strong>{" "}
                      for your chosen screen quality before confirming the job.
                    </p>
                  )}
                </>
              )}

              {/* Battery price summary */}
              {issue === "Battery Replacement" && (
                <>
                  {priceForSelection != null ? (
                    <p>
                      Estimated total for your battery replacement:{" "}
                      <strong>${priceForSelection.toFixed(2)}</strong> (parts +
                      labor).
                    </p>
                  ) : (
                    <p>
                      We&apos;ll confirm the exact battery price for your model
                      and text you before starting any work.
                    </p>
                  )}
                </>
              )}

              {customer.paymentMethod === "Zelle" && (
                <div className="info-box">
                  <p>
                    You can pay via Zelle to:{" "}
                    <strong>your-zelle-email@example.com</strong> or{" "}
                    <strong>+1-234-567-8901</strong> after the repair is
                    complete.
                  </p>
                </div>
              )}

              <p>We will contact you shortly to confirm your appointment.</p>

              <div className="buttons">
                <button
                  className="btn secondary"
                  onClick={() => {
                    playTap();
                    setSubmitted(false);
                    setStep(1);
                  }}
                >
                  Book another repair
                </button>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* ====== Animated repair timeline ====== */}
      <section className="timeline-section">
        <div className="timeline-card">
          <h2>What happens after you book?</h2>
          <p className="timeline-intro">
            A simple, door-to-door repair flow designed so you don&apos;t lose your day.
          </p>

          <div className="timeline">
            {TIMELINE_STEPS.map((stepItem, idx) => (
              <div
                key={stepItem.id}
                className="timeline-step"
                style={{ "--i": idx }}
              >
                <div className="timeline-dot" />
                <div className="timeline-line" />
                <div className="timeline-icon">{stepItem.icon}</div>
                <div className="timeline-content">
                  <div className="timeline-label">{stepItem.label}</div>
                  <div className="timeline-title">{stepItem.title}</div>
                  <div className="timeline-desc">{stepItem.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== Animated “We come to you” map section ====== */}
      <section className="map-section">
        <div className="map-card">
          <div className="map-text">
            <h2>We come to you in your city</h2>
            <p>
              Instead of driving across town and waiting in a crowded shop,
              your technician drives to <strong>you</strong>.
            </p>
            <ul className="map-list">
              <li>🏠 Homes & apartments</li>
              <li>🏢 Offices & co-working spaces</li>
              <li>☕ Coffee shops & public spots</li>
            </ul>
            <p className="map-note">
              You pick the location. We bring the tools, parts & experience.
            </p>
          </div>

          <div className="map-visual">
            <div className="map-glow" />
            <div className="map-circle">
              <div className="map-ring ring-1" />
              <div className="map-ring ring-2" />
              <div className="map-ring ring-3" />

              <div className="map-pin map-pin-main">🚗</div>
              <div className="map-pin map-pin-1" />
              <div className="map-pin map-pin-2" />
              <div className="map-pin map-pin-3" />
              <div className="map-pin map-pin-4" />
            </div>
          </div>
        </div>
      </section>

      {/* ====== Info cards row ====== */}
      <section className="info-grid">
        <div className="info-card">
          <h3>How AtDoorFix works</h3>
          <ol>
            <li>Choose your phone, issue & preferred screen or battery option.</li>
            <li>Pick a time and enter your address.</li>
            <li>Our tech comes to your door and fixes it on-site.</li>
          </ol>
          <p className="info-small">
            You only pay after the job is done and you&apos;re happy.
          </p>
        </div>

        <div className="info-card">
          <h3>What we fix</h3>
          <ul>
            <li>✅ Cracked or broken screens</li>
            <li>✅ Weak or dead batteries</li>
            <li>✅ Charging issues &amp; basic diagnostics</li>
          </ul>
          <p className="info-small">
            Not sure what&apos;s wrong? Choose <strong>“Not sure / Other”</strong> and we&apos;ll help you
            figure it out.
          </p>
        </div>

        <div className="info-card">
          <h3>Why people love AtDoorFix</h3>
          <ul>
            <li>🚗 No driving, no waiting rooms – we come to you.</li>
            <li>💸 Upfront pricing with parts + labor included.</li>
            <li>💳 Pay with Zelle or cash after the job is done.</li>
          </ul>
        </div>
      </section>

      {/* ====== Comparison: shop vs Fix@YourDoor ====== */}
      <section className="compare-section" id="compare">
        <div className="compare-card">
          <h2>Typical repair shop vs AtDoorFix</h2>
          <p className="compare-intro">
            Same goal – a working phone. But the experience is very different.
          </p>

          <div className="compare-table">
            <div className="compare-header">What it&apos;s like</div>
            <div className="compare-header">Typical repair shop</div>
            <div className="compare-header">AtDoorFix</div>

            <div className="compare-label">Getting there</div>
            <div className="compare-cell bad">
              🚗 Drive across town &amp; wait in line
            </div>
            <div className="compare-cell good">
              🏠 We come to your home or office
            </div>

            <div className="compare-label">Time without your phone</div>
            <div className="compare-cell bad">
              ⏳ Leave your phone for hours or days
            </div>
            <div className="compare-cell good">
              ⚡ Most repairs done in under 1 hour
            </div>

            <div className="compare-label">Pricing clarity</div>
            <div className="compare-cell bad">
              💸 Pricing often not clear up-front
            </div>
            <div className="compare-cell good">
              ✅ Upfront price includes parts + labor
            </div>

            <div className="compare-label">Scheduling</div>
            <div className="compare-cell bad">
              📅 You work around their schedule
            </div>
            <div className="compare-cell good">
              🕒 You choose the time that works for you
            </div>

            <div className="compare-label">When you pay</div>
            <div className="compare-cell bad">
              💳 Pay before you know if you&apos;re happy
            </div>
            <div className="compare-cell good">
              🤝 Pay only after the job is done &amp; you&apos;re happy
            </div>
          </div>
        </div>
      </section>
      {/* ====== Animated Repair Timeline ====== */}
<section className="repair-timeline" id="repair-timeline">
  <div className="timeline-card">
    <h2>What happens on repair day?</h2>
    <p className="timeline-intro">
      A simple, 4-step process. You always know what’s happening with your phone.
    </p>

    <div className="timeline-steps">
      <div className="timeline-step">
        <div className="timeline-step-dot" />
        <div className="timeline-step-content">
          <h4>1. We drive to you</h4>
          <p>
            Your technician heads to your home or office at the time you chose.
            No driving, no waiting rooms.
          </p>
        </div>
      </div>

      <div className="timeline-step">
        <div className="timeline-step-dot" />
        <div className="timeline-step-content">
          <h4>2. Quick check & quote</h4>
          <p>
            We double-check the issue in person and confirm the price before we
            start any work.
          </p>
        </div>
      </div>

      <div className="timeline-step">
        <div className="timeline-step-dot" />
        <div className="timeline-step-content">
          <h4>3. On-site repair</h4>
          <p>
            Most screen & battery repairs are done in under an hour right in our
            service vehicle outside your door.
          </p>
        </div>
      </div>

      <div className="timeline-step">
        <div className="timeline-step-dot" />
        <div className="timeline-step-content">
          <h4>4. You test & then pay</h4>
          <p>
            You check everything, we answer questions, and you only pay once
            you&apos;re happy with the result.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ====== Guarantee & safety badges ====== */}
<section className="guarantee-strip" id="guarantees">
  <div className="guarantee-card">
    <h3>Every repair comes with:</h3>
    <div className="guarantee-badges">
      <div className="guarantee-badge">
        <span className="badge-icon">🛡️</span>
        <div>
          <div className="badge-title">90-day warranty</div>
          <div className="badge-text">
            Coverage on parts & labor for your repair.
          </div>
        </div>
      </div>

      <div className="guarantee-badge">
        <span className="badge-icon">👨‍🔧</span>
        <div>
          <div className="badge-title">Pro technician</div>
          <div className="badge-text">
            Experienced tech focused on quality & safety.
          </div>
        </div>
      </div>

      <div className="guarantee-badge">
        <span className="badge-icon">✅</span>
        <div>
          <div className="badge-title">Pay after repair</div>
          <div className="badge-text">
            No deposits or pre-payment. You pay when the job is done.
          </div>
        </div>
      </div>

      <div className="guarantee-badge">
        <span className="badge-icon">📱</span>
        <div>
          <div className="badge-title">Quality parts</div>
          <div className="badge-text">
            We source trusted parts that we&apos;re happy to warranty.
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* ====== Compact feature strip ====== */}
    

      <footer className="footer">
        © 2025 AtDoorFix. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
