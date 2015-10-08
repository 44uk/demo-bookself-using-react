import React from 'react';
import Comment from './comment';
import CommentPost from './comment_post';

export default class extends React.Component {
  _close() {
    this.props.close();
  }

  render() {
    let detail = this.props.detail;
    let data   = this.props.comments;
    let comments = [];

    if (detail == null){ return <div/>; }

    if (data.length > 0) {
      comments = data.map((el) => {
        return <Comment name={el.name} body={el.body} />
      });
    }

    comments.push(
      <CommentPost
        close={this.props.close}
        saveReview={this.props.saveReview}
        showReview={this.props.showReview}
        isEditable={true}
        itemId={detail.objectId}
        name="Your Name?"
        body="Write the greatest review comment!"
      />
    );

    return (
      <div className="review" data-is-shown={this.props.isShown}>
        <div className="review__container">
          <div className="review__info">
            <img className="review__cover" src={detail.pic} alt={detail.title} />
          </div>
          <div className="review__comments">{comments}</div>
          <div className="ic-close review__close" onClick={this._close.bind(this)} />
        </div>
      </div>
    );
  }
}
