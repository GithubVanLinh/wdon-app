export interface CenteredElementProps {
  children: React.ReactNode;
}

export default function CenteredElement({
  children,
}: Readonly<CenteredElementProps>) {
  return (
    <div className="flex w-full h-full justify-center items-center">
      {children}
    </div>
  );
}
