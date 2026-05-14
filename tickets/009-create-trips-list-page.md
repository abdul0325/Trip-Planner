# Ticket: Create /trips Page (List All Trips)

**Status:** ✅ Completed  
**Priority:** 🟠 High  
**Estimated Time:** 1.5 hours  
**Depends On:** #006, #007

## Description
Create the trips listing page with pagination and search functionality.

## Tasks
- [ ] Create `src/app/trips/page.tsx`
- [ ] Wrap with AuthGuard
- [ ] Fetch trips from /api/trips using React Query
- [ ] Display trips in a list or grid
- [ ] Add pagination
- [ ] Add "Create Trip" button (link to /trips/create)
- [ ] Add search/filter chips

## Acceptance Criteria
- Page shows authenticated user's trips only
- Pagination works
- Create button navigates to create page
- Loading and error states are handled
- Proper UI using existing components

## Notes
- Use React Query for data fetching
- Use existing search components if available
- Handle empty state
