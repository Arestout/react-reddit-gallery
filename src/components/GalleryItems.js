import React from 'react';
import Travelly from '../img/travelly.jpg';

const GalleryItems = props => {
    const { galleryItems, currentFilter } = props;

    const sortItems = () => {
        return galleryItems.sort((a, b) => {
            if (a.data.num_comments < b.data.num_comments) {
                return 1;
            }
            if (a.data.num_comments > b.data.num_comments) {
                return -1;
            }
            return 0;
        });
    };

    const filterItems = () => {
        const sortedData = sortItems();

        return sortedData.filter(
            item => item.data.num_comments >= currentFilter
        );
    };

    const filteredData = filterItems();

    return (
        <>
            {filteredData.length > 0 ? (
                <div className="gallery__grid">
                    {filteredData.map((item, index) => (
                        <div key={index} className="gallery__item">
                            {' '}
                            <img
                                className="gallery__image"
                                src={
                                    item.data.thumbnail === 'self'
                                        ? Travelly
                                        : item.data.thumbnail
                                }
                                alt=""
                            />
                            <h3 className="gallery__image-title">
                                {item.data.title}
                            </h3>
                            <p className="gallery__comments">
                                Number of comments: {item.data.num_comments}
                            </p>
                            <a
                                href={`https://www.reddit.com${item.data.permalink}`}
                                className="gallery__link"
                            >
                                Link
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="gallery__no-results">
                    No results found matching your criteria
                </p>
            )}
        </>
    );
};

export default GalleryItems;
