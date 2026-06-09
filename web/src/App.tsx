import { Route, Routes } from "react-router"
import { Login } from "./pages/Login"
import { Dashboard } from "./pages/Dashboard"
import { useAuth } from "./context/authContext"
import { Navigate } from "react-router"
import { SessionDetails } from "./pages/SessionDetails"
import { SessionCreate } from "./pages/SessionCreate"

export const App = () => {
    const { isAuthenticated } = useAuth()

    return (

        <Routes>
            <Route path='/login' element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
            <Route path='/*' element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />
            <Route path='/session/create' element={<SessionCreate />} />
            <Route path='/session/:sessionId' element={<SessionDetails />} />
        </Routes>
    )
}
