import React from "react";
import PropTypes from "prop-types";

const ImgLogo = ({title}) => {
    return (
        <img
            src="/qcmplus_logo.png"
            height={"40"}
            alt={title}
        />
    )
}
ImgLogo.defaultProps = {
    title: 'QCMPlus',
}

ImgLogo.propTypes = {
    title: PropTypes.string.isRequired,
}

export default ImgLogo;