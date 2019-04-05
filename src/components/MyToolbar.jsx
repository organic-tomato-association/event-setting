import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import { Toolbar, Icon } from 'react-onsenui';

class MyToolbar extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <Toolbar>
        <div className="center">
          {title}
        </div>
      </Toolbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    title: state.ui.title,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyToolbar);