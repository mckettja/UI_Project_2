import { useLoaderData, Link } from "react-router-dom";

export const HomePage = () => {
  const { modules } = useLoaderData();

  return (
    <>
      {modules.map((module) => (
        <details open>
          <summary>{module.title}</summary>
          <ul>
            {module.items.map((moduleItem) => (
              <li>
                <Link to={`pages/${moduleItem.slug}`}>{moduleItem.title}</Link>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </>
  );
};
