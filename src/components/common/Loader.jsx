import './Loader.css';

const Loader = ({ size = 'medium', fullScreen = false }) => {
    const loaderClass = `loader loader--${size}`;
    const containerClass = fullScreen ? 'loader-container loader-container--full' : 'loader-container';

    return (
        <div className={containerClass}>
            <div className={loaderClass}></div>
        </div>
    );
};

export default Loader;
