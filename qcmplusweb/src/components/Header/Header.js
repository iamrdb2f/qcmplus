import PropTypes from 'prop-types'

const Header =({title}) =>{
    return (
        <header className="container-lg d-flex flex-column justify-content-center">
            <h1>{title}</h1>
            <p>C'est une nouvelle plate forme de gestion & d'évaluation des compétences</p>
            <button className="btn btn-primary btn-lg ">
                <a className="text-light" href="https://www.ecole-pmn.fr/">La PMN</a>
            </button>
        </header>
    )
}

Header.defaultProps = {
    title:'QCM Plus',
}


Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header