import React, { useState } from "react";
import {
  FaCheckCircle,
  FaGift,
  FaShieldAlt,
  FaShoppingBag,
  FaUserPlus,
} from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import type { RegisterFormValues } from "@/components/const/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Github, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const initialValues: RegisterFormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
  };

  const handleSubmit = (values: RegisterFormValues) => {
    console.log("Form data", values);
  };
  return (
    <div className="w-full min-h-full grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex flex-col items-center bg-sky-200 text-white justify-center p-8">
        <div className="m-8 p-4">
          <FaShoppingBag className="mx-auto my-4" size={50} />
          <h1 className="text-4xl font-bold mb-4 text-center">ShopSphere</h1>
          <p className="text-lg">Your Ulitmate Shopping Destination</p>
        </div>
        <div className="grid grid-cols-3 gap-4 w-full mb-6">
          <div className="w-40 h-40 rounded-2xl bg-background/30 flex flex-col items-center justify-center">
            <FaGift className="text-white" size={40} />
            <p className="mt-2 text-center">Exclusive Deals</p>
          </div>
          <div className="w-40 h-40 rounded-2xl bg-background/30 flex flex-col items-center justify-center">
            <TbTruckDelivery className="text-white" size={40} />
            <p className="mt-2 text-center">Fast Delivery</p>
          </div>
          <div className="w-40 h-40 rounded-2xl bg-background/30 flex flex-col items-center justify-center">
            <FaShieldAlt className="text-white" size={40} />
            <p className="mt-2 text-center">Secure Payment</p>
          </div>
        </div>
        <p className="text-center my-1">
          <FaCheckCircle className="inline-block mr-2 text-orange-400" />
          Over 1M+ satisfaied customers
        </p>
        <p className="text-center my-1">
          <FaCheckCircle className="inline-block mr-2 text-orange-400" />
          Free shipping on ordrs over $50
        </p>
        <p className="text-center my-1">
          <FaCheckCircle className="inline-block mr-2 text-orange-400" />
          24/7 customer support
        </p>
      </div>
      <div className="flex flex-col justify-center items-center p-8 bg-[#f9f9f9]">
        <h2 className="text-3xl font-semibold">Create Account</h2>
        <p className="mb-6 text-center text-muted-foreground">
          Join thousands of happy shoopers today
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="w-full max-w-md space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className={`${
                    errors.username && touched.username
                      ? "text-destructive"
                      : "text-foreground"
                  }`}
                >
                  Username
                </Label>
                <div className="relative">
                  <User
                    className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
                      errors.username && touched.username
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}
                    size={18}
                  />
                  <Field
                    as={Input}
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    className={`pl-10 pr-4 py-3 transition-all ${
                      errors.username && touched.username
                        ? "border-red-300 focus:ring-destructive focus:border-destructive"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                  />
                </div>
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-destructive text-sm mt-1"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className={`${
                    errors.email && touched.email
                      ? "text-destructive"
                      : "text-foreground"
                  }`}
                >
                  Email
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
                  className="text-destructive text-sm mt-1"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className={`${
                    errors.password && touched.password
                      ? "text-destructive"
                      : "text-foreground"
                  }`}
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock
                    className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
                      errors.password && touched.password
                        ? "text-destructive"
                        : "text-gray-400"
                    }`}
                    size={18}
                  />
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`pl-10 pr-12 py-3 transition-all ${
                      errors.password && touched.password
                        ? "border-red-300 focus:ring-destructive focus:border-destructive"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm flex items-center gap-1 mt-1"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className={`${
                    errors.confirmPassword && touched.confirmPassword
                      ? "text-destructive"
                      : "text-foreground"
                  }`}
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock
                    className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "text-destructive"
                        : "text-gray-400"
                    }`}
                    size={18}
                  />
                  <Field
                    as={Input}
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`pl-10 pr-12 py-3 transition-all ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-red-300 focus:ring-destructive focus:border-destructive"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm flex items-center gap-1 mt-1"
                />
              </div>
              <div className="space-y-2">
                <Label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={() => setAgreeTerms(!agreeTerms)}
                    className="form-checkbox"
                  />
                  <span className="text-sm">
                    I agree to the{" "}
                    <Link
                      to={"/terms-of-services"}
                      className="text-sky-600 hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to={"/privacy-policy"}
                      className="text-sky-600 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </Label>
              </div>
              <Button
                type="submit"
                className="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 disabled:bg-gray-400"
                disabled={!agreeTerms}
              >
                <FaUserPlus className="inline-block" />
                Create Account
              </Button>

              {/* Social Login Divider */}
              <div className="my-6">
                <div className="relative">
                  <Separator className="absolute top-[50%] flex items-center" />
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white/80 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("google")}
                  className="flex items-center justify-center gap-2 py-2.5 border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("github")}
                  className="flex items-center justify-center gap-2 py-2.5 border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <Github size={18} />
                  GitHub
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/auth/login" className="text-sky-600 hover:underline">
                  Sign in here
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;
