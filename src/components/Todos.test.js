import React from 'react';
import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'

import {Footers, Headers, InputTextBox} from "./Todos.js";


describe('Headers', () => {
  it('renders the header', () => {
    // Render the component
    render(<Headers />);
    
    // const linkElement = screen.getByText(/todos/i);
    // expect(linkElement).toBeInTheDocument();
  });
});
