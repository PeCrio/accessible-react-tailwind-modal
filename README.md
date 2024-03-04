# A WCAG 2.1 AA Compliant Modal

## Goals

1. Put any content you want in the modal. Ensure it is
   dismissible and closable. The modal must prevent interaction
   with the underlying page until dismissed or actioned.

2. Write some tests to confirm that the modal works and is
   compliant with the given accessibility standards.

3. Add some styles (remember that they should also be WCAG 2.1
   AA compliant).

4. Use comments to show us your thought process. Add comments to explain missing parts of the
   implementation, or where you stopped and why. The more
   comments you leave, the easier it will be for us to
   understand how you think and code.

## Extra Goals added

Checklist for accesssibility:

- [x] Keyboard navigation
  - [x] Tabbing through the modal
  - [x] Dismissing the modal with the keyboard
  - [x] Focus management (focus lock within the modal and returning the focus to the last focused element when the modal is dismissed)
- [x] Screen reader labelling with aria-labels
- [x] Good enough contrast in colors
- [x] Visible font size
- [x] Visible focus state
- [x] Visible focus state for keyboard users when tabbing through the app.

Notes

- The modal is built with React and styled with Tailwind CSS.
- The styling is minimal and inspired by NewDay.

## Future improvements

- Integration tests can be added with tools like cypress, playwright etc.
- The modal can be made more generic and reusable/customizable by adding props or extensible styled layouts for the modal components.
- CICD pipeline can be added to the project to automate the testing and deployment process.
