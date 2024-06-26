import React from "react";
import PropTypes from "prop-types";

const ImgLogo = ({ title = 'QCMPlus', link = '/' }) => {
    return (
        <a href={link}>
            <img
                src="/qcmplus_logo.png"
                height="40"
                alt={title}
            />
        </a>
    );
}

ImgLogo.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
}

export default ImgLogo;
