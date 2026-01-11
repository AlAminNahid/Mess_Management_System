import JoinMessButton from "@/component/mess/joinMessButton";

type Mess = {
  id: number;
  name: string;
  address: string;
};

type JoinMessProps = {
  messes: Mess[];
};

export default function Messtable({ messes }: JoinMessProps) {
  return (
    <>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {messes.map((mess, index) => (
              <tr key={mess.id}>
                <th>{index + 1}</th>
                <td>{mess.name}</td>
                <td>{mess.address}</td>
                <td>
                  <JoinMessButton messID={mess.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
