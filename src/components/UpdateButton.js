import React from 'react';

const UpdateButton = props => {
    const { update, startRefresh, stopRefresh } = props;

    return (
        <>
            {!update ? (
                <button
                    className="gallery__button"
                    type="button"
                    onClick={startRefresh}
                >
                    Start auto-refresh
                </button>
            ) : (
                <button
                    className="gallery__button"
                    type="button"
                    onClick={stopRefresh}
                >
                    Stop auto-refresh
                </button>
            )}
        </>
    );
};

export default UpdateButton;
