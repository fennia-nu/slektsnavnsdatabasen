import { twMerge } from "tailwind-merge";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { APP_NAME } from "./manifest[.json]";
import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import * as schema from "drizzle/schema";
import { count } from "drizzle-orm";

export const meta: MetaFunction = () => {
  return [
    { title: APP_NAME },
    { name: "description", content: "Finske slektsnavn fra Finnskogen" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const side = new URL(request.url).searchParams.get("side");

  const LIMIT = 50;
  const sqlite = new Database(process.env.DB_FILE_NAME!);
  const db = drizzle(sqlite, { schema });
  const rows =
    (
      await db
        .select({ count: count(schema.slektsnavn.indeks) })
        .from(schema.slektsnavn)
    )[0].count ?? 0;
  const lastPage = Math.ceil(rows / LIMIT);
  const page = clamp(Number(side) - 1 || 0, lastPage);
  const cursor = LIMIT * page + 1;

  const slektsnavn = await db.query.slektsnavn.findMany({
    limit: LIMIT,
    offset: cursor,
  });
  return json({
    slektsnavn,
    currentPage: page + 1,
    lastPage,
  });
}

function clamp(num: number, max: number) {
  return Math.max(Math.min(num, max), 0);
}

export default function Component() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <section className="mt-6">
      <Pagination current={loaderData.currentPage} last={loaderData.lastPage} />
      <table className="relative contents w-full xl:table">
        <thead className="hidden text-left leading-tight xl:table-header-group">
          <tr>
            <TH>{labels.forstaAar}</TH>
            <TH>{labels.sistaAar}</TH>
            <TH>{labels.finskSlekt}</TH>
            <TH>{labels.fornamn}</TH>
            <TH>{labels.patronym}</TH>
            <TH>{labels.slektbelaegg}</TH>
            <TH>{labels.ort}</TH>
            <TH>{labels.nuvarandeSocken}</TH>
            <TH>{labels.laen}</TH>
            <TH>{labels.arkivkaella}</TH>
            <TH>{labels.kaellspecifikation}</TH>
            <TH>{labels.andrekaella}</TH>
            <TH>{labels.kommentarer}</TH>
          </tr>
        </thead>
        <tbody className="grid grid-cols-[auto_1fr] gap-y-1 xl:table-row-group">
          {loaderData.slektsnavn.map((slektsnavn) => (
            <tr
              key={slektsnavn.indeks}
              className="col-span-2 grid grid-cols-subgrid odd:bg-amber-100/75 even:bg-white/75 xl:table-row xl:space-y-0 xl:border-y xl:border-y-amber-300 xl:bg-transparent xl:p-0 xl:first:border-0 xl:last:border-0 xl:hover:bg-amber-500 dark:odd:bg-amber-900/75 dark:even:bg-amber-950/75 dark:xl:border-y-amber-700 dark:xl:hover:bg-amber-500"
            >
              <TD data-col={labels.forstaAar}>{slektsnavn.forstaAar}</TD>
              <TD data-col={labels.sistaAar}>{slektsnavn.sistaAar}</TD>
              <TD data-col={labels.finskSlekt}>{slektsnavn.finskSlekt}</TD>
              <TD data-col={labels.fornamn}>{slektsnavn.fornamn}</TD>
              <TD data-col={labels.patronym}>{slektsnavn.patronym}</TD>
              <TD data-col={labels.slektbelaegg}>{slektsnavn.slektbelaegg}</TD>
              <TD data-col={labels.ort}>{slektsnavn.ort}</TD>
              <TD data-col={labels.nuvarandeSocken}>
                {slektsnavn.nuvarandeSocken}
              </TD>
              <TD data-col={labels.laen}>{slektsnavn.laen}</TD>
              <TD data-col={labels.arkivkaella}>{slektsnavn.arkivkaella}</TD>
              <TD data-col={labels.kaellspecifikation}>
                {slektsnavn.kaellspecifikation}
              </TD>
              <TD data-col={labels.andrekaella}>{slektsnavn.andrekaella}</TD>
              <TD data-col={labels.kommentarer}>{slektsnavn.kommentarer}</TD>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination current={loaderData.currentPage} last={loaderData.lastPage} />
    </section>
  );
}

const labels = {
  forstaAar: "Första år",
  sistaAar: "Sista år",
  finskSlekt: "Finsk släkt",
  fornamn: "Förnamn",
  patronym: "Patronym",
  slektbelaegg: "Släktbelägg",
  ort: "Ort",
  nuvarandeSocken: "Nuv. socken",
  laen: "Län",
  arkivkaella: "Arkivkälla",
  kaellspecifikation: "Källspecifikation",
  andrekaella: "2:a källa",
  kommentarer: "Not",
};

function TH(props: React.PropsWithChildren) {
  return (
    <th className="sticky top-0 bg-amber-200 p-2 dark:bg-amber-800 ">
      {props.children}
    </th>
  );
}

type TDProps = React.ComponentProps<"td">;

function TD(props: TDProps) {
  return (
    <td
      className={twMerge(
        "grid p-0 xl:p-2 xl:table-cell col-span-2 grid-cols-subgrid xl:odd:bg-amber-100/75 dark:xl:odd:bg-amber-900/75 xl:even:bg-white/75 dark:xl:even:bg-amber-950/75 before:col-start-1 before:col-end-1 before:content-[attr(data-col)_':'] before:font-bold xl:before:hidden before:px-4 before:py-1 xl:before:p-0 before:bg-amber-200/50 dark:before:bg-amber-800/50",
        props.children ? "" : "hidden",
      )}
      {...props}
    >
      <span className="col-start-2 px-4 py-1 xl:p-0">{props.children}</span>
    </td>
  );
}

type PaginationLinkProps = React.ComponentProps<typeof Link>;

function PaginationLink({
  children,
  className,
  ...props
}: PaginationLinkProps) {
  return (
    <Link
      className={twMerge(
        "inline-block px-2 py-0.5 bg-amber-200 dark:bg-amber-900",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

type PaginationProps = {
  current: number;
  last: number;
};

function Pagination(props: PaginationProps) {
  const { current, last } = props;
  const previous = Array.from({ length: clamp(current - 1, 5) })
    .map((_, i) => current - i - 1)
    .reverse();
  const next = Array.from({ length: clamp(last - current, 5) }).map(
    (_, i) => current + i + 1,
  );
  return (
    <nav
      aria-label="Gå til side"
      className="my-4 flex grid-flow-row place-items-center gap-4 xl:grid xl:grid-cols-[auto_auto_1fr_auto_1fr_auto_auto_auto]"
    >
      <PaginationLink prefetch="intent" to="/">
        Første
      </PaginationLink>
      {current > 1 ? (
        <PaginationLink prefetch="intent" to={`?side=${current - 1}`}>
          Forrige
        </PaginationLink>
      ) : (
        <span className="hidden xl:inline" />
      )}
      <div className="hidden gap-4 justify-self-end xl:flex">
        {previous.map((num) => (
          <PaginationLink key={num} prefetch="intent" to={`?side=${num}`}>
            {num}
          </PaginationLink>
        ))}
      </div>
      <div className="text-center">Side {props.current}</div>
      <div className="hidden gap-4 justify-self-start xl:flex">
        {next.map((num) => (
          <PaginationLink key={num} prefetch="intent" to={`?side=${num}`}>
            {num}
          </PaginationLink>
        ))}
      </div>
      {current < last ? (
        <PaginationLink prefetch="intent" to={`?side=${current + 1}`}>
          Neste
        </PaginationLink>
      ) : (
        <span className="hidden xl:inline" />
      )}
      <PaginationLink
        prefetch="intent"
        to={`?side=${props.last}`}
        className="me-auto xl:m-0"
      >
        Siste
      </PaginationLink>
      <Form method="GET">
        Hopp til{" "}
        <input
          type="text"
          name="side"
          inputMode="numeric"
          pattern="\d*"
          placeholder={String(current)}
          className="w-[5ch] border border-amber-400 bg-amber-50 px-1 dark:border-amber-700 dark:bg-amber-950"
        />
      </Form>
    </nav>
  );
}
