import { SidebarRoot } from "@/components/Sidebar/SidebarRoot";
import { Inter } from "next/font/google";
import "./globals.css";
import { HeaderRoot } from "@/components/Header/HeaderRoot";
import { LoginModal } from "@/components/Modals/LoginModal";
import { RegisterModal } from "@/components/Modals/RegisterModal";
import { ToasterProvider } from "./providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Deus Gamer",
  description:
    "Deus Gamer é um site para exploração de jogos, com o objetivo de ajudar os jogadores a encontrar jogos que se encaixem em seus gostos e necessidades!!!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <SidebarRoot>
          <HeaderRoot />
          {children}
        </SidebarRoot>
      </body>
    </html>
  );
}
