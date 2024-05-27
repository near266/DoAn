import { ClickAwayListener, Popper } from '@mui/material';
import { useState } from 'react';

const CustomDropdown = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <>
      <div className="tw-h-full" onClick={handleClick}>
        {props.children}
      </div>
      {open && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Popper
            disablePortal
            className="tw-z-20 tw-right-0"
            open={open}
            placement="bottom"
            anchorEl={anchorEl}
          >
            {props.dropdownMenu}
          </Popper>
        </ClickAwayListener>
      )}
    </>
  );
};

export default CustomDropdown;
