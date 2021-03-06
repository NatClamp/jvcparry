/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

import '@testing-library/jest-dom/extend-expect';

import MobileNav from '../MobileNav';

describe('MobileNav component', () => {
  afterEach(cleanup);
  const history = createMemoryHistory();
  it('should render the MobileNav component', () => {
    render(
      <Router history={history}>
        <MobileNav toggleMenu={() => {}} />
      </Router>,
    );
    expect(
      screen.getByTestId('mobile-nav-container'),
    ).toBeInTheDocument();
  });
  it('should match the snapshot', () => {
    const tree = renderer
      .create(
        <Router history={history}>
          <MobileNav toggleMenu={() => {}} />
        </Router>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
