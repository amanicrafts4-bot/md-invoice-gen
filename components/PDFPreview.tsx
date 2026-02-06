'use client'

import { PDFViewer } from '@react-pdf/renderer'
import InvoicePDF from './InvoicePDF'

export default function PDFPreview(props: any) {
  return (
    <PDFViewer width="100%" height="100%">
      <InvoicePDF {...props} />
    </PDFViewer>
  )
}
