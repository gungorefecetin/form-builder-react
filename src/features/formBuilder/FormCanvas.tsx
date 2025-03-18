import React, { useRef } from 'react';
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
  const dropTargetRef = useRef<HTMLDivElement>(null);

  const [{ isOver, canDrop }, dropRef] = useDrop({
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
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: () => !!currentTemplate,
  });

  // Connect the drop ref to our div
  dropRef(dropTargetRef);

  const dropAreaStyles = {
    minHeight: '60vh',
    height: '100%',
    p: 2,
    backgroundColor: isOver ? 'action.hover' : 'background.default',
    transition: 'all 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: currentTemplate?.elements.length === 0 ? 'center' : 'flex-start',
    border: '2px dashed',
    borderColor: isOver ? 'primary.main' : 'transparent',
    position: 'relative',
    '&::after': canDrop ? {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 1,
      backgroundColor: 'transparent'
    } : {}
  };

  const content = currentTemplate ? (
    currentTemplate.elements.length === 0 ? (
      <Typography variant="body1" color="text.secondary">
        Drag and drop form elements here
      </Typography>
    ) : (
      <Box sx={{ width: '100%' }}>
        {currentTemplate.elements.map((element) => (
          <FormElementRenderer key={element.id} element={element} />
        ))}
      </Box>
    )
  ) : (
    <Typography variant="h6" color="text.secondary">
      Create or select a form template to start building
    </Typography>
  );

  return (
    <div ref={dropTargetRef} style={{ height: '100%' }}>
      <Box sx={dropAreaStyles}>
        {content}
      </Box>
    </div>
  );
};

export default FormCanvas; 