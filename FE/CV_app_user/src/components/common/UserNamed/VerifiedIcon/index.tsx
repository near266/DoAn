import { Icon } from './styled';
import { Tooltip, NoSsr } from '@mui/material';

const VerifiedIcon = (props) => {
  return (
    <NoSsr>
      <Tooltip title="Tài khoản đã được xác minh" placement="top" arrow>
        <Icon
          className="fas fa-check-circle"
          size={props.size || 14}
          aria-label="Tài khoản đã xác minh"
        />
      </Tooltip>
    </NoSsr>
  );
};

export default VerifiedIcon;
