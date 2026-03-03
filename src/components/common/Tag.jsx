import './Tag.css';

const Tag = ({ text, className = '' }) => {
    return (
        <span className={`tag ${className}`}>
            {text}
        </span>
    );
};

export default Tag;
