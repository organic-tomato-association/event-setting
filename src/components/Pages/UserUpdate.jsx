import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Actions from '../../actions';
import { Page, Input, Button } from 'react-onsenui';

import MyToolbar from '../MyToolbar';
import ImageUploader from '../assets/ImageUploader/ImageUploader';

class UserUpdate extends React.Component {
  constructor(props) {
    super();
    this.state = {
      displayName: props.displayName,
      photoURL: props.photoURL,
      newPhoto: null,
      isLoading: false,
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
            display: 'inline-block',
            marginBlockStart: '1em',
            marginBlockEnd: '1em',
            marginInlineStart: '0px',
            marginInlineEnd: '0px',
            width: '20vmax',
            height: '20vmax',
          }}>
            <ImageUploader
              photoURL={this.state.photoURL}
              alt="profile"
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
            <Button onClick={this.updateProfile.bind(this)}>更新</Button>
          </p>
        </section>
      </Page >
    );
  }

  updateProfile() {
    const user = {
      displayName: this.state.displayName,
      photoURL: this.state.photoURL,
    };
    this.props.actions.updateProfile(user, this.state.newPhoto);
  }

  renderToolbar() {
    return React.createElement(MyToolbar, { navigator: this.props.navigator });
  }
}


const mapStateToProps = (state) => {
  return {
    displayName: state.auth.displayName,
    photoURL: state.auth.photoURL,
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
)(UserUpdate);
