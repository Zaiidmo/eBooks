import { RouteObject } from 'react-router-dom'
import Home from '../pages/Home'
import { ProtectedRoute, PublicRoute } from '@/guards/auth.guard'
import Login from '@/pages/Auth/Login'
import Register from '@/pages/Auth/Register'
import VerifyEmail from '@/pages/Auth/VerifyEmail'
import Books from '@/pages/Books'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedRoute><Home /></ProtectedRoute>,
  },
  { 
    path: '/verify-email',
    element: <PublicRoute><VerifyEmail /></PublicRoute>,
  },
  { 
    path: '/login',
    element: <PublicRoute><Login /></PublicRoute>,
  },
  { 
    path: '/register',
    element: <PublicRoute><Register /></PublicRoute>,
  },
  {
    path: '/books',
    element: <Books  />,
  }
]

export default routes