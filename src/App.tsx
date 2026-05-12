import {useState} from 'react';
import './App.css'
import type { TextItem } from './types/text-item';
import ItemList from './components/ItemList';
import AddItemModal from './components/AddItemModal';
import InputBar from './components/InputBar';

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

    const saveCurrentState = () => {
        setHistory((currentHistory) => [...currentHistory, items]);
    };

    const closeModal = () => {
        setInputValue('');
        setIsModalOpen(false);
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

        closeModal();
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

    const handleDeleteItem = (itemId: string) => {
        saveCurrentState();

        setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
    };

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleAddItem();
        }

        if (event.key === 'Escape') {
            closeModal();
        }
    };

    return (
        <main className="page">
            <section className="card">
                <h1>This is a technical proof</h1>

                <p className="description">Lorem ipsum dolor sit amet consectetur adipiscing, elit mus primis nec
                    inceptos. Lacinia habitasse arcu molestie maecenas cursus quam nunc, hendrerit posuere augue fames
                    dictumst placerat porttitor, dis mi pharetra vestibulum venenatis phasellus.</p>

                <ItemList
                    items={items}
                    onToggleItem={handleToggleItem}
                    onDeleteItem={handleDeleteItem}
                />

                <InputBar
                    canUndo={canUndo}
                    hasSelectedItems={hasSelectedItems}
                    onUndo={handleUndo}
                    onDeleteSelected={handleDeleteSelectedItems}
                    onOpenModal={() => setIsModalOpen(true)}
                />
            </section>
            <AddItemModal
                isOpen={isModalOpen}
                inputValue={inputValue}
                canAddItem={canAddItem}
                onInputChange={setInputValue}
                onAddItem={handleAddItem}
                onClose={closeModal}
                onKeyDown={handleInputKeyDown}
            />
        </main>
    )
}

export default App
