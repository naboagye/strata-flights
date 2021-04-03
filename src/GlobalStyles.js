import { createGlobalStyle } from "styled-components";

import NunitoBold from "./fonts/Nunito-Bold.ttf";
import NunitoExtraBold from "./fonts/Nunito-ExtraBold.ttf";
import NunitoLight from "./fonts/Nunito-Light.ttf";
import NunitoSemiBold from "./fonts/Nunito-SemiBold.ttf";
import NunitoRegular from "./fonts/Nunito-Regular.ttf";

export default createGlobalStyle`
    @font-face {
        font-family: 'Nunito';
        src: url(${NunitoRegular});
        font-style: normal;
        font-weight: 400;
    }
    @font-face {
        font-family: 'Nunito';
        src: url(${NunitoSemiBold});
        font-style: normal;
        font-weight: 600;
    }
    @font-face {
        font-family: 'Nunito';
        src: url(${NunitoBold});
        font-style: normal;
        font-weight: 700;
    }
    @font-face {
        font-family: 'Nunito';
        src: url(${NunitoExtraBold});
        font-style: normal;
        font-weight: 800;
    }
    @font-face {
        font-family: 'Nunito';
        src: url(${NunitoLight});
        font-style: normal;
        font-weight: 300;
    }
`;
