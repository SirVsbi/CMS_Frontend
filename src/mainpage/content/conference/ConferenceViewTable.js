import React from 'react';


export default class ConferenceViewTable extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return (
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th style={{width:"1%"}}>#</th>
                        <th style={{width:'20%'}}>Title</th>
                        <th style={{width:'15%'}}>Chair</th>
                        <th style={{width:'13%'}}>Start date</th>
                        <th style={{width:'20%'}}>Time left</th>
                        <th style={{width:"40px"}}>Status</th>
                        <th style={{width:'30%'}}></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1.</td>
                        <td>
                            <a>Placeholder conference</a>
                            <br/>
                            <small>Created on 22/05/2021</small>
                        </td>
                        <td>
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <img alt="Avatar" style={{borderRadius:'50%',display:'inline',width:'2.5rem'}} src="adminlte/dist/img/user_default.jpg"></img>
                                </li>
                                <li className="list-inline-item">
                                    <a>Bogdan Vasc</a>
                                </li>
                            </ul>
                        </td>
                        <td>22-05-2021 14:31</td>
                        <td className="project_progress">
                            <div className="progress progress-sm">
                                <div className="progress-bar bg-green" style={{width:'50%'}} role="progressbard" aria-valuenow="57" aria-valuemin="0" aria-valuemax="100"/>              
                            </div>
                            <small>3d 10h 25m left</small>
                        </td>
                        <td>        
                            <span className="badge bg-info">Bidding</span>
                        </td>
                        <td className="project-actions">
                            <button className="btn btn-primary btn-sm" style={{marginRight:'3px'}}>
                                <i className="fas fa-folder"/>
                                View
                            </button>
                            <button className="btn btn-info btn-sm" style={{marginRight:'3px'}}>
                                <i className="fas fa-pencil-alt"/>
                                Edit
                            </button>
                            <button className="btn btn-danger btn-sm" style={{marginRight:'3px'}}>
                                <i className="fas fa-trash"/>
                                Delete
                            </button>

                        </td>
                    </tr>
                </tbody>
            </table>
            
        )
    }
}