import React, { useState, useContext } from 'react';
import { Div, Dropdown, Anchor } from "atomize";
import { BlogContext } from '../context/blogContext';


const BlogFilter = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const { allCategories } = useContext(BlogContext)

  const menuList = (
    <Div>
      <ul>
        {allCategories.map((name, index) => (
          <Anchor d="block" p={{ y: "0.25rem" }} key={index}>
            {name}
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
      Filter blogposts
      </Dropdown>
  );
}
export default BlogFilter;