import {
  json,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";

import "./tailwind.css";
import { createFolder, getFolders } from "./models/folder";
import { Folder } from "./contants/types";
import React from "react";
import { SidebarContent } from "./components/Sidebar/SidebarContent";
import Header from "./components/Header/Header";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const loader: LoaderFunction = async ({}) => {
  const folders = await getFolders();
  return json({ folders });
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);
  const folder: Folder = {
    id: values.name as string,
    name: values.name as string,
    icon: (values.emoji as string) || "📁",
    taskCount: 0,
  };
  const newFolder = await createFolder(folder);
  return redirect(`/folders/${newFolder.id}`);
}

export default function Folders() {
  const { folders } = useLoaderData<typeof loader>();
  const [isMobile, setIsMobile] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);
  return (
    <div className="flex min-h-screen min-w-screen">
      {!isMobile && (
        <div className="w-64 bg-white border-r min-h-screen p-4">
          <SidebarContent
            folders={folders}
            isMobile={isMobile}
            setSidebarOpen={setSidebarOpen}
          />
        </div>
      )}
      <div className="flex-1 p-4 md:p-6 bg-gray-50">
        <div>
          <Header
            isMobile={isMobile}
            folders={folders}
            setSidebarOpen={setSidebarOpen}
            sidebarOpen={sidebarOpen}
          />
          <Outlet
            context={{
              isMobile,
              folders,
              context: "task-list",
            }}
          />
        </div>
      </div>
    </div>
  );
}
