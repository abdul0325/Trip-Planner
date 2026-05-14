# Ticket: Create /api/auth/register Endpoint

**Status:** ✅ Completed  
**Priority:** 🟠 High (Blocking)  
**Estimated Time:** 1 hour  
**Depends On:** #002

## Description
Implement the authentication registration API endpoint using Next.js API routes.

## Tasks
- [ ] Create `src/app/api/auth/register/route.ts`
- [ ] Validate request body (email, password, name)
- [ ] Hash password using bcrypt
- [ ] Check if user already exists
- [ ] Create user in database
- [ ] Return success with emailToVerify message
- [ ] Handle errors (validation, duplicate user, server errors)

## Acceptance Criteria
- POST /api/auth/register endpoint works
- Returns `{ message: "...", emailToVerify: "user@example.com" }`
- Duplicate emails are rejected
- Password is hashed and stored securely
- Proper error responses with status codes

## Notes
- Use axios client for consistency
- Response should match AuthRegisterResponseType
- Don't use server functions (use API routes)
