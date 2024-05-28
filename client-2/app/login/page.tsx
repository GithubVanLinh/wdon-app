import CenteredElement from "@/components/common/CenteredElement";
import LoginForm from "@/components/specific/LoginForm";

export interface LoginPageProps {}

export default function LoginPage({}: Readonly<LoginPageProps>) {
  return (
    <div className="h-screen w-screen">
      <CenteredElement>
        <LoginForm />
      </CenteredElement>
    </div>
  );
}
