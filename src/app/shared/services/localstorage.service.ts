import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

    constructor() {}

    //  GENERIC METHODS:
    //  Set value:
    static setValue(key, value): any {
        localStorage.setItem(key, value);
    }

    //  Set Collection of type 'contentType':
    static setCollection(contentType: string, data: any): void {
        localStorage.setItem('wtData_' + contentType, JSON.stringify(data));
    }

    //  Get value:
    static getValue(key): any {
        return localStorage.getItem(key);
    }

    //  Get Collection of type 'contentType':
    static getCollectionByContentType(contentType: string): any {
        let data = localStorage.getItem('wtData_' + contentType);
        if (data) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    //  Get Object of type 'contentType' by ID:
    getObjectById(contentType: string, id: number): any {
        let data = localStorage.getItem('wtData_' + contentType);
        let jsonData = JSON.parse(data);
        let selectedObj = null;
        jsonData.forEach( (obj: any) => {
            if (obj.id.toString() === id.toString()) {
                selectedObj = obj;
            }
        });
        //  No result found => return null:
        return (selectedObj) ? selectedObj : null;
    }

    //  Get Object of type 'contentType' by property value:
    getObjectByPropertyValue(contentType: string, property: string, value: any): any {
        let data = localStorage.getItem('wtData_' + contentType);
        let jsonData = JSON.parse(data);
        let selectedObj = null;
        jsonData.forEach( (obj: any) => {
            if (obj[property]) {
                if (obj[property].toString() === value.toString()) {
                    selectedObj = obj;
                }
            }
        });
        //  Return result:
        return (selectedObj) ? selectedObj : null;
    }

    //  Get Object Array of type 'contentType' by property value:
    getObjectArrayByPropertyValue(contentType: string, property: string, value: any): any {
        let data = localStorage.getItem('wtData_' + contentType);
        let jsonData = JSON.parse(data);
        let selectedObjs = [];
        jsonData.forEach( (obj: any) => {
            if (obj[property]) {
                if (obj[property].toString() === value.toString()) {
                    selectedObjs.push(obj);
                }
            }
        });
        //  Return result:
        return (selectedObjs.length > 0) ? selectedObjs : [];
    }

    //  Get Object Array of type 'contentType' by property value from Array:
    getObjectArrayByPropertyValueFromArray(contentType: string, property: string, value: any): any {
        let data = localStorage.getItem('wtData_' + contentType);
        let jsonData = JSON.parse(data);
        let selectedObjs = [];
        jsonData.forEach( (obj: any) => {
            if (obj[property]) {
                if (obj[property].includes(value)) {
                    selectedObjs.push(obj);
                }
            }
        });
        //  Return result:
        return (selectedObjs.length > 0) ? selectedObjs : [];
    }
}
