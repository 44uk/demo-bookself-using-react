import React from 'react';
import ReactDOM from 'react-dom';

export default class extends React.Component {
  _clearForm() {
    this.refs.url.value = '';
    this.refs.pic.value = '';
    this.refs.title.value = '';
  }

  _close() {
    this.props.close();
  }

  _onSubmit() {
    this.props.saveData({
      url:   this.refs.url.value,
      pic:   this.refs.pic.value,
      title: this.refs.title.value
    })
      .then((data) => {
        // TODO: is this the right way?
        this._clearForm();
        this._close();
      });
  }

  render() {
    let flg = this.props.isShown ? 'true' : 'false';

    return (
      <div className="form" data-is-shown={flg}>
        <div className="form__inner">
          <label className="form__input">
            <span>TITLE</span>
            <input ref="title" type="text" />
          </label>
          <label className="form__input">
            <span>URL</span>
            <input ref="url" type="text" placeholdler="http://..." />
          </label>
          <label className="form__input">
            <span>PIC URL</span>
            <input ref="pic" type="text" placeholdler="http://..." />
          </label>
          <div className="form__input">
            <button className="button button--go" onClick={this._onSubmit.bind(this)}>Submit</button>
          </div>
          <div className="ic-close review__close" onClick={this._close.bind(this)} />
        </div>
      </div>
    );
  }
}
