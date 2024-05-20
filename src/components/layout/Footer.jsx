import React from 'react';
import {Col, Container, Row} from "react-bootstrap";


const Footer = () => {
    let today = new Date();
    return (
        <footer className="footer bg-dark text-light py-3 mt-lg-5">
            <Container>
                <Row>
                    <Col className="text-center" xs={12} md={12}>
                        <p className={"mb-0"}>
                            &copy; {today.getFullYear()} All Rights Reserved
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;