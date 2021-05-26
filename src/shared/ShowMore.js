import React from "react";

export default class ShowMore extends React.Component{
    constructor(props) {
        super(props);

        this.showMoreLess = 'show more';
        this.text = props.data.text || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        this.shortText = this.text.substr(0, 50);
        this.buttonId = props.data.buttonId;
        this.document = props.data.document;

        this.state = { //state is by default an object
            textExpanded: false,
            textTruncated:false,
            showMoreLess: this.showMoreLess,
        };

        this.showMoreLessAction = this.showMoreLessAction.bind(this);
    }

    showMoreLessAction(){
        if (this.state.showMoreLess === 'show more'){
            this.showMoreAbstract();
        }
        else{
            this.showLessAbstract();
        }

        /**/
    }

    showMoreAbstract(){
        this.document.getElementById(this.state.buttonId).innerHTML = this.text;
        this.setState({showMoreLess: 'show less'});
    }

    showLessAbstract(){
        this.document.getElementById(this.state.buttonId).innerHTML = this.shortText;
        this.setState({showMoreLess: 'show more'});
    }

    render(){
        return (
            <div>
                <span id={this.state.buttonId} className={"showMore"}>
                    {this.paperAbstractShort}
                </span>
                <button onClick={() => this.showMoreLessAction()}>{this.state.showMoreLess}</button>
            </div>
    )
    }

    //this is how you use the component
    //<ShowMore data={{buttonId: "paperAbstract"+this.order, text: this.paperAbstract, document: document}}/>

}
