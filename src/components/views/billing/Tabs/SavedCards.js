import React, { Component } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import ReactTable from "react-table";
import { Elements, StripeProvider } from 'react-stripe-elements';
import StripeCard from '../../stripeElem';
import { stripekey } from '../../../../config';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import { USERS, CARDS } from '../../../../actions';
import styles from '../../../../styles';

class SavedCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadremove: null,
    };
  }

  deletCard = (sourceid) => {
    const customerid = this.props.users.customerid
    this.setState({ loadremove: sourceid })
    this.props.deletCard(sourceid, customerid, (status) => {
      this.setState({loadremove: status })
      this.props.getCards()
     })
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className="stripe-card">

          <StripeProvider apiKey={stripekey}>
            <Elements>
              <StripeCard
                customerid={this.props.users.customerid}
                getSavedCards={this.props.getCards}
              />
            </Elements>
          </StripeProvider>

        </div>
        <ReactTable
          data={this.props.cards.cardsList}
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
            },
            {
              Header: "Delete Card",
              id: "click-me-button",
              Cell: ({ row }) => (this.state.loadremove === row.id ?
                <CircularProgress className={classes.progress} size={30} style={{ margin: 0 }}/>
                :
                <Icon className={classes.icon} color="secondary" style={{ fontSize: 30, margin: 0 , color: '#f50057' }} onClick={(e) => this.deletCard(row.id)}>
                  delete_forever
               </Icon>
                //  <button onClick={(e) => this.deletCard(row.id)}>Delete</button>
              )
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          loading={this.props.cards.cardsList_loading}
        />


      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    users: state.users,
    cards: state.cards
  }
};

function mapDispatchToProps (dispatch) {
  return {
    ...USERS(dispatch),
    ...CARDS(dispatch)
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SavedCards));
