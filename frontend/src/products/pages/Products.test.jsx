import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Products from './Products';


const queryClient = new QueryClient({
  defaultOptions: {
      queries: {
          retry: false,
      },
  },
})

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
      {children}
  </QueryClientProvider>
);

describe('The products Page', () => {
  test('Should show a loading spinner while waiting', () =>{
    render(
      <Products />, { wrapper }
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});