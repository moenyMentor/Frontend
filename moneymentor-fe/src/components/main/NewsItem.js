import React from 'react';
import styled from 'styled-components';

const NewsItemBlock = styled.div`
    display: flex;
    width: 100%;
    height: 100%; /* Ensure it fills the height of its parent */
    padding: 1rem; /* Padding around the content */

    .thumbnail {
        flex-shrink: 0; /* Prevent the thumbnail from shrinking */
        margin-right: 1rem;

        img {
            height: 100%;
            width: auto; /* Maintain aspect ratio */
            object-fit: cover;
            // border-radius: 10px;
        }
    }

    .contents {
        display: flex;
        flex-direction: column;
        width: 100%; /* Use the full width of the container */
        height: 100%; /* Use the full height of the container */

        h2 {
            margin: 0;

            a {
                color: gray;
                text-decoration: none; /* Remove underline from links */
            }
        }

        p {
            margin-top: 0.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal; /* Allow text to wrap */
            word-wrap: break-word; /* Break long words to avoid overflow */
            height: auto; /* Allow height to adjust based on content */
            max-height: 100%; /* Ensure it doesn't overflow the container */
            line-height: 1.5; /* Adjust line height for better readability */
        }
    }
`;

const NewsItem = ({ article }) => {
    const { title, description, url, urlToImage } = article;
    return (
        <NewsItemBlock>
            {urlToImage && (
                <div className="thumbnail">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        <img src={urlToImage} alt="thumbnail" />
                    </a>
                </div>
            )}
            <div className="contents">
                <h2>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        {title}
                    </a>
                </h2>
                <p>{description}</p>
            </div>
        </NewsItemBlock>
    );
};

export default NewsItem;
