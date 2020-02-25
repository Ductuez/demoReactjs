import React from "react";


class TaskItem extends React.Component {
    onUpdatestatus = () => {
        this.props.onUpdatestatus(this.props.task.id)
    }
    onRemove = () => {
        this.props.onRemove(this.props.task.id)
    }
    updateChange = () => {
        this.props.updateChange(this.props.task.id)
    }
    
  render() {
    var {task,index} = this.props;    
    return (
        
        <tr>
            <td>{index + 1}</td>
            <td>{task.name}</td>
            <td className="text-center">
                <span className={task.status === true ? 'label label-success' : 'label label-danger'} onClick={this.onUpdatestatus}>
                           {task.status === true ? 'kich hoat' : 'an'} 
                        </span>
            </td>
            <td className="text-center">
                <button type="button" className="btn btn-warning" onClick={this.updateChange}>
                    <span className="fa fa-pencil mr-5"></span>Sửa
                </button>
                &nbsp;
                <button type="button" className="btn btn-danger" onClick={this.onRemove}>
                    <span className="fa fa-trash mr-5"></span>Xóa
                </button>
            </td>
    </tr>
    );
  }
}

export default TaskItem;
