'use client';

import toast, { Toaster, ToastOptions } from 'react-hot-toast';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

// Custom toast function with our design system
export const showToast = {
  success: (message: string, options?: ToastOptions) => {
    return toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-in slide-in-from-right' : 'animate-out slide-out-to-right'
          } bg-white rounded-2xl border border-gray-100 shadow-2xl shadow-gray-900/10 p-4 pr-12 max-w-md pointer-events-auto`}
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-success-100 rounded-xl flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-success-600" />
            </div>
            <div className="flex-1 pt-0.5">
              <h4 className="text-sm font-bold text-gray-900">Success!</h4>
              <p className="text-sm text-gray-600 mt-0.5">{message}</p>
            </div>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ),
      options
    );
  },

  error: (message: string, options?: ToastOptions) => {
    return toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-in slide-in-from-right' : 'animate-out slide-out-to-right'
          } bg-white rounded-2xl border border-gray-100 shadow-2xl shadow-gray-900/10 p-4 pr-12 max-w-md pointer-events-auto`}
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-error-100 rounded-xl flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-error-600" />
            </div>
            <div className="flex-1 pt-0.5">
              <h4 className="text-sm font-bold text-gray-900">Error</h4>
              <p className="text-sm text-gray-600 mt-0.5">{message}</p>
            </div>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ),
      options
    );
  },

  warning: (message: string, options?: ToastOptions) => {
    return toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-in slide-in-from-right' : 'animate-out slide-out-to-right'
          } bg-white rounded-2xl border border-gray-100 shadow-2xl shadow-gray-900/10 p-4 pr-12 max-w-md pointer-events-auto`}
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-warning-100 rounded-xl flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-warning-600" />
            </div>
            <div className="flex-1 pt-0.5">
              <h4 className="text-sm font-bold text-gray-900">Warning</h4>
              <p className="text-sm text-gray-600 mt-0.5">{message}</p>
            </div>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ),
      options
    );
  },

  info: (message: string, options?: ToastOptions) => {
    return toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-in slide-in-from-right' : 'animate-out slide-out-to-right'
          } bg-white rounded-2xl border border-gray-100 shadow-2xl shadow-gray-900/10 p-4 pr-12 max-w-md pointer-events-auto`}
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-info-100 rounded-xl flex-shrink-0">
              <Info className="w-5 h-5 text-info-600" />
            </div>
            <div className="flex-1 pt-0.5">
              <h4 className="text-sm font-bold text-gray-900">Info</h4>
              <p className="text-sm text-gray-600 mt-0.5">{message}</p>
            </div>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ),
      options
    );
  },
  
  // Promise-based toast for async operations
  promise: toast.promise
};

// Toaster component to be added to root layout
export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'transparent',
          boxShadow: 'none',
          padding: 0,
        },
      }}
    />
  );
}

export default showToast;
