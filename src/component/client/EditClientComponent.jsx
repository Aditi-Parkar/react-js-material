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

class EditClientComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      client: "",
      whitelabel: " ",
      is_deleted: "",
    };
    this.saveClient = this.saveClient.bind(this);
    this.loadClient = this.loadClient.bind(this);
    this.reloadClientList = this.reloadClientList.bind(this);
  }

  componentDidMount() {
    this.loadClient();
  }
  reloadClientList() {
    ApiService.clientList().then((res) => {
      this.setState({ client: res.data.result });
    });
  }
  loadClient() {
    ApiService.getClientFromId(window.localStorage.getItem("client")).then(
      (res) => {
        let client = res.data.result;
        this.setState({
          id: client.id,
          name: client.username,
          ticker: client.ticker,
          cik: client.cik,
        });
      }
    );
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  saveClient = (e) => {
    e.preventDefault();
    let client = {
      id: this.state.id,
      name: this.state.name,
      ticker: this.state.ticker,
      cik: this.state.cik,
    };
    ApiService.updateClient(client).then((res) => {
      this.setState({ message: "Client added successfully." });
      this.props.history.push("/client");
    });
  };

  render() {
    return (
      <div display="flex">
        <div style={formBox}>
          <form>
            <Typography
              style={{ textAlign: "center", marginBottom: "25px" }}
              variant="h5"
              color="primary"
            >
              Edit Client
            </Typography>
            <div>
              <div>
                <TextField
                  style={fieldItem}
                  required
                  autoFocus
                  name="name"
                  label="Name"
                  readonly="true"
                  value={this.state.name}
                  onChange={this.onChange}
                  inputProps={{
                    style: { borderBottom: "none", fontSize: 18 },
                  }}
                />
              </div>
              <div>
                <TextField
                  required
                  autoFocus
                  style={fieldItem}
                  name="username"
                  label="Username"
                  readonly="true"
                  value={this.state.username}
                  onChange={this.onChange}
                />
              </div>
              <div>
                <TextField
                  id="standard-select-currency-native"
                  select
                  label="Client"
                  style={fieldItem}
                  required
                  value={this.state.client}
                  onChange={this.onChange}
                  SelectProps={{
                    native: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
                {/* //   value={this.state.client}
          //   onChange={this.onChange}
          // /> */}
              </div>
              <div>
                <TextField
                  type="number"
                  label="White Label"
                  fullWidth
                  margin="normal"
                  name="White Label"
                  value={this.state.whitelabel}
                  onChange={this.onChange}
                />
              </div>
              <div>
                <TextField
                  required
                  autoFocus
                  type="number"
                  label="is_deleted"
                  fullWidth
                  margin="normal"
                  name="is_deleted"
                  value={this.state.is_deleted}
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
                <Button onClick={() => window.location.assign(`/edit-client`)}>
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
// const style = {
//   display: "flex",
//   justifyContent: "center",
// };

export default EditClientComponent;
