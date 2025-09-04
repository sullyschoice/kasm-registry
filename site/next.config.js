/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  distDir: '../public',
  env: {
    name: 'Sullys Choice',
    description: 'Ad-Hoc Kasm supported workspaces.',
    icon: 'https://sullyschoice.github.io/kasm-registry/1.1/image.png',
    listUrl: 'https://sullyschoice.github.io/kasm-registry/',
    contactUrl: 'https://sullyschoice.github.io/kasm-registry/',
  },
  reactStrictMode: true,
  basePath: '/kasm-registry/1.0',
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig
