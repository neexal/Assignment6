import KnownFor from './KnownFor'
import ImagesFor from './ImagesFor'

export default function Person({ person }) {
  if (!person) return null

  const profilePath = person.profile_path

  return (
    <div className="person">
      <h2>{person.name}</h2>
      <p>{person.known_for_department}</p>

      {profilePath ? (
        <img
          src={`https://image.tmdb.org/t/p/w185${profilePath}`}
          alt={person.name}
          style={{ maxWidth: 180 }}
        />
      ) : (
        <div style={{ width: 180, height: 250, background: '#eee' }}>No photo</div>
      )}

      <div>
        <h3>Known for</h3>
        {person.known_for && person.known_for.length > 0 ? (
          person.known_for.map((kf) => <KnownFor key={kf.id} item={kf} />)
        ) : (
          <p>None</p>
        )}
      </div>

      <div>
        <h3>Images</h3>
        <ImagesFor id={person.id} />
      </div>
    </div>
  )
}
