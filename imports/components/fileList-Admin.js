import React, {Component} from 'react';
import FileAdmin from './file-Admin.js';

class fileListAdmin extends Component {

  fileMap = () => {
    return this.props.files.map((elem) => {
      return <FileAdmin key={elem._id} url={elem.url} fileLocation={elem.fileLocation} fileName={elem.fileName} deleteFile={this.props.deleteFile}/>
    })
  }

  render() {
    if(this.props.files && this.props.files.length > 0){
      return(
        <div>
          <ul>
            {this.fileMap()}
          </ul>
        </div>
      );
    }
    else {
      return(
        <div>...loading</div>
      )
    }
  }
}

export default fileListAdmin;
