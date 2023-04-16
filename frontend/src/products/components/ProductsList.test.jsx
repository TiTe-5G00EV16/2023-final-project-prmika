import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductsList from './ProductsList';

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


const TEST_PRODUCT_DATA = [
  {
    "title": "jalkapallo",
    "description": "Vähän potkittu jalkapallo",
    "image": "https://www.vastavalo.net/albums/userpics/22294/normal_p8172409pt.jpg",
    "price": 1545,
    "owner": "b531da18-52cf-4d91-be45-c28f2a98115f"
  }
  ];

describe('The ProductsList', () => {
  test('should show no products when no product is available', () => {
    render(<ProductsList items={[]} />)
    expect(screen.getByText('No Products found.')).toBeInTheDocument();
  });

  test('should show a list of products', () => {
    render(<ProductsList items={TEST_PRODUCT_DATA} />, { wrapper })  
    expect(screen.queryByText('No Products found.')).toBeNull();
    expect(screen.getByText('jalkapallo - 1545')).toBeInTheDocument();
  });
});
