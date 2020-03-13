-- Users table seeds here (Example)
INSERT INTO users
  (name, email, phone_number, password)
VALUES
  ('Pratik', 'pratikbassi@gmail.com', '1-604-440-5472', '$2b$12$QzbFO3Q74Q2OvbaiCxj2cubFfhPFpfs2maSHbLT.ilKFkh80g6jpS'),
  ('Richard', 'Liao098@gmail.com', '1-604-352-3312', '$2b$12$QzbFO3Q74Q2OvbaiCxj2cubFfhPFpfs2maSHbLT.ilKFkh80g6jpS'),
  ('paul', 'paul@gmail.com', '111-111-1113', '$2b$12$QzbFO3Q74Q2OvbaiCxj2cubFfhPFpfs2maSHbLT.ilKFkh80g6jpS'),
  ('greg', 'greg@gmail.com', '111-111-1114', '$2b$12$QzbFO3Q74Q2OvbaiCxj2cubFfhPFpfs2maSHbLT.ilKFkh80g6jpS'),
  ('joe', 'joe@gmail.com', '111-111-1115', '$2b$12$QzbFO3Q74Q2OvbaiCxj2cubFfhPFpfs2maSHbLT.ilKFkh80g6jpS'),
  ('john', 'john@gmail.com', '111-111-1116', '$2b$12$QzbFO3Q74Q2OvbaiCxj2cubFfhPFpfs2maSHbLT.ilKFkh80g6jpS'),
  ('steve', 'steve@gmail.com', '111-111-1117', '$2b$12$QzbFO3Q74Q2OvbaiCxj2cubFfhPFpfs2maSHbLT.ilKFkh80g6jpS'),
  ('emily', 'emily@gmail.com', '111-111-1118', '$2b$12$QzbFO3Q74Q2OvbaiCxj2cubFfhPFpfs2maSHbLT.ilKFkh80g6jpS'),
  ('chris', 'chris@gmail.com', '111-111-1119', '$2b$12$QzbFO3Q74Q2OvbaiCxj2cubFfhPFpfs2maSHbLT.ilKFkh80g6jpS'),
  ('sarah', 'sarah@gmail.com', '111-111-1110', '$2b$12$QzbFO3Q74Q2OvbaiCxj2cubFfhPFpfs2maSHbLT.ilKFkh80g6jpS'),
  ('melanie', 'melanie@gmail.com', '111-111-1101', '$2b$12$QzbFO3Q74Q2OvbaiCxj2cubFfhPFpfs2maSHbLT.ilKFkh80g6jpS');

-- Items table seeds here (Example)
INSERT INTO items
  (user_id, price, description, title, stock, city)
VALUES
  (1, 5, 'THIS IS AN ITEM WITHOUT A SET IMAGE URL', 'ITEMS WITH DEFAULT IMAGES', 5, 'vancouver'),
  (2, 22, 'THIS IS AN ITEM WITHOUT A SET IMAGE URL', 'ITEMS WITH DEFAULT IMAGES', 10, 'toronto'),
  (3, 1, 'THIS IS AN ITEM WITHOUT A SET IMAGE URL', 'ITEMS WITH DEFAULT IMAGES', 4, 'seattle'),
  (4, 124, 'THIS IS AN ITEM WITHOUT A SET IMAGE URL', 'ITEMS WITH DEFAULT IMAGES', 3, 'burnaby'),
  (5, 5464, 'THIS IS AN ITEM WITHOUT A SET IMAGE URL', 'ITEMS WITH DEFAULT IMAGES', 55, 'toronto');

-- Featured Item Seeds here
INSERT INTO items
  (user_id, price, description, title, stock, city, is_featured, is_sold, image_url)
