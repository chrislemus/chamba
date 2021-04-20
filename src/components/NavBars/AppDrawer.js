import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});
export default function AppDrawer({ isDrawerOpen, setIsDrawerOpen }) {
  const classes = useStyles();
  return (
    <Drawer
      anchor={'left'}
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
    >
      <div className={classes.list}>
        <List>
          <ListItem button key="Inbox">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="Mail">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Mail" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}
