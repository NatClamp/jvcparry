/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-indent */
import React, { useState, useContext } from 'react';
import { Input, Icon } from 'atomize';
import { BlogContext } from '../context/blogContext';

const BlogSearchBar = () => {
  const { setSearch } = useContext(BlogContext);
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    e.persist();
    setSearchValue(e.target.value);
  };

  const submitChange = (e) => {
    e.preventDefault();
    setSearch(searchValue);
  };

  return (
    <form onSubmit={submitChange} w="100%">
      <Input
        placeholder="Search"
        value={searchValue}
        onChange={handleChange}
        suffix={(
          <Icon
            name="Search"
            size="20px"
            cursor="pointer"
            onClick={() => setSearch(searchValue)}
            pos="absolute"
            top="50%"
            right="1rem"
            transform="translateY(-50%)"
            type="button"
          />
        )}
      />
    </form>
  );
};

export default BlogSearchBar;
