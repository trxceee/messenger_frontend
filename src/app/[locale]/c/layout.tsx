import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import { appConfig, routing } from "@/shared";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import bg from "@/app/assets/imgs/fr.svg";
import { Toaster } from "react-hot-toast";
import CurrentUserProvider from "@/app/providers/CurrentUserProvider";

const fontRoboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: {
      template: `%s - ${appConfig.NAME()}`,
      default: `${t("pagesTitle.homeTitle")} - ${appConfig.NAME()}`,
    },
    description: `The best messanger in the industry - ${appConfig.NAME()}`,
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  return (
    <div className={`${fontRoboto.className} antialiased`}>
      <CurrentUserProvider>
        <div
          className="absolute inset-0 w-full h-full bg-linear-30 from-[#4f5bd5]/0 via-[#dd6cb9]/35 to-[#fec416]/70"
          style={{
            WebkitMaskImage: `url(${bg.src})`,
            maskImage: `url(${bg.src})`,
          }}
        ></div>
        {children}
        <Toaster position="top-center" reverseOrder={false} />
      </CurrentUserProvider>
    </div>
  );
}
