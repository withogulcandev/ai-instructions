# Stripe Node.js SDK Product Requirements Document (PRD)

## Overview

The Stripe Node.js SDK provides a seamless interface for developers to integrate Stripe's payment processing capabilities into Node.js applications. This document outlines the essential methods, configurations, and best practices for utilizing the SDK effectively.

## Installation

To install the Stripe Node.js SDK, use npm:

```bash
npm install stripe
```

## Configuration

Initialize the Stripe client with your secret API key:

```javascript
const Stripe = require('stripe');
const stripe = new Stripe('STRIPE_API_KEY');
```

**Note**: Replace `'STRIPE_API_KEY'` with your actual secret key, which can be found in the [Stripe Dashboard](https://dashboard.stripe.com/).

## Core Resources and Methods

### 1. Customers

- **Create a Customer**:

  ```javascript
  const customer = await stripe.customers.create({
    email: 'customer@example.com',
    name: 'Customer Name',
  });
  ```

- **Retrieve a Customer**:

  ```javascript
  const customer = await stripe.customers.retrieve('customer_id');
  ```

- **Update a Customer**:

  ```javascript
  const updatedCustomer = await stripe.customers.update('customer_id', {
    metadata: {order_id: '6735'},
  });
  ```

- **Delete a Customer**:

  ```javascript
  const confirmation = await stripe.customers.del('customer_id');
  ```

### 2. Subscriptions

- **Create a Subscription**:

  ```javascript
  const subscription = await stripe.subscriptions.create({
    customer: 'customer_id',
    items: [{price: 'price_id'}],
  });
  ```

- **Retrieve a Subscription**:

  ```javascript
  const subscription = await stripe.subscriptions.retrieve('subscription_id');
  ```

- **Cancel a Subscription**:

  ```javascript
  const canceledSubscription = await stripe.subscriptions.del('subscription_id');
  ```

### 3. Checkout Sessions

- **Create a Checkout Session**:

  ```javascript
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: 'price_id',
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });
  ```

- **Retrieve a Checkout Session**:

  ```javascript
  const session = await stripe.checkout.sessions.retrieve('session_id');
  ```

## Error Handling

Stripe's API uses conventional HTTP response codes to indicate the success or failure of an API request. In general:

- Codes in the `2xx` range indicate success.
- Codes in the `4xx` range indicate an error that failed given the information provided (e.g., a required parameter was omitted).
- Codes in the `5xx` range indicate an error with Stripe's servers.

Example of error handling in Node.js:

```javascript
try {
  const customer = await stripe.customers.create({
    email: 'customer@example.com',
    name: 'Customer Name',
  });
  console.log(customer);
} catch (error) {
  console.error('Error:', error);
}
```
