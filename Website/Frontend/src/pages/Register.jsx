
import RegisterForm from "../features/auth/components/RegisterForm";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    return <RegisterForm onSuccess={() => navigate("/login")} />;
};
export default Register;