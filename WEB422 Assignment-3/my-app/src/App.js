import React from 'react';
import axios from 'axios'
import './App.css';
import TeamCard from './Cards';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';

const APITeams ='https://whispering-bayou-22423.herokuapp.com/teams-raw';

const APIEmployee ='https://whispering-bayou-22423.herokuapp.com/employees';

const APIProjects ='https://whispering-bayou-22423.herokuapp.com/projects';


class App extends React.Component {
  state = {
    teams: [],
    employees:[],
    projects:[],
    errors: null
  };

  getTeams() {
    axios

      .get(APITeams)

      .then(response => {
        this.setState({
          teams: response.data,
        });
      })
     
      .catch(err => window.alert(err));
  }
  getEmployees() {
    axios

      .get(APIEmployee)
  
      .then(response => {
        this.setState({
          employees: response.data,
        });
      })
     

      .catch(err => window.alert(err) );
  }

  getProjects(){
    axios
   
      .get(APIProjects)

      .then(response => {
        this.setState({
         projects: response.data,
        });
      })

      .catch(err => window.alert(err) );
  }

  componentDidMount() {
    this.getTeams();
    this.getEmployees();
    this.getProjects();
  }

  render() {
    const {  teams ,employees, projects} = this.state;
    return (
      <React.Fragment>
        <div>

         <CssBaseline />
         <AppBar position="relative">
        <Toolbar> 
          <Typography key="heading" variant="h6" color="inherit" noWrap>
            Assignment 3 - Team Details
          </Typography>
        </Toolbar> 
       </AppBar>

            {teams.map(team => 
            <TeamCard teamid={team} employees={employees} projects={projects}/>
            )}

        </div>
      </React.Fragment>
    );
  }
}

export default App;

