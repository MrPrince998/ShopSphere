import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Formik, Form, ErrorMessage } from "formik";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Must be 6+ characters").required("Required"),
});

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const handleSubmit = (values: LoginFormValues) => {
    console.log("Form Submitted:", values);
  };
  return (
    <div className="w-full min-h-screen bg-blue-50 flex flex-col items-center justify-center">
      <div className="bg-background p-10 min-w-md rounded-xl shadow-lg relative z-10 overflow-hidden">
        <div className="h-40 w-40 rounded-full bg-red-50 absolute -right-20 -top-20"></div>
        <div className="h-40 w-40 rounded-full bg-purple-50 absolute -left-20 -bottom-20"></div>
        <div className="flex flex-col items-center">
          <div className="">LOGO</div>
          <h2 className="text-2xl font-semibold text-foreground">
            Welcome Back
          </h2>
          <p className="text-muted-foreground">
            Sign in to your account to continue
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="flex flex-col gap-4 w-80 mt-10">
              <div>
                <Label htmlFor="email" className="text-muted-foreground mb-2">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={14}
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="px-8 text-muted-foreground bg-muted-foreground/5"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="text-muted-foreground mb-2"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={14}
                  />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="px-8 text-muted-foreground bg-muted-foreground/5"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox
                    id="remember"
                    className="mr-2"
                    onClick={() => setRememberMe(!rememberMe)}
                  />
                  <Label htmlFor="remember" className="text-muted-foreground">
                    Remember me
                  </Label>
                </div>
                <Link
                  to="/auth/forgot-password"
                  className="text-sm text-blue-500"
                >
                  Forgot Password?
                </Link>
              </div>
              <Button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Sign into your account
              </Button>
            </Form>
          </Formik>
          <div className="w-full flex items-center my-4">
            <Separator className="flex-1" />
            <p className="text-center text-muted-foreground px-2">
              or continue with
            </p>
            <Separator className="flex-1" />
          </div>
          <div className="flex gap-4">
            <Button className="flex-1 bg-white border border-muted-foreground/20 hover:bg-muted-foreground/5 text-card-foreground">
              Google
            </Button>
            <Button className="flex-1 bg-white border border-muted-foreground/20 hover:bg-muted-foreground/5 text-card-foreground">
              Facebook
            </Button>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-blue-500">
              create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
