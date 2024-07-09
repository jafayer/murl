import { MURL } from "../src";

describe("Query appends", () => {
    it("should append a query to the URL", () => {
        const url = new MURL("https://example.com");
        expect(url.addQuery({ param1: "value1" }).toString()).toBe("https://example.com/?param1=value1");
    });

    it("should append a query to the URL with an existing query", () => {
        const url = new MURL("https://example.com?param1=value1");
        expect(url.addQuery({ param2: "value2" }).toString()).toBe("https://example.com/?param1=value1&param2=value2");
    });

    it("should append a query to the URL with an existing query and a fragment identifier", () => {
        const url = new MURL("https://example.com?param1=value1#section");
        expect(url.addQuery({ param2: "value2" }).toString()).toBe("https://example.com/?param1=value1&param2=value2#section");
    });

    it("should override a query parameter", () => {
        const url = new MURL("https://example.com?param1=value1");
        expect(url.addQuery({ param1: "value2" }).toString()).toBe("https://example.com/?param1=value2");
    });

    it("should remove a query parameter", () => {
        const url = new MURL("https://example.com?param1=value1");
        expect(url.rmQuery("param1").toString()).toBe("https://example.com/");
    });

    it("should resolve a query parameter", () => {
        const url = new MURL("https://example.com?param1=value1");
        expect(url.resolveQuery("param1", "value2").toString()).toBe("https://example.com/?param1=value2");
    });

    it("should resolve a query parameter that does not exist", () => {
        const url = new MURL("https://example.com");
        expect(url.resolveQuery("param1", "value2").toString()).toBe("https://example.com/?param1=value2");
    });

    it("should resolve a query parameter with an existing query", () => {
        const url = new MURL("https://example.com?param1=value1");
        expect(url.resolveQuery("param2", "value2").toString()).toBe("https://example.com/?param1=value1&param2=value2");
    });

    it("should resolve a query parameter with an existing query and a fragment identifier", () => {
        const url = new MURL("https://example.com?param1=value1#section");
        expect(url.resolveQuery("param2", "value2").toString()).toBe("https://example.com/?param1=value1&param2=value2#section");
    });

    it("should resolve a query parameter with an existing query and a fragment identifier with a query parameter", () => {
        const url = new MURL("https://example.com?param1=value1#section");
        expect(url.resolveQuery("param1", "value2").toString()).toBe("https://example.com/?param1=value2#section");
    });

    it("should resolve a query parameter with an existing query and a fragment identifier with a query parameter and a fragment identifier", () => {
        const url = new MURL("https://example.com?param1=value1#section1");
        expect(url.resolveQuery("param1", "value2").toString()).toBe("https://example.com/?param1=value2#section1");
    });

});