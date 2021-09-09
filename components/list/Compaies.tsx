interface CompaniesProps {
  items: Array<any>;
}

const Companies = ({ items }: CompaniesProps) => {
  return (
    <ul className=" grid grid-cols-3 justify-items-center gap-6">
      {items
        .filter((item) => item.logo_path)
        .map((item) => (
          <li key={item.id}>
            <img
              alt={item.name}
              src={`https://www.themoviedb.org/t/p/h60/${item.logo_path}`}
            />
          </li>
        ))}
    </ul>
  );
};

export default Companies;
