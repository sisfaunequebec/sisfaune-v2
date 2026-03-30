const nextConfig = {
  experimental: {
    optimizePackageImports: ['@chakra-ui/react']
  },
  compiler: {
    // removeConsole: process.env.NODE_ENV === 'production'
  },
  async redirects() {
    return [
      {
        source: '/donnees',
        destination: '/donnees/evenements',
        permanent: true
      },
      {
        source: '/administration',
        destination: '/administration/utilisateurs',
        permanent: true
      }
    ]
  }
}

export default nextConfig
