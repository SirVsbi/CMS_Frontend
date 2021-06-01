import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Checkbox, Chip, TextField} from "@material-ui/core";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';



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
        this.authors = [{name: 'Szabolcs Vidam'}, {name: 'Bogdan Vasc'}, {name: 'Alexandra Tudorescu'}, {name: 'David Turcas'}, {name: 'Andrei Turcas'}, {name: 'Andrea Barrasa'}];

        // the fixed author should be the user who is making the proposal
        this.fixedAuthors = [this.authors[1]];
        this.state = {
            filledAuthors: [...this.fixedAuthors, this.authors[2]],
            selectedFile: '',
            isFilePicked: false,
            conference: this.conference,
            conferenceSection: this.conferenceSection,
            deadline: this.deadline,
        }

        this.fileHandleSubmission = this.fileHandleSubmission.bind(this);
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

    componentDidMount(){
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;

        document.body.appendChild(s);
    }

    render(){

        //this.setState({filledAuthors: [...this.fixedAuthors, this.authors[2]]});

        const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
        const checkedIcon = <CheckBoxIcon fontSize="small" />;
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
                            <input type="text" className="form-control"/>
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
                            getOptionLabel={(option) => option.name}
                            renderTags={(tagValue, getTagProps) =>
                                tagValue.map((option, index) => (
                                    <Chip
                                        label={option.name}
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


                    <div className="form-group">
                        <label>Conference:</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-feather"></i></span>
                            </div>
                            <input type="text" className="form-control" defaultValue={this.state.conference}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Conference Section:</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-feather"></i></span>
                            </div>
                            <input type="text" className="form-control" defaultValue={this.conferenceSection}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Deadline:</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-calendar-alt"></i></span>
                            </div>
                            <input type="text" id="add-start-date" className="form-control" data-inputmask-alias="datetime" data-inputmask-inputformat="dd/mm/yyyy" data-mask value={'01/01/2001'}/>
                        </div>
                    </div>


                    <div className="form-group">
                        <label>Abstract:</label>
                        <textarea className="form-control" rows="3" placeholder="Enter..."></textarea>
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
