import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../store/store';
import { toggleEditMode, addTemplate, setCurrentTemplate } from '../../store/formSlice';
import FormElementPalette from './FormElementPalette';
import FormCanvas from './FormCanvas';
import FormPreview from './FormPreview';

const FormBuilder: React.FC = () => {
  const dispatch = useDispatch();
  const { isEditMode, currentTemplate } = useSelector((state: RootState) => state.form);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');

  const handleCreateTemplate = () => {
    const newTemplate = {
      id: uuidv4(),
      name: templateName,
      elements: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch(addTemplate(newTemplate));
    dispatch(setCurrentTemplate(newTemplate));
    setTemplateName('');
    setIsDialogOpen(false);
  };

  const handleToggleMode = () => {
    dispatch(toggleEditMode());
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">Form Builder</Typography>
          <Box>
            <Button
              variant="outlined"
              onClick={() => setIsDialogOpen(true)}
              sx={{ mr: 2 }}
            >
              Create New Form
            </Button>
            {currentTemplate && (
              <Button
                variant="contained"
                onClick={handleToggleMode}
              >
                {isEditMode ? 'Preview Form' : 'Edit Form'}
              </Button>
            )}
          </Box>
        </Box>

        <Grid container spacing={3}>
          {isEditMode ? (
            <>
              <Grid item xs={12} md={3}>
                <Paper sx={{ p: 2, height: '100%' }}>
                  <FormElementPalette />
                </Paper>
              </Grid>
              <Grid item xs={12} md={9}>
                <Paper sx={{ p: 2, minHeight: '70vh' }}>
                  <FormCanvas />
                </Paper>
              </Grid>
            </>
          ) : (
            <Grid item xs={12}>
              <Paper sx={{ p: 2, minHeight: '70vh' }}>
                <FormPreview />
              </Paper>
            </Grid>
          )}
        </Grid>

        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <DialogTitle>Create New Form</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Form Name"
              fullWidth
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleCreateTemplate}
              disabled={!templateName.trim()}
              variant="contained"
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </DndProvider>
  );
};

export default FormBuilder; 