'use client'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// IMPORTANT: keep instantiation outside provider to get a stable client
const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     experimental_prefetchInRender: true
  //   }
  // }
})

const ReactQueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider