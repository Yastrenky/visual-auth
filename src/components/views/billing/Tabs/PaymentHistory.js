import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactTable from "react-table";
import server from '../../../../config';
import Icon from '@material-ui/core/Icon';

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
});


class PaymentHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  getSavedCards = () => {
    fetch(server + '/getAllCards', { credentials: 'include' })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        var list = result.cards.data
        var newData = [];

        list.forEach((card => newData.push({
          name: card.name,
          id: card.id,
          brand: card.brand,
          card: card.last4,
          date: card.exp_month + "/" + card.exp_year,
          zipcode: card.address_zip
        })));

        this.setState({
          data: newData
        })
      })
      .catch(e => console.log(e));
  }
  componentDidMount() {
    this.getSavedCards();
  }

  render() {
    console.log("state", this.state)
    const { classes } = this.props;

    return (
      <div>

        <ReactTable
          data={this.state.data}
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
              Cell: ({ row }) => (<Icon className={classes.icon} color="secondary" style={{ fontSize: 30 }} onClick={(e) => this.deletCard(row.id)}>
                delete_forever
           </Icon>
                //  <button onClick={(e) => this.deletCard(row.id)}>Delete</button>
              )
            }
          ]}
          defaultPageSize={15}
          className="-striped -highlight"
        />


      </div>
    );
  }
}

export default withStyles(styles)(PaymentHistory);
