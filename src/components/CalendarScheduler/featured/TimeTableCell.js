import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import classNames from 'clsx';
import WbSunny from '@material-ui/icons/WbSunny';
import FilterDrama from '@material-ui/icons/FilterDrama';
import Opacity from '@material-ui/icons/Opacity';
import { withStyles } from '@material-ui/core/styles';
import {
  darken,
  fade,
  lighten,
} from '@material-ui/core/styles/colorManipulator';

const WeatherIcon = ({ classes, id }) => {
  switch (id) {
    case 0:
      return <Opacity className={classes.rain} fontSize="large" />;
    case 1:
      return <WbSunny className={classes.sun} fontSize="large" />;
    case 2:
      return <FilterDrama className={classes.cloud} fontSize="large" />;
    default:
      return null;
  }
};
const getBorder = (theme) =>
  `1px solid ${
    theme.palette.type === 'light'
      ? lighten(fade(theme.palette.divider, 1), 0.88)
      : darken(fade(theme.palette.divider, 1), 0.68)
  }`;

const styles = (theme) => ({
  cell: {
    color: '#78909C!important',
    position: 'relative',
    userSelect: 'none',
    verticalAlign: 'top',
    padding: 0,
    height: 100,
    borderLeft: getBorder(theme),
    '&:first-child': {
      borderLeft: 'none',
    },
    '&:last-child': {
      paddingRight: 0,
    },
    'tr:last-child &': {
      borderBottom: 'none',
    },
    '&:hover': {
      backgroundColor: 'white',
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
  },
  text: {
    padding: '0.5em',
    textAlign: 'center',
  },
  sun: {
    color: '#FFEE58',
  },
  cloud: {
    color: '#90A4AE',
  },
  rain: {
    color: '#4FC3F7',
  },
  sunBack: {
    backgroundColor: '#FFFDE7',
  },
  cloudBack: {
    backgroundColor: '#ECEFF1',
  },
  rainBack: {
    backgroundColor: '#E1F5FE',
  },
  opacity: {
    opacity: '0.5',
  },
});

const CellBase = React.memo(
  ({
    classes,
    startDate,
    formatDate,
    otherMonth,
    // #FOLD_BLOCK
  }) => {
    const iconId = Math.abs(Math.floor(Math.sin(startDate.getDate()) * 10) % 3);
    const isFirstMonthDay = startDate.getDate() === 1;
    const formatOptions = isFirstMonthDay
      ? { day: 'numeric', month: 'long' }
      : { day: 'numeric' };
    return (
      <TableCell
        tabIndex={0}
        className={classNames({
          [classes.cell]: true,
          [classes.rainBack]: iconId === 0,
          [classes.sunBack]: iconId === 1,
          [classes.cloudBack]: iconId === 2,
          [classes.opacity]: otherMonth,
        })}
      >
        <div className={classes.content}>
          <WeatherIcon classes={classes} id={iconId} />
        </div>
        <div className={classes.text}>
          {formatDate(startDate, formatOptions)}
        </div>
      </TableCell>
    );
  }
);

export default withStyles(styles, { name: 'Cell' })(CellBase);
