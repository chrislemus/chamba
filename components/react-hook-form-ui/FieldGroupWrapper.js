import {
  Table,
  IconButton,
  TablePagination,
  Box,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Typography,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  fieldGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    '& > *:not(:first-child):not(:last-child)': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    '& > *:first-child': {
      marginRight: theme.spacing(1),
    },
    '& > *:last-child': {
      marginLeft: theme.spacing(1),
    },
  },
}));

export default function FieldGroupWrapper({ children }) {
  const classes = useStyles();
  return <div className={classes.fieldGroup}>{children}</div>;
}
