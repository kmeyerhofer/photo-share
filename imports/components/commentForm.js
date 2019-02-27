/* eslint-disable react/no-find-dom-node, react/no-string-refs */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class CommentForm extends Component {
  handleFormSubmit = (event) => {
    event.preventDefault();

    const authorInput = ReactDOM.findDOMNode(this.refs.author);
    const commentInput = ReactDOM.findDOMNode(this.refs.comment);

    const commentData = Object.freeze({ author: authorInput.value, comment: commentInput.value });

    this.props.saveComment(commentData);
  }


  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <input type="text" ref="author" placeholder="enter your name (optional)" />
        <br />
        <textarea ref="comment" placeholder="comment..." />
        <button type="submit">submit</button>
      </form>
    );
  }
}
