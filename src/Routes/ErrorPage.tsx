import { Helmet } from "react-helmet";

const ErrorPage = () => {     
    return (
        <div className="text-center" style={{width: "100%", height: "100%"}}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Task Tour React Portfolio Project</title>
                <meta name="description" content="A React Project for my portfolio"/>
            </Helmet>
            <h1>404 - Error Page</h1>
        </div>
    )
}

export default ErrorPage;