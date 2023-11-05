import { printLog, randomIntFromInterval } from "../Bot";
import { Client } from "discord.js";
import dotenv from 'dotenv';
import { printLogColorType } from "./console";

dotenv.config();

type keyString = {
    key: string,
    value: string,
}


export default (type: string, str: string, c: Client): string => {
    // "kr_" + keys[value] = "<rk_value>"
    const keysToString: Array<keyString> = [
        {
            key: "frm_code",
            value: "```"
        },
        {
            key: "frm_aa",
            value: "``"
        },
        {
            key: "frm_a",
            value: "`"
        },
        {
            key: "frm_bold",
            value: "**"
        },
        {
            key: "bot_author",
            value: process.env.AUTHOR || "<kr_err>"
        },
        {
            key: "bot_version_status",
            value: process.env.BOT_VERSION_STATUS || "<kr_err>"
        },
        {
            key: "bot_version",
            value: process.env.BOT_VERSION || "<kr_err>"
        },
        {
            key: "bot_guild_invite_url",
            value: process.env.BOT_GUILD_INVITE_URL || "<kr_err>"
        },
        {
            key: "f_rnd_server",
            value: c.guilds.cache.at(randomIntFromInterval(0, c.guilds.cache.size))?.name || "<kr_err>"
        },
        {
            key: "f_servers_count",
            value: c.guilds.cache.size.toString() || "<kr_err>"
        },
    ]

    const krCodeToStringTranslator = (text: string) => {
        keysToString.forEach(e => {
            text = text.replaceAll(`<kr_${e.key}>`, e.value);
        })

        return text;
    }
    const stringToKrCodeTranslator = (text: string) => {
        return text;
    }

    if (type == "KrCodeToString") {
        return krCodeToStringTranslator(str);
    } else if (type == "StringToKrCode") {
        return stringToKrCodeTranslator(str);
    }

    printLog(`Неизвестный тип ${type}`, printLogColorType.getError());

    return str;
}