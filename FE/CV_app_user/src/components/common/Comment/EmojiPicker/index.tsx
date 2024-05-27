import { useState } from 'react';
import { Picker } from 'emoji-mart';
import { Popover } from '@mui/material';

import { Helper } from '@/helpers';

const EmojiPicker = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <span>
      <button
        className="btn tw-cursor-pointer tw-shadow-none tw-p-0"
        title="Open Emoji picker"
        onClick={handleClick}
      >
        <i className="far fa-smile tw-text-[18px]"></i>
      </button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <Picker
          set="google"
          onSelect={props.onAddEmoji}
          emojiSize={30}
          backgroundImageFn={(set, sheetSize) => Helper.emojiUrl}
          style={{ border: 'none' }}
          showSkinTones={false}
          showPreview={false}
        />
      </Popover>
    </span>
  );
};

export default EmojiPicker;
