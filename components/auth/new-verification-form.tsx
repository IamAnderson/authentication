"use client"
import React, { useCallback, useEffect, useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
import { useRouter } from "next/router";
import { redirect, useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const NewVerficationForm = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get("token") as string;

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(async () => {
    if(success || error) {
        return;
    }

    if (!token) {
      setError("Missing Token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      header="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!error && !success && (
            <BeatLoader />
        )}
        {!error && (
          <FormSuccess message={success} />
        )}
        {!success && (
            <FormError message={error} />
        )}
      </div>
    </CardWrapper>
  );
};

export default NewVerficationForm;
