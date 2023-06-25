export default function SectionRow({
    children,
    className,
    ...props
}) {
    return (
        <div className={
            `flex justify-around w-full ${className}`
        }>
            {children} </div>
    );
}
