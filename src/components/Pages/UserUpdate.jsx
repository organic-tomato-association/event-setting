import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import ons from 'onsenui'
import { Page, Input, Button } from 'react-onsenui';
import firebase from 'firebase';

import MyToolbar from '../MyToolbar';

class Body extends React.Component {
  static newName = '';
  render() {
    const { displayName } = this.props;
    this.newName = displayName;
    console.log(this.props.navigator)
    return (
      <Page
        renderToolbar={this.renderToolbar.bind(this)}
      >
        <section style={{ textAlign: 'center' }}>
          <p>
            <Input
              value={this.newName}
              onChange={(e) => this.newName = e.target.value}
              float
              placeholder='ユーザー名'
            />
          </p>
          <p>
            <Button onClick={this.updateDisplayName.bind(this)}>更新</Button>
          </p>
        </section>
      </Page >
    );
  }

  updateDisplayName() {
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: this.newName,
    }).then(() => {
      this.props.navigator.popPage();
      this.props.actions.updateDisplayName(this.newName);
    }).catch(() => {
      ons.notification.toast('失敗しました', {
        timeout: 2000,
      });
    });
  }

  renderToolbar() {
    return React.createElement(MyToolbar, { navigator: this.props.navigator });
  }
}


const mapStateToProps = (state) => {
  return {
    displayName: state.auth.displayName,
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
)(Body);