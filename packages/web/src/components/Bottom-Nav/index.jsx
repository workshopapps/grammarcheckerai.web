import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import {
  BsDownload,
  BsCashCoin,
  BsClock,
  BsFillPersonLinesFill,
  BsThreeDotsVertical,
  BsArrowBarRight,
} from 'react-icons/bs';
import { AiFillWechat } from 'react-icons/ai';
import { Paper } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiGlobeEuropeAfrica } from 'react-icons/hi2';
import PropTypes from 'prop-types';

export default function SimpleBottomNavigation({ handleOpen }) {
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const routes = ['/me/home', '/me/history', '/me/import', '/me/subscription'];

  return (
    <div className="block md:hidden">
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '10px 0' }} elevation={3}>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClose}>
            <NavLink className="flex items-center gap-2" to="/">
              <HiGlobeEuropeAfrica />
              Go home
            </NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <NavLink className="flex items-center gap-2" to="/me/profile">
              <BsFillPersonLinesFill />
              Profile
            </NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <NavLink className="flex items-center gap-2" to="/me/settings">
              <IoSettingsOutline /> Settings
            </NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <NavLink className="flex items-center gap-2" to="/me/settings">
              <AiFillWechat /> Quiz
            </NavLink>
          </MenuItem>
          <MenuItem
            className="flex items-center gap-2"
            onClick={() => {
              handleOpen();
              handleClose();
            }}
          >
            <BsArrowBarRight />
            Logout
          </MenuItem>
        </Menu>
        <BottomNavigation
          showLabels
          value={value}
          sx={{ height: '40px' }}
          onChange={(event, newValue) => {
            setValue(newValue);
            navigate(routes[newValue]);
            console.log(newValue);
          }}
        >
          <BottomNavigationAction label="Home" icon={<IoHomeOutline />} />
          <BottomNavigationAction label="History" icon={<BsClock />} />
          <BottomNavigationAction label="Import" icon={<BsDownload />} />
          <BottomNavigationAction label="Billing" icon={<BsCashCoin />} />
          <BottomNavigationAction
            id="fade-button"
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            icon={<BsThreeDotsVertical />}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
}

SimpleBottomNavigation.propTypes = {
  handleOpen: PropTypes.func,
};
