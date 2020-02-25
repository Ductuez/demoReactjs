import React from "react";

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      status: false,
      id: "",
      isContentChange: true
    };
    this.refName = React.createRef();
  }

  onCancelForm = () => {
    this.props.onCancelForm();
  };
  onChange = event => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value
    });
  };
  componentWillMount = () => {
    if (this.props.taskEdit) {
      this.setState({
        id: this.props.taskEdit.id,
        name: this.props.taskEdit.name,
        status: this.props.taskEdit.status
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.taskEdit) {
        this.setState({
          id: nextProps.taskEdit.id,
          name: nextProps.taskEdit.name,
          status: nextProps.taskEdit.status
        });
      }
  }

  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.onClear();
    this.onCancelForm();
  };
  onClear = () => {
    this.setState({
      name: "",
      status: false
    });
  };
  render() {
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">Thêm Công Việc</h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Tên :</label>
              <input
                type="text"
                className="form-control"
                ref={this.refName}
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <label>Trạng Thái :</label>
            <select
              className="form-control"
              required="required"
              name="status"
              value={this.state.status}
              onChange={this.onChange}
            >
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                Thêm
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.onCancelForm}
              >
                Hủy Bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TaskForm;
