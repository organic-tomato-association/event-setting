import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Actions from '../../../actions';
import { Page, Card, Row, Col } from 'react-onsenui';
import EventDetail from '../EventDetail';

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
    const { newEvents } = this.props;
    return (
      <Page>
        <section>
          <h2 style={{ textAlign: 'center' }}>Event</h2>
          <div>
            <Row>
              {Object.keys(newEvents).map((key) => (
                <Col width={"50%"} key={key}>
                  <Card onClick={this.pushPage.bind(this, key)}>
                    <h5>{newEvents[key].name}</h5>
                    <p>{newEvents[key].description}</p>
                  </Card>
                </Col>
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
)(Home);