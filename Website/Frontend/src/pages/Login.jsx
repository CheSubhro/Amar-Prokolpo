
import LoginForm from "../features/auth/components/LoginForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="login-page">
            <LoginForm onSuccess={() => navigate("/")} />
        </div>
    );
};
export default Login;