import {
  CommandInteraction,
  ApplicationCommandType,
  EmbedBuilder,
  ActivityType,
  ApplicationCommandOptionType,
  ChatInputApplicationCommandData,
} from "discord.js";
import { ICommand } from "@interfaces/ICommand";
import { KristyCommandConfig } from "@src/types/KristyCommandConfigType";
import Bot from "@src/Bot";
import { PrinterColors } from "@src/libs/Printer";

export default class BotCommand implements ICommand {
  public readonly discord: ChatInputApplicationCommandData = {
    name: "sleep",
    description: "Good night…",
    type: ApplicationCommandType.ChatInput,
    options: [
      {
        name: "reason",
        description: "Reason…",
        nameLocalizations: { ru: "причина" },
        descriptionLocalizations: { ru: "Причина…" },
        type: ApplicationCommandOptionType.String,
        required: false,
        choices: [
          {
            name: "Shutdown",
            value: "shutdown",
            nameLocalizations: { ru: "Выключение" },
          },
          {
            name: "Reload",
            value: "reload",
            nameLocalizations: { ru: "Перезагрузка" },
          },
          {
            name: "Update",
            value: "update",
            nameLocalizations: { ru: "Обновление" },
          },
        ],
      },
    ],
  };
  public readonly kristy?: KristyCommandConfig = {
    commandType: "guild",
  };
  private bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  public async action(interaction: CommandInteraction) {
    const client = this.bot.client;

    const content = new EmbedBuilder()
      .setColor("#df7f7f")
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.avatarURL() || undefined,
      })
      .setTitle((client.user?.username || "Kristy") + " ложится спать…")
      .setDescription("Она устала…")
      .setThumbnail(client.user?.avatarURL() || null);

    if (interaction.user.id != process.env.AUTHOR_DISCORD_ID) {
      await interaction.reply({
        content: `Ты не похож на <@${process.env.AUTHOR_DISCORD_ID}>! Уйди!!!`,
      });

      return;
    }

    await interaction.reply({
      ephemeral: true,
      embeds: [content],
    });

    let exitSeconds = 30;
    this.bot.printer.print(
      `бот выключится через ${exitSeconds} секунд! (${interaction.options.data.find((el) => el.name === "reason")?.value ?? "Без причины"})`,
      PrinterColors.primary,
    );

    const destroyClient = async () => {
      await client.user?.setActivity(`🚫 Отключусь прямо сейчас`, {
        type: ActivityType.Custom,
      });
      await this.bot.destroy();
      this.bot.printer.print("клиент уничтожен!", PrinterColors.success);

      clearInterval(interval);
    };

    const interval = setInterval(async () => {
      if (exitSeconds <= 0) {
        destroyClient();
      }

      client.user?.setActivity(
        `🚫 Отключусь через ${exitSeconds} секунд (r: ${interaction.options.data.find((el) => el.name === "reason")?.value ?? "no"})`,
        {
          type: ActivityType.Custom,
        },
      );

      exitSeconds -= 5;
    }, 5000);
  }
}
