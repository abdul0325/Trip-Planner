# Ticket: Create Database Schema

**Status:** ✅ Completed  
**Priority:** 🔴 Critical (Blocking)  
**Estimated Time:** 45 mins  
**Depends On:** #001

## Description
Define the Prisma database schema for Users and Trips with proper relationships and validations.

## Tasks
- [ ] Create User model with fields:
  - id (UUID, primary key)
  - email (unique, indexed)
  - name
  - password (hashed)
  - avatar, coverImage (optional)
  - role (default: "user")
  - isBlocked (default: false)
  - createdAt, updatedAt
  
- [ ] Create Trip model with fields:
  - id (UUID, primary key)
  - title
  - description
  - userId (foreign key to User)
  - startDate
  - endDate
  - destination
  - budget (optional)
  - status (draft, active, completed)
  - createdAt, updatedAt

- [ ] Setup relationships:
  - User has many Trips (one-to-many)
  - Trip belongs to User
  
- [ ] Create migration

## Acceptance Criteria
- Schema properly defined in `prisma/schema.prisma`
- All fields match requirements
- Relationships are correct
- Migration runs without errors
