import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "start_date", label: "Data", minWidth: 100, align: "center" },
  { id: "start_time", label: "Ora", minWidth: 50, align: "center" },
  {
    id: "nation",
    label: "Nazione",
    minWidth: 100,
    align: "center",
  },
  {
    id: "tournament",
    label: "Campionato",
    minWidth: 130,
    align: "center",
  },
  {
    id: "event",
    label: "Evento",
    minWidth: 130,
    align: "center",
  },
  {
    id: "market",
    label: "Mercato",
    minWidth: 30,
    align: "center",
  },
  {
    id: "book_one_image",
    label: "Book 1",
    minWidth: 30,
    align: "center",
  },
  {
    id: "odd_one_type",
    label: "Tipo 1",
    minWidth: 30,
    align: "center",
  },
  {
    id: "odd_one",
    label: "Punta 1",
    minWidth: 30,
    align: "center",
  },
  {
    id: "odd_two",
    label: "Punta 2",
    minWidth: 30,
    align: "center",
  },
  {
    id: "odd_two_type",
    label: "Tipo 2",
    minWidth: 30,
    align: "center",
  },
  {
    id: "book_two_image",
    label: "Book 2",
    minWidth: 30,
    align: "center",
  },
  {
    id: "tableRoi",
    label: "%",
    minWidth: 30,
    align: "center",
  }
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable({ odds }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {odds
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={odds.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
