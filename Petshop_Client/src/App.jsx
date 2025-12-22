import './App.css'
import CartProvider from './context/Cart/CartProvider'
import { SearchProvider } from './context/Search/SearchProvider'
import Router from './routers/Router'

function App() {

  return (
    <>
      <SearchProvider>
        <CartProvider>
          <Router />
        </CartProvider>

      </SearchProvider>

    </>
  )
}

export default App
