import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as Actions from '../actions';

import Header from '../components/Header';

const mapStateToProps = (state) => {
  return {
    title: state.ui.title
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header));