import {
  CommandInteraction,
  ApplicationCommandType,
  ChatInputApplicationCommandData,
  AttachmentBuilder,
} from "discord.js";
import { ICommand } from "@interfaces/ICommand";
import { KristyCommandConfig } from "@src/types/KristyCommandConfigType";
import Bot from "@src/Bot";
import { randomIntFromInterval } from "@src/utils/randomIntFromInterval";
import { createCanvas } from "canvas";

const words: string[] = [
  "Солнышко",
  "Молодец",
  "Умничка",
  "Ранняя пташка",
  "Талантливый ребёнок",
  "Ничего страшного",
  "Мой человечек",
  "Любимый пользователь",
  "Звёздочка моя",
  "Всё будет хорошо",
  "Ты прекрасна, как природа",
  "Стойкий, как скала",
];

export default class EncourageCommand implements ICommand {
  public readonly discord: ChatInputApplicationCommandData = {
    name: "encourage",
    description: "Returns encourage.",
    type: ApplicationCommandType.ChatInput,
  };
  public readonly kristy: KristyCommandConfig = {
    commandType: "global",
  };
  private bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  private drawRes(str: string) {
    const canvas = createCanvas(800, 100);
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(
      canvas.width / 2,
      0,
      canvas.width / 2,
      canvas.height,
    );
    gradient.addColorStop(0, "#8E369B");
    gradient.addColorStop(1, "#FF5147");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let fontSize = 50;
    ctx.font = fontSize + "px 'Rubik Mono One'";
    let text = ctx.measureText(str);
    while (text.width >= canvas.width - 60) {
      fontSize--;
      ctx.font = fontSize + "px 'Rubik Mono One'";
      text = ctx.measureText(str);
    }
    ctx.font = `${fontSize}px 'Rubik Mono One'`;
    text = ctx.measureText(str);

    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(
      str,
      canvas.width / 2 - text.width / 2,
      canvas.height / 2 + text.actualBoundingBoxAscent / 2,
    );

    return canvas.toBuffer();
  }

  public async action(interaction: CommandInteraction) {
    const result = words[randomIntFromInterval(0, words.length - 1)];

    const bf = this.drawRes(result);

    await interaction.reply({
      ephemeral: true,
      files: [new AttachmentBuilder(bf, { name: "image.png" })],
    });
  }
}