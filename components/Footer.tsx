export default function Footer() {
  return (
    <footer className="mt-10 border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-gray-500 space-y-2">
        <p className="font-medium text-gray-700">
          MD Travels & Transport Services
        </p>

        <p>
          44 Wrench Street, Parow West, Cape Town
        </p>

        <p>
          📞 060 641 1703 · ✉️ info@mdtravel.co.za
        </p>

        <p className="pt-2 text-gray-400">
          © {new Date().getFullYear()} Altrotechai. All rights reserved. 
        </p>
      </div>
    </footer>
  )
}
