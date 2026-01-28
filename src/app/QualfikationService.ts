import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Qualification} from "./Qualification";

import {TokenService} from './TokenService';

@Injectable({
    providedIn: 'root'
})
export class QualificationService {
    private apiUrl = 'http://localhost:8089/qualifications';
  //private apiUrl = 'https://employee.szut.dev/qualifications'

    constructor(private http: HttpClient, private authService: AuthService, private tokenService: TokenService) {}

    private getHeaders(): HttpHeaders {
        //const token = this.authService.getAccessToken();
        const token =this.tokenService.getToken();

        return new HttpHeaders()
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');
    }



    deleteQualification(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`, {
            headers: this.getHeaders()
        });
    }

    updateQualification(id: number, qualification: Qualification): Observable<Qualification> {
        return this.http.put<Qualification>(`${this.apiUrl}/${id}`, qualification, {
            headers: this.getHeaders()
        });
    }

    createQualification(qualification: Qualification): Observable<Qualification> {
        return this.http.post<Qualification>(this.apiUrl, qualification, {
            headers: this.getHeaders()
        });
    }

    getQualifications(filter?: string): Observable<Qualification[]> {
        let url = this.apiUrl;
        if (filter) {
            url += `?skill=${encodeURIComponent(filter)}`;
        }

        return this.http.get<Qualification[]>(url, {
            headers: this.getHeaders()
        });
    }
}
