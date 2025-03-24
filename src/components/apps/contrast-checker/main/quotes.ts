export const quotes = [
    {
        quote: "A man who sleeps with a machete by his side is a fool on all nights but one",
        by: "James May"
    },
    {
        quote: "Fool me once, shame on you. Fool me twice, shame on you. Fool me 17 times, still shame on you RCB",
        by: "Virat Kohli"
    },
    {
        quote: "Did you know that you have rights? The Constitution says you do !",
        by: "Jimmy McGill"
    },
    {
        quote: "Blue, Yellow, Pink, keep bringing it. We're gonna check contrast for a lot of colours together",
        by: "Tuco Salamanca (Probably)"
    },
    {
        quote: "I am Groot",
        by: "Darth Vader"
    },
    {
        quote: "I am Groot",
        by: "Optimus Prime"
    },
    {
        quote: "Have some more chicken, Have some more pie. It doesn't matter if it's boiled or fried",
        by: "Charles McGill"
    },
    {
        quote: "Somehow Palpatine returned",
        by: "Disney"
    },
    {
        quote: "Twice a year, I spend time with my grandmother in France. I'm trying to get in her will",
        by: "Tatsuki Fujimoto"
    },
    {
        quote: "I went to an art school where there were a lot of good artists. I decided if I didnt get better than them in four years, I'll kill them all. Since I didn't want to go on the run if I was a good artist, I kept drawing",
        by: "Tatsuki Fujimoto"
    },
    // {
    //     quote: "My soldiers scream, My soldiers rage",
    //     by: "Jotaro Kujo"
    // },
    // {
    //     quote: "Wrrrriiiii",
    //     by: "Dio Brando"
    // },
    // {
    //     quote: "Arrividerci",
    //     by: "Bruno Bucciaratti"
    // },
    {
        quote: "~ We're vibing like crazy ~. I can assure you my mother is not a vibrator",
        by: "Raymond Holt"
    },
    {
        quote: "When life gives you lemonade, make lemons. Life will be all - Whaaat ?",
        by: "Phil Dunphy"
    },
    {
        quote: "Watch a sunrise atleast once a day",
        by: "Phil Dunphy"
    },
    {
        quote: "Success is 1% inspiration, 98% perspiration and 2% attention to detail",
        by: "Phil Dunphy"
    },
    {
        quote: "Dance until your feet hurt, sing until your lungs hurt, act until you're William Hurt",
        by: "Phil Dunphy"
    },


    {
        quote: "If poor people knew how rich rich people are, there would be riots in the streets",
        by: "Chris Rock"
    },
    {
        quote: "Call me crazy, but if I threw a party and a bunch of nazis showed up, it might inspire a little self inspection",
        by: "Anthony Bourdain"
    },
    {
        quote: "Tell people there's an invisible man in the sky who created the universe, and the vast majority will believe you. Tell them the paint is wet, and they have to touch it to be sure." ,
        by: "George Carlin"
    },
    {
        quote: "Never make fun of someone if they mispronounce a word. It means they learned it by reading",
        by: "Unknown"
    },

]

/** */
export function getRandomQuote() {
    const buffer = new Uint32Array(1);
    crypto.getRandomValues(buffer);
    
    const index = buffer[0] % quotes.length;
    return structuredClone(quotes[index]);
}