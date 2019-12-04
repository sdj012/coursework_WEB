import React,{Component} from 'react'
import MainContainer from './MainContainer';
import moment from 'moment';
import axios from 'axios'
var _ = require('lodash');

class Teams extends Component{  

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


    return (
    
        <MainContainer>
            <div className="panel panel-default">
                    <div className="panel-heading">
                      <h3 className="panel-title">Teams</h3>
                    </div>
                    <div className="panel-body">
                      <div className="table-responsive overview-table">
                        <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                            <th scope="col">Team Name</th>
                            <th scope="col">Projects</th>
                            <th scope="col">Employees</th>
                            <th scope="col">Team Lead</th>
                            </tr>
                        </thead>

                      

                          {teamsArray.map (team =>
                            <tbody>
                            <tr> 

                          <td scope="row">{team.TeamName}</td>
                          <td scope="row">

                          {team.Projects.map (project=> 
                            <ul>{project.ProjectName}</ul>
                          )}

                            </td>
                        <td scope="row">{(team.Employees.length)}</td>
                          <td scope="row">{team.TeamLead.FirstName} {team.TeamLead.LastName}</td>
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
export default Teams;