import React from 'react';
import { render } from '@testing-library/react';

import ShopProvider from '../../context/shopContext';
import BlogProvider from '../../context/blogContext';

const AllTheProviders = ({ children }) => (
  <ShopProvider>
    <BlogProvider>
      {children}
    </BlogProvider>
  </ShopProvider>
);

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
