/**
 * @jest-environment jsdom
 */

import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { screen, cleanup } from '@testing-library/react';
import { render } from '../utils/test-utils';

import '@testing-library/jest-dom/extend-expect';

import Header from '../Header';

describe('Header component', () => {
  afterEach(cleanup);
  const history = createMemoryHistory();
  it('should render the Header', async () => {
    render(
      <Router history={history}>
        <Header />
      </Router>,
    );
    expect(screen.getByTestId('headerContainer')).toBeInTheDocument();
  });
  it.skip('should match the snapshot', () => {
    const tree = renderer
      .create(
        <Router history={history}>
          <Header />
        </Router>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
