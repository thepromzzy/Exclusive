/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disables the development indicator overlay (the small status icon 
  // in the bottom right corner) when running `next dev`.
  // We are now using the simplest boolean syntax (devIndicators: false) 
  // to ensure maximum compatibility and rule out any object nesting issues.
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

}

export default nextConfig