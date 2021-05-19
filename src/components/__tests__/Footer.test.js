/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

import '@testing-library/jest-dom/extend-expect';

import Footer from '../Footer';

describe('Footer component', () => {
  const history = createMemoryHistory();
  afterEach(cleanup);

  it('should render the footer', () => {
    render(
      <Router history={history}>
        <Footer />
      </Router>,
    );
    expect(screen.getByText(/JVC Parry/i)).toBeInTheDocument();
  });
  it('should match the snapshot', () => {
    const tree = renderer
      .create(
        <Router history={history}>
          <Footer />
        </Router>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
