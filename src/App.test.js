import { render, screen, act } from '@testing-library/react';
import App from './App';

test('renders iniciar sesión button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/iniciar sesión/i); // Cambia el texto esperado
  expect(buttonElement).toBeInTheDocument();
});
