const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const config = {
  future: {
    webpack5: true,
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
}

module.exports = withBundleAnalyzer(config)
