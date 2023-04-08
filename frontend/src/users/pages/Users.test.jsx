import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Users from './Users';


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

describe('The Cities Page', () => {
  test('Should show a loading spinner while waiting', () =>{
    render(
      <Users />, { wrapper }
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});