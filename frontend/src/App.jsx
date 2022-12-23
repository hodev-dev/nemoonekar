import * as React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import { Axios } from './app/axiosClient';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { useSelector } from 'react-redux';
import RouterContainer from './routes/RouterContainer';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function App() {

  React.useEffect(() => {
    // Axios.post('/signin', { email: 'test@gmail.com', password: '123456' }).then(response => {
    //   console.log({ response });
    // });
    // Axios.get('/api/user').then(response => {
    //   console.log({ response });
    // });
  }, [])


  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CacheProvider value={cacheRtl}>
          <RouterContainer />
        </CacheProvider>
      </PersistGate>
    </Provider >
  );
}
