import React, { use } from "react";
import { AuthLayout } from "../../../components/AuthLayout";
import Button from "../../../components/Button";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();
  return (
    <div className="bg-green-700/70 my-10 rounded-lg py-8 px-4 mx-3">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-400">
          Join Our Platform
        </h1>
      </div>
      <div className="max-w-[1200px] mx-auto py-8 text-center">
        <p className="text-yellow-400 text-base font-medium">
          Register as either a donor to and donate to the need or a recipient
          who is in need of assistance
        </p>
        <div className="">
          <Button
            variant="primary"
            type="submit"
            className="py-2 m-3"
            onClick={() => router.push("/auth/signup/donor")}
          >
            Sign Up as Donor
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="py-2 m-3"
            onClick={() => router.push("/auth/signup/recipient")}
          >
            Sign Up as Recipient
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

SignUp.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
