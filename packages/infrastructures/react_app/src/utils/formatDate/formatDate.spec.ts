import {formatDate} from "./formatDate";

describe("test formatDate", () => {
    beforeAll(async () => {
        Object.defineProperty(window.navigator, 'language', { value: 'fr-FR' });
    });

    it.each([
        { type: 'undefined', date: undefined, expected: new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'numeric', day: 'numeric' }) },
        { type: 'date', date: new Date('2023-01-01'), expected: new Date('2023-01-01').toLocaleDateString('fr-FR', { year: 'numeric', month: 'numeric', day: 'numeric' }) },
        { type: 'date', date: new Date('2023-12-31'), expected: new Date('2023-12-31').toLocaleDateString('fr-FR', { year: 'numeric', month: 'numeric', day: 'numeric' }) },
        { type: 'date', date: new Date('2024-06-15'), expected: new Date('2024-06-15').toLocaleDateString('fr-FR', { year: 'numeric', month: 'numeric', day: 'numeric' }) },
    ])('should return for date $date correct format date $expected', ({ date, expected }) => {
        expect(formatDate(date)).toBe(expected);
    });
})