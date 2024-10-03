export function toBanglaNumber(englishInteger: number) {
    return englishInteger
        .toString()
        .replace(/0|1|2|3|4|5|6|7|8|9/g, (match) => {
            return '০১২৩৪৫৬৭৮৯'[parseInt(match, 10)];
        });
}
