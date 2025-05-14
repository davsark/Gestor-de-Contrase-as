export const generateRandomUsername = (length = 8): string => {
    const adjectives: string[] = [
        "Quick",
        "Fast",
        "Swift",
        "Nimble",
        "Agile",
        "Lucky",
        "Happy",
        "Clever",
        "Rapid",
        "Dynamic",
        "Brilliant",
        "Clever",
        "Rapid",
        "Dynamic",
        "Brilliant",
    ];
    const nouns: string[] = [
        "Fox",
        "Dog",
        "Cat",
        "Bird",
        "Fish",
        "Tiger",
        "Lion",
        "Bear",
        "Wolf",
        "Fox",
        "Dog",
        "Hawk",
        "Eagle",
        "Falcon",
        "Puma",
        "Panther",
        "Jaguar",
        "Leopard",
    ];
    
    const randomItem = (array: string[]) => 
        array[Math.floor(Math.random() * array.length)];

    let username = ""

    username += randomItem(adjectives)
    username += randomItem(nouns)
    username += Math.floor(Math.random() * 10000)

    if(username.length > length){
        username = username.substring(0, length);
    }

    return username;
};
