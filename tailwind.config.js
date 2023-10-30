/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/screens/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				background: '#2C2C30',
				modal: "#343434",
				button: "#2b7bbb"
			},
		},
	},
	plugins: [],
}
