# Ticket: Create /api/auth/verify-email Endpoint

**Status:** Not Started  
**Priority:** 🟡 Medium  
**Estimated Time:** 1 hour  
**Depends On:** #002, #003

## Description
Implement email verification endpoint (can be simplified for MVP).

## Tasks
- [ ] Create `src/app/api/auth/verify-email/route.ts`
- [ ] Accept email verification request
- [ ] For MVP: Mark user as verified without actual email
- [ ] Return success message

## Acceptance Criteria
- POST /api/auth/verify-email endpoint works
- Returns `{ message: "Email verified successfully" }`
- User marked as verified in database
- Proper error handling

## Notes
- For production, implement actual email sending (later)
- For MVP, can mark user as email_verified automatically
