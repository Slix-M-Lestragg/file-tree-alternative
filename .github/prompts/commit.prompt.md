---
mode: 'agent'
---

0. Use #commit_guidelines.instructions.md to analyse the #changes of the #codebase.
1. Return to user
    - Brief description of the changes
    - Suggest version number update 
        - if applicable, 
    - Provide a commit message template
2. If user accepts
    - apply version number update
    - Commit and Sync
    - Return to user with confirmation and very brief summary of commit and version update


    ##### Example of user return format
    ```markdown
    ##### Brief Description of Changes:
    - Added new path copying functionality for files and folders
    - Implemented full path and relative path copying options
    - Added new settings for path copying behavior
    - Enhanced default file explorer with path copying options
    - Added clipboard utility functions
    
    ##### Version Number Update Suggestion:
    2.6.0 → 2.**7**.0 
    *(this is a **feature** addition, not just a bug fix)*

    ##### Commit Message Template
    ```markdown
    feat: Add path copying functionality

    - Add "Copy Full Path" and "Copy Relative Path" options to files and folders
    - Add settings for configuring path copying behavior
    - Enhance default file explorer with path copying options
    - Implement clipboard utility functions for path management
    ```

    Would you like me to proceed with applying the version update and committing these changes?
    ```