import React,{Component} from 'react'
import axios from 'axios'
var _ = require('lodash');


class TeamsPanel extends Component{  

  

  state = {
    teams:[],
  };

  getteams(){
    axios
   
      .get('https://whispering-bayou-22423.herokuapp.com/teams')

      .then(response => {
        this.setState({
         teams: response.data,
        });
      })

      .catch(err => window.alert(err) );
  }

  componentDidMount() {
    this.getteams();
  }

// getNumberOfEmployees(id){

// var team = _.filter(teams, { '_id':id})

//  return (team.Employees).length
    
// }
  


render(){

  const {teams}=this.state;
  var teamsArray=(teams).slice(0)

  console.log(teams);

    return (

<div className="panel panel-default">
                    <div className="panel-heading">
                      <h3 className="panel-title">Teams</h3>
                    </div>
                    <div className="panel-body">
                      <div className="table-responsive overview-table">
                        <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                          <th>Team Name</th>
                          <th>Number of Employees</th>

                          </tr>
                          </thead>

                         
                          {teamsArray.map (team => 
                 
                         
                          <tbody>
                          <tr>
                         
                          <td>{team.TeamName}</td>
                          <td>{(team.Employees.length)}</td>

                          </tr>
                          </tbody>

                          )}
                                            
                        </table>
                      </div>
                      <a href="/teams" className="btn btn-primary form-control">View All Team Data</a>
                    </div>
                  </div>
                 
        )
    }
}
export default TeamsPanel;