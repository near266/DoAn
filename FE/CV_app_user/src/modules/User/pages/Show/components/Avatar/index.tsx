import { BaseSyntheticEvent, useRef, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';

import { setUserFieldValue } from '@/store';
import { userService } from '../../../../shared';
import UserContext from '../../contexts/userContext';
import styles from './styles.module.scss';
import axios from 'axios';
import { UserInfo } from '../../../Setting/tabs';
import { registerInstance } from '@/shared';

const Avatar = ({ avatarUrl, userName }) => {
  const dispatch = useDispatch();
  const { showForCurrentUser } = useContext(UserContext);
  const fileRef = useRef<any>();

  const [processing, setProcessing] = useState<boolean>(false);
  const [internalAvatar, setInternalAvatar] = useState<string>('');
  const { loading, data, succeeded } = useSelector((state: any) => state.login);

  useEffect(() => {
    setInternalAvatar(avatarUrl);
  }, [avatarUrl]);

  const showFileChooser = () => {
    if (processing || !showForCurrentUser) {
      return;
    }

    fileRef.current.click();
  };

  const handleFileChange = (e: BaseSyntheticEvent) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setProcessing(true);

      // create form data
      const formData = new FormData();
      formData.append('file', files['0']);

      userService
        .changeAvatar(formData)
        .then((res) => {
          console.log(res);
          const codeDown = axios.get(res.getInfoUri).then((url) => {
            const totl = res.stringConnect + url.data.downloadTokens;
            console.log(totl);
            setInternalAvatar(totl);
            const user = registerInstance.getuserInfo(data.id).then((userDetail) => {
              console.log(userDetail);
              const UserInfo = {
                id: userDetail.id,
                avatar: totl,
              };
              const payload = {
                UserInfo,
              };
              const update = axios.put(
                `http://localhost:8080/api/UserInfo/UserInfo/Update`,
                payload
              );
              console.log(update);
            });
            dispatch(setUserFieldValue({ key: 'avatar', value: totl }));
          });

          // if (res) {
          //   setInternalAvatar(res.payload.url);
          //   dispatch(setUserFieldValue({ key: 'avatar', value: res.payload.url }));
          // }
        })
        .finally(() => setProcessing(false));
    }
  };

  return (
    <div
      className={showForCurrentUser ? styles.avatarWrapper : styles.avatarNoUploadWrapper}
      onClick={showFileChooser}
    >
      <img src={internalAvatar} alt={userName} />
      {processing && (
        <div
          className={cx(
            styles.processingWrapper,
            'd-flex align-items-center justify-content-center'
          )}
        >
          <CircularProgress size={26} color="secondary" />
        </div>
      )}
      <input
        className={styles.fileUpload}
        onChange={(e) => handleFileChange(e)}
        name="image"
        type="file"
        ref={fileRef}
      />
    </div>
  );
};

Avatar.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default Avatar;
