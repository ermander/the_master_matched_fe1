import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { Switch, Button } from 'ui-neumorphism'
import React, { Component } from 'react';
import Navbar from "../../Navbar/Navbar"
import authAxios from "../../../Utils/http"
import "./OfflineTrimatcher.css"
import CashbackTable from '../Dutcher/CashbackTable';
import NewCashBackBookmaker from '../Dutcher/NewCashBackBookmaker';

class Trimatcher extends Component {

    state = {
        loadingBookmakers: true,
        cashbackBookOne: true,
        cashbackBookTwo: true,
        cashbackBookThree: true,
        cashbackBookOneName: "",
        cashbackBookTwoName: "",
        cashbackBookThreeName: "",
        stake: "",
        showBetInfo: false,
        quotaPuntaUno: "",
        quotaPuntaDue: "",
        quotaPuntaTre: "",
        betInfo: {},
        showMissingAlert: false,        
        bookmakers: []
    }

    fetchBookmakers = async () => {
        if (this.state.loadingBookmakers === false) this.setState({loadingBookmakers: true})
        const response = await authAxios("/cashback-bookmakers/get-bookmakers")
        const bookmakers = await response.data
        this.setState({bookmakers: bookmakers})
        this.setState({loadingBookmakers: false})
    }

    // Function for calculatin the ROIs anche Ratings
    calculateRoi = () => {
        if(this.state.quotaUno === "" || this.state.quotaPuntaDue === "" || this.state.quotaPuntaTre === "" || this.state.stake === ""){
            this.setState({showMissingAlert: true})
            setTimeout(() => this.setState({showMissingAlert: false}), 2000)
        }else{
            // Parsing the odds from string to float numbers
            const quotaUno = parseFloat(this.state.quotaPuntaUno)
            const quotaDue = parseFloat(this.state.quotaPuntaDue)
            const quotaTre = parseFloat(this.state.quotaPuntaTre)
            // Parsing the stake from string to integer number
            const stake = parseInt(this.state.stake)
            // Calculating the second stake
            const contropuntaUno = Math.floor((this.state.stake * quotaUno) / quotaDue)
            // Calculating the third stake
            const contropuntaDue = Math.floor((this.state.stake * quotaUno) / quotaTre)
            // Saving the cashback percentages for the three bookmakers
            const bookmakerOne = this.state.cashbackBookOneName === "" ? 0 : this.state.bookmakers.find( book => book.name === this.state.cashbackBookOneName)
            const cashbackPercentageOne = bookmakerOne === 0 ? 0 : parseFloat(bookmakerOne.cashback)

            const bookmakerTwo = this.state.cashbackBookTwoName === "" ? 0 : this.state.bookmakers.find( book => book.name === this.state.cashbackBookTwoName)
            const cashbackPercentageTwo = bookmakerTwo === 0 ? 0 : parseFloat(bookmakerTwo.cashback)

            const bookmakerThree = this.state.cashbackBookThreeName === "" ? 0 : this.state.bookmakers.find( book => book.name === this.state.cashbackBookThreeName)
            const cashbackPercentageThree = bookmakerThree === 0 ? 0 : parseFloat(bookmakerThree.cashback)

            // ROI
            const rawRoi = ((quotaUno * stake) - stake - contropuntaUno - contropuntaDue + cashbackPercentageOne + cashbackPercentageTwo + cashbackPercentageThree)
            const Roi = rawRoi.toFixed(2)

            // Rating
            const oddOneToPercentage = 1 / quotaUno
            const oddTwoToPercentage = 1 / quotaDue
            const oddThreeToPercentage = 1 / quotaTre
            const rawRating = 100 - ((oddOneToPercentage + oddTwoToPercentage + oddThreeToPercentage) * 100 - 100) 
            const rating = rawRating.toFixed(2)

            this.setState({
                betInfo: {
                    Roi: Roi,
                    rating: rating,
                    stake: stake,
                    contropuntaUno: contropuntaUno,
                    contropuntaDue: contropuntaDue,
                },
                showBetInfo: true
            })
        }
    }

    setCashbackOne = () => {
        this.state.cashbackBookOne === true ? this.setState({
            cashbackBookOne: false,
            cashbackBookOneName: ""
        }) : this.setState({cashbackBookOne: true})
    }

