import { render, screen } from '@testing-library/react';
import App from './App';

describe('My First Test', () => {
  test('Check whether the component is there or not', async () => {
    render(<App />);
    const outerDiv = await screen.findByTestId("mainBody");
    expect(outerDiv).toBeInTheDocument();
  })
})
