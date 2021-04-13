import React from 'react'
import ReactTable from "react-table-v6"
import "react-table-v6/react-table.css";

const DataTablePage = (props) => {
    const data = {
        columns: [
            {
                Header: "Data",
                accessor: "start_date",
                minWidth: 100
            },
            {
                Header: "Ora",
                accessor: "start_time",
                minWidth: 80
            },
            {
              Header: "Campionato",
              accessor: "tournament",
              minWidth: 160,
            },
            {
              Header: "Evento",
              accessor: "event",
              minWidth: 250,
            },
            {
                Header: "1",
                accessor: "odd_one",
                minWidth: 80
            },
            {
                Header: "Book 1",
                accessor: "book_one",
                minWidth: 120
            },            
            {
                Header: "X",
                accessor: "odd_two",
                minWidth: 80
            },
            {
                Header: "Book 2",
                accessor: "book_two",
                minWidth: 120
            },
            {
                Header: "2",
                accessor: "odd_three",
                minWidth: 80
            },
            {
                Header: "Book 3",
                accessor: "book_three",
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
                minWidth: 40
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


