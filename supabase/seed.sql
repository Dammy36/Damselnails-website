-- Damsel Nails Studio — seeds every image slot with the site's CURRENT real
-- photo, so nothing changes visually until Dammy replaces one from /admin.html.
-- Run after schema.sql. Safe to re-run: it clears both tables first.

truncate table site_images, gallery_images;

-- ─── site_images (fixed slots) ───────────────────────────────────────
insert into site_images (key, url, alt) values
  ('logo', 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/175/182/original/Pink_Black_Beige_Minimalist_Modern_Personal_Brand_Nail_Salon_Logo_%281%29.png?1761320107', 'Damsel Nails Studio logo'),
  ('hero', 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/174/618/original/nail4.jpg?1759874332', 'Close-up of an elegant, polished nail set'),

  ('signature_1', 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/174/618/original/nail4.jpg?1759874332', 'Nail art 1'),
  ('signature_2', 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/174/619/original/nails5.jpg?1759874345', 'Nail art 2'),
  ('signature_3', 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/174/620/original/nails6.jpg?1759874361', 'Nail art 3'),
  ('signature_4', 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/174/621/original/nails7.jpg?1759874374', 'Nail art 4'),

  ('service_home_manicure', 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/175/247/original/manicure.jpg?1761417221', 'Russian manicure with clean cuticle work'),
  ('service_home_acrylic', 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/176/217/original/manicure-local.jpg?1764320936', 'Acrylic nail extensions'),
  ('service_home_biab', 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/176/021/original/baib_nails.jpg?1763615525', 'BIAB builder gel nails'),

  ('testimonial_ayomide', 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/176/086/original/woman-black.jpg?1763851916', 'Ayomide, Damsel Nails client'),
  ('testimonial_ozioma', 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/180/138/original/688a2b16-9d8b-4121-8529-e25b4637715a.jpg?1779123438', 'Ozioma, Damsel Nails client'),
  ('testimonial_fadekemi', 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/180/140/original/bc7d75c3-9a8f-4ab1-a657-f4ca5a6ae686.jpg?1779123835', 'Fadekemi, Damsel Nails client'),
  ('testimonial_emauella', 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/180/141/original/9d279422-d2b9-47a6-9a63-4745f52ff0f8.jpg?1779125311', 'Emauella, Damsel Nails client'),
  ('testimonial_esther', 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/180/142/original/b6e4fb40-42c1-45e8-9775-b2cc72bdbcdd.jpg?1779125790', 'Esther, Damsel Nails client'),

  ('about_photo', 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/176/181/original/oseyemi_dammy.jpg?1764154664', 'Dammy Oseyemi, founder of Damsel Nails Studio'),

  ('service_page_pedicure', 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/176/182/original/local-pedi.jpg?1764159615', 'Pedicure'),
  ('service_page_polygel', 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/174/617/original/nails2.jpg?1759874319', 'Poly gel nails'),
  ('service_page_lashes', 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/176/218/original/lashe.jpg?1764320999', 'Lash extensions'),
  ('service_page_piercing', 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/176/219/original/perciein.jpg?1764321171', 'Piercing'),

  ('bridal_image', 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/176/237/original/poly_gel.jpg?1764499937', 'Bridal nail set');

-- ─── gallery_images ───────────────────────────────────────────────────
insert into gallery_images (url, alt, display_order) values
  ('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/176/284/original/223348_27da226af72d23538ab7a0dad91cbc6f-12_12_2023__14_55_11.jpg?1764598482', 'Damsel Nails Studio nail set', 0),
  ('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/176/285/original/219548_d0e68be1ad1a68c392f0632b074f5f3b-12_12_2023__14_53_35.jpg?1764598546', 'Damsel Nails Studio nail set', 1),
  ('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/176/286/original/58_ecf56677e33e166d3cf7d374ead1ea8d-12_12_2023__15_11_16.jpg?1764598611', 'Damsel Nails Studio nail set', 2),
  ('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/176/291/original/damselnail-1.jpg?1764602305', 'Damsel Nails Studio nail set', 3),
  ('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/176/292/original/damselnails-2.jpg?1764602467', 'Damsel Nails Studio nail set', 4),
  ('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/176/293/original/c08a5917-feaa-4631-a80f-8856f4d5d83a.jpg?1764603071', 'Damsel Nails Studio nail set', 5),
  ('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/176/295/original/b1055330-82db-4343-b731-aa1ad715b716.jpg?1764604266', 'Damsel Nails Studio nail set', 6),
  ('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/176/294/original/6a9bbea2-35cb-43ef-9caa-1ce00e498ee8.jpg?1764604203', 'Damsel Nails Studio nail set', 7),
  ('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/176/296/original/9139bc90-47f1-4ac4-8196-26a41a6660e1.jpg?1764604855', 'Damsel Nails Studio nail set', 8),
  ('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/176/297/original/9ffcd9e4-3b38-4742-bfe1-5e8c88357d3e.jpg?1764604891', 'Damsel Nails Studio nail set', 9),
  ('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/176/299/original/5d42dac0-37dd-481e-8a38-736e3a92cd59.jpg?1764604943', 'Damsel Nails Studio nail set', 10),
  ('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/176/300/original/c3b8485b-4fdb-448a-8529-0b36d0cc3889.jpg?1764604986', 'Damsel Nails Studio nail set', 11),
  ('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/176/305/original/desing-nails.jpg?1764605299', 'Damsel Nails Studio nail set', 12),
  ('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/176/306/original/refill_nails.jpg?1764605552', 'Damsel Nails Studio nail set', 13),
  ('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/176/308/original/nails7.jpg?1764605627', 'Damsel Nails Studio nail set', 14),
  ('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/176/309/original/nails6.jpg?1764605689', 'Damsel Nails Studio nail set', 15);
