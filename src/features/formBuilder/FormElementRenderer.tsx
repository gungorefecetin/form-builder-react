import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
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

  const renderElement = () => {
    switch (element.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <TextField
            fullWidth
            type={element.type}
            label={element.label}
            placeholder={element.placeholder}
            required={element.required}
          />
        );
      case 'select':
        return (
          <FormControl fullWidth>
            <Select
              value=""
              displayEmpty
              label={element.label}
              required={element.required}
            >
              {element.options?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'radio':
        return (
          <FormControl component="fieldset">
            <RadioGroup>
              {element.options?.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      case 'checkbox':
        return (
          <FormControlLabel
            control={<Checkbox />}
            label={element.label}
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
      <TextField
        fullWidth
        label="Placeholder"
        value={editedElement.placeholder || ''}
        onChange={(e) =>
          setEditedElement({ ...editedElement, placeholder: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      {(element.type === 'select' || element.type === 'radio') && (
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
    </Box>
  );

  return (
    <Paper sx={{ p: 2, mb: 2, position: 'relative' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="subtitle1">{element.label}</Typography>
        <Box>
          <IconButton onClick={handleEdit}>
            <Edit />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <Delete />
          </IconButton>
        </Box>
      </Box>
      {renderElement()}
      {isEditing && renderEditForm()}
    </Paper>
  );
};

export default FormElementRenderer; 