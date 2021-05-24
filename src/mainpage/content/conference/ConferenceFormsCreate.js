import React from 'react';

export default class ConferenceFormsCreate extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fields: {
                title: '',
                description: '',
                startDate: '',
                endDate: ''
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    componentDidMount(){
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.innerHTML = '$("#add-start-date").inputmask("dd/mm/yyyy", { "placeholder": "dd/mm/yyyy" });' +
                      '$("#add-end-date").inputmask("dd/mm/yyyy", { "placeholder": "dd/mm/yyyy" })';
        
        document.body.appendChild(s);
        
    }

    handleSubmit(event){
        event.preventDefault();
        const startDate = document.getElementById('add-start-date').value;
        const endDate = document.getElementById('add-end-date').value;
        const title = document.getElementById('add-title').value;
        const desc = document.getElementById('add-description').value;
        let fields = this.state.fields;
        fields.title = title;
        fields.startDate = startDate;
        fields.endDate = endDate;
        fields.description = desc;
        this.setState({fields: fields});

        console.log(this.state.fields);
    }

    render(){
        return (
            <div className="card card-danger">
                <form onSubmit={this.handleSubmit} noValidate>
                    <div className="card-header">
                        <h3 className="card-title">Create a conference</h3>
                    </div>
                    <div className="card-body">
                        
                        <div className="form-group">
                            <label>Title:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-feather"></i></span>
                                </div>
                                <input id="add-title" name="title" type="text" className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Start date:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-calendar-alt"></i></span>
                                </div>
                                <input name="startDate" type="text" id="add-start-date" className="form-control" data-inputmask-alias="datetime" data-inputmask-inputformat="dd/mm/yyyy" data-mask/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>End date:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-calendar-alt"></i></span>
                                </div>
                                <input name="endDate" type="text" id="add-end-date" className="form-control" blabla="123" data-inputmask-alias="datetime" data-inputmask-inputformat="dd/mm/yyyy" data-mask inputMode="numeric"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Description:</label>
                            <textarea id="add-description" name="description" className="form-control" rows="3" placeholder="Enter..."/>
                        </div>
                    </div>

                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        )
    }
}