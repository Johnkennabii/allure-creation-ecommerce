import type { Metadata } from "next"
import "./globals.css"
import { CartProvider } from "@/context/CartContext"

export const metadata: Metadata = {
  title: "Allure Création - Robes de Mariée, Soirée et Cocktail",
  description: "Découvrez notre collection exceptionnelle de robes élégantes pour tous vos événements. Location et vente de robes de mariée, soirée, cocktail et cérémonie.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
