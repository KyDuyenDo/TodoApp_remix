import {
  Await,
  ClientLoaderFunctionArgs,
  json,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useFetcher,
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
import React, { Suspense, useEffect, useState } from "react";
import { SidebarContent } from "./components/Sidebar/SidebarContent";
import Header from "./components/Header/Header";
import { mockFolders } from "./contants/mock";

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
  const folders = await new Promise<Folder[]>((r) =>
    setTimeout(() => r(mockFolders), 3000)
  );
  return json({ folders });
};

export async function clientLoader({ serverLoader }: ClientLoaderFunctionArgs) {
  return {
    folders: serverLoader<typeof loader>().then((c) => c.folders),
  };
}

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
  const loaderData = useLoaderData<typeof loader>();
  const [folders, setFolders] = useState<Folder[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching the folders from loaderData
    const fetchfolders = async () => {
      setLoading(true);
      const data = await new Promise<Folder[]>(
        (resolve) => setTimeout(() => resolve(loaderData.folders), 3000) // Simulated delay
      );
      setFolders(data);
      setLoading(false);
    };

    fetchfolders();
  }, [loaderData]);
  return (
    <div>
      {loading
        ? // Render skeleton while loading
          Array.from(new Array(5)).map((_, i) => (
            <span key={i}>Loading...</span>
          ))
        : // Render actual folders once loaded
          folders?.map((folder) => <span>{folder.name}</span>)}
    </div>
  );
}
