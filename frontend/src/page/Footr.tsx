/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 28/08/2023 - 10:11:02
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 28/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React from "react";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';


import { Col, Container, Row } from "react-bootstrap";

function Footr() {
    return (
<div className="footer-wrapper bg-primary text-white py-5" style={{ height: '100%' }}>
            <Container>
                <Row className="border-bottom pb-4">
                    <Col lg={2} className="d-none d-lg-block"></Col>
                </Row>

                <Row className="mt-5">
                    <Col lg={3} className="mb-4">
                        <div className="footer-section">
                            <h6 className="text-center">
                                <Link className="text-white text-decoration-none" to="/">
                                    My-App
                                </Link>
                            </h6>
                            <p className="text-center">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora nesciunt, incidunt tempore maxime similique
                                explicabo eum quis laboriosam perspiciatis ipsum aut ipsam facilis adipisci ducimus? Voluptates aut tempora
                                aperiam qui!
                            </p>
                        </div>
                    </Col>
                    <Col lg={3} className="mb-4 text-center">
                        <div className="footer-section text-reset fw-bold text-white">
                            <h6>Produit :</h6>
                            <Link to="/Homme" className=" text-reset fw-bold text-white ">
                                <p>
                                    <i> Voir les cours </i>
                                </p>
                            </Link>
                        </div>
                    </Col>
                    <Col lg={3} className="mb-4">
                        <div className="footer-section contact-address">
                            <h6>Contact:</h6>
                            <div className="social-links mt-0">
                                <a
                                    href="https://www.facebook.com/formation.teg/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="facebook social mx-3"
                                    title="Go to Facebook"
                                >
                                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                                </a>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://www.instagram.com/accounts/login/?next=/myshop.fr/"
                                    className="instagram social mx-3"
                                    title="Go to Instagram"
                                >
                                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                                </a>
                            </div>
                            <p className="mt-3">
                                <FontAwesomeIcon icon={faEnvelope} className="me-1" />
                                <a href="mailto:benamaierabelgacem@gmail.com" className="text-white">benamaierabelgacem@gmail.com</a>
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faPhone} className="me-2" />
                                <a href="https://wa.me/21693287025" target="_blank" rel="noreferrer" className="text-white">
                                    +216 93287025
                                </a>
                            </p>
                        </div>
                    </Col>
                    <Col lg={3} className="mb-4">
                        <div className="footer-section">
                            <h6>Adresse :</h6>
                            <p className="text-white">Ariana 2080</p>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12767.633318478418!2d10.185495!3d36.868613!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x18230110ecd2e03c!2smyshop!5e0!3m2!1sfr!2stn!4v1661690445830!5m2!1sfr!2stn"
                                width="100%"
                                height="120"
                                loading="lazy"
                                title="Google Maps"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </Col>
                </Row>

                <Row className="text-center pt-5">
                    <Col>
                        <p className="mb-0">
                            © 2023 Copyright:{" "}
                            <Link className="text-reset fw-bold text-white" to="/">
                                <span className="text-reset fw-bold text-white">My-App<span className="dot-com">.com</span></span>
                            </Link>


                        </p>
                    </Col>
                </Row>
            </Container>
        </div>





    );
}
export default Footr;