import { buildStyles } from "react-circular-progressbar";

export const MAX: number = 6;

export const LIMIT: number = 13;

export const getNav = (page: number, total_pages: number): Array<number> => {
    const half = MAX / 2;
    if (page - half <= 0) {
        return Array.of(...new Array(MAX).keys());
    } else if (page >= total_pages - MAX) {
        return Array.of(...new Array(MAX)).map((_, index) => {
            return page - (MAX - index);
        });
    } else {
        return new Array(MAX).fill(page).map((item, index) => {
            if (index + 1 == half) {
                return item;
            } else if (index + 1 < half) {
                return item + index - (half + 1);
            } else {
                return item + index - (half + 1);
            }
        });
    }
};

export const getStyles = (voteAverage: number) => {
    let pathColor = "rgb(60,179,113)";
    if (voteAverage < 7) {
        pathColor = "rgb(255,255,0)";
    } else if (voteAverage < 4) {
        pathColor = "rgb(240,128,128)";
    }
    return buildStyles({
        rotation: 0.25,
        strokeLinecap: "butt",
        textSize: "16px",
        pathTransitionDuration: 0.5,
        pathColor,
        textColor: "white",
        trailColor: "white",
        backgroundColor: "rgb(3,37,65)",
    });
};

export const toSummary = (text: string) => {
    if (text && text.length > LIMIT) {
        return `${text.slice(0, LIMIT)}...`;
    }
    return text;
};

export const dateToString = (date: Date) => {
    return date.toString().slice(0, 10);
}

export default {};