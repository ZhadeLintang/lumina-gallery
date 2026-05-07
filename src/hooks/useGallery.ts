import { useState, useEffect } from 'react';

export interface Comment {
  id: string;
  userId: string;
  username: string;
  text: string;
  createdAt: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  comments?: Comment[];
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
          createdAt: Date.now(),
          comments: []
        },
        // ... (other items will be updated with comments: [] when parsed or saved)
      ];
      setItems(initialItems);
      localStorage.setItem('lumina_gallery_items', JSON.stringify(initialItems));
    }
  }, []);

  const addItem = (item: Omit<GalleryItem, 'id' | 'createdAt'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
      comments: []
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

  const addComment = (itemId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => {
    const newComment: Comment = {
      ...comment,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now()
    };
    
    const newItems = items.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          comments: [...(item.comments || []), newComment]
        };
      }
      return item;
    });
    
    setItems(newItems);
    localStorage.setItem('lumina_gallery_items', JSON.stringify(newItems));
    return newComment;
  };

  return { items, addItem, deleteItem, updateItem, addComment };
};
