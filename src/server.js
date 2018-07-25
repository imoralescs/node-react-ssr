import express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { renderToString } from 'react-dom/server';
import ReactHelmet from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import createMemoryHistory from 'history/createMemoryHistory';

import Routes from './Routes';
import { render } from './isormorphic/render';
import { configureStore } from './isormorphic/store';
import { initState } from './modules';

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('*', (req, res) => {
    
    const { store, history } = configureStore(
        initState(),
        createMemoryHistory({
            initialEntries: [req.url],
            initialIndex: 0,
        })
    );

    const sheet = new ServerStyleSheet();
        
    const content = renderToString(
        sheet.collectStyles(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Routes />
                </ConnectedRouter>
            </Provider>
        )
    );
    
    res.write(
        render(
            content,
            store.getState(),
            ReactHelmet.renderStatic(),
            sheet.getStyleTags()
        )
    );
    
    res.end();
});

app.listen(3000, () => {
    console.log('app listening on port 3000!');
});