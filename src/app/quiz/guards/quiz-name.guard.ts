import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { QuizService } from '../../core';
import { Injectable } from '@angular/core';

@Injectable()
export class QuizNameGuard implements CanActivate {
    constructor(private quizService: QuizService, private router: Router) {
        console.log('### QuizNameGuard');
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean {
        if (!route.params.name) {
            return false;
        }

        return this.quizService.loadQuizMeta(route.params.name).pipe(
            map(quiz => !!quiz),
            catchError(() => of(this.router.parseUrl('/quizes')))
        );
    }
}
