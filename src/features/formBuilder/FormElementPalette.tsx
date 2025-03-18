import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { Box, Typography, Paper, List, ListItem, Divider } from '@mui/material';
import {
  Title,
  Subtitles,
  Height,
  HorizontalRule,
  TextFields,
  Numbers,
  ArrowDropDownCircle,
  CalendarMonth,
  CheckBox,
  TextSnippet,
  Article,
} from '@mui/icons-material';
import { ElementType } from '../../types/formTypes';

interface DraggableElementProps {
  type: ElementType;
  icon: React.ReactNode;
  label: string;
  category: 'layout' | 'form';
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
  const layoutElements: DraggableElementProps[] = [
    { type: 'title', icon: <Title />, label: 'Title', category: 'layout' },
    { type: 'subtitle', icon: <Subtitles />, label: 'Subtitle', category: 'layout' },
    { type: 'spacer', icon: <Height />, label: 'Spacer', category: 'layout' },
    { type: 'separator', icon: <HorizontalRule />, label: 'Separator', category: 'layout' },
    { type: 'paragraph', icon: <Article />, label: 'Paragraph', category: 'layout' },
  ];

  const formElements: DraggableElementProps[] = [
    { type: 'text', icon: <TextFields />, label: 'Text Input', category: 'form' },
    { type: 'number', icon: <Numbers />, label: 'Number Input', category: 'form' },
    { type: 'select', icon: <ArrowDropDownCircle />, label: 'Dropdown', category: 'form' },
    { type: 'date', icon: <CalendarMonth />, label: 'Date Picker', category: 'form' },
    { type: 'checkbox', icon: <CheckBox />, label: 'Checkbox', category: 'form' },
    { type: 'textarea', icon: <TextSnippet />, label: 'Text Area', category: 'form' },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Layout Elements
      </Typography>
      <List>
        {layoutElements.map((element) => (
          <ListItem key={element.type} disablePadding sx={{ mb: 1 }}>
            <DraggableElement {...element} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Form Fields
      </Typography>
      <List>
        {formElements.map((element) => (
          <ListItem key={element.type} disablePadding sx={{ mb: 1 }}>
            <DraggableElement {...element} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FormElementPalette; 