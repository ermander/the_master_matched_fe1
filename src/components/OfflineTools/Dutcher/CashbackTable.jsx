import React, { Component } from 'react';
import { Table, Spinner, Container } from "react-bootstrap"
import "./cashback-table.css"

class CashbackTable extends Component {
    render() {
        return (
            <>
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