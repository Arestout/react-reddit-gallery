import React from 'react';

const Slider = props => {
    const { value, onChange } = props;

    return (
        <div className="gallery__slidecontainer">
            <input
                type="range"
                min="0"
                max="2000"
                step="1"
                value={value}
                className="slider"
                id="slider"
                name="currentFilter"
                onChange={onChange}
            />
        </div>
    );
};

export default Slider;
