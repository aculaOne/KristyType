import { Printer } from "@src/libs/Printer";
import todos from "@src/todos";
import fs from "fs";
import path from "path";

export default function () {
  const pr = new Printer("TODO LIST", "");

  new Printer(":\\ (-_-) /", " :\\ (-_-) /:").print("Добро пожаловать!");

  fs.readFile(path.join(__dirname, "../changelog.txt"), "utf8", (e, d) => {
    if (e instanceof Error) return;
    new Printer("KRISTY").notify(d);
  });

  todos.forEach((t) => {
    pr.print(
      `${t.steps ? "[" + t.steps?.join("/") + "] " : ""}${t.name} – ${t.description}`,
      t.color,
    );
  });
}
