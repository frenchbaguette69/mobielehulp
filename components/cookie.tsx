'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function CookieMelding() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const akkoord = localStorage.getItem('cookie-toestemming')
    if (!akkoord) {
      setOpen(true)
    }
  }, [])

  const accepteerCookies = () => {
    localStorage.setItem('cookie-toestemming', 'ja')
    setOpen(false)
  }

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-md text-center">
        {/* ✅ Voeg een DialogTitle toe voor toegankelijkheid */}
        <DialogTitle className="text-base font-semibold">
          Cookiegebruik
        </DialogTitle>
        <p className="text-sm mt-2">
          We gebruiken cookies om je ervaring op onze website te verbeteren. Door verder te gaan, ga je akkoord met ons gebruik van cookies.
        </p>
        <Button onClick={accepteerCookies} className="mt-4">
          Accepteren
        </Button>
      </DialogContent>
    </Dialog>
  )
}
