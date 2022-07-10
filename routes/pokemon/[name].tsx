/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
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

interface Type {
  name: string;
  url: string;
}

interface TypeSlot {
  slot: number;
  type: Type;
}

interface Pokemon {
  order: number;
  name: string;
  sprites: Sprites;
  types: Array<TypeSlot>;
}

export const handler: Handlers<Pokemon | null> = {
  async GET(_, ctx) {
    const { name } = ctx.params;
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

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

  const { name, order, types } = data;
  const types_view = types.map((types) => (
    // [TODO] Color code element types, E.G. Fire -> text-red
    <div class={tw`text-blue-500 dark:text-blue-400`}>{types.type.name}</div>
  ));

  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <figure
        class={tw`md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800`}
      >
        <img
          class={tw`w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto`}
          src={data.sprites.front_default}
          alt="UNKNOWN"
          width="384"
          height="512"
        />
        <div class={tw`pt-6 md:p-8 text-center md:text-left space-y-4`}>
          <blockquote>
            <p class={tw`text-lg font-medium`}>{name}</p>
          </blockquote>
          <figcaption class={tw`font-medium`}>
            {types_view}
            <div class={tw`text-slate-700 dark:text-slate-500`}>{order}</div>
          </figcaption>
          <div>
            <a class={tw`bg-red-200 ...`} href="../pokemon">
              Back
            </a>
          </div>
        </div>
      </figure>
    </div>

    // <div class={tw`p-4 mx-auto max-w-screen-md`}>
    //   <img
    //     src={data.sprites.front_default}
    //     class={tw`w-128 h-128 rounded-full`}
    //   />
    //   <h1>{data.name}</h1>
    //   <p>{data.order}</p>
    //   <br />
    //   <a class={tw`bg-red-200 ...`} href="../pokemon">
    //     Back
    //   </a>
    // </div>
  );
}
