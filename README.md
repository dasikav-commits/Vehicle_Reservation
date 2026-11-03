## Running the code

This project uses npm. From the project directory, install dependencies and start the development server:

```bash
npm install
npm run dev
```

The development server runs at [http://localhost:3000](http://localhost:3000).

### Sync existing Prisma users with Supabase Auth

If you already have users or admins in Prisma and need to link them to Supabase Auth, run:

```bash
npm run sync:supabase-auth
```

This will populate `supabase_id` for existing Prisma records whose email matches a Supabase Auth user.
