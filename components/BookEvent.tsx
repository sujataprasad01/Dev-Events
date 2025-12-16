'use client'
import React, { useState } from 'react'

const BookEvent = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTimeout(() => {
      setSubmitted(true)
    }, 1000)
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div
        id="book-event"
        className="w-full max-w-md rounded-xl p-6
        bg-black/80 border border-white/20
        backdrop-blur-xl shadow-lg"
      >
        {submitted ? (
          <p className="text-center text-sm text-green-400 font-medium">
            🎉 Thank you for signing up!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm text-gray-300"
              >
                Email Address
              </label>

              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-md px-3 py-2 text-sm
                bg-black border border-white/20
                text-white placeholder:text-gray-400
                focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md py-2 text-sm font-medium
              bg-white text-black
              hover:bg-gray-200 transition"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default BookEvent
