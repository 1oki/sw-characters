
import React, { useState, useEffect, useCallback } from "react";
import placeholder from "./placeholder-img.jpg"; // Fallback image


/**
 * CharacterImage component renders an image of a Star Wars character.
 * It uses the useState and useEffect hooks to preload the image before updating the state to avoid flickering.
 * If the image fails to load, it logs an error message, sets the image source to a placeholder, and updates the loading state to false.
 * It also optimizes the event handler to avoid re-creating the function on each render.
 * It renders a placeholder while the image is loading, and renders the actual image when it's loaded.
 */

const CharacterImage = ({ url }) => {
    const [imageSrc, setImageSrc] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);

    const width = 200
    const height = 350
    // Preload image before updating state to avoid flickering
    useEffect(() => {
        if (!url) {
            setImageSrc(placeholder);
            setIsLoading(false);
            return;
        }

        const img = new Image();
        img.src = url;

        // Once the image is loaded, set the image source to the actual image URL
        // and set isLoading to false to render the image.
        img.onload = () => {
            setImageSrc(url);
            setIsLoading(false);
        };

        // Handles image loading errors by logging a message, setting the image source to a placeholder, 
        // and updating the loading state to false.
        img.onerror = () => {
            console.log('Oops, we have an error loading the image, falling back to placeholder...');
            setImageSrc(placeholder);
            setIsLoading(false);
        };
    }, [url]);

    // Optimize event handler to avoid re-creating function on each render
    const handleError = useCallback(() => {
        console.log('handleError')
        setImageSrc(placeholder);
    }, []);

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {isLoading ? (
                <img 
                    className="rounded-lg "
                    src={placeholder} 
                    alt="character" 

                    onError={handleError} 
                    style={{ objectFit: "cover", borderRadius: "8px" }} 
                />
            ) : (
                <img 
                    className="rounded-lg "
                    src={imageSrc} 
                    alt="character" 
                    width={width} 
                    height={height} 
                    onError={handleError} 
                    style={{ objectFit: "cover", borderRadius: "8px" }} 
                />
            )}
        </div>
    );
};

export default CharacterImage;
