/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		domains: ['media.dodostatic.net', 'cdn.dodostatic.net', '1xleb.rus'], // Разрешенные домены
	},
};

export default nextConfig;
