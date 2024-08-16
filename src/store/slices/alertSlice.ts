import { StateCreator } from 'zustand';

type AlertProps = {
  id: number;
  title?: string;
  message?: string;
  variant?: 'success' | 'error' | 'info' | 'warning';
  shouldClose?: boolean;
  timeToClose?: number;
  IconComponent?: React.FC<{ className?: string }>;
};

type AlertState = {
  alerts: AlertProps[];
  showAlert: (alert: Omit<AlertProps, 'id'>) => void;
  removeAlert: (id: number) => void;
};

const createAlertStore: StateCreator<AlertState> = (set) => ({
  alerts: [],
  showAlert: (alert) =>
    set((state) => ({
      alerts: [...state.alerts, { ...alert, id: Date.now() }],
    })),
  removeAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    })),
});

export default createAlertStore;
