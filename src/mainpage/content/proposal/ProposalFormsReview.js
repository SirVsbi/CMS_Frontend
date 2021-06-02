import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Checkbox, Chip, FormControlLabel, TextField} from "@material-ui/core";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Rating from '@material-ui/lab/Rating'
import ProposalViewTable from "./ProposalViewTable";
import ApiService from "../../../ApiService";
import Error403 from '../errors/Error403';


export default class ProposalFormsReview extends React.Component{
    constructor(props) {
        super(props);

        this.id = parseInt(this.props.match.params.id) || null;
        // get from database
        let keywords = [
            { keywordId: 1, name: 'methodology'},
            { keywordId: 2, name: 'visualisation'},
            { keywordId: 3, name: 'framework'},
        ];

        //get from database
        let topics = [
            { topicId: 1, name: 'Machine Learning'},
            { topicId: 2, name: 'Cyber-security'},
        ];

        // get from database
        let authors = [{name: 'Szabolcs Vidam'}, {name: 'Bogdan Vasc'}, {name: 'Alexandra Tudorescu'}, {name: 'David Turcas'}, {name: 'Andrei Turcas'}, {name: 'Andrea Barrasa'}];

        this.proposal = props.proposal || {name: "Best proposal", paperAbstract: "Lorem ipsum", filePath: "../../../../public/testFiles/BestPaper.txt"};
        this.authors = props.authors || authors;
        this.keywords = props.keywords || keywords;
        this.topics = props.topics || topics;

        // the fixed author should be the user who is making the proposal
        this.state = {
            proposalId: this.id,
            proposalData: null,
            filledAuthors: [...this.authors],
            selectedFile: '',
            isFilePicked: false,
            conference: this.conference,
            conferenceSection: this.conferenceSection,
            deadline: this.deadline,
            authors: this.authors,
            keywords: this.keywords,
            topics: this.topics,
            proposal: this.proposal,
            rating: 0,

            user: null,
            fetching: true
        }

        this.fileHandleSubmission = this.fileHandleSubmission.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getProposalDetails(){
        console.log(this.state.proposalId);
        ApiService.GetProposalDetails(this.state.proposalId, data => {
            this.setState({
                proposalData: data,
            });

            ApiService.GetUserData(localStorage.getItem('pid'), data => {
                this.setState({
                    user: data,
                    fetching: false
                });
            }, error => {
                alert("Error when fetching user data: " + error.message || error);
            })

        }, error => {
            alert("Error when fetching proposal: " + error.message || error);
        });
    }

    fileChangeHandler = event => {
        this.setState({selectedFile: event.target.files[0]});
        this.setState({isSelected: true});
    };

    // NEEDS MODIFICATION FOR OUR OWN DB (if we're going to store the files there)
    fileHandleSubmission(){
        const formData = new FormData();

        formData.append('File', this.state.selectedFile);

        fetch(
            'https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>',
            {
                method: 'POST',
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    handleSubmit(event){
        event.preventDefault();
        const proposalId = this.state.proposalId;
        const justification = document.getElementById('justification').value;
        const qualifierId = this.state.rating;
        const reviewerId = this.state.reviewerId;

        let data = {
            proposalId: parseInt(proposalId),
            justification: justification,
            qualifierId: qualifierId,
            reviewerId: this.state.user.reviewer.reviewerId
        }
        console.log(data);
        ApiService.CreateReview(data, success => {
                this.setState({success: 'Review was registered'});
                window.location.reload();
            }, error => {
                this.setState({error: 'Failed to register review: ' + error.message || error});
            }
        );
        //this.fileHandleSubmission();
    }

    componentDidMount(){
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;

        document.body.appendChild(s);
        this.getProposalDetails();
    }

    render(){
        //alert(this.state.proposalId);

        //this.setState({filledAuthors: [...this.fixedAuthors, this.authors[2]]});
        if (!(localStorage.getItem('isReviewer') == 'true')){
            return (
                <Error403/>
            )
        }
        if (this.state.fetching) return (<span>Fetching data...</span>);

        const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
        const checkedIcon = <CheckBoxIcon fontSize="small" />;
        return (
            <div className="card card-danger">
                <form onSubmit={this.handleSubmit}>
                <div className="card-header">
                    <h3 className="card-title">Review proposal</h3>
                </div>
                <div className="card-body">

                    <div className="form-group">
                        <label>Rating:</label>
                        <br/>

                    <FormControlLabel
                        control={
                            <>
                                <input
                                    name="rating"
                                    type="number"
                                    value={this.state.rating}
                                    hidden
                                    readOnly
                                />
                                <Rating
                                    name="rating"
                                    value={this.state.rating}
                                    precision={1}
                                    max={7}
                                    onChange={(_, value) => {
                                        this.setState({rating: value});
                                    }}
                                />
                            </>
                        }
                    />
                    </div>


                    <div className="form-group">
                        <label>Justification:</label>
                        <textarea id='justification' className="form-control" rows="3" placeholder="Justify review..."></textarea>
                    </div>
                </div>

                <div className="card-footer">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                </form>
            </div>
        )
    }
}
