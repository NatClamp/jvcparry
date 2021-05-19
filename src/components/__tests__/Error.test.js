/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

import '@testing-library/jest-dom/extend-expect';

import Error from '../Error';

describe('Error component', () => {
  const history = createMemoryHistory();
  afterEach(cleanup);
  it('should render the error page text', () => {
    render(
      <Router history={history}>
        <Error />
      </Router>,
    );
    expect(screen.getByText(/Something has gone wrong!/i)).toBeInTheDocument();
  });
  it('should match the snapshot', () => {
    const tree = renderer
      .create(
        <Router history={history}>
          <Error />
        </Router>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
