'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InvoicePDF from '@/components/InvoicePDF'
import { PDFDownloadLink } from '@react-pdf/renderer'

const PDFPreview = dynamic(
  () => import('@/components/PDFPreview'),
  { ssr: false }
)

const PDFDownloadButton = dynamic(
  () => import('@/components/PDFDownloadButton'),
  { ssr: false }
)

type Row = {
  date: string
  no: string
  vehicle: string
  destination: string
  rate: number
}

type Step = 'client' | 'trips' | 'preview'

export default function Home() {
  const [step, setStep] = useState<Step>('client')

  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientPhone, setClientPhone] = useState('')

  const [rows, setRows] = useState<Row[]>([
    { date: '', no: '1', vehicle: '', destination: '', rate: 0 },
  ])

  const updateRow = <K extends keyof Row>(
    index: number,
    key: K,
    value: Row[K]
  ) => {
    setRows((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [key]: value } : r))
    )
  }

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      {
        date: '',
        no: String(prev.length + 1),
        vehicle: '',
        destination: '',
        rate: 0,
      },
    ])
  }

  const removeRow = (index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index))
  }

  const total = rows.reduce((sum, r) => sum + r.rate, 0)

  return (
    <>
      <Navbar />

      {/* SLIDER VIEWPORT */}
      <main className="relative overflow-hidden w-full">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform:
              step === 'client'
                ? 'translateX(0)'
                : step === 'trips'
                ? 'translateX(-100%)'
                : 'translateX(-200%)',
          }}
        >
          {/* STEP 1 — CLIENT */}
          <section className="min-w-full px-4 py-6 space-y-4">
            <h2 className="text-lg font-semibold">Client Details</h2>

            <input
              className="w-full rounded-xl border px-4 py-4 text-base"
              placeholder="Client Name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />

            <input
              className="w-full rounded-xl border px-4 py-4 text-base"
              placeholder="Client Email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
            />

            <input
              className="w-full rounded-xl border px-4 py-4 text-base"
              placeholder="Client Phone"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
            />

            <button
                disabled={!clientName}
                onClick={() => setStep('trips')}
                className="
                  fixed bottom-4 left-4 right-4
                  rounded-2xl
                  bg-blue-600
                  py-4
                  text-white
                  text-base
                  font-semibold
                  shadow-lg
                  active:scale-[0.98]
                  transition
                  disabled:bg-gray-300
                  disabled:text-gray-500
                  disabled:shadow-none
                "
              >
                Continue to Trip Details →
            </button>

          </section>

          {/* STEP 2 — TRIPS */}
          <section className="min-w-full px-4 py-6 space-y-4">
            <h2 className="text-lg font-semibold">Trip Details</h2>

            {rows.map((row, i) => (
              <div
                key={i}
                className="rounded-xl border bg-white p-4 space-y-3"
              >
                <input
                  type="date"
                  className="w-full rounded-lg border px-3 py-3"
                  value={row.date}
                  onChange={(e) =>
                    updateRow(i, 'date', e.target.value)
                  }
                />

                <input
                  className="w-full rounded-lg border px-3 py-3"
                  placeholder="Vehicle Type"
                  value={row.vehicle}
                  onChange={(e) =>
                    updateRow(i, 'vehicle', e.target.value)
                  }
                />

                <input
                  className="w-full rounded-lg border px-3 py-3"
                  placeholder="Destination"
                  value={row.destination}
                  onChange={(e) =>
                    updateRow(i, 'destination', e.target.value)
                  }
                />

                <input
                  type="number"
                  className="w-full rounded-lg border px-3 py-3"
                  placeholder="Rate (R)"
                  value={row.rate}
                  onChange={(e) =>
                    updateRow(i, 'rate', Number(e.target.value))
                  }
                />

                {rows.length > 1 && (
                  <button
                    onClick={() => removeRow(i)}
                    className="text-sm text-red-600"
                  >
                    Remove trip
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={addRow}
              className="w-full rounded-xl border py-3 text-sm font-medium"
            >
              + Add another trip
            </button>

            <button
              onClick={() => setStep('preview')}
              className="w-full rounded-xl bg-blue-600 py-4 text-white text-base font-semibold"
            >
              Review Invoice
            </button>
          </section>

          {/* STEP 3 — PREVIEW */}
          <section className="min-w-full px-4 py-6 space-y-4">
            <h2 className="text-lg font-semibold">Invoice Preview</h2>

            <div className="rounded-xl border bg-gray-50 p-4 text-sm">
              <p className="font-medium">{clientName}</p>
              <p>{clientEmail}</p>
              <p>{clientPhone}</p>
              <p className="mt-2 font-semibold">
                Total: R {total.toFixed(2)}
              </p>
            </div>

            <div className="h-[420px] border rounded-xl overflow-hidden">
              <PDFPreview
                rows={rows}
                total={total}
                clientName={clientName}
                clientEmail={clientEmail}
                clientPhone={clientPhone}
              />
            </div>

            <PDFDownloadButton
              rows={rows}
              total={total}
              clientName={clientName}
              clientEmail={clientEmail}
              clientPhone={clientPhone}
            />  


            <button
              onClick={() => setStep('trips')}
              className="w-full text-sm text-gray-500"
            >
              ← Edit trips
            </button>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
