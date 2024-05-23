import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';
import React from 'react'

const UserSettings = () => {
  const createHandleMenuClick = (menuItem) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };
  return (
    <div className=' top-stikey'>
    <Dropdown>
      <MenuButton>
      <span className="material-symbols-outlined">
              settings
            </span>
      </MenuButton>
      <Menu >
        <MenuItem onClick={createHandleMenuClick('Profile')}>change Name</MenuItem>
        <MenuItem onClick={createHandleMenuClick('Language settings')}>
        change Password
        </MenuItem>
        <MenuItem onClick={createHandleMenuClick('Log out')}>Log out</MenuItem>
      </Menu>
    </Dropdown>
    </div>
  )
}

export default UserSettings