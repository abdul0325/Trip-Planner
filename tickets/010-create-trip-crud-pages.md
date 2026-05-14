# Ticket: Create Trip CRUD Pages (Create, Edit, Detail)

**Status:** ✅ Completed  
**Priority:** 🟠 High  
**Estimated Time:** 2 hours  
**Depends On:** #006, #007

## Description
Create pages for creating, viewing, and editing individual trips.

## Tasks
- [ ] Create `/trips/create` page:
  - [ ] Form with trip fields (title, description, destination, dates, budget, status)
  - [ ] POST to /api/trips
  - [ ] Redirect to /trips on success

- [ ] Create `/trips/[id]` page (detail view):
  - [ ] Fetch trip from /api/trips/[id]
  - [ ] Display trip details
  - [ ] Link to edit page
  - [ ] Show delete button

- [ ] Create `/trips/[id]/edit` page:
  - [ ] Pre-fill form with trip data
  - [ ] PATCH to /api/trips/[id]
  - [ ] Redirect to trip detail on success

## Acceptance Criteria
- All pages load correctly
- Forms submit and update API
- AuthGuard protects all pages
- Error handling works
- Redirects are proper

## Notes
- Use React Query mutations for create/update
- Use react-hook-form for forms
- Validate required fields
