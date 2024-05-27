import { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import EmojiPicker from './EmojiPicker';
import CommentsByPost from './CommentsByPost';
import { appLibrary, Common } from '@/shared';
import { httpClient } from '@/core';
import styles from './styles.module.scss';

interface State {
  commentInput: string;
  comments: any[];
  pageComnents: number;
  isMore: boolean;
  showAction: boolean;
  sending: boolean;
}

class Comment extends Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      commentInput: '',
      comments: [],
      pageComnents: 1,
      isMore: false,
      showAction: true,
      sending: false,
    };
  }

  componentDidMount() {
    this.getComments(this.props.postId, 1);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.postId !== this.props.postId) {
      this.getComments(nextProps.postId, 1);
    }
  }

  async getComments(postId, page) {
    const response = await httpClient.get(`posts/${postId}/comments`, {
      params: {
        relationFields: 'creator:id,name,username,avatar,identity_verified',
        page: page,
      },
    });

    if (response.data.code === 'SUCCESS') {
      this.setState({
        comments: response.data.payload,
        isMore: response.data.is_more,
      });
    }
  }

  showMore = async () => {
    appLibrary.showloading();
    const page = this.state.pageComnents + 1;
    const response = await httpClient.get(`posts/${this.props.postId}/comments`, {
      params: {
        relationFields: 'creator:id,name,username,avatar,identity_verified',
        page: page,
      },
    });
    const res = response.data;
    if (res?.code === 'SUCCESS') {
      appLibrary.hideloading();
      const tranform = [...this.state.comments, ...res.payload];
      this.setState({
        comments: tranform,
        isMore: res.is_more,
        pageComnents: page,
      });
    }
  };

  resizeHeight = () => {
    const commentBox = document.getElementById('comment-input-feild');
    commentBox.style.height = 'auto';
    commentBox.style.height = `${commentBox.scrollHeight}px`;
  };

  addEmoji = (evt) => {
    const emoji = evt.colons;

    const txtarea: any = document.getElementById('comment-input-feild');
    if (!txtarea) {
      return;
    }

    const scrollPos = txtarea.scrollTop;
    let strPos = 0;
    const br =
      // eslint-disable-next-line eqeqeq
      txtarea.selectionStart || txtarea.selectionStart == '0'
        ? 'ff'
        : document.getSelection()
        ? 'ie'
        : false;
    // eslint-disable-next-line eqeqeq
    if (br == 'ie') {
      // eslint-disable-next-line eqeqeq
    } else if (br == 'ff') {
      strPos = txtarea.selectionStart;
    }

    const front = txtarea.value.substring(0, strPos);
    const back = txtarea.value.substring(strPos, txtarea.value.length);
    txtarea.value = front + emoji + back;
    strPos = strPos + emoji.length;
    // eslint-disable-next-line eqeqeq
    if (br == 'ie') {
      // eslint-disable-next-line eqeqeq
    } else if (br == 'ff') {
      txtarea.selectionStart = strPos;
      txtarea.selectionEnd = strPos;
      // txtarea.focus();
    }

    txtarea.scrollTop = scrollPos;
    this.setState({
      commentInput: txtarea.value,
    });
  };

  handleFormChange = (evt) => {
    this.setState({ commentInput: evt.target.value });
  };

  visibleAction = () => {
    if (!this.state.showAction) {
      this.setState({ showAction: true });
    }
  };

  hideAction = () => {
    if (this.state.showAction) {
      this.setState({ showAction: false });
    }
  };

  // comment action

  deleteComment = async (commentId, index) => {
    const check = confirm('Bạn muốn xóa bình luận?');
    if (check) {
      const response = await httpClient.delete(`posts/0/comments/${commentId}`);
      if (response.data.code === 'SUCCESS') {
        const tranform = JSON.parse(JSON.stringify(this.state.comments));
        tranform.splice(index, 1);
        this.setState({
          comments: tranform,
        });
      }
    }
  };

  submit = async () => {
    if (this.props.auth.isAuthenticated) {
      this.setState({ sending: true });

      const response = await httpClient
        .post(`posts/${this.props.postId}/comments`, {
          content: this.state.commentInput,
        })
        .finally(() => {
          this.setState({ sending: false });
        });

      if (response.data.code === 'SUCCESS') {
        const commentsClone = [...this.state.comments];
        commentsClone.unshift(response.data.payload);

        this.setState({
          comments: commentsClone,
          commentInput: '',
        });
      }
    } else {
      Common.redirectToAuthenticate();
    }
  };

  render() {
    return (
      <div>
        <p className={styles.title}>Bình luận</p>
        <div className={styles.typeBox}>
          <div className={styles.typeBox__content}>
            <textarea
              className="form-control"
              id="comment-input-feild"
              value={this.state.commentInput}
              onChange={this.handleFormChange}
              onInput={this.resizeHeight}
              onClick={this.visibleAction}
              placeholder="Nhập bình luận của bạn"
              name="comment"
              cols={30}
              spellCheck="false"
            ></textarea>
            <div className={styles.typeBox__emojiPicker}>
              <EmojiPicker onAddEmoji={this.addEmoji} />
            </div>
          </div>
          {this.state.showAction && (
            <div className={styles.action}>
              <div></div>
              <div>
                <button
                  type="button"
                  className={cx(
                    'btn',
                    styles.action__commentBtn,
                    styles.action__cancelComment
                  )}
                  onClick={this.hideAction}
                >
                  Ẩn
                </button>
                <button
                  type="button"
                  className={cx('btn btn-common', styles.action__commentBtn)}
                  onClick={this.submit}
                  disabled={!this.state.commentInput || this.state.sending}
                >
                  Đăng
                </button>
              </div>
            </div>
          )}
        </div>
        <div className={styles.commentList}>
          <CommentsByPost
            auth={this.props.auth}
            comments={this.state.comments}
            onDeleteComment={this.deleteComment}
          />
        </div>
        {this.state.isMore && (
          <div className={styles.showMore} onClick={this.showMore}>
            Xem thêm bình luận
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Comment);
