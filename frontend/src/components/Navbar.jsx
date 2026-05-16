import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav style={{
            padding: '10px 20px',
            backgroundColor: '#282c34',
            marginBottom: '20px'
        }}>
            <Link to="/" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>
                На главную
            </Link>
            <Link to="/tasks" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>
                Список задач
            </Link>
        </nav>
    )
}

export default Navbar