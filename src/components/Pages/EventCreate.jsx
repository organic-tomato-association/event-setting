import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import { Button, Page, Input } from 'react-onsenui';

import MyToolbar from '../MyToolbar';

class EventCreate extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      member: [],
    };
  }
  // イベントのURLを設定
  componentDidMount() {
    this.props.actions.pagePush(`/event/create`);
  }

  // 前のURLに戻す
  componentWillUnmount() {
    this.props.actions.pagePop();
  }

  createEvent() {
    this.props.actions.createEvent(this.state);
    this.props.navigator.popPage();
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
                value={this.state.name}
                onChange={(e) => {
                  this.setState({
                    ...this.state,
                    name: e.target.value,
                  });
                }}
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
                value={this.state.description}
                onChange={(e) => {
                  this.setState({
                    ...this.state,
                    description: e.target.value,
                  });
                }}
                modifier='material'
                type="text"
              />
            </div>
          </div>
          <p style={{ textAlign: 'center' }}>
            <Button onClick={() => this.createEvent()} disabled={this.state.name === ''}>作成</Button>
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
)(EventCreate);