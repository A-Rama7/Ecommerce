import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter} from 'react-router-dom';
import CartProvider from './Context/Cart';
import ChangeProvider from './Context/Change';
import AddQuantityPanier2Provider from './Context/AddQuantityPanier2';
import RemoveQuantityPanier2Provider from './Context/RemoveQuantityPanier2';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <ChangeProvider>
          <AddQuantityPanier2Provider>
            <RemoveQuantityPanier2Provider>
              <App />
            </RemoveQuantityPanier2Provider>
          </AddQuantityPanier2Provider>
        </ChangeProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
