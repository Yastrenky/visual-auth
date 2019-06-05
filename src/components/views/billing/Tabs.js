import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SavedCards from './Tabs/SavedCards';
import PaymentHistory from './Tabs/PaymentHistory';
import MakePayment from './Tabs/MakePayment';
import styles from '../../../styles'

function TabContainer ({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

class FullWidthTabs extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      value: 0
    };
  }
  handleChange = (event, value) => {
    localStorage.setItem(`billingTab:${ this.props.userId }`, value.toString()) 
    this.setState({ value });
  };

  handleChangeIndex = index => {
    localStorage.setItem(`billingTab:${ this.props.userId }`, index.toString()) 
    this.setState({ value: index });
    window.scroll(0, 0)
  };

  componentDidMount () {
    const tab = localStorage.getItem(`billingTab:${this.props.userId}`)
    if (tab) {
      this.setState({ value: parseInt(tab, 8) })
    }
  }
  
  render () {
    // console.log("tab props", this.props)
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            centered={true}
          >
            <Tab label="Make a Payment" />
            <Tab label="Payment History" />
            <Tab label="Saved Cards" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            {<MakePayment goToTab={this.handleChangeIndex} />}
          </TabContainer>

          <TabContainer dir={theme.direction}>
            {<PaymentHistory goToTab={this.handleChangeIndex} />}
          </TabContainer>

          <TabContainer dir={theme.direction}>
            {<SavedCards goToTab={this.handleChangeIndex} />}
          </TabContainer>

        </SwipeableViews>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);