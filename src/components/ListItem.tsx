import type { TextItem } from '../types/text-item';

type ListItemProps = {
    item: TextItem;
    onToggle: (itemId: string) => void;
    onDelete: (itemId: string) => void;
};

function ListItem({
                      item,
                      onToggle,
                      onDelete,
                  }: ListItemProps) {
    return (
        <div
            className={`listItem ${item.selected ? 'selected' : ''}`}
            onClick={() => onToggle(item.id)}
            onDoubleClick={() => onDelete(item.id)}
        >
            <span>{item.text}</span>
        </div>
    );
}

export default ListItem;