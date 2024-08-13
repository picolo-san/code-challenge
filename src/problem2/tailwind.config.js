/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Kanit, sans-serif', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "colors-white": "#fff",
        "colors-failure": "#ed4b9e",
        "colors-failure33": "#ed4b9e33",
        "colors-primary": "#1fc7d4",
        "colors-primary0f": "#1fc7d40f",
        "colors-primary3D": "#1fc7d43d",
        "colors-primaryBright": "#53dee9",
        "colors-primaryDark": "#0098a1",
        "colors-success": "#31d0aa",
        "colors-success19": "#31d0aa19",
        "colors-warning": "#ffb237",
        "colors-warning2D": "#ed4b9e2d",
        "colors-warning33": "#ed4b9e33",
        "colors-binance": "#f0b90b",
        "colors-overlay": "#452a7a",
        "colors-gold": "#ffc700",
        "colors-silver": "#b2b2b2",
        "colors-bronze": "#e7974d",
        "colors-yellow": "#d67e0a",
        "colors-secondary": "#a881fc",
        "colors-secondary80": "#a881fc80",
        "colors-background": "#08060b",
        "colors-backgroundDisabled": "#3c3742",
        "colors-backgroundAlt": "#27262c",
        "colors-backgroundAlt2": "rgba(39,38,44,.7)",
        "colors-cardBorder": "#383241",
        "colors-contrast": "#fff",
        "colors-dropdown": "#1e1d20",
        "colors-dropdownDeep": "#100c18",
        "colors-invertedContrast": "#191326",
        "colors-input": "#372f47",
        "colors-inputSecondary": "#262130",
        "colors-tertiary": "#353547",
        "colors-text": "#f4eeff",
        "colors-text99": "#f4eeff99",
        "colors-textDisabled": "#666171",
        "colors-textSubtle": "#b8add2",
        "colors-disabled": "#524b63",
        "colors-darkBlue": "#313d5c",
        "colors-darkPurple": "#3d2a54"
      },
      spacing: {      
        "115.5": "28.875rem",
        "112": "28rem",
        "128": "32rem",
        "150": "37.5rem"
      },
      boxShadow: {
        "focus": "0px 0px 0px 1px #7645d9, 0px 0px 0px 4px rgba(118, 69, 217, .6)"
      },
      screens: {
        "2xs": "0px",
        "xs": "375px",
      },
      keyframes: {
        openModal: {
          "0%": {
            height: "0",
            width: "0",
            opacity: "0",
          },
          "1%": {
            height: "100%",
            width: "100%",
            opacity: "0",
          },
          "100%": {
            height: "100%",
            width: "100%",
            opacity: "1",
          }
        },
        closeModal: {
          "0%": {
            height: "100%",
            width: "100%",
            opacity: "1",
          },
          "99%": {
            height: "100%",
            width: "100%",
            opacity: "0",
          },
          "100%": {
            height: "0",
            width: "0",
            opacity: "0",
          }
        }
      }    
    },
  },
  plugins: [require('daisyui')],
}

