import { createContext, useContext, useState, useCallback } from 'react';
import './ConfirmDialog.css';

const ConfirmContext = createContext(null);

export const useConfirm = () => {
    const context = useContext(ConfirmContext);
    if (!context) {
        throw new Error('useConfirm must be used within a ConfirmProvider');
    }
    return context;
};

export const ConfirmProvider = ({ children }) => {
    const [dialog, setDialog] = useState(null);

    const confirm = useCallback((options) => {
        return new Promise((resolve) => {
            setDialog({
                title: options.title || 'Confirmar',
                message: options.message,
                confirmText: options.confirmText || 'Confirmar',
                cancelText: options.cancelText || 'Cancelar',
                type: options.type || 'default', // default, danger, success
                onConfirm: () => {
                    setDialog(null);
                    resolve(true);
                },
                onCancel: () => {
                    setDialog(null);
                    resolve(false);
                }
            });
        });
    }, []);

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}
            {dialog && (
                <div className="confirm-overlay" onClick={dialog.onCancel}>
                    <div className="confirm-dialog" onClick={e => e.stopPropagation()}>
                        <div className="confirm-dialog__header">
                            <h3 className="confirm-dialog__title">{dialog.title}</h3>
                        </div>
                        <div className="confirm-dialog__body">
                            <p className="confirm-dialog__message">{dialog.message}</p>
                        </div>
                        <div className="confirm-dialog__actions">
                            <button 
                                className="confirm-dialog__btn confirm-dialog__btn--cancel"
                                onClick={dialog.onCancel}
                            >
                                {dialog.cancelText}
                            </button>
                            <button 
                                className={`confirm-dialog__btn confirm-dialog__btn--confirm confirm-dialog__btn--${dialog.type}`}
                                onClick={dialog.onConfirm}
                            >
                                {dialog.confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </ConfirmContext.Provider>
    );
};

export default ConfirmProvider;
