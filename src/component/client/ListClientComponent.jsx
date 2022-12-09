import React, { Component } from "react";
import ApiService from "../../service/ApiService";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { IconButton } from "@mui/material";
//import StyledTableCell from "@material-ui/core/TableCell";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";

//import CreateIcon from "@material-ui/icons/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Typography from "@material-ui/core/Typography";
import { styled } from "@mui/material/styles";

import EditIcon from "@mui/icons-material/Edit";
import { Divider } from "@material-ui/core";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

class ListClientComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: [],
      message: null,
    };
    this.deleteClient = this.deleteClient.bind(this);
    this.updateClient = this.updateClient.bind(this);
    this.createClient = this.createClient.bind(this);
    this.reloadClientList = this.reloadClientList.bind(this);
  }

  componentDidMount() {
    this.reloadClientList();
  }

  reloadClientList() {
    ApiService.clientList().then((res) => {
      this.setState({ client: res.data.payload });
    });
  }

  deleteClient(client_id) {
    ApiService.deleteClient(client_id).then((res) => {
      this.setState({ message: "Client deleted successfully." });
      this.setState({
        client: this.state.client.filter((client) => client.id !== client_id),
      });
    });
  }

  updateClient(id) {
    window.localStorage.setItem("client_id", id);
    this.props.history.push("/client/:client_id/update");
  }

  createClient() {
    window.localStorage.removeItem("client_id");
    this.props.history.push("/create-client");
  }

  render() {
    return (
      <div>
        <Typography variant="h4" style={style}>
          Client Details
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.createClient()}
        >
          Add Client
        </Button>
        <Divider/>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell><b>Id</b></StyledTableCell>
                <StyledTableCell align="right"><b>Name</b></StyledTableCell>
                <StyledTableCell align="right"><b>Cik</b></StyledTableCell>
                <StyledTableCell align="right"><b>Ticker</b></StyledTableCell>
                <StyledTableCell align="right"><b>Edit</b></StyledTableCell>
                <StyledTableCell align="right"><b>Delete</b></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.client.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.name}</StyledTableCell>
                  <StyledTableCell align="right">{row.cik}</StyledTableCell>
                  <StyledTableCell align="right">{row.ticker}</StyledTableCell>

                  <StyledTableCell align="right">
                    <IconButton onClick={() => this.updateClient(row.id)}>
                      <EditIcon />
                    </IconButton>
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    <IconButton onClick={() => this.deleteClient(row.id)}>
                      {" "}
                      <DeleteOutlineIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

const style = {
  display: "flex",
  justifyContent: "center",
};

export default ListClientComponent;
