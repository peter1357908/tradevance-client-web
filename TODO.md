# High Priority

Use a more secure authentication scheme (currently the client sends naked authentication inforamtion, which is vulnerable to man-in-the-middle attack)

# Sanity Check


# Consistency

* Use Class Component for Section1 and Section2 under Landing (because they require event handling)
* Name the object key "profile" rather than "user" in the user-related actions (and on the API side)
* Use \<NavLink\> instead of history.push() when possible


# Definitions, Specifications, and Clarifications


# (Micro-)Optimizations

* fetch only the minimum-necessary account information (i.e. username, for now) upon starting up the app, because accessing my-profile will automatically fetch the latest information anyway.

* explicitly cache image for reuse (i.e. the TradeVance logo)? Browser would typically cache the image for us, but this is not guaranteed.

# New Features for Users

## easy

## moderate

## hard


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



