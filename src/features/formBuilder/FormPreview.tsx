import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  InputLabel,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material';
import { RootState } from '../../store/store';
import { addResponse } from '../../store/formSlice';
import { v4 as uuidv4 } from 'uuid';
import { FormTemplate, FormElement } from '../../types/formTypes';

interface FormPreviewProps {
  template?: FormTemplate;
}

const FormPreview: React.FC<FormPreviewProps> = ({ template }) => {
  const dispatch = useDispatch();
  const currentTemplate = template || useSelector((state: RootState) => state.form.currentTemplate);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  if (!currentTemplate) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <Typography variant="h6">No form template selected</Typography>
      </Box>
    );
  }

  const validateForm = () => {
    const errors: Record<string, string> = {};
    currentTemplate.elements.forEach((element) => {
      if (element.required && !formData[element.id]) {
        errors[element.id] = 'This field is required';
      }
      if (element.validation) {
        const value = formData[element.id];
        if (element.validation.pattern && value) {
          const regex = new RegExp(element.validation.pattern);
          if (!regex.test(value)) {
            errors[element.id] = element.validation.customError || 'Invalid format';
          }
        }
        if (element.validation.minLength && value?.length < element.validation.minLength) {
          errors[element.id] = `Minimum length is ${element.validation.minLength}`;
        }
        if (element.validation.maxLength && value?.length > element.validation.maxLength) {
          errors[element.id] = `Maximum length is ${element.validation.maxLength}`;
        }
        if (element.validation.min && Number(value) < element.validation.min) {
          errors[element.id] = `Minimum value is ${element.validation.min}`;
        }
        if (element.validation.max && Number(value) > element.validation.max) {
          errors[element.id] = `Maximum value is ${element.validation.max}`;
        }
      }
    });
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (elementId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [elementId]: value,
    }));
    if (validationErrors[elementId]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[elementId];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const response = {
      id: uuidv4(),
      formId: currentTemplate.id,
      responses: formData,
      submittedAt: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };
    dispatch(addResponse(response));
    setFormData({});
    setShowSuccess(true);
  };

  const renderLayoutElement = (element: FormElement) => {
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

  const renderFormElement = (element: FormElement) => {
    const commonProps = {
      fullWidth: true,
      required: element.required,
      error: !!validationErrors[element.id],
      helperText: validationErrors[element.id],
      value: formData[element.id] || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleInputChange(element.id, e.target.value),
    };

    switch (element.type) {
      case 'text':
        return (
          <TextField
            {...commonProps}
            label={element.label}
            placeholder={element.placeholder}
          />
        );
      case 'number':
        return (
          <TextField
            {...commonProps}
            type="number"
            label={element.label}
            placeholder={element.placeholder}
            inputProps={{
              min: element.validation?.min,
              max: element.validation?.max,
            }}
          />
        );
      case 'select':
        return (
          <FormControl fullWidth error={!!validationErrors[element.id]}>
            <InputLabel>{element.label}</InputLabel>
            <Select
              value={formData[element.id] || ''}
              label={element.label}
              onChange={(e) => handleInputChange(element.id, e.target.value)}
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
            {...commonProps}
            type="date"
            label={element.label}
            InputLabelProps={{ shrink: true }}
          />
        );
      case 'checkbox':
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={formData[element.id] || false}
                onChange={(e) => handleInputChange(element.id, e.target.checked)}
              />
            }
            label={element.label}
          />
        );
      case 'textarea':
        return (
          <TextField
            {...commonProps}
            multiline
            minRows={3}
            label={element.label}
            placeholder={element.placeholder}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
      {currentTemplate.elements.map((element) => (
        <Box key={element.id} sx={{ mb: 2 }}>
          {['title', 'subtitle', 'paragraph', 'spacer', 'separator'].includes(element.type)
            ? renderLayoutElement(element)
            : renderFormElement(element)}
        </Box>
      ))}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
      >
        {currentTemplate.settings?.submitButtonText || 'Submit'}
      </Button>
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Form submitted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FormPreview; 