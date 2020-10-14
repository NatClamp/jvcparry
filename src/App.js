import React from 'react';
import './App.css';
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ShopProvider from './context/shopContext'

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import HireMe from './pages/HireMePage';
import Blog from './pages/BlogPage';
import BlogPost from './pages/BlogPostPage';
import Header from './components/Header';
import HomeHero from './components/HomeHero';
import Cart from './components/Cart';
import Footer from './components/Footer';

const debug = process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();
const engine = new Styletron();

const App = () => {
  return (
    <ShopProvider>
      <StyletronProvider value={engine} debug={debug} debugAfterHydration>
        <Router>
          <Cart />
          <Switch>
            <Route path="/product/:id">
              <Header />
              <ProductPage />
            </Route>
            <Route path="/products">
              <Header />
              <ProductsPage />
            </Route>
            <Route path="/hire-me">
              <Header />
              <HireMe />
            </Route>
            <Route path="/blog/:id">
              <Header />
              <BlogPost />
            </Route>
            <Route path="/blog">
              <Header />
              <Blog />
            </Route>
            <Route path="/">
              <HomeHero />
              <HomePage />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </StyletronProvider>
    </ShopProvider>
  );
}

export default App;
