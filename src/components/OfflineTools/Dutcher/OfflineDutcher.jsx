import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import React, { Component } from 'react';
import { Switch, Button } from 'ui-neumorphism'
import Navbar from "../../Navbar/Navbar"
import CashbackTable from "./CashbackTable"
import NewCashBackBookmaker from "./NewCashBackBookmaker"
import authAxios from "../../Utils/http"
import 'ui-neumorphism/dist/index.css'
import "./dutcher.css"

class Dutcher extends Component {

    state = {
        bookmakers: [],
        loadingBookmakers: true,
        cashbackBookOne: true,
        cashbackBookTwo: true,
        cashbackBookOneName: "",
        cashbackBookTwoName: "",
        stake: "",
        showBetInfo: false,
        quotaPuntaUno: "",
        quotaPuntaDue: "",
        showMissingAlert: false,
        betInfo: {}
    }

    fetchBookmakers = async () => {
        if (this.state.loadingBookmakers === false) this.setState({loadingBookmakers: true})
        const response = await authAxios("/cashback-bookmakers/get-bookmakers")
        console.log(response.data)
        const bookmakers = await response.data
        console.log(bookmakers)
        this.setState({bookmakers: bookmakers})
        this.setState({loadingBookmakers: false})
    }

    calculateROI = () => {
        
        if(this.state.quotaPuntaUno === "" || this.state.quotaPuntaDue === "" || this.state.stake === ""){
            this.setState({showMissingAlert: true})
            setTimeout(() => {  this.setState({showMissingAlert: false}) }, 2000);
            console.log("Devi inserire tutti i parametri!")
            
        }else{

            const quotaUno = parseFloat(this.state.quotaPuntaUno)
            const quotaDue = parseFloat(this.state.quotaPuntaDue)
            const stake = parseInt(this.state.stake)
            const controPuntaStake = Math.floor((quotaUno * stake) / quotaDue)

            if(!this.state.cashbackBookOne && !this.state.cashbackBookTwo){
                console.log("Primo if")
                // Calcolo ROI
                const rawROI = (stake * quotaUno) - controPuntaStake - stake
                const ROI = rawROI.toFixed(2)

                // Calcolo rating
                const rawRating = 100 - ((((1 / quotaUno) + (1 / quotaDue)) * 100 - 100) * 2)
                const rating = rawRating.toFixed(2)

                this.setState({
                    betInfo: {
                        ROI: ROI,
                        stake: stake,
                        controPuntaStake: controPuntaStake,
                        rating: rating
                    },
                    showBetInfo: true
                })

            }else if(this.state.cashbackBookOne && !this.state.cashbackBookTwo){
                console.log("Secondo if")
                // Calcolo ROI
                // Solo il primo bookmaker ha il cashback
                const bookmakerOne = this.state.cashbackBookOneName === "" ? 0 : this.state.bookmakers.find( book => book.name === this.state.cashbackBookOneName)
                const cashbackPercentageOne = bookmakerOne === 0 ? 0 : parseFloat(bookmakerOne.cashback)
                const cashbackOne = parseFloat((stake / 100) * cashbackPercentageOne)
                const rawROI = (quotaUno * stake) - controPuntaStake - stake + cashbackOne
                const ROI = rawROI.toFixed(2)

                // Calcolo rating
                const rawRating = 100 - ((((1 / quotaUno) + (1 / quotaDue)) * 100 - 100) * 2)
                const rating = rawRating.toFixed(2)

                this.setState({
                    betInfo: {
                        ROI: ROI,
                        stake: stake,
                        controPuntaStake: controPuntaStake,
                        rating: rating
                    },
                    showBetInfo: true
                })                             
                
            }else if(!this.state.cashbackBookOne && this.state.cashbackBookTwo){
                console.log("Terzo if")

                // Calcolo ROI
                //Solo il secondo bookmaker ha il cashback
                const bookmakerTwo = this.state.cashbackBookTwoName === "" ? 0 : this.state.bookmakers.find( book => book.name === this.state.cashbackBookTwoName)  
                const cashbackPercentageTwo = bookmakerTwo === 0 ? 0 : parseFloat(bookmakerTwo.cashback)
                const cashbackTwo = parseFloat((controPuntaStake / 100) * cashbackPercentageTwo)
                const rawROI = (quotaDue * controPuntaStake) - stake - stake + cashbackTwo
                const ROI = rawROI.toFixed(2)

                // Calcolo rating
                const rawRating = 100 - ((((1 / quotaUno) + (1 / quotaDue)) * 100 - 100) * 2)
                const rating = rawRating.toFixed(2)
                
                this.setState({
                    betInfo: {
                        ROI: ROI,
                        stake: stake,
                        controPuntaStake: controPuntaStake,
                        rating: rating
                    },
                    showBetInfo: true
                }) 

            }else if(this.state.cashbackBookOne && this.state.cashbackBookTwo){
                console.log("Quarto if")
                // Calcolo ROI
                // Entrambi i bookmaker hanno il cashback
                const bookmakerOne = this.state.cashbackBookOneName === "" ? 0 : this.state.bookmakers.find( book => book.name === this.state.cashbackBookOneName)
                const bookmakerTwo = this.state.cashbackBookTwoName === "" ? 0 : this.state.bookmakers.find( book => book.name === this.state.cashbackBookTwoName)
                const cashbackPercentageOne = bookmakerOne === 0 ? 0 : parseFloat(bookmakerOne.cashback)
                const cashbackPercentageTwo = bookmakerTwo === 0 ? 0 : parseFloat(bookmakerTwo.cashback)
                const cashbackOne = parseFloat((stake / 100) * cashbackPercentageOne)
                const cashbackTwo = parseFloat((controPuntaStake / 100) * cashbackPercentageTwo)
                const rawROI = (quotaUno * stake) - controPuntaStake - stake + cashbackOne + cashbackTwo
                const ROI = rawROI.toFixed(2)

                // Calcolo rating
                const rawRating = 100 - ((((1 / quotaUno) + (1 / quotaDue)) * 100 - 100) * 2)
                const rating = rawRating.toFixed(2)
                
                this.setState({
                    betInfo: {
                        ROI: ROI,
                        stake: stake,
                        controPuntaStake: controPuntaStake,
                        rating: rating
                    },
                    showBetInfo: true
                }) 

            }else{
                console.log("Ultimo if")
                // Calcolo ROI
                const rawROI = (stake * quotaUno) - stake - controPuntaStake
                const ROI = rawROI.toFixed(2)

                // Calcolo rating
                const rawRating = 100 - ((((1 / quotaUno) + (1 / quotaDue)) * 100 - 100) * 2)
                const rating = rawRating.toFixed(2)

                this.setState({
                    betInfo: {
                        ROI: ROI,
                        stake: stake,
                        controPuntaStake: controPuntaStake,
                        rating: rating
                    },
                    showBetInfo: true
                })
            }
        }
    }

