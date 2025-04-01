import React from "react"
import AppRouter from "./router/AppRouter"
import { UserProvider } from "./context/user.context"
function App() {

  return (
    <>
    <UserProvider>
      <AppRouter/>
    </UserProvider>
    </>
  )
}

export default App
