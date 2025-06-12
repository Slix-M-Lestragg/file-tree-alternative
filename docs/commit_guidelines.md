# Commit Guidelines for File Tree Alternative Plugin

## Overview of Recent Changes
Fixed two critical issues:
1. Array mutation errors in sorting operations
2. Build configuration for correct file output

## Project Management Guidelines

Based on the existing project structure and commit history, here's the step-by-step approach for contributing changes:

### 1. Version Management
- The project uses semantic versioning (X.Y.Z format)
- Current version is 2.6.0 (from manifest.json)
- Bug fixes typically increment the Z version (e.g., 2.6.0 -> 2.6.1)

### 2. Documentation Updates Required
1. **Releases.md**
   - Add new version section at the top
   - Use bullet points for changes
   - Keep descriptions concise but clear
2. **No README.md update needed**
   - The fix is a bug fix, not a feature change
   - README.md typically only updated for new features or major changes

### 3. File Update Order
1. **Code Changes** (already completed)
   - Fixed array mutation in `src/components/FileView/handlers.ts`
   - Fixed array mutation in `src/components/FolderView/NestedFolders.tsx`
   - Updated build config in `rollup.config.cjs`

2. **Version Updates**
   - Update `manifest.json` version number
   - Update `package.json` version number
   - Update `versions.json` with compatibility info

3. **Documentation Update**
   - Add entry to `Releases.md`

### 4. Commit Guidelines
Based on existing commit messages in the project:
- Use concise, action-oriented messages
- Focus on the fix/change rather than technical details
- Follow the established format: "Fix for [issue description]" or "[Feature] - [Description]"

### 5. Suggested Updates

#### Version Update (2.6.1)
Files to update:
```json
// manifest.json
{
    "version": "2.6.1"
}

// package.json
{
    "version": "2.6.1"
}

// versions.json
{
    "2.6.1": "0.15.0"
}
```

#### Release Notes Entry
```markdown
## Version 2.6.1

- Fix for array mutation errors in file and folder sorting
- Build output configuration correction for plugin compatibility
```

### 6. Suggested Commit Message
```
Fix for array mutation errors during sorting operations

- Prevents errors when sorting files and folders
- Ensures proper plugin build output location
- Updates version to 2.6.1
```

### 7. Testing Guidelines
Before committing:
1. Rebuild the project
2. Test file sorting functionality
3. Test folder sorting functionality
4. Verify plugin loads correctly in Obsidian
5. Check console for any errors

### 8. Version Management Automation
To streamline the version update process, use the version script:

```zsh
# Update all version files at once
npm run version 2.X.X  # Replace X.X with the new version number

# Then commit the changes
git add .
git commit -m "Your commit message"
```

The version script automatically:
1. Updates version in manifest.json
2. Updates version in package.json
3. Adds version entry in versions.json with current minAppVersion
4. Prepares new version section in Releases.md

This ensures consistent version updates across all required files.

## Reference Examples

### Recent Version Update Pattern
From Releases.md:
```markdown
## Version 2.6.0
- Reveal Active File activates the Leaf

## Version 2.5.9
- Fix for Pinned File Updates
```

### Common Fix Pattern
```markdown
## Version 2.5.5
- Drag Manager Fix
```

This pattern shows the project prefers:
- Short, focused version updates
- Direct, solution-oriented descriptions
- Clear separation of concerns between versions
