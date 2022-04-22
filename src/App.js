import Home from "./Pages/Home";
import { useNotificationCtx } from "context/notification";

function App() {
  const { notification } = useNotificationCtx();
  return (
    <>
      {notification && (
        <div
          className={`${
            notification.type === "error" ? "error-notify" : "notify"
          }`}
        >
          <p>{notification.message}</p>
        </div>
      )}
      <Home />
    </>
  );
}

export default App;
