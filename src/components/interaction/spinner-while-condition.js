import { branch, renderComponent } from 'recompose'
import SpinnerOverlay from 'components/presentation/spinner-overlay'

const identity = (t)  => t

const spinnerWhileCondition = condition =>
  branch(
    condition,
    identity,
    renderComponent(SpinnerOverlay)
  )

export default spinnerWhileCondition
