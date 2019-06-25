import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Actions from '../../../actions';
import { Page } from 'react-onsenui';

class MyPage extends React.Component {
  render() {
    return (
      <Page>
        <div>
          My Page
        </div>
      </Page>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tab: state.ui.tab,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPage);