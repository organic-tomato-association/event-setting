import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Actions from '../../../actions';
import { Page, Row, Col } from 'react-onsenui';
import EventDetail from '../Event/EventDetail';
import EventListItem from "../../assets/EventListItem/EventListItem";

class Home extends React.Component {
  pushPage(key) {
    this.props.navigator.pushPage({
      component: EventDetail,
      props: {
        key: 'eventDetail',
        event: key,
        title: 'Event Detail',
        navigator: this.props.navigator,
      },
    });
  }

  render() {
    const { events } = this.props;
    return (
      <Page>
        <section>
          <h2 style={{ textAlign: 'center' }}>Event</h2>
          <div>
            <Row style={{justifyContent: 'center'}}>
              {events.map((event) => (
                <EventListItem
                  key={event.id}
                  event={event}
                  onClick={() => this.pushPage.bind(this, event.id)}
                />
              ))}
            </Row>
          </div>
        </section>
      </Page>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.data.events,
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
)(Home);