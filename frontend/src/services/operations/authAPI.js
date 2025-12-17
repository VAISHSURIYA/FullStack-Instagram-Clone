import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { authEndpoints } from "../apis";

const {
    SIGNUP_API,
    LOGIN_API
} =authEndpoints;

export function signUp(signUpData, navigate, setLoading) {
    const signIn = async () => {
        try {
            setLoading(true);
            const response = await apiConnector("post", SIGNUP_API, signUpData);

            if (!response || !response.data) {  // ✅ check if data exists
                throw new Error("No response from server");
            }

            toast.success("Account Created Successfully");
            navigate("/");
            toast.success("Please login");

        } catch (error) {
            console.log("SIGNUP ERROR.....", error);

            // safer error handling
            const msg = error?.response?.data?.message || error.message || "Something went wrong";
            toast.error(msg);
            navigate("/signup");
        }
        setLoading(false);
    };
    signIn();
}

export function logIn(loginData, navigate, setLoading) {
    const login = async () => {
        setLoading(true);
        try {
            const response = await apiConnector("post", LOGIN_API, loginData);

            if (!response || !response.data) {
                throw new Error("No response from server");
            }

            toast.success("Logged in Successfully");
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/feed");

        } catch (error) {
            console.log("Error occurred while log in", error);

            const msg = error?.response?.data?.message || error.message || "Something went wrong";
            toast.error(msg);
            navigate("/");
        }
        setLoading(false);
    };
    login();
}

export function logout(navigate){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
        navigate("/");
}