import red from '@material-ui/core/colors/red';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  media: {
    backgroundPosition: 'center',
    backgroundSize: 142,
    height: 140,
    width: 140,
    borderRadius: 100,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 320,
  },
  button: {
    margin: 15,
    width: 100,
    width: 100,
  },
  input: {
    display: 'none',
  },
  initial: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  menu: {
    width: 200,
  },
  icon: {
    margin: theme.spacing.unit * 2,
    color: '#3f51b5'
  },

  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: red[800],
    }
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  size: {
    width: 40,
    height: 0,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  listoverflow: {
    overflow: "auto",
    height: 245,
    margin:20
  }
});

export default styles