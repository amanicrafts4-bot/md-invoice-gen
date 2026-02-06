'use client'

import { PDFDownloadLink } from '@react-pdf/renderer'
import InvoicePDF from './InvoicePDF'

type Props = {
  rows: any[]
  total: number
  clientName: string
  clientEmail: string
  clientPhone: string
}

export default function PDFDownloadButton(props: Props) {
  return (
    <PDFDownloadLink
      document={<InvoicePDF {...props} />}
      fileName="invoice.pdf"
    >
      {({ loading }) => (
        <button
          type="button"
          className="w-full rounded-xl bg-green-600 py-4 text-white text-base font-semibold"
        >
          {loading ? 'Preparing PDF…' : 'Download PDF'}
        </button>
      )}
    </PDFDownloadLink>
  )
}
