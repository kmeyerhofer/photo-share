/* eslint-disable react/no-find-dom-node, react/no-string-refs */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class CommentForm extends Component {

  state = {
    author: "",
    comment: "",
  };

  // updateAuthor = (event) => {
  //   this.setState({author:event.targe})
  // }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const authorInput = this.state.author;
    const commentInput = this.state.comment;

    const commentData = Object.freeze({ author: authorInput, comment: commentInput });

    this.props.saveComment(commentData);
  }


  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <input type="text" ref="author" placeholder="enter your name (optional)" onChange={ (evt) => {this.setState({author: evt.target.value});}} />
        <br />
        <textarea ref="comment" placeholder="comment..." onChange={ (evt) => {this.setState({comment: evt.target.value});}} />
        <button type="submit">submit</button>
      </form>
    );
  }
}
