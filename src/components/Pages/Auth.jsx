import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import * as Actions from '../../actions';
import { Page } from 'react-onsenui';
import MyToolbar from '../MyToolbar';

class Auth extends Component {
  componentDidMount() {
    this.props.refLogin()
  }

  renderToolbar(title) {
    return React.createElement(MyToolbar);
  }

  render() {
    const { title } = this.props;
    return (
      <Page
        renderToolbar={this.renderToolbar.bind(this, title)}
      >
        <button onClick={this.props.doGithubLogin}>Login</button>
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
    doGithubLogin: () => {
      let provider = new firebase.auth.GithubAuthProvider();
      firebase.auth().signInWithPopup(provider)
    },
    refLogin: () => {
      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          return
        }
        console.log(user);
        dispatch(Actions.loginOk(user));
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auth);