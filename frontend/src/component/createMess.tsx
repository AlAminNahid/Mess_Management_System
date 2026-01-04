"use client";

export default function CreateMess() {
  return (
    <>
      <div className="flex min-h-screen w-full items-center justify-center">
        <form className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-md border p-8 shadow-xl">
          <h2 className="text-center text-3xl font-bold mb-4">Create Mess</h2>

          <label htmlFor="name" className="label font-bold">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="input input-bordered w-full"
            placeholder="Anvir Neighbours"
          />

          <label htmlFor="address" className="label font-bold">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="input input-bordered w-full"
            placeholder="Bashundhara G Block"
          />

          <button className="btn btn-neutral mt-6 w-full" type="submit">
            Create
          </button>
        </form>
      </div>
    </>
  );
}
