import React,{Component} from 'react'
import './App.css';
import TastForm from './components/TastForm'
import Control from './components/Control'
import TastList from './components/TastList'
class App extends Component{

    constructor(props){
        super(props)
        this.state = {
            tasks : [],
            isDisplayForm :false,
            taskEditing:null,
            filter:{
                name:'',
                status:-1
            },
            keyword:'',
            sortBy: 'name',
            sortValue: 1
        }
    }
    componentDidMount(){
        if(localStorage && localStorage.getItem('tasks')){
            var tasks = JSON.parse(localStorage.getItem('tasks'))
            this.setState({
                tasks:tasks
            })
        }
    }
    
    s4(){
        return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1)
    }
    generateID(){
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4()  + this.s4()
         + this.s4() 
    }
    onToggleForm = () =>{
        if(this.state.isDisplayForm && this.state.taskEditing !== null){
            this.setState({
                isDisplayForm  : true,
                taskEditing:null
            })
        }
        else{
            this.setState({
                isDisplayForm  : !this.state.isDisplayForm,
                taskEditing:null
            })
        }
        
    }
    onCloseForm = () =>{
        this.setState({
            isDisplayForm  : false
        })
    }
    onSubmit = (data)=>{
        var {tasks} = this.state
        if(data.id === ''){
            data.id = this.generateID()
            tasks.push(data)
        }
        else{
            // Editting
            var index = this.findIndex(data.id)
            tasks[index] = data
        }
        this.setState({
            tasks:tasks,
            taskEditing:null
        })
        localStorage.setItem('tasks',JSON.stringify(tasks))
        
    }

    onUpDateStatus = (id) =>{
        var {tasks} = this.state
        var index = this.findIndex(id)
        
        if(index !== -1){
            tasks[index].status = !tasks[index].status
            this.setState({
                tasks: tasks
            })
            localStorage.setItem('tasks',JSON.stringify(tasks))
        }
        
    }

    findIndex = (id) =>{
        var {tasks} = this.state
        var result = -1
        tasks.forEach((task,index) =>{
            if(task.id === id){
                result = index
            }
        })
        return result
    }

    onRemoveItem = (id) =>{
        var {tasks} = this.state
        var index = this.findIndex(id)
        
        if(index !== -1){
            this.onCloseForm()
            tasks.splice(index,1)
            this.setState({
                tasks: tasks
            })
            localStorage.setItem('tasks',JSON.stringify(tasks))
        }
    }

    onUpdate = (id)=>{
        this.onToggleForm()
        var {tasks} = this.state
        var index = this.findIndex(id)
        var taskEditing = tasks[index]
        this.setState({
                taskEditing: taskEditing
            })
            
    }
    onFilter = (filterName,filterStatus)=> {
        filterStatus = parseInt(filterStatus,10)
        this.setState({
            filter:{
                name:filterName,
                status:filterStatus
            }
        })
    }

    onSearch=(keyword) =>{
       this.setState({
           keyword:keyword
       })
       
    }
    onSort = (sortBy,sortValue) =>{
        this.setState({
            sortBy: sortBy,
            sortValue: sortValue
        })
        
    }
    
    render(){
        var {tasks,isDisplayForm,taskEditing,filter,keyword,sortBy,sortValue} = this.state // var tasks = this.state.tasks
        if(filter){
            if(filter.name){
                tasks = tasks.filter((task,index) =>{
                    return task.name.toLowerCase().indexOf(filter.name) !== -1 
                })
            }
            
            tasks = tasks.filter((task) => {
                if(filter.status === -1){
                    return task
                }else{
                    return task.status === (filter.status === 1 ? true : false)
                }
            })
            
        }
        if(keyword){
            tasks = tasks.filter((task) =>{
                    return task.name.toLowerCase().indexOf(keyword) !== -1 
                })
        }
        var elmTaskForm = isDisplayForm 
                    ? <TastForm 
                            onCloseForm = {this.onCloseForm}
                            onSubmit = {this.onSubmit}
                            task = {taskEditing}
                            /> : ''

        if(sortBy === 'name'){
            tasks.sort((a,b) => {
                if(a.name > b.name) return sortValue
                else if(a.name < b.name) return -sortValue
                else return 0
            })
        }else{
            tasks.sort((a,b) => {
                if(a.status > b.status) return -sortValue
                else if(a.status < b.status) return sortValue
                else return 0
            })
        }
        return (
          <div className="container">
              <div className="text-center">
                  <h1>Qu???n L?? C??ng Vi???c</h1>
                  <hr/>
              </div>
              <div className="roWW">
                  <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ''}>
                     {elmTaskForm}
                  </div>
                  <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                      <button 
                        type="button" 
                        className="btn btn-primary mr-5"
                        onClick = {this.onToggleForm }
                        >
                        
                          <span className="fa fa-plus mr-5" ></span>Th??m C??ng Vi???c
                      </button>
                      
                      <div className="row">
                          
                          <Control 
                            onSearch = {this.onSearch}
                            onSort = {this.onSort}
                            sortBy= {sortBy}
                            sortValue = {sortValue}
                            />
                      </div>
                      <div className="row mt-15">
                          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              <TastList 
                                        tasks = {tasks} 
                                        onUpDateStatus = {this.onUpDateStatus}
                                        onRemoveItem ={this.onRemoveItem}
                                        onUpdate = {this.onUpdate}
                                        onFilter = {this.onFilter}
                                        />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        );
    }
}

export default App;
