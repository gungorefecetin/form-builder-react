import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { addElement } from '../../store/formSlice';
import { RootState } from '../../store/store';
import { FormElement } from '../../types/formTypes';
import FormElementRenderer from './FormElementRenderer';

const FormCanvas: React.FC = () => {
  const dispatch = useDispatch();
  const currentTemplate = useSelector((state: RootState) => state.form.currentTemplate);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'formElement',
    drop: (item: { type: string }) => {
      if (!currentTemplate) return;
      
      const newElement: FormElement = {
        id: uuidv4(),
        type: item.type as FormElement['type'],
        label: `New ${item.type} field`,
        required: false,
        placeholder: '',
      };
      dispatch(addElement(newElement));
    },
    canDrop: () => !!currentTemplate,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  if (!currentTemplate) {
    return (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
          border: '2px dashed',
          borderColor: 'divider',
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Create or select a form template to start building
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      ref={drop}
      sx={{
        minHeight: '60vh',
        p: 2,
        backgroundColor: isOver && canDrop ? 'action.hover' : 'background.default',
        transition: 'background-color 0.2s',
        border: '2px dashed',
        borderColor: isOver && canDrop ? 'primary.main' : 'divider',
        borderRadius: 1,
      }}
    >
      {currentTemplate.elements.length === 0 ? (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body1" color="text.secondary">
            Drag and drop form elements here
          </Typography>
        </Box>
      ) : (
        currentTemplate.elements.map((element) => (
          <FormElementRenderer key={element.id} element={element} />
        ))
      )}
    </Box>
  );
};

export default FormCanvas; 