import PrimaryButton from "../Buttons/PrimaryButton";
import _ from "lodash";
import { useSort, useSortUpdate } from "./SortContext";
import { useState, useEffect } from "react";
import {Link} from '@inertiajs/react'

const firstCellTopSpacing = 10;

export function TableButton({
    children,
    className = "",
    href,
    type,
    isFirst,
    ...props
}) {
    return (
        type === 'submit' ?
            <div className="flex justify-center items-center">
                <PrimaryButton className={`flex text-base justify-center items-center h-full ${className}`} type={type}>
                    {children}
                </PrimaryButton>
            </div>
        : 
        <Link href={href}>
            <div className="flex justify-center items-center">
                <PrimaryButton className={`flex text-base justify-center items-center h-full ${className}`}>
                    {children}
                </PrimaryButton>
            </div>
        </Link>
    );
}

export function TableCell({ children, className, isFirst, ...props }) {
    return (
        <td>
            <div
                className={`flex px-2 py-4 text-2xl ${
                    isFirst ? `pb-5 pt-${firstCellTopSpacing}` : ""} ${className}`}
            >
                {children}
            </div>
        </td>
    );
}

export function TableHead({
    sortEntries,
    entries,
    children,
    className,
    ...props
}) {
    return (
        <thead
            align="left"
            className="p-10 bg-slate-200 text-slate-400"
        >
            <tr>
                {Object.entries(entries).map(function ([key, value]) {
                    return (
                        <TableHeader key={key}>
                            {value !== "" &&
                            sortEntries.includes(key) ? (
                                <TableColumnSortHeader entry={key}>
                                    {value}
                                </TableColumnSortHeader>
                            ) : (
                                value
                            )}
                        </TableHeader>
                    );
                })}
            </tr>
        </thead>
    );
}

export function TableRow({ children, className, ...props }) {
    return <tr className="border-b-2">{children}</tr>;
}

export function Table({ children, className, ...props }) {
    return (
        <div
            className={`flex overflow-hidden flex-col mt-12 w-full rounded-xl ${className}`}
        >
            <table className="w-full table-auto">{children}</table>
        </div>
    );
}

export function TableHeader({ children, className, ...props }) {
    return (
        <th>
            <div className={`p-5 text-2xl text-slate-500 ${className}`}>
                {children}
            </div>
        </th>
    );
}

export function TableColumnSortHeader({
    entry,
    children,
    className,
    href,
    ...props
}) {
    const sort = useSort();
    const [sortUpdate, clearSort] = useSortUpdate();

    let initialOrder = "";
    if (sort["attribute"] == entry) {
        initialOrder = sort["order"];
    }
    const [order, setOrder] = useState(initialOrder);
    useEffect(() => {
        sortUpdate(entry, order);
    }, [order]);

    function handleClick() {
        if (order == "") {
            setOrder("asc");
        } else if (order == "asc") {
            setOrder("desc");
        } else if (order == "desc") {
            setOrder("asc");
        }
    }

    let headerTrail = "";
    switch (order) {
        case "asc":
            headerTrail = <i className="fa-solid fa-caret-up" />;
            break;
        case "desc":
            headerTrail = <i className="fa-solid fa-caret-down" />;
            break;
        default:
            break;
    }

    return (
        <div>
            <button onClick={handleClick}>
                <div className="flex space-x-3">
                    <div>{children}</div>
                    <div>{headerTrail}</div>
                </div>
            </button>
        </div>
    );
}