import { ReactNode } from "react";
import Loading from "../Loading";

export interface LoadingAndErrorProps<T> {
  loading: boolean | null;
  error: Error | null;
  children: ReactNode;
  data?: T;
  transform?: (data: T) => void;
}

export default function LoadingAndError<T>({
  loading,
  error,
  children,
  transform,
  data,
}: Readonly<LoadingAndErrorProps<T>>) {
  if (loading) {
    return <Loading text="Loading..." />;
  }

  if (error) {
    return <div className="text-red-600">{error.message}</div>;
  }

  if (transform && data) transform(data);
  return children;
}
