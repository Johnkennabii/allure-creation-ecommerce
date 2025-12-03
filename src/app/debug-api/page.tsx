"use client"

import { useState } from "react"

export default function DebugApiPage() {
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const testDresses = async () => {
    setLoading(true)
    try {
      const token = process.env.NEXT_PUBLIC_API_TOKEN
      const response = await fetch("https://api.allure-creation.fr/dresses/details-view?limit=2", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error: any) {
      setResult(`Error: ${error.message}`)
    }
    setLoading(false)
  }

  const testTypes = async () => {
    setLoading(true)
    try {
      const token = process.env.NEXT_PUBLIC_API_TOKEN
      const response = await fetch("https://api.allure-creation.fr/dress-types", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error: any) {
      setResult(`Error: ${error.message}`)
    }
    setLoading(false)
  }

  const testSizes = async () => {
    setLoading(true)
    try {
      const token = process.env.NEXT_PUBLIC_API_TOKEN
      const response = await fetch("https://api.allure-creation.fr/dress-sizes", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error: any) {
      setResult(`Error: ${error.message}`)
    }
    setLoading(false)
  }

  const testColors = async () => {
    setLoading(true)
    try {
      const token = process.env.NEXT_PUBLIC_API_TOKEN
      const response = await fetch("https://api.allure-creation.fr/dress-colors", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error: any) {
      setResult(`Error: ${error.message}`)
    }
    setLoading(false)
  }

  const testFilterByType = async () => {
    setLoading(true)
    try {
      const token = process.env.NEXT_PUBLIC_API_TOKEN
      const response = await fetch("https://api.allure-creation.fr/dresses/details-view?types=Caftan&limit=2", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error: any) {
      setResult(`Error: ${error.message}`)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Debug API</h1>

        <div className="flex gap-4 mb-6 flex-wrap">
          <button
            onClick={testDresses}
            disabled={loading}
            className="bg-black text-white px-4 py-2"
          >
            Test Dresses
          </button>
          <button
            onClick={testTypes}
            disabled={loading}
            className="bg-black text-white px-4 py-2"
          >
            Test Types
          </button>
          <button
            onClick={testSizes}
            disabled={loading}
            className="bg-black text-white px-4 py-2"
          >
            Test Sizes
          </button>
          <button
            onClick={testColors}
            disabled={loading}
            className="bg-black text-white px-4 py-2"
          >
            Test Colors
          </button>
          <button
            onClick={testFilterByType}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2"
          >
            Test Filter (Caftan)
          </button>
        </div>

        <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs max-h-[600px]">
          {result || "Click a button to test the API"}
        </pre>
      </div>
    </div>
  )
}
