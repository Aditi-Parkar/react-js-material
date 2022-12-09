import React, { Component } from "react";
import ApiService from "../../service/ApiService";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const button = {
  margin: "40px",
  textAlign: "center",
};

const fieldItem = {
  marginTop: "10px",
  width: "500px",
  display: "flex",
  "justify-content": "space-between",
  "flex-wrap": "wrap",
  "flex-basis": "100p",
  marginBottom: "35px",
};
const formBox = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "50px",
};
class AddClientComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      cik: "",
      ticker: "",
      message: null,
    };
    this.saveClient = this.saveClient.bind(this);
  }
  componentDidMount() {
    this.createClient();
  }

  createClient() {
    ApiService.createClient().then((res) => {
      this.setState({ client: res.data.result });
    });
  }

  saveClient = (e) => {
    e.preventDefault();
    let client = {
      id: this.state.id,
      name: this.state.name,
      cik: this.state.cik,
      ticker: this.state.ticker,
    };
    ApiService.createClient(client).then((res) => {
      this.setState({ message: "Client created successfully." });
      this.props.history.push("/client");
    });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div display="flex">
        <div style={formBox}>
          <form>
            <Typography
              style={{ textAlign: "center", marginBottom: "25px" }}
              variant="h5"
              color="primary"
              onClick={() => this.createClient()}

            >
              New Client
            </Typography>
            <div>
              <div>
                <TextField
                  style={fieldItem}
                  required
                  autoFocus
                  type="text"
                  fullWidth
                  margin="normal"
                  name="name"
                  label="Name"
                  value={this.state.name}
                  onChange={this.onChange}
                  
                />
              </div>
              <div>
                <TextField
                  required
                  style={fieldItem}
                  fullWidth
                  margin="normal"
                  name="ticker"
                  label="Ticker"
                  value={this.state.ticker}
                  onChange={this.onChange}
                />
              </div>
              <div>
                <TextField
                  required
                  style={fieldItem}
                  type="number"
                  fullWidth
                  margin="normal"
                  name="cik"
                  label="Cik"

                  value={this.state.cik}
                  onChange={this.onChange}
                />
              </div>
              <div style={button}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={this.saveClient}
                >
                  {" "}
                  Submit
                </Button>
                <Button onClick={() => window.location.assign(`/create-client`)}>
                  Cancel
                </Button>
              </div>
            </div>
            {/* <Button variant="contained" color="primary" onClick={this.saveClient}>Save</Button> */}
          </form>
        </div>
      </div>
    );
  }
}

// const formContainer = {
//     display: 'flex',
//     flexFlow: 'row wrap'
// };

// const style ={
//     display: 'flex',
//     justifyContent: 'center'

// }

export default AddClientComponent;
