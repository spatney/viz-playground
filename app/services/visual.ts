import { Injectable } from '@angular/core';

export interface VisualItem {
    name: string;
    displayName;
}

const Endpoint = '../../mockLoader/visuals.json';

@Injectable()
export class VisualService {
    private getJSON(url) {
        let promise = new Promise<VisualItem[]>((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.open('get', url, true);
            xhr.responseType = 'json';
            xhr.onload = () => {
                let status = xhr.status;
                if (status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(status);
                }
            };
            xhr.send();
        });

        return promise;
    };

    public getVisuals() {
        return this.getJSON(Endpoint);
    }
}