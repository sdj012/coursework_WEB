import React,{Component} from 'react'
import axios from 'axios'
import moment from 'moment';


class ProjectsPanel extends Component{  

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

                <div className="panel panel-default">
                    <div className="panel-heading">
                      <h3 className="panel-title">Projects</h3>
                    </div>
                    <div className="panel-body">
                      <div className="table-responsive overview-table">
                        <table className="table table-striped table-bordered">

                        <thead>
                          <tr>
                          <th>Project Name</th>
                          <th>Number of Active Days</th>

                          </tr>
                        </thead>

                        {projectsArray.map (project => 

                        <tbody>
                        <tr>

                      
                        <td>{project.ProjectName}</td>
                        <td>Active {(currentDate).diff(moment(project.ProjectStartDate),'days')} Days </td>
     

                        </tr>
                        </tbody>

                        )}

                        </table>

                      </div>
                      <a href="/projects" className="btn btn-primary form-control">View All Project Data</a>
                    </div>
                  </div>

        )

        }
}

export default ProjectsPanel;