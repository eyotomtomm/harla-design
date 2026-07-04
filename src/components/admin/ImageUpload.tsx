'use client';

import { useState, useRef } from 'react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = 'Image' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (res.ok) {
        const { url } = await res.json();
        onChange(url);
      }
    } catch {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="image-upload-wrapper" style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="Enter image URL or upload a file"
            style={{ marginBottom: '8px' }}
          />
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: `2px dashed ${dragOver ? '#c8a876' : '#444'}`,
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center',
              cursor: 'pointer',
              background: dragOver ? 'rgba(200,168,118,0.1)' : 'transparent',
              transition: 'all 0.2s',
              color: '#999',
              fontSize: '13px',
            }}
          >
            {uploading ? (
              <span>Uploading...</span>
            ) : (
              <span>
                <i className="fas fa-cloud-upload-alt" style={{ fontSize: '20px', display: 'block', marginBottom: '6px' }}></i>
                Drop image here or click to browse
              </span>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        {value && (
          <div style={{ flexShrink: 0 }}>
            <img
              src={value}
              alt="Preview"
              style={{
                width: 120,
                height: 80,
                objectFit: 'cover',
                borderRadius: '6px',
                border: '1px solid #333',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
