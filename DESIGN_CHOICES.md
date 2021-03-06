* Use class React Component when event-listening and/or state management are needed; use functional React Component otherwise (e.g. the Landing component itself should be a functional Component with a useHistory() hook).

* Use inline styling when the styling is not to be reused; else, write the styles in [style.scss](src/style.scss) and use className