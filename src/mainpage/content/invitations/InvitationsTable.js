import React from 'react';


export default class InvitationsTable extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            data: props.data || [],
            all: props.all || [],
            onAdd: props.onAdd,
            title: props.title,
            vid: props.vid,
            success: "",
            error: ""
        }

        this.addOnClick = this.addOnClick.bind(this);

    }

    addOnClick(){
        let pid = document.getElementById('add-'+this.state.vid).value
        this.state.onAdd(pid);
    }

    render(){
        let order = 0;
        let tableItems = this.state.data.map(d => {
            if (!d.participant) return;
            order++;
            return (
                <tr key={d.chairId}>
                    <th>{order+'.'}</th>
                    <th style={{width: '5%'}}>{d.participant.userName}</th>
                    <th style={{width: '5%'}}>{d.participant.name}</th>
                    <th style={{width: '5%'}}><button>Remove</button></th>
                </tr>
            )
        });

        let options = this.state.all.map(user => {
            return (
                <option key={user.pid} value={user.pid}>{user.userName}</option>
            )
        });

        return (
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">{this.state.title}</h3>
                </div>
                <div className="card-body">
                    {this.state.error &&
                        <div className="alert alert-danger" role="alert">
                            {this.state.error}
                        </div>
                    }
                    {this.state.success &&
                        <div className="alert alert-success" role="alert">
                            {this.state.success}
                        </div>
                    }
                    <table className="table table-stripped">
                        <thead>
                            <tr>
                                <th style={{width: "1%"}}>#</th>
                                <th style={{width: '5%'}}>Username</th>
                                <th style={{width: '5%'}}>Fullname</th>
                                <th style={{width: '5%'}}>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableItems}
                        </tbody>
                    </table>
                </div>

                <div className="card-footer">
                    <div className="form-group">
                        <label>Add user:</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fab fa-redhat"></i></span>
                            </div>
                            <select id={"add-"+this.state.vid} className="form-control">
                                {options}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.addOnClick}>Add</button>
                </div>
            
                
            </div>
            
        )
    }
}
