import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/colors/red';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Fade from '@material-ui/core/Fade';
import './navmenu.css';


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
    color: red,
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


class NavMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    // console.log("state", this.state)

    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className="nav-menu">
        <Button
          aria-owns={anchorEl ? 'fade-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <ListItemIcon className={classes.icon}>
            <Icon className={classes.icon} color="primary" style={{ fontSize: 30 }}>
              menu
            </Icon>
          </ListItemIcon>
        </Button>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={this.handleClose} component={Link} to="./dashboard" >Dashboard</MenuItem>
          <MenuItem onClick={this.handleClose} component={Link} to="./profile" >Profile</MenuItem>
          <MenuItem onClick={this.props.logOut}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(NavMenu);
