import RootLayout from "@/app/layout";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "@/store/store";
import { loadUser } from "@/store/action/user";
import { RoomProvider } from "@/context/roomcontext";

const MyApp = ({ Component }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    store.dispatch(loadUser());
  }, []);
  if (!hydrated) {
    return null;
  }

  return (
    <Provider store={store}>
      <RootLayout>
        <RoomProvider>
          <Component />
        </RoomProvider>
      </RootLayout>
    </Provider>
  );
};

export default MyApp;
