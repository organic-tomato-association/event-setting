import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import { Button, Card, Page } from 'react-onsenui';

import MyToolbar from '../MyToolbar';
import EventEdit from './EventEdit';

class Body extends React.Component {
  // イベントのURLを設定
  componentWillMount() {
    const { event, events } = this.props;
    this.event = events.find(e => e.id === event) || { name: '', description: '' };
    if (events.find(e => e.id === event)) {
      this.props.actions.pagePush(`/event/${event}`);
    }
  }

  // 前のURLに戻す
  componentWillUnmount() {
    this.props.actions.pagePop();
  }

  pushPage(key) {
    this.props.navigator.pushPage({
      component: EventEdit,
      props: {
        key: 'eventEdit',
        event: key,
        title: 'Event Edit',
        navigator: this.props.navigator,
      },
    });
  }

  render() {
    const { event, events, uid } = this.props;
    const displayEvent = events.find(e => e.id === event);
    console.log(this.props.navigator)
    return (
      <Page
        renderToolbar={this.renderToolbar.bind(this)}
      >
        <Card>
          <h2>{displayEvent.name}</h2>
          <p>{displayEvent.description}</p>
        </Card>
        {
          uid === displayEvent.created_by
            ? (<div style={{ textAlign: 'center' }}><Button onClick={this.pushPage.bind(this, event)}>Edit</Button></div>)
            : ''
        }
      </Page>
    );
  }

  renderToolbar() {
    return React.createElement(MyToolbar, { navigator: this.props.navigator });
  }
}


const mapStateToProps = (state) => {
  return {
    events: state.data.events,
    uid: state.auth.uid,
    url: state.ui.urlHistory[state.ui.urlHistory.length - 1],
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