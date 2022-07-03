/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";

interface Sprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

interface Pokemon {
  order: number;
  name: string;
  sprites: Sprites;
}

export const handler: Handlers<Pokemon | null> = {
  async GET(_, ctx) {
    const { name } = ctx.params;
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    console.log(resp);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const pok: Pokemon = await resp.json();

    return ctx.render(pok);
  },
};

export default function Page({ data }: PageProps<Pokemon | null>) {
  if (!data) {
    return <h1>Pokemon not found</h1>;
  }

  return (
    <div>
      <img src={data.sprites.front_default} width={64} height={64} />
      <h1>{data.name}</h1>
      <p>{data.order}</p>
    </div>
  );
}
