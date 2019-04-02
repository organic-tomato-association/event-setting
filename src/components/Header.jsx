import React from 'react';
// import { Link } from 'react-router-dom';
import { Toolbar, BackButton, ToolbarButton, Icon } from 'react-onsenui';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

class Header extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <Toolbar>
        <div className="left">
          <BackButton>
            {'Back'}
          </BackButton>
        </div>
        <div className="center">
          {title}
        </div>
        <div className="right">
          <ToolbarButton>
            <Icon icon="md-menu" />
          </ToolbarButton>
        </div>
      </Toolbar>
    );
  }
}

export default Header;