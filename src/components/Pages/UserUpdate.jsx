import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import { Page, Input, Button } from 'react-onsenui';

import MyToolbar from '../MyToolbar';
import ImageUploader from '../assets/ImageUploader';

class UserUpdate extends React.Component {
  constructor(props) {
    super();
    this.state = {
      displayName: props.displayName,
      photoUrl: props.photoUrl,
      newPhoto: null,
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

  updateNewPhoto(newPhoto) {
    this.setState({ newPhoto });
  }

  render() {
    return (
      <Page
        renderToolbar={this.renderToolbar.bind(this)}
      >
        <section style={{ textAlign: 'center' }}>
          <div style={{
            marginBlockStart: '1em',
            marginBlockEnd: '1em',
            marginInlineStart: '0px',
            marginInlineEnd: '0px',
          }}>
            <ImageUploader
              photoUrl={this.state.photoUrl}
              updatePhoto={(data) => this.updateNewPhoto(data)}
              width={400}
              height={400} />
          </div>
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
