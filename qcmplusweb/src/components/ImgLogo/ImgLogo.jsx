import React from "react";

const ImgLogo = ({title = 'QCMPlus', link}) => {
    const logo = <img src="/qcmplus_logo.png" height="40" alt={title}/>;

    if (link) {
        return <a href={link}>{logo}</a>;
    }

    return logo;
};

export default ImgLogo;

