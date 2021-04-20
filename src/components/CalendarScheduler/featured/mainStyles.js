const getBorder = (theme) =>
  `1px solid ${
    theme.palette.type === 'light'
      ? lighten(fade(theme.palette.divider, 1), 0.88)
      : darken(fade(theme.palette.divider, 1), 0.68)
  }`;

export default function mainStyles(theme) {
  return {
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
    appointment: {
      borderRadius: '10px',
      '&:hover': {
        opacity: 0.6,
      },
    },
    apptContent: {
      '&>div>div': {
        whiteSpace: 'normal !important',
        lineHeight: 1.2,
      },
    },
    flexibleSpace: {
      flex: 'none',
    },
    flexContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    tooltipContent: {
      padding: theme.spacing(3, 1),
      paddingTop: 0,
      backgroundColor: theme.palette.background.paper,
      boxSizing: 'border-box',
      width: '400px',
    },
    tooltipText: {
      ...theme.typography.body2,
      display: 'inline-block',
    },
    title: {
      ...theme.typography.h6,
      color: theme.palette.text.secondary,
      fontWeight: theme.typography.fontWeightBold,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    icon: {
      color: theme.palette.action.active,
      verticalAlign: 'middle',
    },
    circle: {
      width: theme.spacing(4.5),
      height: theme.spacing(4.5),
      verticalAlign: 'super',
    },
    textCenter: {
      textAlign: 'center',
    },
    dateAndTitle: {
      lineHeight: 1.1,
    },
    titleContainer: {
      paddingBottom: theme.spacing(2),
    },
    container: {
      paddingBottom: theme.spacing(1.5),
    },
  };
}
