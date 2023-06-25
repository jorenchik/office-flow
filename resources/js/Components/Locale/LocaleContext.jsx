import { useContext, createContext, useState } from "react";
import _ from "lodash";

const LocaleContext = createContext();
const LocaleEntryContext = createContext();
const LocaleEntryContextUpdate = createContext();
const LocaleUpdateContext = createContext();

export function useLocale() {
    return useContext(LocaleContext); 
}

export function useLocaleEntries() {
    return useContext(LocaleEntryContext); 
}

export function useLocaleEntriesUpdate() {
    return useContext(LocaleEntryContextUpdate); 
}

export function useLocaleUpdate() {
    return useContext(LocaleUpdateContext);
}

export function LocaleContextProvider({ initialLocale, initialLocaleEntries, children }) {
    const [locale, setLocale] = useState(initialLocale);
	const [localeEntries, setLocaleEntries] = useState(initialLocaleEntries);

    return (
		<LocaleContext.Provider value={locale}>
			<LocaleUpdateContext.Provider value={setLocale}>
				<LocaleEntryContext.Provider value={localeEntries}>
					<LocaleEntryContextUpdate.Provider value={setLocaleEntries}>
						{children}
					</LocaleEntryContextUpdate.Provider>
				</LocaleEntryContext.Provider>
			</LocaleUpdateContext.Provider>
		</LocaleContext.Provider>
    );
}
