import YouTubeEmbed from '../common/YouTubeEmbed';
import './TrailerSection.css';

const TrailerSection = ({ trailerUrl, title }) => {
    return (
        <div className="trailer-section">
            <h2 className="trailer-section__title">Watch Trailer</h2>
            <div className="trailer-section__video-wrapper">
                <YouTubeEmbed embedUrl={trailerUrl} title={`${title} Trailer`} />
            </div>
        </div>
    );
};

export default TrailerSection;
