const { createContext, useState, useContext } = require('react');

const SidebarShowContext = createContext();

export function useSidebarShow() {
	return useContext(SidebarShowContext);
}

export function SidebarShowProvider({ children }) {
	const [showSidebar, setShowSidebar] = useState(true);

	return <SidebarShowContext.Provider value={[showSidebar, setShowSidebar]}>{children}</SidebarShowContext.Provider>;
}
