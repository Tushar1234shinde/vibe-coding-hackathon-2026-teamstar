# Security Documentation

## Authentication & Authorization

- JWT authentication protects API endpoints.
- Role-based access control (RBAC) is enforced for resource updates and administration.
- Passwords are hashed using bcrypt.

## API Security

- HTTPS is required in production.
- CORS is configured for frontend origins.
- Rate limiting and audit logging should be added in middleware.

## Data Protection

- Sensitive credentials must be stored in secrets or environment variables.
- Postgres, Neo4j, Redis, and Qdrant should all be deployed behind private networking.
- Use database backups and encryption at rest for production deployments.
