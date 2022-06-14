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
    // check that the checkout is actually here - sometimes doesn't appear?
    // clear cache to bring back temporarily
    const { checkout } = this.state;
    console.log(checkout.id);
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
    // TODO - instead of just getting rid of the checkout, we should perhaps create a new one!
    localStorage.clear();
    this.setState({ isCartOpen: false });
  }

  fetchAllProducts = async () => {
    const products = await client.product.fetchAll();
    this.setState({ products });
  };

  convertIdToGid = (type, id) => {
    if (!id) return null;
    return btoa(`gid://shopify/${type}/${id}`);
  }

  encodeGid = (gid) => btoa(gid)

  getIdNumber = (gid) => {
    if (!gid) return null;
    return gid.split('/').slice(-1)[0];
  };

  fetchProductWithId = async (id) => {
    const gid = this.convertIdToGid('Product', id);
    const product = await client.product.fetch(gid);
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

  setVariantTypesAvailable = (product) => {
    const availableVariants = product?.variants?.map((variant) => variant.title) || [];
    this.setState({ availableVariants });
  };

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
          setVariantTypesAvailable: this.setVariantTypesAvailable,
          clearBasket: this.clearBasket,
          getIdNumber: this.getIdNumber,
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
