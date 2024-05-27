// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Component, useEffect, useState } from 'react';
import Link from 'next/link';
import { Paper } from '@mui/material';
import cx from 'classnames';

import { FollowButton, UserNamed } from '@/components';
import Avatar from '../Avatar';
import { IUserDetail } from '../../../../shared';
import UserContext from '../../contexts/userContext';
import styles from './styles.module.scss';
import axios from 'axios';

import React from 'react';
import SrcImages from '@/assets/image';
import { domainToASCII } from 'url';
import { useDispatch, useSelector } from 'react-redux';

const Infor = () => {
  const { loading, data, succeeded } = useSelector((state: any) => state.login);
  const [isShow, SetShow] = useState(true);
  const [UserDefault, SetUser] = useState({});

  const getUser = async () => {
    const res = await axios.get(
      `http://localhost:8080/api/UserInfo/auth/me?id=${data.id}`
    );
    console.log(res.data);
    SetUser(res.data);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className={'col-lg-4 col-md-5'}>
      <Paper className={styles.infor}>
        <div className={styles.user}>
          <div className={styles.user__setting}>
            <Link href="/account/setting">
              <a>
                <i className="bi bi-gear-fill"></i>
              </a>
            </Link>
          </div>

          <div className={styles.user__avatar}>
            <Avatar avatarUrl={UserDefault.avatar} userName={data.userName} />
          </div>
          <p className={styles.user__name}>
            <UserNamed user={data.userName} iconSize={14} />
          </p>
          <p className={styles.user__username}>@{data.userName}</p>
          <FollowButton isFollowed={isShow} followType="user" followId={data.id} />
        </div>

        <div className={styles.doughnut}>
          <div className={styles.doughnut__followStat}>
            <p className={styles.doughnut__value}>2</p>
            <span className={styles.doughnut__title}>Followers</span>
          </div>
          <div className={styles.doughnut__postStat}>
            <p className={styles.doughnut__value}>4</p>
            <span className={styles.doughnut__title}>Posts</span>
          </div>
          <div className={styles.doughnut__pointStat}>
            <p className={styles.doughnut__value}>12</p>
            <span className={styles.doughnut__title}>Points</span>
          </div>
        </div>
        <hr />
        <div className={styles.moreInfor}>
          <Link href="/account/setting">
            <a>
              <div className={styles.moreInfor__add}>
                <span>
                  <i className="fas fa-plus"></i> Thêm thông tin
                </span>
              </div>
            </a>
          </Link>

          <p className={cx(styles.moreInfor__detail, styles.moreInfor__cm)}>
            {data.information}
          </p>

          <p className={styles.moreInfor__cm}>
            <i className={cx(styles.moreInfor__addressIcon, 'bi bi-geo-alt')} />
            Đang sống tại{' '}
            <span className={styles.moreInfor__address}>{UserDefault.city_id},</span>
            <span className={styles.moreInfor__address}>{UserDefault.district_id}</span>
          </p>
        </div>
      </Paper>
    </div>
  );
};

export default Infor;
// interface IProps {
//   user: any;
// }

// export class Infor extends Component<IProps, any> {
//   static contextType = UserContext;

//   showAddInfor() {
//     const { loading, data, succeeded } = useSelector((state: any) => state.login);
//     const [isShow, setIsSHow] = useState(true);
//     const getUser = async () => {
//       const userDetail = await axios.get(
//         `http://localhost:8080/api/UserInfo/auth/me?id=${data.id}`
//       );
//       return userDetail;
//     };
//     useEffect(() => {
//       getUser();
//     }, []);
//     const { showForCurrentUser } = true;
//     const { address, information } = this.props.user;
//     console.log(this.user);
//     if (showForCurrentUser) {
//       if (!information || !address) {
//         return true;
//       }
//     }
//     return false;
//   }

//   render() {
//     return (
//       <div className={'col-lg-4 col-md-5'}>
//         {true && (
//           <Paper className={styles.infor}>
//             <div className={styles.user}>
//               {this.context.showForCurrentUser && (
//                 <div className={styles.user__setting}>
//                   <Link href="/account/setting">
//                     <a>
//                       <i className="bi bi-gear-fill"></i>
//                     </a>
//                   </Link>
//                 </div>
//               )}
//               <div className={styles.user__avatar}>
//                 <Avatar
//                   avatarUrl={this.props.user.avatar}
//                   userName={this.props.user.name}
//                 />
//               </div>
//               <p className={styles.user__name}>
//                 <UserNamed user={this.props.user} iconSize={14} />
//               </p>
//               <p className={styles.user__username}>@{this.props.user.username}</p>
//               {this.context.showForAnotherUser && (
//                 <FollowButton
//                   isFollowed={this.props.user.isFollowed}
//                   followType="user"
//                   followId={this.props.user.id}
//                 />
//               )}
//             </div>
//             <div className={styles.doughnut}>
//               <div className={styles.doughnut__followStat}>
//                 <p className={styles.doughnut__value}>
//                   {this.props.user.following_users_count}
//                 </p>
//                 <span className={styles.doughnut__title}>Followers</span>
//               </div>
//               <div className={styles.doughnut__postStat}>
//                 <p className={styles.doughnut__value}>{this.props.user.posts_count}</p>
//                 <span className={styles.doughnut__title}>Posts</span>
//               </div>
//               <div className={styles.doughnut__pointStat}>
//                 <p className={styles.doughnut__value}>{this.props.user.p}</p>
//                 <span className={styles.doughnut__title}>Points</span>
//               </div>
//             </div>
//             <hr />
//             <div className={styles.moreInfor}>
//               {this.showAddInfor() && (
//                 <Link href="/account/setting">
//                   <a>
//                     <div className={styles.moreInfor__add}>
//                       <span>
//                         <i className="fas fa-plus"></i> Thêm thông tin
//                       </span>
//                     </div>
//                   </a>
//                 </Link>
//               )}

//               {this.props.user.information && (
//                 <p className={cx(styles.moreInfor__detail, styles.moreInfor__cm)}>
//                   {this.props.user.information}
//                 </p>
//               )}

//               {this.props.user.address && (
//                 <p className={styles.moreInfor__cm}>
//                   <i className={cx(styles.moreInfor__addressIcon, 'bi bi-geo-alt')} />
//                   Đang sống tại{' '}
//                   <span className={styles.moreInfor__address}>
//                     {this.props.user.address}
//                   </span>
//                 </p>
//               )}
//             </div>
//           </Paper>
//         )}
//       </div>
//     );
//   }
// }

// Infor.contextType = UserContext;

// export default Infor;
