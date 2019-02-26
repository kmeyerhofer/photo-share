import React, {Component} from 'react';


export class Comment extends Component {

  render() {
    return(
      <div>
        <header>
          <h3>{this.props.author}</h3>
          <p>{this.props.comment}</p>
        </header>
      </div>
    );
  }
}
