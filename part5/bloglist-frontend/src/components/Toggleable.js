import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggleable = React.forwardRef(({ labelWhenOpened, labelWhenClosed, children, initialVisibility = false }, ref) => {
  const [visible, setVisibile] = useState(initialVisibility)

  const toggleVisibility = () => setVisibile(!visible)

  useImperativeHandle(ref, () => ({ toggleVisibility }))

  return (
    <div>
      {visible && children}
      <button onClick = {toggleVisibility}>{visible ? labelWhenOpened : labelWhenClosed}</button>
    </div>
  )
})

Toggleable.displayName = 'Toggleable'

Toggleable.propTypes = {
  labelWhenOpened: PropTypes.string.isRequired,
  labelWhenClosed: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default Toggleable
