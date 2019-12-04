import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },

  heading:{
    padding: theme.spacing(0,25,0),
  },

  formControl: {
    maxWidth: '100%',
    minWidth: 150,
    marginBottom: theme.spacing(2)
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  button: {
    margin: theme.spacing(1,25,1),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  cardContent: {
    flexGrow: 3,
  },
}));

const cards = [1];

export default function TeamCard(props) {

  const [TeamLead, setTeamLead] = React.useState(props.teamid.TeamLead);

  const [Employee,setEmployees] = React.useState(props.employees);

  const [Projects, setProjects] = React.useState(props.projects);

  var employeeArray=(props.employees).slice(0);
  var projectsArray=(props.projects).slice(0);

  function ChangeTeamLead(event) {
    setTeamLead(event.target.value)
  }

  function ChangeEmployee(event) {
    setEmployees(event.target.value)
  }

  function ChangeProject(event) {
    setProjects(event.target.value)
  }

  const classes = useStyles();

  function RetrieveTeamLeadName(id){

    for(var i =0 ; i <employeeArray.length ;i++){
      if (employeeArray[i]._id == id) {
        return employeeArray[i].FirstName +" "+ employeeArray[i].LastName
      }
     
    }
  }

  function RetrieveEmployeeName(id) {
    for(var i =0 ; i <employeeArray.length ;i++){
      if (employeeArray[i]._id == id) {
        return employeeArray[i].FirstName +" "+ employeeArray[i].LastName
      }
   }
  } 

  function RetrieveProjectName(id){
      for(var i =0 ; i <projectsArray.length ;i++){
        if (projectsArray[i]._id == id) {
          return projectsArray[i].ProjectName
        }
    }
  }

  function Submit(){

      axios.put('https://whispering-bayou-22423.herokuapp.com/team/' + props.teamid._id,
                {
                    TeamLead,
                    Employees: Employee,
                    Projects:Projects,
                })
                .then(response => window.alert(response.data.message))
                .catch(err => window.alert(err))
                
  }


  return (

    <React.Fragment>
      <main>
        <Container className={classes.cardGrid} maxWidth="sm">
        <Card>
          <CardContent className={classes.cardContent}>
          <CardHeader className={classes.heading} title={props.teamid.TeamName}> </CardHeader>
            
      

                    <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="team-lead-select" >Team Lead</InputLabel>
                    <Select  
                    variant="outlined"
                    single="true"
                    autoWidth={true}
                    value={TeamLead}
                    onChange={ChangeTeamLead}
                    input={<Input />}
                    id="team-lead-select"
                    renderValue={selected => RetrieveTeamLeadName(selected)}>
                        {
                              props.employees.map(emp =>
                                <MenuItem key={emp} value={emp}>
                                  <ListItemText key={emp} primary={emp.FirstName + " " + emp.LastName} />
                                </MenuItem>)       
                        }
                    </Select>
                </FormControl>

                <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel  htmlFor="team-member-select" >Members</InputLabel>
                    <Select 
                    value={Employee}
                    onChange={ChangeEmployee}
                    multiple
                    autoWidth={true}
                    input={<Input />}
                    id="team-member-select"
                    variant="outlined"
                    renderValue={selected => RetrieveEmployeeName(selected)}>
                        {
                         props.employees.map(emp =>
                          <MenuItem key={emp} value={emp}>
                            <ListItemText key={emp} primary={emp.FirstName + " " + emp.LastName} />
                          </MenuItem>)       
                        }
                    </Select>
                </FormControl>

                <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel  flex="true" htmlFor="team-project-select">Projects</InputLabel>
                    <Select  
                    id="team-project-select"
                    value={Projects}
                    onChange={ChangeProject}
                    single="true" 
                    autoWidth={true} 
                    variant="outlined"
                    renderValue={selected => RetrieveProjectName(selected)}>
                    {
                         props.projects.map(emp =>
                          <MenuItem key={emp} value={emp}>
                            <ListItemText key={emp} primary={emp.ProjectName} />
                          </MenuItem>) 
                                
                        }
                    </Select>
                </FormControl>
              </CardContent>
              <Button
                                
               variant="contained"
                color="primary"
              className={classes.button}
              onClick={Submit}>
                            
                Update
              </Button>
            </Card>
        </Container>
      </main>
    </React.Fragment>
  );
     
}

