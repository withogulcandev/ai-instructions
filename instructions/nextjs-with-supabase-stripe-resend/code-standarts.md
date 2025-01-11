# Coding Standards

## Naming Conventions
- **Variables and Functions**: Use `camelCase`.
  - Example: `fetchData`, `userName`
- **Classes and Components**: Use `PascalCase`.
  - Example: `UserProfile`, `PaymentForm`
- **Constants**: Use `UPPER_SNAKE_CASE`.
  - Example: `API_BASE_URL`, `MAX_RETRIES`

## Indentation
- Use **2 spaces** for indentation.
- Avoid tabs to ensure consistency across environments.

## File and Directory Structure
- Organize files by feature or domain.
- Follow the Next.js structure for pages, components, and API routes.
- Use lowercase, kebab-case for file and folder names.
  - Example: `user-profile.js`, `payment-form.css`

## Maximum Line Length
- Limit lines to **100 characters** to improve readability.
- Break long statements into multiple lines where necessary.

## Code Comments
- Write comments where logic is non-obvious.
- Use `//` for single-line comments and `/** */` for multi-line or documentation comments.
  - Example:
    ```javascript
    // Fetch user data from API
    const userData = fetchUserData();
    ```

## Code Quality
- Always use `const` and `let`; avoid `var`.
- Ensure variables have meaningful names.
- Use strict equality (`===`) over abstract equality (`==`).

## Testing
- Write unit tests for all critical logic.
- Aim for 80%+ code coverage.
- Use Jest for testing.

## Git Commit Messages
- Use imperative mood for commit messages.
  - Example: "Add payment validation logic."
- Keep messages concise but informative.

## Linting and Formatting
- Use ESLint and Prettier for consistent formatting.
- Fix all lint errors before committing.

---

By adhering to these coding standards, we ensure maintainability, readability, and consistency across the project.
