# Code Standards

This document outlines the coding standards to ensure high-quality and maintainable software throughout the project.

## 1. File and Directory Structure
- Each component should be placed in its own folder (e.g., `components/shared/header`, `components/shared/footer`).
- Shared utility functions belong in the `utils/` directory.
- Environment-specific configurations go under the `config/` directory.

## 2. Naming Conventions
- **Variables and Functions**: Use camelCase (e.g., `getUserData`, `userProfile`).
- **Classes and Components**: Use PascalCase (e.g., `UserList`, `AppRouter`).
- **Constants**: Use ALL_CAPS (e.g., `MAX_USERS`, `API_URL`).

## 3. Coding Style
- **Nested Functions**: Use them sparingly; deep nesting reduces readability.
- **Indentation**: 2 spaces, no tabs.
- **Maximum Line Length**: Aim for 100 characters or fewer per line.
- **Line Endings**: Use Unix (`LF`).

## 4. Testing Principles
- Each module should have a corresponding test file (e.g., `userService.test.js`).
- Unit tests covering critical functions are mandatory.
- Include thorough test scenarios covering edge cases and error handling.

## 5. Code Review
- When creating a Pull Request (PR), it must be reviewed by at least one team member.
- Reviews should address readability, performance, and security concerns.
- After feedback is addressed, the PR should be resubmitted for final review.
