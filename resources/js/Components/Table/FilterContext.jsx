import {useContext, createContext, useState, useEffect} from "react";
import _ from "lodash";

const FilterContext = createContext();
const FilterUpdateContext = createContext();

export function useFilters() {
    return useContext(FilterContext);
}

export function useFilterUpdate() {
    return useContext(FilterUpdateContext);
}

export function FilterContextProvider({children, initialFilters}) {
    const [filters, setFilters] = useState(initialFilters);

    function setFilter(attribute, value) {
        const newFilters = _.cloneDeep(filters);
        newFilters[attribute]["choice"] = value;
        setFilters(newFilters);
    }

    function clearFilters() {
        let newFilters = _.cloneDeep(filters);
        newFilters = Object.entries(newFilters).map((el) => {
            return(el["choice"] = "all");
        });
        setFilters(newFilters);
    }

    return (
        <FilterContext.Provider value={filters}>
            <FilterUpdateContext.Provider value={
                [setFilter, clearFilters]
            }>
                {children} </FilterUpdateContext.Provider>
        </FilterContext.Provider>
    );
}
