import logo from '../../img/logo.png'

export default function ApplicationLogo({className,...props}) {

    const logoSrc = logo;

    const classes = className + " shadow-xl";

    return (
            <img className={classes} src={logo}/>
    );
}
