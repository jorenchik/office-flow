export default function Infopanel({
    children,
    ...props
}) {
    return (
        <div className="flex items-center place-content-center w-1/2 h-[14rem] text-2xl text-center">
            <div className="flex flex-wrap justify-around items-center p-14 space-y-4 w-3/4 text-center rounded-lg shadow">
                {children} </div>
        </div>
    );
}
