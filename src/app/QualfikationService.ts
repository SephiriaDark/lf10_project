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
  //private apiUrl = 'https://employee.szut.dev/qualifications'

    constructor(private http: HttpClient, private authService: AuthService) {}

    private getHeaders(): HttpHeaders {
        //const token = this.authService.getAccessToken();
        const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjM0YzgyYmEwZDU1NWM5NDkzODg5Y2ViMGNiZGI2NTI5IiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAvYXBwbGljYXRpb24vby9lbXBsb3llZV9hcGkvIiwic3ViIjoiYTA0NjM3NzlkYWNhMDY4ZTAzNWFiMTg3NzI1OGYzOTk5MjljNTA3ODAyYTQ2YjVlMWZkZjQ2NDU1ZmY5ZGYxYiIsImF1ZCI6ImVtcGxveWVlX2FwaV9jbGllbnQiLCJleHAiOjE3Njk1OTUwNzksImlhdCI6MTc2OTU5MjA3OSwiYXV0aF90aW1lIjoxNzY5NTkyMDc5LCJhY3IiOiJnb2F1dGhlbnRpay5pby9wcm92aWRlcnMvb2F1dGgyL2RlZmF1bHQiLCJhenAiOiJlbXBsb3llZV9hcGlfY2xpZW50IiwidWlkIjoid2FnT3BhU0VBaXpzM0liUExNeDNsTnhjYTUycWJEYkcyRTJxeTl6VCJ9.eeTT62i1IB6BxJrY5giSNH_PgE-SbpXDwujzoIcuJjlohCeoXFZIhOj3qglzIhDLniTtzK8GvltE0cgoIWX5aoFTZicetPrBOcIyinPxXOe3ixHeBlYtSHKITrNzH0qltw8ekxjOLjKqpITOEygDmNLfIp9MYuetBuPhiMjMi9U9ltGXGIsCtb2x59Pz_SvrrnK09j1OZRdxTgOC8kAFt9UEYWLVd0EFF3784JaKJ29HpF1Fp9Pt-qKDhYa4ZIvrUTKdjF_RR9pitgEGARYMFqIIRolfwlW_Q59NSP4A92v_rdo4oJA3h2Ptngb7yP9LmQA5JnKPiGnkJWYhkm0NJP--kAlSeIVMWtCxE7wc8tPiAlvDpJERghgI1sR1sDe1f_a9omQGzcW9vJ614kBxHtBZqPz2sQKMYeu8Oq0EttZoVhwzt3nSUqArHuC77d_GO2WyJuxC5UlB0bcVJyMDH0nZjjgKBH1amih6hosGECBG3i9obM4HCp6D5bJSNJIEvRj6bqey-qbQZGWPh6f557VVHOTz3rpYIz69SI-vPT5NN6esy5M1BPxklTIyqz0z6lLpdw2PbdbpWNiKCjctj66-y5H8f_BgMtHlLgJXJ3H1iiUt6JN63vP2yD3i7FkRJYMmI5BYiVluE2T8d6SJENnBlfAXNNn7ISGKbaIoEJ4'

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
