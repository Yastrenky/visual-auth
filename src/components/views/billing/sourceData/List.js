import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import PaymentIcon from 'react-payment-icons';
import styles from '../../../../styles';

class CheckboxList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: null,
    };
  }

  handleToggle = card => () => {
    if (this.state.checked === card) {
      this.setState({
        checked: null,
      });
      this.props.selectCard(null)
    }
    else {
      this.setState({
        checked: card,
      });
      this.props.selectCard(card)
    }
  };

  render() {
    const { classes } = this.props;
    // console.log(this.props)
    return (
      <div className={classes.root}>
        <p>Select Card</p>
        <List
          className={classes.listoverflow}
        >
          {this.props.data.length > 0? this.props.data.map((value) => (
            <ListItem
              key={value.id}
              role={undefined}
              dense
              button
              onClick={this.handleToggle(value.id)}
              className={classes.listItem}
            >
              <Checkbox
                checked={this.state.checked === value.id}
                tabIndex={-1}
                disableRipple
                color="primary"
              />
              <PaymentIcon
                id={value.brand === "American Express" ? "amex" : value.brand.toLowerCase()}
                style={{ margin: 5, width: 60 }}
                className="payment-icon"
              />
              <ListItemText primary={`****  ${value.card} (${value.date}) `} />
            </ListItem>
          )): <div>Please add payment method</div>}
        </List>
      </div>
    );
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxList);