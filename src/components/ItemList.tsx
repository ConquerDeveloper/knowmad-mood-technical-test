import type { TextItem } from '../types/text-item';
import ListItem from './ListItem';

type ItemListProps = {
    items: TextItem[];
    onToggleItem: (itemId: string) => void;
    onDeleteItem: (itemId: string) => void;
};

function ItemList({
                      items,
                      onToggleItem,
                      onDeleteItem,
                  }: ItemListProps) {
    return (
        <div className="listBox">
            {items.map((item) => (
                <ListItem
                    key={item.id}
                    item={item}
                    onToggle={onToggleItem}
                    onDelete={onDeleteItem}
                />
            ))}
        </div>
    );
}

export default ItemList;