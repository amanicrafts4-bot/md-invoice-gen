'use client'

import { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import InvoicePDF from './InvoicePDF'

type Row = {
  date: string
  no: string
  vehicle: string
  destination: string
  rate: number
}

export default function InvoiceForm() {
  const [rows, setRows] = useState<Row[]>([
    { date: '', no: '', vehicle: '', destination: '', rate: 0 },
  ])

  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const updateRow = <K extends keyof Row>(
  index: number,
  key: K,
  value: Row[K]
) => {
  const updated = [...rows]
  updated[index] = {
    ...updated[index],
    [key]: value,
  }
  setRows(updated)
}


  const addRow = () => {
    setRows([
      ...rows,
      { date: '', no: '', vehicle: '', destination: '', rate: 0 },
    ])
  }

  const removeRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index))
  }

  const total = rows.reduce((sum, r) => sum + (r.rate || 0), 0)

  const generateInvoice = async () => {
    setLoading(true)
    const blob = await pdf(<InvoicePDF rows={rows} total={total} />).toBlob()
    setPdfUrl(URL.createObjectURL(blob))
    setLoading(false)
  }

 return (
  <div className="invoice-container">
    <div className="invoice-title">
        <header className="sticky top-0 z-50 bg-white border-b">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
        <img
          src="/md-travels-logo.png"
          alt="MD Travels"
          className="h-9 w-auto"
        />
        <div>
          <h1 className="text-sm font-semibold leading-tight">
            MD Travels
          </h1>
          <p className="text-xs text-gray-500">
            Invoice Generator
          </p>
        </div>
      </div>
    </header>
    </div>

    <table className="invoice-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>No</th>
          <th>Vehicle</th>
          <th>Destination</th>
          <th>Rate (R)</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            <td>
              <input
                value={row.date}
                onChange={(e) => updateRow(i, 'date', e.target.value)}
              />
            </td>
            <td>
              <input
                value={row.no}
                onChange={(e) => updateRow(i, 'no', e.target.value)}
              />
            </td>
            <td>
              <input
                value={row.vehicle}
                onChange={(e) => updateRow(i, 'vehicle', e.target.value)}
              />
            </td>
            <td>
              <input
                value={row.destination}
                onChange={(e) =>
                  updateRow(i, 'destination', e.target.value)
                }
              />
            </td>
            <td>
              <input
                type="number"
                value={row.rate}
                onChange={(e) =>
                  updateRow(i, 'rate', Number(e.target.value))
                }
              />
            </td>
            <td>
              {rows.length > 1 && (
                <button
                  className="delete-btn"
                  onClick={() => removeRow(i)}
                >
                  ✕
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>

      <tfoot>
        <tr className="total-row">
          <td colSpan={4}>Total</td>
          <td>R {total.toFixed(2)}</td>
          <td />
        </tr>
      </tfoot>
    </table>

    <div className="invoice-actions">
      <button className="add-row" onClick={addRow}>
        ➕ Add Row
      </button>

      <button className="generate-btn" onClick={generateInvoice}>
        Generate Invoice
      </button>
    </div>

    {pdfUrl && (
      <>
        <iframe
          src={pdfUrl}
          style={{ width: '100%', height: 650, marginTop: 24 }}
        />
        <a href={pdfUrl} download="md-travels-invoice.pdf">
          Download PDF
        </a>
      </>
    )}
  </div>
)

}
