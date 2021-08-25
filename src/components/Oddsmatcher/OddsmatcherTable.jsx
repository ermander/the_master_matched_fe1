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
import { connect } from "react-redux";

const columns = [
  { id: "openMatchInfoModal", minWidth: 30, align: "center" },
  { id: "match_start", label: "Data", minWidth: 100, align: "center" },
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
    label: "Book",
    minWidth: 30,
    align: "center",
  },
  {
    id: "odd_one_type",
    label: "Tipo",
    minWidth: 30,
    align: "center",
  },
  {
    id: "odd_one",
    label: "Punta",
    minWidth: 30,
    align: "center",
  },
  {
    id: "odd_two",
    label: "Banca",
    minWidth: 30,
    align: "center",
  },
  {
    id: "odd_two_type",
    label: "Tipo",
    minWidth: 30,
    align: "center",
  },
  {
    id: "book_two_image",
    label: "Exchange",
    minWidth: 30,
    align: "center",
  },
  {
    id: "tableRoi",
    label: "%",
    minWidth: 30,
    align: "center",
  },
];

const useStyles = makeStyles({
  root: {
    width: "95%",
    marginLeft: "2.5%",
    marginRight: "2.5%",
    padding: "1%",
    backgroundColor: "#23242d!important",
  },
  container: {
    maxHeight: 440,
    backgroundColor: "#23242d",
  },
  thCells: {
    color: "white",
    backgroundColor: "#23242d",
  },
  tdColors: {
    color: "white",
    "&:nth-child(9)": {
      backgroundColor: "#a6d8ff!important",
      color: "black",
      fontWeight: "bold",
      border: "2px solid white",
      borderLeft: "3px solid white",
    },
    "&:nth-child(10)": {
      backgroundColor: "#fac9d1!important",
      color: "black",
      fontWeight: "bold",
      border: "2px solid white",
      borderRight: "3px solid white",
    },
    pagination: {
      color: "white",
    },
  },
});

const mapStateToProps = (state) => state;

function StickyHeadTable(props) {
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
          <TableHead className={classes.tableHead}>
            <TableRow className={classes.tableHead}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className={classes.thCells}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.oddsmatcher.temporaryOdds
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className={classes.tdColors}
                        >
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
        count={props.oddsmatcher.temporaryOdds.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        className={classes.pagination}
      />
    </Paper>
  );
}

export default connect(mapStateToProps)(StickyHeadTable);
