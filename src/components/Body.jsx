import React from 'react';
import { Tabbar, Tab, Toolbar, Page } from 'react-onsenui';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

class HomePage extends React.Component {
  render() {
    return (
      <Page
        renderToolbar={() =>
          <Toolbar>
            <div className='center'>Title</div>
          </Toolbar>
        }
      >
        <div>
          Home Page
        </div>
      </Page>
    );
  }
}

class SettingsPage extends React.Component {
  render() {
    return (
      <Page
        renderToolbar={() =>
          <Toolbar>
            <div className='center'>Title</div>
          </Toolbar>
        }
      >
        <div>
          Settings Page
        </div>
      </Page>
    );
  }
}

class Body extends React.Component {
  render() {
    const { tab, actions } = this.props;
    return (
      <Tabbar
        onPreChange={({ index }) => actions.tabChange(index)}
        position='bottom'
        index={tab}
        renderTabs={(activeIndex, tabbar) => [
          {
            content: <HomePage active={activeIndex === 0} tabbar={tabbar} key={0} />,
            tab: <Tab label="Home" icon="md-home" key={0} />
          },
          {
            content: <SettingsPage active={activeIndex === 1} tabbar={tabbar} key={1} />,
            tab: <Tab label="Settings" icon="md-settings" key={1} />
          }
        ]}
      ></Tabbar>
    );
  }
}

export default Body;