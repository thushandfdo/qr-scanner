/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx}'],
    mode: 'jit',
    theme: {
        extend: {
            colors: {
                'primary-slate': 'slate-900',
                'primary-gray': '#403f3f',
            },
        }
    },
    plugins: []
};
