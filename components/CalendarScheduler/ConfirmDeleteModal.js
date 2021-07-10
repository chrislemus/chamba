import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Dialog,
} from '@material-ui/core';
export default function ConfirmDeleteModal({
  toggleConfirmDeleteModal,
  confirmDeleteModalIsOpen,
  commitDeletedEvent,
}) {
  return (
    <Dialog open={confirmDeleteModalIsOpen}>
      <DialogTitle>Delete Event</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this event?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={toggleConfirmDeleteModal}
          color="primary"
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={commitDeletedEvent}
          color="secondary"
          variant="outlined"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
