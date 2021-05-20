# High Priority

* Use a more secure authentication scheme (currently the client sends naked authentication inforamtion, which is vulnerable to man-in-the-middle attack)
  * force-refresh the page upon log-out - this is safer than just clearing the redux states?

* sign out user only when necessary (examine error type to determine if it's server error or authentication error or whatever)

# Sanity Check


# Consistency

* Use Class Component for Section1 and Section2 under Landing (because they require event handling)
* Use \<NavLink\> instead of history.push() when possible
* use `const functionToPropMappings` even when there is only one action to be mapped. Note that it is just a object! (there was some chained misunderstanding before that I'll omit here... renamed the variable to avoid further confusion)
* design own sign-in and sign-up form instead of using Card and Form from react-bootstrap
* define constants inside the components (rather than defining them globally/on a greater scope than necessary)
* renames:
  * `authenticated` to `isAuthenticated`

# Definitions, Specifications, and Clarifications

# (Micro-)Optimizations

* come up with a more modularized way to namespace the redux action types (currently it's just up to the programmer to ensure that the action types are defined appropriately)

* explicitly cache image for reuse (i.e. the TradeVance logo)? Browser would typically cache the image for us, but this is not guaranteed.

* curb the excessive use of \<FlexView\> (e.g. in `Profile`)

* get rid of the ulgy imports (e.g. `../../../routePaths.js`)... maybe use global/env definitions?

* always fetching the token in each action creator may be costly...

# Modularization

* make my own reusable `Tabs` library/component?

# Potential/Eventual Redundancies

* react-tradingview-widget dependency
* some script tags in `index.html` and `200.html`
  * fontawesome

# New Features for Users

## easy

## moderate

* allow users to rearrange ChartingTabs (in bulk, even)

## hard

* allow users to save the state of a group of charting tabs and re-open them (i.e. a more powerful version of a "watchlist")
* all the `// TODO: implement and uncomment` parts

# New Features for the Client (for the app itself, coding, developers...)

## easy

* Store and use images server-side (e.g. the logo used for the navbar)
* hover-over to display detailed information (e.g. hover over "total like" to see the `likeCount` from each category)

## moderate

* Responsiveness (see [here](https://stackoverflow.com/a/51744517)):
  * NavBar
  * Landing
  * Profile

* make relevant functions allow both array and single-object input, then rename accordingly (i.e. rename `removeChartingTabsByIndices()` to `removeChartingTabsByIndex()` after enabling it to take in both an index and an array of indices)

## hard

* make states persist between multiple opened pages - see [here](https://stackoverflow.com/a/49385375)

# Find out more about

