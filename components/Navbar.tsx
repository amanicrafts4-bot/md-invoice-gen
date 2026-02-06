export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="px-4 py-3 flex items-center gap-3">
        <img src="/md-travels-logo.png" className="h-9" />
        <div>
          <p className="text-sm font-semibold">MD Travels</p>
          <p className="text-xs text-gray-500">Invoice Generator</p>
        </div>
      </div>
    </header>
  )
}
