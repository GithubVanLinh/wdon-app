import { ReactNode } from "react";
import Loading from "../Loading";

export interface LoadingAndErrorProps {
  loading: boolean | null;
  error: Error | null;
  children: ReactNode;
}

export default function LoadingAndError({
  loading,
  error,
  children,
}: Readonly<LoadingAndErrorProps>) {
  if (loading) {
    return <Loading text="Loading..." />;
  }

  if (error) {
    return <div className="text-red-600">{error.message}</div>;
  }

  return <div>{children}</div>;
}
