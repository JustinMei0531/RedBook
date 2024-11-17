export function formatPhone(phone: string): string {
    let trim:string = phone.replace(/\s+/g, '');

    const result: string[] = [
        trim.slice(0, 3),
        trim.slice(3, 7),
        trim.slice(7, 11),
    ];

    return result.filter((item: string) => !!item).join(' ');
}

export function replaceBlack(text: string): string {
    let result = "";
    for (let ch of text){
        if (ch !== ' '){
            result += ch;
        }
    }
    return result;
}

export function showAsterisk(text: string): string {

    return text.replaceAll(/./g, '*');
}
