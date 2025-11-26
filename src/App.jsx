import { useState } from "react";
import "./App.css";
import logo3 from "./assets/logo3.png";

const PHONE_DATA = [
  {
    brand: "Apple",
    models: ["iPhone 11", "iPhone 12", "iPhone 13", "iPhone 14", "iPhone 15"],
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

function App() {
  const [step, setStep] = useState(1);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [issue, setIssue] = useState("");

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

  function handleNextFromStep1() {
    if (!selectedBrand || !selectedModel) {
      alert("Please select brand and model.");
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

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !customer.fullName ||
      !customer.phone ||
      !customer.address ||
      !customer.city ||
      !customer.zip ||
      !customer.date ||
      !customer.time
    ) {
      alert("Please fill all required fields.");
      return;
    }

    // 👉 Later: send this data to your backend / email service
    console.log("New booking:", {
      selectedBrand,
      selectedModel,
      issue,
      customer,
    });

    setSubmitted(true);
    setStep(4);
  }

  const modelsForBrand =
    PHONE_DATA.find((p) => p.brand === selectedBrand)?.models || [];

  return (
    <div className="app">
      <div className="shell">
        {/* LEFT SIDE – HERO */}
        <header className="header">
          <div className="header-inner">
            <div className="logo-row">
              <img
                src={logo3}
                alt="Fix@YourDoor logo"
                className="logo-image"
              />
              <div className="logo-text-group">
                <span className="logo-title">Fix@YourDoor</span>
                <span className="logo-subtitle">Doorstep Phone Repair</span>
              </div>
            </div>

            <h1>
              We fix your <span>phone</span> <br />
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
                  setSubmitted(false);
                  setStep(1);
                }}
              >
                Book a repair
              </button>
              <span className="hero-note">No upfront payment required.</span>
            </div>
          </div>
        </header>

        {/* RIGHT SIDE – FORM CARD */}
        <main className="card">
          {/* Step indicator */}
          <div className="steps">
            <span className={step >= 1 ? "step active" : "step"}>
              <span className="step-dot">1</span>
              <span className="step-label">Device</span>
            </span>
            <span className={step >= 2 ? "step active" : "step"}>
              <span className="step-dot">2</span>
              <span className="step-label">Issue</span>
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

              <div className="field">
                <label>Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => {
                    setSelectedBrand(e.target.value);
                    setSelectedModel("");
                  }}
                >
                  <option value="">Choose brand</option>
                  {PHONE_DATA.map((p) => (
                    <option key={p.brand} value={p.brand}>
                      {p.brand}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>Model</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={!selectedBrand}
                >
                  <option value="">
                    {selectedBrand ? "Choose model" : "Select brand first"}
                  </option>
                  {modelsForBrand.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="buttons">
                <button className="btn primary" onClick={handleNextFromStep1}>
                  Next: Choose issue
                </button>
              </div>
            </section>
          )}

          {/* STEP 2 – Issue */}
          {step === 2 && (
            <section>
              <h2>Select the issue</h2>
              <p>What’s wrong with the phone you want us to fix?</p>

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
                  {selectedBrand} {selectedModel} – {issue}
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

              {customer.paymentMethod === "Zelle" && (
                <div className="info-box">
                  <p>
                    You can pay via Zelle to:{" "}
                    <strong>your-zelle-email@example.com</strong> or{" "}
                    <strong>+1-234-567-8901</strong>.
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

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Fix@YourDoor. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
