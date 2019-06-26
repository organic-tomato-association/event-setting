import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Actions from '../../actions';
import { Button, Card, AlertDialog, Page } from 'react-onsenui';

import MyToolbar from '../MyToolbar';
import EventEdit from './EventEdit';

class EventDetail extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isShowDeleteDialog: false,
      displayEvent: props.events.find(e => e.id === props.event),
    };
  }

  // イベントのURLを設定
  componentWillMount() {
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

  pushPage(key) {
    this.props.navigator.pushPage({
      component: EventEdit,
      props: {
        key: 'eventEdit',
        event: key,
        title: 'Event Edit',
        updateDisplayEvent: this.updateDisplayEvent.bind(this),
        navigator: this.props.navigator,
      },
    });
  }

  updateDisplayEvent(displayEvent) {
    this.setState({displayEvent});
  }

  onCancelDialog() {
    this.setState({ isShowDeleteDialog: false });
  }

  onAcceptDialog() {
    const { event } = this.props;
    this.setState({ ...this.state, isShowDeleteDialog: false });
    this.props.actions.deleteEvent(event, this.state.displayEvent);
    this.props.navigator.popPage();
  }

  render() {
    const { event, uid } = this.props;

    return (
      <Page
        renderToolbar={this.renderToolbar.bind(this)}
      >
        <Card>
          <div className="event-header-image">
            {(()=> {
              if (this.state.displayEvent.hasOwnProperty('photoURL')) {
                return (
                  <img
                    style={{width: '100%', maxWidth: '100%', height: '50%'}}
                    src={this.state.displayEvent.photoURL}
                    alt="event header"
                  />
                );
              } else {
                return (
                  <p>no image</p>
                );
              }
            })()}
          </div>
          <h2>{this.state.displayEvent.name}</h2>
          <p>{this.state.displayEvent.description}</p>
          <p>Created by {this.props.users.find(e => e.id === this.state.displayEvent.created_by).displayName}</p>
        </Card>
        <AlertDialog
          isOpen={this.state.isShowDeleteDialog}
          onCancel={() => this.onCancelDialog()}
          cancelable
        >
          <div className="alert-dialog-title">注意</div>
          <div className="alert-dialog-content">
            {this.state.displayEvent.name} を削除します。
          </div>
          <div className="alert-dialog-footer">
            <Button onClick={() => this.onCancelDialog()} className="alert-dialog-button">
              Cancel
            </Button>
            <Button onClick={() => this.onAcceptDialog()} className="alert-dialog-button">
              Ok
            </Button>
          </div>
        </AlertDialog>
        {
          uid === this.state.displayEvent.created_by
            ? (
              <div style={{ textAlign: 'center' }}>
                <Button onClick={this.pushPage.bind(this, event)}>編集</Button>
                <Button onClick={() => this.setState({ isShowDeleteDialog: true })}>削除</Button>
              </div>
            )
            : ''
        }
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
    users: state.data.users,
    uid: state.auth.uid,
    url: state.ui.urlHistory[state.ui.urlHistory.length - 1],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetail);