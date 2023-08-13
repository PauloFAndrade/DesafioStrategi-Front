import { Outlet } from "react-router-dom";
import useUser from "../../hooks/useUser";
import Redirecting from "../redirectComponent";

function RequireAuth () {
    const { isAuthenticated } = useUser();

    return isAuthenticated ? <Outlet/> : <Redirecting/>;

}

export default RequireAuth;