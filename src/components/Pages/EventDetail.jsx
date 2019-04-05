import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import { BackButton, Toolbar, Page, Card } from 'react-onsenui';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

class Body extends React.Component {
  render() {
    const { event, newEvents } = this.props;
    return (
      <Page
        renderToolbar={() =>
          <Toolbar>
            <div className='left'>
              <BackButton>Back</BackButton>
            </div>
            <div className="center">
              Event Detail
            </div>
          </Toolbar>
        }
      >
        <Card>
          <h2>{newEvents[event].name}</h2>
          <p>{newEvents[event].description}</p>
        </Card>
      </Page>
    );
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