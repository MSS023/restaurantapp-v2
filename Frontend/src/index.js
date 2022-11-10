import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LoadingProvider } from './store/LoadingProvider';
import { SidebarShowProvider } from './store/SidebarShowProvider';
import 'antd/dist/antd.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<React.StrictMode>
			<LoadingProvider>
				<SidebarShowProvider>
					<App />
				</SidebarShowProvider>
			</LoadingProvider>
		</React.StrictMode>
	</BrowserRouter>
);
