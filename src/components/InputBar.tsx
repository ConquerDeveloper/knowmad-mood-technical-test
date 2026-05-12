type InputBarProps = {
    canUndo: boolean;
    hasSelectedItems: boolean;
    onUndo: () => void;
    onDeleteSelected: () => void;
    onOpenModal: () => void;
};

function InputBar({
                      canUndo,
                      hasSelectedItems,
                      onUndo,
                      onDeleteSelected,
                      onOpenModal,
                  }: InputBarProps) {
    return (
        <div className="actions">
            <div className="leftActions">
                <button
                    type="button"
                    className="iconButton"
                    onClick={onUndo}
                    disabled={!canUndo}
                    aria-label="Undo last action"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 12a9 9 0 1 0 3-6.7" />
                        <path d="M3 4v5h5" />
                    </svg>
                </button>

                <button
                    type="button"
                    className="outlineButton"
                    onClick={onDeleteSelected}
                    disabled={!hasSelectedItems}
                >
                    DELETE
                </button>
            </div>

            <button type="button" className="primaryButton" onClick={onOpenModal}>
                ADD
            </button>
        </div>
    );
}

export default InputBar;