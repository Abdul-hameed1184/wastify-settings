/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './Component/**/*.{js,ts,jsx,tsx,mdx}',
    './Pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'Poppins': 'Poppins',
    },
    fontSize: {
      'xxs': '0.563rem', 
      'xs': '0.625rem',
      'sm': '0.8rem',
      'base': '1rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
      '4xl': '2.5rem',
    },
    letterSpacing: {
      widestSa: '0.8em',
    },
    extend: {
      backgroundImage: {
        'bgdesktop-pattern': "url('https://wasteefy.com/Images/bgdesktop.png')", 
        'bgmobile-pattern': "url('https://wasteefy.com/Images/bgmobile.png')", 
      },
      colors:{
        black: '#000000',
        gray: '#4B4F5A',
        lightGreen: '#96C63D4D', 
        green: '#719F1C',
        Oldgreen: '#96C63D',
        navgreen: '#AAC27D',
        lightgray: "#15234980",
        lightgrayer: "#C7C7C7",
        error: "#961919",
        support: "#e0bc22",
        success: "#4CAF50",
        grayInput: "#D9D9D9",
        grayRounded: "#625E5E",
        lightBackground: "#F1F1F1",
        tableBackground: "#EDEDED",
        failed: "#FF5722",
        pending: "#3498DB",
        readgray: "#D0D3D5",
        secureblue: "#122E60",
      }
    },
  },
  plugins: [

  ],
}

