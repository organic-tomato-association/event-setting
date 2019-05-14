import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import { Button, Page, Input } from 'react-onsenui';

import MyToolbar from '../MyToolbar';

class Body extends React.Component {
  static displayEvent = {};
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

  updateEvent() {
    this.props.actions.updateEvent(this.props.event, this.displayEvent);
    this.props.navigator.popPage();
  }

  render() {
    const { event, events } = this.props;
    this.displayEvent = { ...events.find(e => e.id === event) };
    return (
      <Page
        renderToolbar={this.renderToolbar.bind(this)}
      >
        <section>
          <div style={{ textAlign: 'center', margin: '20px' }}>
            <div style={{ margin: '8px' }}>
              <label style={{ textAlign: 'right' }}>イベント名</label>
            </div>
            <div style={{ margin: '8px' }}>
              <Input
                value={this.displayEvent.name}
                onChange={(e) => this.displayEvent.name = e.target.value}
                modifier='material'
                type="text"
              />
            </div>
          </div>
          <div style={{ textAlign: 'center', margin: '20px' }}>
            <div style={{ margin: '8px' }}>
              <label style={{ width: '200px' }}>イベント概要</label>
            </div>
            <div style={{ margin: '8px' }}>
              <Input
                value={this.displayEvent.description}
                onChange={(e) => this.displayEvent.description = e.target.value}
                modifier='material'
                type="text"
              />
            </div>
          </div>
          <p style={{ textAlign: 'center' }}>
            <Button onClick={() => this.updateEvent()}>更新</Button>
          </p>
        </section>
      </Page >
    );
  }

  renderToolbar() {
    return React.createElement(MyToolbar, { navigator: this.props.navigator });
  }
}


const mapStateToProps = (state) => {
  return {
    events: state.data.events,
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