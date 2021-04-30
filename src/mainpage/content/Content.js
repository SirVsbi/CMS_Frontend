import React from 'react';
import ContentHeader from './ContentHeader';


export default class Content extends React.Component{
    constructor(props){
        super(props);
        this.title = props.title;
        this.hierarchy = props.hierarchy;
        this.content = props.content;
    }

    render(){
        return (
            <div className="content-wrapper">
                <ContentHeader title={this.title} hierarchy={this.hierarchy}/>
                <section className="content">
                    <div className="container-fluid">
                        { this.content }
                    </div>
                </section>
            </div>


        )
    }
}