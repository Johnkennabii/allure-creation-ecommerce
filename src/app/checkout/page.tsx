"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CheckoutStepper from "@/components/CheckoutStepper"
import { useCart } from "@/context/CartContext"
import Image from "next/image"
import Link from "next/link"
import { createProspect } from "@/lib/api"
import type { CreateProspectData } from "@/lib/api"
import DateRangePicker from "@/components/DateRangePicker"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, removeItem, clearCart, addItem } = useCart()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)

  const steps = ["Panier", "Informations", "Confirmation"]

  // État du formulaire
  const [formData, setFormData] = useState<CreateProspectData>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    postal_code: "",
    city: "",
    country: "France",
    notes: "",
  })

  // Calculer le total
  const total = items.reduce((sum, item) => {
    const dailyPrice = parseFloat(item.dress.price_per_day_ttc || "0")
    const days = item.rentalDates?.days || 0
    return sum + dailyPrice * days
  }, 0)

  // Vérifier si toutes les robes ont des dates
  const allItemsHaveDates = items.every((item) => item.rentalDates)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleNext = () => {
    if (currentStep === 0 && !allItemsHaveDates) {
      setError("Veuillez définir les dates pour toutes les robes")
      return
    }
    setError(null)
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleUpdateDates = (
    dressId: string,
    startDate: string,
    endDate: string,
    days: number
  ) => {
    const item = items.find((i) => i.dress.id === dressId)
    if (item) {
      addItem({
        ...item,
        rentalDates: { startDate, endDate, days },
      })
      setEditingItemId(null)
    }
  }

  const handleSubmit = async () => {
    setError(null)
    setIsSubmitting(true)

    try {
      // Construire les dress_reservations au format API
      const dress_reservations = items
        .filter((item) => item.rentalDates) // Ne prendre que les items avec dates
        .map((item) => ({
          dress_id: item.dress.id,
          rental_start_date: item.rentalDates!.startDate,
          rental_end_date: item.rentalDates!.endDate,
          notes: "", // Notes par robe si besoin
        }))

      // Créer le prospect avec les robes
      const response = await createProspect({
        ...formData,
        source: "website",
        status: "new",
        dress_reservations,
      })

      if (response.success) {
        // Vider le panier
        clearCart()
        // Rediriger vers la page de confirmation
        router.push(`/confirmation?prospect=${response.data.id}`)
      }
    } catch (err) {
      console.error("Erreur lors de la création du prospect:", err)
      setError(
        "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Rediriger si le panier est vide
  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-4xl font-heading mb-6">Panier vide</h1>
              <p className="text-gray-600 mb-8">
                Votre panier est vide. Ajoutez des robes pour continuer.
              </p>
              <Link href="/robes" className="btn-primary inline-block">
                Découvrir nos robes
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-heading mb-8 text-center">
            Finaliser ma demande
          </h1>

          {/* Stepper */}
          <CheckoutStepper currentStep={currentStep} steps={steps} />

          {/* Étape 1 : Panier */}
          {currentStep === 0 && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-2xl font-heading mb-6">
                  Votre sélection ({items.length} robe
                  {items.length > 1 ? "s" : ""})
                </h2>

                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.dress.id}
                      className="flex gap-4 p-4 border border-gray-200 rounded-lg"
                    >
                      {/* Image */}
                      <div className="relative w-24 h-32 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                        {item.dress.images?.[0] && (
                          <Image
                            src={item.dress.images[0]}
                            alt={item.dress.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-heading text-lg">
                              {item.dress.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Réf: {item.dress.reference}
                            </p>
                            <p className="text-sm text-gray-600">
                              Taille {item.dress.size_name} • {item.dress.color_name}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.dress.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Retirer
                          </button>
                        </div>

                        {/* Dates */}
                        {editingItemId === item.dress.id ? (
                          <div className="bg-gray-50 p-4 rounded">
                            <DateRangePicker
                              dressId={item.dress.id}
                              initialStartDate={item.rentalDates?.startDate}
                              initialEndDate={item.rentalDates?.endDate}
                              onDatesSelected={(start, end, days) =>
                                handleUpdateDates(item.dress.id, start, end, days)
                              }
                            />
                          </div>
                        ) : item.rentalDates ? (
                          <div className="bg-gray-50 p-3 rounded">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm font-medium text-gray-700">
                                  Du{" "}
                                  {new Date(
                                    item.rentalDates.startDate
                                  ).toLocaleDateString("fr-FR")}{" "}
                                  au{" "}
                                  {new Date(
                                    item.rentalDates.endDate
                                  ).toLocaleDateString("fr-FR")}
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                  {item.rentalDates.days} jour
                                  {item.rentalDates.days > 1 ? "s" : ""} •{" "}
                                  {parseFloat(item.dress.price_per_day_ttc).toFixed(
                                    2
                                  )}{" "}
                                  € / jour
                                </p>
                              </div>
                              <button
                                onClick={() => setEditingItemId(item.dress.id)}
                                className="text-sm text-accent hover:underline"
                              >
                                Modifier
                              </button>
                            </div>
                            <p className="text-right font-semibold text-lg mt-2">
                              {(
                                parseFloat(item.dress.price_per_day_ttc) *
                                item.rentalDates.days
                              ).toFixed(2)}{" "}
                              €
                            </p>
                          </div>
                        ) : (
                          <div className="bg-orange-50 border border-orange-200 p-3 rounded">
                            <p className="text-sm text-orange-800 mb-2">
                              ⚠️ Dates non définies
                            </p>
                            <button
                              onClick={() => setEditingItemId(item.dress.id)}
                              className="text-sm text-accent hover:underline font-medium"
                            >
                              Sélectionner les dates
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-heading">Total estimé</span>
                    <span className="text-3xl font-heading text-accent">
                      {total.toFixed(2)} €
                    </span>
                  </div>
                  {allItemsHaveDates && (
                    <p className="text-xs text-gray-500 text-right mt-2">
                      Prix calculé selon la durée de chaque location
                    </p>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <Link href="/robes" className="btn-secondary">
                  ← Continuer mes achats
                </Link>
                <button
                  onClick={handleNext}
                  disabled={!allItemsHaveDates}
                  className="btn-primary"
                >
                  Continuer →
                </button>
              </div>

              {error && (
                <p className="text-center text-red-600 text-sm mt-4">{error}</p>
              )}
            </div>
          )}

          {/* Étape 2 : Informations */}
          {currentStep === 1 && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-2xl font-heading mb-6">
                  Vos informations
                </h2>

                <form className="space-y-4">
                  {/* Nom et Prénom */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  {/* Email et Téléphone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+33612345678"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  {/* Adresse */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Adresse *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    />
                  </div>

                  {/* Code postal et Ville */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Code postal *
                      </label>
                      <input
                        type="text"
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Ville *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  {/* Pays */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Pays *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Notes complémentaires (optionnel)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Informations supplémentaires, préférences de rendez-vous..."
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    />
                  </div>
                </form>
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <button onClick={handleBack} className="btn-secondary">
                  ← Retour au panier
                </button>
                <button
                  onClick={handleNext}
                  disabled={
                    !formData.firstname ||
                    !formData.lastname ||
                    !formData.email ||
                    !formData.phone ||
                    !formData.address ||
                    !formData.postal_code ||
                    !formData.city
                  }
                  className="btn-primary"
                >
                  Continuer →
                </button>
              </div>
            </div>
          )}

          {/* Étape 3 : Confirmation */}
          {currentStep === 2 && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-2xl font-heading mb-6">
                  Récapitulatif de votre demande
                </h2>

                {/* Informations client */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="font-semibold mb-3">Vos informations</h3>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-sm">
                      <strong>
                        {formData.firstname} {formData.lastname}
                      </strong>
                    </p>
                    <p className="text-sm text-gray-600">{formData.email}</p>
                    <p className="text-sm text-gray-600">{formData.phone}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      {formData.address}
                      <br />
                      {formData.postal_code} {formData.city}
                      <br />
                      {formData.country}
                    </p>
                    <button
                      onClick={handleBack}
                      className="text-sm text-accent hover:underline mt-2"
                    >
                      Modifier
                    </button>
                  </div>
                </div>

                {/* Robes sélectionnées */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Robes sélectionnées</h3>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.dress.id}
                        className="flex gap-3 p-3 bg-gray-50 rounded"
                      >
                        <div className="relative w-16 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                          {item.dress.images?.[0] && (
                            <Image
                              src={item.dress.images[0]}
                              alt={item.dress.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          )}
                        </div>
                        <div className="flex-1 text-sm">
                          <p className="font-semibold">{item.dress.name}</p>
                          <p className="text-xs text-gray-600">
                            {item.dress.reference}
                          </p>
                          {item.rentalDates && (
                            <>
                              <p className="text-xs text-gray-600 mt-1">
                                Du{" "}
                                {new Date(
                                  item.rentalDates.startDate
                                ).toLocaleDateString("fr-FR")}{" "}
                                au{" "}
                                {new Date(
                                  item.rentalDates.endDate
                                ).toLocaleDateString("fr-FR")}
                              </p>
                              <p className="text-xs text-gray-600">
                                {item.rentalDates.days} jour
                                {item.rentalDates.days > 1 ? "s" : ""}
                              </p>
                            </>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-accent">
                            {item.rentalDates
                              ? (
                                  parseFloat(item.dress.price_per_day_ttc) *
                                  item.rentalDates.days
                                ).toFixed(2)
                              : "0.00"}{" "}
                            €
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-heading">Total estimé</span>
                    <span className="text-3xl font-heading text-accent">
                      {total.toFixed(2)} €
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    Prix calculé selon la durée de chaque location
                  </p>
                </div>

                {/* Informations importantes */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded p-4">
                  <h4 className="font-semibold text-sm mb-2">
                    Prochaines étapes
                  </h4>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>✓ Confirmation par email</li>
                    <li>✓ Prise de contact sous 24h</li>
                    <li>✓ Rendez-vous en boutique pour essayage</li>
                  </ul>
                </div>

                {/* Message d'erreur */}
                {error && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded p-4">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <button onClick={handleBack} className="btn-secondary">
                  ← Modifier mes informations
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="btn-primary"
                >
                  {isSubmitting
                    ? "Envoi en cours..."
                    : "Confirmer ma demande"}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                En confirmant, vous acceptez d'être contacté par notre équipe
                pour organiser un rendez-vous en boutique.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
