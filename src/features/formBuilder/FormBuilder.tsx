import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, Paper, Typography, Grid, Button } from '@mui/material';
import { RootState } from '../../store/store';
import { toggleEditMode, setCurrentTemplate } from '../../store/formSlice';
import FormElementPalette from './FormElementPalette';
import FormCanvas from './FormCanvas';
import FormPreview from './FormPreview';
import { v4 as uuidv4 } from 'uuid';

const FormBuilder: React.FC = () => {
  const dispatch = useDispatch();
  const { isEditMode, currentTemplate } = useSelector((state: RootState) => state.form);

  const handleCreateNewForm = () => {
    const newTemplate = {
      id: uuidv4(),
      name: 'New Form',
      elements: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch(setCurrentTemplate(newTemplate));
  };

  const handleToggleMode = () => {
    dispatch(toggleEditMode());
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Form Builder</Typography>
          <Box>
            {currentTemplate && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleToggleMode}
                sx={{ mr: 2 }}
              >
                {isEditMode ? 'Preview Form' : 'Edit Form'}
              </Button>
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCreateNewForm}
            >
              Create New Form
            </Button>
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
      </Container>
    </DndProvider>
  );
};

export default FormBuilder; 