export type LayoutElementType = 'title' | 'subtitle' | 'spacer' | 'separator' | 'paragraph';
export type FormFieldType = 'text' | 'number' | 'select' | 'date' | 'checkbox' | 'textarea';
export type ElementType = LayoutElementType | FormFieldType;

export interface FormElement {
  id: string;
  type: ElementType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[]; // For select elements
  value?: string | number | boolean | Date;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    customError?: string;
  };
  style?: {
    width?: string;
    height?: string;
    margin?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right';
    fontSize?: string;
    fontWeight?: string;
  };
}

export interface FormTemplate {
  id: string;
  name: string;
  description?: string;
  elements: FormElement[];
  settings: {
    submitButtonText: string;
    showProgress: boolean;
    enableAnalytics: boolean;
    theme: {
      primaryColor: string;
      backgroundColor: string;
      textColor: string;
    };
  };
  isPublished: boolean;
  shareableUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FormResponse {
  id: string;
  formId: string;
  responses: Record<string, any>;
  submittedAt: string;
  userAgent?: string;
  ipAddress?: string;
}

export interface FormStats {
  formId: string;
  visits: number;
  submissions: number;
  conversionRate: number;
  lastVisit: string;
  lastSubmission: string;
  deviceStats: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  dailyStats: Array<{
    date: string;
    visits: number;
    submissions: number;
  }>;
} 