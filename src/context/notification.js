import { useContext, createContext, useState, useEffect } from "react";

const NotificationContext = createContext();
NotificationContext.displayName = "NotificationContext";

function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification(null);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [notification]);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

const useNotificationCtx = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationCtx must be used within a NotificationProvider"
    );
  }
  return context;
};

export { NotificationProvider, useNotificationCtx };
