import React from 'react';
import ReviewViewTable from './ReviewViewTable';
import ApiService from "../../../../ApiService";


export default class ReviewView extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            data: [],
            fetching: true
        }

    }

    getData(){
        ApiService.GetAllReviews(data => {
            this.setState({data: data, fetching: false});
        }, error => {
            alert('Failed getting conferences! Error: ' + (error.message || error));
        });
    }

    componentDidMount(){
        this.getData();
    }

    render(){
        if (this.state.fetching){
            return (
                <span>Fetching data...</span>
            )
        }
        return (
            <div className="row">
                <div className="">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Reviews</h3>
                        </div>
                        <div className="card-body">
                            <ReviewViewTable data={this.state.data}/>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
