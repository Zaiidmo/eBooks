import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import Layout from './layouts/clientLayout'
import routes from './routes/routes'
import { Toaster } from 'react-hot-toast';
import { DemoNotification } from './components/modals/DemoNotification';

function AppRoutes() {
  const element = useRoutes(routes)
  return element
}

function App() {
  return (
    <Router>
      <DemoNotification />
      <Layout>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
        <AppRoutes />
      </Layout>
    </Router>
  )
}

export default App