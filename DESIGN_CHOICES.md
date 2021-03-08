* Use class React Component when event-listening and/or state management are needed; use functional React Component otherwise (e.g. the Landing component itself should be a functional Component with a useHistory() hook).

* Use inline styling when the styling is not to be reused for other files; else, write the styles in [style.scss](src/style.scss) and use className.
  * note: ALthough "sign-in" and "sign-up" currently share the same inline styling, it may differ in the future.
  * exception: things that are only cleanly realized in CSS like `:hover`

* for functional components, define constants as `const`s inside the function; for class components, define constants (including `styles`) as `const`s outside the class.

* the folders inside the `components` directory contain grouped components, whose combined, exposed component is exported by `index.js` in the root of each folder.

* API calls should only be made inside the action creators
