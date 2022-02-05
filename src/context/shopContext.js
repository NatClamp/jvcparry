import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Client from 'shopify-buy';

const ShopContext = React.createContext();

const client = Client.buildClient({
  domain: 'jvcparry.myshopify.com/',
  storefrontAccessToken: '6488f139d8c7b8de76ef7c6c45af0a2a',
});

class ShopProvider extends Component {
  state = {
    products: [],
    product: {},
    checkout: {},
    isCartOpen: false,
    err: null,
    variantIndex: 0,
  };

  componentDidMount() {
    if (localStorage.checkout) {
      this.fetchCheckout(localStorage.checkout);
    } else {
      this.createCheckout();
    }
  }

  createCheckout = async () => {
    const checkout = await client.checkout.create();
    localStorage.setItem('checkout', checkout.id);
    await this.setState({ checkout });
  };

  fetchCheckout = async (checkoutId) => {
    client.checkout
      .fetch(checkoutId)
      .then((checkout) => {
        this.setState({ checkout });
      })
      .catch((err) => this.setState({ err }));
  };

  addItemToCheckout = async (variantId, quantity) => {
    const lineItemsToAdd = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ];
    const { checkout } = this.state;
    const chkout = await client.checkout.addLineItems(
      checkout.id,
      lineItemsToAdd,
    );
    this.setState({ checkout: chkout });

    this.openCart();
  };

  updateItemToCheckout = async (variantId, quantity) => {
    const newItemNumber = Number(quantity) - 1;
    const lineItemToUpdate = [
      {
        id: variantId,
        quantity: newItemNumber,
      },
    ];
    const { checkout } = this.state;
    const chkout = await client.checkout.updateLineItems(
      checkout.id,
      lineItemToUpdate,
    );
    this.setState({ checkout: chkout });
  }

  clearBasket = async () => {
    localStorage.clear();
    this.setState({ isCartOpen: false });
  }

  fetchAllProducts = async () => {
    const products = await client.product.fetchAll();
    this.setState({ products });
  };

  fetchProductWithId = async (id) => {
    const product = await client.product.fetch(id);
    this.setState({ product });
  };

  closeCart = () => {
    this.setState({ isCartOpen: false });
  };

  openCart = () => {
    this.setState({ isCartOpen: true });
  };

  setVariantIndex = (index) => {
    this.setState({ variantIndex: index });
  }

  render() {
    const { children } = this.props;
    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          createCheckout: this.createCheckout,
          fetchAllProducts: this.fetchAllProducts,
          fetchProductWithId: this.fetchProductWithId,
          closeCart: this.closeCart,
          openCart: this.openCart,
          addItemToCheckout: this.addItemToCheckout,
          updateItemToCheckout: this.updateItemToCheckout,
          setVariantIndex: this.setVariantIndex,
          clearBasket: this.clearBasket,
        }}
      >
        {children}
      </ShopContext.Provider>
    );
  }
}

ShopProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };

export default ShopProvider;
