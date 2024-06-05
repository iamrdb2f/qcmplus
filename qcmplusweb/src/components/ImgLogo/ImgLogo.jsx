import React from "react";
import PropTypes from "prop-types";

const ImgLogo = ({ title, link }) => {
    return (
        <a href={link}>
            <img
                src="/qcmplus_logo.png"
                height={"40"}
                alt={title}
            />
        </a>
    );
}

ImgLogo.defaultProps = {
    title: 'QCMPlus',
    link: '/',
}

ImgLogo.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string,
}

export default ImgLogo;