VALUES
  (1, 1, 'ITS NOT LOST OR ANYTHING, ITS JUST REALLY CUTE.', 'HAVE YOU SEEN THIS BIRB?', 1, 'vancouver', true, false, 'https://i.imgur.com/vWMtBlG.jpg'),
  (2, 25, 'Looking to sell Multimedia storage shelf. Dimensions 40x20x128cm.', 'Multimedia Storage Shelf', 1, 'richmond', true, false, 'https://i.ebayimg.com/00/s/ODAwWDYwMA==/z/3qkAAOSw8LZeHULj/$_59.JPG'),
  (3, 1, 'Only a few months old. Selling because Im moving to a much smaller apartment and it unfortunately wont fit. IKEA chair - very comfortable and a striking colour.
*Has lived in a house with cats, but will make sure to clean it thoroughly before collection.
*Pick up only', 'NEW Red IKEA armchair with footstool', 4, 'seattle', true, false, 'https://i.ebayimg.com/00/s/ODAwWDYwMA==/z/4ccAAOSwIBJeayWj/$_59.JPG');


-- Descriptive Item Seeds here
INSERT INTO items
  (user_id, price, title, description, stock, city, is_featured, is_sold, image_url)
VALUES
  (3, 230, 'Nintendo DSi XL Burgundy Console', 'Nintendo DSi XL Burgundy Console-Retains all the functionality of the DSi including: downloads via the Nintendo DSi Shop-New, large diagonal LCD screen size (4.2-inch) allows for the best visual quality DS gaming experience to date.-No stylus.For more information, please visit us athttps://www.a1tradeandloan.com/product-page/nintendo-dsi-xl-burgundy-consoleor 2641 Commercial Drive, Vancouver or contact Raffi or Sevan at show contact infoTell us you saw us on craigslist and get this item as TAX INCLUSIVE price.Note: A receipt will be provided during checkout, but we only accept cash, debit or PayPal. ', 5, 'vancouver', true, false, 'https://cnet2.cbsistatic.com/img/xYbdfz90jlX5nw5l47hzmpXGjXw=/1200x675/2010/03/23/56188790-fa0f-4dc0-8072-83294c254b40/nintendo-dsi-xl-handheld-game-console-burgundy-dr-kawashimas-brain-training-arts-edition.jpg'),
  (6, 400, 'Sony Digital noise-cancelling headphones', 'Sony MDRNC200D Digital noise-cancelling headphones for sale. Mint condition with little air time/usage, and always stored in carry case.Includes headphones with carry case containing cord and adapter plug accessories.Features:Compact and lightweight with fold-flat design for easy store or pack away.Closed-back earcups and on-ear cushionsAdjustable, Padded Headband40mm DriversDigital EQ and S-Master AmplifierAI Noise Canceling FunctionMonitor Function and Passive ModeDetachable single-sided cableGold-plated 3.5mm plug and plane adapterTakes 1x AAA battery.See link for more info:https://www.bhphotovideo.com/c/product/819517-REG/Sony_MDRNC200D_MDRNC200D_Digital_Noise_Canceling.html99$. Open to reasonable IN-PERSON offers. Cash and in-person pick-up/local sale only. No trades.To arrange a time for a listen, please call.If reading this theyre available. Thanks for looking. ', 20, 'richmond', true, false, 'https://www.brentview.com/wp-content/uploads/2018/06/MDRNC500D_1_A.jpg'),
  (3, 160, 'Uniden GMRS 2-Way SX327 radio set & base charger ', 'Uniden GMRS 2-Way SX327 radio set & base charger for sale. As new and rarely used, in great condition and good working order.These walkie talkies are great to keep track of your group during outdoor adventures whether inbounds, in the slack or backcountry. Also useful to stay connected for onsite work other other activities. Includes all shown in 2nd pic: 2x radios, USB base charger, multilingual instructions, and zipped carry case.Features:32 mile/ 51 km line-of-sight operation22 Channel selection for uninterrupted communications.121 Privacy Codes to limit hearing only the people you want to hear.14 hours battery life with 3 AA NiMH rechargeable batteries.Water Resistant to JIS Level 4.10 Call Tones.With:Power Boost key reserves radios battery power for when needed, depressing key boosts a little extra punch to get through trees and buildings.NOAA Weather Alerts you to hazardous conditions as they arise.Emergency Strobe Light for use as a flashlight, an attention getter, or to strobe-signal SOS.License-Free Operation for use on FRS Only channels (7-14).Convenient Charging vis USB-powered charging cradle or use a std. USB mini cable to charge the radio itself.VOX Operation feature can activate transmit when you start talking for hands-free operation.Carabineer Loop Belt Clip to secure radio to your belt or use big loop to secure the radio to your gear using a carabineer (not included).See link for more info:https://uniden.com/products/two-way-radio-with-charging-kit-sx327-2ck90$. Cash and in-person pick-up/local sale only. No delivery or trades.To arrange a time for a listen, please call.If reading this theyre available. Thanks for looking.', 2, 'seattle', true, false, 'https://cdn.shopify.com/s/files/1/0018/3543/4029/products/two-way-radio-chargero-headset-SX327-2CKHS-walkie-talkie-uniden_704x469.jpg?v=1571712797'),
  (2, 39, 'Merkury Innovations Acoustix Wireless Earbuds', 'Merkury Innovations Acoustix Aluminum Wireless Earbuds - Rose Gold - Brand NewConnects seamlessly with all Bluetooth enabled smartphones, tablets and more. Form fitting soft silicone buds come in three sizes for your comfort (S, M, L). Ergonomically designed to combat discomfort and external noise, these buds are the ultimate travel, workout and hang out companion. Get up to 4 hours of adrenaline pumping music on a single charge. Convenient tactile in-line controls let you quickly change tracks, adjust volume and switch to incoming calls while precision tuned drivers generate stunning sound with enhanced bass.For more information, please visit us athttps://www.a1tradeandloan.com/product-page/merkury-innovations-acoustix-wireless-earbuds', 6, 'tokyo', true, true, 'https://i.ebayimg.com/images/g/CSMAAOSwOu5ZmF9f/s-l400.jpg'),
  (8, 80, 'SAMSUNG S8 LCD REPLACMENT ', 'OEM PARTSSAMSUNG S8 LCD REPLACEMENT WITH FULL ASSMEBLYCELLCARECALL OR VISIT US @ ', 99, 'hello', true, false, 'https://cdn.shopify.com/s/files/1/0548/2509/products/samsung-galaxy-s8-display-lcd-oled-screen-digitizer-replacement-kit-3_2000x.jpg?v=1567106406'),
  (6, 30, ' TomTom GPS with USA and Canada and Mexico maps ', '4.3" screen GPS in Great condition. Comes with Suction holder and car charger.Maps of USA and Canada and Mexico. ', 10, 'vancouver', true, true, 'https://images-na.ssl-images-amazon.com/images/I/81sd%2B4v9-qL._AC_SX679_.jpg'),
  (7, 150, 'Kenwood/ BOSS/ JBL AMPS **ALL FOR $150** ', 'We are selling all three amps below for $140;Kenwood KAC-8452 800W 2/3/4 channelBOSS PV3700JBL', 1, 'surrey', true, false, 'https://images.crutchfieldonline.com/products/2014/9/113/x113PW1220-F.jpg');

INSERT INTO favorites
  (user_id, item_id)
VALUES
  (1 , 1),
  (1 , 2),
  (1 , 3),
  (2 , 1),
  (3 , 1),
  (4 , 1);

INSERT INTO messages
  (sender, reciever, item_id, body )
VALUES
  (1, 2, 1, 'LOVE IT'),
  (2, 3, 1, 'HATE IT'),
  (1, 3, 1, 'NEED IT'),
  (2, 1, 1, 'WANT IT'),
  (3, 1, 1, 'BOUGHT IT'),
  (3, 2, 1, 'SOLD IT');
