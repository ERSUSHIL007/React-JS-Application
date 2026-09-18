import { useState } from 'react'
import Demo from './Demo'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // retry: false,
    },
  },
})

function App() {
  const [showDemo, setShowDemo] = useState(true)

  return (
    <QueryClientProvider client={queryClient}>
      <button
        className="toggle-demo-button"
        onClick={() => setShowDemo(!showDemo)}
      >
        Toggle Demo
      </button>
      {showDemo && <div className="demo-container"><Demo /></div>}
    </QueryClientProvider>
  )
}

export default App
