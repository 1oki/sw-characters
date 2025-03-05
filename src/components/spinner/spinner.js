import React from "react";
import './spinner.css';

/**
 * This component renders a spinner.
 * It uses a tailwind utility-first approach to style the component.
 */
const Spinner = () => {
    return(
        <div className="container flex justify-center mx-auto">
            <div className="loadingio-spinner-ripple-hw4qxwwg1j mt-16">
                <div className="ldio-qcgiqcgfbr">
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default Spinner;