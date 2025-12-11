// src/pricing.js
// Prices = supplier price + $60 profit
// Keys: aftermarket, premium

export const SCREEN_PRICING = {
  Apple: {
    "iPhone 8": { aftermarket: 84, premium: 87 },
    "iPhone 8 Plus": { aftermarket: 90, premium: 96 },
    "iPhone X": { aftermarket: 87, premium: 105 },
    "iPhone XR": { aftermarket: 88, premium: 99 },
    "iPhone XS": { aftermarket: 87.5, premium: 106 },
    "iPhone XS Max": { aftermarket: 85.5, premium: 104 },
    "iPhone 11": { aftermarket: 80, premium: 97 },
    "iPhone 11 Pro": { aftermarket: 86, premium: 124 },
    "iPhone 11 Pro Max": { aftermarket: 86, premium: 110 },
    "iPhone 12": { aftermarket: 86.5, premium: 124.5 },
    "iPhone 12 Pro": { aftermarket: 86.5, premium: 124.5 },
    "iPhone 12 Pro Max": { aftermarket: 94.5, premium: 127 },
    "iPhone 13": { aftermarket: 88, premium: 120 },
    "iPhone 13 Pro": { aftermarket: 99, premium: 130 },
    "iPhone 13 Pro Max": { aftermarket: 106, premium: 125 },
    "iPhone 14": { aftermarket: 89, premium: 120 },
    "iPhone 14 Plus": { aftermarket: 93.5, premium: 130 },
    "iPhone 14 Pro Max": { aftermarket: 106, premium: 178 },
    "iPhone 15": { aftermarket: 94, premium: 160 },
    "iPhone 15 Plus": { aftermarket: 94, premium: 177 },
    "iPhone 15 Pro Max": { aftermarket: 112.5, premium: 180 },
    "iPhone 16": { aftermarket: 115, premium: 186.5 },
    "iPhone 16 Plus": { aftermarket: 119, premium: 190 },
    "iPhone 16 Pro": { aftermarket: 155, premium: 305 },
    "iPhone 16 Pro Max": { aftermarket: 169, premium: 310 },
  },

  // fill later if you want Samsung / Google pricing
  Samsung: {
    // "Galaxy S21": { aftermarket: 120, premium: 180 },
  },

  Google: {
    // "Pixel 7": { aftermarket: 115, premium: 175 },
  },
};

// ... your existing SCREEN_PRICING stays exactly as it is

export const BATTERY_PRICING = {
  Apple: {
    "iPhone 8": 80,
    "iPhone 8 Plus": 81,
    "iPhone X": 83,
    "iPhone XR": 83,
    "iPhone XS": 85,
    "iPhone XS Max": 85,
    "iPhone 11": 88,
    "iPhone 11 Pro": 89,
    "iPhone 11 Pro Max": 89,
    "iPhone 12": 88,
    "iPhone 12 Pro": 88,
    "iPhone 12 Pro Max": 90,
    "iPhone 13": 88,
    "iPhone 13 Pro": 88,
    "iPhone 13 Pro Max": 92,
    "iPhone 14": 90,
    "iPhone 14 Pro": 90,
    "iPhone 14 Pro Max": 94,
    "iPhone 15": 90,
    "iPhone 15 Pro": 90,
    "iPhone 15 Plus": 90,
    "iPhone 15 Pro Max": 94,
    "iPhone 16": 95,
    "iPhone 16 Pro": 95,
    "iPhone 16 Plus": 95,
    "iPhone 16 Pro Max": 100,
  },
};
