// app/page.tsx
'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 p-8">
      <section className="max-w-3xl mx-auto text-center py-12">
        <h1 className="text-4xl font-bold mb-4">SnapEmbed API</h1>
        <p className="text-lg mb-6">
          Upload a social media screenshot → Get a hosted image + embed code.
        </p>
        <a
          href="#demo"
          className="bg-blue-600 text-white px-6 py-3 rounded font-semibold"
        >
          Try it Now
        </a>
      </section>

      <section className="max-w-4xl mx-auto mt-16" id="demo">
        <h2 className="text-2xl font-semibold mb-4">Live Demo</h2>
        <p className="mb-4 text-gray-600">
          Upload a screenshot below to see how the embed works:
        </p>
        <iframe
          src="/"
          className="w-full h-[550px] border rounded shadow"
        />
      </section>

      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-4">API Usage</h2>
        <pre className="bg-gray-100 p-4 rounded text-left text-sm overflow-x-auto">
{`POST https://snapembed.onrender.com/generate

FormData:
  file: image.jpg (PNG or JPEG)

Response:
{
  "image_url": "https://...",
  "embed_code": "<img src='...'>"
}
`}
        </pre>
      </section>

      <section className="max-w-4xl mx-auto mt-16 mb-24">
        <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
        <ul className="text-left space-y-3 text-gray-700">
          <li>✅ Free Tier: 100 uploads/month</li>
          <li>💼 Paid Tier: $5/month for 1,000 uploads</li>
          <li>📦 Enterprise: Custom pricing</li>
        </ul>
      </section>
    </main>
  );
}
