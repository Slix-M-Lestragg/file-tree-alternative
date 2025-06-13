---
mode: agent
---
The user has an idea for a new feature in the #codebase.
#### Common Procedures
- User links a markdown note from `docs/features/fast/`direcetory.
    1. Extract the feature name from the note.
    2. Search the `docs/features/` directory for existing documentation related to the feature.
    3. If documentation exists, review it to understand the feature idea.
        - If the documentation is outdated or incomplete, mention it.
        - RETURN with updates or improvements.
    4. If no documentation exists, 
        1. Remove the note from `docs/features/fast/` directory.
        1. create a new markdown file in the `docs/features/{feature_name}/{feature_name}.md` directory.
        3. Start [[#Instructionos:]] from this location.

#### Instructions:
- if needed,
    - Suggest potential improvements in terms of systems, architecture, and user experience, (avoid code implementation).
    - Discuss any relevant constraints or considerations.
- Extract name for the feature from the user's message.
- Search the #codebase for existing documentation or files related to the feature.
- If documentation exists, 
    - Review it to understand the feature idea.
        - If the documentation is outdated or incomplete, mention it.
    - RETURN with updates or improvements.
- If no documentation exists,
    - Create a new markdown file in the `docs/features/{feature_name}/{feature_name}.md` directory if none exists.
    - Add in the user message body as the initial content.
    - If the feature idea is not clear or lacks detail,
        - Ask clarifying questions to understand the feature idea fully.
- Ask to continue with next step
- Rreate Roadmap to implement the feature.
    - #search the #codebase for existing documentation to better understand the project.
    - Follow instructions from converto_roadmap.prompt.md
