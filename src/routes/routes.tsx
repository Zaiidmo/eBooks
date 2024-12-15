import { RouteObject } from 'react-router-dom'
import Home from '../pages/Home'
import ForgotPassword from '@/pages/Auth/ForgotPassword'
import { ProtectedRoute, PublicRoute } from '@/guards/auth.guard'
import Login from '@/pages/Auth/Login'
import Register from '@/pages/Auth/Register'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  { 
    path: '/forgot-password',
    element: <PublicRoute><ForgotPassword /></PublicRoute>,
  },
  { 
    path: '/login',
    element: <PublicRoute><Login /></PublicRoute>,
  },
  { 
    path: '/register',
    element: <PublicRoute><Register /></PublicRoute>,
  },
]

export default routes