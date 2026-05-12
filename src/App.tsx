import {useState} from 'react';
import './App.css'
import type {TextItem} from './types/item.ts';

const initialItems: TextItem[] = [
    {id: crypto.randomUUID(), text: 'Item 1', selected: false},
    {id: crypto.randomUUID(), text: 'Item 2', selected: true},
    {id: crypto.randomUUID(), text: 'Item 3', selected: false},
    {id: crypto.randomUUID(), text: 'Item 4', selected: false},
];

function App() {
    const [items, setItems] = useState<TextItem[]>(initialItems);
    const [history, setHistory] = useState<TextItem[][]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const handleToggleItem = (itemId: string) => {
        setItems((currentItems) =>
            currentItems.map((item) => item.id === itemId ? {...item, selected: !item.selected} : item)
        );
    };

    const handleAddItem = () => {
        const trimmedValue = inputValue.trim();

        if (!trimmedValue) return;

        const newItem: TextItem = {
            id: crypto.randomUUID(),
            text: trimmedValue,
            selected: false,
        };

        saveCurrentState();

        setItems((currentItems) => [...currentItems, newItem]);

        setInputValue('');
        setIsModalOpen(false);
    }

    const handleDeleteSelectedItems = () => {
        const hasSelectedItems = items.some((item) => item.selected);

        if (!hasSelectedItems) return;

        saveCurrentState();

        setItems((currentItems) => currentItems.filter((item) => !item.selected));
    };

    const handleUndo = () => {
        const previousItems = history.at(-1);

        if (!previousItems) return;

        setItems(previousItems);

        setHistory((currentHistory) =>
            currentHistory.slice(0, -1)
        );
    };

    const hasSelectedItems = items.some((item) => item.selected);

    const canUndo = history.length > 0;

    const canAddItem = inputValue.trim().length > 0;

    const saveCurrentState = () => {
        setHistory((currentHistory) => [...currentHistory, items]);
    };

    const handleDeleteItem = (itemId: string) => {
        saveCurrentState();

        setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
    };

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleAddItem();
        }

        if (event.key === 'Escape') {
            setInputValue('');
            setIsModalOpen(false);
        }
    };

    return (
        <main className="page">
            <section className="card">
                <h1>This is a technical proof</h1>

                <p className="description">Lorem ipsum dolor sit amet consectetur adipiscing, elit mus primis nec
                    inceptos. Lacinia habitasse arcu molestie maecenas cursus quam nunc, hendrerit posuere augue fames
                    dictumst placerat porttitor, dis mi pharetra vestibulum venenatis phasellus.</p>

                <div className="listBox">
                    {items.map((item: TextItem) => (
                        <div
                            key={item.id}
                            className={`listItem ${item.selected ? 'selected' : ''}`}
                            onClick={() => handleToggleItem(item.id)}
                            onDoubleClick={() => handleDeleteItem(item.id)}
                        >
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>

                <div className="actions">
                    <div className="leftActions">
                        <button
                            className="iconButton"
                            onClick={handleUndo}
                            disabled={!canUndo}
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
                                <path d="M3 12a9 9 0 1 0 3-6.7"/>
                                <path d="M3 4v5h5"/>
                            </svg>
                        </button>
                        <button
                            className="outlineButton"
                            onClick={handleDeleteSelectedItems}
                            disabled={!hasSelectedItems}
                        >DELETE
                        </button>
                    </div>

                    <div className="primaryButton" onClick={() => setIsModalOpen(true)}>ADD</div>
                </div>
            </section>
            <div className={`modalOverlay ${isModalOpen ? 'open' : ''}`}>
                <div className="modal">
                    <label htmlFor="item-input" className="modalLabel">
                        Add item to list
                    </label>

                    <input type="text"
                           id="item-input"
                           value={inputValue}
                           onChange={(e) => setInputValue(e.target.value)}
                           className="modalInput"
                           onKeyDown={handleInputKeyDown}
                           placeholder="Type the text here..."
                    />

                    <div className="modalActions">
                        <button
                            className="primaryButton"
                            onClick={handleAddItem}
                            disabled={!canAddItem}
                        >
                            ADD
                        </button>
                        <button
                            className="outlineButton"
                            onClick={() => {
                                setInputValue('');
                                setIsModalOpen(false);
                            }}
                        >
                            CANCEL
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default App
