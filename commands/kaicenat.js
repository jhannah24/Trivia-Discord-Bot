import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('kaicenat')
    .setDescription('Hear Kai Cenat hype you up!');

export async function execute(interaction) {
    const responses = [
        "YO CHAT! W'S IN THE CHAT!", 
        "WE GOING CRAZY! BIG W'S!", 
        "STOP PLAYIN' WITH ME! WE REALLY DO THIS!", 
        "IT'S UP! IT'S STUCK! WE NEVER COMIN' DOWN!", 
        "ON GAWD! THIS ENERGY DIFFERENT!", 
        "BING BONG! WHO WANT IT?!", 
        "AYO?! CHAT, WE LIT RIGHT NOW!", 
        "MAMA, WE MADE IT!", 
        "LOCK IN BEFORE I TWEAK OUT!", 
        "BIG W'S ONLY! NO L'S IN SIGHT!", 
        "I AIN'T GONNA LIE, THIS DIFFERENT!", 
        "WE TOO TURNT! WHO STOPPIN' US?!", 
        "CHAT, WE REALLY LIKE THAT!", 
        "DON'T GET CAUGHT LACKIN'!", 
        "BRO, THIS IS A MOVIE!", 
        "WE GLOBAL WITH IT NOW!", 
        "Y'ALL SEE THIS? WE REALLY HIM!", 
        "HOLD UP, HOLD UP, WE NOT DONE!", 
        "NAHH THIS TOO CRAZY!", 
        "CHAT, WE UP NEXT!", 
        "I TOLD Y'ALL! MANIFESTATION IS REAL!", 
        "WE BREAKIN' THE INTERNET!", 
        "I'M HIM! YOU'RE HIM! WE ALL HIM!", 
        "BRO, WE GOING VIRAL!", 
        "WE STACKING THESE W'S BACK TO BACK!", 
        "WE RUNNING THIS WHOLE THING!", 
        "GIVE ME MY FLOWERS NOW!", 
        "SAY IT WITH YA CHEST!", 
        "I FEEL LIKE A SUPERHERO RIGHT NOW!", 
        "SOMEONE CLIP THAT! THAT WAS WILD!", 
        "CHAT, WE WINNING ALL YEAR LONG!",
        "IM FROM THE BRONX",
        "YUUUUR"
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    await interaction.reply(randomResponse);
}
