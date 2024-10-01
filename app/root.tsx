import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { APP_NAME } from "~/routes/manifest[.json]";
import appleTouchIcon from "~/assets/apple-touch-icon.png";
import favicon32 from "~/assets/favicon-32x32.png";
import favicon16 from "~/assets/favicon-16x16.png";
import { LinksFunction } from "@remix-run/cloudflare";
import "./tailwind.css";

export const links: LinksFunction = () => [];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="sv"
      className="bg-amber-50 text-amber-900 dark:bg-stone-900 dark:text-amber-100"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
        <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
        <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
        <link rel="manifest" href="/manifest.json" />
        <Meta />
        <Links />
      </head>
      <body className="m-10">
        <h1 className="mb-4 text-4xl font-bold">{APP_NAME}</h1>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
