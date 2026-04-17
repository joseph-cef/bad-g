import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
}

interface ToastContextType {
  addToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            className="flex items-center gap-3 bg-white dark:bg-dark-card text-gray-900 dark:text-gray-100 shadow-xl border border-gray-100 dark:border-dark-border px-4 py-3 rounded-xl animate-[slideIn_0.3s_ease-out_forwards]"
          >
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <p className="text-sm font-medium pr-4">{toast.message}</p>
            <button 
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

/* Add this animation in your index.css or tailwind.config
  keyframes: {
    slideIn: {
      '0%': { transform: 'translateX(100%)', opacity: '0' },
      '100%': { transform: 'translateX(0)', opacity: '1' },
    }
  }
*/
