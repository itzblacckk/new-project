import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

interface ItemListProps<T> {
  items: T[];
  onEdit: (item: T) => void;
  onDelete: (id: string) => void;
  getTitle: (item: T) => string;
}

export function ItemList<T extends { id: string }>({ 
  items, 
  onEdit, 
  onDelete,
  getTitle 
}: ItemListProps<T>) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div 
          key={item.id} 
          className="flex justify-between items-center p-4 bg-white rounded-lg shadow"
        >
          <span className="font-medium">{getTitle(item)}</span>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(item)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}