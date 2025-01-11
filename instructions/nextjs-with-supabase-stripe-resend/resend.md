# Resend API Product Requirements Document (PRD)

## Overview
Resend is an advanced API for programmatic email delivery, providing functionality to send, track, and manage emails efficiently. This document outlines the API’s key methods, parameters, and expected responses, ensuring developers have a comprehensive guide to its integration.

## API Configuration

### Setup
1. **Install SDK**:
   ```bash
   npm install resend
   ```
2. **Initialize SDK**:
   ```javascript
   import { Resend } from 'resend';

   const resend = new Resend(process.env.RESEND_API_KEY);
   ```
3. **Environment Variable**:
   ```env
   RESEND_API_KEY=your-resend-api-key
   ```

## Features and Endpoints

### 1. Email Sending
#### Single Email
Send a single email to a recipient.
```javascript
await resend.emails.send({
  from: 'Acme <onboarding@resend.dev>',
  to: ['user@example.com'],
  subject: 'Welcome!',
  html: '<h1>Hello, World!</h1>',
});
```
**Response**:
```json
{
  "id": "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794"
}
```

#### Batch Emails
Send multiple emails simultaneously.
```javascript
await resend.batch.send([
  {
    from: 'Acme <onboarding@resend.dev>',
    to: ['user1@example.com'],
    subject: 'Hello User1!',
    html: '<h1>Welcome User1</h1>',
  },
  {
    from: 'Acme <onboarding@resend.dev>',
    to: ['user2@example.com'],
    subject: 'Hello User2!',
    html: '<h1>Welcome User2</h1>',
  },
]);
```
**Response**:
```json
{
  "data": [
    { "id": "ae2014de-c168-4c61-8267-70d2662a1ce1" },
    { "id": "faccb7a5-8a28-4e9a-ac64-8da1cc3bc1cb" }
  ]
}
```

### 2. Email Management
#### Retrieve Email Details
Fetch the details of a specific email.
```javascript
resend.emails.get('49a3999c-0ce1-4ea6-ab68-afcd6dc2e794');
```
**Response**:
```json
{
  "object": "email",
  "id": "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794",
  "to": ["user@example.com"],
  "from": "Acme <onboarding@resend.dev>",
  "subject": "Welcome!",
  "html": "<h1>Hello, World!</h1>",
  "created_at": "2024-01-12T00:00:00.000Z",
  "last_event": "delivered"
}
```

#### Schedule Emails
Emails can be scheduled for future delivery.
```javascript
const oneMinuteFromNow = new Date(Date.now() + 1000 * 60).toISOString();

resend.emails.update({
  id: '49a3999c-0ce1-4ea6-ab68-afcd6dc2e794',
  scheduledAt: oneMinuteFromNow,
});
```
**Response**:
```json
{
  "object": "email",
  "id": "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794"
}
```

#### Cancel Emails
Cancel a scheduled email.
```javascript
resend.emails.cancel('49a3999c-0ce1-4ea6-ab68-afcd6dc2e794');
```
**Response**:
```json
{
  "object": "email",
  "id": "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794"
}
```

### 3. Broadcast Management
#### Create Broadcast
Create a new broadcast email.
```javascript
await resend.broadcasts.create({
  audienceId: '78261eea-8f8b-4381-83c6-79fa7120f1cf',
  from: 'Acme <onboarding@resend.dev>',
  subject: 'Hello World',
  html: '<p>Hello, {{FIRST_NAME|there}}!</p>',
});
```
**Response**:
```json
{
  "id": "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794"
}
```

#### Retrieve Broadcast Details
Fetch details of a specific broadcast.
```javascript
await resend.broadcasts.get('49a3999c-0ce1-4ea6-ab68-afcd6dc2e794');
```
**Response**:
```json
{
  "object": "broadcast",
  "id": "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794",
  "status": "draft",
  "created_at": "2024-01-12T00:00:00.000Z"
}
```

#### Send Broadcast
Send a broadcast email.
```javascript
await resend.broadcasts.send('49a3999c-0ce1-4ea6-ab68-afcd6dc2e794', {
  scheduledAt: 'in 1 min',
});
```
**Response**:
```json
{
  "id": "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794"
}
```

#### Delete Broadcast
Delete a broadcast email.
```javascript
await resend.broadcasts.remove('49a3999c-0ce1-4ea6-ab68-afcd6dc2e794');
```
**Response**:
```json
{
  "object": "broadcast",
  "id": "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794",
  "deleted": true
}
```

#### List Broadcasts
Retrieve a list of broadcasts.
```javascript
await resend.broadcasts.list();
```
**Response**:
```json
{
  "object": "list",
  "data": [
    {
      "id": "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794",
      "status": "sent",
      "created_at": "2024-01-12T00:00:00.000Z"
    }
  ]
}
```

### 4. Audience Management
#### Create Audience
```javascript
await resend.audiences.create({ name: 'Registered Users' });
```
**Response**:
```json
{
  "object": "audience",
  "id": "78261eea-8f8b-4381-83c6-79fa7120f1cf",
  "name": "Registered Users"
}
```

#### List Audiences
```javascript
await resend.audiences.list();
```
**Response**:
```json
{
  "object": "list",
  "data": [
    {
      "id": "78261eea-8f8b-4381-83c6-79fa7120f1cf",
      "name": "Registered Users",
      "created_at": "2024-01-12T00:00:00.000Z"
    }
  ]
}
```

#### Delete Audience
```javascript
await resend.audiences.remove('78261eea-8f8b-4381-83c6-79fa7120f1cf');
```
**Response**:
```json
{
  "object": "audience",
  "id": "78261eea-8f8b-4381-83c6-79fa7120f1cf",
  "deleted": true
}
```

### 5. Contact Management
#### Create Contact
```javascript
await resend.contacts.create({
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
  unsubscribed: false,
  audienceId: '78261eea-8f8b-4381-83c6-79fa7120f1cf',
});
```
**Response**:
```json
{
  "object": "contact",
  "id": "479e3145-dd38-476b-932c-529ceb705947"
}
```

#### List Contacts
```javascript
await resend.contacts.list({ audienceId: '78261eea-8f8b-4381-83c6-79fa7120f1cf' });
```
**Response**:
```json
{
  "object": "list",
  "data": [
    {
      "id": "479e3145-dd38-476b-932c-529ceb705947",
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "unsubscribed": false
    }
  ]
}
```

#### Delete Contact
```javascript
await resend.contacts.remove({
  id: '479e3145-dd38-476b-932c-529ceb705947',
  audienceId: '78261eea-8f8b-4381-83c6-79fa7120f1cf',
});
```
**Response**:
```json
{
  "object": "contact",
  "id": "479e3145-dd38-476b-932c-529ceb705947",
  "deleted": true
}
```

## Rate Limiting
- **Default**: 2 requests per second.
- **Headers**:
  - `ratelimit-limit`: Maximum allowed requests.
  - `ratelimit-remaining`: Requests left in the current window.
  - `ratelimit-reset`: Time until the limit resets.

## Error Codes
| Code | Description                     |
|------|---------------------------------|
| 200  | Successful request.             |
| 400  | Invalid parameters.             |
| 401  | Missing or invalid API key.     |
| 404  | Resource not found.             |
| 429  | Rate limit exceeded.            |
| 5xx  | Server-side error.              |

---

This document provides a detailed guide to integrate Resend effectively into your application.
