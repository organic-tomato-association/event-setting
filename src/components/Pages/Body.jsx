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

class Body extends React.Component {
  // ルートディレクトリの場合
  defaultLoad() {
    this.props.actions.firstLoad();
  }

  // ルーティングにヒットしなかった場合
  notFound() {
    this.props.actions.firstLoad();
    if (this.props.isFirstLoad) {
      this.props.navigator.pushPage({
        component: NotFound,
        props: {
          key: 'NotFound',
          title: '404 Not Found',
          navigator: this.props.navigator,
        },
      });
    }
  }

  // イベント詳細の場合
  pushPageEvent({ match }) {
    const { newEvents } = this.props;
    // イベントが存在するか
    if (match.params.key in newEvents) {
      // 初回の表示の場合にpushPageする
      if (this.props.isFirstLoad) {
        this.props.actions.firstLoad();
        this.props.navigator.pushPage({
          component: EventDetail,
          props: {
            key: 'eventDetail',
            event: match.params.key,
            title: 'Event Detail',
            navigator: this.props.navigator,
          },
        });
      }
    } else {
      this.notFound();
    }
  }

  render() {
    const { tab, navigator, actions } = this.props;
    return (
      <Page
        renderToolbar={this.renderToolbar.bind(this, navigator)}
      >
        <Tabbar
          onPreChange={({ index }) => actions.tabChange(index)}
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
          {/* イベント詳細のルーティング */}
          <Route path='/event/:key' exact render={res => this.pushPageEvent(res)} />
          {/* ルーティングにヒットしなかった場合のルーティング */}
          <Route exact render={() => this.notFound()} />
        </Switch>
      </Page >
    );
  }
  renderToolbar(navigator) {
    return React.createElement(MyToolbar, navigator);
  }
}


const mapStateToProps = (state) => {
  return {
    tab: state.ui.tab,
    newEvents: state.data.newEvents,
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