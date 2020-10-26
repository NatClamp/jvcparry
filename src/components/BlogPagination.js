import React, { useContext, useEffect } from 'react';
import { Div, Button } from "atomize";
import { BlogContext } from '../context/blogContext';


const BlogPagination = () => {
  const { currentPage, lastPage, handlePrevPage, handleNextPage } = useContext(BlogContext)



  return (
    <Div d='flex' justify='center' align='center' m={{ y: '1rem' }}>
      <Button
        className={
          currentPage === 1
            ? 'button button--pagination button--disabled'
            : 'button button--pagination'
        }
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        m={{ r: '1rem' }}
      >
        Back
          </Button>
      <Button
        className={
          lastPage === true
            ? 'button button--pagination button--disabled'
            : 'button button--pagination'
        }
        onClick={handleNextPage}
        disabled={lastPage === true}
      >
        Next
          </Button>
    </Div>
  );

}



export default BlogPagination;
