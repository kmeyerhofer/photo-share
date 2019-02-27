import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import CommentList from './commentList.js';
import CommentForm from './commentForm.js';
import MongoComments from '../api/mongoComments.js';
import { addError, removeError } from '../redux/actions/errorActions.js';
import addErrorTimer from '../helpers/addErrorTimer.js';


class CommentBox extends Component {
  state = {
    fileID: this.props.id,
  }

  saveComment = (commentData) => {
    Meteor.call('saveComments', this.state.fileID, commentData, (error) => {
      if (error) {
        addErrorTimer(error.message);
      }
    });
  }

  render () {
    if (!this.props.loading) {
      return <h3>loading comments</h3>;
    }
    return (
      <div>
        <CommentList comments={this.props.comments} />
        <CommentForm saveComment={this.saveComment} />
      </div>
    );
  }
}

const commentTracker = withTracker(({ id }) => {
  const commentSub = Meteor.subscribe('comments', id);
  return {
    loading: commentSub.ready(),
    comments: MongoComments.find({ _id: id }, { comments: 1 }).fetch(),
  };
})(CommentBox);

const mapDispatchToProps = dispatch => ({
  addError: (error) => {
    dispatch(addError(error));
  },
  removeError: (error) => {
    dispatch(removeError(error));
  },
});

export default connect(null, mapDispatchToProps)(commentTracker);
