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
    const pokemons = resp_json.results;

    return ctx.render(pokemons);
  },
};

export default function Home({ data }: PageProps<[Pokemon] | null>) {
  if (!data) {
    return <h1>Pokemon not found</h1>;
  }

  const pok_content = data
    .sort((pok_a, pok_b) => pok_a.name.localeCompare(pok_b.name))
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
