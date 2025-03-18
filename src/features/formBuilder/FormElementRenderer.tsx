import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  Checkbox,
  IconButton,
  Paper,
  Typography,
  InputLabel,
  Divider,
  TextareaAutosize,
} from '@mui/material';
import { Delete, Edit, DragIndicator } from '@mui/icons-material';
import { FormElement } from '../../types/formTypes';
import { removeElement, updateElement } from '../../store/formSlice';

interface FormElementRendererProps {
  element: FormElement;
}

const FormElementRenderer: React.FC<FormElementRendererProps> = ({ element }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedElement, setEditedElement] = useState(element);

  const handleDelete = () => {
    dispatch(removeElement(element.id));
  };

  const handleEdit = () => {
    if (isEditing) {
      dispatch(updateElement({ id: element.id, element: editedElement }));
    }
    setIsEditing(!isEditing);
  };

  const renderLayoutElement = () => {
    switch (element.type) {
      case 'title':
        return (
          <Typography variant="h4" align={element.style?.textAlign || 'left'} gutterBottom>
            {element.label}
          </Typography>
        );
      case 'subtitle':
        return (
          <Typography variant="h6" align={element.style?.textAlign || 'left'} gutterBottom>
            {element.label}
          </Typography>
        );
      case 'paragraph':
        return (
          <Typography variant="body1" align={element.style?.textAlign || 'left'} paragraph>
            {element.label}
          </Typography>
        );
      case 'spacer':
        return <Box sx={{ height: element.style?.height || '2rem' }} />;
      case 'separator':
        return <Divider sx={{ my: element.style?.margin || 2 }} />;
      default:
        return null;
    }
  };

  const renderFormElement = () => {
    switch (element.type) {
      case 'text':
        return (
          <TextField
            fullWidth
            label={element.label}
            placeholder={element.placeholder}
            required={element.required}
          />
        );
      case 'number':
        return (
          <TextField
            fullWidth
            type="number"
            label={element.label}
            placeholder={element.placeholder}
            required={element.required}
            inputProps={{
              min: element.validation?.min,
              max: element.validation?.max,
            }}
          />
        );
      case 'select':
        return (
          <FormControl fullWidth>
            <InputLabel>{element.label}</InputLabel>
            <Select
              label={element.label}
              required={element.required}
              placeholder={element.placeholder}
            >
              {element.options?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'date':
        return (
          <TextField
            fullWidth
            type="date"
            label={element.label}
            required={element.required}
            InputLabelProps={{ shrink: true }}
          />
        );
      case 'checkbox':
        return (
          <FormControlLabel
            control={<Checkbox />}
            label={element.label}
            required={element.required}
          />
        );
      case 'textarea':
        return (
          <TextField
            fullWidth
            multiline
            minRows={3}
            label={element.label}
            placeholder={element.placeholder}
            required={element.required}
          />
        );
      default:
        return null;
    }
  };

  const renderEditForm = () => (
    <Box sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Label"
        value={editedElement.label}
        onChange={(e) =>
          setEditedElement({ ...editedElement, label: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      {['text', 'number', 'textarea', 'select'].includes(element.type) && (
        <TextField
          fullWidth
          label="Placeholder"
          value={editedElement.placeholder || ''}
          onChange={(e) =>
            setEditedElement({ ...editedElement, placeholder: e.target.value })
          }
          sx={{ mb: 2 }}
        />
      )}
      {element.type === 'select' && (
        <TextField
          fullWidth
          label="Options (comma-separated)"
          value={editedElement.options?.join(', ') || ''}
          onChange={(e) =>
            setEditedElement({
              ...editedElement,
              options: e.target.value.split(',').map((opt) => opt.trim()),
            })
          }
          sx={{ mb: 2 }}
        />
      )}
      {['text', 'number', 'select', 'date', 'checkbox', 'textarea'].includes(element.type) && (
        <FormControlLabel
          control={
            <Checkbox
              checked={editedElement.required}
              onChange={(e) =>
                setEditedElement({
                  ...editedElement,
                  required: e.target.checked,
                })
              }
            />
          }
          label="Required"
        />
      )}
      {['title', 'subtitle', 'paragraph'].includes(element.type) && (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Text Align</InputLabel>
          <Select
            value={editedElement.style?.textAlign || 'left'}
            onChange={(e) =>
              setEditedElement({
                ...editedElement,
                style: {
                  ...editedElement.style,
                  textAlign: e.target.value as 'left' | 'center' | 'right',
                },
              })
            }
          >
            <MenuItem value="left">Left</MenuItem>
            <MenuItem value="center">Center</MenuItem>
            <MenuItem value="right">Right</MenuItem>
          </Select>
        </FormControl>
      )}
      {['spacer', 'separator'].includes(element.type) && (
        <TextField
          fullWidth
          label="Size"
          value={element.type === 'spacer' ? editedElement.style?.height : editedElement.style?.margin}
          onChange={(e) =>
            setEditedElement({
              ...editedElement,
              style: {
                ...editedElement.style,
                [element.type === 'spacer' ? 'height' : 'margin']: e.target.value,
              },
            })
          }
          placeholder={element.type === 'spacer' ? '2rem' : '2'}
          sx={{ mb: 2 }}
        />
      )}
    </Box>
  );

  return (
    <Paper 
      sx={{ 
        p: 2, 
        mb: 2, 
        position: 'relative',
        '&:hover .element-actions': {
          opacity: 1,
        },
      }}
    >
      <Box 
        className="element-actions"
        sx={{ 
          position: 'absolute',
          top: 8,
          right: 8,
          opacity: 0,
          transition: 'opacity 0.2s',
          backgroundColor: 'background.paper',
          borderRadius: 1,
          boxShadow: 1,
          display: 'flex',
          gap: 1,
        }}
      >
        <IconButton size="small">
          <DragIndicator />
        </IconButton>
        <IconButton size="small" onClick={handleEdit}>
          <Edit />
        </IconButton>
        <IconButton size="small" onClick={handleDelete}>
          <Delete />
        </IconButton>
      </Box>
      {['title', 'subtitle', 'paragraph', 'spacer', 'separator'].includes(element.type)
        ? renderLayoutElement()
        : renderFormElement()}
      {isEditing && renderEditForm()}
    </Paper>
  );
};

export default FormElementRenderer; 