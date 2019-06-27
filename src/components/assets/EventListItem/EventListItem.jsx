import React from 'react';
import {Col} from 'react-onsenui';
import moduleClass from './EventListItem.module.css';

class EventListItem extends React.Component {
  render() {
    return (
      <Col width={"360px"}>
        <div className={moduleClass.eventCard} onClick={this.props.onClick()}>
          {(()=> {
            if (this.props.event.hasOwnProperty('photoURL')) {
              return (
                <div
                  className={moduleClass.eventCardImage}
                >
                  <img
                    className={moduleClass.eventCardImage}
                    src={this.props.event.photoURL}
                    alt="event"/>
                </div>
              );
            } else {
              return (
                <div className={moduleClass.eventCardImage}>
                  <div
                    className={moduleClass.eventCardNoImage}
                  >
                    <div>no image</div>
                  </div>
                </div>
              );
            }
          })()}
          <div className={moduleClass.eventCardText}>
            {this.props.event.name}
          </div>
        </div>
      </Col>
    );
  }
}

export default EventListItem;