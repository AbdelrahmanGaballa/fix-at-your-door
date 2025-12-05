// src/App.jsx
import { useEffect, useRef, useState } from "react";
import appleLogo from "./assets/brands/apple.png";
import samsungLogo from "./assets/brands/samsung.png";
import googleLogo from "./assets/brands/google.png";
import motorolaLogo from "./assets/brands/motorola.png";

import logo from "./assets/logo.png";
import { Smartphone, Tablet, Laptop, Watch } from "lucide-react";

import tapSound from "./assets/audio/ui-tap.mp3";
import "./App.css";
import { SCREEN_PRICING, BATTERY_PRICING } from "./pricing";

// ---------- static data ----------

// Device type cards
const DEVICE_TYPES = [
  { id: "smartphone", label: "SMARTPHONE", icon: <Smartphone size={32} /> },
  { id: "tablet", label: "TABLET / IPAD", icon: <Tablet size={32} /> },
  { id: "laptop", label: "LAPTOP", icon: <Laptop size={32} /> },
  { id: "watch", label: "WATCH", icon: <Watch size={32} /> },
];
const BRAND_CARDS = [
  {
    id: "apple",
    value: "Apple",
    label: "APPLE",
    logo: appleLogo,
  },
  {
    id: "samsung",
    value: "Samsung",
    label: "SAMSUNG",
    logo: samsungLogo,
  },
  {
    id: "google",
    value: "Google",
    label: "GOOGLE",
    logo: googleLogo,
  },
  {
    id: "motorola",
    value: "Motorola",
    label: "MOTOROLA",
    logo: motorolaLogo,
  },
  {
    id: "other",
    value: "__otherBrand",
    label: "OTHER BRAND",
    logo: null,
    isOther: true,
  },
];




// Brand / model list for dropdown (only for smartphones we know)
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

const PAYMENT_METHODS = ["cash", "Card"];

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
    title: "Send us your device & issue",
    desc: "You choose your device, issue, and a time that works for you. No payment upfront.",
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
// Replace the ContactUsPage function (around line 141) with this complete version:

