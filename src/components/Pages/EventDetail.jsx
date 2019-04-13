import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import { Page, Card } from 'react-onsenui';

import MyToolbar from '../MyToolbar';

class Body extends React.Component {
  render() {
    const { event, newEvents } = this.props;
    console.log(this.props.navigator)
    return (
      <Page
        renderToolbar={this.renderToolbar.bind(this)}
      >
        <Card>
          <h2>{newEvents[event].name}</h2>
          <p>{newEvents[event].description}</p>
        </Card>
      </Page>
    );
  }

  renderToolbar() {
    return React.createElement(MyToolbar, { navigator: this.props.navigator });
  }
}


const mapStateToProps = (state) => {
  return {
    newEvents: state.data.newEvents,
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