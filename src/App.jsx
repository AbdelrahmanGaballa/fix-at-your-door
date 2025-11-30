import { useState, useRef } from "react";
import logo3 from "./assets/logo3.png";
import "./App.css";
import { SCREEN_PRICING } from "./pricing";

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
      "iPhone 14 Pro Max",
      "iPhone 15",
      "iPhone 15 Plus",
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

// Only 2 qualities now
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

function App() {
  const formRef = useRef(null);
  const [step, setStep] = useState(1);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [issue, setIssue] = useState("");
  const [screenQuality, setScreenQuality] = useState("aftermarket");

  // For custom brand / model text
  const [otherBrandText, setOtherBrandText] = useState("");
  const [otherModelText, setOtherModelText] = useState("");

  const [customer, setCustomer] = useState({
    fullName: "",
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

  const isOtherBrand = selectedBrand === "__otherBrand";
  const isOtherModel = selectedModel === "__other";

  const modelsForBrand = !isOtherBrand
    ? PHONE_DATA.find((p) => p.brand === selectedBrand)?.models || []
    : [];

  // ---------- pricing helpers ----------
  const hasKnownDevice =
    !isOtherBrand &&
    !isOtherModel &&
    selectedBrand &&
    selectedModel &&
    SCREEN_PRICING[selectedBrand] &&
    SCREEN_PRICING[selectedBrand][selectedModel];

  const rawPrice =
    hasKnownDevice && issue === "Screen Replacement"
      ? SCREEN_PRICING[selectedBrand][selectedModel][screenQuality] ?? null
      : null;

  const priceForSelection = rawPrice;

  // ---------- step handlers ----------

  function handleNextFromStep1() {
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
    console.log("✅ handleSubmit fired");

    if (
      !selectedBrand ||
      (!isOtherBrand && !selectedModel) ||
      !issue ||
      !customer.fullName ||
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

    const estPrice =
      issue === "Screen Replacement" && priceForSelection != null
        ? priceForSelection
        : "";

    const payload = {
      Brand: effectiveBrand,
      Model: effectiveModel,
      CustomBrand: isOtherBrand ? otherBrandText.trim() || "" : "",
      CustomModel:
        isOtherBrand || isOtherModel ? otherModelText.trim() || "" : "",
      Issue: issue,
      ScreenQuality: effectiveScreenQuality,
      EstPrice: estPrice,
      FullName: customer.fullName,
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
      "https://script.google.com/macros/s/AKfycbxvRvER_ouDa2Jg3cK-0ui2CCTlkuSFAk5a55Ahk3aN6w66n8QaLkWYzQkhZV3edvEjFw/exec";

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
              <img src={logo3} alt="Fix@YourDoor logo" className="logo-image" />
              <div className="logo-text-group">
                <div className="logo-title">FIX@YOURDOOR</div>
                <div className="logo-subtitle">Doorstep Phone Repair</div>
              </div>
            </div>

            <h1>
              We fix your <span>phone</span>
              <br />
              right at your doorstep.
            </h1>

            <p>Same-day screen &amp; battery repair at your home or office.</p>
            <p className="service-area">Now serving: Your City, State</p>

            <div className="hero-tags">
              <span className="hero-tag">🚗 Mobile technician</span>
              <span className="hero-tag">⚡ Same-day slots</span>
              <span className="hero-tag">💳 Zelle or Cash</span>
            </div>

            <div className="hero-btn-row">
            <button
  className="btn primary"
  onClick={() => {
    // reset
    setSubmitted(false);
    setStep(1);

    if (formRef.current) {
      // smooth scroll to the booking card
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // add a temporary glow effect
      formRef.current.classList.add("card-highlight");
      setTimeout(() => {
        formRef.current?.classList.remove("card-highlight");
      }, 900); // duration matches CSS animation
    }
  }}
>
  Book a repair
</button>

              <span className="hero-note">No upfront payment required.</span>
            </div>
          </div>
        </header>

        {/* RIGHT – FORM CARD */}
       <main className="card" ref={formRef}>

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

          {/* STEP 2 – Issue + Screen quality */}
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
                        SCREEN_PRICING[selectedBrand][selectedModel][q.key];

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

              <div className="buttons">
                <button className="btn secondary" onClick={() => setStep(1)}>
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
                  <label>Full name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={customer.fullName}
                    onChange={handleCustomerChange}
                    placeholder="John Doe"
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
                    onClick={() => setStep(2)}
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

      {/* Info strip under cards */}
      <section className="info-grid">
        <article className="info-card">
          <h3>How Fix@YourDoor works</h3>
          <ol>
            <li>Choose your phone, issue &amp; preferred screen quality.</li>
            <li>Pick a time and enter your address.</li>
            <li>Our tech comes to your door and fixes it on-site.</li>
          </ol>
          <p className="info-small">
            You only pay after the job is done and you&apos;re happy.
          </p>
        </article>

        <article className="info-card">
          <h3>What we fix</h3>
          <ul>
            <li>✅ Cracked or broken screens</li>
            <li>✅ Weak or dead batteries</li>
            <li>✅ Charging issues &amp; basic diagnostics</li>
          </ul>
          <p className="info-small">
            Not sure what&apos;s wrong? Choose{" "}
            <strong>“Not sure / Other”</strong> and we&apos;ll help you figure
            it out.
          </p>
        </article>

        <article className="info-card">
          <h3>Why people love Fix@YourDoor</h3>
          <ul>
            <li>No waiting in repair shops</li>
            <li>Upfront pricing with parts + labor included</li>
            <li>Pay with Zelle or cash after the job is done</li>
          </ul>
        </article>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Fix@YourDoor. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
