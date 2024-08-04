import { MessageListener } from "@listeners/DiscordListener";
import { Events, Message, PermissionsBitField, TextChannel } from "discord.js";
import Bot from "@src/Bot";
import { IMessageListener } from "@src/interfaces/IMessageListener";

export default class MessageCreateListener
  extends MessageListener
  implements IMessageListener
{
  protected bot: Bot;
  public event = Events.MessageCreate;
  public action = async (message: Message): Promise<void> => {
    if (!this.bot.client.user?.id) return;

    const botPermissions = (message.channel as TextChannel).permissionsFor(
      this.bot.client.user?.id,
    );

    if (
      botPermissions?.has([
        PermissionsBitField.Flags.SendMessages,
        PermissionsBitField.Flags.SendMessagesInThreads,
      ])
    ) {
      if (message.mentions.has(this.bot.client.user?.id)) {
        setTimeout(() => message.reply(`Я тебя не понимаю.`), 1000);

        message.channel?.sendTyping();
      }
    }
  };

  constructor(bot: Bot) {
    super(bot);
    this.bot = bot;
  }
}