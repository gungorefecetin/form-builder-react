import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { Box, Typography, Paper, List, ListItem } from '@mui/material';
import {
  TextFields,
  Numbers,
  Email,
  CheckBox,
  RadioButtonChecked,
  ArrowDropDownCircle,
} from '@mui/icons-material';

interface DraggableElementProps {
  type: string;
  icon: React.ReactNode;
  label: string;
}

const DraggableElement: React.FC<DraggableElementProps> = ({ type, icon, label }) => {
  const dragElementRef = useRef<HTMLDivElement>(null);
  const [{ isDragging }, dragRef] = useDrag({
    type: 'formElement',
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Connect the drag ref to our div
  dragRef(dragElementRef);

  return (
    <div ref={dragElementRef} style={{ width: '100%', cursor: 'move' }}>
      <Paper
        elevation={isDragging ? 0 : 1}
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          opacity: isDragging ? 0.5 : 1,
          mb: 1,
          backgroundColor: isDragging ? 'action.hover' : 'background.paper',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        {icon}
        <Typography>{label}</Typography>
      </Paper>
    </div>
  );
};

const FormElementPalette: React.FC = () => {
  const elements = [
    { type: 'text', icon: <TextFields />, label: 'Text Input' },
    { type: 'number', icon: <Numbers />, label: 'Number Input' },
    { type: 'email', icon: <Email />, label: 'Email Input' },
    { type: 'select', icon: <ArrowDropDownCircle />, label: 'Dropdown' },
    { type: 'radio', icon: <RadioButtonChecked />, label: 'Radio Group' },
    { type: 'checkbox', icon: <CheckBox />, label: 'Checkbox' },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Form Elements
      </Typography>
      <List>
        {elements.map((element) => (
          <ListItem key={element.type} disablePadding sx={{ mb: 1 }}>
            <DraggableElement {...element} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FormElementPalette; 