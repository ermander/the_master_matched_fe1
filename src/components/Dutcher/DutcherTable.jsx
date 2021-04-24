import React from 'react'
import ReactTable from "react-table-v6"
import "react-table-v6/react-table.css"

const DataTablePage = (props) => {
    const data = {
        columns: [
            {
                Header: "Data",
                accessor: "start_date",
                minWidth: 100,
              },
              {
                Header: "Ora",
                accessor: "start_time",
                minWidth: 80,
              },
              {
                Header: "Campionato",
                accessor: "event",
                minWidth: 160,
              },
              {
                Header: "Evento",
                accessor: "event",
                minWidth: 250,
              },
              {
                Header: "Mercato",
                accessor: "market",
                minWidth: 80,
              },
              {
                Header: "Book 1",
                accessor: "book_one_image",
                minWidth: 100,
              },
              {
                Header: "Tipo 1",
                accessor: "odd_one_type",
                minWidth: 70,
              },
              {
                Header: "Punta 1",
                accessor: "odd_one",
                minWidth: 80,
              },
              {
                Header: "Punta 2",
                accessor: "odd_two",
                minWidth: 80,
              },
              {
                Header: "Tipo 2",
                accessor: "odd_two_type",
                minWidth: 70,
              },
              {
                Header: "Book 2",
                accessor: "book_two_image",
                minWidth: 100,
              },
              {
                Header: "Rating",
                accessor: "tableRoi",
                minWidth: 100,
              },
              {
                Header: "Last Up.",
                accessor: "lastupdate",
                minWidth: 100,
              },
              {
                Header: "",
                accessor: "button",
                minWidth: 40,
              },
        ],
    }
    return <ReactTable 
        id="dutcher-table"
        data={props.odds}
        columns={data.columns}        
        defaultPageSize={10}
    />
}

export default DataTablePage
