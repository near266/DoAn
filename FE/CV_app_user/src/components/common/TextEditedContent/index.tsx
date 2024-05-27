import PropTypes from 'prop-types';
import 'quill/dist/quill.snow.css';

import { Content } from './styles';

const TextEditedContent = ({ content, ...rest }) => (
  <div className="ql-snow">
    <Content
      className="ql-editor"
      dangerouslySetInnerHTML={{ __html: content }}
      {...rest}
    />
  </div>
);

TextEditedContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default TextEditedContent;
