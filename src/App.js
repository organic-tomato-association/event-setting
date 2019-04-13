import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Actions from './actions';
import { Navigator, Splitter, SplitterSide, SplitterContent } from 'react-onsenui';
import { When } from 'react-display-switch';
import { firebaseApp } from './firebase/index'; // eslint-disable-line no-unused-vars
import './App.css';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Body from './components/Pages/Body';
import Auth from './components/Pages/Auth';
import SplitterView from './components/SplitterView'

When.case('screen_xs', () => window.innerWidth < 768)
When.case('screen_md', () => !When.screen_xs && window.innerWidth < 992)
When.case('screen_lg', () => window.innerWidth >= 992)

class App extends Component {
  render() {
    const { uid, title, isShowSplitter, actions } = this.props;
    return (
      <div>
        {
          uid
            ? <Splitter>
              <SplitterContent>
                <Navigator
                  swipeable
                  initialRoute={
                    { component: Body, props: { key: title } }
                  }
                  renderPage={this.renderPage}
                  ref={(navigator) => { this.navigator = navigator; }}
                />
              </SplitterContent>
              <SplitterSide
                side='right'
                width={220}
                collapse={true}
                swipeable={true}
                isOpen={isShowSplitter}
                onClose={() => actions.closeSplitter()}
                onOpen={() => actions.openSplitter()}>
                <SplitterView navigator={this.navigator} />
              </SplitterSide>
            </Splitter>
            : <Auth title={'Event Setting'} />
        }
      </div>
    );
  }

  renderPage(route, navigator) {
    const props = route.props || {};
    props.navigator = navigator;
    return React.createElement(route.component, props);
  }
}

const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
    title: state.ui.title,
    isShowSplitter: state.ui.isShowSplitter,
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
)(App);
