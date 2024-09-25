import { Navigate, Outlet } from 'react-router-dom'
import './App.css'
import { useUser} from '@clerk/clerk-react'
import Header from './components/customs/header'
import { Toaster } from "@/components/ui/sonner"
function App() {
  const { isSignedIn, user, isLoaded } = useUser()
  if (!isSignedIn && isLoaded) {
    return < Navigate to={'/auth/signIn'} />
  }


  return (
    <>
      <Header/>
      <Outlet/>
      <Toaster />
    </>
    
  )
}

export default App
