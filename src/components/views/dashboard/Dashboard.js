import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/colors/red';
import Alert from '../alert/Alert';
import "react-table/react-table.css";
import Footer from '../footer/Footer';
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

  }

  render() {
    // console.log("state", this.state)
    const { classes } = this.props;
    const alert = this.state.alert.show;

    return (
      <div className='view-container'>
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
