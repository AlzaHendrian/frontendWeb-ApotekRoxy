import React from "react";

const Table = ({dataBarang, handleUpdate, deleteData}) => {
  return (
    <>
      <div className="mt-4">
        <table className="table-cell w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">ID barang</th>
              <th className="px-4 py-2">Nama barang</th>
              <th className="px-4 py-2">Harga</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Option</th>
            </tr>
          </thead>
          <tbody>
            {dataBarang.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.nama}</td>
                <td className="border px-4 py-2">{item.harga}</td>
                <td className="border px-4 py-2">{item.qty}</td>
                <td className="border px-4 py-2">
                <button 
                className="me-4 bg-green-500 text-white px-4 rounded-lg"
                onClick={() => handleUpdate(item)}
                >
                    Edit
                </button>
                <button onClick={() => deleteData(item.id)} className="me-4 bg-red-500 text-white px-4 rounded-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
