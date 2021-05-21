import React from 'react';


export default class ConferenceForms extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return (
            <div className="row">
                <div className="col-md-6">
                    <div className="card card-danger">
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
                                    <input type="text" className="form-control"/>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Start date:</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-feather"></i></span>
                                    </div>
                                    <input type="text" className="form-control" data-inputmask-alias="datetime" data-inputmask-inputformat="dd/mm/yyyy" data-mask/>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>End date:</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-feather"></i></span>
                                    </div>
                                    <input type="text" className="form-control" blabla="123" data-inputmask-alias="datetime" data-inputmask-inputformat="dd/mm/yyyy" data-mask inputMode="numeric"></input>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}