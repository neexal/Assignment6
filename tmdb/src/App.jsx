// SUBMITTED BY: GROUP (CIT-07)
// Members: Abhishek Dangol (stud-abhishek@ruc.dk)
//          Dipu Khatri (stud-dipu@ruc.dk)
//          Nischal Ghimire (stud-nischal@ruc.dk)
//          Pema Gyalbu Lama (stud-gyalbu@ruc.dk)

import { useEffect, useState } from 'react'
import './App.css'

const KEY = import.meta.env.VITE_TMDB_API_KEY
const QUERY = 'spielberg'

/**
 * Main App component.
 * Implements Task 3 (Fetch persons) and Task 5 (Pagination).
 */
function App() {
  const [persons, setPersons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [i, setI] = useState(0) // index of shown person

  // Task 3: Fetch persons when component mounts
  useEffect(() => {
    const url = 'https://api.themoviedb.org/3/search/person?query=' +
      encodeURIComponent(QUERY) + '&api_key=' + KEY
    setLoading(true)
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // simple console log for testing
        console.log(data)
        setPersons(data.results || [])
        setI(0)
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false))
  }, [])

  // Task 5: Navigation buttons
  function prev() {
    setI((n) => Math.max(0, n - 1))
  }
  function next() {
    setI((n) => Math.min(persons.length - 1, n + 1))
  }

  return (
    <div className="app-root">
      <h1>TMDB people — {QUERY}</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && persons.length === 0 && <p>No people found</p>}

      {!loading && persons.length > 0 && (
        <div>
          {/* Task 5: Buttons controlling which person to render */}
          <div className="simple-nav">
            <button onClick={prev} disabled={i === 0}>Prev</button>
            <span>{i + 1} / {persons.length}</span>
            <button onClick={next} disabled={i === persons.length - 1}>Next</button>
          </div>

          {/* Task 4: Render Person component */}
          <Person person={persons[i]} />
        </div>
      )}
    </div>
  )
}

/**
 * Person component.
 * Implements Task 4 (Render person fields) and Task 7 (Render images).
 * @param {Object} props.person - The person object to display
 */
function Person({ person }) {
  if (!person) return null
  return (
    <div className="person">
      <h2>{person.name}</h2>
      <p>{person.known_for_department}</p>

      {person.profile_path ? (
        <img src={'https://image.tmdb.org/t/p/w185' + person.profile_path} alt={person.name} />
      ) : (
        <div style={{ width: 120, height: 160, background: '#eee' }}>No photo</div>
      )}

      <div>
        <h3>Known for</h3>
        {/* Task 6: Render "known for" list */}
        {person.known_for && person.known_for.length > 0 ? (
          person.known_for.map((k) => (
            <KnownFor key={k.id} item={k} />
          ))
        ) : (
          <p>—</p>
        )}
      </div>

      <div>
        <h3>Images</h3>
        {/* Task 7: Render additional images */}
        <ImagesFor id={person.id} />
      </div>
    </div>
  )
}

/**
 * KnownFor component.
 * Implements Task 6 (Display known_for entry).
 * @param {Object} props.item - The movie/show object
 */
function KnownFor({ item }) {
  if (!item) return null
  const title = item.title || item.name || 'No title'
  const date = item.release_date || item.first_air_date || ''
  return (
    <div style={{ borderTop: '1px solid #ddd', padding: '6px 0' }}>
      <div style={{ fontWeight: 700 }}>{title}</div>
      <div style={{ fontSize: 12, color: '#666' }}>{date}</div>
      <div>{item.overview}</div>
    </div>
  )
}

/**
 * ImagesFor component.
 * Implements Task 7 (Fetch and render pictures of a person).
 * @param {number} props.id - The person ID
 */
function ImagesFor({ id }) {
  const [imgs, setImgs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetch('https://api.themoviedb.org/3/person/' + id + '/images?api_key=' + KEY)
      .then((r) => r.json())
      .then((d) => setImgs(d.profiles || []))
      .catch(() => setImgs([]))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div>Loading images...</div>
  if (!imgs || imgs.length === 0) return <div>No images</div>

  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {imgs.map((p, idx) => (
        <img key={idx} src={'https://image.tmdb.org/t/p/w92' + p.file_path} alt={'' + idx} style={{ width: 92 }} />
      ))}
    </div>
  )
}

export default App
