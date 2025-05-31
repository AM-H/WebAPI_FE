'use client';
import {
  Dialog,
  Button,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteButton({ onDelete }: { onDelete: () => void }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleDeleteClick = () => {
    console.log("Delete button clicked, onDelete is:", typeof onDelete, onDelete);
    handleClose();
    onDelete();
   
  };

  return (
    <>
      <IconButton color="error" onClick={handleOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete this book?</DialogTitle>
        <DialogContent>
          <DialogContentText>This cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="error" onClick={handleDeleteClick} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

