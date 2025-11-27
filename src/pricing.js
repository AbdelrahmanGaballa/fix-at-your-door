// src/pricing.js

// Prices = part price + $60 profit (approx)
// q7 = aftermarket + 60
// q8 = aftermarket + 70 (slightly higher tier)
// premium = premium + 60

export const SCREEN_PRICING = {
  Apple: {
    "iPhone 8": { q7: 74, q8: 84, premium: 77 },
    "iPhone 8 Plus": { q7: 80, q8: 90, premium: 86 },
    "iPhone X": { q7: 77, q8: 87, premium: 95 },
    "iPhone XR": { q7: 78, q8: 88, premium: 89 },
    "iPhone XS": { q7: 77.5, q8: 87.5, premium: 96 },
    "iPhone XS Max": { q7: 75.5, q8: 85.5, premium: 94 },
    "iPhone 11": { q7: 70, q8: 80, premium: 87 },
    "iPhone 11 Pro": { q7: 76, q8: 86, premium: 114 },
    "iPhone 11 Pro Max": { q7: 76, q8: 86, premium: 100 },
    "iPhone 12": { q7: 76.5, q8: 86.5, premium: 114.5 },
    "iPhone 12 Pro": { q7: 76.5, q8: 86.5, premium: 114.5 },
    "iPhone 12 Pro Max": { q7: 84.5, q8: 94.5, premium: 117 },
    "iPhone 13": { q7: 78, q8: 88, premium: 110 },
    "iPhone 13 Pro": { q7: 89, q8: 99, premium: 120 },
    "iPhone 13 Pro Max": { q7: 96, q8: 106, premium: 115 },
    "iPhone 14": { q7: 79, q8: 89, premium: 110 },
    "iPhone 14 Plus": { q7: 83.5, q8: 93.5, premium: 120 },
    "iPhone 14 Pro Max": { q7: 96, q8: 106, premium: 168 },
    "iPhone 15": { q7: 84, q8: 94, premium: 150 },
    "iPhone 15 Plus": { q7: 84, q8: 94, premium: 167 },
    "iPhone 15 Pro Max": { q7: 102.5, q8: 112.5, premium: 170 },
    "iPhone 16": { q7: 105, q8: 115, premium: 176.5 },
    "iPhone 16 Plus": { q7: 109, q8: 119, premium: 180 },
    "iPhone 16 Pro": { q7: 145, q8: 155, premium: 295 },
    "iPhone 16 Pro Max": { q7: 159, q8: 169, premium: 300 },
  },

  // You can fill these later if you want pricing for Samsung / Google
  Samsung: {
    // "Galaxy S21": { q7: 120, q8: 135, premium: 180 },
  },

  Google: {
    // "Pixel 7": { q7: 115, q8: 130, premium: 175 },
  },
};
