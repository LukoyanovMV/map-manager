class ModLoader {

    static version = '0.0.1';

    constructor() {

        this.scripts = {};
    }

    loadOne(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            const target = document.getElementsByTagName("script")[0];

            script.type = "text/javascript";
            script.async = true;

            script.onload = script.onreadystatechange = () => {
                if (!this.readyState || this.readyState === "complete") {
                    this.scripts[url] = {
                        loaded: true,
                        script: script
                    };
                    resolve(this.scripts[url]);
                }
            };

            script.onerror = script.onabort = () => {
                this.scripts[url] = {
                    loaded: true,
                    script: script
                };
                reject(this.scripts[url]);
            };

            script.src = url;

            target.parentNode.insertBefore(script, target);
        });
    }

    load(urls) {
        let _urls;
        let promises = [];

        if (!Array.isArray(urls)) {
            _urls = [urls];
        } else {
            _urls = urls;
        }

        _urls.forEach((url) => {
            promises.push(this.loadOne(url))
        });

        return Promise.all(promises);
    }
}

export default ModLoader;