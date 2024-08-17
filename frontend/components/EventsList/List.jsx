import ListItem from "./ListItem";

export default function List({ list = [] }) {
  return (
    <ul className="flex flex-wrap w-full gap-6 justify-center">
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
