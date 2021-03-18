import React, { Component } from 'react';
import { Table, Spinner, Container, Button } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import ModifyBookmaker from "./ModifyBookmaker"
import DeleteBookmaker from "./DeleteBookmaker"
import "./cashback-table.css"

class CashbackTable extends Component {

    state = {            
        modifyBookmakerModalShow: false,
        bookmakerInfo: {},
        showDeleteBookmakerModal: false
    }
    
    openModifyBookmakerModal = (element) => {
        this.setState({modifyBookmakerModalShow: true, bookmakerInfo: element})
        console.log(element)
    }

    closeModifyBookmakerModal = () => {
        this.setState({modifyBookmakerModalShow: false, bookmakerInfo: {}})
    }

    deleteBookmaker = async (_id) => {
        try {
            console.log(_id)
            const response = await fetch("http://localhost:3004/cashback-bookmakers/delete-bookmaker", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({_id: _id})
            })
            if(response.ok){
                console.log("ok")
                this.props.reFetchBookmakers()
            }else{
                console.log("An error occurred!")
                this.props.reFetchBookmakers()
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <>
            
            <ModifyBookmaker
                closeModifyBookmakerModal={this.closeModifyBookmakerModal}
                show={this.state.modifyBookmakerModalShow}
                bookmakerInfo={this.state.bookmakerInfo}
                reFetchBookmakers={this.props.reFetchBookmakers}
            />
            {
                this.props.loadingBookmakers == true ?
                (
                    <Container className="h-100 dutcher-table-spinner-container">
                        <Spinner animation="grow" className="dutcher-table-spinner"/>
                    </Container>
                )
                :
                (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Bookmaker</th>
                            <th>Cashback</th>
                            <th>Opzioni</th>
                            <th>Opzioni</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.bookmakers.map((element, i) => {
                                    return(
                                        <>
                                            <tr key={i}>
                                                <td>{element.name}</td>
                                                <td>{element.cashback}%</td>
                                                <td style={{textAlign: "center"}}>
                                                    <Button 
                                                        style={{backgroundColor: "transparent", border: "none"}}
                                                        onClick={ () => this.openModifyBookmakerModal(element)}
                                                    >
                                                        <FontAwesomeIcon icon={faCog} className="option-icon"
                                                        />
                                                    </Button>
                                                </td>
                                                <td style={{textAlign: "center"}}>
                                                    <Button 
                                                        style={{backgroundColor: "transparent", border: "none"}}
                                                        onClick={ () => this.deleteBookmaker(element._id)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrashAlt} className="option-icon"
                                                        />
                                                    </Button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                )
            }
            </>
        );
    }
}

export default CashbackTable;