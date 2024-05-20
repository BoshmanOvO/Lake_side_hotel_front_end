import React from 'react';
import {Link} from "react-router-dom";
import {NavLink} from "react-bootstrap";

const NavBar = () => {
    return (
        <nav className={'navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top'}>
            <div className={'container-fluid'}>
                <Link to={"/"}>
                    <span className={'navbar-brand'}>LakeSide Hotel</span>
                </Link>
                <button className={'navbar-toggler'} type={'button'} data-bs-toggle={'collapse'} data-bs-target={'#navbarNav'}
                        aria-controls={'navbarNav'} aria-expanded={'false'} aria-label={'Toggle navigation'}>
                    <span className={'navbar-toggler-icon'}>

                    </span>
                </button>
                <div className={'collapse navbar-collapse'} id={'navbarNav'}>
                    <ul className={'navbar-nav ms-auto'}>
                        <li className={'nav-item'}>
                            <NavLink to={'/browse-all-rooms'} className={'nav-link'}>
                                Browse All Rooms
                            </NavLink>
                        </li>
                        <li className={'nav-item'}>
                            <NavLink to={'/admin'} className={'nav-link'}>
                                Admin
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;



