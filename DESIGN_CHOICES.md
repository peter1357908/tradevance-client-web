# Notable Design Decisions / Coding Guidelines

* Use class React Component when event-listening and/or state management are needed; use functional React Component otherwise (e.g. the Landing component itself should be a functional Component with a useHistory() hook).

* Use inline styling when the styling is not to be reused for other files; else, write the styles in [style.scss](src/style.scss) and use className.
  * note: ALthough "sign-in" and "sign-up" currently share the same inline styling, it may differ in the future.
  * exception: things that are only cleanly realized in CSS like `:hover`

* always define relevant constants inside the React Component - be it a functional component, or a class component.

* the folders inside the `components` directory contain grouped components, whose combined, exposed component is exported by `index.js` in the root of each folder.

* API calls should only be made inside the action creators

* the overlapping effect provided by "outline" styling in tabs-like environment is welcome... but... somewhat unintended... 
  * now `text-align: center` doesn't appear to actually center the text, because the container looks smaller with the next element's outline overlapping with a portion of the current element...
  * the last element also appears larger, because it's the only element who doesn't have a "next element".

* action types are namespaced by appending `namespace/` to the action performed. For example, for a "set watchlist" action in `profile-actions/watchlist-actions`, the action type should be named `PROFILE/WATCHLIST/SET_WATCHLIST` (`main-view-actions` would be capitalized as such: `MAIN-VIEW`)

* code parts that are for functionaly placeholders (like the "manage subscription" button before having implemented the related (underlying) functionality) are commented out with `// TODO: implement and uncomment`

# Alternative Designs to explore

* Add a scroll bar to the `Tabs` type component and keep a minimum width a tab can get (not just the active tab). Will need to stylize the scroll bar (use existing React libraries?)

* load all charts and switch between them by manipulating the z-index... not by loading and reloading only one component.
