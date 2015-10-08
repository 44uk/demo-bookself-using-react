import React from 'react';
import Book from './book';

export default class extends Book {
  constructor(props = {}) {
    super(props);
  }

  _openForm() {
    this.props.showForm();
  }

  render() {
    return (
      <div className="book book--add" onClick={this._openForm.bind(this)}>
        <img className="book__cover book__add"
          alt="add book"
          src="svg/add.svg"
        />
      </div>
    );
  }
}
