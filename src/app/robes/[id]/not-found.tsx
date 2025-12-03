import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-6xl font-heading mb-4">404</h1>
          <h2 className="text-2xl mb-6">Robe introuvable</h2>
          <p className="text-gray-600 mb-8">
            Désolé, cette robe n'est pas disponible ou n'existe pas.
          </p>
          <Link href="/robes" className="btn-primary inline-block">
            Retour au catalogue
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
