import { Button, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  wrapper: {
    position: 'relative',
    width: 'fit-content',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function SubmitButton(props) {
  const classes = useStyles();
  const { status, isValid, dirty, children } = props;
  const isLoading = status === 'loading';
  const isInvalid = props.hasOwnProperty('isValid') && !isValid;
  const isDirty = props.hasOwnProperty('dirty') && dirty === false;
  const shouldDisable = isLoading || isDirty || isInvalid;
  return (
    <div className={classes.wrapper}>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={shouldDisable}
      >
        {children}
      </Button>
      {isLoading ? (
        <CircularProgress className={classes.buttonProgress} size={20} />
      ) : null}
    </div>
  );
}
