import './YouTubeEmbed.css';

const YouTubeEmbed = ({ embedUrl, title }) => {
    if (!embedUrl) return null;

    return (
        <div className="youtube-embed">
            <iframe
                className="youtube-embed__iframe"
                src={embedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default YouTubeEmbed;
