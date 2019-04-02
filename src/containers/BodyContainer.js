import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as Actions from '../actions';

import Body from '../components/Body';

const mapStateToProps = (state) => {
  return {
    tab: state.ui.tab,
    onChange: Actions.tabChange,
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
)(Body));