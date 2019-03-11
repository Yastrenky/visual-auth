import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Fade from '@material-ui/core/Fade';
import { connect } from "react-redux";
import { USERS } from '../../../actions';
import './navmenu.css';


const styles = theme => ({
  icon: {
    color: '#3f51b5'
  }
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
            <Icon className={classes.icon} color="primary" style={{ fontSize: 45 }}>
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
          <MenuItem onClick={this.handleClose} component={Link} to="./dashboard" >
            <Icon className={classes.icon} color="primary" style={{ fontSize: 30 }}>
              airplay
            </Icon>
            Dashboard
          </MenuItem>

          <MenuItem onClick={this.handleClose} component={Link} to="./billing" >
            <Icon className={classes.icon} color="primary" style={{ fontSize: 30 }}>
              attach_money
            </Icon>
            Billing
          </MenuItem>

          <MenuItem onClick={this.handleClose} component={Link} to="./profile" >
            <Icon className={classes.icon} color="primary" style={{ fontSize: 30 }}>
              account_box
           </Icon>
            Profile
           </MenuItem>

          <MenuItem onClick={this.props.logout}>
            <Icon className={classes.icon} color="primary" style={{ fontSize: 30 }}>
              cancel
           </Icon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch => USERS(dispatch)

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NavMenu));