    setCashbackTwo = () => {
        this.state.cashbackBookTwo === true ? this.setState({
            cashbackBookTwo: false,
            cashbackBookTwoName: ""
        }) : this.setState({cashbackBookTwo: true})        
    }

    setCashbackThree = () => {
        this.state.cashbackBookThree === true ? this.setState({
            cashbackBookThree: false,
            cashbackBookThreeName: ""
        }) : this.setState({cashbackBookThree: true})        
    }

    componentDidMount = () => {
        this.fetchBookmakers()
    }

    render() {
        return (
            <>
                <Container id="offline3VieMainContainer" fluid>
                    <Navbar />
                    <Container fluid id="cashback3VieTitleContainer">
                        <h1 id="cashback3VieTitle">Cashback 3 Vie</h1>
                    </Container>
                    <Row className="no-gutter">
                        <Col xs={7}>
                            <Container className="calcolatore3vieContainer">
                            <Row className="no-gutters pt-3">
                                <Col xs={4} style={{textAlign: "center"}}>
                                <Switch 
                                    color='var(--error)' 
                                    checked
                                    label='Cashback Book 1'
                                    style={{color: "white"}}
                                    onClick={this.setCashbackOne}
                                />
                                </Col>
                                <Col xs={4} style={{textAlign: "center"}}>
                                <Switch 
                                    color='var(--error)' 
                                    checked
                                    label='Cashback Book 2'
                                    style={{color: "white"}}
                                    onClick={this.setCashbackTwo}
                                />
                                </Col>
                                <Col xs={4} style={{textAlign: "center"}}>
                                <Switch 
                                    color='var(--error)' 
                                    checked
                                    label='Cashback Book 3'
                                    style={{color: "white"}}
                                    onClick={this.setCashbackThree}
                                />
                                </Col>
                            </Row>
                            <Row className="no-gutters pt-4">
                                <Col xs={4} style={{textAlign: "center"}} className="pl-4">
                                    <Form>
                                        <Form.Group>
                                            <Form.Label style={{color: "white", fontWeight: "bold"}}>
                                                Inserire quota 1
                                            </Form.Label>
                                        <Form.Control 
                                                type="number"
                                                placeholder="Quota book 1"
                                                style={{borderRadius: "20px", backgroundColor: "#e4ebf5"}}
                                                onChange={(e) => this.setState({quotaPuntaUno: e.currentTarget.value})}
                                        />
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col xs={4} style={{textAlign: "center"}} className="pl-4">
                                    <Form>
                                        <Form.Group>
                                            <Form.Label style={{color: "white", fontWeight: "bold"}}>
                                                Inserire quota 2
                                            </Form.Label>
                                        <Form.Control 
                                                type="number"
                                                placeholder="Quota book 1"
                                                style={{borderRadius: "20px", backgroundColor: "#e4ebf5"}}
                                                onChange={(e) => this.setState({quotaPuntaDue: e.currentTarget.value})}
                                        />
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col xs={4} style={{textAlign: "center"}} className="pl-4">
                                    <Form>
                                        <Form.Group>
                                            <Form.Label style={{color: "white", fontWeight: "bold"}}>
                                                Inserire quota 3
                                            </Form.Label>
                                        <Form.Control 
                                                type="number"
                                                placeholder="Quota book 1"
                                                style={{borderRadius: "20px", backgroundColor: "#e4ebf5"}}
                                                onChange={(e) => this.setState({quotaPuntaTre: e.currentTarget.value})}
                                        />
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                            <Row className="no-gutters pt-3">
                                <Col xs={4} style={{textAlign: "center"}} className="pt-2 pl-2">
                                    {
                                        !this.state.cashbackBookOne ?
                                        (
                                            <Form>
                                                <Form.Group as={Col} controlId="formGridState" className="pr-0">
                                                <Form.Label style={{color: "white", fontWeight: "bold"}}>Seleziona Bookmakers 1</Form.Label>
                                                <Form.Control 
                                                    as="select" 
                                                    defaultValue="Seleziona bookmaker"
                                                    style={{borderRadius: "20px", backgroundColor: "#e4ebf5"}}
                                                >
                                                        <option style={{borderRadius: "20px", backgroundColor: "#e4ebf5"}}>Seleziona bookmaker</option>
                                                        <option style={{borderRadius: "20px", backgroundColor: "#e4ebf5"}}>...</option>
                                                </Form.Control>
                                                </Form.Group>
                                            </Form>
                                        )
                                        :
                                        (
                                            <Form>
                                                <Form.Group as={Col} controlId="formGridState" className="pr-0">
                                                <Form.Label style={{color: "white", fontWeight: "bold"}}>Seleziona Bookmakers 1</Form.Label>
                                                <Form.Control 
                                                    as="select" 
                                                    defaultValue="Seleziona bookmaker"
                                                    style={{borderRadius: "20px", backgroundColor: "#e4ebf5"}}
                                                    onChange={(e) => this.setState({cashbackBookOneName: e.currentTarget.value})}
                                                >
                                                    <option style={{borderRadius: "20px", backgroundColor: "#e4ebf5"}}>Seleziona bookmaker</option>
                                                        {
                                                            this.state.bookmakers.map((element, i) => {
                                                                return(
                                                                    <option key={element._id}>{element.name}</option>
                                                                )
                                                            })
                                                        }
                                                </Form.Control>
                                                </Form.Group>
                                            </Form>
                                        )
                                    }
                                </Col>
                                <Col xs={4} style={{textAlign: "center"}} className="pr-0 pt-2">
                                    {
                                        !this.state.cashbackBookTwo ?
                                        (
                                            <Form>
                                                <Form.Group as={Col} controlId="formGridState" className="pl-4 pr-0">
                                                <Form.Label style={{color: "white", fontWeight: "bold"}}>Seleziona Bookmakers 2</Form.Label>
                                                <Form.Control 
                                                    as="select" 
                                                    defaultValue="Seleziona bookmaker"
                                                    style={{borderRadius: "20px", backgroundColor: "#e4ebf5"}}
                                                    onChange={(e) => console.log(e.currentTarget.value)}
                                                >
                                                    <option style={{borderRadius: "20px", backgroundColor: "#e4ebf5"}}>Seleziona bookmaker</option>
                                                    <option>...</option>
                                                </Form.Control>
                                                </Form.Group>
                                            </Form>
                                            )
                                            :
                                            (
                                                <Form>
                                                    <Form.Group as={Col} controlId="formGridState" className="pl-4 pr-0">
                                                    <Form.Label style={{color: "white", fontWeight: "bold"}}>Seleziona Bookmakers 2</Form.Label>
                                                    <Form.Control 
                                                        as="select" 
                                                        defaultValue="Seleziona bookmaker"
                                                        style={{borderRadius: "20px", backgroundColor: "#e4ebf5"}}
                                                        onChange={(e) => this.setState({cashbackBookTwoName: e.currentTarget.value})}
                                                        >
                                                            <option style={{borderRadius: "20px", backgroundColor: "#e4ebf5"}}>Seleziona bookmaker</option>
                                                            {
                                                                this.state.bookmakers.map((element, i) => {
                                                                    return(
                                                                        <option key={element._id}>{element.name}</option>
                                                                    )
                                                                })
                                                            }
                                                    </Form.Control>
                                                    </Form.Group>
                                                </Form>                                                
                                            )
                                        }
                                </Col>
                                <Col xs={4} style={{textAlign: "center"}} className="pr-0 pt-2">
                                    {
                                        !this.state.cashbackBookThree ?
                                        (
                                            <Form>
                                                <Form.Group as={Col} controlId="formGridState" className="pl-4 pr-0">
                                                <Form.Label style={{color: "white", fontWeight: "bold"}}>Seleziona Bookmakers 3</Form.Label>
                                                <Form.Control 
                                                    as="select" 
                                                    defaultValue="Seleziona bookmaker"
                                                    style={{borderRadius: "20px", backgroundColor: "#e4ebf5"}}
                                                    onChange={(e) => console.log(e.currentTarget.value)}
                                                >
                                                    <option style={{borderRadius: "20px", backgroundColor: "#e4ebf5"}}>Seleziona bookmaker</option>
                                                    <option>...</option>
                                                </Form.Control>
                                                </Form.Group>
                                            </Form>
                                            )
                                            :
                                            (
                                                <Form>
                                                    <Form.Group as={Col} controlId="formGridState" className="pl-4 pr-0">
                                                    <Form.Label style={{color: "white", fontWeight: "bold"}}>Seleziona Bookmakers 3</Form.Label>
                                                    <Form.Control 
                                                        as="select" 
                                                        defaultValue="Seleziona bookmaker"
                                                        style={{borderRadius: "20px", backgroundColor: "#e4ebf5"}}
                                                        onChange={(e) => this.setState({cashbackBookThreeName: e.currentTarget.value})}
                                                        >
                                                            <option style={{borderRadius: "20px", backgroundColor: "#e4ebf5"}}>Seleziona bookmaker</option>
                                                            {
                                                                this.state.bookmakers.map((element, i) => {
                                                                    return(
                                                                        <option key={element._id}>{element.name}</option>
                                                                    )
                                                                })
                                                            }
                                                    </Form.Control>
                                                    </Form.Group>
                                                </Form>                                                
                                            )
                                        }
                                </Col>
                            </Row>
                            <Row className="no-gutters pt-3">
                                <Col xs={4}></Col>
                                <Col xs={4} style={{textAlign: "center"}}>
                                     <Form className="pl-4">
                                        <Form.Group>
                                            <Form.Label style={{color: "white", fontWeight: "bold"}}>
                                                Inserire Stake
                                            </Form.Label>
                                            <Form.Control 
                                                type="number"
                                                placeholder="Inserire stake"
                                                style={{borderRadius: "20px", backgroundColor: "#e4ebf5"}}
                                                onChange={(e) => this.setState({stake: e.currentTarget.value})}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col xs={4}></Col>
                            </Row>
                            <Row className="no-gutters py-3 pl-4">
                                <Col xs={4}></Col>
                                <Col xs={4} style={{textAlign: "center"}}>
                                    <Button dark rounded onClick={this.calculateRoi}>
                                        <span style={{color: "white"}}>Calcola ROI</span>
                                    </Button>
                                    </Col>
                                <Col xs={4}></Col>
                            </Row>
                            <Row className="no-gutters">
                                <Col xs={12}>
                                    {/* ROI > 0 */}
                                    {
                                        this.state.betInfo.Roi >= 0 ?
                                        (
                                            <Alert 
                                                className="mt-3 mb-4" 
                                                show={this.state.showBetInfo} 
                                                variant="success" 
                                                style={{marginLeft: "15%", marginRight: "15%", textAlign: "center", borderRadius: "30px"}}
                                            >
                                                <span style={{fontWeight: "bold", color: "black"}}>
                                                    ROI: +{this.state.betInfo.Roi}€, Rating: {this.state.betInfo.rating}%, Punta: {this.state.betInfo.stake}€, 
                                                    <br/> 
                                                    Contropunta Book 2: {this.state.betInfo.contropuntaUno}€, Contropunta Book 3: {this.state.betInfo.contropuntaDue}€
                                                </span>
                                            </Alert>
                                        )
                                        :
                                        (
                                            <Alert 
                                                className="mt-3 mb-4" 
                                                show={this.state.showBetInfo} 
                                                variant="danger" 
                                                style={{marginLeft: "15%", marginRight: "15%", textAlign: "center", borderRadius: "30px"}}
                                            >   
                                                <span style={{fontWeight: "bold", color: "black"}}>
                                                    ROI: {this.state.betInfo.Roi}€, Rating: {this.state.betInfo.rating}%, Punta: {this.state.betInfo.stake}€, 
                                                    <br/> 
                                                    Contropunta Book 2: {this.state.betInfo.contropuntaUno}€, Contropunta Book 3: {this.state.betInfo.contropuntaDue}€
                                                </span>
                                            </Alert>                                                
                                        )
                                    }
                                </Col>
                            </Row>
                            </Container>

                        </Col>
                        <Col xs={5}>
                            <Container className="calcolatore3VieContainer2 pt-3" style={{height: "70vh"}}>
                                {
                                    this.state.loadingBookmakers ?
                                    (
                                        <CashbackTable
                                            className="trimatcher-table"
                                            reFetchBookmakers={this.fetchBookmakers}
                                            loadingBookmakers={this.state.loadingBookmakers}
                                            bookmakers={this.state.bookmakers}
                                        />
                                    )
                                    :
                                    (
                                        <>
                                        <CashbackTable
                                            className="trimatcher-table"
                                            reFetchBookmakers={this.fetchBookmakers}
                                            loadingBookmakers={this.state.loadingBookmakers}
                                            bookmakers={this.state.bookmakers}
                                        />
                                        <NewCashBackBookmaker
                                            reFetchBookmakers={this.fetchBookmakers}
                                        />
                                        </>
                                    )
                                }
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Trimatcher;