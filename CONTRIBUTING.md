# Contributing to Tom's Talented Tutoring

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read and follow our Code of Conduct.

## Getting Started

### Prerequisites

- Node.js 18+
- Git
- pnpm or npm
- Expo CLI

### Setup Development Environment

1. **Fork the Repository**
   ```bash
   # Go to GitHub and click "Fork"
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/toms-talented-tutoring-app.git
   cd toms-talented-tutoring-app
   ```

3. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/toms-talented-tutoring-app.git
   ```

4. **Install Dependencies**
   ```bash
   pnpm install
   ```

5. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Making Changes

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes** following the code style guidelines

3. **Test your changes**:
   ```bash
   pnpm test
   pnpm lint
   pnpm check
   ```

4. **Commit your changes** with clear messages:
   ```bash
   git commit -m "feat: add amazing feature"
   ```

### Commit Message Format

Follow the Conventional Commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, etc.

**Example:**
```
feat(auth): add biometric authentication support

Add support for Face ID and Touch ID authentication on iOS and Android.
Implements secure token storage using device keychain.

Closes #123
```

## Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Avoid `any` type; use proper types
- Use interfaces for object types
- Use enums for constants

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
}

// ❌ Bad
const user: any = { id: 1, name: 'John' };
```

### React Components

- Use functional components with hooks
- Use TypeScript for component props
- Memoize components when necessary
- Use descriptive component names

```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick, disabled }) => (
  <TouchableOpacity onPress={onClick} disabled={disabled}>
    <Text>{label}</Text>
  </TouchableOpacity>
);

// ❌ Bad
export const Btn = (props: any) => (
  <TouchableOpacity onPress={props.onClick}>
    <Text>{props.label}</Text>
  </TouchableOpacity>
);
```

### Naming Conventions

- **Files**: Use kebab-case for file names (e.g., `user-profile.tsx`)
- **Components**: Use PascalCase (e.g., `UserProfile`)
- **Functions**: Use camelCase (e.g., `getUserData`)
- **Constants**: Use UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`)
- **Interfaces**: Use PascalCase with `I` prefix (optional) (e.g., `IUser` or `User`)

### Formatting

- Use Prettier for code formatting
- Use ESLint for linting
- Line length: 100 characters (soft limit)

```bash
pnpm format
pnpm lint
```

## Testing

### Writing Tests

- Write tests for new features
- Aim for >80% code coverage
- Use descriptive test names
- Test edge cases

```typescript
describe('Authentication', () => {
  it('should successfully login with valid credentials', async () => {
    // Test implementation
  });

  it('should throw error with invalid credentials', async () => {
    // Test implementation
  });
});
```

### Running Tests

```bash
pnpm test              # Run all tests
pnpm test --watch     # Watch mode
pnpm test --coverage  # With coverage report
```

## Pull Request Process

### Before Submitting

1. **Update your branch** with the latest upstream changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run all checks**:
   ```bash
   pnpm check
   pnpm lint
   pnpm test
   ```

3. **Push your changes**:
   ```bash
   git push origin feature/your-feature-name
   ```

### Creating a Pull Request

1. Go to GitHub and create a new Pull Request
2. Fill in the PR template with:
   - **Description**: What does this PR do?
   - **Type**: Feature, Bug Fix, Documentation, etc.
   - **Related Issues**: Link to related issues
   - **Testing**: How was this tested?
   - **Screenshots**: If applicable

### PR Title Format

Follow the same format as commit messages:

```
feat(auth): add biometric authentication
fix(ui): correct button alignment on mobile
docs: update installation instructions
```

### Review Process

- At least one approval required
- All checks must pass
- Address review comments
- Rebase if needed

## Documentation

### Writing Documentation

- Use clear, concise language
- Include code examples
- Update README.md for major changes
- Add JSDoc comments for functions

```typescript
/**
 * Authenticates a user with email and password
 * @param email - User's email address
 * @param password - User's password
 * @returns Promise resolving to user object
 * @throws AuthenticationError if credentials are invalid
 */
export async function login(email: string, password: string): Promise<User> {
  // Implementation
}
```

## Reporting Issues

### Bug Reports

Include:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots/videos if applicable
- Environment (OS, browser, app version)

### Feature Requests

Include:
- Clear description of the feature
- Use cases and benefits
- Possible implementation approach
- Related issues or discussions

## Questions or Need Help?

- **GitHub Discussions**: Ask questions in discussions
- **GitHub Issues**: Report bugs or request features
- **Email**: Contact the team at support@tomstutoring.com

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

---

Thank you for contributing to Tom's Talented Tutoring! 🎵
