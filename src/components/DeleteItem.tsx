import { Box, Dialog, Button, DialogContent, DialogContentText, DialogTitle, DialogActions, IconButton } from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteItem() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <Box>
      <IconButton color="error" onClick={handleOpen}>
        <DeleteIcon sx={{ cursor: 'pointer' }} />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Do you want to delete this book?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Once the book is deleted it cannot be recovered.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}