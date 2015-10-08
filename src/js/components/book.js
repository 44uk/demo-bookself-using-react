import React from 'react';

export default class extends React.Component {
  _showReview () {
    this.props.showReview(this.props.id);
  }

  render() {
    return (
      <div className="book" data-id={this.props.id} onClick={this._showReview.bind(this)}>
        <img className="book__cover"
          alt={this.props.data.title}
          src={this.props.data.pic}
        />
      </div>
    );
  }
}
