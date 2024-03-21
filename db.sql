-- Adminer 4.8.1 PostgreSQL 16.2 dump

DROP TABLE IF EXISTS "failed_jobs";
DROP SEQUENCE IF EXISTS failed_jobs_id_seq;
CREATE SEQUENCE failed_jobs_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE "public"."failed_jobs" (
    "id" bigint DEFAULT nextval('failed_jobs_id_seq') NOT NULL,
    "uuid" character varying(255) NOT NULL,
    "connection" text NOT NULL,
    "queue" text NOT NULL,
    "payload" text NOT NULL,
    "exception" text NOT NULL,
    "failed_at" timestamp(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "failed_jobs_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "failed_jobs_uuid_unique" UNIQUE ("uuid")
) WITH (oids = false);


DROP TABLE IF EXISTS "migrations";
DROP SEQUENCE IF EXISTS migrations_id_seq;
CREATE SEQUENCE migrations_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."migrations" (
    "id" integer DEFAULT nextval('migrations_id_seq') NOT NULL,
    "migration" character varying(255) NOT NULL,
    "batch" integer NOT NULL,
    CONSTRAINT "migrations_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "migrations" ("id", "migration", "batch") VALUES
(1,	'2014_10_12_000000_create_users_table',	1),
(2,	'2014_10_12_100000_create_password_resets_table',	1),
(3,	'2019_08_19_000000_create_failed_jobs_table',	1),
(4,	'2019_12_14_000001_create_personal_access_tokens_table',	1);

DROP TABLE IF EXISTS "order_products";
DROP SEQUENCE IF EXISTS order_products_id_seq;
CREATE SEQUENCE order_products_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."order_products" (
    "id" integer DEFAULT nextval('order_products_id_seq') NOT NULL,
    "order_id" integer NOT NULL,
    "product_id" integer NOT NULL,
    "amount" integer NOT NULL,
    CONSTRAINT "order_products_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "orders";
DROP SEQUENCE IF EXISTS orders_order_id_seq;
CREATE SEQUENCE orders_order_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."orders" (
    "id" integer DEFAULT nextval('orders_order_id_seq') NOT NULL,
    "phone" character varying(50) NOT NULL,
    "name" character varying(100) NOT NULL,
    "address" character varying(200) NOT NULL,
    "total" numeric(18,2) NOT NULL,
    "user_id" integer NOT NULL,
    "status" character varying NOT NULL,
    "created_at" timestamp NOT NULL,
    "updated_at" timestamp NOT NULL,
    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "password_resets";
CREATE TABLE "public"."password_resets" (
    "email" character varying(255) NOT NULL,
    "token" character varying(255) NOT NULL,
    "created_at" timestamp(0)
) WITH (oids = false);

CREATE INDEX "password_resets_email_index" ON "public"."password_resets" USING btree ("email");


DROP TABLE IF EXISTS "personal_access_tokens";
DROP SEQUENCE IF EXISTS personal_access_tokens_id_seq;
CREATE SEQUENCE personal_access_tokens_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE "public"."personal_access_tokens" (
    "id" bigint DEFAULT nextval('personal_access_tokens_id_seq') NOT NULL,
    "tokenable_type" character varying(255) NOT NULL,
    "tokenable_id" bigint NOT NULL,
    "name" character varying(255) NOT NULL,
    "token" character varying(64) NOT NULL,
    "abilities" text,
    "last_used_at" timestamp(0),
    "created_at" timestamp(0),
    "updated_at" timestamp(0),
    CONSTRAINT "personal_access_tokens_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "personal_access_tokens_token_unique" UNIQUE ("token")
) WITH (oids = false);

CREATE INDEX "personal_access_tokens_tokenable_type_tokenable_id_index" ON "public"."personal_access_tokens" USING btree ("tokenable_type", "tokenable_id");


DROP TABLE IF EXISTS "products";
DROP SEQUENCE IF EXISTS products_product_id_seq;
CREATE SEQUENCE products_product_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."products" (
    "id" integer DEFAULT nextval('products_product_id_seq') NOT NULL,
    "name" character(100) NOT NULL,
    "description" text NOT NULL,
    "price" numeric(18,2) NOT NULL,
    "created_at" time without time zone NOT NULL,
    "updated_at" time without time zone NOT NULL,
    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "products" ("id", "name", "description", "price", "created_at", "updated_at") VALUES
(42,	'Test product 1                                                                                      ',	'Test product 1 description',	3.20,	'19:53:01',	'19:53:01'),
(43,	'Test product 2                                                                                      ',	'Test product 2 description',	3.10,	'19:53:01',	'19:53:01'),
(44,	'Test product 3                                                                                      ',	'Test product 3 description',	3.20,	'19:53:01',	'19:53:01'),
(45,	'Test product 4                                                                                      ',	'Test product 4 description',	3.70,	'19:53:01',	'19:53:01'),
(46,	'Test product 5                                                                                      ',	'Test product 5 description',	4.40,	'19:53:01',	'19:53:01'),
(47,	'Test product 6                                                                                      ',	'Test product 6 description',	4.60,	'19:53:01',	'19:53:01'),
(48,	'Test product 7                                                                                      ',	'Test product 7 description',	4.10,	'19:53:01',	'19:53:01'),
(49,	'Test product 8                                                                                      ',	'Test product 8 description',	4.60,	'19:53:01',	'19:53:01'),
(50,	'Test product 9                                                                                      ',	'Test product 9 description',	4.30,	'19:53:01',	'19:53:01'),
(51,	'Test product 10                                                                                     ',	'Test product 10 description',	3.20,	'19:53:01',	'19:53:01'),
(52,	'Test product 11                                                                                     ',	'Test product 11 description',	3.40,	'19:53:01',	'19:53:01'),
(53,	'Test product 12                                                                                     ',	'Test product 12 description',	3.10,	'19:53:01',	'19:53:01'),
(54,	'Test product 13                                                                                     ',	'Test product 13 description',	4.70,	'19:53:01',	'19:53:01'),
(55,	'Test product 14                                                                                     ',	'Test product 14 description',	3.60,	'19:53:01',	'19:53:01'),
(56,	'Test product 15                                                                                     ',	'Test product 15 description',	3.50,	'19:53:01',	'19:53:01'),
(57,	'Test product 16                                                                                     ',	'Test product 16 description',	4.80,	'19:53:01',	'19:53:01'),
(58,	'Test product 17                                                                                     ',	'Test product 17 description',	4.00,	'19:53:01',	'19:53:01'),
(59,	'Test product 18                                                                                     ',	'Test product 18 description',	3.40,	'19:53:01',	'19:53:01'),
(60,	'Test product 19                                                                                     ',	'Test product 19 description',	3.00,	'19:53:01',	'19:53:01'),
(61,	'Test product 20                                                                                     ',	'Test product 20 description',	4.90,	'19:53:01',	'19:53:01');

DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS users_id_seq;
CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE "public"."users" (
    "id" bigint DEFAULT nextval('users_id_seq') NOT NULL,
    "name" character varying(255) NOT NULL,
    "email" character varying(255) NOT NULL,
    "email_verified_at" timestamp(0),
    "password" character varying(255) NOT NULL,
    "remember_token" character varying(100),
    "created_at" timestamp(0),
    "updated_at" timestamp(0),
    CONSTRAINT "users_email_unique" UNIQUE ("email"),
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


ALTER TABLE ONLY "public"."products" ADD CONSTRAINT "products_product_id_fkey" FOREIGN KEY (id) REFERENCES products(id) NOT DEFERRABLE;

-- 2024-03-21 10:54:55.524617+02