function ContactUsPage({ onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 3000);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at top left, #1e293b 0, #020617 45%, #000 100%)',
      color: '#e5e7eb',
      overflowY: 'auto',
      zIndex: 9999
    }}>
      {/* Header */}
      <header style={{
        borderBottom: '1px solid rgba(51, 65, 85, 0.9)',
        background: 'rgba(2, 6, 23, 0.5)',
        backdropFilter: 'blur(8px)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            AtDoorFix
          </div>
          <button 
            onClick={onBack}
            style={{
              fontSize: '0.875rem',
              color: '#9ca3af',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 16px'
            }}
            onMouseOver={(e) => e.target.style.color = '#fff'}
            onMouseOut={(e) => e.target.style.color = '#9ca3af'}
          >
            ← Back to Home
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '16px',
            background: 'linear-gradient(to right, #60a5fa, #22d3ee, #14b8a6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Get in Touch
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#9ca3af',
            maxWidth: '768px',
            margin: '0 auto'
          }}>
            Have questions about your repair? Need help booking an appointment? 
            We're here to help you every step of the way.
          </p>
        </div>

        {/* Two Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {/* Contact Info Column */}
          <div>
            <div style={{
              background: 'radial-gradient(circle at top left, #020617, #020617 55%, #020617)',
              borderRadius: '24px',
              border: '1px solid rgba(37, 99, 235, 0.3)',
              padding: '32px',
              boxShadow: '0 18px 40px rgba(15, 23, 42, 0.8)'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px' }}>
                Contact Information
              </h2>

              {/* Phone */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '24px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '999px',
                  background: 'rgba(37, 99, 235, 0.1)',
                  border: '1px solid rgba(37, 99, 235, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '1.5rem' }}>📞</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#d1d5db', marginBottom: '8px' }}>
                    Phone Numbers
                  </h3>
                  <a 
                    href="tel:3862860387"
                    style={{
                      display: 'block',
                      color: '#60a5fa',
                      textDecoration: 'none',
                      marginBottom: '4px',
                      fontSize: '1.125rem'
                    }}
                  >
                    (386) 286-0387
                  </a>
                  <a 
                    href="tel:6173880141"
                    style={{
                      display: 'block',
                      color: '#60a5fa',
                      textDecoration: 'none',
                      fontSize: '1.125rem'
                    }}
                  >
                    (617) 388-0141
                  </a>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '24px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '999px',
                  background: 'rgba(34, 211, 238, 0.1)',
                  border: '1px solid rgba(34, 211, 238, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '1.5rem' }}>✉️</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#d1d5db', marginBottom: '8px' }}>
                    Email
                  </h3>
                  <a 
                    href="mailto:management@atdoorfix.com"
                    style={{
                      color: '#22d3ee',
                      textDecoration: 'none',
                      wordBreak: 'break-all'
                    }}
                  >
                    management@atdoorfix.com
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '24px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '999px',
                  background: 'rgba(20, 184, 166, 0.1)',
                  border: '1px solid rgba(20, 184, 166, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '1.5rem' }}>🕒</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#d1d5db', marginBottom: '8px' }}>
                    Business Hours
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: '2px 0' }}>Monday - Saturday</p>
                  <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: '2px 0' }}>9:00 AM - 7:00 PM</p>
                </div>
              </div>

              {/* Service Area */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '32px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '999px',
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '1.5rem' }}>📍</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#d1d5db', marginBottom: '8px' }}>
                    Service Areas
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                    Daytona Beach • Ormond Beach • DeLand • Deltona • New Smyrna • Port Orange, FL
                  </p>
                </div>
              </div>

              {/* Features */}
              <div style={{ borderTop: '1px solid rgba(51, 65, 85, 0.9)', paddingTop: '24px' }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#d1d5db', marginBottom: '12px' }}>
                  Why Choose Us?
                </h3>
                <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ color: '#22c55e' }}>✓</span>
                    <span>Same-day mobile repair service</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ color: '#22c55e' }}>✓</span>
                    <span>Pay after repair is complete</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ color: '#22c55e' }}>✓</span>
                    <span>90-day warranty included</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#22c55e' }}>✓</span>
                    <span>Professional technicians</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div>
            <div style={{
              background: 'radial-gradient(circle at top left, #020617, #020617 55%, #020617)',
              borderRadius: '24px',
              border: '1px solid rgba(51, 65, 85, 0.9)',
              padding: '32px',
              boxShadow: '0 18px 40px rgba(15, 23, 42, 0.8)'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px' }}>
                Send Us a Message
              </h2>

              {submitted && (
                <div style={{
                  marginBottom: '24px',
                  padding: '16px',
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: '12px',
                  color: '#22c55e',
                  fontSize: '0.875rem'
                }}>
                  ✓ Thank you! We'll get back to you soon.
                </div>
              )}

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#d1d5db',
                  marginBottom: '8px'
                }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(148, 163, 184, 0.18)',
                    borderRadius: '12px',
                    color: '#e5e7eb',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#d1d5db',
                  marginBottom: '8px'
                }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(148, 163, 184, 0.18)',
                    borderRadius: '12px',
                    color: '#e5e7eb',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#d1d5db',
                  marginBottom: '8px'
                }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(148, 163, 184, 0.18)',
                    borderRadius: '12px',
                    color: '#e5e7eb',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#d1d5db',
                  marginBottom: '8px'
                }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell us how we can help you..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(148, 163, 184, 0.18)',
                    borderRadius: '12px',
                    color: '#e5e7eb',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'none'
                  }}
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                style={{
                  width: '100%',
                  background: 'linear-gradient(to right, #2563eb, #0891b2)',
                  color: '#fff',
                  fontWeight: '600',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  boxShadow: '0 16px 30px rgba(37, 99, 235, 0.45)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 20px 42px rgba(37, 99, 235, 0.6)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 16px 30px rgba(37, 99, 235, 0.45)';
                }}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{ marginTop: '64px', maxWidth: '896px', margin: '64px auto 0' }}>
          <h2 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '32px',
            color: '#fff'
          }}>
            Frequently Asked Questions
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px'
          }}>
            <div style={{
              background: 'rgba(15, 23, 42, 0.9)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(51, 65, 85, 0.9)'
            }}>
              <h3 style={{ fontWeight: '600', color: '#fff', marginBottom: '8px' }}>
                How quickly can you come?
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                We offer same-day appointments! Call us to check availability for your preferred time.
              </p>
            </div>
            <div style={{
              background: 'rgba(15, 23, 42, 0.9)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(51, 65, 85, 0.9)'
            }}>
              <h3 style={{ fontWeight: '600', color: '#fff', marginBottom: '8px' }}>
                Do I pay upfront?
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                No! You only pay after the repair is complete and you're satisfied with the work.
              </p>
            </div>
            <div style={{
              background: 'rgba(15, 23, 42, 0.9)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(51, 65, 85, 0.9)'
            }}>
              <h3 style={{ fontWeight: '600', color: '#fff', marginBottom: '8px' }}>
                What areas do you serve?
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                We serve Daytona Beach, Ormond Beach, DeLand, Deltona, New Smyrna, and Port Orange in Florida.
              </p>
            </div>
            <div style={{
              background: 'rgba(15, 23, 42, 0.9)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(51, 65, 85, 0.9)'
            }}>
              <h3 style={{ fontWeight: '600', color: '#fff', marginBottom: '8px' }}>
                Is there a warranty?
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                Yes! All repairs come with a 90-day warranty on parts and labor.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(51, 65, 85, 0.9)', marginTop: '64px' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '32px 24px',
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '0.875rem'
        }}>
          © 2025 AtDoorFix. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
