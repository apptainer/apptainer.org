import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						"code::before": {
							content: '""',
						},
						"code::after": {
							content: '""',
						},
					},
				},
			},
			fontFamily: {
				sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
			},
			colors: {
				orange: {
					50: "#fff8ed",
					100: "#ffeed5",
					200: "#fed9aa",
					300: "#fcbe75",
					400: "#fa9334",
					500: "#f87a17",
					600: "#e95e0d",
					700: "#c1460d",
					800: "#993813",
					900: "#7c3012",
					950: "#431607",
				},
				green: {
					50: "#f4faeb",
					100: "#e5f4d3",
					200: "#cceaac",
					300: "#abdb7b",
					400: "#8cc952",
					500: "#70b335",
					600: "#538b25",
					700: "#416a21",
					800: "#36551f",
					900: "#2f491e",
					950: "#16270c",
				},
				blue: {
					50: "#f1f9fe",
					100: "#e2f1fc",
					200: "#bde4fa",
					300: "#84cff5",
					400: "#42b5ee",
					500: "#1895d3",
					600: "#0c7dbd",
					700: "#0b6499",
					800: "#0d557f",
					900: "#114769",
					950: "#0b2d46",
				},
				gray: {
					50: "#f6f6f6",
					100: "#e7e7e7",
					200: "#d1d1d1",
					300: "#b0b0b0",
					400: "#969696",
					500: "#6d6d6d",
					600: "#5d5d5d",
					700: "#4f4f4f",
					800: "#454545",
					900: "#3d3d3d",
					950: "#262626",
				},
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
