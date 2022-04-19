import { createContext, useEffect, useState } from 'react'
const FeedbackContext = createContext()


export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  useEffect(() => {
    fetchFeedback()
  }, [])
  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`)
    const data = await response.json()
    setFeedback(data)
    setIsLoading(false)
  }
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({ item, edit: true })
  }
  // Update feedback item
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => item.id === id ? { ...item, ...updItem } : item))
  }
  // Add Feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback),
    })
    const data = await response.json()
    setFeedback([data, ...feedback])
  }
  // Delete Feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {

      setFeedback(feedback.filter((el) => el.id !== id))
    }
  }
  return <FeedbackContext.Provider
    value={{
      feedback,
      feedbackEdit,
      deleteFeedback,
      addFeedback,
      editFeedback,
      updateFeedback,
      isLoading,
    }}>
    {children}
  </FeedbackContext.Provider>
}
export default FeedbackContext