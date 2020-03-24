import React from 'react';
import GalleryItems from './GalleryItems';

const API_LINK = 'https://www.reddit.com/r/reactjs.json?limit=100';

export class App extends React.Component {
    constructor() {
        super();

        this.state = {
            galleryItems: [],
            isLoading: false,
            enableAutoRefresh: false,
            minComments: 0
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        this.setState({
            isLoading: true
        });
        fetch(API_LINK)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    galleryItems: result.data.children,
                    isLoading: false
                });
            })
            .catch(error => console.log(error));
    }

    updateMinComments = event => {
        this.setState({
            minComments: Number(event.target.value)
        });
    };

    updateAutoRefresh = () => {
        this.setState(
            state => ({
                enableAutoRefresh: !state.enableAutoRefresh
            }),
            () => {
                if (this.state.enableAutoRefresh) {
                    this.autoRefresh = setInterval(() => this.getData(), 3000);
                } else {
                    clearInterval(this.autoRefresh);
                }
            }
        );
    };

    render() {
        const {
            minComments,
            galleryItems,
            enableAutoRefresh,
            isLoading
        } = this.state;

        return (
            <section className="gallery">
                {isLoading ? (
                    <h1 className="gallery__heading">Loading...</h1>
                ) : (
                    <>
                        <h1 className="gallery__heading">Top commented.</h1>
                        <div className="gallery__subheading-box">
                            <h2 className="gallery__subheading">
                                Current filter: {minComments}
                            </h2>

                            <button
                                className="gallery__button"
                                type="button"
                                onClick={this.updateAutoRefresh}
                            >
                                {!enableAutoRefresh ? 'Start' : 'Stop'}{' '}
                                auto-refresh
                            </button>
                        </div>

                        <div className="gallery__slidecontainer">
                            <input
                                type="range"
                                min="0"
                                max="2000"
                                step="1"
                                value={minComments}
                                className="slider"
                                id="slider"
                                name="minComments"
                                onChange={this.updateMinComments}
                            />
                        </div>

                        <GalleryItems
                            galleryItems={galleryItems}
                            minComments={minComments}
                        />
                    </>
                )}
            </section>
        );
    }
}
