import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import { Page } from 'react-onsenui';

import MyToolbar from '../MyToolbar';

class NotFound extends React.Component {
  // NotFoundのURLを設定
  componentDidMount() {
    this.props.actions.pagePush(`/NotFound`);
  }

  // 前のURLに戻す
  componentWillUnmount() {
    this.props.actions.pagePop();
  }

  render() {
    return (
      <Page
        renderToolbar={this.renderToolbar.bind(this)}
      >
        <h3>Not Found</h3>
      </Page>
    );
  }

  renderToolbar() {
    return React.createElement(MyToolbar, { navigator: this.props.navigator });
  }
}

const mapStateToProps = (state) => {
  return {
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
)(NotFound);