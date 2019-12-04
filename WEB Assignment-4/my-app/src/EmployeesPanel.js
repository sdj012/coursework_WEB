import React,{Component} from 'react'
import axios from 'axios'

class EmployeesPanel extends Component{  

    state = {
        employees:[],
      };
    
      getemployees(){
        axios
       
          .get('https://whispering-bayou-22423.herokuapp.com/employees')
    
          .then(response => {
            this.setState({
             employees: response.data,
            });
          })
    
          .catch(err => window.alert(err) );
      }
    
      componentDidMount() {
        this.getemployees();
      }
    

    render(){

        const {employees}=this.state;

        var employeesArray=(employees).slice(0)

        return (

        <div className="panel panel-default">
        <div className="panel-heading">
        <h3 className="panel-title">Employees</h3>
        </div>
        <div className="panel-body">
        <div className="table-responsive overview-table">
            <table className="table table-striped table-bordered">

            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Position</th>
              </tr>
            </thead>
            {employeesArray.map (employee => 

            <tbody>
            <tr>


            <td>{employee.FirstName} {employee.LastName} </td>
            <td>{employee.Position.PositionName}</td>


            </tr>
            </tbody>

            )}

            </table>
        </div>
        <a href="/employees" className="btn btn-primary form-control" >View All Employee Data</a>
        </div>
        </div>
        )
    }
}

export default EmployeesPanel;