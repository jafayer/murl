import { MURL } from "../src";

describe("Path appends", () => {
    it("should append a path to the URL", () => {
        const url = new MURL("https://example.com");
        expect(url.to("path").toString()).toBe("https://example.com/path");
    });

    it("should append a path to the URL with a trailing slash", () => {
        const url = new MURL("https://example.com/");
        expect(url.to("path").toString()).toBe("https://example.com/path");
    });

    it("should append a path to the URL with a leading slash", () => {
        const url = new MURL("https://example.com");
        expect(url.to("/path").toString()).toBe("https://example.com/path");
    });

    it("should append a path to the URL with a leading and trailing slash", () => {
        const url = new MURL("https://example.com/");
        expect(url.to("/path/").toString()).toBe("https://example.com/path");
    });

    it("should append a path to the URL with a leading and trailing slash", () => {
        const url = new MURL("https://example.com/");
        expect(url.to("/path").toString()).toBe("https://example.com/path");
    });

    it("should append a path to the URL with multiple slashes", () => {
        const url = new MURL("https://example.com");
        expect(url.to("path//path").toString()).toBe("https://example.com/path/path");
    });

    it("should append a path to the URL with a query string", () => {
        const url = new MURL("https://example.com?param1=value1");
        expect(url.to("path").toString()).toBe("https://example.com/path?param1=value1");
    });

    it("should append a path to the URL with a query string and a fragment identifier", () => {
        const url = new MURL("https://example.com?param1=value1#section");
        expect(url.to("path").toString()).toBe("https://example.com/path?param1=value1#section");
    });

    it("should append a path to the URL with a query string and a fragment identifier and a trailing slash", () => {
        const url = new MURL("https://example.com?param1=value1#section").setOption({ trailingSlash: false });
        expect(url.to("path/").toString()).toBe("https://example.com/path?param1=value1#section");
    });

    it("should append a path to the URL with a query string and a fragment identifier and a trailing slash", () => {
        const url = new MURL("https://example.com?param1=value1#section").setOption({ trailingSlash: true });
        
        expect(url.to("path/").toString()).toBe("https://example.com/path/?param1=value1#section");
    });
})