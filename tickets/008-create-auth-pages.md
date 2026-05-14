# Ticket: Create Auth Pages (Login, Register, Verify Email)

**Status:** ✅ Completed  
**Priority:** 🟠 High  
**Estimated Time:** 2 hours  
**Depends On:** #003, #004, #005

## Description
Create frontend pages for authentication flows.

## Tasks
- [ ] Create `/auth/login` page:
  - [ ] Form with email and password fields
  - [ ] Submit to /api/auth/login
  - [ ] Store token in localStorage via useAuthStore
  - [ ] Redirect to /trips on success

- [ ] Create `/auth/register` page:
  - [ ] Form with name, email, password fields
  - [ ] Submit to /api/auth/register
  - [ ] Redirect to verify-email page

- [ ] Create `/auth/verify-email` page:
  - [ ] Display message asking to verify email
  - [ ] Button to submit verification
  - [ ] Call /api/auth/verify-email

## Acceptance Criteria
- All auth pages render correctly
- Forms validate input
- API calls work with proper error handling
- Redirects work correctly
- useAuthStore updates properly

## Notes
- Use axios client component
- Use useAuthStore for state management
- Use react-hook-form for form handling
