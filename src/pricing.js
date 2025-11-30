// src/pricing.js
// Prices = supplier price + $60 profit
// Keys: aftermarket, premium

export const SCREEN_PRICING = {
  Apple: {
    "iPhone 8": { aftermarket: 74, premium: 77 },
    "iPhone 8 Plus": { aftermarket: 80, premium: 86 },
    "iPhone X": { aftermarket: 77, premium: 95 },
    "iPhone XR": { aftermarket: 78, premium: 89 },
    "iPhone XS": { aftermarket: 77.5, premium: 96 },
    "iPhone XS Max": { aftermarket: 75.5, premium: 94 },
    "iPhone 11": { aftermarket: 70, premium: 87 },
    "iPhone 11 Pro": { aftermarket: 76, premium: 114 },
    "iPhone 11 Pro Max": { aftermarket: 76, premium: 100 },
    "iPhone 12": { aftermarket: 76.5, premium: 114.5 },
    "iPhone 12 Pro": { aftermarket: 76.5, premium: 114.5 },
    "iPhone 12 Pro Max": { aftermarket: 84.5, premium: 117 },
    "iPhone 13": { aftermarket: 78, premium: 110 },
    "iPhone 13 Pro": { aftermarket: 89, premium: 120 },
    "iPhone 13 Pro Max": { aftermarket: 96, premium: 115 },
    "iPhone 14": { aftermarket: 79, premium: 110 },
    "iPhone 14 Plus": { aftermarket: 83.5, premium: 120 },
    "iPhone 14 Pro Max": { aftermarket: 96, premium: 168 },
    "iPhone 15": { aftermarket: 84, premium: 150 },
    "iPhone 15 Plus": { aftermarket: 84, premium: 167 },
    "iPhone 15 Pro Max": { aftermarket: 102.5, premium: 170 },
    "iPhone 16": { aftermarket: 105, premium: 176.5 },
    "iPhone 16 Plus": { aftermarket: 109, premium: 180 },
    "iPhone 16 Pro": { aftermarket: 145, premium: 295 },
    "iPhone 16 Pro Max": { aftermarket: 159, premium: 300 },
  },

  // fill later if you want Samsung / Google pricing
  Samsung: {
    // "Galaxy S21": { aftermarket: 120, premium: 180 },
  },

  Google: {
    // "Pixel 7": { aftermarket: 115, premium: 175 },
  },
};
