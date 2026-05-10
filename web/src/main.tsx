import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { hydrate } from './store/slices/authSlice.ts'

if (typeof global === 'undefined') {
  // @ts-ignore
  window.global = window;
}

store.dispatch(hydrate())

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
)
