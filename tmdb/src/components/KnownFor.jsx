export default function KnownFor({ item }) {
  if (!item) return null

  const title = item.title || item.name || 'Untitled'
  const date = item.release_date || item.first_air_date || 'Unknown date'

  return (
    <div style={{ borderTop: '1px solid #ddd', padding: '8px 0' }}>
      <div style={{ fontWeight: 600 }}>{title}</div>
      <div style={{ fontSize: 12, color: '#666' }}>{date}</div>
      <div style={{ marginTop: 6 }}>{item.overview || 'No description.'}</div>
    </div>
  )
}
