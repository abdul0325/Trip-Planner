// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://example.com',
  generateRobotsTxt: true,  // Also generates robots.txt
  exclude: ['/admin/*', '/secret-page'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}