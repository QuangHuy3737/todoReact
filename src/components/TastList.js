import React,{Component} from 'react'
import TastItem from './TastItem'
class TastList extends Component{

    constructor(props){
        super(props)
        this.state = {
            filterName : '',
            filterStatus :-1 // all -1,active :1,deactive:0
        }
    }
    onChange = (event)=>{
        var target = event.target
        var name = target.name
        var value = target.value
        
        this.setState({
            [name]:value
        })
        this.props.onFilter(
            this.state.filterName,
            this.state.filterStatus
        )
    }   
    render(){
        var {tasks} = this.props
        var {filterName,filterStatus} = this.state
        var elmTasks = tasks.map((task,index) => {
            return <TastItem 
                    key = {task.id} 
                    index = {index} 
                    task = {task}
                    onUpDateStatus = {this.props.onUpDateStatus}
                    onRemoveItem = {this.props.onRemoveItem}
                    onUpdate = {this.props.onUpdate}
                    />
        })
        return (
          <table className="table table-bordered table-hover">
            <thead>
                <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Trạng Thái</th>
                    <th className="text-center">Hành Động</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>
                        <input 
                            type="text" 
                            className="form-control"  
                            name = "filterName"
                            value = {filterName}
                            onChange = {this.onChange}
                            />
                    </td>
                    <td>
                        <select 
                            className="form-control" 
                            name ="filterStatus"
                            value = {filterStatus}
                            onChange = {this.onChange}
                            >
                            <option value="0">Tất Cả</option>
                            <option value="1">Ẩn</option>   
                            <option value="-1">Kích Hoạt</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                {elmTasks}
            </tbody>
        </table>
        );
    }
}

export default TastList;
