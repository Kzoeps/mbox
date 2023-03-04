import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import React from "react";

interface DropDownProps {
  options: { value: string; label: string }[];
  activeValue: string;
}

export default function DropDown(props: DropDownProps) {
  const { options, activeValue } = props;
  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {activeValue}
        </MenuButton>
        <MenuList>
          {options.map(({ value, label }) => (
            <MenuItem value={value} key={value}>
              {label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
}
