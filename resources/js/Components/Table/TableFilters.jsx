import {useState} from "react";
import {router} from "@inertiajs/react";
import {useSort, useSortUpdate} from "./SortContext";
import {useFilters, useFilterUpdate} from "./FilterContext";
import {useEffect} from "react";
import {Link} from "@inertiajs/react";
import {useLocaleEntries} from "../Locale/LocaleContext";
import _ from "lodash";
import Login from "@/Pages/Auth/Login";

function getNewFilterRequest(filters) {
    let chosenFilterOptions = {};
    Object.entries(filters).forEach(([key, value]) => { // To avoid redundant 'all' filters in the request parameters
        if (value["choice"] != "all") {
            chosenFilterOptions[key] = value["choice"];
        }
    });

    return chosenFilterOptions;
}

function getNewSortRequest(sort) {
    if (sort["attribute"] != "" && sort["order"] != "") {
        return {["sortAttribute"]: sort["attribute"], ["sortOrder"]: sort["order"]};
    } else {
        return {};
    }
}

export function TableFilters({
    route,
    attributes,
    ...props
}) {
    const [isMounted, setIsMounted] = useState(false);
    const [isInitialValuesSet, setIsInitialValuesSet] = useState(false);

    const localeEntries = useLocaleEntries();
    const newSort = useSort();
    const [setSort, clearSort] = useSortUpdate();

    const newFilters = useFilters();
    const [setFilter, clearFilters] = useFilterUpdate();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    let currentSort,
        currentFilters;
    useEffect(() => {
        if (isMounted) {
            currentSort = _.cloneDeep(newSort);
            currentFilters = _.cloneDeep(newFilters);
            setIsInitialValuesSet(true);
        }
    }, [isMounted]);

    function handleClearFilters(e) {
        e.preventDefault();
        clearFilters();
    }

    function handleClearSort(e) {
        e.preventDefault();
        clearSort();
    }

    useEffect(() => {
        if (!isInitialValuesSet || (_.isEqual(newFilters, currentFilters) && _.isEqual(newSort, currentSort))) {
            return;
        }
        const newFilterRequest = getNewFilterRequest(newFilters);
        const newSortRequest = getNewSortRequest(newSort);

        router.get(route, {
            ... newFilterRequest,
            ... newSortRequest
        }, {
            preserveScroll: true
        });
    }, [newFilters, newSort]);
    return (
        <div className="flex justify-center items-center space-x-10 text-xl">
            {
                Object.entries(attributes).map(([key, value]) => {
                return (
                    <Choice title={
                            localeEntries[key]
                        }
                        key={key}
                        attribute={key}
                        options={
                            value["options"]
                        }
                        pickedOption={
                            value["choice"]
                        }/>
                );
            })
        }

            {attributes.length > 0 && <Link onClick={handleClearFilters}>
                {
                localeEntries["clearFilters"]
            } </Link>}
            <Link onClick={handleClearSort}>
                {
                localeEntries["clearSort"]
            }</Link>
        </div>
    );
}

export function Choice({
    title,
    pickedOption,
    options, // Assuming options is now an object {id: name, id: name, ...}
    attribute,
    className,
    children,
    ...props
}) {
    const filters = useFilters();
    const [setFilter, clearFilters] = useFilterUpdate();
    const localeEntries = useLocaleEntries();

    useEffect(() => {
        setFilter(attribute, pickedOption);
    }, []);

    function handleChange(e) {
        console.log(e.target.value);
        if(e.target.value == 0)
        {
            setFilter(attribute, 'all');
        } else {
            setFilter(attribute, e.target.value);
        }
    }

    return (
        <div className="flex items-center space-x-5">
            <div className="text-2xl">
                {title}:</div>
            <div>
                <select onChange={handleChange}
                    defaultValue={pickedOption}
                    className="flex items-center py-1 pl-6 w-32 h-10 text-xl rounded-lg"
                    name="time"
                    id="">
                    {
                    Object.entries(options).map(function ([id, name]) {
                        return (
                            <option value={id}
                                key={id}>
                                {
                                localeEntries[name] !== undefined ? localeEntries[name] : name
                            } </option>
                        );
                    })
                } </select>
            </div>
        </div>
    );
}
