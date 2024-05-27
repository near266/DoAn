import { ClickAwayListener, Popper } from '@mui/material';
import { Component } from 'react';
import { connect } from 'react-redux';

import { httpClient } from '@/core';
import { formatServerDateToDurationString } from '@/helpers/date-helper';

interface State {
  notifications: any[];
  isMore: boolean;
  page: number;
  loaded: boolean;
  anchorEl: any;
}

export class NotificationButton extends Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      isMore: false,
      page: 1,
      loaded: false,
      anchorEl: null,
    };
  }

  componentDidMount() {
    // const currentUser = this.props.user;

    // TODO: add realtime notify
    // if (
    //   typeof io !== 'undefined' &&
    //   currentUser.id &&
    //   !process.env.NEXT_PUBLIC_NO_SUBSCRIBE_NOTIFICATION_EVENT
    // ) {
    //   window.Echo.private(`User.Notifications.${currentUser.id}`).listen(
    //     'BoardNotification',
    //     (notification) => {
    //       this.updateNotifications(notification);
    //     }
    //   );
    // }

    this.getData(this.state.page);
  }

  handleClick = (e) => {
    this.setState({
      anchorEl: this.state.anchorEl ? null : e.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  clickAwayHandler = () => {
    this.setState({
      anchorEl: null,
    });
  };

  updateNotifications(msg) {
    if (this.state.loaded) {
      const tranform = JSON.parse(JSON.stringify(this.state.notifications));
      tranform.forEach((item, index, arr) => {
        if (item.id === msg.id) {
          arr.splice(index, 1);
        }
      });

      tranform.unshift(msg);
      this.setState({
        notifications: tranform,
      });
    }
  }

  getData(page) {
    return httpClient.get(`notifications?page=${page}`).then((response) => {
      const res = response.data;
      this.setState({
        notifications: res.payload,
        isMore: res.is_more,
        loaded: true,
      });
    });
  }

  itemClick = (item) => () => {
    if (!item.read_at) {
      httpClient.put(`notifications/${item.id}/mark-as-read`).then((response) => {});
    }
  };

  showMore = () => {
    const page = this.state.page;
    httpClient.get(`notifications?page=${this.state.page + 1}`).then((response) => {
      const res = response.data;
      if (res?.code === 'SUCCESS') {
        const tranform = [...this.state.notifications, ...res.payload];
        this.setState({
          notifications: tranform,
          isMore: res.is_more,
          page: page + 1,
        });
      }
    });
  };

  seenAll = () => {
    httpClient.put('notifications/mark-all-as-read').then((response) => {
      const res = response.data;
      if (res?.code === 'SUCCESS') {
        const tranform = this.state.notifications;
        tranform.forEach((item) => {
          item.read_at = 'ok';
        });
        this.setState({ notifications: tranform });
      }
    });
  };

  render() {
    return (
      <div id="app-notification-button">
        <div className="notification-content">
          <div
            id="notificationDropdown"
            className="menu-styled"
            onClick={this.handleClick}
          >
            <svg width="32" height="32" viewBox="-293 409 25 25">
              {/* eslint-disable-next-line max-len */}
              <path d="M-273.327 423.67l-1.673-1.52v-3.646a5.5 5.5 0 0 0-6.04-5.474c-2.86.273-4.96 2.838-4.96 5.71v3.41l-1.68 1.553c-.204.19-.32.456-.32.734V427a1 1 0 0 0 1 1h3.49a3.079 3.079 0 0 0 3.01 2.45 3.08 3.08 0 0 0 3.01-2.45h3.49a1 1 0 0 0 1-1v-2.59c0-.28-.12-.55-.327-.74zm-7.173 5.63c-.842 0-1.55-.546-1.812-1.3h3.624a1.92 1.92 0 0 1-1.812 1.3zm6.35-2.45h-12.7v-2.347l1.63-1.51c.236-.216.37-.522.37-.843v-3.41c0-2.35 1.72-4.356 3.92-4.565a4.353 4.353 0 0 1 4.78 4.33v3.645c0 .324.137.633.376.85l1.624 1.477v2.373z" />
            </svg>
            {this.state.notifications.filter((x) => !x.read_at).length > 0 && (
              <span className="label label-warning">
                {this.state.notifications.filter((x) => !x.read_at).length}
              </span>
            )}
          </div>

          {Boolean(this.state.anchorEl) && (
            <ClickAwayListener onClickAway={this.clickAwayHandler}>
              <Popper
                open={Boolean(this.state.anchorEl)}
                anchorEl={this.state.anchorEl}
                disablePortal
              >
                <div id="dropdown-notification">
                  {this.state.notifications.length === 0 ? (
                    <div className="no-notification">Không có thông báo</div>
                  ) : (
                    <div>
                      <div className="ui-notification-header">
                        <span className="ui-notification-title">Thông báo</span>
                        <span className="seen-all" onClick={this.seenAll}>
                          Đánh dấu đã xem
                        </span>
                      </div>
                      <div className="ui-notification-overlay">
                        <ul className="ui-notification-expand">
                          {this.state.notifications.map((item, index) => (
                            <li key={index}>
                              <a
                                href={item.data.url}
                                className={
                                  item.read_at
                                    ? 'notification-item'
                                    : 'notification-item active'
                                }
                                onClick={this.itemClick(item)}
                              >
                                <div className="content-left">
                                  <img
                                    className="avatar"
                                    src={item.data.image_url}
                                    alt="avatar"
                                  />
                                </div>
                                <div className="content-right">
                                  <div
                                    className="title"
                                    dangerouslySetInnerHTML={{
                                      __html: item.data.title,
                                    }}
                                  ></div>
                                  <span className="time">
                                    {formatServerDateToDurationString(item.created_at)}
                                  </span>
                                </div>
                              </a>
                            </li>
                          ))}
                        </ul>
                        {this.state.isMore && (
                          <div className="showMore" onClick={this.showMore}>
                            Xem thêm
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Popper>
            </ClickAwayListener>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    me: state.auth.me,
  };
};

export default connect(mapStateToProps)(NotificationButton);
