"use client"

import { useState } from "react"

export default function ApiTestPage() {
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const testApi = async () => {
    setLoading(true)
    setResult("Testing...")

    try {
      const token = process.env.NEXT_PUBLIC_API_TOKEN
      setResult(`Token: ${token ? token.substring(0, 20) + "..." : "NOT FOUND"}\n\n`)

      const response = await fetch("https://api.allure-creation.fr/dress-types", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const responseText = await response.text()

      setResult(
        (prev) =>
          prev +
          `Status: ${response.status} ${response.statusText}\n\n${responseText}`
      )
    } catch (error: any) {
      setResult((prev) => prev + `Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">API Test</h1>

        <button
          onClick={testApi}
          disabled={loading}
          className="bg-black text-white px-6 py-3 mb-6"
        >
          {loading ? "Testing..." : "Test API"}
        </button>

        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {result || "Click the button to test the API"}
        </pre>
      </div>
    </div>
  )
}
