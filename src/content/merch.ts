export const merchProducts = [
  {
    slug: "tha-shop-tshirt-black",
    name: "Tha Shop T-Shirt – Black",
    description: "Black Tha Shop T-shirt with the Tha Shop chest logo and the Crazy Eight Customs logo on the back.",
    priceCents: 2500,
    image: "/images/merch/tha-shop-tshirt-black-back.webp",
    imageAlt: "Back of the black Tha Shop T-shirt with the Crazy Eight Customs piston graphic",
    sizes: [
      { label: "S", initialQuantity: 7 },
      { label: "M", initialQuantity: 10 },
      { label: "L", initialQuantity: 6 },
      { label: "XL", initialQuantity: 9 },
      { label: "2XL", initialQuantity: 6 },
    ],
  },
] as const;
