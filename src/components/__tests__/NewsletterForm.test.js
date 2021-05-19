/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

import '@testing-library/jest-dom/extend-expect';

import NewsletterForm from '../NewsletterForm';

describe('NewsletterForm component', () => {
  afterEach(cleanup);
  const history = createMemoryHistory();
  it('should render the NewsletterForm component in the footer', () => {
    render(
      <Router history={history}>
        <NewsletterForm location="footer" />
      </Router>,
    );
    expect(screen.getByText(/Subscribe to my newsletter/i)).toBeInTheDocument();
  });
  it('should render the NewsletterForm component in the popup without the title', () => {
    render(
      <Router history={history}>
        <NewsletterForm location="modal" />
      </Router>,
    );
    expect(screen.queryByTestId('footer-title')).not.toBeInTheDocument();
  });
  it('should match the snapshot', () => {
    const tree = renderer
      .create(
        <Router history={history}>
          <NewsletterForm location="footer" />
        </Router>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
