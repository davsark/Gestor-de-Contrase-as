import { generateRandomUsername } from "./generateRandomUser";

export const generateRandomEmail = () => {
    const domains = [
        "gmail.com", 
    ];
    const username = generateRandomUsername(8);
    const domain = domains[Math.floor(Math.random() * domains.length)];

    return `${username.toLowerCase()}@${domain}`;
}