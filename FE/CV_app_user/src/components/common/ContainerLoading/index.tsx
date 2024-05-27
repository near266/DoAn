import PropTypes from 'prop-types';

import Loading from './Loading';

const ContainerLoading = (props) => {
  return props.loading ? (
    <Loading width={props.loadingWidth} size={props.loadingSize} />
  ) : (
    props.children
  );
};

ContainerLoading.propTypes = {
  loading: PropTypes.bool,
  loadingWidth: PropTypes.number,
  loadingSize: PropTypes.string,
  children: PropTypes.any,
};

export default ContainerLoading;
