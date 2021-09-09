interface ListBtnsProps {
  theme: string;
}

const ListBtns = ({ theme }: ListBtnsProps) => {
  switch (theme) {
    case "What's Popular":
      return (
        <div className="flex gap-5 mx-5 text-sm">
          <button>STREAMING</button>
          <button>TV</button>
          <button>RENTAL</button>
          <button>THEATER</button>
        </div>
      );
    case "Free To Watch":
      return (
        <div className="flex gap-5 mx-5 text-sm">
          <button>MOVIE</button>
          <button>TV</button>
        </div>
      );
    case "Trend":
      return (
        <div className="flex gap-5 mx-5 text-sm">
          <button>WEEK</button>
          <button>TODAY</button>
        </div>
      );
    default:
      return null;
  }
};

export default ListBtns;
