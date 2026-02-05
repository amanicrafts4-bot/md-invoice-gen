import InvoiceForm from '@/components/InvoiceForm'

export default function Home() {
  return (
    <main style={{ padding: 40 }}>
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
      <h1>Invoice Generator</h1>
      <InvoiceForm />
    </main>
  )
}
