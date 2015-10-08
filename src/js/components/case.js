import React from 'react';

export default class extends React.Component {
  _showReview() {
    this.props.showReview(this.props.id)
  }

  render() {
    let buttonCart = this.props.isAddable ? '' : <a className="case__link case__link--cart" href={this.props.url} title="Open AMAZON.co.jp" target="_blank"><span className="ic-cart" /></a>
    let buttonLink = this.props.isAddable ? '' : <a className="case__link case__link--review" onClick={this._showReview.bind(this)} title="Show Review"><span className="ic-review" /></a>

    return (
      <div className="case">
        {this.props.book}
        {buttonCart}
        {buttonLink}
      </div>
    );
  }
}

//<Book id={this.props.id} data={this.props.data} showReview={this.props.showReview} />
