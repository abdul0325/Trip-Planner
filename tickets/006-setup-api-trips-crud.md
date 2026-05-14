# Ticket: Create /api/trips CRUD Endpoints

**Status:** ✅ Completed  
**Priority:** 🟠 High  
**Estimated Time:** 2 hours  
**Depends On:** #002

## Description
Implement complete CRUD API endpoints for trips with user authentication.

## Tasks
- [ ] Create middleware for JWT validation
- [ ] Create `src/app/api/trips/route.ts`:
  - [ ] GET - List all trips for authenticated user
  - [ ] POST - Create new trip for authenticated user

- [ ] Create `src/app/api/trips/[id]/route.ts`:
  - [ ] GET - Get single trip (verify ownership)
  - [ ] PATCH - Update trip (verify ownership)
  - [ ] DELETE - Delete trip (verify ownership)

## Acceptance Criteria
- All endpoints require valid JWT token
- Users can only see/modify their own trips
- CRUD operations work correctly
- Proper error responses (401, 403, 404)
- Request/response validation

## Notes
- Extract userId from JWT token
- Use JWT from Authorization header: `Bearer <token>`
- Verify trip belongs to authenticated user
- Return paginated results for list endpoint
