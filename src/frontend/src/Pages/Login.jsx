import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../app/asyncThunks";
import { login as loginAction } from "../app/reducers/authSlice";
import { useState } from "react";

export default function Component() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleSubmit = async (credentials) => {
    console.log(credentials);
    dispatch({ type: "LOGIN_START" });

    try {
      const result = await dispatch(login(credentials));
      dispatch(loginAction(result.payload));

      navigate("/dashboard");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.message });
    }
  };

  const handleChange = (event) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [event.target.id]: event.target.value,
    }));
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Enter your email and password to sign in to your account.
          </CardDescription>
        </CardHeader>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(credentials);
          }}
        >
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
