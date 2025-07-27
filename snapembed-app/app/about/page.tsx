<main className="min-h-screen bg-white text-black p-6">
  <h1 className="text-4xl font-bold mb-4">SnapEmbed</h1>
  <p className="mb-6 text-lg">Convert social media screenshots into embeddable HTML in seconds.</p>

  <section className="mb-12">
    <h2 className="text-2xl font-semibold mb-2">🔧 How it Works</h2>
    <ol className="list-decimal ml-6 text-md space-y-2">
      <li>Upload a screenshot from Twitter, LinkedIn, YouTube etc.</li>
      <li>We host it securely and return an HTML embed code.</li>
      <li>Paste the embed into your blog, landing page, or Notion doc.</li>
    </ol>
  </section>

  <section className="mb-12">
    <h2 className="text-2xl font-semibold mb-2">📦 Free Tier</h2>
    <p>Free 100 uploads/month. No login required. No watermark.</p>
  </section>

  <section className="mb-12">
    <h2 className="text-2xl font-semibold mb-2">💰 Coming Soon</h2>
    <p>Paid plans via RapidAPI for high volume or custom branding.</p>
  </section>

  <section className="mb-12">
    <h2 className="text-2xl font-semibold mb-2">🚀 Example Embed</h2>
    <img src="https://snapembed.onrender.com/static/example.jpg" className="border rounded shadow-md w-full max-w-md" alt="example embed" />
    <pre className="bg-gray-100 p-3 rounded text-sm mt-4 overflow-x-auto">
      {`<img src="https://snapembed.onrender.com/static/example.jpg" style="max-width: 100%;" alt="SnapEmbed" />`}
    </pre>
  </section>

  <footer className="text-sm text-gray-500">
    Built by <a href="https://yourname.com" className="underline">Your Name</a> • <a href="https://github.com/yourrepo" className="underline">GitHub</a>
  </footer>
</main>
