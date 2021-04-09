/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

import '@testing-library/jest-dom/extend-expect';

import Loading from '../Loading';

describe('Loading component', () => {
  afterEach(cleanup);
  const history = createMemoryHistory();
  it('should render the Loading component', () => {
    render(
      <Router history={history}>
        <Loading />
      </Router>,
    );
    expect(
      screen.getByTestId('loading'),
    ).toBeInTheDocument();
  });
  it('should match the snapshot', () => {
    const tree = renderer
      .create(
        <Router history={history}>
          <Loading />
        </Router>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
