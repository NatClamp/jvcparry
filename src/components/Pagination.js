import React, { Component, Fragment } from 'react';
import { Anchor } from 'atomize';
import PropTypes from 'prop-types';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
  let i = from;
  const rnge = [];

  while (i <= to) {
    rnge.push(i);
    i += step;
  }

  return rnge;
};

class Pagination extends Component {
  constructor(props) {
    super(props);
    const { totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props;

    this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 30;
    this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;

    this.pageNeighbours = typeof pageNeighbours === 'number'
      ? Math.max(0, Math.min(pageNeighbours, 2))
      : 0;

    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);

    this.state = { currentPage: 1 };
  }

  componentDidUpdate(prevProps) {
    const { totalRecords } = this.props;
    if (totalRecords !== prevProps.totalRecords) {
      this.totalPages = Math.ceil(totalRecords / this.pageLimit);
    }
  }

  fetchPageNumbers = () => {
    const { totalPages } = this;
    const { currentPage } = this.state;
    const { pageNeighbours } = this;

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = (this.pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  }

  render() {
    if (!this.totalRecords || this.totalPages === 1) return null;

    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();

    return (
      <>
        <nav aria-label="Pagination">
          <ul
            className="pagination"
            style={{
              textDecoration: 'none', listStyle: 'none', display: 'flex', justify: 'center', padding: '0',
            }}
          >
            {currentPage > 1
              && (
              <li className="page-item" style={{ listStyle: 'none' }}>
                <Anchor
                  className="page-link"
                  aria-label="Previous"
                  onClick={this.handleMoveLeft}
                  textDecoration="none"
                  p="1rem"
                  textColor="black"
                  hoverTextColor="hsla(217, 14%, 50%)"
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </Anchor>
              </li>
              )}
            {pages.map((page, index) => (
              <li key={index}>
                <Anchor className="page-link" onClick={this.handleClick(page)} textDecoration="none" p="1rem" textColor={currentPage === page ? 'red' : 'black'} hoverTextColor="hsla(217, 14%, 50%)" cursor={currentPage === page ? 'not-allowed' : 'pointer'}>{page}</Anchor>
              </li>
            ))}
            {currentPage < this.totalPages
              && (
              <li className="page-item">
                <Anchor className="page-link" aria-label="Next" onClick={this.handleMoveRight} textDecoration="none" p="1rem" textColor="black" hoverTextColor="hsla(217, 14%, 50%)">
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </Anchor>
              </li>
              )}

          </ul>
        </nav>
      </>
    );
  }

  componentDidMount() {
    this.gotoPage(1);
  }

  gotoPage = (page) => {
    const { onPageChanged = (f) => f } = this.props;
    const currentPage = Math.max(0, Math.min(page, this.totalPages));
    const paginationData = {
      currentPage,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit,
      totalRecords: this.totalRecords,
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  }

  handleClick = (page) => (evt) => {
    evt.preventDefault();
    this.gotoPage(page);
  }

  handleMoveLeft = (evt) => {
    const { currentPage } = this.state;
    evt.preventDefault();
    this.gotoPage(currentPage - 1);
  }

  handleMoveRight = (evt) => {
    const { currentPage } = this.state;
    evt.preventDefault();
    this.gotoPage(currentPage + 1);
  }
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number.isRequired,
  pageNeighbours: PropTypes.number.isRequired,
  onPageChanged: PropTypes.func.isRequired,
};

export default Pagination;
