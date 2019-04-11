import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import { Tabbar, Tab, Page } from 'react-onsenui';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import MyToolbar from '../MyToolbar';
import Home from './Tabs/Home';
import MyPage from './Tabs/MyPage';

class Body extends React.Component {
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
      </Page>
    );
  }
  renderToolbar(navigator) {
    return React.createElement(MyToolbar, navigator);
  }
}


const mapStateToProps = (state) => {
  return {
    tab: state.ui.tab,
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