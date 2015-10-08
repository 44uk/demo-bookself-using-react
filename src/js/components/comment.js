import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <div className="comment">
        <div className="comment__body">{this.props.body}</div>
        <div className="comment__name">{this.props.name}</div>
      </div>
    );
  }
}
