import Button from "@/components/common/Button";
import InputWithSpan from "@/components/common/Input";
import { register } from "@/services/authService";
import { SignInData } from "@/utils/type/auth";
import { ChangeEvent, FormEvent, useState } from "react";

export interface SignInFormProps {}

export default function SignInForm({}: Readonly<SignInFormProps>) {
  const [data, setData] = useState<SignInData>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "2000-01-01",
  });
  const [resp, setResp] = useState<string>();
  const [error, setError] = useState<string>();
  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pre = { ...data };
    for (let d in pre) {
      const index = d as keyof SignInData;
      if (pre[index] === "") {
        delete pre[index];
      }
    }

    try {
      const res = await register(data);
      setResp("Login now");
    } catch (error) {
      console.log(error);
      setError((error as any).message);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;

    setData({ ...data, [name]: e.target.value });
  };

  return (
    <form
      className="grid grid-cols-2 border border-blue-200 p-2 overflow-hidden"
      onSubmit={onFormSubmit}
    >
      <div className="w-full flex justify-center col-span-2">
        <h1 className="text-lg font-bold text-nowrap">Sign In</h1>
      </div>
      <InputWithSpan
        name="username"
        className=""
        text="Username"
        value={data.username}
        onChange={onChange}
        required
      />
      <InputWithSpan
        name="password"
        text="Password"
        type="password"
        value={data.password}
        onChange={onChange}
        required
      />
      <InputWithSpan
        name="firstName"
        text="Firstname"
        type="text"
        value={data.firstName}
        onChange={onChange}
        required
      />
      <InputWithSpan
        name="lastName"
        text="Lastname"
        type="text"
        value={data.lastName}
        onChange={onChange}
      />
      <InputWithSpan
        name="dateOfBirth"
        text="Date of birth"
        type="date"
        onChange={onChange}
        value={data.dateOfBirth}
      />
      <div className="flex flex-grow justify-center items-center">
        <Button
          className="bg-blue-400 w-8/12 h-8/12 justify-center items-center text-white text-lg font-bold"
          type="submit"
        >
          Submit
        </Button>
      </div>
      {error ? (
        <div className="w-full flex justify-center col-span-2">
          <h1 className="text-lg font-bold text-nowrap text-red-400">
            {error}
          </h1>
        </div>
      ) : (
        <div className="w-full flex justify-center col-span-2">
          <h1 className="text-lg font-bold text-nowrap text-green-400">
            {resp}
          </h1>
        </div>
      )}
    </form>
  );
}
