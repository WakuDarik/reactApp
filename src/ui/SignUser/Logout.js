import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logouyUserTC } from "../../redux/auth-reducer";

class LogoutPage extends React.Component {

    componentWillMount () {
        this.props.logouyUserTC()
    }

    render () {
        return (
            <Redirect to="/" />
        );
    }

}

export default connect(null, { logouyUserTC })(LogoutPage);