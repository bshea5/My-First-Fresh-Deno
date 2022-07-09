/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";

interface Pokemon {
  name: string;
  url: string;
}

export const handler: Handlers<Pokemon | null> = {
  async GET(_, ctx) {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`);

    if (resp.status === 404) {
      return ctx.render(null);
    }
    const resp_json = await resp.json();
    const pok = resp_json.results;

    return ctx.render(pok);
  },
};

export default function Home({ data }: PageProps<[Pokemon] | null>) {
  if (!data) {
    return <h1>Pokemon not found</h1>;
  }

  const pok_content = data
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((pok) => (
      <div>
        <h1>
          <a href={`http://localhost:8000/pokemon/${pok.name}`}>{pok.name}</a>
        </h1>
      </div>
    ));

  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <div>{pok_content}</div>
    </div>
  );
}
