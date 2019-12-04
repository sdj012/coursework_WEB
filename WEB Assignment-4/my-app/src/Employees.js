import React,{Component} from 'react'
import moment from 'moment';
import axios from 'axios'
import MainContainer from './MainContainer';
var _ = require('lodash');

class Employees extends Component{  

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

        <MainContainer>

        <div className="panel panel-default">
        <div className="panel-heading">
        <h3 className="panel-title">Employees</h3>
        </div>
        <div className="panel-body">

        <div className="table-responsive overview-table">
            <table className="table table-striped table-bordered">

            <thead>
                <tr>
                <th scope="col">Name & Position</th>
                <th scope="col">Address</th>
                <th scope="col">Phone Number</th>
                </tr>
            </thead>

            {employeesArray.map (employee => 

            <tbody>
            <tr>


            <td scope="row">{employee.FirstName} {employee.LastName} , {employee.Position.PositionName}</td>
            <td scope="row">{employee.AddressStreet} {employee.AddressCity} {employee.AddressState} {employee.AddressZip}</td>
            <td scope="row">{employee.PhoneNum}</td>

            </tr>
            </tbody>

            )}

            </table>
        </div>

        </div>
        </div>
        </MainContainer>


     
       
        )
    }
}

export default Employees;