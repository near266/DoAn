import PropTypes from 'prop-types';

const ContainerSkeleton = (props) => {
  return props.loading ? props.ske : props.children;
};

ContainerSkeleton.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.any,
};

export default ContainerSkeleton;
