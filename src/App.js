import React from 'react';
import './App.css';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';

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

const App = () => (
  <>
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
        <Modal />
        <HomeHero />
        <HomePage />
      </Route>
      <Route>
        <Header />
        <PageNotFound />
      </Route>
    </Switch>
    <Footer />
  </>
);

const NestedProducts = () => {
  const { path } = useRouteMatch();

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
  );
};

const NestedBlogs = () => {
  const { path } = useRouteMatch();

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
  );
};

export default App;
