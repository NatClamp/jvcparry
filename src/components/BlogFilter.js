import React, { useState, useContext } from 'react';
import {
  Div, Dropdown, Anchor, Text,
} from 'atomize';
import { BlogContext } from '../context/blogContext';

const BlogFilter = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { allCategories, getAllPosts, setFilter } = useContext(BlogContext);

  const filterBlogPosts = (categoryId, filterName) => {
    setFilter(categoryId, filterName);
    getAllPosts(1, categoryId);
  };

  const menuList = (
    <Div>
      <ul style={{ listStyle: 'none', paddingLeft: '1.5rem' }}>
        {allCategories.map((category, index) => (
          <li key={index}>
            <Anchor d="block" p={{ y: '0.25rem' }}>
              <Text textColor="black600" hoverTextColor="black200" onClick={() => filterBlogPosts(category.id, category.name)}>{category.name}</Text>
            </Anchor>
          </li>
        ))}
      </ul>
    </Div>
  );

  return (
    <Dropdown
      isOpen={showDropdown}
      onClick={() => setShowDropdown(!showDropdown)}
      menu={menuList}
      w="20rem"
    >
      Filter posts
    </Dropdown>
  );
};
export default BlogFilter;
