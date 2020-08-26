import React from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logouyUserTC } from '../../redux/auth-reducer';

const Header = (props) => {
    return <>
        <div className="d-flex align-items-center jcsb">
            <a href="tel:000-000-00-00" className="call_us">+000-000-00-00</a>
            <div className="ml-auto">
                <div className="position-relative mr-3 login-user-menu">
                    <div className="d-sm-inline-block ml-sm-auto">
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item mr-0">
                                <NavLink className="u-header__navbar-link" to="/list">List</NavLink>
                            </li>
                            <li className="list-inline-item mr-0">
                                <NavLink className="u-header__navbar-link" to="/contestlist">Contest List</NavLink>
                            </li>
                            <li className="list-inline-item mr-0">
                                <NavLink className="u-header__navbar-link" to="/launchcontest">Start contest</NavLink>
                            </li>
                            {props.isAuth
                                ? <>
                                    <li className="list-inline-item mr-0">
                                        <NavLink className="u-header__navbar-link" to="/profile">Profile</NavLink>
                                    </li>
                                    <li className="list-inline-item mr-0">
                                        <NavLink to={`/logout`} onClick={props.logoutUser}>Exit</NavLink>
                                    </li>
                                </>
                                : <>
                                    <li className="list-inline-item mr-0">
                                        <NavLink className="u-header__navbar-link" to="/login">Login</NavLink>
                                    </li>
                                    <li className="list-inline-item mr-0">
                                        <NavLink className="u-header__navbar-link" to="/signup">Signup</NavLink>
                                    </li>
                                </>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
}

class HeaderContainer extends React.Component {
    render () {
        return <Header isAuth={this.props.isAuth} logoutUser={this.props.logouyUserTC} />
    }
}
let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
    };
};



export default connect(mapStateToProps, { logouyUserTC })(HeaderContainer);
