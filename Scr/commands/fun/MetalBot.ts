import { Message } from 'gamejolt.js';
import { Command, Permissions } from 'gamejolt-bot';

import * as eyes from '../../data/MetalEyes';

export default class extends Command {
    public constructor() {
        super({
            name: 'MetalBot',
            description: 'Generate a cute face.',
            usage: '<prefix> Metal x[number]',
            type: 'fun',
            rateLimit: [2, 10 * 100 * 60]
        });
    }

    public async invoke(message: Message, [size]: [string]): Promise<void> {

        const min: number = 5;
        const max: number = 25;

        let tooSmall = [
            `You call that a Metalhead?`,
            `Hahaha are you even trying?`,
            `What is this a centre for ants!!`
        ]

        let tooBig = [
            'Whoa, this will be spam man.',
            'I know metalheads look evil, but let\'s not make them too cute.',
            'This metalhead is too cute for me.'
        ]

        let metalSize: number = 5;
        
        if (size)
            metalSize = parseInt(/x(\d+)/g.exec(size)[1]);

        if (isNaN(whaleSize))
            metalSize = 5;

        if (metalSize < min)
            return message.reply(tooSmall[Math.floor(Math.random() * tooSmall.length)]);

        if (metalSize > max)
            return message.reply(tooBig[Math.floor(Math.random() * tooBig.length)]);
        
        let metal: string = '';
        let metalEyes: string[] = eyes.default[Math.floor(Math.random() * eyes.default.length)];

        metal += metalEyes[0];

        for (let i = 0; i < metalSize; i++) {
            whale += '\\_';
        }       
        metal += metalEyes[1];

        return message.reply(MetalRocks);
    }
}
