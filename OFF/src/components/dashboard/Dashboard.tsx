import { Navbar } from "../navbar/Navbar";

export function Dashboard() {
  return (
    <>
    <Navbar/>
      <div className="mx-auto max-w-7xl px-2 py-10 lg:px-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:space-x-10">
          <div className="mb-10 w-full md:w-3/3 lg:mb-0 lg:w-2/2">
            <img
              className="h-full w-full rounded-md object-cover"
              src="https://images.unsplash.com/photo-1603575448878-868a20723f5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bWFuJTIwd2l0aCUyMGxhcHRvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
              alt="Newsletter"
            />
          </div>
          <div className="mb-10 w-full md:w-3/3 lg:mb-0 lg:w-2/2">
            <img
              className="h-full w-full rounded-md object-cover"
              src="https://images.unsplash.com/photo-1603575448878-868a20723f5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bWFuJTIwd2l0aCUyMGxhcHRvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
              alt="Newsletter"
            />
          </div>
          <CartThree/>
        </div>
      </div>
    </>
  );
}

const products = [
  {
    id: 1,
    name: "Nike Air Force 1 07 LV8",
    href: "#",
    price: "₹47,199",
    originalPrice: "₹48,900",
    discount: "5% Off",
    color: "Orange",
    size: "8 UK",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png",
  },
  {
    id: 2,
    name: "Nike Blazer Low 77 SE",
    href: "#",
    price: "₹1,549",
    originalPrice: "₹2,499",
    discount: "38% off",
    color: "White",
    leadTime: "3-4 weeks",
    size: "8 UK",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e48d6035-bd8a-4747-9fa1-04ea596bb074/blazer-low-77-se-shoes-0w2HHV.png",
  },
  {
    id: 3,
    name: "Nike Air Max 90",
    href: "#",
    price: "₹2219 ",
    originalPrice: "₹999",
    discount: "78% off",
    color: "Black",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fd17b420-b388-4c8a-aaaa-e0a98ddf175f/dunk-high-retro-shoe-DdRmMZ.png",
  },
];

export function CartThree() {
  return (
    <div className="m-auto my-6 w-screen max-w-sm rounded-lg border border-gray-200 p-4 pt-4 shadow-sm sm:p-6 lg:p-8" aria-modal="true" role="dialog" tabIndex={-1}>
    <div className="mt-6 space-y-6">
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id} className="flex items-center gap-4">
            <img src={product.imageSrc} alt={product.name} className="h-16 w-16 rounded object-contain" />
            <div className="flex flex-col">
              <h3 className="text-sm text-gray-900">{product.name}</h3>
              <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                <div>
                  <dd className="inline font-bold">{product.price}</dd>
                </div>
                <div>
                  <dt className="inline">Color:</dt>
                  <dd className="inline">{product.color}</dd>
                </div>
              </dl>
            </div>
            <div className="relative">
              <button
                className="relative z-0 rounded bg-pink-500 px-10 py-1 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded after:bg-pink-700 after:transition-[all_0.3s_ease] hover:after:w-full"
                style={{
                  top: "-5px",
                  right: "-10px",
                }}
              >
                Button
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
  
  );
}
