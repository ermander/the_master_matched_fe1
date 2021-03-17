import React, { Component } from 'react';
import { Table, Spinner, Container, Button } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import "./cashback-table.css"

class CashbackTable extends Component {
    render() {

        state = {            
            modifyBookmakerModalShow: false
        }
        
        openModifyBookmakerModal = () => {
            this.setState({modifyBookmakerModalShow: true})
        }
    
        closeModifyBookmakerModal = () => {
            this.setState({modifyBookmakerModalShow: false})
        }

        return (
            <>            
            <ModifyBookmaker 
                show={this.openModifyBookmakerModal}
                noShow={this.closeModifyBookmakerModal}
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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.bookmakers.map((element, i) => {
                                    return(
                                        <>
                                            <tr>
                                                <td>{element.name}</td>
                                                <td>{element.cashback}%</td>
                                                <td style={{textAlign: "center"}}>
                                                    <FontAwesomeIcon icon={faCog} className="option-icon"
                                                        onClick={ () => console.log("oasifsod")}
                                                    />
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