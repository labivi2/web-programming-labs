import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { FileMetadata } from './types';

const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maxSize = 5 * 1024 * 1024;

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [result, setResult] = useState<FileMetadata | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const preview = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file]);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setError('');
    setResult(null);
    setProgress(0);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (!allowedTypes.includes(selectedFile.type)) {
      setFile(null);
      setError('Дозволені лише JPEG, PNG та WEBP');
      return;
    }

    if (selectedFile.size > maxSize) {
      setFile(null);
      setError('Максимальний розмір файлу — 5 МБ');
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!file) {
      setError('Оберіть зображення');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    setError('');
    setIsUploading(true);

    try {
      const response = await axios.post<FileMetadata>(
        `${import.meta.env.VITE_API_URL}/files`,
        formData,
        {
          onUploadProgress: (event) => {
            if (event.total) {
              setProgress(Math.round((event.loaded * 100) / event.total));
            }
          },
        },
      );
      setResult(response.data);
    } catch {
      setError('Не вдалося завантажити файл');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main>
      <section className="card">
        <h1>Завантаження зображення</h1>

        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFile} />

          {file && (
            <div className="preview">
              <img src={preview} alt="Попередній перегляд" />
              <p>{file.name}</p>
              <p>{(file.size / 1024).toFixed(1)} КБ</p>
            </div>
          )}

          {isUploading && (
            <div>
              <progress value={progress} max="100" />
              <p>{progress}%</p>
            </div>
          )}

          {error && <p className="error">{error}</p>}

          <button disabled={!file || isUploading}>
            {isUploading ? 'Завантаження...' : 'Завантажити'}
          </button>
        </form>

        {result && (
          <div className="result">
            <p>Файл успішно завантажено</p>
            <img src={result.url} alt={result.originalName} />
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
