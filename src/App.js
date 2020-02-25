import React from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import Control from "./components/control";
import TaskList from "./components/Tasklist";
import demo from './redux/index';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      isEditTask: null,
      filter: {
          name : '',
          status : -1
      },
      keyword : '',
      by: '',
      value : 1
      
    };
  }

  componentWillMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks
      });
    }
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  GenerateID() {
    return this.s4() + this.s4() + "-" + this.s4() + this.s4();
  }

  onDisplayForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm
    });
  };
  onCancelForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm
    });
  };
  onSubmit = data => {
    if (data.status === "true") {
      data.status = true;
    } else {
      data.status = false;
    }

    let { tasks } = this.state;
    if (data.id === "") {
      data.id = this.GenerateID();
      tasks.push(data);
    } else {
      let index = this.findIndex(data.id);
      tasks[index] = data;
    }

    this.setState({
      tasks: tasks
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  onUpdateStatus = id => {
    let tasks = this.state.tasks;
    let index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
    }
    this.setState({
      tasks: tasks
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  findIndex = id => {
    let tasks = this.state.tasks;
    let result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  };
  onRemove = id => {
    let tasks = this.state.tasks;
    let index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
    }
    console.log(tasks);
    this.setState({
      tasks: tasks
    });
    this.onCancelForm();
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  showForm = () => {
    this.setState({
      isDisplayForm: true
    });
  };
  updateChange = id => {
    let { tasks } = this.state;
    let index = this.findIndex(id);
    var isEditTask = tasks[index];
    this.setState({
      isEditTask: isEditTask
    });
    this.showForm();
  };
  onFilter = (name, status) => {
    status = parseInt(status,10)
    this.setState({
       filter : {
           name : name.toLowerCase(),
           status : status
       }
    })
  };
  onSearch =(data) => {
    this.setState({
      keyword : data
    })
    
  }
  onSoft = async (by,value) => {
    await this.setState({
        by : by,
        value : value
    })
  }
  render() {
    let { tasks, isDisplayForm, isEditTask, filter,keyword, by, value } = this.state;
    if(filter){
        if(filter.name){
            tasks =tasks.filter(elm =>{
                return elm.name.toLowerCase().indexOf(filter.name) !== -1;
            })
        }
    }
    tasks = tasks.filter(elm => {
      if(filter.status === -1){
        return elm;
      }
      else{
        return elm.status === (filter.status === 1 ? true : false)
      }
    })

    if(keyword){
      tasks = tasks.filter(elm=> {
        return elm.name.toLowerCase().indexOf(keyword) !== -1;
      })
    }

     if(  by === 'name'){
      tasks.sort((a,b) => {
        if(a.name > b.name) return value;
        else if(a.name < b.name) return -value;
        else return 0
      })
    }
    else{
      tasks.sort((a,b) => {
        if(a.status > b.status) return -value;
        else if(a.status < b.status) return value;
        else return 0
      })
    }

    let elmTaskform = isDisplayForm ? (
      <TaskForm
        onSubmit={this.onSubmit}
        onCancelForm={this.onCancelForm}
        taskEdit={isEditTask}
      />
    ) : (
      ""
    );

    return (
      <div className="App">
        <div className="container">
          <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr />
          </div>
          <div className="row">
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              {elmTaskform}
            </div>
            <div
              className={
                isDisplayForm === false
                  ? "col-xs-12 col-sm-12 col-md-12 col-lg-12"
                  : "col-xs-8 col-sm-8 col-md-8 col-lg-8"
              }
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onDisplayForm}
              >
                <span className="fa fa-plus mr-5"></span>Thêm Công Việc
              </button>
              <Control onSearch={this.onSearch} onSoft={this.onSoft} />
              <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <TaskList
                    tasks={tasks}
                    onUpdatestatus={this.onUpdateStatus}
                    onRemove={this.onRemove}
                    updateChange={this.updateChange}
                    onFilter={this.onFilter}
                  ></TaskList>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
