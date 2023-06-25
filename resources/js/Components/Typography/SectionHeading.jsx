export default function SectionHeading({
    children,
    ...props
}) {
    return <h1 className="mx-5 w-full text-5xl font-light">
        {children}</h1>;
}
