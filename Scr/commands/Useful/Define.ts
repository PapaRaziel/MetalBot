import { Message } from 'gamejolt.js';
import { Command, Permissions, Util } from 'gamejolt-bot';

import * as urban from 'urban';
import * as profanity from 'profanity-util';

export default class extends Command {
    public constructor() {
        super({
            name: 'define',
            description: 'Define a word or phrase.',
            usage: '<prefix> define <word>',
            type: 'useful',
            aliases: ['urban'],
            rateLimit: [ 2, 10 * 100 * 30  ]
        });
    }

    public async invoke(message: Message, [word]: [string]): Promise<void> {

        if (!word) return message.reply('You must provide a word to define');

        let replacements: string[] = [
            'Shrimp',
            'Whale',
            'Barnacles',
            'Barnacle-head',
            'Fishpaste',
            '*Dolphin noises*',
            'Tartar sauce'
        ]

        let search = word.trim().toLowerCase();

        if (await this._redis.get(`dictionary::${search}`)) {
            let definition: string = Util.truncate(255, await this._redis.get(`dictionary::${search}`));
            return message.reply(`${word}: ${profanity.purify(definition, { replace: true, replacementsList: replacements })[0]}`);
        }

        const define = urban(word);

        define.first((json) => {
            if (json) {
                let definition: string = Util.truncate(255, json.definition);
                return message.reply(`${word}: ${profanity.purify(definition, { replace: true, replacementsList: replacements })[0]}`);
            } else {
                return message.reply(`Could not define this.`);
            }
        });
    }
}
