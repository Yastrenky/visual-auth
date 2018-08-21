import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactTable from "react-table";
import { Elements, StripeProvider } from 'react-stripe-elements';
import StripeCard from '../../stripeElem';
import server,{ stripekey } from '../../../../config';

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


class SavedCards extends Component {
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
    // console.log("state", this.state.user)

    return (
      <div>
        <div className="stripe-card">

          <StripeProvider apiKey={stripekey}>
            <div className="example">
              <h1>React Stripe Elements Example</h1>
              <Elements>
                <StripeCard
                  customerid={this.props.customerid}
                  getSavedCards={this.getSavedCards}
                />
              </Elements>
            </div>
          </StripeProvider>

        </div>
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
            }
          ]}
          defaultPageSize={15}
          className="-striped -highlight"
        />


      </div>
    );
  }
}

export default withStyles(styles)(SavedCards);
