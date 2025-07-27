'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

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

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setImgUrl(data.image_url);
    setEmbed(data.embed_code);
    toast.success('Upload successful!');
  } catch (err) {
    toast.error('Upload failed.');
  } finally {
    setLoading(false);
  }
  const currentCount = Number(localStorage.getItem('snapembed_uploads') || '0');
  localStorage.setItem('snapembed_uploads', String(currentCount + 1));
  localStorage.setItem('snapembed_last_upload', new Date().toISOString());
  toast.success(`Uploads: ${currentCount + 1}`);


};

  return (
    <div className="bg-black p-6 rounded shadow w-full max-w-md">
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleUpload}
        disabled={!file || loading}
      >
        {loading ? (
          <div className="flex items-center">
            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24" fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="white"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="white"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
                 Uploading...
          </div>
          ): 'Generate Embed'}

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
            onClick= {() => {navigator.clipboard.writeText(embed || '')
                           toast.success('Embed code copied!');
            }}
          >
            Copy Embed Code
          </button>
        </>
      )}
    </div>
  );
}
