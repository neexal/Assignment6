import { useEffect, useState } from 'react'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export default function ImagesFor({ id }) {
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetch(`https://api.themoviedb.org/3/person/${id}/images?api_key=${API_KEY}`)
      .then((r) => r.json())
      .then((data) => setProfiles(data.profiles || []))
      .catch((e) => setError(e.message || String(e)))
      .finally(() => setLoading(false))
  }, [id])

  if (!id) return null
  if (loading) return <div>Loading images...</div>
  if (error) return <div style={{ color: 'red' }}>Error loading images</div>
  if (!profiles || profiles.length === 0) return <div>No images.</div>

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {profiles.map((p, i) => (
        <img
          key={i}
          src={`https://image.tmdb.org/t/p/w92${p.file_path}`}
          alt={`img-${i}`}
          style={{ width: 92, borderRadius: 4 }}
        />
      ))}
    </div>
  )
}
