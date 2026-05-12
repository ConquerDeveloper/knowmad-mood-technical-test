type AddItemModalProps = {
    isOpen: boolean;
    inputValue: string;
    canAddItem: boolean;
    onInputChange: (value: string) => void;
    onAddItem: () => void;
    onClose: () => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

function AddItemModal({
                          isOpen,
                          inputValue,
                          canAddItem,
                          onInputChange,
                          onAddItem,
                          onClose,
                          onKeyDown,
                      }: AddItemModalProps) {
    return (
        <div className={`modalOverlay ${isOpen ? 'open' : ''}`}>
            <div className="modal">
                <label htmlFor="item-input" className="modalLabel">
                    Add item to list
                </label>

                <input
                    type="text"
                    id="item-input"
                    value={inputValue}
                    onChange={(e) => onInputChange(e.target.value)}
                    className="modalInput"
                    onKeyDown={onKeyDown}
                    placeholder="Type the text here..."
                />

                <div className="modalActions">
                    <button
                        type="button"
                        className="primaryButton"
                        onClick={onAddItem}
                        disabled={!canAddItem}
                    >
                        ADD
                    </button>

                    <button
                        type="button"
                        className="outlineButton"
                        onClick={onClose}
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddItemModal;