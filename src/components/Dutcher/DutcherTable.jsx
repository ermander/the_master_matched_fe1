import React from 'react'
import ReactTable from "react-table-v6"
import "react-table-v6/react-table.css";

const DataTablePage = (props) => {
    const data = {
        columns: [
            {
                Header: "Data",
                accessor: "data",
                minWidth: 100,
              },
              {
                Header: "Ora",
                accessor: "ora",
                minWidth: 80,
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
                Header: "Mercato",
                accessor: "tipo",
                minWidth: 80,
              },
              {
                Header: "Book 1",
                accessor: "book1",
                minWidth: 120,
              },
              {
                Header: "Tipo 1",
                accessor: "yes",
                minWidth: 70,
              },
              {
                Header: "Punta 1",
                accessor: "punta1",
                minWidth: 80,
              },
              {
                Header: "Punta 2",
                accessor: "punta2",
                minWidth: 80,
              },
              {
                Header: "Tipo 2",
                accessor: "no",
                minWidth: 70,
              },
              {
                Header: "Book 2",
                accessor: "book2logo",
                minWidth: 100,
              },
              {
                Header: "Rating",
                accessor: "tableRating",
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
