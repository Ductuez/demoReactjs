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
           <Search></Search>
           <Soft></Soft>
        </div>  
    );
  }
}

export default Control;
