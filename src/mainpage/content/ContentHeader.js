import React from 'react';
import { Link } from 'react-router-dom';


export default class ContentHeader extends React.Component{
    constructor(props){
        super(props);
        this.title = props.title || 'Unnamed page';
        this.hierarchy = props.hierarchy || [{ name: this.title }];
    }

    render(){
        let hierarchyItems = this.hierarchy.map(page => {
            return <li key={page.name} className="breadcrumb-item"><Link to={page.to}>{page.name}</Link></li>
            
        });
        hierarchyItems.push(<li key={this.title} className="breadcrumb-item active">{this.title}</li>)
        return (
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>{ this.title }</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            { hierarchyItems }
                        </ol>
                    </div>
                    </div>
                </div>
            </section>

        )
    }
}