import { FC, useContext, useRef } from 'react';
import ContentEditable from 'react-contenteditable';
import cx from 'classnames';

import AppContext from '../../context/AppContext';
import { HANDLE_INPUT_CHANGE } from '../../hooks/useProfileData';
import styles from './styles.module.scss';

interface IProps {
  name: string;
  value?: string;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  customStyles?: any;
}

const CvoInput: FC<IProps> = (props) => {
  const inputValue = props.value || '';
  const classNameInput = props.className || '';
  const { dispatchProfileData } = useContext(AppContext);
  const contentEditable = useRef();

  const onPasteContent = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const pastedText = (e.originalEvent || e).clipboardData.getData('text/plain');
    window.document.execCommand('insertText', false, pastedText);
    return false;
  };

  return props.multiline ? (
    <ContentEditable
      tagName="div"
      className={cx(styles.cvInput, styles.cvInputMultiline, classNameInput)}
      spellCheck="false"
      innerRef={contentEditable}
      html={inputValue}
      aria-placeholder={props.placeholder}
      onChange={(e) =>
        dispatchProfileData({
          type: HANDLE_INPUT_CHANGE,
          inputType: 'textarea',
          name: props.name,
          evt: { ...e },
        })
      }
      onPaste={(e) => onPasteContent(e)}
      style={props.customStyles}
    />
  ) : (
    <ContentEditable
      tagName="div"
      className={cx(styles.cvInput, classNameInput)}
      spellCheck="false"
      innerRef={contentEditable}
      html={inputValue}
      aria-placeholder={props.placeholder}
      onChange={(e) =>
        dispatchProfileData({
          type: HANDLE_INPUT_CHANGE,
          inputType: 'text',
          name: props.name,
          evt: { ...e },
        })
      }
      style={props.customStyles}
    />
  );
};

export default CvoInput;
