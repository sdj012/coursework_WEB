import React,{Component} from 'react'
import MainContainer from './MainContainer';
import moment from 'moment';
import axios from 'axios'
var _ = require('lodash');

class Projects extends Component{  

            state = {
                projects:[],
              };
        
              getProjects(){
                axios
               
                  .get('https://whispering-bayou-22423.herokuapp.com/projects')
            
                  .then(response => {
                    this.setState({
                     projects: response.data,
                    });
                  })
            
                  .catch(err => window.alert(err) );
              }
        
              componentDidMount() {
                this.getProjects();
              }
        
        
        
            render(){
        
                const {projects}=this.state;
        
                var projectsArray=(projects).slice(0)
        
                var currentDate=moment();
        
                return (

                    <MainContainer>
        
                        <div className="panel panel-default">
                            <div className="panel-heading">
                              <h3 className="panel-title">Projects</h3>
                            </div>
                            <div className="panel-body">
                              <div className="table-responsive overview-table">

                                <table className="table table-striped table-bordered">
                                <thead>
                                <tr>
                                <th scope="col">Project Name</th>
                                <th scope="col">Project Description</th>
                                <th scope="col">Project Start Date</th>
                                <th scope="col">Project End Date</th>
                                </tr>
                                </thead>
        
                                {projectsArray.map (project => 
                            
                                <tbody>
                                <tr>
                                <td scope="row">{project.ProjectName}</td>
                                <td scope="row">{project.ProjectDescription}</td>
                                <td scope="row">{moment(project.ProjectStartDate).format('LL')}</td>
                                <td scope="row">{moment(project.EndDate).format('LL')}</td>
             
        
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
        
export default Projects;

