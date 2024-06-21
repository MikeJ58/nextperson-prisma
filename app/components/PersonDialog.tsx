// 'use client'

import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Autocomplete } from '@mui/material';
import { Person } from '../lib/person';

interface PersonDialogProps {
  open: boolean;
  handleClose: () => void;
  currentPerson: Person | null;
  setCurrentPerson: React.Dispatch<React.SetStateAction<Person | null>>;
  handleSubmit: () => void;
}

const cityOptions = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
const suburbOptions = ['Brooklyn', 'Hollywood', 'Downtown', 'Uptown', 'Midtown'];

const PersonDialog: React.FC<PersonDialogProps> = ({ open, handleClose, currentPerson, setCurrentPerson, handleSubmit }) => {
  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    if (!isNaN(date.getTime())) {
      setCurrentPerson(prev => ({ ...prev!, dob: date }));
    } else {
      setCurrentPerson(prev => ({ ...prev!, dob: e.target.value as any }));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{currentPerson ? 'Edit Person' : 'Add Person'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="First Name"
          fullWidth
          value={currentPerson?.firstname || ''}
          onChange={e => setCurrentPerson(prev => ({ ...prev!, firstname: e.target.value }))}
        />
        <TextField
          margin="dense"
          label="Last Name"
          fullWidth
          value={currentPerson?.lastname || ''}
          onChange={e => setCurrentPerson(prev => ({ ...prev!, lastname: e.target.value }))}
        />
        <TextField
          margin="dense"
          label="Phone"
          fullWidth
          value={currentPerson?.phone || ''}
          onChange={e => setCurrentPerson(prev => ({ ...prev!, phone: e.target.value }))}
        />
        <TextField
          margin="dense"
          label="dob"
          type="date"
          fullWidth
          value={currentPerson?.dob ? new Date(currentPerson.dob).toISOString().split('T')[0] : ''}
          onChange={handleDobChange}
        />
        <Autocomplete
          options={cityOptions}
          value={currentPerson?.city || ''}
          onChange={(e, value) => setCurrentPerson(prev => ({ ...prev!, city: value || '' }))}
          isOptionEqualToValue={(option, value) => option === value}
          renderInput={(params) => <TextField {...params} margin="dense" label="City" fullWidth />}
        />
        <Autocomplete
          options={suburbOptions}
          value={currentPerson?.suburb || ''}
          onChange={(e, value) => setCurrentPerson(prev => ({ ...prev!, suburb: value || '' }))}
          isOptionEqualToValue={(option, value) => option === value}
          renderInput={(params) => <TextField {...params} margin="dense" label="Suburb" fullWidth />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {currentPerson ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PersonDialog;
