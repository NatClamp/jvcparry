/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

import '@testing-library/jest-dom/extend-expect';

import Nav from '../Nav';

describe('Nav component', () => {
  afterEach(cleanup);
  const history = createMemoryHistory();
  it('should render the Nav component', () => {
    render(
      <Router history={history}>
        <Nav />
      </Router>,
    );
    expect(
      screen.getByTestId('nav-container'),
    ).toBeInTheDocument();
  });
  it('should match the snapshot', () => {
    const tree = renderer
      .create(
        <Router history={history}>
          <Nav />
        </Router>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
