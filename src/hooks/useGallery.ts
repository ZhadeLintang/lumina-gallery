import { useState, useEffect } from 'react';

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  authorId: string;
  authorName: string;
  createdAt: number;
}

export const useGallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('lumina_gallery_items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    } else {
      // Default placeholder items
      const initialItems: GalleryItem[] = [
        {
          id: '1',
          title: 'Cyberpunk Metropolis',
          description: 'A futuristic city bathed in neon lights and rainy streets.',
          imageUrl: 'https://images.unsplash.com/photo-1605142859862-978be7eba909?auto=format&fit=crop&q=80&w=800',
          category: 'Futuristic',
          authorId: 'system',
          authorName: 'Lumina Artist',
          createdAt: Date.now()
        },
        {
          id: '2',
          title: 'Abstract Harmony',
          description: 'A blend of flowing colors creating a sense of peace.',
          imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800',
          category: 'Abstract',
          authorId: 'system',
          authorName: 'Lumina Artist',
          createdAt: Date.now()
        },
        {
          id: '3',
          title: 'Deep Space Nebula',
          description: 'The vastness of space captured in vibrant cosmic dust.',
          imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800',
          category: 'Space',
          authorId: 'system',
          authorName: 'Lumina Artist',
          createdAt: Date.now()
        },
        {
            id: '4',
            title: 'Ethereal Forest',
            description: 'A mystical woodland shrouded in morning mist.',
            imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800',
            category: 'Nature',
            authorId: 'system',
            authorName: 'Lumina Artist',
            createdAt: Date.now()
        }
      ];
      setItems(initialItems);
      localStorage.setItem('lumina_gallery_items', JSON.stringify(initialItems));
    }
  }, []);

  const addItem = (item: Omit<GalleryItem, 'id' | 'createdAt'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now()
    };
    const newItems = [newItem, ...items];
    setItems(newItems);
    localStorage.setItem('lumina_gallery_items', JSON.stringify(newItems));
  };

  const deleteItem = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    localStorage.setItem('lumina_gallery_items', JSON.stringify(newItems));
  };

  const updateItem = (id: string, updates: Partial<GalleryItem>) => {
    const newItems = items.map(item => item.id === id ? { ...item, ...updates } : item);
    setItems(newItems);
    localStorage.setItem('lumina_gallery_items', JSON.stringify(newItems));
  };

  return { items, addItem, deleteItem, updateItem };
};
