import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  DesktopWindows as DesktopIcon,
  TabletAndroid as TabletIcon,
  PhoneAndroid as MobileIcon,
  ContentCopy as CopyIcon,
} from '@mui/icons-material';
import { FormTemplate } from '../../types/formTypes';
import FormPreview from './FormPreview';

interface FormPreviewDialogProps {
  open: boolean;
  onClose: () => void;
  template: FormTemplate;
}

type DeviceType = 'mobile' | 'tablet' | 'desktop';

const FormPreviewDialog: React.FC<FormPreviewDialogProps> = ({ open, onClose, template }) => {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>('desktop');
  const [copySuccess, setCopySuccess] = useState(false);

  const getPreviewWidth = () => {
    switch (selectedDevice) {
      case 'mobile':
        return '360px';
      case 'tablet':
        return '768px';
      case 'desktop':
        return '1024px';
      default:
        return '100%';
    }
  };

  const handleCopyUrl = async () => {
    if (template.shareableUrl) {
      try {
        await navigator.clipboard.writeText(template.shareableUrl);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error('Failed to copy URL:', err);
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          height: '90vh',
        },
      }}
    >
      <DialogTitle>
        Form Preview
        <Box sx={{ float: 'right' }}>
          <ToggleButtonGroup
            value={selectedDevice}
            exclusive
            onChange={(_, value) => value && setSelectedDevice(value)}
            size="small"
          >
            <ToggleButton value="mobile">
              <Tooltip title="Mobile view">
                <MobileIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="tablet">
              <Tooltip title="Tablet view">
                <TabletIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="desktop">
              <Tooltip title="Desktop view">
                <DesktopIcon />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
          {template.shareableUrl && (
            <Tooltip title={copySuccess ? 'Copied!' : 'Copy shareable URL'}>
              <IconButton onClick={handleCopyUrl} size="small" sx={{ ml: 1 }}>
                <CopyIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            width: getPreviewWidth(),
            mx: 'auto',
            backgroundColor: '#f5f5f5',
            borderRadius: 2,
            p: 3,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <FormPreview template={template} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormPreviewDialog; 