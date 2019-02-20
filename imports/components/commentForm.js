import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export class CommentForm extends Component {

  handleFormSubmit = (event) => {
      event.preventDefault();

      var authorInput = ReactDOM.findDOMNode(this.refs.author);
      var commentInput = ReactDOM.findDOMNode(this.refs.comment);

      var commentDataTuple = Object.freeze({author: authorInput.value, comment: commentInput.value});

      console.log(commentDataTuple.author);
      console.log(commentDataTuple.comment);
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <input type="text" ref="author" placeholder="enter your name (optional)" />
        <br/>
        <input type="text" ref="comment" placeholder="comment..." />
        <button type="submit">submit</button>
      </form>
    );
  }
}
