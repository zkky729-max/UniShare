import type { ReactNode } from "react";
import { AuthProvider } from "../../features/auth/context/AuthContext";

type AppProvidersProps = {
  children: ReactNode;
};

export default function AppProviders({
  children,
}: AppProvidersProps) {
  return <AuthProvider>{children}</AuthProvider>;
}