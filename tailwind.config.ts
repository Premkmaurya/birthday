import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '390px', // Extra small - mobile phones
        sm: '640px', // Small devices (landscape phones)
        md: '768px', // Tablets
        lg: '1024px', // Large tablets and small laptops
        xl: '1280px', // Laptops
        '2xl': '1536px', // Large screens
      },
    },
  },
  plugins: [],
};

export default config;
