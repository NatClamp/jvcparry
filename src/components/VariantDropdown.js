/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import {
  Dropdown, Text, Div, Anchor,
} from 'atomize';
import { ShopContext } from '../context/shopContext';

const VariantDropdown = (props) => {
  const { title, variantTitles } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  const { setVariantIndex } = useContext(ShopContext);

  const selectVariantAndCloseDropdown = (index) => {
    setVariantIndex(index);
    setShowDropdown(!showDropdown);
  };

  const menuList = (
    <Div>
      <ul style={{ listStyle: 'none', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
        {variantTitles.map((name, index) => (
          <li key={index}>
            <Anchor d="block" p={{ y: '0.25rem' }}>
              <Text d="block" p={{ y: '0.25rem' }} onClick={() => selectVariantAndCloseDropdown(index)}>{name.toUpperCase()}</Text>
            </Anchor>
          </li>
        ))}
      </ul>
    </Div>
  );

  const UpperTitle = title.toUpperCase();
  return (
    <Dropdown
      w="10rem"
      isOpen={showDropdown}
      onClick={() => setShowDropdown(!showDropdown)}
      menu={menuList}
    >
      {UpperTitle}
    </Dropdown>
  );
};

export default VariantDropdown;
