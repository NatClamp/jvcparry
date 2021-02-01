import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/shopContext';
import { Dropdown, Text, Div, Anchor } from "atomize";

const VariantDropdown = (props) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const { setVariantIndex } = useContext(ShopContext)

    const selectVariantAndCloseDropdown = (index) => {
        setVariantIndex(index)
        setShowDropdown(!showDropdown);
    }

    const menuList = (
        <Div>
            <ul style={{ listStyle: 'none', paddingLeft: '1.5rem' }}>
                {["PDF", "Print+PDF"].map((name, index) => (
                    <li key={index}>
                        <Anchor d="block" p={{ y: "0.25rem" }} >
                            <Text d="block" p={{ y: "0.25rem" }} onClick={() => selectVariantAndCloseDropdown(index)}>{name}</Text>
                        </Anchor>
                    </li>
                ))}
            </ul>
        </Div>
    );

    return (
        <Dropdown
            w="10rem"
            isOpen={showDropdown}
            onClick={() =>
            setShowDropdown(!showDropdown)
          }
          menu={menuList}
        >
            {props.title.toUpperCase()}
        </Dropdown>
      );
}

export default VariantDropdown;