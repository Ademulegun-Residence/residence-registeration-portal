import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
  useReducer,
} from "react";
import { useNotificationCtx } from "context/notification-context";

export const useLocalStorage = (
  key,
  initialValue = "",
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) => {
  const [storedValue, setStoredValue] = useState(() => {
    const itemInLocalStorage = localStorage.getItem(key);
    if (itemInLocalStorage) {
      try {
        return deserialize(itemInLocalStorage);
      } catch (err) {
        localStorage.removeItem(key);
      }
    }

    return typeof initialValue === "function" ? initialValue() : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, serialize(storedValue));
  }, [key, serialize, storedValue]);

  return [storedValue, setStoredValue];
};

function asyncReducer(state, action) {
  switch (action.type) {
    case "pending": {
      return { status: "pending", data: null, error: null };
    }
    case "resolved": {
      return { status: "resolved", data: action.data, error: null };
    }
    case "rejected": {
      return { status: "rejected", data: null, error: action.error };
    }
    default: {
      throw new Error(`Unknown action type: ${action.type}`);
    }
  }
}

const useUnsafeDispatch = (dispatch) => {
  const mountedRef = useRef(true);

  useLayoutEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return useCallback(
    (...arg) => (mountedRef.current ? dispatch(...arg) : void 0),
    [dispatch]
  );
};

export const useAsync = (initialState) => {
  const [state, unsafeDispatch] = useReducer(asyncReducer, {
    status: "idle",
    data: null,
    error: null,
    ...initialState,
  });
  const { setNotification } = useNotificationCtx();

  const dispatch = useUnsafeDispatch(unsafeDispatch);

  const run = useCallback(
    (promise) => {
      dispatch({ type: "pending" });
      promise
        .then((data) => dispatch({ type: "resolved", data }))
        .catch((error) => {
          setNotification({ message: error.message });
          dispatch({ type: "rejected", error });
        });
    },
    [dispatch, setNotification]
  );

  return { ...state, run };
};
