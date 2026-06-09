# API Documentation

## Authentication

- `POST /api/v1/auth/register`
  - Registers a new user.
  - Request: `email`, `password`, `full_name`, `role`
  - Response: user details.

- `POST /api/v1/auth/token`
  - Exchanges credentials for JWT.
  - Request: `username`, `password`
  - Response: `access_token`, `token_type`

## Users

- `GET /api/v1/users/me`
  - Returns the current authenticated user.

- `GET /api/v1/users`
  - Lists all users.

- `PATCH /api/v1/users/{user_id}`
  - Updates user profile fields.

## Problems

- `POST /api/v1/problems`
  - Creates a new challenge.
  - Supports `status`, `urgency`, `stakeholders`, `success_metrics`, and `ai_summary` fields in addition to the core challenge metadata.

- `GET /api/v1/problems`
  - Lists problem challenges.

- `GET /api/v1/problems/{problem_id}`
  - Retrieves a specific problem.

- `GET /api/v1/problems/{problem_id}/analysis`
  - Returns a structured AI-generated analysis for a challenge.
  - Response includes:
    - `mission_brief`
    - `root_causes`
    - `intervention_tracks`
    - `research_queries`
    - `collaboration_gaps`
    - `next_actions`
    - `opportunities`

- `PATCH /api/v1/problems/{problem_id}`
  - Updates a problem.

## Platform

- `GET /api/v1/healthz`
  - Returns service liveness.

- `GET /api/v1/platform-overview`
  - Returns a lightweight platform capability summary for system dashboards and status pages.
