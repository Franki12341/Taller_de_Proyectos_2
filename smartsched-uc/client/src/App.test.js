import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([])
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders SmartSched title', async () => {
  render(<App />);
  const heading = screen.getByText(/gestion de horarios academicos/i);
  expect(heading).toBeInTheDocument();
  expect(await screen.findByText(/aun no hay horarios registrados/i)).toBeInTheDocument();
});
