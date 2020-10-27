import React, { Component } from "react";
import Client from "shopify-buy";

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
    isLoading: false,
  };

  componentDidMount() {
    //Check if localStorage has a checkout_id saved
    if (localStorage.checkout) {
      this.fetchCheckout(localStorage.checkout);
    } else {
      this.createCheckout();
    }
    //if there is no checkout_id in localStorage then we will create a new checkout
    //else fetch the checkout from shopify
  }

  createCheckout = async () => {
    const checkout = await client.checkout.create();
    localStorage.setItem("checkout", checkout.id);
    await this.setState({ checkout: checkout });
  };

  fetchCheckout = async (checkoutId) => {
    client.checkout
      .fetch(checkoutId)
      .then((checkout) => {
        this.setState({ checkout: checkout });
      })
      .catch((err) => console.log(err));

  };

  addItemToCheckout = async (variantId, quantity) => {
    const lineItemsToAdd = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ];
    const checkout = await client.checkout.addLineItems(
      this.state.checkout.id,
      lineItemsToAdd
    );
    this.setState({ checkout: checkout });

    this.openCart();
  };

  updateItemToCheckout = async (variantId, quantity) => {
    const newItemNumber = Number(quantity) - 1;
    const lineItemToUpdate = [
      {
        id: variantId,
        quantity: newItemNumber
      }
    ]
    const checkout = await client.checkout.updateLineItems(
      this.state.checkout.id,
      lineItemToUpdate
    )
    this.setState({ checkout: checkout })
  }

  fetchAllProducts = async () => {
    this.setState({ isLoading: true, err: false })
    try {
      const products = await client.product.fetchAll();
      this.setState({ products: products, isLoading: false });
    } catch (err) {
      this.setState({ err: true })
    }
  };

  fetchProductWithId = async (id) => {
    this.setState({ isLoading: true, err: false })
    try {
      const product = await client.product.fetch(id);
      this.setState({ product: product, isLoading: false });
      return product;
    }
    catch (err) {
      this.setState({ err: true })
    }
  };

  closeCart = () => {
    this.setState({ isCartOpen: false });
  };
  openCart = () => {
    this.setState({ isCartOpen: true });
  };

  render() {
    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          fetchAllProducts: this.fetchAllProducts,
          fetchProductWithId: this.fetchProductWithId,
          closeCart: this.closeCart,
          openCart: this.openCart,
          addItemToCheckout: this.addItemToCheckout,
          updateItemToCheckout: this.updateItemToCheckout,
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };

export default ShopProvider;
