import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    // Fetch companies from Django API
    fetch('/api/companies/')
      .then(res => res.json())
      .then(data => setCompanies(data))
      .catch(err => console.error('Error fetching companies:', err))
  }, [])

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    
    try {
      const response = await fetch('/api/newsletter/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      alert(data.message || 'Thank you for signing up!')
      e.target.reset()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="App">
      {/* React components will be added here */}
      {/* This allows React to coexist with existing vanilla JS */}
    </div>
  )
}

export default App

