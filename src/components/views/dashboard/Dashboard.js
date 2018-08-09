import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/colors/red';
import Alert from '../alert/Alert';
import { Elements, StripeProvider } from 'react-stripe-elements';
import StripeCard from '../stripeElem';
import server, { stripekey } from '../../../config';
import './dashboard.css';


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


class Dashboard extends Component {
  constructor(props) {
    super(props);

    var data = this.props.data;
    this.state = {
      user: {
        id: '' || data.id,
        name: '' || data.name,
        email: '' || data.email,
      },
      alert: {
        show: false,
        title: '',
        text: ''
      },
      anchorEl: null,
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
    fetch(server + '/getCharge', { credentials: 'include' })
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

        <header className="Dashboard-header">
          <h1 className="Dashboard-title">
            <Icon className={classes.icon} color="primary" style={{ fontSize: 30 }}>
              airplay
            </Icon>
            Dashboard
           </h1>
        </header>
        <div className="auth-container">
          <div className="Dashboard-card auht-view">

            <StripeProvider apiKey={stripekey}>
              <div className="example">
                <h1>React Stripe Elements Example</h1>
                <Elements>
                  <StripeCard />
                </Elements>
              </div>
            </StripeProvider>

          </div>
        </div>
        <footer className="auth-footer">
          <h5>Copyright © 2018 : <a href="http://www.directbravo.com"> Y.Bravo </a></h5>
        </footer>
      </div >
    );
  }
}

export default withStyles(styles)(Dashboard);
