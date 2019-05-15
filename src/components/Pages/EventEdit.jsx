import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import { Button, Page, Input } from 'react-onsenui';

import MyToolbar from '../MyToolbar';

class Body extends React.Component {
  constructor(props) {
    super();
    this.state = {
      event: props.events.find(e => e.id === props.event),
    }
  }
  // イベントのURLを設定
  componentDidMount() {
    const { event, events } = this.props;
    this.event = events.find(e => e.id === event) || { name: '', description: '' };
    if (events.find(e => e.id === event)) {
      this.props.actions.pagePush(`/event/detail/${event}`);
    }
  }

  // 前のURLに戻す
  componentWillUnmount() {
    this.props.actions.pagePop();
  }

  updateEvent() {
    this.props.actions.updateEvent(this.props.event, this.state.event);
    this.props.navigator.popPage();
  }

  disabledUpdateBtn() {
    return this.state.event.name === '';
  }

  render() {
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
                value={this.state.event.name}
                onChange={(e) => this.setState({ ...this.state, event: { ...this.state.event, name: e.target.value } })}
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
                value={this.state.event.description}
                onChange={(e) => this.setState({ ...this.state, event: { ...this.state.event, description: e.target.value } })}
                modifier='material'
                type="text"
              />
            </div>
          </div>
          <p style={{ textAlign: 'center' }}>
            <Button onClick={() => this.updateEvent()} disabled={this.disabledUpdateBtn()}>更新</Button>
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