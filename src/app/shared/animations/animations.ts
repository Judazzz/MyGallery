import { trigger, state, animate, transition, style, query } from '@angular/animations';

export function routerAnimation() {
    return trigger('routerAnimation', [
        transition('* => *', [
            query(':enter',
                [
                    style({opacity: 0, position: 'absolute'})
                ],
                {optional: true}
            ),
            query(':leave',
                [
                    style({opacity: 1, position: 'relative'}),
                    animate('0.375s linear', style({opacity: 0, position: 'absolute'}))
                ],
                {optional: true}
            ),
            query(':enter',
                [
                    style({opacity: 0, position: 'absolute'}),
                    animate('0.375s linear', style({opacity: 1, position: 'relative'}))
                ],
                {optional: true}
            )
        ])
    ]);
}

export function FadeAnimation(duration: number) {
    return trigger('FadeAnimation', [
        state('visible', style({opacity: 1})),
        state('hidden', style({opacity: 0})),
        transition('visible => hidden', animate(duration + 'ms')),
        transition('hidden => visible', animate(duration + 'ms')),
    ]);
    // trigger('visibilityChanged250', [
    //     state('visible', style({opacity: 1})),
    //     state('hidden', style({opacity: 0})),
    //     transition('visible => hidden', animate('250ms')),
    //     transition('hidden => visible', animate('250ms')),
    // ]);
    // trigger('visibilityChanged500', [
    //     state('visible', style({opacity: 1})),
    //     state('hidden', style({opacity: 0})),
    //     transition('visible => hidden', animate('500ms')),
    //     transition('hidden => visible', animate('500ms')),
    // ]);
    // trigger('visibilityChanged1000', [
    //     state('visible', style({opacity: 1})),
    //     state('hidden', style({opacity: 0})),
    //     transition('visible => hidden', animate('1000ms')),
    //     transition('hidden => visible', animate('1000ms')),
    // ]);
}

export function ToggleAnimation() {
    return trigger('slideUpDown', [
        state('open', style({
            height: '*',
            opacity: 1
        })),
        state('close', style({
            height: '0',
            opacity: '0'
        })),
        transition('open => close', animate('500ms linear')),
        transition('close => open', animate('500ms linear'))
    ]);
}
