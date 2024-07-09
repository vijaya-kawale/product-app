import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class CommonService{
    myUrl = 'https://one-project-5a4c8-default-rtdb.firebaseio.com/post';

    constructor(private http: HttpClient) {}

    sendData(data: any) {
        return this.http.post(`${this.myUrl}.json`, data);
    }

    receiveData() {
        return this.http.get(`${this.myUrl}.json`);
    }

    onDeleteData(id: string) {
        return this.http.delete(`${this.myUrl}/${id}.json`);
    }

    onUpdateData(id: any, data:any) {
        return this.http.put(`${this.myUrl}/${id}.json`, data);
    }

}