import React from "react";
export default class Error403 extends React.Component {

    render(){
        return (
            <div className="error-page">
                <h2 className="headline text-danger">405</h2>
                <div className="error-content">
                    <h3><i className="fas fa-exclamation-triangle text-danger" /> Oops! Forbidden place.</h3>
                    <p>
                        You do not have enough permissions to be on this page.
                        Meanwhile, you may <a href="/ws">return to dashboard</a> or contact the administrator.
                    </p>
                </div>
            </div>

        );
    }
}
