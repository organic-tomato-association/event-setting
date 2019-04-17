import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import { Page, List, ListItem } from 'react-onsenui';
import UserUpdate from './Pages/UserUpdate';

class SplitterView extends React.Component {
  pushPage() {
    this.props.actions.closeSplitter();
    const pages = this.props.navigator.pages;
    if (pages[pages.length - 1].key !== 'userUpdate') {
      this.props.navigator.pushPage({
        component: UserUpdate,
        props: {
          key: 'userUpdate',
          title: 'User',
          navigator: this.props.navigator,
        },
      });
    }
  }

  render() {
    const { displayName } = this.props;
    return (
      <Page>
        <div style={{ height: '220px', border: 'solid black 1px' }}>
          <img src='https://github.com/doRA9876.png' alt="UserProfileImg" height="220px"/>
        </div>
        <div>{displayName}</div>
        <List>
          <ListItem key={UserUpdate.name} onClick={this.pushPage.bind(this)}>ユーザー情報更新</ListItem>
        </List>
      </Page >
    );
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
)(SplitterView);