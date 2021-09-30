interface CompaniesProps {
  items: Array<any>;
}

const Companies = ({ items }: CompaniesProps) => {
  return (
    <ul className=" grid grid-cols-auto-200 justify-around gap-6">
      {items.map((item) => (
        <li className="w-full flex flex-col items-center" key={item.id}>
          <img
            className="h-16"
            alt={item.name}
            src={
              item.logo_path
                ? `https://www.themoviedb.org/t/p/h60/${item.logo_path}`
                : "https://www.yepclinic.com/img/noimage2.png"
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default Companies;
