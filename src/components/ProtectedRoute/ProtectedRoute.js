import { Route, Redirect } from "react-router-dom";
import { promoPage } from "../../configs/links";

const ProtectedRoute = ({ 
    component: Component, ...props  
}) => {
    return (
        <Route>
            {
                () => props.loggedIn 
                    ? <Component {...props} /> 
                    : <Redirect to={promoPage} />
            }
        </Route>
)}

export default ProtectedRoute;