import React from 'react';
import './App.css';
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from "react-router-dom";
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import DMsProductPage from './pages/DMsProductPage';
import ProductPage from './pages/ProductPage';
import HireMe from './pages/HireMePage';
import Blog from './pages/BlogPage';
import BlogPost from './pages/BlogPostPage';
import Header from './components/Header';
import HomeHero from './components/HomeHero';
import Cart from './components/Cart';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PageNotFound from './pages/404';
import IndieProductsPage from './pages/IndieProductsPage';
import Modal from './components/SubscribeModal';


const history = createBrowserHistory();
history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

const debug = process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();
const engine = new Styletron();

const App = () => {
  return (
        <StyletronProvider value={engine} debug={debug} debugAfterHydration>
          <Router history={history}>
            <ScrollToTop />
            <Cart />
            <Switch>
              <Route exact path="/product/:id">
                <Header />
                <ProductPage />
              </Route>
              <Route path="/products">
                <NestedProducts />
              </Route>
              <Route path="/hire-me">
                <Header />
                <HireMe />
              </Route>
              <Route path="/blog">
                <NestedBlogs />
              </Route>
              <Route path="/" exact>
                <Modal/>
                <HomeHero />
                <HomePage />
              </Route>
              <Route>
                <Header />
                <PageNotFound />
              </Route>
            </Switch>
            <Footer />
          </Router>
        </StyletronProvider>
  );
}

const NestedProducts = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <Header />
        <ProductsPage />
      </Route>
      <Route path={`${path}/dmsguild`}>
        <Header />
        <DMsProductPage />
      </Route>
      <Route path={`${path}/indie`}>
        <Header />
        <IndieProductsPage />
      </Route>
    </Switch>
  )
}

const NestedBlogs = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <Header />
        <Blog />
      </Route>
      <Route path={`${path}/:id`}>
        <Header />
        <BlogPost />
      </Route>
    </Switch>
  )
}

export default App;
