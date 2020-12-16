import React, {useState} from "react";
import {Modal, Button} from "react-bootstrap";
import {Planet} from "../../core/planet";
import {SpaceMapCard} from "./SpaceMapCard";

export interface SpaceMapProps {
    show: boolean;
    setShow: (a: boolean) => void;
    data?: Array<Planet>;
}

export function SpaceMapWidget({show, setShow, data}: SpaceMapProps) {
    const [planet, setPlanet] = useState({name: ''});
    const setShowCard = (top: number, left: number, planetName: string) => {
        const card = document.querySelector('.spacemap-planet-card');
        setPlanet({name: planetName});
        card.classList.add("visible");
        card.style.left = left + 'px';
        card.style.top = top + 'px';
    };

    return (
        <React.Fragment>
            <Modal
                centered
                show={show}
                onHide={() => setShow(false)}
            >
                <Modal.Body className={"spacemap"}>
                    <div style={{height: "840px", textAlign: "center"}}>
                        <img
                            src={"./img/spacemap-close.png"}
                            className={"spacemap-close"}
                            onClick={() => setShow(false)}
                        />
                        <div className={"spacemap-vicrion"}>
                            <div>
                            <img
                                src={"./img/spacemap-vicrion.png"}
                                onClick={() => setShowCard(460, 530, 'VICRION')}
                            /><br />
                            <h6 className={"spacemap-planet-name"}>Vicrion</h6>
                            </div>
                        </div>
                        <div className={"spacemap-gocury"}>
                            <div>
                                <img
                                    src={"./img/spacemap-gocury.png"}
                                    onClick={() => setShowCard(60, 370, 'GOCURY')}
                                /><br />
                                <h6 className={"spacemap-planet-name"}>Gocury</h6>
                            </div>
                        </div>
                        <div className={"spacemap-uitania"}>
                            <div>
                                <img
                                    src={"./img/spacemap-uitania.png"}
                                    onClick={() => setShowCard(100, 790, 'UITANIA')}
                                /><br />
                                <h6 className={"spacemap-planet-name"}>Uitania</h6>
                            </div>
                        </div>
                        <div className={"spacemap-dion"}>
                            <div>
                                <img
                                    src={"./img/spacemap-dion.png"}
                                    onClick={() => setShowCard(300, 1030, 'DION ZJ97')}
                                />
                                <h6 className={"spacemap-planet-name"}>Dion ZJ97</h6>
                            </div>
                        </div>
                        <div className={"spacemap-ocao"}>
                            <div>
                                <img
                                    src={"./img/spacemap-ocao.png"}
                                    onClick={() => setShowCard(500, 930, 'OCAO')}
                                /><br />
                                <h6 className={"spacemap-planet-name"}>Ocao</h6>
                            </div>
                        </div>
                        <div className={"spacemap-thubeon"}>
                            <div>
                                <img
                                    src={"./img/spacemap-thubeon.png"}
                                    onClick={() => setShowCard(120, 1100, 'THUBEON')}
                                /><br />
                                <h6 className={"spacemap-planet-name"}>Thubeon</h6>
                            </div>
                        </div>
                        <div className={"spacemap-zutis"}>
                            <div>
                                <img
                                    src={"./img/spacemap-zutis.png"}
                                    onClick={() => setShowCard(520, 1020, 'ZUTIS')}
                                />
                                <h6 className={"spacemap-planet-name"}>Zutis</h6>
                            </div>
                        </div>
                        <SpaceMapCard data={planet}/>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}
