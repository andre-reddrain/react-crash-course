import PropTypes from 'prop-types'
import Button from './Button'

// (prop) is an object and can be discontructed
// const Header = (prop) => {
const Header = ({ title, onAdd, showAdd }) => {

    // onClick is the line that will be executed on the onClick event of the button
    // const onClick = () => {
    //     console.log('Click')
    // }

    return (
        <header className='header'>
            {/* In-line styles need to be declared with {{xxx}} */}
            {/* <h1 style={{color: 'red', backgroundColor: 'black'}}>{title}</h1> */}

            {/* Styles declared from a constant */}
            {/* <h1 style={headingStyle}>{title}</h1> */}

            <h1>{title}</h1>
            <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd} />
        </header>
    )
}

// Default Props for the component.
Header.defaultProps = {
    title: 'Task Tracker',
}

// Prop types for the props of the component.
// Protects the app from typechecking bugs.
// When an invalid value is provided for a prop, a warning will be shown on the JavaScript console.
Header.propTypes = {
    title: PropTypes.string.isRequired,
}

// Const for the heading style, used on the element <header>
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black'
// }

export default Header
