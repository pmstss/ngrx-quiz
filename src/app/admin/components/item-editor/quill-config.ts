export const quillToolbarConfig = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons

        [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ color: <any>[] }, { background: <any>[] }],          // dropdown with defaults from theme

        ['blockquote', 'code-block'],

        // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],      // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }],          // outdent/indent

        // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        // [{ 'font': [] }],
        // [{ 'align': [] }],

        // ['clean'],                                         // remove formatting button

        ['link', 'image', 'video']                         // link and image, video
    ]
};
