export const getCourse = () => {
    const url = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';
    return fetch(url)
        .then((response) => response.json());
}