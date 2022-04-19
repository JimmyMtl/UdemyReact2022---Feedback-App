import React, { useContext, useEffect, useState } from 'react'
import FeedbackContext from './context/FeedbackContext'

const RatingSelect = ({ select }) => {
  const {
    feedbackEdit,
  } = useContext(FeedbackContext)
  const [selected, setSelected] = useState(10)
  useEffect(() => {
    setSelected(feedbackEdit.item.rating)
  }, [feedbackEdit])
  const handleChange = (e) => {
    setSelected(+e.currentTarget.value)
    select(+e.currentTarget.value)
  }
  return (
    <ul className={'rating'}>
      {Array.from({ length: 10 }, (_, i) => (
        <li key={i + 1}>
          <input type='radio'
                 id={`num${i + 1}`}
                 name={'rating'}
                 value={i + 1}
                 onChange={handleChange}
                 checked={selected === i + 1} />
          <label htmlFor={`num${i + 1}`}>{i + 1}</label>
        </li>
      ))}

    </ul>
  )
}

export default RatingSelect