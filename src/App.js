import React from "react";
import "./App.css";
import TaskForm from './components/TaskForm';
import Control from './components/control';
import TaskList from './components/Tasklist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks : [],
      isDisplayForm: false,
    };
  }
  
  componentWillMount(){
      if(localStorage && localStorage.getItem('tasks')){
          var tasks = JSON.parse(localStorage.getItem('tasks'));
          this.setState({
              tasks : tasks
          })
      }
  }
  
  s4(){
    return Math.floor(( 1 + Math.random())*0x10000).toString(16).substring(1);
  }
  GenerateID() {
    return this.s4() + this.s4() + '-'+ this.s4() + this.s4();
  }

  onDisplayForm = () =>{
    this.setState({
        isDisplayForm : !this.state.isDisplayForm
    })
  }
    onCancelForm =()=>{
        this.setState({
            isDisplayForm : !this.state.isDisplayForm
        })
    }
    onSubmit =(data) =>{
        if(data.status === 'true'){
            data.status = true
        }else{
            data.status = false
        }
        let {tasks}= this.state;
        data.id = this.GenerateID();
        tasks.push(data)
        this.setState({
            tasks : tasks
        })
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    onUpdateStatus =(id) =>{
        let tasks = this.state.tasks;
        let index = this.findIndex(id);
        if(index != -1){
            tasks[index].status = !tasks[index].status; 
        }
        this.setState({
            tasks : tasks
        })
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    findIndex = (id) => {
        let tasks = this.state.tasks;
        let result = -1;
        tasks.forEach((task,index)=>{
            if(task.id == id){
                result = index
            }
        })
        return result;
    }
    onRemove = (id) => {
        let tasks = this.state.tasks;
        let index = this.findIndex(id);
        if(index != -1){
            tasks.splice(index,1)
        }
        console.log(tasks)
        this.setState({
            tasks : tasks
        })
        this.onCancelForm();
        localStorage.setItem('tasks', JSON.stringify(tasks))

    }
  render() {
      let {tasks, isDisplayForm} = this.state;
      let elmTaskform = isDisplayForm ? <TaskForm onSubmit={this.onSubmit} onCancelForm ={this.onCancelForm} /> : '';

    return (
        <div className="App">
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr/>
                </div>
            <div className="row">
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                   {elmTaskform}
                </div>
                <div className={isDisplayForm === false ? 'col-xs-12 col-sm-12 col-md-12 col-lg-12' : 'col-xs-8 col-sm-8 col-md-8 col-lg-8' }>
                    <button type="button" className="btn btn-primary"  onClick={this.onDisplayForm}>
                        <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                    </button>
                    <Control></Control>
                    <div className="row mt-15">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                           <TaskList tasks={tasks}
                            onUpdatestatus ={this.onUpdateStatus} onRemove ={this.onRemove}
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
