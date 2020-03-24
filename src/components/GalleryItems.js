import React, { memo } from 'react';
import DefaultImage from '../img/travelly.jpg';

const GalleryItems = memo(props => {
    const { galleryItems, minComments } = props;

    const getItemsByComments = (items, minComments) =>
        items
            .filter(item => item.data.num_comments >= minComments)
            .sort((a, b) => b.data.num_comments - a.data.num_comments);

    const itemsByComments = getItemsByComments(galleryItems, minComments);

    return (
        <>
            {itemsByComments.length > 0 ? (
                <div className="gallery__grid">
                    {itemsByComments.map(item => (
                        <div key={item.data.id} className="gallery__item">
                            {' '}
                            <img
                                className="gallery__image"
                                src={
                                    item.data.thumbnail === 'self'
                                        ? DefaultImage
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
                                target="_blank"
                                rel="noopener noreferrer"
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
});

export default GalleryItems;
