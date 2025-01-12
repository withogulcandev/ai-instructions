# Supabase Integration Details

## Authentication Setup

### Configuration Steps:
1. Create a Supabase project in the [Supabase dashboard](https://supabase.com/dashboard).
2. Enable authentication providers (e.g., Google, GitHub) in the **Authentication** tab.
3. Add the Supabase API keys to your `.env` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

### Authentication Features:
- Social logins (Google, GitHub, etc.).
- Password-based authentication.
- Token-based session management.

## Database Schema

### Example Schema:
#### `users` Table:
| Column      | Type        | Description                |
|-------------|-------------|----------------------------|
| id          | UUID        | Primary key, unique user ID|
| email       | TEXT        | User email address         |
| created_at  | TIMESTAMP   | Account creation timestamp |

#### `subscriptions` Table:
| Column          | Type      | Description                         |
|-----------------|-----------|-------------------------------------|
| id              | UUID      | Primary key, subscription ID        |
| user_id         | UUID      | Foreign key to `users` table        |
| plan            | TEXT      | Subscription plan name              |
| status          | TEXT      | Subscription status (active, trial) |
| created_at      | TIMESTAMP | Subscription start date             |

### Adding Tables:
- Use the SQL editor in the Supabase dashboard to create tables.
- Example:
  ```sql
  CREATE TABLE users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT now()
  );
  ```

## Supabase API Usage

### Fetching Data:
Example of fetching data from the `users` table:
```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const fetchUsers = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    return data;
};
```

### Inserting Data:
```javascript
const addUser = async (email) => {
    const { data, error } = await supabase.from('users').insert([{ email }]);
    if (error) throw error;
    return data;
};
```

## Real-Time Features
- Enable real-time functionality in the Supabase settings.
- Example of subscribing to database changes:
```javascript
supabase
    .channel('public:users')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, (payload) => {
        console.log('Change received!', payload);
    })
    .subscribe();
```

## Environment Variables
Ensure all required environment variables are securely stored in your `.env` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

By leveraging Supabase’s authentication, database, and real-time features, this project ensures secure and scalable backend functionality.
