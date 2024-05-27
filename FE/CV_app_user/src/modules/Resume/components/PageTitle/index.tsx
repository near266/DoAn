// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Component, createRef } from 'react';
import ContentEditable from 'react-contenteditable';

import AppContext from '../../context/AppContext';
import { HANDLE_INPUT_CHANGE } from '../../hooks/useProfileData';
import styles from './styles.module.scss';

class PageTitle extends Component {
  static contextType = AppContext;

  contentEditable: any = createRef();

  render() {
    const { profileData, dispatchProfileData } = this.context;
    return (
      <ContentEditable
        tagName="div"
        className={styles.cvTitle}
        spellCheck="false"
        innerRef={this.contentEditable}
        html={profileData.title}
        disabled={false}
        onChange={(e) =>
          dispatchProfileData({
            type: HANDLE_INPUT_CHANGE,
            inputType: 'text',
            name: 'title',
            evt: { ...e },
          })
        }
        aria-placeholder="Tiêu đề CV"
      />
    );
  }
}

export default PageTitle;
