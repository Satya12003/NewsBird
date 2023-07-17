import { render, screen } from '@testing-library/react';
import App from './App';

describe('My First Test', () => {
  test('Check whether the component is there or not', async () => {
    render(<App />);
    const outerDiv = await screen.findByTestId("mainBody");
    expect(outerDiv).toBeInTheDocument();
  })
  test("This test should fail as the data-testid is wrong", async () => {
    render(<App />);
    const outerDiv = await screen.findByTestId("container");
    expect(outerDiv).toBeInTheDocument();
  });
})
