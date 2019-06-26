import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Actions from '../../../actions';
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
    const { events } = this.props;
    return (
      <Page>
        <section>
          <h2 style={{ textAlign: 'center' }}>Event</h2>
          <div>
            <Row>
              {events.map((event) => (
                <Col width={"50%"} key={event.id}>
                  <Card onClick={this.pushPage.bind(this, event.id)}>
                    {(()=> {
                      if (!!event.img) {
                        return (
                          <img src={event.img} alt=""/>
                        );
                      }
                    })()}
                    <div>
                      <h5>{event.name}</h5>
                      <p>{event.description}</p>
                    </div>
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