import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Actions from './actions';
import { Navigator, Splitter, SplitterSide, SplitterContent, Toast, Icon, Col, Row } from 'react-onsenui';
import { BrowserRouter } from 'react-router-dom';
import { When } from 'react-display-switch';
import { firebaseApp } from './firebase/index'; // eslint-disable-line no-unused-vars
import './App.css';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Body from './components/Pages/Body';
import Auth from './components/Pages/Auth';
import SplitterView from './components/SplitterView'

When.case('screen_xs', () => window.innerWidth < 768);
When.case('screen_md', () => !When.screen_xs && window.innerWidth < 992);
When.case('screen_lg', () => window.innerWidth >= 992);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          {
            this.props.isLoggedIn && this.props.uid
              ? <Splitter>
                <SplitterContent>
                  <Navigator
                    swipeable
                    initialRoute={
                      { component: Body, props: { key: this.props.title, title: 'Home', } }
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
                  isOpen={this.props.isShowSplitter}
                  onClose={() => this.props.actions.closeSplitter()}
                  onOpen={() => this.props.actions.openSplitter()}>
                  <SplitterView navigator={this.navigator} />
                </SplitterSide>
              </Splitter>
              : <Auth title={'Event Setting'} />
          }
        </div>
        <Toast isOpen={this.props.notification.isShow}>
          <Row>
            <Col width={'15%'}>
              <Icon size={{default: 40}}  icon={this.props.notification.icon} />
            </Col>
            <Col width={'85%'}>
              <div
                style={{
                  fontSize: '16px',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {this.props.notification.message}
              </div>
            </Col>
          </Row>
        </Toast>
      </BrowserRouter>
    );
  }

  renderPage = (route, navigator) => {
    const props = route.props || {};
    props.navigator = navigator;
    return React.createElement(route.component, props);
  };
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    uid: state.auth.uid,
    title: state.ui.title,
    isShowSplitter: state.ui.isShowSplitter,
    notification: state.ui.notification,
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
)(App);
