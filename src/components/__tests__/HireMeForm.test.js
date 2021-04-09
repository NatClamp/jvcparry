/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

import '@testing-library/jest-dom/extend-expect';

import HireMeForm from '../HireMeForm';

describe('HireMeForm component', () => {
  const history = createMemoryHistory();
  afterEach(cleanup);

  it('should render the HireMeForm component', () => {
    render(
      <Router history={history}>
        <HireMeForm />
      </Router>,
    );
    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
  });
  it('should match the snapshot', () => {
    const tree = renderer
      .create(
        <Router history={history}>
          <HireMeForm />
        </Router>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
