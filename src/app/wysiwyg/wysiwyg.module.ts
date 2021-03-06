/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import highlight from 'highlight.js/lib/highlight';
import typescript from 'highlight.js/lib/languages/typescript';

highlight.registerLanguage('typescript', typescript);
highlight.configure({
    languages: ['typescript']
});

export function highlightFn(text: string) {
    return highlight.highlightAuto(text).value;
}

@NgModule({
    declarations: [],
    imports: [
        QuillModule.forRoot({
            modules: {
                syntax: <any>{
                    highlight: highlightFn,
                    interval: 0
                }
            }
        })
    ],
    exports: [QuillModule]
})
export class WysiwygModule { }
