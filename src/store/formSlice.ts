import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormTemplate, FormElement, FormResponse } from '../types/formTypes';

interface FormState {
  templates: FormTemplate[];
  currentTemplate: FormTemplate | null;
  responses: FormResponse[];
  isEditMode: boolean;
}

const initialState: FormState = {
  templates: [],
  currentTemplate: null,
  responses: [],
  isEditMode: true,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addTemplate: (state, action: PayloadAction<FormTemplate>) => {
      state.templates.push(action.payload);
    },
    updateTemplate: (state, action: PayloadAction<FormTemplate>) => {
      const index = state.templates.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.templates[index] = action.payload;
      }
    },
    setCurrentTemplate: (state, action: PayloadAction<FormTemplate | null>) => {
      state.currentTemplate = action.payload;
    },
    addElement: (state, action: PayloadAction<FormElement>) => {
      if (state.currentTemplate) {
        state.currentTemplate.elements.push(action.payload);
      }
    },
    updateElement: (state, action: PayloadAction<{ id: string; element: FormElement }>) => {
      if (state.currentTemplate) {
        const index = state.currentTemplate.elements.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.currentTemplate.elements[index] = action.payload.element;
        }
      }
    },
    removeElement: (state, action: PayloadAction<string>) => {
      if (state.currentTemplate) {
        state.currentTemplate.elements = state.currentTemplate.elements.filter(
          e => e.id !== action.payload
        );
      }
    },
    toggleEditMode: (state) => {
      state.isEditMode = !state.isEditMode;
    },
    addResponse: (state, action: PayloadAction<FormResponse>) => {
      state.responses.push(action.payload);
    },
  },
});

export const {
  addTemplate,
  updateTemplate,
  setCurrentTemplate,
  addElement,
  updateElement,
  removeElement,
  toggleEditMode,
  addResponse,
} = formSlice.actions;

export default formSlice.reducer; 