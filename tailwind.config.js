/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                "readex-pro": ["JetBrains Mono", "monospace"],
            },
        },
        screens: {
            "sm": "360px",
            "md": "720px", 
            "lg": "1024px",
            "xl": "1360px",
            "2xl": "1920px",
        },
    },
    plugins: [],
};
