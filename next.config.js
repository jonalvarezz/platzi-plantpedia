const { i18n } = require('./next-i18next.config')

module.exports = {
  future: {
    webpack5: true,
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
  i18n,
}