    setCashbackOne = () => {
        this.state.cashbackBookOne === true ? this.setState({cashbackBookOne: false, cashbackBookOneName: ""}) : this.setState({cashbackBookOne: true})
    }

    setCashbackTwo = () => {
        this.state.cashbackBookTwo === true ? this.setState({cashbackBookTwo: false, cashbackBookTwoName: ""}) : this.setState({cashbackBookTwo: true})
    }
    openDeleteModal = () => {
        this.setState({showDeleteBookmakerModal: true})
    }

    closeDeleteModal = () => {
        this.setState({showDeleteBookmakerModal: false})
    }

    componentDidMount = () => {
        this.fetchBookmakers()
    }

    render() {
        return (
            <>  
                <Container id="offlineDutcherMainContainer" fluid>
                    <Navbar />
                    <Container fluid id="cashback2VieTitleContainer">
                        <h1 id="cashback2VieTitle">Cashback 2 Vie</h1>
                    </Container>
                    <Row className="no-gutters">
                        <Col xs={7}>
                            <Container className="calcolatore2vieContainer" style={{height: "70vh"}}>
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
                                    <Col xs={4}></Col>
                                    <Col xs={4} style={{textAlign: "center"}}>
                                        <Switch 
                                            color='var(--error)' 
                                            checked 
                                            label='Cashback Book 2'
                                            onClick={this.setCashbackTwo}
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
                                    <Col xs={4}></Col>
                                    <Col xs={4} style={{textAlign: "center"}} className="pr-4">
                                        <Form>
                                            <Form.Group>
                                                <Form.Label style={{color: "white", fontWeight: "bold"}}>
                                                    Inserire quota 2
                                                </Form.Label>
                                                <Form.Control 
                                                    type="number"
                                                    placeholder="Quota book 2"
                                                    style={{borderRadius: "20px", backgroundColor: "#e4ebf5"}}
                                                    onChange={(e) => this.setState({quotaPuntaDue: e.currentTarget.value})}
                                                />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>                                
                                <Row className="no-gutters pt-3">
                                    <Col xs={4} style={{textAlign: "center"}} className="pl-2">
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
                                    <Col xs={4}></Col>
                                    <Col xs={4} style={{textAlign: "center"}} className="pr-2">
                                        {
                                            !this.state.cashbackBookTwo ?
                                            (
                                                <Form>
                                                    <Form.Group as={Col} controlId="formGridState" className="pl-0">
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
                                                    <Form.Group as={Col} controlId="formGridState" className="pl-0">
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
                                </Row>
                                <Row className="no-gutters pt-3">
                                    <Col xs={4}></Col>
                                    <Col xs={4} style={{textAlign: "center"}}>
                                        <Form>
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
                                <Row className="no-gutters py-3">
                                    <Col xs={4}></Col>
                                    <Col xs={4} style={{textAlign: "center"}}>
                                        <Button dark rounded onClick={this.calculateROI}>
                                            <span style={{color: "white"}}>Calcola ROI</span>
                                        </Button>
                                        </Col>
                                    <Col xs={4}></Col>
                                </Row>
                                <Row className="no-gutters">
                                    <Col xs={12}>
                                        {/* ROI > 0 */}
                                        {
                                            this.state.betInfo.ROI >= 0 ?
                                            (
                                                <Alert 
                                                    className="mt-3 mb-4" 
                                                    show={this.state.showBetInfo} 
                                                    variant="success" 
                                                    style={{marginLeft: "15%", marginRight: "15%", textAlign: "center", borderRadius: "30px"}}
                                                >
                                                    ROI: +{this.state.betInfo.ROI}€, Rating: {this.state.betInfo.rating}%, Punta: {this.state.betInfo.stake}€, Contropunta: {this.state.betInfo.controPuntaStake}€
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
                                                    ROI: {this.state.betInfo.ROI}€, Rating: {this.state.betInfo.rating}%, Punta: {this.state.betInfo.stake}€, Contropunta: {this.state.betInfo.controPuntaStake}€
                                                </Alert>                                                
                                            )
                                        }
                                    </Col>
                                </Row>                   
                            </Container>                            
                        </Col>
                        <Col xs={5}>
                            <Container className="calcolatore2vieContainer2 pt-3" style={{height: "70vh"}}>
                                {
                                    this.state.loadingBookmakers ?
                                    (
                                        
                                        <CashbackTable
                                            className="dutcher-table"
                                            loadingBookmakers={this.state.loadingBookmakers}
                                            bookmakers={this.state.bookmakers}
                                        />
                                    )
                                    :
                                    (
                                        <>
                                            <CashbackTable
                                                reFetchBookmakers={this.fetchBookmakers}
                                                className="dutcher-table"
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

export default Dutcher;