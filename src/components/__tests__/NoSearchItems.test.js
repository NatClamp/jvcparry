/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

import '@testing-library/jest-dom/extend-expect';

import NoSearchItems from '../NoSearchItems';

describe('NoSearchItems component', () => {
  afterEach(cleanup);
  const history = createMemoryHistory();
  it('should render the NoSearchItems component', () => {
    render(
      <Router history={history}>
        <NoSearchItems searchValue="" resetSearch={() => {}} handleChange={() => {}} handleSubmit={() => {}} />
      </Router>,
    );
    expect(screen.getByText(/Sorry, there are no products matching the search term/i)).toBeInTheDocument();
  });
  it('should match the snapshot', () => {
    const tree = renderer
      .create(
        <Router history={history}>
          <NoSearchItems searchValue="" resetSearch={() => {}} handleChange={() => {}} handleSubmit={() => {}} />
        </Router>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
