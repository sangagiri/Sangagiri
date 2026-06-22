// ============================================================
//  SANAGIRI TOWN WEBSITE — CONFIG FILE
//  All keys managed here. Sensitive keys fetched from Firebase
//  Remote Config at runtime. Only Firebase key lives here.
// ============================================================

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBGd3SjDPuuKZuRWga536rS56NLXno1kPo",
  authDomain: "sangagiri.firebaseapp.com",
  projectId: "sangagiri",
  storageBucket: "sangagiri.firebasestorage.app",
  messagingSenderId: "1067104477055",
  appId: "1:1067104477055:web:1729edaa0c33e7b22c844a"
};

// Public keys (safe to expose)
export const PUBLIC_KEYS = {
  GOOGLE_MAPS_EMBED_KEY: "YOUR_GOOGLE_MAPS_KEY", // Add your Maps Embed API key
};

// Keys fetched from Firebase Remote Config at runtime:
// - CLOUDINARY_CLOUD_NAME
// - CLOUDINARY_UPLOAD_PRESET
// - EMAILJS_SERVICE_ID
// - EMAILJS_TEMPLATE_ID
// - EMAILJS_PUBLIC_KEY
// See js/modules/remoteConfig.js for fetching logic

export const SITE_CONFIG = {
  name: "Sanagiri",
  tagline: "சனகிரி | The Heritage Town of Salem District",
  domain: "sanagiri.in", // Update with your actual domain
  adminEmail: "admin@sanagiri.in",
  whatsapp: "", // Add admin WhatsApp number if needed
};
