/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <div>
        <h1>Fresh Example here:</h1>
        <img
          src="/logo.svg"
          height="100px"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p class={tw`my-6`}>
          Welcome to `fresh`. Try update this message in the ./routes/index.tsx
          file, and refresh.
        </p>
        <Counter start={3} />
      </div>
      <div>
        <h1>
          Pokemon found here:{" "}
          <a class={tw`text-blue-500`} href={`pokemon`}>
            <span>poke</span>
            <span class={tw`text-red-500`}>mon</span>
          </a>
        </h1>
      </div>
    </div>
  );
}
