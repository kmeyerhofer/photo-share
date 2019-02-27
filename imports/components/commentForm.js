import React, { Component } from 'react';

export default class CommentForm extends Component {
  state = {
    author: '',
    comment: '',
  };

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
        <input type="text" placeholder="enter your name (optional)" onChange={(evt) => { this.setState({ author: evt.target.value }); }} />
        <textarea placeholder="comment..." onChange={(evt) => { this.setState({ comment: evt.target.value }); }} />
        <button type="submit">submit</button>
      </form>
    );
  }
}
