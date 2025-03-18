import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  Button,
  Typography,
  InputLabel,
} from '@mui/material';
import { RootState } from '../../store/store';
import { addResponse } from '../../store/formSlice';
import { v4 as uuidv4 } from 'uuid';

const FormPreview: React.FC = () => {
  const dispatch = useDispatch();
  const currentTemplate = useSelector((state: RootState) => state.form.currentTemplate);
  const [formData, setFormData] = useState<Record<string, any>>({});

  if (!currentTemplate) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <Typography variant="h6">No form template selected</Typography>
      </Box>
    );
  }

  const handleInputChange = (elementId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [elementId]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const response = {
      id: uuidv4(),
      formId: currentTemplate.id,
      responses: formData,
      submittedAt: new Date().toISOString(),
    };
    dispatch(addResponse(response));
    setFormData({});
    // You could add a success message or redirect here
  };

  const renderFormElement = (element: any) => {
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
            value={formData[element.id] || ''}
            onChange={(e) => handleInputChange(element.id, e.target.value)}
            sx={{ mb: 2 }}
          />
        );
      case 'select':
        return (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>{element.label}</InputLabel>
            <Select
              value={formData[element.id] || ''}
              label={element.label}
              required={element.required}
              onChange={(e) => handleInputChange(element.id, e.target.value)}
            >
              {element.options?.map((option: string) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'radio':
        return (
          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <Typography variant="subtitle1">{element.label}</Typography>
            <RadioGroup
              value={formData[element.id] || ''}
              onChange={(e) => handleInputChange(element.id, e.target.value)}
            >
              {element.options?.map((option: string) => (
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
          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData[element.id] || false}
                  onChange={(e) =>
                    handleInputChange(element.id, e.target.checked)
                  }
                />
              }
              label={element.label}
            />
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        {currentTemplate.name}
      </Typography>
      {currentTemplate.elements.map((element) => (
        <Box key={element.id}>{renderFormElement(element)}</Box>
      ))}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default FormPreview; 