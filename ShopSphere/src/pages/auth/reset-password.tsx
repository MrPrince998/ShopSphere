import { Lock, Mail } from "lucide-react";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaTelegramPlane } from "react-icons/fa";
import { AiFillInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

interface ResetPasswordFormValues {
  email: string;
}

const initialValues: ResetPasswordFormValues = {
  email: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});
const ForgotPasswordPage: React.FC = () => {
  const handleSubmit = (values: ResetPasswordFormValues) => {
    console.log("Reset password request for:", values.email);
  };
  return (
    <div className="min-h-screen w-full bg-[#f9f9f9] flex flex-col justify-center">
      <div className="max-w-sm w-full mx-auto py-4 px-4 bg-background rounded-2xl shadow-md">
        <div className="w-20 h-20 bg-blue-200 rounded-full flex justify-center items-center mx-auto mb-4">
          <Lock className="text-gray-500" size={50} />
        </div>
        <h1 className="text-2xl font-semibold text-center text-foreground ">
          Reset Password
        </h1>
        <p className="text-center text-muted-foreground text-sm mb-4">
          Enter your email address and we'll send you a secure link to reset
          your password. Check your inbox and follow the instructions.
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="w-full max-w-md space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className={`mb-1 block ${
                    errors.email && touched.email
                      ? "text-destructive"
                      : "text-foreground"
                  }`}
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Mail
                    className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
                      errors.email && touched.email
                        ? "text-destructive"
                        : "text-gray-400"
                    }`}
                    size={18}
                  />
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`pl-10 pr-4 py-3 transition-all ${
                      errors.email && touched.email
                        ? "border-red-300 focus:ring-destructive focus:border-destructive"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                <FaTelegramPlane className="inline mr-2" />
                Send Reset Link
              </Button>
            </Form>
          )}
        </Formik>
        <div className="flex gap-2 p-2 bg-blue-100 mt-6 rounded-md">
          <AiFillInfoCircle size={30} className="text-blue-500" />
          <div>
            <p className="font-medium text-blue-700">Security Notice:</p>
            <p className="text-sm text-blue-700">
              The reset link will expire in 15 minutes for your security. If you
              don't receive an email, check your spam folder.
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-center text-sm text-muted-foreground mt-4">
            Remembered your password?{" "}
          </p>
          <Link
            to="/auth/login"
            className="text-blue-600 hover:underline hover:text-blue-800 mx-auto block text-center text-sm"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
