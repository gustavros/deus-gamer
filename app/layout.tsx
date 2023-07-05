import { SidebarRoot } from "@/components/Sidebar/SidebarRoot";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Deus Gamer",
  description:
    "Deus Gamer é um site para exploração de jogos, com o objetivo de ajudar os jogadores a encontrar jogos que se encaixem em seus gostos e necessidades.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <SidebarRoot>{children}</SidebarRoot>
      </body>
    </html>
  );
}
