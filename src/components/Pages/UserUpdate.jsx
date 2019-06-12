import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import { Page, Input, Button } from 'react-onsenui';

import MyToolbar from '../MyToolbar';

class UserUpdate extends React.Component {
  constructor(props) {
    super();
    this.state = {
      displayName: props.displayName,
      photoUrl: props.photoUrl,
    }
  }
  // ユーザー情報編集URLを設定
  componentDidMount() {
    this.props.actions.pagePush(`/user/edit`);
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
        <section style={{ textAlign: 'center' }}>
          <p>
            <Input
              value={this.state.displayName}
              onChange={e => this.setState({ ...this.state, displayName: e.target.value })}
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
    const user = {
      displayName: this.state.displayName,
      photoUrl: this.state.photoUrl,
    }
    this.props.actions.updateProfile(user);
    // var user = firebase.auth().currentUser;
    // user.updateProfile({
    //   displayName: this.newName,
    // }).then(() => {
    //   this.props.navigator.popPage();
    //   this.props.actions.updateDisplayName(this.newName);
    // }).catch(() => {
    //   ons.notification.toast('失敗しました', {
    //     timeout: 2000,
    //   });
    // });
  }

  renderToolbar() {
    return React.createElement(MyToolbar, { navigator: this.props.navigator });
  }
}


const mapStateToProps = (state) => {
  return {
    displayName: state.auth.displayName,
    photoUrl: state.auth.photoUrl,
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
)(UserUpdate);