import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import { Page, Button, Icon } from 'react-onsenui';
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
        <section>
          <h1 style={{ textAlign: 'center' }}>Event Setting</h1>
        </section>
        <section style={{ textAlign: 'center' }}>
          <h3 style={{ textAlign: 'center' }}>今すぐログイン</h3>
          <div style={{ margin: '6px' }}>
            <Button
              modifier="outline"
              onClick={() => actions.loginGithub()}
            >
              <Icon icon="github" /> Github
            </Button>
          </div>
          <div style={{ margin: '6px' }}>
            <Button
              modifier="outline"
              onClick={() => actions.loginGoogle()}
            >
              <Icon icon="google" /> Google
            </Button>
          </div>
        </section>
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