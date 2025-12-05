import { useState } from 'react';

export default function ContactUs() {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-gray-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              AtDoorFix
            </div>
          </div>
          <button 
            onClick={() => window.history.back()} 
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have questions about your repair? Need help booking an appointment? 
            We're here to help you every step of the way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-blue-500/30 p-8 shadow-2xl">
              <h2 className="text-2xl font-semibold mb-6 text-white">Contact Information</h2>
              
              {/* Phone Numbers */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-300 mb-2">Phone Numbers</h3>
                    <a 
                      href="tel:3862860387" 
                      className="block text-blue-400 hover:text-blue-300 transition-colors mb-1 text-lg"
                    >
                      (386) 286-0387
                    </a>
                    <a 
                      href="tel:6173880141" 
                      className="block text-blue-400 hover:text-blue-300 transition-colors text-lg"
                    >
                      (617) 388-0141
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">✉️</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-300 mb-2">Email</h3>
                    <a 
                      href="mailto:management@atdoorfix.com" 
                      className="text-cyan-400 hover:text-cyan-300 transition-colors break-all"
                    >
                      management@atdoorfix.com
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🕒</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-300 mb-2">Business Hours</h3>
                    <p className="text-gray-400 text-sm">Monday - Saturday</p>
                    <p className="text-gray-400 text-sm">9:00 AM - 7:00 PM</p>
                  </div>
                </div>

                {/* Service Area */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-300 mb-2">Service Areas</h3>
                    <p className="text-gray-400 text-sm">
                      Daytona Beach • Ormond Beach • DeLand • Deltona • New Smyrna • Port Orange, FL
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Features */}
              <div className="border-t border-slate-800 pt-6">
                <h3 className="text-sm font-semibold text-gray-300 mb-3">Why Choose Us?</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Same-day mobile repair service</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Pay after repair is complete</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>90-day warranty included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Professional technicians</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-700 p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-white">Send Us a Message</h2>
            
            {submitted && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
                ✓ Thank you! We'll get back to you soon.
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <h3 className="font-semibold text-white mb-2">How quickly can you come?</h3>
              <p className="text-sm text-gray-400">
                We offer same-day appointments! Call us to check availability for your preferred time.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <h3 className="font-semibold text-white mb-2">Do I pay upfront?</h3>
              <p className="text-sm text-gray-400">
                No! You only pay after the repair is complete and you're satisfied with the work.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <h3 className="font-semibold text-white mb-2">What areas do you serve?</h3>
              <p className="text-sm text-gray-400">
                We serve Daytona Beach, Ormond Beach, DeLand, Deltona, New Smyrna, and Port Orange in Florida.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <h3 className="font-semibold text-white mb-2">Is there a warranty?</h3>
              <p className="text-sm text-gray-400">
                Yes! All repairs come with a 90-day warranty on parts and labor.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-gray-500 text-sm">
          © 2025 AtDoorFix. All rights reserved.
        </div>
      </footer>
    </div>
  );
}