import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import { Page } from 'react-onsenui';
import MyToolbar from '../MyToolbar';

class Auth extends Component {
  componentDidMount() {
    this.props.actions.refLogin();
  }

  renderToolbar(title) {
    return React.createElement(MyToolbar);
  }

  render() {
    const { title, actions } = this.props;
    return (
      <Page
        renderToolbar={this.renderToolbar.bind(this, title)}
      >
        <button onClick={() => actions.login()}>Login</button>
      </Page>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.isAuth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auth);