/**
 * COMPONENT TYPE: Container
 * SECTION: App Configuration
 *
 * ROLE:
 * - Configure root layout for Next.js app
 * - Integrate Redux state management via ReduxProvider
 * - Configure Ant Design theme and global UI settings
 *
 * PATTERNS USED:
 * - Provider Pattern - Redux and Ant Design context providers
 * - Configuration Pattern - Centralized theme and app settings
 *
 * NOTES FOR CONTRIBUTORS:
 * - All global providers must be added here
 * - Ant Design theme tokens can be customized in ConfigProvider
 * - ReduxProvider wraps the entire app for state access
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import ReduxProvider from "./ReduxProvider";
import { ConfigProvider, App } from "antd";
import Navbar from "@/components/Navbar/Navbar";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Design Pattern Showcase",
    description:
        "Interactive learning platform for software design patterns through gamified team-based challenges",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="it">
            <body className={inter.className} suppressHydrationWarning>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: "#ffc107", // Giallo primario (dalle slide)
                            colorSuccess: "#10b981", // Verde per risposte corrette
                            colorError: "#ff4d6d", // Rosa/rosso per errori (dalle slide)
                            colorWarning: "#ffc107", // Giallo per warning
                            colorInfo: "#ffc107", // Giallo per info
                            borderRadius: 12, // Rounded corners come nelle slide
                            fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif",
                            fontSize: 16,
                        },
                        components: {
                            Button: {
                                controlHeight: 44,
                                fontSize: 16,
                                fontWeight: 600,
                                borderRadius: 12,
                                // Primary button (yellow)
                                primaryColor: "#0a1929", // Navy text on yellow button
                                colorPrimaryHover: "#d39e00", // Yellow dark on hover
                                colorPrimaryActive: "#d39e00",
                                // Danger button (pink/red)
                                colorError: "#ff1744", // Pink accent for danger buttons
                                colorErrorHover: "#d50000",
                                colorErrorActive: "#d50000",
                                // Link button (yellow)
                                colorLink: "#ffc107", // Yellow for link buttons
                                colorLinkHover: "#d39e00", // Yellow dark on hover
                                colorLinkActive: "#d39e00",
                                // Default button
                                defaultBg: "#ffffff",
                                defaultColor: "#0a1929",
                                defaultBorderColor: "#2a3952",
                                defaultHoverBg: "#ffffff", // Beige on hover
                                defaultHoverColor: "#0a1929",
                                defaultHoverBorderColor: "#ffc107", // Yellow border on hover
                                defaultActiveBg: "#e6d7c4",
                                defaultActiveBorderColor: "#d39e00",
                                // Text button
                                textHoverBg: "rgba(255, 193, 7, 0.1)", // Light yellow on hover
                            },
                            Card: {
                                borderRadiusLG: 16,
                                colorBgContainer: "#f5e6d3", // Beige for pattern cards
                                colorText: "#0a1929", // Navy text on beige cards
                                colorTextHeading: "#0a1929",
                            },
                            Typography: {
                                colorText: "#0a1929", // Default dark text for cards
                                colorTextHeading: "#0a1929", // Dark headings
                            },
                            Menu: {
                                itemBg: "#0a1929",
                                itemColor: "#ffffff",
                                itemHoverBg: "#1a2942",
                                itemHoverColor: "#ffc107",
                                itemSelectedBg: "#1a2942",
                                itemSelectedColor: "#ffc107",
                            },
                            Collapse: {
                                contentBg: "#1a2942",
                                headerBg: "#1a2942",
                                colorText: "#ffffff",
                                colorBorder: "#ffc107",
                            },
                        },
                    }}
                >
                    <ReduxProvider>
                        <App>
                            <Navbar />
                            <Breadcrumb />
                            <main className="max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8">{children}</main>
                        </App>
                    </ReduxProvider>
                </ConfigProvider>
            </body>
        </html>
    );
}
