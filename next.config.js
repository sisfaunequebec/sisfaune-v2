
import { withWorkflow } from 'workflow/next'

const nextConfig = {
  experimental: {
    optimizePackageImports: ['@chakra-ui/react']
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
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

const workflowConfig = {}

export default withWorkflow(nextConfig, workflowConfig)
