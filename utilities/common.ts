import { buildStyles } from "react-circular-progressbar";

export const getStyles = (voteAverage: number) => {
    let pathColor = "	rgb(60,179,113)";
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

export const toSummary = (text: string, limit: number) => {
    if (text && text.length > limit) {
        return `${text.slice(0, limit)}...`;
    }
    return text;
};

export const dateToString = (date: Date) => {
    return date.toString().slice(0,10);
}