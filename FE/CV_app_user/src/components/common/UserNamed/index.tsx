import VerifiedIcon from './VerifiedIcon';
import styles from './styles.module.scss';

const UserNamed = (props) => {
  return (
    <span>
      {props.user.name}
      {props.user.identity_verified && (
        <span className={styles.verifiedUser}>
          <VerifiedIcon size={props.iconSize} />
        </span>
      )}
    </span>
  );
};

export default UserNamed;
