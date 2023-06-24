export default function error(props) {
    console.log(props);
    return (
        <div>
            <h1>Error</h1>
            {props.error}
        </div>
    );
}
