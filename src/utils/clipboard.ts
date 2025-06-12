
import { App, Notice } from 'obsidian';

/**
 * Copy text to clipboard and show a notice
 * @param text The text to copy
 * @param noticeText Optional custom notice text
 */
export function copyToClipboard(text: string, noticeText?: string): void {
    navigator.clipboard.writeText(text)
        .then(() => {
            new Notice(noticeText || `Copied to clipboard: ${text}`);
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
            new Notice('Failed to copy to clipboard');
        });
}

/**
 * Get the full absolute path to the file
 * @param relativePath The path relative to vault root (in Obsidian, paths are already relative to the vault root)
 * @param app The Obsidian app instance
 * @returns The full absolute path to the file
 */
export function getFullPath(relativePath: string, app: App): string {
    // Get the absolute vault path using FileSystemAdapter
    const adapter = app.vault.adapter;
    if (adapter && "getBasePath" in adapter) {
        const basePath = (adapter as any).getBasePath();
        
        // Handle path separators properly to avoid double separators
        if (!basePath.endsWith('/') && !basePath.endsWith('\\') && 
            !relativePath.startsWith('/') && !relativePath.startsWith('\\')) {
            return `${basePath}/${relativePath}`;
        } else {
            return `${basePath}${relativePath}`;
        }
    } else {
        // Fallback if getBasePath is not available - just return the relative path
        return relativePath;
    }
}

/**
 * Get the path relative to the vault root, optionally with vault name as root
 * @param relativePath The path relative to vault root (in Obsidian, paths are already relative to the vault root)
 * @param app The Obsidian app instance
 * @returns The path relative to the vault root, optionally prefixed with vault name
 */
export function getRelativePath(relativePath: string, app: App): string {
    // Get the plugin instance to access settings
    const plugin = (app as any).plugins.plugins["file-tree-alternative"];
    
    if (plugin && plugin.settings.includeVaultNameInRelativePath) {
        // Include vault name as root for relative path
        const vaultName = app.vault.getName();
        return `${vaultName}/${relativePath}`;
    }
    
    // Default behavior - return path relative to vault root without vault name
    return relativePath;
}