function App() {
  const [step, setStep] = useState(1);
  const [showContact, setShowContact] = useState(false);

  const [deviceType, setDeviceType] = useState("smartphone");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [issue, setIssue] = useState("");
  const [screenQuality, setScreenQuality] = useState("aftermarket");
  const [addProtector, setAddProtector] = useState(false);

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
    paymentMethod: "cash",
  });

  const [submitted, setSubmitted] = useState(false);

  // smooth scroll + audio tap
  const bookingRef = useRef(null);
  const audioRef = useRef(null);

  // section refs for auto-scroll / accordion feel
  const deviceRef = useRef(null);
  const brandRef = useRef(null);
  const modelRef = useRef(null);
  const issueRef = useRef(null);
  const detailsRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(tapSound);
  }, []);

  const playTap = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

 const scrollTo = (ref) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
    
    // Extra scroll adjustment for mobile to account for fixed headers
    setTimeout(() => {
      const yOffset = -20; // Adjust this value if needed
      const element = ref.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }, 100);
  }
};
  // inside your App() component, add:

// pointer-tilt: small 3D tilt on pointer move
function handleBrandPointerMove(e) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const px = (e.clientX - rect.left) / rect.width; // 0..1
  const py = (e.clientY - rect.top) / rect.height; // 0..1

  const rotateY = (px - 0.5) * 10; // tilt left/right
  const rotateX = (0.5 - py) * 8;  // tilt up/down
  const scale = 1.02;

  el.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
  el.classList.add("tilt");
}

// reset tilt
function handleBrandPointerLeave(e) {
  const el = e.currentTarget;
  el.style.transform = "";
  el.classList.remove("tilt");
}

// click ripple helper (already similar guidance earlier)
function handleBrandClickRipple(e) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--x", e.clientX - rect.left + "px");
  el.style.setProperty("--y", e.clientY - rect.top + "px");

  el.classList.remove("clicked");
  // force reflow to restart pseudo-element transition
  void el.offsetWidth;
  el.classList.add("clicked");
  // remove clicked class after animation
  setTimeout(() => el.classList.remove("clicked"), 500);
}

