# High Priority

* Use a more secure authentication scheme (currently the client sends naked authentication inforamtion, which is vulnerable to man-in-the-middle attack)

* fetch only the minimum-necessary account information (i.e. username, for now) upon starting up the app, because accessing my-profile will automatically fetch the latest information anyway.

* fetch populated content (getting document id/reference is meaningless to front-end)

# Sanity Check


# Consistency

* Use Class Component for Section1 and Section2 under Landing (because they require event handling)
* Name the object key "profile" rather than "user" in the user-related actions (and on the API side)
* Use \<NavLink\> instead of history.push() when possible
* Pull out the upper "overview" section in MyProfile and make it its own component. For abstraction.
* use `const functionToPropsMapping` even when there is only one action to be mapped. Note that it is just a object! (there was some chained misunderstanding before that I'll omit here... renamed the variable to avoid further confusion)
* design own sign-in and sign-up form instead of using Card and Form from react-bootstrap

# Definitions, Specifications, and Clarifications

* define "Free Plan" on the server side and update `MyProfile.renderSubscription()`

# (Micro-)Optimizations

* explicitly cache image for reuse (i.e. the TradeVance logo)? Browser would typically cache the image for us, but this is not guaranteed.

* curb the excessive use of \<FlexView\> (e.g. in `MyProfile`)

* get rid of the ulgy imports (e.g. `../../../routePaths.js`)... maybe use global/env definitions?

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

# New Features for the Client

## easy

* Store and use images server-side (e.g. the logo used for the navbar)
* hover-over to display detailed information (e.g. hover over "total like" to see the `likeCount` from each category)

## moderate

* Responsiveness (see [here](https://stackoverflow.com/a/51744517)):
  * NavBar
  * Landing
  * MyProfile

## hard

* make states persist between multiple opened pages - see [here](https://stackoverflow.com/a/49385375)



