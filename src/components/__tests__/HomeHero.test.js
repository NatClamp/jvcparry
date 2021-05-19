/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

import '@testing-library/jest-dom/extend-expect';

import HomeHero from '../HomeHero';

describe('HomeHero component', () => {
  afterEach(cleanup);

  const history = createMemoryHistory();
  it('should render the HomeHero component', () => {
    render(
      <Router history={history}>
        <HomeHero />
      </Router>,
    );
    expect(screen.getByText(/Indie TTRPG creator/i)).toBeInTheDocument();
  });
  it('should match the snapshot', () => {
    const tree = renderer
      .create(
        <Router history={history}>
          <HomeHero />
        </Router>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
