import React from 'react'
import ReactTable from "react-table-v6"
import "react-table-v6/react-table.css";

const DataTablePage = (props) => {
    const data = {
        columns: [
            {
                Header: "Data",
                accessor: "data",
                minWidth: 100
            },
            {
                Header: "Ora",
                accessor: "ora",
                minWidth: 80
            },
            {
              Header: "Campionato",
              accessor: "campionato",
              minWidth: 160,
            },
            {
              Header: "Evento",
              accessor: "evento",
              minWidth: 250,
            },
            {
                Header: "1",
                accessor: "1",
                minWidth: 80
            },
            {
                Header: "Book 1",
                accessor: "book_1",
                minWidth: 120
            },            
            {
                Header: "X",
                accessor: "x",
                minWidth: 80
            },
            {
                Header: "Book 2",
                accessor: "book_2",
                minWidth: 120
            },
            {
                Header: "2",
                accessor: "2",
                minWidth: 80
            },
            {
                Header: "Book 3",
                accessor: "book_3",
                minWidth: 120
            },
            {
                Header: "Roi",
                accessor: "roi",
                minWidth: 120
            },
            {
                Header: "Last Upd.",
                accessor: "last_update",
                minWidth: 80
            },
            {
                Header: "",
                accessor: "button",
                minWidth: 80
            },
        ],
    }
    return <ReactTable
        id="trimatcher-table"
        data={props.odds}
        columns={data.columns}        
        defaultPageSize={10}
    />
}

export default DataTablePage


