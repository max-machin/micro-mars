const dataProduct = [
  {
    product_id: 1,
    product_name: "Tomates",
    price: 2.99,
    desc: "Tomates fraîches de la région",
    product_picture:
      "https://media.post.rvohealth.io/wp-content/uploads/2020/09/AN313-Tomatoes-732x549-Thumb-732x549.jpg",
    category_id: 1,
    category_name: "Fruits & Légumes",
    exponent_name: "Expo Inc.",
    exponent_picture:
      "https://c8.alamy.com/compfr/2dh2nng/green-plantation-farm-estate-icone-plate-logo-vector-concept-design-2dh2nng.jpg",
  },
  {
    product_id: 2,
    product_name: "Vin rouge",
    price: 15.99,
    desc: "Vin roufe de Provence",
    product_picture:
      "https://boutique.closdesroses.com/files/upload/2023/02/13/095128_1-aoprouge.JPG",
    category_id: 2,
    category_name: "Vins & Spiritueux",
    exponent_name: "Expo Inc.",
    exponent_picture:
      "https://c8.alamy.com/compfr/2dh2nng/green-plantation-farm-estate-icone-plate-logo-vector-concept-design-2dh2nng.jpg",
  },
  {
    product_id: 3,
    product_name: "Fromage de chèvre",
    price: 7.99,
    desc: "Fromage de chèvre artisanal",
    product_picture:
      "https://www.guidedesgourmands.fr/wp-content/uploads/2024/04/Mothais-sur-feuille.jpg",
    category_id: 3,
    category_name: "Fromages",
    exponent_name: "Expo Inc.",
    exponent_picture:
      "https://c8.alamy.com/compfr/2dh2nng/green-plantation-farm-estate-icone-plate-logo-vector-concept-design-2dh2nng.jpg",
  },
  {
    product_id: 4,
    product_name: "Poissons",
    price: 12.99,
    desc: "Poissons frais de la Méditerranée",
    product_picture:
      "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/7A1C/production/_116406213_937652b1-d863-414a-bc2b-15ec579ccdf3.jpg",
    category_id: 4,
    category_name: "Produits de la mer",
    exponent_name: "Expo Inc.",
    exponent_picture:
      "https://c8.alamy.com/compfr/2dh2nng/green-plantation-farm-estate-icone-plate-logo-vector-concept-design-2dh2nng.jpg",
  },
  {
    product_id: 5,
    product_name: "Herbes de Provence",
    price: 4.99,
    desc: "Herbes de Provence fraîches",
    product_picture:
      "https://img-3.journaldesfemmes.fr/369d_nU4PUJAzGWZ_exspxgndx4=/1500x/smart/d4706764cd6b47f5b595832e274c258d/ccmcms-jdf/25375017.jpg",
    category_id: 5,
    category_name: "Herbes & Épices",
    exponent_name: "Expo Inc.",
    exponent_picture:
      "https://c8.alamy.com/compfr/2dh2nng/green-plantation-farm-estate-icone-plate-logo-vector-concept-design-2dh2nng.jpg",
  },
  {
    product_id: 6,
    product_name: "Pomme de terre",
    price: 1.99,
    desc: "Pommes de terre fraîches",
    product_picture:
      "https://www.tupperware.fr/assets/uploads/sites/2/2021/07/TAD7708-scaled.jpg",
    category_id: 1,
    category_name: "Fruits & Légumes",
    exponent_name: "Tech Corp",
    exponent_picture:
      "https://png.pngtree.com/png-clipart/20220605/original/pngtree-elegant-sprout-agriculture-logo-design-template-vector-free-and-png-png-image_7964084.png",
  },
  {
    product_id: 7,
    product_name: "Champagne",
    price: 29.99,
    desc: "Champagne de haute qualité",
    product_picture:
      "https://cache.larvf.com/data/photo/w1200_h630_ci/5x/meilleur-champagne.jpg",
    category_id: 2,
    category_name: "Vins & Spiritueux",
    exponent_name: "Tech Corp",
    exponent_picture:
      "https://png.pngtree.com/png-clipart/20220605/original/pngtree-elegant-sprout-agriculture-logo-design-template-vector-free-and-png-png-image_7964084.png",
  },
  {
    product_id: 8,
    product_name: "Fromage Brie",
    price: 8.99,
    desc: "Fromage Brie crémeux",
    product_picture:
      "https://sodiaal-fromages-ingredients.com/wp-content/uploads/2020/10/Brie.jpg",
    category_id: 3,
    category_name: "Fromages",
    exponent_name: "Tech Corp",
    exponent_picture:
      "https://png.pngtree.com/png-clipart/20220605/original/pngtree-elegant-sprout-agriculture-logo-design-template-vector-free-and-png-png-image_7964084.png",
  },
  {
    product_id: 9,
    product_name: "Crevettes",
    price: 13.99,
    desc: "Crevettes fraîches",
    product_picture:
      "https://img-3.journaldesfemmes.fr/k6GtSkG9Qrwp9JK5xj_rdXqw0cA=/1500x/smart/89d0af1aea334690b13a290b138c301a/ccmcms-jdf/26059632.jpg",
    category_id: 4,
    category_name: "Produits de la mer",
    exponent_name: "Tech Corp",
    exponent_picture:
      "https://png.pngtree.com/png-clipart/20220605/original/pngtree-elegant-sprout-agriculture-logo-design-template-vector-free-and-png-png-image_7964084.png",
  },
  {
    product_id: 10,
    product_name: "Basilic",
    price: 3.99,
    desc: "Basilic frais",
    product_picture:
      "https://cache.marieclaire.fr/data/photo/w1000_ci/5r/comment-conserver-le-basilic.jpg",
    category_id: 5,
    category_name: "Herbes & Épices",
    exponent_name: "Tech Corp",
    exponent_picture:
      "https://png.pngtree.com/png-clipart/20220605/original/pngtree-elegant-sprout-agriculture-logo-design-template-vector-free-and-png-png-image_7964084.png",
  },
  {
    product_id: 11,
    product_name: "Carottes",
    price: 2.49,
    desc: "Carottes bio",
    product_picture:
      "https://www.lespartisansduterroir.fr/wp-content/uploads/2021/03/carrots-gc501582b2_1920.jpg",
    category_id: 1,
    category_name: "Fruits & Légumes",
    exponent_name: "Retail Co.",
    exponent_picture:
      "https://img.freepik.com/vecteurs-premium/logo-tracteur-modele-logo-ferme-adapte-toute-entreprise-liee-aux-industries-agricoles_565585-51.jpg",
  },
  {
    product_id: 12,
    product_name: "Rosé",
    price: 14.99,
    desc: "Vin rosé de Provence",
    product_picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSspUQxtUT70m4Ftj5bWaTSnqSVM45we6WDJflGT51mUg&s",
    category_id: 2,
    category_name: "Vins & Spiritueux",
    exponent_name: "Retail Co.",
    exponent_picture:
      "https://img.freepik.com/vecteurs-premium/logo-tracteur-modele-logo-ferme-adapte-toute-entreprise-liee-aux-industries-agricoles_565585-51.jpg",
  },
  {
    product_id: 13,
    product_name: "Fromage Bleu",
    price: 9.49,
    desc: "Fromage Bleu crémeux",
    product_picture:
      "https://www.fromagesdelamemee.fr/cache/images/product/vente-fromage-bleu-des-neiges-laqueuille-la-memee-dsc_2077-133.jpg",
    category_id: 3,
    category_name: "Fromages",
    exponent_name: "Retail Co.",
    exponent_picture:
      "https://img.freepik.com/vecteurs-premium/logo-tracteur-modele-logo-ferme-adapte-toute-entreprise-liee-aux-industries-agricoles_565585-51.jpg",
  },
  {
    product_id: 14,
    product_name: "Saumon",
    price: 15.99,
    desc: "Saumon frais",
    product_picture:
      "https://m1.zeste.ca/serdy-m-dia-inc/image/upload/f_auto/fl_lossy/q_auto:eco/x_0,y_0,w_1279,h_720,c_crop/w_1200,h_630,c_fill/v1507135234/foodlavie/prod/recettes/millefeuille-de-saumon-frais-et-fume-5c733653",
    category_id: 4,
    category_name: "Produits de la mer",
    exponent_name: "Retail Co.",
    exponent_picture:
      "https://img.freepik.com/vecteurs-premium/logo-tracteur-modele-logo-ferme-adapte-toute-entreprise-liee-aux-industries-agricoles_565585-51.jpg",
  },
  {
    product_id: 15,
    product_name: "Origan",
    price: 3.49,
    desc: "Origan frais",
    product_picture:
      "https://static.pourdebon.com/images/1200-630/5106419c71339e1369ca4ea5e5a66030/origan.jpeg",
    category_id: 5,
    category_name: "Herbes & Épices",
    exponent_name: "Retail Co.",
    exponent_picture:
      "https://img.freepik.com/vecteurs-premium/logo-tracteur-modele-logo-ferme-adapte-toute-entreprise-liee-aux-industries-agricoles_565585-51.jpg",
  },
  {
    product_id: 16,
    product_name: "Courgettes",
    price: 2.69,
    desc: "Courgettes de Provence",
    product_picture:
      "https://www.rhs.org.uk/getmedia/fe7cc5ce-ea4e-4fdd-b9a8-6f0bad33ca52/courgettes.jpg",
    category_id: 1,
    category_name: "Fruits & Légumes",
    exponent_name: "Service Ltd.",
    exponent_picture:
      "https://www.pagesjaunes.fr/media/agc/6b/f7/5b/00/00/e0/c5/f5/10/b8/5efc6bf75b0000e0c5f510b8/5efc6bf75b0000e0c5f510b9.jpg",
  },
  {
    product_id: 17,
    product_name: "Vin blanc",
    price: 16.99,
    desc: "Vin blanc de Provence",
    product_picture:
      "https://cache.larvf.com/data/photo/w1000_ci/6i/vins-blancs-de-provence-a-moins-de-25-euros.jpg",
    category_id: 2,
    category_name: "Vins & Spiritueux",
    exponent_name: "Service Ltd.",
    exponent_picture:
      "https://www.pagesjaunes.fr/media/agc/6b/f7/5b/00/00/e0/c5/f5/10/b8/5efc6bf75b0000e0c5f510b8/5efc6bf75b0000e0c5f510b9.jpg",
  },
  {
    product_id: 18,
    product_name: "Fromage Camembert",
    price: 7.49,
    desc: "Fromage Camembert",
    product_picture:
      "https://static.lpnt.fr//images/2023/11/11/25530356lpw-25530924-article-jpg_9894440.jpg",
    category_id: 3,
    category_name: "Fromages",
    exponent_name: "Service Ltd.",
    exponent_picture:
      "https://www.pagesjaunes.fr/media/agc/6b/f7/5b/00/00/e0/c5/f5/10/b8/5efc6bf75b0000e0c5f510b8/5efc6bf75b0000e0c5f510b9.jpg",
  },
  {
    product_id: 19,
    product_name: "Huîtres",
    price: 17.99,
    desc: "Huîtres fraîches",
    product_picture:
      "https://www.crcbn.com/uploads/2021/03/huitres-creuses-img-1.jpg",
    category_id: 4,
    category_name: "Produits de la mer",
    exponent_name: "Service Ltd.",
    exponent_picture:
      "https://www.pagesjaunes.fr/media/agc/6b/f7/5b/00/00/e0/c5/f5/10/b8/5efc6bf75b0000e0c5f510b8/5efc6bf75b0000e0c5f510b9.jpg",
  },
  {
    product_id: 20,
    product_name: "Romarin",
    price: 4.29,
    desc: "Romarin frais",
    product_picture:
      "https://img.passeportsante.net/1200x675/2021-05-03/i104345-romarin-ps.jpg",
    category_id: 5,
    category_name: "Herbes & Épices",
    exponent_name: "Service Ltd.",
    exponent_picture:
      "https://www.pagesjaunes.fr/media/agc/6b/f7/5b/00/00/e0/c5/f5/10/b8/5efc6bf75b0000e0c5f510b8/5efc6bf75b0000e0c5f510b9.jpg",
  },
];

export { dataProduct };
