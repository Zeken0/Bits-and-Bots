/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "m.media-amazon.com",
      "static.wikia.nocookie.net",
      "ecsmedia.pl",
      "livekort.no",
    ],
  },
};

module.exports = nextConfig;
