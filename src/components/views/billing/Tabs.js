import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ReactTable from "react-table";
import { Elements, StripeProvider } from 'react-stripe-elements';
import StripeCard from '../stripeElem';
import { stripekey } from '../../../config';

function TabContainer({ children, dir }) {
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

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,

  },
});

class FullWidthTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    console.log(this.props.data)
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth={true}
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
          <TabContainer dir={theme.direction}>Make a Payment</TabContainer>
          <TabContainer dir={theme.direction}>Payment History</TabContainer>
          <TabContainer dir={theme.direction}>{

            <div>
              <div className="stripe-card">

                <StripeProvider apiKey={stripekey}>
                  <div className="example">
                    <h1>React Stripe Elements Example</h1>
                    <Elements>
                      <StripeCard 
                      customerid={this.props.customerid}
                        getSavedCards = {this.props.getSavedCards}
                      />
                    </Elements>
                  </div>
                </StripeProvider>

              </div>
              <ReactTable
                data={this.props.data}
                columns={[
                  {
                    Header: "Cardholder Name",
                    accessor: "name"
                  },
                  {
                    Header: "Card id",
                    accessor: "id"
                  },
                  {
                    Header: "Brand",
                    accessor: "brand"
                  },
                  {
                    Header: "Number",
                    id: "card",
                    accessor: d => (d.card) ? "**** **** **** " + d.card : 'unknown'
                  },
                  {
                    Header: "Expiration Date",
                    accessor: 'date'
                  }
                  ,
                  {
                    Header: "Zipcode",
                    accessor: 'zipcode'
                  }
                ]}
                defaultPageSize={15}
                className="-striped -highlight"
              />


            </div>
          }

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