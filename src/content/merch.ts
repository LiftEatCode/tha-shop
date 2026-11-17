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
  {
    slug: "kids-camo-shop-hoodie",
    name: "Kids’ Camo Shop Hoodie",
    description: "Camo hooded sweatshirt for kids.",
    priceCents: 4500,
    image: "/images/merch/kids-camo-shop-hoodie-back.webp",
    imageAlt: "Back of the kids’ woodland camo hoodie with the Tha Shop wrench and gear logo",
    sizes: [
      { label: "S", initialQuantity: 1 },
      { label: "M", initialQuantity: 1 },
      { label: "L", initialQuantity: 1 },
    ],
  },
  {
    slug: "tha-shop-flexfit-hat",
    name: "Tha Shop Flexfit Hat",
    description: "Black Flexfit cap with a curved brim, stretch fit, and Tha Shop’s silver wrench-and-gear logo on the front.",
    priceCents: 2500,
    image: "/images/merch/tha-shop-flexfit-hat.webp",
    imageAlt: "Black Flexfit cap with the silver Tha Shop logo and curved brim",
    sizes: [{ label: "L/XL", initialQuantity: 2 }],
  },
] as const;
