import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

export default {
  black,
  white,
  primary: {
    // contrastText: white,
    // main: '#a3c245',
    main: '#272354',
    // dark: colors.indigo[900],
    // main: colors.indigo[500],
    // light: colors.indigo[100]
  },
  secondary: {
    // contrastText: white,
    // dark: colors.blue[900],
    // main: colors.blue['A400'],
    // light: colors.blue['A400']
    main: '#A362A5',
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: colors.blueGrey[900], //'#F1F1F3',
    secondary: colors.blueGrey[600],
    link: colors.blue[600],
  },
  link: colors.blue[800],
  icon: colors.blueGrey[600],
  background: {
    // default: '#F4F6F8',
    default: '#FAFAFA',
    paper: white,
  },
  divider: colors.grey[200],
  // background: {
  //   paper: '#373D51',
  // },
};
