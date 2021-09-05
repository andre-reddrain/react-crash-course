// Link is used to not let the browser reload the page when changing Routes
import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div>
            <h4>Version 1.0.0</h4>
            <Link to="/">Go back</Link>
        </div>
    )
}

export default About
