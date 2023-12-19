

export function UserPreview({ user }) {

    return <article >
        <h4>Username: {user.username}</h4>
        <h1>🐛</h1>
        <h4>Full name: {user.fullname}</h4>
        <p>Score: <span>{user.score}</span></p>
    </article>
}