import React from "react";
import Search from './Search';
import Soft from './Soft';

class Control extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

 
 
  render() {
    return (
        <div className="row mt-15">
           <Search onSearch={this.props.onSearch}></Search>
           <Soft onLick = {this.props.onSoft}></Soft>
        </div>  
    );
  }
}

export default Control;
