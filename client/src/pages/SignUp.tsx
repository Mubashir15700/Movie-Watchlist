import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SignupSchema } from "../utils/validations/signUpSchema";
import { loginSuccess } from "../redux/slices/authSlice";
import useApiRequest from "../hooks/useApiRequest";

interface UserData {
    status: string;
    user: {
        email: string;
        name: string;
    };
    token: string;
}

const SignUp = () => {
    const { response, error, loading, sendRequest } =
        useApiRequest<UserData>("/auth/signup");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (response?.status === "success") {
            const user = {
                name: response?.user?.name,
                email: response?.user?.email,
            };

            dispatch(loginSuccess({ user }));
            navigate("/");
        } else if (error) {
            toast.error(error?.response?.data?.message);
        }
    }, [response, error, navigate]);

    const handleSubmit = async (values: {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
    }) => {
        try {
            await sendRequest("POST", values);
        } catch (err) {
            console.error("Signup error:", err);
            toast.error("Signup failed. Please try again.");
        }
    };

    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <label htmlFor="name">Name</label>
                        <Field type="text" name="name" />
                        <ErrorMessage name="name" component="div" />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field type="email" name="email" />
                        <ErrorMessage name="email" component="div" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Field type="password" name="password" />
                        <ErrorMessage name="password" component="div" />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <Field type="password" name="confirmPassword" />
                        <ErrorMessage name="confirmPassword" component="div" />
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        {loading ? "Loading..." : ""} Signup
                    </button>
                    {error && (
                        <div className="error-message">{error.message}</div>
                    )}
                </Form>
            )}
        </Formik>
    );
};

export default SignUp;
