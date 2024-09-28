import {Hind_Siliguri} from "next/font/google";
import localFont from 'next/font/local'

export const kalpurush = localFont({src: './fonts/kalpurush.ttf'})


// Define the font once here
export const hind_siliguri = Hind_Siliguri({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["bengali", "latin", "latin-ext"],
});
