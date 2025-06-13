# Multi Roots Explorer - Technical Architecture

## [[multi_root_explorer#^mrp_overview|Overview]]
This document outlines the technical approach to implementing this feature, 
focusing on **code architecture**, **data models**, and **interaction flows**.

## Data Model Extensions

### New Types

```typescript
// New interfaces for plugin roots
export interface PluginRootFolder {
  id: string;          // Unique identifier for the plugin root
  name: string;        // Display name for the plugin root
  path: string;        // Absolute path to the plugin directory
  type: 'plugin';      // Type identifier to distinguish from vault folders
  enabled: boolean;    // Whether this root is currently enabled/visible
  icon?: string;       // Custom icon for the plugin root
}

// Extended FolderTree to support multiple roots
export interface ExtendedFolderTree extends FolderTree {
  rootType: 'vault' | 'plugin';  // Identifies the type of root
  pluginId?: string;             // If plugin root, references the plugin ID
}

// Root selector state
export interface RootSelectorState {
  activeRootId: string;          // Currently active root ID
  pinnedRoots: string[];         // Roots pinned for quick access
  lastVisited: Record<string, number>; // Timestamp of last visits
}
```

### State Management

Extend the existing Recoil state with:

```typescript
// All available root folders (vault + plugins)
export const rootFolders = atom({
  key: 'fileTreeRootFoldersState',
  default: [] as (TFolder | PluginRootFolder)[]
});

// Currently active root folder
export const activeRootFolder = atom({
  key: 'fileTreeActiveRootFolderState',
  default: null as (TFolder | PluginRootFolder | null)
});

// Enabled plugin roots
export const enabledPluginRoots = atom({
  key: 'fileTreeEnabledPluginRootsState',
  default: [] as string[] // Plugin IDs
});
```

## Core Components Modifications

### FolderTree Creation

Modify the `createFolderTree` function to handle plugin directories:

```typescript
export const createFolderTree = (params: {
  startFolder: TFolder | PluginRootFolder;
  plugin: FileTreeAlternativePlugin;
  excludedFolders: string[];
  isPluginRoot?: boolean;
}): ExtendedFolderTree => {
  // Implementation that handles both vault folders and plugin roots
  // ...
};
```

### Root Selection Component

Create a new component for selecting between different roots:

```typescript
export function RootSelector(props: {
  plugin: FileTreeAlternativePlugin;
  onSelectRoot: (root: TFolder | PluginRootFolder) => void;
}) {
  // Implementation for root selection UI
  // ...
}
```

### Plugin Files Access Utility

Create utilities for safely accessing plugin files:

```typescript
export const getPluginRootFolders = (plugin: FileTreeAlternativePlugin): PluginRootFolder[] => {
  // Implementation to get all available plugin roots
  // ...
};

export const getPluginFiles = (
  pluginRoot: PluginRootFolder, 
  plugin: FileTreeAlternativePlugin,
  excludedExtensions: string[]
): OZFile[] => {
  // Implementation to get files from a plugin directory
  // ...
};
```

## UI Flow

1. **Root Selection**:
   - Users can toggle between vault and plugin roots via a dropdown/selector
   - Visual indicators clearly differentiate between root types
   - Shortcuts available for frequently accessed roots

2. **Navigation**:
   - Breadcrumb navigation shows the current path within the selected root
   - Back/forward navigation works across different roots
   - Focus and reveal functions properly handle multiple root contexts

3. **File Operations**:
   - Read operations work the same for all roots
   - Write operations on plugin files show confirmation dialogs
   - Copy operations allowed from plugin roots to vault

## Settings Integration

Extend the plugin settings:

```typescript
export interface FileTreeAlternativePluginSettings {
  // Existing settings...
  
  // New settings
  enablePluginRoots: boolean;        // Master toggle for the feature
  enabledPluginIds: string[];        // Which plugins to show as roots
  pluginRootPrefix: string;          // Optional prefix for plugin roots ("Plugin: ", etc.)
  pluginRootsPosition: 'top' | 'bottom'; // Where to display plugin roots
  showPluginMetadata: boolean;       // Show version and author in tooltips
}
```

## Security and Performance Considerations

1. **Security**:
   - Add confirmation dialogs when modifying plugin files
   - Implement read-only mode for critical plugin files
   - Add visual indicators for read-only files

2. **Performance**:
   - Lazy-load plugin file trees to avoid startup performance impact
   - Cache plugin file structures
   - Implement virtual scrolling for large plugin directories

3. **Error Handling**:
   - Gracefully handle inaccessible plugin directories
   - Provide clear error messages for permission issues
   - Auto-refresh when plugins are updated

## Integration Points

1. **Main Component Modifications**:
   ```typescript
   // Modify MainTreeComponent to support multiple roots
   export default function MainTreeComponent(props: MainTreeComponentProps) {
     // Add states for root management
     const [rootFolders, setRootFolders] = useRecoilState(recoilState.rootFolders);
     const [activeRootFolder, setActiveRootFolder] = useRecoilState(recoilState.activeRootFolder);
     
     // Initialize roots on component load
     useEffect(() => {
       initializeRoots();
     }, []);
     
     // Implementation...
   }
   ```

2. **File Operations Handlers**:
   ```typescript
   // Update file operation handlers to handle plugin files
   export const handleFileOperation = (params: {
     file: OZFile;
     operation: 'open' | 'edit' | 'copy' | 'delete';
     plugin: FileTreeAlternativePlugin;
   }) => {
     // Check if file is from plugin root
     const isPluginFile = file.path.startsWith('plugin://');
     
     // Handle differently based on file source
     if (isPluginFile && operation === 'delete') {
       // Show warning and confirmation
     }
     
     // Implementation...
   };
   ```

## Event System Extensions

Add new events for plugin root interactions:

```typescript
export const eventTypes = {
  // Existing events...
  
  // New events
  pluginRootAdded: 'file-tree-alternative-plugin-root-added',
  pluginRootRemoved: 'file-tree-alternative-plugin-root-removed',
  pluginRootChanged: 'file-tree-alternative-plugin-root-changed',
  
  // Navigation events
  rootChanged: 'file-tree-alternative-root-changed',
};
```
