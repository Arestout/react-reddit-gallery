import React from 'react';
import Slider from './Slider';
import GalleryItems from './GalleryItems';
import UpdateButton from './UpdateButton';

const API_LINK =
    'https://www.reddit.com/r/reactjs.json?limit=7&sort=num_comments';

export class App extends React.Component {
    constructor() {
        super();

        this.state = {
            galleryItems: [],
            isLoading: true,
            update: false,
            currentFilter: 0
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetch(API_LINK)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    galleryItems: result.data.children,
                    isLoading: false
                });

                console.log(
                    this.state.galleryItems.map(item => item.data.title)
                );
            })
            .catch(error => console.log(error));
    }

    onChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    startRefresh = () => {
        this.setState({
            update: true
        });
        this.timerId = setInterval(() => this.getData(), 3000);
    };

    stopRefresh = () => {
        this.setState({ update: false });
        clearInterval(this.timerId);
    };

    render() {
        const { currentFilter, galleryItems, update, isLoading } = this.state;

        return (
            <section className="gallery">
                {isLoading ? (
                    <h1 className="gallery__heading">Loading...</h1>
                ) : (
                    <>
                        <h1 className="gallery__heading">Top commented.</h1>
                        <div className="gallery__subheading-box">
                            <h2 className="gallery__subheading">
                                Current filter: {currentFilter}
                            </h2>

                            <UpdateButton
                                update={update}
                                startRefresh={this.startRefresh}
                                stopRefresh={this.stopRefresh}
                            />
                        </div>

                        <Slider
                            value={currentFilter}
                            onChange={this.onChange}
                        />

                        <GalleryItems
                            galleryItems={galleryItems}
                            currentFilter={currentFilter}
                        />
                    </>
                )}
            </section>
        );
    }
}
