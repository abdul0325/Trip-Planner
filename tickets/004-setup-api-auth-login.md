# Ticket: Create /api/auth/login Endpoint

**Status:** ✅ Completed  
**Priority:** 🟠 High (Blocking)  
**Estimated Time:** 1 hour  
**Depends On:** #002

## Description
Implement the authentication login API endpoint with JWT token generation.

## Tasks
- [ ] Create `src/app/api/auth/login/route.ts`
- [ ] Validate request body (email, password)
- [ ] Verify user exists and password matches
- [ ] Generate JWT token (store secret in .env)
- [ ] Return token and user data
- [ ] Handle errors (invalid credentials, user not found)

## Acceptance Criteria
- POST /api/auth/login endpoint works
- Returns `{ accessToken: "jwt...", user: {...} }`
- JWT contains userId in payload
- Invalid credentials return 401
- Password verification is secure

## Notes
- Use jsonwebtoken library
- JWT should include userId
- Add JWT_SECRET to .env.local
- Response should match AuthLoginResponseType
