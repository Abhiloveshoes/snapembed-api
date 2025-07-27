// app/page.tsx
'use client';

import UploadForm from './upload-form';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen p-6 bg-white text-gray-800">
      {/* Hero Section */}
      <section className="text-center max-w-2xl my-12">
        <h1 className="text-4xl font-bold mb-4">SnapEmbed</h1>
        <p className="text-lg mb-6">
          Upload a screenshot. Get a public link + embeddable code instantly.
        </p>
        <p className="text-sm text-gray-500">
          Perfect for creators, bloggers, and marketers.
        </p>
      </section>

      {/* Upload Demo */}
      <section className="w-full flex justify-center my-4" id="demo">
        <UploadForm />
      </section>

      {/* API Usage */}
      <section className="mt-20 max-w-2xl w-full">
        <h2 className="text-2xl font-semibold mb-4">🛠️ API Usage</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`POST https://snapembed.onrender.com/generate

FormData:
  file: image.jpg (PNG or JPEG)

Response:
{
  "image_url": "https://...",
  "embed_code": "<img src='...'>"
}`}
        </pre>
      </section>

      {/* Pricing */}
      <section className="mt-16 max-w-2xl w-full text-left mb-20">
        <h2 className="text-2xl font-semibold mb-4">💰 Pricing</h2>
        <ul className="space-y-3 text-gray-700 text-base">
          <li>✅ Free Tier: 100 uploads/month</li>
          <li>💼 Pro Tier: $5/month for 1,000 uploads</li>
          <li>📦 Enterprise: Custom pricing</li>
        </ul>
      </section>
      {/* Upgrade Button */}

      <section className="text-center mt-8">
      <a
         href="https://buy.stripe.com/test_dummy" // Replace with real link later
        className="inline-block bg-green-600 text-white px-6 py-3 rounded font-semibold hover:bg-green-700 transition"
          >
            Upgrade to Pro
       </a>
      </section>


      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-6 border-t w-full">
        © 2025 SnapEmbed · Made for developers & creators
      </footer>
    </main>
  );
}
