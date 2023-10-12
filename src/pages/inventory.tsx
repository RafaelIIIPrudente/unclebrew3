import { NextPage } from 'next';
import { api } from '~/utils/api';
import { Navbar } from '~/components/components';
import Head from 'next/head';


const Inventory: NextPage = () => {
  const { data: inventoryData } = api.inventoryRouter.getAll.useQuery();
  const inventory1 = api.inventoryRouter.getById.useQuery(inventoryData?.[0] ?? { id: '', name: '' });
  const { data: productData } = api.productRouter.getAll.useQuery();

  return (
    <>
      <Navbar></Navbar>
      <Head>
        <title>Inventory | Uncle Brew</title>
        <meta name="description" content="Inventory page for Uncle Brew" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-4xl font-bold text-white mb-8">{inventory1.data?.name ?? ''}</h1>
        <table className="table-auto mb-8">
          <thead>
            <tr>
              <th className="px-4 py-2 text-white">Name</th>
              <th className="px-4 py-2 text-white">Quantity</th>
              <th className="px-4 py-2 text-white">Price</th>
            </tr>
          </thead>
          <tbody>
            {productData?.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2 text-white">{item.productName}</td>
                <td className="border px-4 py-2 text-white">{item.quantity}</td>
                <td className="border px-4 py-2 text-white">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default Inventory;