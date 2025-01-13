# Template Integration Guide

This document provides instructions for AI Agents to integrate the Empty React Native template into existing Expo projects or newly created ones via Expo CLI.

## Prerequisites

1. Existing Project Requirements:
   - An Expo project (existing or newly created via `npx create-expo-app`)
   - Node.js version 18 or later
   - Expo CLI installed globally
   - Expo Go app for physical device testing (optional)

2. Development Environment:
   - For iOS: Xcode and iOS Simulator (Mac only)
   - For Android: Android Studio, SDK, and Emulator

## Integration Process

1. Project Preparation
   - Backup your existing project (if needed)
   - Review current project structure
   - Identify potential conflicts with existing files
   - Clean up default Expo project files that will be replaced

2. Dependencies Integration
   - Install and verify Expo core packages
   - Set up Expo Router for navigation
   - Add state management tools
   - Configure development utilities
   - Install UI and animation libraries

3. Structure Implementation
   - Create template directory structure
   - Move existing files to appropriate locations
   - Implement file-based routing with Expo Router
   - Set up proper directory organization

4. Configuration Updates
   - Update TypeScript configuration
   - Configure ESLint and Prettier
   - Update Babel configuration
   - Modify Expo settings

5. Quality Assurance
   - Verify TypeScript compilation
   - Check ESLint configuration
   - Test Prettier formatting
   - Validate project structure
   - Ensure proper module resolution

## Common Integration Scenarios

1. Post-Installation Steps
   - Review the README.md for template overview
   - Follow template structure guidelines
   - Apply coding standards
   - Ensure AI agent follows instructions directory

2. Existing Expo Project Integration
   - Back up your project
   - Merge configurations carefully
   - Resolve any conflicts
   - Migrate existing code to new structure

3. Migrating from React Navigation
   - Remove React Navigation dependencies
   - Install Expo Router
   - Convert navigation structure
   - Update route definitions

## Verification Steps

1. Build Verification
   - Successful compilation
   - No TypeScript errors
   - Clean ESLint results
   - Proper formatting

2. Runtime Verification
   - Application launches successfully
   - Navigation works as expected
   - Development tools functioning
   - Hot reload working properly
   - Existing functionality preserved

## Troubleshooting

1. Common Issues
   - Navigation conflicts
   - TypeScript errors
   - Dependency version mismatches
   - Build configuration issues

2. Resolution Steps
   - Check error messages
   - Verify dependencies
   - Review configuration files
   - Compare with template structure