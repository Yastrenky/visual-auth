import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import "react-table/react-table.css";
import { NavMenu, Footer } from '../';
import './dashboard.css';
import styles from '../../../styles'

class Dashboard extends PureComponent {
  render() {
    // console.log("state", this.state)
    const { classes } = this.props;

    return (
      <div className='view-container'>
        <NavMenu variant="contained" />
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
