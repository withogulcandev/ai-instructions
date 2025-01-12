# Contributing to AI Instructions

We love your input! We want to make contributing to AI Instructions as easy and transparent as possible.

## Adding New Instructions Template

1. Create a new directory in the `instructions` folder with your template name:
```bash
instructions/
└── your-template-name/
    ├── project-init.md        # Required: Main instruction file
    ├── deployment.md          # Optional: Deployment instructions
    ├── configuration.md       # Optional: Configuration details
    └── troubleshooting.md     # Optional: Common issues and solutions
```

2. Create a `project-init.md` file in your template directory. This file should contain:
   - Clear step-by-step instructions
   - Required dependencies and versions
   - Project structure explanation
   - Any specific configuration steps

3. Follow this format for your `project-init.md`:
```markdown
# Template Name: [Your Template Name]

## Description
Brief description of what this template creates

## Prerequisites
- List required tools
- List required knowledge

## Steps
1. First step
2. Second step
   - Sub-step details
3. Third step

## Configuration
Any specific configuration instructions

## Additional Notes
Any extra information or tips
```

4. Test your template locally:
```bash
npx ai-instructions init --template your-template-name
```

5. Submit a Pull Request with your new template

## Pull Request Process

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingTemplate`)
3. Commit your changes (`git commit -m 'Add amazing template'`)
4. Push to the branch (`git push origin feature/AmazingTemplate`)
5. Open a Pull Request

## Questions?

Feel free to open an issue for any questions or concerns. 