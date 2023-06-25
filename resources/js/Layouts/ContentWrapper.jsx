export default function ContentWrapper({ children, className, ...props }) {
    return (
        <div
            className={`flex px-[10%] flex-col justify-center items-center ${className}`}
        >
            {children}
        </div>
    );
}
