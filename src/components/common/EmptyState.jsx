import { memo } from 'react';
import PropTypes from 'prop-types';
import './EmptyState.css';

const EmptyState = memo(({ title, message, icon, action }) => {
    return (
        <div className="empty-state" role="status">
            {icon && <div className="empty-state__icon" aria-hidden="true">{icon}</div>}
            <h3 className="empty-state__title">{title}</h3>
            {message && <p className="empty-state__message">{message}</p>}
            {action && <div className="empty-state__action">{action}</div>}
        </div>
    );
});

EmptyState.displayName = 'EmptyState';

EmptyState.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string,
    icon: PropTypes.node,
    action: PropTypes.node
};

export default EmptyState;
