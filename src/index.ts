import path from 'path';
import querystring from 'querystring';
import { URL, resolve } from 'url';

export interface MURLOptions {
  trailingSlash?: boolean;
  lowercase?: boolean;
}


export class MURL {
  private url: URL;
  private options: MURLOptions = {
    trailingSlash: false,
  };
  private routeParams: string[] = [];

  constructor(url: string) {
    this.url = new URL(url);
    const routeParams = this.url.pathname.match(/:([^/]+)/g);


    // Extract route params
    this.routeParams = this.url.pathname.match(/:([^/]+)/g) || [];
  }

  static fromString(url: string): MURL {
    return new MURL(url);
  }

  set(path: string): MURL {
    const copy = this.copy();
    copy.url.pathname = path;
    return copy;
  }

  to(urlPath: string): MURL {
    const copy = this.copy();
    copy.url.pathname = path.join(this.url.pathname, urlPath);
    return copy;
  }

  resolve(key: string, value: string): MURL {
    const copy = this.copy();
    const escapedkey = key.replace(/[.*+?^${}()|\[\]\\]/g, '\\$&');
    copy.url.pathname = copy.url.pathname.replace(new RegExp(`:${escapedkey}`, 'g'), value);
    return copy;
  }

  setQuery(query: Record<string, string>): MURL {
    const copy = this.copy();
    // Use querystring.stringify to create the query string without the '?' prefix
    const queryString = querystring.stringify(query);
    // Directly assign the query string to copy.url.search, which should not include the '?' prefix
    // The URL class will automatically handle the correct placement of '?'
    copy.url.search = queryString;
    return copy;
  }

  addQuery(query: Record<string, string>): MURL {
    const copy = this.copy();
    for (const [key, value] of Object.entries(query)) {
      copy.url.searchParams.set(key, value);
    }

    return copy;
  }

  rmQuery(key: string): MURL {
    const copy = this.copy();
    copy.url.searchParams.delete(key);
    return copy;
  }

  resolveQuery(key: string, value: string): MURL {
    const copy = this.copy();
    copy.url.searchParams.set(key, value);

    return copy;
  }

  setOption(options: Partial<MURLOptions>): MURL {
    const copy = this.copy();
    copy.options = { ...this.options, ...options };
    return copy;
  }

  toString(): string {
    console.log(this.url.pathname);
    return this.applySlashPreference().applyLowercasePreference().url.toString();
  }

  /**
   * Returns all dynamic parameters in the url path
   */
  params() {
    const matches = this.url.pathname.match(/:([^/]+)/g);
    return matches ? matches.map((match) => match.slice(1)) : [];
  }

  private applySlashPreference() {
    const copy = this.copy();
    if (copy.options.trailingSlash) {
      if (!copy.url.pathname.endsWith('/')) {
        copy.url.pathname += '/';
      }
    } else {
      if (copy.url.pathname.endsWith('/') && copy.url.pathname.length > 1) {
        copy.url.pathname = copy.url.pathname.slice(0, -1);
      }
    }

    return copy;
  }

  private applyLowercasePreference() {
    const copy = this.copy();
    if (this.options.lowercase) {
      copy.url.pathname = copy.url.pathname.toLowerCase();
      copy.url.search = copy.url.search.toLowerCase();
      copy.url.hash = copy.url.hash.toLowerCase();
      copy.url.host = copy.url.host.toLowerCase();
      copy.url.protocol = copy.url.protocol
        .toLowerCase();
    }

    return copy;
  }

  private copy(): MURL {
    return new MURL(this.url.toString());
  }
}

export function url(url: string): MURL {
  return new MURL(url);
}