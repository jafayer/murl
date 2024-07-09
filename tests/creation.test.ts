import { MURL } from "../src";

describe("Creation", () => {
    test("Create a new MURL object with a path", () => {
        const url = new MURL("https://example.com/path");
        expect(url.toString()).toBe("https://example.com/path");
    });

    test("Create a new MURL object with query parameters", () => {
        const url = new MURL("https://example.com?param1=value1&param2=value2");
        expect(url.toString()).toBe("https://example.com/?param1=value1&param2=value2");
    });

    test("Create a new MURL object with a fragment identifier", () => {
        const url = new MURL("https://example.com#section");
        expect(url.toString()).toBe("https://example.com/#section");
    });

    test("Create a new MURL object with a username and password", () => {
        const url = new MURL("https://username:password@example.com");
        expect(url.toString()).toBe("https://username:password@example.com/");
    });

    test("Create a new MURL object with a port number", () => {
        const url = new MURL("https://example.com:8080");
        expect(url.toString()).toBe("https://example.com:8080/");
    });

    test("Create a new MURL object with a path, query parameters, and a fragment identifier", () => {
        const url = new MURL("https://example.com/path?param1=value1&param2=value2#section");
        expect(url.toString()).toBe("https://example.com/path?param1=value1&param2=value2#section");
    });
});