import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Checkbox, Chip, TextField} from "@material-ui/core";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ApiService from '../../../ApiService';



export default class ProposalFormsCreate extends React.Component{
    constructor(props) {
        super(props);

        this.conference = props.conference || "Test conference";
        this.conferenceSection = props.conferenceSection || "Test conference section";
        this.deadline = props.deadline || "01/01/2001";

        // get from database
        this.keywords = [
            { keywordId: 1, name: 'methodology'},
            { keywordId: 2, name: 'visualisation'},
            { keywordId: 3, name: 'framework'},
        ];

        //get from database
        this.topics = [
            { topicId: 1, name: 'Machine Learning'},
            { topicId: 2, name: 'Cyber-security'},
        ];

        // get from database
        this.authors = [];
        this.fixedAuthors = [];

        this.state = {
            filledAuthors: [],
            selectedFile: '',
            isFilePicked: false,
            conferences: [],
            conferenceSelected: null,
            sectionSelected: null,
            deadline: this.deadline,
            fetching: 2
        }


        this.onSelectChange = this.onSelectChange.bind(this);
        this.fileHandleSubmission = this.fileHandleSubmission.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount(){
        this.getData();
    }

    getData(){
        ApiService.GetAllConferences(data => {
            this.setState({
                conferences: data,
                conferenceSelected: data.length>0?data[0]:null,
                fetching: this.state.fetching - 1
            });
        });
        ApiService.GetAllParticipants(data => {
            console.log(data);
            this.authors = data;
            this.fixedAuthors = [];
            for (var i = 0; i < this.authors.length; i++){
                if (this.authors[i].pid == localStorage.getItem('pid')){
                    this.fixedAuthors.push(this.authors[i]);
                }
            }
            this.setState({
                filledAuthors: [...this.fixedAuthors],
                fetching: this.state.fetching - 1
            });
        });

    }

    fileChangeHandler = event => {
        this.setState({selectedFile: event.target.files[0]});
        this.setState({isSelected: true});
    };

    // NEEDS MODIFICATION FOR OUR OWN DB (if we're going to store the files there)
    fileHandleSubmission(){
        //proposal: 
        let proposalName = document.getElementById('proposal-name').value;
        let fileName = this.state.selectedFile?this.state.selectedFile.name:'';
        let abstract = document.getElementById('abstract').value;

        let conferenceSectionId = document.getElementById('section-selector').value;
        let authors = this.state.filledAuthors.map(author => author.pid);

        ApiService.AddProposal({
            name: proposalName, filePath: fileName, paperAbstract: abstract
        }, success => {
            ApiService.GetAllProposals(data => {
                var proposalId = null;
                for (var i = 0; i < data.length; i++){
                    if (data[i].name == proposalName && data[i].filePath == fileName){
                        proposalId = data[i].proposalId;
                    }
                }
                if (proposalId == null) alert('Issue when creating authors.');
                else{
                    for (var j = 0; j < authors.length; j++){
                        ApiService.AddAuthor({
                            participantId: authors[j],
                            conferenceSectionId: conferenceSectionId,
                            proposalId: proposalId
                        }, success => {window.location.reload()}, error => {
                            alert('Error when adding an author: ' + error.message || error);
                        });
                    }
                }
            }, error => {
                alert('Failed to get proposals: ' + error.message || error);
            })
        }, error => {
            alert('Failed to add proposal: ' + error.message || error);
        })

        //authors:
        

        console.log(authors);
        console.log(conferenceSectionId);


    };

    onSelectChange(event){
        let id = event.target.id;
        let value = event.target.value;

        if (id == 'conference-selector'){
            console.log('conference selected to ' + value);
            for (var i = 0; i < this.state.conferences.length; i++){
                let c = this.state.conferences[i];
                if (c.conferenceId == value){
                    this.setState({conferenceSelected: c});
                }
            }
        }
    }

    render(){
        if (this.state.fetching) return <div>Fetching data...</div>

        const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
        const checkedIcon = <CheckBoxIcon fontSize="small" />;

        let conferenceOptions = this.state.conferences.map(c => {
            return (
                <option key={c.conferenceId} value={c.conferenceId}>{c.name}</option>
            );
        });
        let sectionsOptions = this.state.conferenceSelected == null?[] : this.state.conferenceSelected.conferenceSections.map(s => {
            return (
                <option key={s.conferenceSectionId} value={s.conferenceSectionId}>{s.name}</option>
            );
        });

        return (
            <div className="card card-danger">
                <div className="card-header">
                    <h3 className="card-title">Submit a proposal</h3>
                </div>
                <div className="card-body">

                    <div className="form-group">
                        <label>Name:</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-feather"></i></span>
                            </div>
                            <input id="proposal-name" type="text" className="form-control"/>
                        </div>
                    </div>

                    <div>
                        <Autocomplete
                            multiple
                            id="author-checkbox"
                            value={this.state.filledAuthors}
                            onChange={(event, newValue) => {
                                this.setState({filledAuthors: [
                                        ...this.fixedAuthors,
                                        ...newValue.filter((option) => this.fixedAuthors.indexOf(option) === -1),
                                    ]});
                            }}
                            options={this.authors}
                            getOptionLabel={(option) => option?option.name:"?"}
                            renderTags={(tagValue, getTagProps) =>
                                tagValue.map((option, index) => (
                                    <Chip
                                        label={option?option.name:"?"}
                                        {...getTagProps({ index })}
                                        disabled={this.fixedAuthors.indexOf(option) !== -1}
                                    />
                                ))
                            }
                            style={{ width: 500 }}
                            renderInput={(params) => (
                                <TextField {...params} label="Authors" variant="outlined" placeholder="Auth" />
                            )}
                        />
                    </div>
                    {false &&
                    <div className="form-group">
                        <Autocomplete
                            multiple
                            id="keyboard-checkbox"
                            options={this.keywords}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.name}
                            renderOption={(option, { selected }) => (
                                <React.Fragment>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.name}
                                </React.Fragment>
                            )}
                            style={{ width: 500 }}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" label="Keywords" placeholder="methodology" />
                            )}
                        />
                    </div>
                    }
                    {false &&
                    <div className="form-group">
                    <Autocomplete
                        multiple
                        id="topic-checkbox"
                        options={this.topics}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.name}
                        renderOption={(option, { selected }) => (
                            <React.Fragment>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.name}
                            </React.Fragment>
                        )}
                        style={{ width: 500 }}
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined" label="Topics" placeholder="Artificial Intelligence" />
                        )}
                    />
                    </div>
                    }

                    <div className="form-group">
                        <label>Conference:</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-feather"></i></span>
                            </div>
                            <select id="conference-selector" className="form-control" onChange={this.onSelectChange} autoComplete="off">
                                {conferenceOptions}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Conference Section:</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-feather"></i></span>
                            </div>
                            
                            <select id="section-selector" className="form-control" onChange={this.onSelectChange} autoComplete="off">
                                {sectionsOptions}
                            </select>
                        </div>
                    </div>


                    <div className="form-group">
                        <label>Abstract:</label>
                        <textarea id="abstract" className="form-control" rows="6" placeholder="Enter..."></textarea>
                    </div>
                </div>

                <div className="form-group">
                    <input type="file" name="file" onChange={this.fileChangeHandler} />
                </div>

                <div className="card-footer">
                    <button type="submit" className="btn btn-primary" onClick={this.fileHandleSubmission}>Submit</button>
                </div>
            </div>
        )
    }
}
