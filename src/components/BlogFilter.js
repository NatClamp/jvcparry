import React, { useState, useContext } from 'react';
import { Div, Dropdown, Anchor, Text } from "atomize";
import { BlogContext } from '../context/blogContext';


const BlogFilter = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const { allCategories, getAllPosts, setFilter } = useContext(BlogContext)

  const filterBlogPosts = (categoryId, filterName) => {
    setFilter(categoryId, filterName)
    getAllPosts(1, categoryId);
  }

  const menuList = (
    <Div>
      <ul>
        {allCategories.map((category, index) => (
          <Anchor d="block" p={{ y: "0.25rem" }} key={index}>
            <Text onClick={() => filterBlogPosts(category.id, category.name)}>{category.name}</Text>
          </Anchor>
        ))}
      </ul>
    </Div>
  );

  return (
    <Dropdown
      isOpen={showDropdown}
      onClick={() =>
        setShowDropdown(!showDropdown)
      }
      menu={menuList}
    >
      Filter posts
      </Dropdown>
  );
}
export default BlogFilter;