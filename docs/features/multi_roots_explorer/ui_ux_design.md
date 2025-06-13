# Plugin Roots Explorer - UI/UX Design Proposal

## Overview

This document outlines the user interface and experience design for the Plugin Roots Explorer feature. The goal is to integrate plugin file access seamlessly into the existing File Tree Alternative interface while making it clear to users when they're working with plugin files versus vault files.

## UI Components

### 1. Root Selector

![Root Selector Mockup]

The Root Selector will be positioned at the top of the folder pane and will:
- Display the currently active root (vault or specific plugin)
- Allow switching between different roots via dropdown
- Include visual indicators for different root types (icons)
- Show pinned/favorite roots for quick access

```
┌────────────────────────────────┐
│ ⌂ Vault   ▾                    │ ← Root Selector Dropdown
├────────────────────────────────┤
│ ⌂ Vault                        │ ← Current vault
│ 🧩 Plugin: Calendar            │ ← Plugin roots with distinctive icons
│ 🧩 Plugin: Kanban              │
│ 🧩 Plugin: File Tree Alt       │
│ ─────────────                 │
│ ➕ Add Plugin Root...          │ ← Option to add more plugin roots
└────────────────────────────────┘
```

### 2. Enhanced Folder Tree

The folder tree will be enhanced to:
- Visually distinguish plugin folders from vault folders
- Show appropriate icons for plugin root folders
- Apply proper indentation for the hierarchy

```
VAULT
├── Daily Notes
│   ├── 2025-06
│   └── 2025-07
├── Projects
│   └── Research
└── Templates

🧩 PLUGIN: FILE TREE ALT
├── .github
│   └── prompts
├── docs
│   ├── features
│   └── Releases.md
├── src
│   ├── components
│   ├── hooks
│   └── main.ts
└── README.md
```

### 3. Breadcrumb Navigation

When navigating plugin files, a breadcrumb trail will help users understand their location:

```
🧩 File Tree Alt > src > components > FolderView > NestedFolders.tsx
```

### 4. File Operations Context Menu

Context menus for plugin files will be adapted:
- Clear indicators for potentially dangerous operations
- Additional options specific to plugin files
- Read-only indicators where appropriate

```
┌─────────────────────────┐
│ Open                    │
│ Open in new tab         │
├─────────────────────────┤
│ Copy to vault...        │ ← New option
│ Copy path               │
├─────────────────────────┤
│ Rename                  │ ← Warning icon for plugin files
│ Delete                  │ ← Warning icon for plugin files
├─────────────────────────┤
│ Show in system explorer │
└─────────────────────────┘
```

### 5. Settings Panel

Add a new section to the plugin settings for configuring plugin roots:

```
┌─────────────────────────────────────────────┐
│ Plugin Roots                                │
├─────────────────────────────────────────────┤
│ Enable Plugin Roots        [✓]              │
│                                             │
│ Select Plugins to Include:                  │
│  [✓] Calendar                               │
│  [✓] Kanban                                 │
│  [✓] File Tree Alternative                  │
│  [ ] Templater                              │
│  [ ] Dataview                               │
│                                             │
│ Plugin Roots Position:                      │
│  (○) Top of folder list                     │
│  (●) Bottom of folder list                  │
│                                             │
│ Default Plugin Root View:                   │
│  (●) Collapsed                              │
│  (○) Expanded                               │
│                                             │
│ Show Plugin Metadata       [✓]              │
│                                             │
│ Show Warning for Plugin    [✓]              │
│ File Modifications                          │
└─────────────────────────────────────────────┘
```

## Interaction Patterns

### Root Switching

1. User clicks on the root selector dropdown
2. A list of available roots appears (vault and enabled plugin roots)
3. User selects a plugin root
4. The folder pane updates to show the selected plugin's directory structure
5. The file pane updates to show files from the root folder of the plugin

### Navigation

1. User can navigate through plugin directories similar to vault folders
2. Breadcrumb trail shows current location within plugin structure
3. Back/forward buttons work across root boundaries
4. "Return to vault" button available when viewing plugin files

### File Operations

1. **Reading**: Works identically to vault files
2. **Editing**: 
   - Shows a warning dialog for plugin files
   - Explains potential consequences
   - Requires confirmation
3. **Creating/Deleting**:
   - Limited to appropriate contexts
   - Shows warnings where needed
   - May be disabled for certain plugin directories

## Visual Design

### Color Coding

- Vault roots: Standard folder colors from theme
- Plugin roots: Distinctive color with plugin icon
- Warning indicators: Orange/yellow for potentially risky operations
- Read-only indicators: Gray or locked icon

### Icons

- Plugin root folders: Plugin puzzle piece icon + plugin's own icon if available
- Special indicators for configuration files (.json, .js, etc.)
- Lock icons for read-only files or directories

## Responsive Design

- On smaller screens, root selector becomes a compact dropdown
- Collapsible breadcrumbs on narrow views
- Touch-friendly targets for mobile use

## Accessibility

- All new UI elements will include appropriate ARIA labels
- Keyboard navigation support across roots
- High contrast mode compatibility
- Screen reader friendly navigation announcements

## States and Feedback

### Loading States

- Visual indicators when loading large plugin directories
- Progress indicators for operations on plugin files

### Error States

- Clear error messages for permission issues
- Helpful guidance when plugin files cannot be accessed
- Recovery options when operations fail

### Confirmation Dialogs

For plugin file modifications:

```
┌──────────────────────────────────────────┐
│ ⚠️ Modify Plugin File                    │
├──────────────────────────────────────────┤
│ You are about to modify a file that      │
│ belongs to the "File Tree Alt" plugin.   │
│                                          │
│ Modifying plugin files may cause the     │
│ plugin to malfunction or stop working.   │
│                                          │
│ Are you sure you want to continue?       │
│                                          │
│ [Cancel]                [Proceed Anyway] │
└──────────────────────────────────────────┘
```
