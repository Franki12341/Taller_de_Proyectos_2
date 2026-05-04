import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve([]) })
    .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve([]) })
    .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve([]) });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders SmartSched title', async () => {
  render(<App />);
  const heading = await screen.findByRole('heading', { name: /matriculate/i, level: 1 });
  expect(heading).toBeInTheDocument();
  expect(await screen.findByText(/selecciona una asignatura/i)).toBeInTheDocument();
});
