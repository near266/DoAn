import PropTypes from 'prop-types';

const RenderWithCondition = (props) => {
  return props.show ? props.children : <div />;
};

RenderWithCondition.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.any,
};

export default RenderWithCondition;
