import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { MockedProvider } from '@apollo/react-testing';
import { GET_CART_VISIBILITY_STATE } from './apollo/queries';

test('should render without error', () => {
    const isCartVisible = false;
    const mocks = [
        {
            request: {
                query: GET_CART_VISIBILITY_STATE,
            },
            result: { data: { isCartVisible: isCartVisible } },
        },
    ];
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <App />
        </MockedProvider>,
    );
});
