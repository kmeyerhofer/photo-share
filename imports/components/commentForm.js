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
      <form className="comment-form" onSubmit={this.handleFormSubmit}>
        <input id="comment-name" type="text" placeholder="Name" onChange={(evt) => { this.setState({ author: evt.target.value }); }} />
        <textarea id="comment-text" placeholder="Comment" onChange={(evt) => { this.setState({ comment: evt.target.value }); }} />
        <button id="comment-submit" className="button" type="submit">Submit</button>
      </form>
    );
  }
}
