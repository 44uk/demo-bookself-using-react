import React from 'react';
import Case from './case';
import Book from './book';
import BookAdd from './book_add';

export default class extends React.Component {
  constructor(props = {}) {
    super(props);
  }

  render() {
    var cases = this.props.data.map((el) => {
      let book = <Book id={el.objectId}
        data={el}
        showReview={this.props.showReview}
      />

      return <Case id={el.objectId}
        book={book}
        url={el.url}
        showReview={this.props.showReview}
      />
    });

    if (this.props.isAddable) {
      let book = <BookAdd
        showForm={this.props.showForm}
      />
      cases.push(<Case book={book}
        isAddable={true}
      />)
    }

    return (
      <div className="shelf">{cases}</div>
    );
  }
}
