import ListItem from "./ListItem";

export default function List({ list = [] }) {
  return (
    <ul className="flex flex-wrap w-full gap-6 justify-center lg:justify-start mb-10 lg:ml-14">
      {list && list.length
        ? list.map((listItem, index) => (
            <li key={index}>
              {" "}
              <ListItem item={listItem} />{" "}
            </li>
          ))
        : null}
    </ul>
  );
}
