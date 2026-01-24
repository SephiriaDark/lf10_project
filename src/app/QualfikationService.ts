import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Qualification} from "./Qualification";

@Injectable({
    providedIn: 'root'
})
export class QualificationService {
    private apiUrl = 'http://localhost:8089/qualifications';

    constructor(private http: HttpClient, private authService: AuthService) {}

    private getHeaders(): HttpHeaders {
        //const token = this.authService.getAccessToken();
        const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjYxNzMwODk5OTM0ZmRlZTc4MGU3Yzg1NWIzZjUxOTBlIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAvYXBwbGljYXRpb24vby9lbXBsb3llZV9hcGkvIiwic3ViIjoiOTdhMzRmMWE2ZDk2YzU0OGViZGNmZjYxODgxMGE2YzU5MDMwZjJhMDcxNmFlYjg3ZjNkMjBhOWFkMWVkYWUwMSIsImF1ZCI6ImVtcGxveWVlX2FwaV9jbGllbnQiLCJleHAiOjE3NjkyOTM1NTcsImlhdCI6MTc2OTI5MDU1NywiYXV0aF90aW1lIjoxNzY5MjkwNTU3LCJhY3IiOiJnb2F1dGhlbnRpay5pby9wcm92aWRlcnMvb2F1dGgyL2RlZmF1bHQiLCJhenAiOiJlbXBsb3llZV9hcGlfY2xpZW50IiwidWlkIjoiOW9mRlpXNUR6N0l1MFd2emNvNXZhU3kySk0xNkNKVXNYQVVuOWp5cCJ9.F6FWuwL7F_zTU5A5HBXTAZCvOEedQRFBL6Nk0cXHq2-u58TL3WxN1dwD9qgU2FcJl_FRYzIiPHRpwJra8gWbrSPESvY27r4gHOaImCJlgMvfkbtfrckDjG4twxLKZT2iAFrJuAl17rdSFvQJMpHJchRJY_4ZkuZBa_8U7DGp0PSb1NZ1vF57mi-NfZ7b-pyIQYQ7-fTRcFlLup_AmjdX71kKSBYFR9D6fluj4wdC02_4Gwu7x7yWg_AerOcjfHxw6vibR-9KqGm4o0rieXcTGwqOO-3P4Hfsnbtsr7bDAVd-Vsi79irWEWpkJ5FkjGuc98-dT-oyu9sIvs1swA68Kj_58lTSGgDgw7c8ZV-jEuJ_TlxHhLdHkREWL_HSePHP2XDb7gIWqbmjCPvUtWoaSV6dSTQ1H8xlT7uNdY5EWWN0U9xIdduRaHq-iWS_4BPYep1HVLGJwf4XGnm45OnzJW3dt1gQwDK1svjO2ukexb87iJgyrsYPXIAkSGweXn0lX-A8_FnWDFRjeWzjjf2UIUNStcyKduw3tuFft_YpL0nYdCXA2rKrf-sKlSGssLBYz0KaKA38zYiZsMil5G6e60lCf2U732lLhH4UrSUBprs3ngnFe2Vwc2Ee_Ao_Iz3gv15_4BOOgqbjxExqTPMLcDIJFKpO1JW5Fhd1c-t8DBs'

        return new HttpHeaders()
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');
    }

    // getQualifications(): Observable<Qualification[]> {
    //     return this.http.get<Qualification[]>(this.apiUrl, {
    //         headers: this.getHeaders()
    //     });
    // }

    getQualificationById(id: number): Observable<Qualification> {
        return this.http.get<Qualification>(`${this.apiUrl}/${id}`, {
            headers: this.getHeaders()
        });
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
