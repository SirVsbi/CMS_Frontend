import React from 'react';
import { useHistory } from "react-router-dom";


export default class ConferenceViewTableItem extends React.Component{
    constructor(props){
        super(props);

        this.order = props.order || "1.";
        this.title = props.title || "Untitled";
        this.createdOn = props.createdOn || "unknown";
        this.chairPicture = props.chairPicture || "adminlte/dist/img/user_default.jpg";
        this.chairName = props.chairName || "Unknown";
        this.startDate = props.startDate || "Unknown";
        this.endDate = props.endDate || "Unknown";
        this.timeLeft = '';
        this.timeDone = 0;

        this.deadline = props.deadline || "Unknown";

        let startDateUtc = Date.parse(this.startDate);
        let endDateUtc = Date.parse(this.endDate);
        let deadlineUtc = Date.parse(this.deadline);


        if (!isNaN(startDateUtc) && !isNaN(endDateUtc)){
            let now = Date.now();
            if (now >= startDateUtc){
                this.timeDone = (now-startDateUtc) / (endDateUtc - startDateUtc) * 100;
                let difSecs = Math.floor((endDateUtc - now)/1000);
                let d = Math.floor(Math.floor(Math.floor(difSecs/60)/60)/24)%24;
                let h = Math.floor(Math.floor(difSecs/60)/60)%60;
                let m = Math.floor(difSecs/60)%60;
                let s = difSecs % 60;
                let twodig = function(v){
                    if (v===0) return '00';
                    if (v<10) return '0'+v;
                    return v;
                }
                this.timeLeft = twodig(d)+'d '+twodig(h)+'h '+twodig(m)+'m '+twodig(s)+'s Left';
            }else{
                this.timeDone = 0;
                this.timeLeft = 'Has not started yet!';
            }
        }

        this.possibleStatus = {
            'bidding': {title: 'Bidding', className: 'bg-info'},
            'review': {title: 'In review', className: 'bg-warning'},
            'closed': {title: 'Closed', className: 'bg-danger'} 
        }
        this.status = this.possibleStatus[props.status] || this.possibleStatus['bidding'];
        this.canView = (props.canView!==undefined?props.canView:true);
        this.canEdit = (props.canEdit!==undefined?props.canEdit:true);
        this.canDelete = (props.canDelete!==undefined?props.canDelete:true);

        this.canSubmit = Date.now() < deadlineUtc;
    }

    render(){
        return (
            <tr>
                <td>{this.order}</td>
                <td>
                    <span>{this.title}</span>
                    <br/>
                    <small>Created on {this.createdOn}</small>
                </td>
                <td>
                    <div className="list-inline">
                        <div key="avatar" className="list-inline-item">
                            <img alt="Avatar" style={{borderRadius:'50%',display:'inline',width:'2.5rem'}} src={this.chairPicture}></img>
                        </div>
                        <div key="name" className="list-inline-item">
                            <a href="/ws/profile">{this.chairName}</a>
                        </div>
                    </div>
                </td>
                <td>{this.startDate}</td>
                <td className="project_progress">
                    <div className="progress progress-sm">
                        <div className="progress-bar bg-green" style={{width:this.timeDone+'%'}} role="progressbar" aria-valuenow={this.timeDone} aria-valuemin="0" aria-valuemax="100"/>              
                    </div>
                    <small>{this.timeLeft}</small>
                </td>
                <td>{this.deadline}</td>
                <td>        
                    <span className={"badge " + this.status.className}>{this.status.title}</span>
                </td>
                <td className="project-actions" key={this.order}>
                    {this.canView &&
                        <button className="btn btn-primary btn-sm" style={{marginRight:'3px'}}>
                            <i className="fas fa-folder"/>
                            View
                        </button>
                    }
                    {this.canEdit &&
                        <button className="btn btn-info btn-sm" style={{marginRight:'3px'}}>
                            <i className="fas fa-pencil-alt"/>
                            Edit
                        </button>
                    }
                    {this.canDelete && 
                        <button className="btn btn-danger btn-sm" style={{marginRight:'3px'}}>
                            <i className="fas fa-trash"/>
                            Delete
                        </button>
                    }
                    {this.canSubmit &&
                    <button className="btn btn-info btn-sm" style={{marginRight:'3px'}} onClick={event =>  window.location.href='../ws/paper/create'}>
                        <i className="fas fa-file-upload"/>
                        Submit
                    </button>
                    }
                </td>
            </tr>
            
        )
    }
}
