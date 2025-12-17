// tailwind.config.js
module.exports = {
  daisyui: {
    themes: ["light", "dark"], // Only use these two for clean toggle
    darkTheme: "dark",          // Default dark theme
    base: true,
    styled: true,
    utils: true,
  },
  plugins: [require("daisyui")],
  // ... other config
};