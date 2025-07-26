'use client';

import { useState } from 'react';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [embed, setEmbed] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate`, 
 {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setImgUrl(data.image_url);
    setEmbed(data.embed_code);
    setLoading(false);
  };

  return (
    <div className="bg-black p-6 rounded shadow w-full max-w-md">
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleUpload}
        disabled={!file || loading}
      >
        {loading ? 'Uploading...' : 'Generate Embed'}
      </button>

      {imgUrl && (
        <>
          <img src={imgUrl} alt="Uploaded" className="mt-6 border rounded" />
          <textarea
            readOnly
            value={embed || ''}
            className="mt-4 w-full border p-2 rounded font-mono text-sm"
            rows={3}
          />
          <button
            className="mt-2 text-sm bg-gray-800 text-white px-3 py-1 rounded"
            onClick={() => navigator.clipboard.writeText(embed || '')}
          >
            Copy Embed Code
          </button>
        </>
      )}
    </div>
  );
}
