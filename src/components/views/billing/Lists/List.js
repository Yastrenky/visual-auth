import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  listoverflow: {
    overflow: "auto",
    height: 245
  }

});

class CheckboxList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: null,
      data: this.props.data || []
    };
  }

  handleToggle = value => () => {
    if (this.state.checked === value) {
      this.setState({
        checked: null,
      });
    }
    else {
      this.setState({
        checked: value,
      });
    }
  };

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <p>Select card</p>
        <List
          className={classes.listoverflow}
        >
          {this.state.data.map((value, index) => (
            <ListItem
              key={index}
              role={undefined}
              dense
              button
              onClick={this.handleToggle(index)}
              className={classes.listItem}
            >
              <Checkbox
                checked={this.state.checked === index}
                tabIndex={-1}
                disableRipple
                color="primary"
              />
              <ListItemText primary={`Credit number ${value + 1}/ exp date `} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxList);