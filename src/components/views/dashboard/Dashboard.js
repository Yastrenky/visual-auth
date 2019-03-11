import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/colors/red';
import "react-table/react-table.css";
import { Alert, NavMenu, Footer } from '../';
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

    this.state = {
      alert: {
        show: false,
        title: '',
        text: ''
      },
    };
  }

  resetAlert = () => {
    this.setState({ alert: { show: false, title: '', text: '' } })
  }

  handleChange = value => event => {
    this.setState({
      [value]: event.target.value,
    });
  };

  componentDidMount() {

  }

  render() {
    // console.log("state", this.state)
    const { classes } = this.props;
    const alert = this.state.alert.show;

    return (
      <div className='view-container'>
        <NavMenu variant="contained" />
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

          <div className={"Dashboard-card auht-view"}>

          </div>
        </div>
        <Footer />
      </div >
    );
  }
}

export default withStyles(styles)(Dashboard);
