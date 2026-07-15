
import LoginForm from "../features/auth/components/LoginForm";
import { useNavigate, Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";

const Login = () => {

    const navigate = useNavigate();

    return (
        <div className="login-page">
            <LoginForm onSuccess={() => navigate("/")} />
            <Text textAlign="center" mt={4}>
                Don't have an account? <Link to="/register" style={{color: 'blue'}}>Register here</Link>
            </Text>
        </div>
    );
};
export default Login;