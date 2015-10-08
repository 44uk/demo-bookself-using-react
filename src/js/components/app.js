import Merge from 'merge';
import React from 'react';

import Shelf  from './shelf';
import Review from './review';
import Form   from './form';

export default class extends React.Component {
  constructor(props = {}) {
    super(props);
    this.state = {
      cache:  {},
      data:   [],
      detail: null,
      isReviewShown: false,
      isFormShown: false
    };
  }

  _reloadData() {
    this.fetchData()
      .then((data) => {
        this.setState({data: data});
      });
  }

  componentDidMount() {
    this._reloadData();

    this.setState({
      interval: setInterval(() => {
        this.clearCache();
        this.fetchData()
          .then((data) => {
            this.setState({data: data});
          });
      }, 60000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  saveData(params = {}) {
    let new_item = new this.props.storeItem(params);
    return new Promise((resolve, reject) => {
      if( ! (params.title && params.url && params.pic)  ) {
        console.log('invalid params');
        return reject('invalid params');
      }

      new_item.save()
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  saveReviewData(params = {}) {
    let new_item = new this.props.storeReview(params);
    return new Promise((resolve, reject) => {
      if( ! (params.name && params.body) ) {
        console.log('invalid params');
        return reject('invalid params');
      }

      new_item.save()
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  fetchData(opts = {}) {
    return new Promise((resolve, reject) => {
      this.props.storeItem
        .fetchAll()
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  fetchReviewData(opts) {
    return new Promise((resolve, reject) => {
      this.props.storeReview
        .equalTo('itemId', opts.id)
        .fetchAll()
        .then((data) => {
          console.log(data)
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  showForm() {
    this.setState({isFormShown: true});
  }

  showReview(id, useCache = true) {
    let item = this.findById(id);
    if(useCache && this.state.cache[id]) {
      console.log('cache hit! id: ' + id)
      let review = this.state.cache[id];
      this.setState(review);
      this.setState({isReviewShown: true});
    } else {
      this.fetchReviewData({id: id})
        .then((data) => {
          let review = {
            detail: item,
            comments: data
          };

          let _cache = this.state.cache;
          _cache[id] = review;
          this.setState({cache: _cache});

          this.setState(review);
          this.setState({isReviewShown: true});
        });
    }
  }

  closeForm() {
    this.setState({isFormShown: false});
  }

  closeReview() {
    this.setState({isReviewShown: false});
  }

  clearCache() {
    this.setState({cache: {}});
    return this;
  }

  findById(id) {
    let el= this.state.data.filter((el, idx) => {
      if(el.objectId === id) { return el };
    });
    return el[0];
  }

  render() {
    return (
      <div className="app">
        <Shelf
          data={this.state.data}
          showReview={this.showReview.bind(this)}
          showForm={this.showForm.bind(this)}
          isAddable={true}
        />
        <Review
          isShown={this.state.isReviewShown}
          detail={this.state.detail}
          comments={this.state.comments}
          close={this.closeReview.bind(this)}
          saveReview={this.saveReviewData.bind(this)}
          showReview={this.showReview.bind(this)}
        />
        <Form
          isShown={this.state.isFormShown}
          saveData={this.saveData.bind(this)}
          close={this.closeForm.bind(this)}
        />
      </div>
    );
  }
}
