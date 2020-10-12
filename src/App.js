import React from 'react';
import './App.css';
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import ShopProvider from './context/shopContext'

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import HireMe from './pages/HireMePage';
import Blog from './pages/BlogPage';
import BlogPost from './pages/BlogPostPage';
import Header from './components/Header';
import Cart from './components/Cart';

const debug = process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();
const engine = new Styletron();


const App = () => {
  return (
    <ShopProvider>
      <StyletronProvider value={engine} debug={debug} debugAfterHydration>
        <Router>
          <Header />
          <Cart />
          <Switch>
            <Route path="/product/:id">
              <ProductPage />
            </Route>
            <Route path="/products">
              <ProductsPage />
            </Route>

            <Route path="/hire-me">
              <HireMe />
            </Route>
            <Route path="/blog/:id">
              <BlogPost />
            </Route>
            <Route path="/blog">
              <Blog />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Router>
      </StyletronProvider>
    </ShopProvider>
  );
}

export default App;