// mount: add 'entered' class to brand-grid for staggered entrance
// Replace the existing useEffect for brand-grid animation with this:
// Replace the existing brand-grid useEffect with this:
useEffect(() => {
  const grid = document.querySelector(".brand-grid");
  if (!grid) return;
  
  // Remove entered class to reset animation
  grid.classList.remove("entered");
  
  // Force browser reflow to ensure class removal is processed
  void grid.offsetWidth;
  
  // Re-add entered class after a small delay
  const timer = setTimeout(() => {
    const gridCheck = document.querySelector(".brand-grid");
    if (gridCheck) {
      gridCheck.classList.add("entered");
    }
  }, 100);
  
  return () => clearTimeout(timer);
}, [deviceType]); // Only trigger on deviceType change // Add dependencies so it re-runs when device type changes


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
    // focus the device section after a tiny delay
    setTimeout(() => scrollTo(deviceRef), 350);
  };

  const isSmartphone = deviceType === "smartphone";
  const isOtherBrand = isSmartphone && selectedBrand === "__otherBrand";
  const isOtherModel = isSmartphone && selectedModel === "__other";

  const modelsForBrand =
    isSmartphone && !isOtherBrand
      ? PHONE_DATA.find((p) => p.brand === selectedBrand)?.models || []
      : [];

  // ---------- pricing helpers (screens + battery) ----------

  const hasKnownDevice =
    isSmartphone &&
    !isOtherBrand &&
    !isOtherModel &&
    !!selectedBrand &&
    !!selectedModel &&
    !!(
      (SCREEN_PRICING[selectedBrand] &&
        SCREEN_PRICING[selectedBrand][selectedModel]) ||
      (BATTERY_PRICING[selectedBrand] &&
        BATTERY_PRICING[selectedBrand][selectedModel])
    );

  let rawPrice = null;

  if (hasKnownDevice) {
    if (issue === "Screen Replacement") {
      const screenPricing =
        SCREEN_PRICING[selectedBrand]?.[selectedModel] || null;
      if (screenPricing) {
        const candidate = screenPricing[screenQuality];
        rawPrice = typeof candidate === "number" ? candidate : null;
      }
    } else if (issue === "Battery Replacement") {
      const batteryPricing = BATTERY_PRICING[selectedBrand]?.[selectedModel];
      rawPrice =
        typeof batteryPricing === "number" ? batteryPricing : null;
    }
  }

  const priceForSelection =
    typeof rawPrice === "number" ? rawPrice : null;

  // ---------- step handlers ----------

  function handleNextFromStep1() {
  playTap();

  if (isSmartphone) {
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
      // Scroll to issue section after a small delay to ensure DOM is ready
      setTimeout(() => scrollTo(issueRef), 150);
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
  } else {
    // tablet / laptop / watch – always custom
    if (!otherBrandText.trim() || !otherModelText.trim()) {
      alert("Please type your device brand and model.");
      return;
    }
  }

  setStep(2);
  // Add delay to ensure step 2 renders before scrolling
  setTimeout(() => {
    scrollTo(issueRef);
  }, 150);
}

  function handleNextFromStep2() {
    playTap();
    if (!issue) {
      alert("Please select an issue.");
      return;
    }
    setStep(3);
    scrollTo(detailsRef);
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
      (!isSmartphone &&
        (!otherBrandText.trim() || !otherModelText.trim())) ||
      (isSmartphone &&
        (!selectedBrand ||
          (!isOtherBrand && !selectedModel) ||
          (isOtherBrand &&
            (!otherBrandText.trim() || !otherModelText.trim())) ||
          (isOtherModel && !otherModelText.trim()))) ||
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

    const effectiveBrand = isSmartphone
      ? isOtherBrand
        ? otherBrandText.trim() || "Other brand"
        : selectedBrand
      : otherBrandText.trim() || "Other device brand";

    const effectiveModel = isSmartphone
      ? isOtherBrand || isOtherModel
        ? otherModelText.trim() || "Other model"
        : selectedModel
      : otherModelText.trim() || "Other model";

    const effectiveScreenQuality =
      issue === "Screen Replacement" ? screenQuality : "";

    // use same computed price for both screen & battery when known
    let estPrice = "";

    if (
      typeof priceForSelection === "number" &&
      (issue === "Screen Replacement" || issue === "Battery Replacement")
    ) {
      estPrice = priceForSelection;

      if (issue === "Screen Replacement" && addProtector) {
        estPrice += 15;
      }
    }

    const payload = {
      Brand: effectiveBrand,
      Model: effectiveModel,
      CustomBrand:
        isSmartphone && isOtherBrand
          ? otherBrandText.trim() || ""
          : !isSmartphone
          ? otherBrandText.trim() || ""
          : "",
      CustomModel:
        isSmartphone && (isOtherBrand || isOtherModel)
          ? otherModelText.trim() || ""
          : !isSmartphone
          ? otherModelText.trim() || ""
          : "",
      Issue: issue,
      ScreenQuality: effectiveScreenQuality,
      EstPrice: estPrice,
      AddScreenProtector: addProtector ? "Yes ($15)" : "No",
      DeviceType: deviceType,
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
      "https://script.google.com/macros/s/AKfycbzAJNDF6p_YnyyrwqwPsdjQTwKIwyImcNblt25Tc7Ve2FsGqNWEnJpFu5l_-JUdb9YfyQ/exec";

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
    scrollTo(bookingRef);
  }

  const displayBrand = isSmartphone
    ? isOtherBrand
      ? otherBrandText || "Custom brand"
      : selectedBrand
    : otherBrandText || "Custom brand";

  const displayModel =
    isSmartphone && !isOtherBrand && !isOtherModel
      ? selectedModel
      : otherModelText || "Custom model";

  // progress for sticky bar
  const progress = (step / 4) * 100;

  // ---------- JSX ----------
 if (showContact) {
    return <ContactUsPage onBack={() => setShowContact(false)} />;
  }
  return (
    <div className="app">
      <div className="shell">
        {/* LEFT – HERO */}
        <header className="header">
          <div className="header-inner">
            <div className="logo-row">
              <img src={logo} alt="AtDoorFix logo" className="logo-image" />
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
              <span className="hero-tag">💳 Cash or card after repair</span>
            </div>

            <div className="hero-btn-row">
              <button className="btn primary" onClick={handleHeroBook}>
                Book a repair
              </button>
      <button 
    className="btn secondary" 
    onClick={() => setShowContact(true)}
  >
    Contact Us
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
            <section
              ref={deviceRef}
              className="accordion-section accordion-section-active"
            >
              <h2>Select your device</h2>
              <p>Tell us what you’re using so we bring the right parts.</p>

              {/* Device type cards */}
              <div className="field">
                <label>Device type</label>
                <div className="device-type-row">
                  {DEVICE_TYPES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      className={
                        deviceType === t.id
                          ? "device-type-card active"
                          : "device-type-card"
                      }
                      onClick={() => {
                        playTap();
                        setDeviceType(t.id);
                        setSelectedBrand("");
                        setSelectedModel("");
                        setOtherBrandText("");
                        setOtherModelText("");
                        scrollTo(brandRef);
                      }}
                    >
                      <span className="device-type-icon">{t.icon}</span>
                      <span className="device-type-label">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Smartphone flow: brand cards + model */}
              {isSmartphone ? (
                <>
                  <div className="field" ref={brandRef}>
                    <label>Brand</label>
                    <div className="brand-grid">
                      {BRAND_CARDS.map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          className={
                            selectedBrand === b.value
                              ? "brand-card active"
                              : "brand-card"
                          }
                        onClick={(e) => {
  playTap();
  setSelectedBrand(b.value);
  setSelectedModel("");
  if (b.isOther) {
    setOtherBrandText("");
    setOtherModelText("");
  }

  // ripple effect
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", e.clientX - rect.left + "px");
  e.currentTarget.style.setProperty("--y", e.clientY - rect.top + "px");

  e.currentTarget.classList.remove("clicked");
  void e.currentTarget.offsetWidth; // restart animation
  e.currentTarget.classList.add("clicked");

  scrollTo(modelRef);
}}

                        >
                      <div className="brand-logo-wrapper">
  {b.isOther ? (
    <span className="brand-icon other">...</span>
  ) : (
    <img src={b.logo} alt={b.label} className="brand-logo" />
  )}
</div>


                          <div className="brand-label">{b.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* MODEL SELECT (for known brands) */}
                  {!isOtherBrand && selectedBrand && (
                    <div className="field" ref={modelRef}>
                      <label>Model</label>
                      <select
                        value={selectedModel}
                        onChange={(e) => {
                          const value = e.target.value;
                          setSelectedModel(value);
                          if (value) {
                            scrollTo(issueRef);
                          }
                        }}
                      >
                        <option value="">
                          {selectedBrand ? "Choose model" : "Select brand first"}
                        </option>
                        {modelsForBrand.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                        {selectedBrand && (
                          <option value="__other">Other (not listed)</option>
                        )}
                      </select>
                    </div>
                  )}

                  {/* FIELDS WHEN SMARTPHONE OTHER BRAND */}
                  {isOtherBrand && (
                    <>
                      <div className="field" ref={modelRef}>
                        <label>Phone brand *</label>
                        <input
                          type="text"
                          value={otherBrandText}
                          onChange={(e) =>
                            setOtherBrandText(e.target.value)
                          }
                          placeholder="Example: Huawei, OnePlus, Xiaomi..."
                        />
                      </div>

                      <div className="field">
                        <label>Phone model *</label>
                        <input
                          type="text"
                          value={otherModelText}
                          onChange={(e) =>
                            setOtherModelText(e.target.value)
                          }
                          placeholder="Example: P40 Pro, OnePlus 11R..."
                        />
                      </div>
                    </>
                  )}

                  {/* FIELDS WHEN BRAND NORMAL BUT MODEL = OTHER */}
                  {!isOtherBrand && isOtherModel && (
                    <div className="field">
                      <label>Phone model *</label>
                      <input
                        type="text"
                        value={otherModelText}
                        onChange={(e) =>
                          setOtherModelText(e.target.value)
                        }
                        placeholder="Type your exact model (e.g. iPhone SE 2022)"
                      />
                    </div>
                  )}
                </>
              ) : (
                // Non-smartphone devices
                <>
                  <div className="field" ref={brandRef}>
                    <label>Device brand *</label>
                    <input
                      type="text"
                      value={otherBrandText}
                      onChange={(e) => setOtherBrandText(e.target.value)}
                      placeholder="Example: iPad, Surface, MacBook, Galaxy Tab..."
                    />
                  </div>

                  <div className="field" ref={modelRef}>
                    <label>Device model *</label>
                    <input
                      type="text"
                      value={otherModelText}
                      onChange={(e) => setOtherModelText(e.target.value)}
                      placeholder="Example: iPad Pro 11, Surface Laptop 5..."
                    />
                  </div>
                </>
              )}

              <div className="buttons">
                <button className="btn primary" onClick={handleNextFromStep1}>
                  Next: Choose issue
                  <span className="next-arrow">➜</span>
                </button>
              </div>
            </section>
          )}

          {/* STEP 2 – Issue + Screen/Battery info */}
          {step === 2 && (
            <section
              ref={issueRef}
              className="accordion-section accordion-section-active"
            >
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
                  onChange={(e) => {
                    setIssue(e.target.value);
                    setAddProtector(false);
                  }}
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
                      const perQualityPrice = hasKnownDevice
                        ? SCREEN_PRICING[selectedBrand]?.[selectedModel]?.[
                            q.key
                          ] ?? null
                        : null;

                      return (
                        <label key={q.key}>
                          <input
                            type="radio"
                            name="screenQuality"
                            value={q.key}
                            checked={screenQuality === q.key}
                            onChange={(e) =>
                              setScreenQuality(e.target.value)
                            }
                          />
                          <span>
                            <strong>
                              {q.label} – {q.short}
                            </strong>
                            <br />
                            <span style={{ fontSize: "0.8rem" }}>
                              {q.description}{" "}
                              {typeof perQualityPrice === "number" && (
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

                  {(isOtherBrand || isOtherModel || !isSmartphone) && (
                    <p
                      style={{
                        fontSize: "0.78rem",
                        marginTop: "6px",
                        color: "#9ca3af",
                      }}
                    >
                      Because your device is custom or not on our list,{" "}
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
                  {typeof priceForSelection === "number" ? (
                    <p>
                      Estimated total for <strong>battery replacement</strong>{" "}
                      on your{" "}
                      <strong>
                        {displayBrand} {displayModel}
                      </strong>
                      :{" "}
                      <strong>${priceForSelection.toFixed(2)}</strong> (plus
                      tax).
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

              {/* Optional screen protector add-on */}
              {issue && (
                <div className="field">
                  <label>Optional add-on</label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={addProtector}
                      onChange={(e) => setAddProtector(e.target.checked)}
                      style={{ marginTop: "3px" }}
                    />
                    <span>
                      Add a{" "}
                      <strong>tempered glass screen protector for $15</strong>{" "}
                      during your visit.
                    </span>
                  </label>

                  {issue === "Screen Replacement" &&
                    typeof priceForSelection === "number" &&
                    addProtector && (
                      <p className="field-helper">
                        Estimated total with screen protector:{" "}
                        <strong>
                          ${(priceForSelection + 15).toFixed(2)}
                        </strong>{" "}
                        (plus tax).
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
                    scrollTo(deviceRef);
                  }}
                >
                  Back
                </button>
                <button className="btn primary" onClick={handleNextFromStep2}>
                  Next: Your details
                  <span className="next-arrow">➜</span>
                </button>
              </div>
            </section>
          )}

          {/* STEP 3 – Customer details */}
          {step === 3 && (
            <section
              ref={detailsRef}
              className="accordion-section accordion-section-active"
            >
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
                    placeholder="Doe"
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
                      scrollTo(issueRef);
                    }}
                  >
                    Back
                  </button>
                  <button type="submit" className="btn primary">
                    Submit booking
                    <span className="next-arrow">➜</span>
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* STEP 4 – Confirmation */}
          {step === 4 && submitted && (
            <section className="accordion-section accordion-section-active">
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
                        QUALITY_OPTIONS.find(
                          (q) => q.key === screenQuality
                        )?.label
                      }
                    </strong>
                  </p>

                  {typeof priceForSelection === "number" ? (
                    <p>
                      Estimated total for your screen replacement:{" "}
                      <strong>${priceForSelection.toFixed(2)}</strong> (plus
                      tax).
                    </p>
                  ) : (
                    <p>
                      Because your device is custom or not on our list,{" "}
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
                  {typeof priceForSelection === "number" ? (
                    <p>
                      Estimated total for your battery replacement:{" "}
                      <strong>${priceForSelection.toFixed(2)}</strong> (plus
                      tax).
                    </p>
                  ) : (
                    <p>
                      We&apos;ll confirm the exact battery price for your model
                      and text you before starting any work.
                    </p>
                  )}
                </>
              )}

              <div className="info-box">
                <p>
                  You&apos;ll pay{" "}
                  <strong>after the repair is complete</strong> using{" "}
                  {customer.paymentMethod === "Card" ? "your card" : "cash"} – no
                  pre-payment or deposit.
                </p>
              </div>

              {issue === "Screen Replacement" && addProtector && (
                <p>
                  Screen protector add-on: <strong>+ $15</strong> will be added
                  during your visit.
                </p>
              )}

              <p>We will contact you shortly to confirm your appointment.</p>

              <div className="buttons">
                <button
                  className="btn secondary"
                  onClick={() => {
                    playTap();
                    setSubmitted(false);
                    setStep(1);
                    scrollTo(deviceRef);
                  }}
                >
                  Book another repair
                </button>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Bottom sticky progress bar */}
      <div className="booking-progress">
        <div className="booking-progress-track">
          <div
            className="booking-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="booking-progress-text">Step {step} of 4</div>
      </div>

      {/* ====== Animated repair timeline ====== */}
      <section className="timeline-section">
        <div className="timeline-card">
          <h2>What happens after you book?</h2>
          <p className="timeline-intro">
            A simple, door-to-door repair flow designed so you don&apos;t lose
            your day.
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
              Instead of driving across town and waiting in a crowded shop, your
              technician drives to <strong>you</strong>.
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
            <li>
              Choose your device, issue & preferred screen or battery option.
            </li>
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
            Not sure what&apos;s wrong? Choose{" "}
            <strong>“Not sure / Other”</strong> and we&apos;ll help you figure
            it out.
          </p>
        </div>

        <div className="info-card">
          <h3>Why people love AtDoorFix</h3>
          <ul>
            <li>🚗 No driving, no waiting rooms – we come to you.</li>
            <li>💸 Upfront pricing with parts + labor included.</li>
            <li>💳 Pay with cash or card after the job is done.</li>
          </ul>
        </div>
      </section>

      {/* ====== Comparison: shop vs AtDoorFix ====== */}
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

      {/* ====== Repair day timeline ====== */}
      <section className="repair-timeline" id="repair-timeline">
        <div className="timeline-card">
          <h2>What happens on repair day?</h2>
          <p className="timeline-intro">
            A simple, 4-step process. You always know what’s happening with your
            device.
          </p>

          <div className="timeline-steps">
            <div className="timeline-step">
              <div className="timeline-step-dot" />
              <div className="timeline-step-content">
                <h4>1. We drive to you</h4>
                <p>
                  Your technician heads to your home or office at the time you
                  chose. No driving, no waiting rooms.
                </p>
              </div>
            </div>

            <div className="timeline-step">
              <div className="timeline-step-dot" />
              <div className="timeline-step-content">
                <h4>2. Quick check & quote</h4>
                <p>
                  We double-check the issue in person and confirm the price
                  before we start any work.
                </p>
              </div>
            </div>

            <div className="timeline-step">
              <div className="timeline-step-dot" />
              <div className="timeline-step-content">
                <h4>3. On-site repair</h4>
                <p>
                  Most screen & battery repairs are done in under an hour right
                  in our service vehicle outside your door.
                </p>
              </div>
            </div>

            <div className="timeline-step">
              <div className="timeline-step-dot" />
              <div className="timeline-step-content">
                <h4>4. You test & then pay</h4>
                <p>
                  You check everything, we answer questions, and you only pay
                  once you&apos;re happy with the result.
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

      <footer className="footer">
        © 2025 AtDoorFix. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
