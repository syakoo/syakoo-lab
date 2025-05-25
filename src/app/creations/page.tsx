import type { FC } from "react";

const CreationsPage: FC = () => {
  return (
    <div>
      <h1>Creations</h1>
      <div>
        {/* 仮のデータ */}
        {[1, 2, 3].map((id) => (
          <div
            key={id}
            style={{
              border: "1px solid #ccc",
              margin: "1rem",
              padding: "1rem",
            }}
          >
            <h2>Creation {id}</h2>
            <p>Description for creation {id}</p>
            <div>
              <span>Tags: </span>
              <span>Tag1</span>
              <span>Tag2</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreationsPage;
