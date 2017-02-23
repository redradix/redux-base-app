#Services

Services group by domain the same things modules group by role. That is, selectors and actions. The main difference is that both, actions and selectors
use other actions and selectors from the generic modules. They never dispatch or read from the store directly.

Sometimes services will need some data to start working. In that case an action will be created which will use resources methods
to fetch entities.