# Ticket: Setup Environment Variables & JWT Middleware

**Status:** ✅ Completed  
**Priority:** 🔴 Critical  
**Estimated Time:** 45 mins  

## Description
Configure environment variables and create JWT validation middleware for API routes.

## Tasks
- [ ] Create `.env.local` file with:
  - [ ] DATABASE_URL (database connection string)
  - [ ] JWT_SECRET (long random string)
  - [ ] API base URL (if needed)

- [ ] Create JWT middleware utility (`src/lib/jwt.ts`):
  - [ ] verifyToken() function
  - [ ] decodeToken() function
  - [ ] generateToken() function

- [ ] Create auth middleware (`src/lib/auth-middleware.ts`):
  - [ ] Extract JWT from Authorization header
  - [ ] Validate token
  - [ ] Return userId if valid
  - [ ] Throw error if invalid

## Acceptance Criteria
- Environment variables are loaded
- JWT functions work correctly
- Middleware validates tokens properly
- All API routes can use middleware

## Notes
- Add .env.local to .gitignore
- Never commit secrets
- Use strong JWT_SECRET
