CREATE TABLE IF NOT EXISTS merch_inventory (
  product_slug text NOT NULL,
  size text NOT NULL,
  available integer NOT NULL CHECK (available >= 0),
  PRIMARY KEY (product_slug, size)
);

CREATE TABLE IF NOT EXISTS merch_orders (
  session_id text PRIMARY KEY,
  product_slug text NOT NULL,
  size text NOT NULL,
  price_cents integer NOT NULL CHECK (price_cents > 0),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'expired')),
  customer_email text,
  customer_name text,
  total_cents integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  paid_at timestamptz,
  FOREIGN KEY (product_slug, size) REFERENCES merch_inventory (product_slug, size)
);
