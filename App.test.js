// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard header', () => {
  render(<App />);
  const header = screen.getByText(/hospital patient dashboard/i);
  expect(header).toBeInTheDocument();
});

test('renders add patient button', () => {
  render(<App />);
  const addButton = screen.getByText(/add patient/i);
  expect(addButton).toBeInTheDocument();
});

test('renders table headers', () => {
  render(<App />);
  expect(screen.getByText(/name/i)).toBeInTheDocument();
  expect(screen.getByText(/age/i)).toBeInTheDocument();
  expect(screen.getByText(/disease/i)).toBeInTheDocument();
});
