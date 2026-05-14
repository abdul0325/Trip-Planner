# Ticket: Create AuthGuard Component

**Status:** ✅ Completed  
**Priority:** 🟠 High  
**Estimated Time:** 45 mins  
**Depends On:** #004

## Description
Implement AuthGuard component to protect routes that require authentication.

## Tasks
- [ ] Create `src/components/shared/auth-guard.tsx`
- [ ] Check if user is authenticated (useAuthStore)
- [ ] Redirect to login if not authenticated
- [ ] Show loading state while checking auth
- [ ] Render children if authenticated

## Acceptance Criteria
- Component wraps protected content
- Redirects to /auth/login if not authenticated
- Works with useAuthStore
- Proper loading states

## Notes
- Use Next.js useRouter for redirects
- Check for valid JWT token in headers
