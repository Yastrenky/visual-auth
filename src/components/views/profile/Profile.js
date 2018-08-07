import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/colors/red';
import Alert from '../alert/Alert';
import { Elements, StripeProvider } from 'react-stripe-elements';
import StripeCard from '../stripeElem';
import server, { stripekey } from '../../../config/config';
import './profile.css';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 320,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: 15,
    width: 100,
  },
  input: {
    display: 'none',
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: red[800],
    },
  },
});


class Profile extends Component {
  constructor(props) {
    super(props);
    var data = this.props.data;

    this.state = {
      id: '' || data.id,
      name: '' || data.name,
      email: '' || data.email,
      password: '' || data.password,
      alert: {
        show: false,
        title: '',
        text: ''
      }
    };
  }

  resetAlert = () => {
    var alert = JSON.parse(JSON.stringify(this.state.alert));
    alert = {
      show: false,
      title: '',
      text: ''
    }
    this.setState({ alert: alert })
  }

  handleChange = value => event => {
    this.setState({
      [value]: event.target.value,
    });
  };

  componentDidMount() {

    fetch(server + '/transactionsList', { credentials: 'include' })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(e => console.log(e));
  }

  render() {
    // console.log("state", this.state)

    const { classes } = this.props;
    const alert = this.state.alert.show;

    return (
      <div>
        {alert ? <Alert data={this.state.alert} resetAlert={this.resetAlert} /> : null}

        <header className="Profile-header">
          <h1 className="Profile-title">
            <Icon className={classes.icon} color="primary" style={{ fontSize: 30 }}>
              account_box
            </Icon>
            User Profile
           </h1>
        </header>

        <div className="auth-container">
          <div className="Profile-card auht-view">
            <h5>Id: {this.state.id}</h5>
            <h5>Name: {this.state.name}</h5>
            <h5>E-Mail: {this.state.email}</h5>
            <h5>ENCRIPTED-Password: {this.state.password}</h5>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={this.props.logOut}
            >
              Logout
            </Button>
          </div>
          <StripeProvider apiKey={stripekey}>
            <div className="example">
              <h1>React Stripe Elements Example</h1>
              <Elements>
                <StripeCard />
              </Elements>
            </div>
          </StripeProvider>
        </div>
        <footer className="auth-footer">
          <h5>Copyright © 2018 : <a href="http://www.directbravo.com"> Y.Bravo </a></h5>
        </footer>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);
