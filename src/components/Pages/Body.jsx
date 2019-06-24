import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import { Tabbar, Tab, Page } from 'react-onsenui';
import { Route, Switch } from 'react-router-dom';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import MyToolbar from '../MyToolbar';
import Home from './Tabs/Home';
import MyPage from './Tabs/MyPage';
import EventDetail from './EventDetail';
import NotFound from './NotFound';
import EventCreate from './EventCreate';
import UserUpdate from './UserUpdate';

class Body extends React.Component {
  // ルートディレクトリの場合
  defaultLoad() {
    if (this.props.isFirstLoad) {
      this.props.actions.firstLoad();
    }
  }

  // ルーティングにヒットしなかった場合
  notFound() {
    if (this.props.isFirstLoad) {
      this.props.actions.firstLoad();
      this.props.navigator.pushPage({
        component: NotFound,
        props: {
          key: 'NotFound',
          title: '404 Not Found',
          navigator: this.props.navigator,
        },
      }, { animation: 'none' });
    }
  }

  pushPageUserEdit() {
    if (this.props.isFirstLoad) {
      this.props.actions.firstLoad();
      this.props.navigator.pushPage({
        component: UserUpdate,
        props: {
          key: 'userUpdate',
          title: 'ユーザー設定',
          navigator: this.props.navigator,
        },
      }, { animation: 'none' });
    }
  }

  // イベント詳細の場合
  pushPageEventDetail({ match }) {
    const { events } = this.props;
    // イベントが存在するか
    if (events.find(event => event.id === match.params.key)) {
      // 初回の表示の場合にpushPageする
      if (this.props.isFirstLoad) {
        this.props.actions.firstLoad();
        this.props.navigator.pushPage({
          component: EventDetail,
          props: {
            key: 'eventDetail',
            event: match.params.key,
            title: 'イベント',
            navigator: this.props.navigator,
          },
        }, { animation: 'none' });
      }
    } else {
      this.notFound();
    }
  }

  // イベント作成の場合
  pushPageEventCreate() {
    if (this.props.isFirstLoad) {
      this.props.actions.firstLoad();
      this.props.navigator.pushPage({
        component: EventCreate,
        props: {
          key: 'EventCreate',
          title: 'イベント作成',
          navigator: this.props.navigator,
        },
      }, { animation: 'none' });
    }
  }

  render() {
    const { tab, navigator } = this.props;
    return (
      <Page
        renderToolbar={this.renderToolbar.bind(this, navigator)}
      >
        <Tabbar
          onPreChange={({ index }) => this.tabChange(index)}
          position='bottom'
          index={tab}
          renderTabs={() => [
            {
              content: <Home key={0} active={tab === 0} navigator={this.props.navigator} />,
              tab: <Tab key={0} label="Home" icon="md-home" />
            },
            {
              content: <MyPage key={1} active={tab === 1} />,
              tab: <Tab key={1} label="MyPage" icon="md-account" />
            }
          ]}
        ></Tabbar>
        <Switch>
          {/* ルートURLのルーティング */}
          <Route path='/' exact render={() => this.defaultLoad()} />
          {/* ユーザー情報更新のルーティング */}
          <Route path='/user/edit' render={res => this.pushPageUserEdit(res)} />
          {/* イベント作成のルーティング */}
          <Route path='/event/create' exact render={res => this.pushPageEventCreate(res)} />
          {/* イベント詳細のルーティング */}
          <Route path='/ogp/event/detail/:key' exact render={res => this.pushPageEventDetail(res)} />
          {/* ルーティングにヒットしなかった場合のルーティング */}
          <Route exact render={() => this.notFound()} />
        </Switch>
      </Page >
    );
  }

  tabChange(index) {
    this.props.actions.tabChange(index);
    this.props.navigator.routes[0].props.title = index === 0 ? 'Home' : 'My Page';
  }
  renderToolbar(navigator) {
    return React.createElement(MyToolbar, navigator);
  }
}


const mapStateToProps = (state) => {
  return {
    tab: state.ui.tab,
    events: state.data.events,
    isFirstLoad: state.ui.isFirstLoad,
    onChange: Actions.tabChange,
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
