import { animation, animate, style, keyframes } from '@angular/animations';

// based on https://github.com/jiayihu/ng-animate/blob/master/projects/ng-animate/src/lib/bouncing.ts
// with parameters adjusting (opacity, 'a' and keyframe offsets); @jiayihu, thank you, great job!

export function bounceInX(a, b, c, d) {
    return animation(
        animate(
            '{{ timing }}s {{ delay }}s cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            keyframes([
                style({
                    opacity: 1,
                    transform: 'translate3d({{ a }}, 0, 0)',
                    offset: 0
                }),
                style({
                    opacity: 1,
                    transform: 'translate3d({{ b }}, 0, 0)',
                    offset: 0.6
                }),
                style({ transform: 'translate3d({{ c }}, 0, 0)', offset: 0.75 }),
                style({ transform: 'translate3d({{ d }}, 0, 0)', offset: 0.9 }),
                style({ opacity: 1, transform: 'none', offset: 1 })
            ])
        ),
        {
            params: {
                a,
                b,
                c,
                d,
                timing: 1,
                delay: 0
            }
        }
    );
}

export const bounceInLeft = bounceInX('-100%', '25px', '-10px', '5px');
