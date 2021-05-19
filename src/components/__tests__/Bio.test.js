/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

import '@testing-library/jest-dom/extend-expect';

import Bio from '../Bio';

describe('Bio component', () => {
  afterEach(cleanup);
  const history = createMemoryHistory();
  it('should render the biography text', () => {
    render(
      <Router history={history}>
        <Bio />
      </Router>,
    );
    expect(screen.getByText(/Greetings!/i)).toBeInTheDocument();
  });
  it('should match the snapshot', () => {
    const tree = renderer
      .create(
        <Router history={history}>
          <Bio />
        </Router>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
