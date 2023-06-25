import {useContext, createContext, useState} from "react";
import _ from "lodash";

const SortContext = createContext();
const SortUpdateContext = createContext();

export function useSort() {
    return useContext(SortContext);
}

export function useSortUpdate() {
    return useContext(SortUpdateContext);
}

export function SortContextProvider({children, initialSort}) {
    const [sort, setSort] = useState(initialSort);

    function setSort_(attribute, order) {
        const newSort = _.cloneDeep(sort);
        newSort["attribute"] = attribute;
        newSort["order"] = order;
        setSort(newSort);
    }

    function clearSort() {
        setSort_("", "");
    }

    return (
        <SortContext.Provider value={sort}>
            <SortUpdateContext.Provider value={
                [setSort_, clearSort]
            }>
                {children} </SortUpdateContext.Provider>
        </SortContext.Provider>
    );
}
