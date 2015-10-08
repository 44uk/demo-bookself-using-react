import React from 'react';
import Comment from './comment';

export default class extends Comment {
  constructor(props = {}) {
    super(props);
  }

  _clearForm() {
    this.refs.body.value = '';
    this.refs.name.value = '';
  }

  _onClick() {
    this.props.saveReview({
      itemId: this.props.itemId,
      body:   this.refs.body.value,
      name:   this.refs.name.value
    })
      .then((data) => {
        this._clearForm();
        this.props.showReview(this.props.itemId, false);
      });
  }

  render() {
    return (
      <div className="comment comment--editable">
        <div className="comment__body">
          <input ref="body" className="comment__body__input" type="text" placeholder={this.props.body} />
        </div>
        <div className="comment__name">
          <input ref="name" className="comment__name__input" type="text" placeholder={this.props.name} />
        </div>
        <div className="button comment__save" onClick={this._onClick.bind(this)}>Post!</div>
      </div>
    );
  }
}
