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
        const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjYxNzMwODk5OTM0ZmRlZTc4MGU3Yzg1NWIzZjUxOTBlIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAvYXBwbGljYXRpb24vby9lbXBsb3llZV9hcGkvIiwic3ViIjoiOTdhMzRmMWE2ZDk2YzU0OGViZGNmZjYxODgxMGE2YzU5MDMwZjJhMDcxNmFlYjg3ZjNkMjBhOWFkMWVkYWUwMSIsImF1ZCI6ImVtcGxveWVlX2FwaV9jbGllbnQiLCJleHAiOjE3NjkzNTE1MDgsImlhdCI6MTc2OTM0ODUwOCwiYXV0aF90aW1lIjoxNzY5MzQ4NTA4LCJhY3IiOiJnb2F1dGhlbnRpay5pby9wcm92aWRlcnMvb2F1dGgyL2RlZmF1bHQiLCJhenAiOiJlbXBsb3llZV9hcGlfY2xpZW50IiwidWlkIjoia1BsUWVVSU55bzVETEMzMVFJbEloVGxBdlk5Q1pQUHZYM0ZpRVpJMSJ9.SZMy0C3Fsg1ZNdIXTIo5apyre6Aq5SXrmhW1waMlX_jQh_zvSxrDG2re1rHEAc0AjaGcDvF0L5fEH39tA1BggTfMSa9-2odhQc_5Jo46BEZhZCcwFFnW7g38a8im4MvT2Ry2v53ikeT0ltMa8N2_KpWhmPDexYLXAefOqEHIi4260992pDETaHTmSYegXwswlWccSIJFue0KUcmPla4OJwsmJYvsma7yimHuLckYbW-DfpFitv34lcsyxESkH_sXjHwwwbl47urFmyKZ2alRfQs4nhs_mmJxJfqSkAiEmGcla8FjRCf4uzp314O51deYQcZ8j6ZWgnmhFWM9eth6mcxFmWf_9_aDww_V3EyiNyAHwBL5BQ10iPEPd9N8rjs9hXxdVi3AlDjnOjTBH3mrZ2QrMJs0Tn_VbdjuCfKI63LQJmniycyfB1-2c72g3X-4XEZEsXe7hKSB4XM48ELewShjrNrJNgVsHVSj_QU_K3xNtJRNSBWJ360SGxxwxt6a3MGm3r-cJj3lj_Y0S4tn8I7PjT5jvk9v4YngdNd4FdqLA1wONPz6F0aeOqWa-hjyoy6Zjj5aTO8ZNf63BKQuOCFRmNxvJsrUK2E7im7--q0XJDSZ2kyqrV2h9PufAsIVG-SiiLNVsZ_CL0nH1pbRi2sJv3KsYoVvA-r2XNNHjRQ'

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
