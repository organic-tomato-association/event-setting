import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import { Toolbar, BackButton, ToolbarButton, Icon } from 'react-onsenui';

class MyToolbar extends React.Component {
  render() {
    const { title, navigator, actions } = this.props;
    console.log(actions);
    return (
      <Toolbar>
        {navigator
          ? <div className="left">
            {
              1 < navigator.routes.length
                ? <BackButton>{navigator.routes[navigator.routes.length - 2].props.key}</BackButton>
                : null
            }
          </div>
          : null
        }
        <div className="center">
          {
            navigator
              ? navigator.routes[navigator.routes.length - 1].props.title
              : title
          }
        </div>
        <div className="right">
          <ToolbarButton onClick={() => actions.openSplitter()}>
            <Icon icon='ion-navicon, material:md-menu' />
          </ToolbarButton>
        </div>
      </Toolbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    title: state.ui.title,
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
)(MyToolbar);