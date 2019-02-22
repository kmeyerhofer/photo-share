import React, {Component} from 'react';
import {CommentList} from './commentList.js';
import {CommentForm} from './commentForm.js';
import {Meteor} from 'meteor/meteor';
import MongoComments from '../api/mongoComments.js';
import { withTracker } from 'meteor/react-meteor-data';


class CommentBox extends Component {
  state = {
    comments: [],
    fileID: this.props.id,
    loaded: false,
  }

  componentDidMount = () => {
    if ( MongoComments.findOne({_id: this.state.fileID}) === undefined) {
      this.createCommentObj();
    } else {
      // this.getComments();
    }
  }

  createCommentObj = () => {
    Meteor.call('addComments', this.state.fileID, this.state.comments, (error, result) => {
      if(error) {
        console.log(error);
      } else {
        return;
      }
    });
  }

  saveComment = (commentData) => {

    Meteor.call('saveComments', this.state.fileID, commentData, (error, result) => {
      if(error) {
        console.log(error);
      }
    });
    // this.setState({comments: [...this.state.comments, commentData]});
  }

    render () {
      if(!this.props.loading){
        return <h3>loading comments</h3>
      } else {
        return (
          <div>
            <CommentList comments={this.props.comments}/>
            <CommentForm saveComment={this.saveComment}/>
          </div>
          );
      }
    }
}

const commentTracker = withTracker( ({id}) => {
  const commentSub = Meteor.subscribe('comments', id);
  return {
    loading: commentSub.ready(),
    comments: MongoComments.find({_id: id}, {comments: 1}).fetch(),
  };
})(CommentBox);

export default commentTracker;
