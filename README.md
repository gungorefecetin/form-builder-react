# Form Builder

A modern, drag-and-drop form builder application built with React and TypeScript. Create, customize, and manage forms with an intuitive user interface.

![Form Builder Demo](demo.gif)

## Features

- **Drag-and-Drop Interface**: Easily create forms by dragging and dropping elements
- **Multiple Form Elements**:
  - Text Input
  - Number Input
  - Email Input
  - Dropdown Select
  - Radio Buttons
  - Checkboxes
- **Customizable Fields**:
  - Custom labels
  - Placeholders
  - Required field validation
  - Options for select and radio elements
- **Form Preview**: Test your forms in real-time
- **Form Submissions**: Collect and store form responses
- **Modern UI**: Built with Material-UI components
- **Type-Safe**: Written in TypeScript

## Tech Stack

- React
- TypeScript
- Redux Toolkit (State Management)
- React DnD (Drag and Drop)
- Material-UI (Component Library)
- Vite (Build Tool)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/form-builder.git
cd form-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

1. **Creating a Form**:
   - Drag elements from the left panel onto the canvas
   - Click the edit icon to customize element properties
   - Add validation rules and required fields as needed

2. **Previewing Forms**:
   - Switch to preview mode to test the form
   - Fill out the form to ensure it works as expected
   - Submit the form to store responses

3. **Managing Forms**:
   - Save forms as templates
   - Edit existing forms
   - View form submissions

## Project Structure

```
src/
├── components/        # Reusable UI components
├── features/
│   └── formBuilder/  # Form builder feature components
├── store/            # Redux store configuration
├── types/            # TypeScript type definitions
└── App.tsx          # Root component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React DnD](https://react-dnd.github.io/react-dnd/) for the drag and drop functionality
- [Material-UI](https://mui.com/) for the component library
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
